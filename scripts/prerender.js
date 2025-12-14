import { readdir, readFile, writeFile, mkdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';
import puppeteer from 'puppeteer';
import matter from 'gray-matter';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distPath = join(__dirname, '../dist');
const blogContentPath = join(__dirname, '../src/content/blog');

// Define all static pages to prerender
const staticPages = [
  { route: '/', output: 'index.html', name: 'Home' },
  { route: '/about', output: 'about/index.html', name: 'About' },
  { route: '/projects', output: 'projects/index.html', name: 'Projects' },
  { route: '/contact', output: 'contact/index.html', name: 'Contact' },
  { route: '/news', output: 'news/index.html', name: 'News' },
  { route: '/blog', output: 'blog/index.html', name: 'Blog' },
];

// Get all blog post slugs from markdown files
async function getBlogSlugs() {
  const files = await readdir(blogContentPath);
  const slugs = [];
  
  for (const file of files) {
    if (file.endsWith('.md')) {
      const content = await readFile(join(blogContentPath, file), 'utf-8');
      const { data } = matter(content);
      if (data.slug) {
        slugs.push(data.slug);
      }
    }
  }
  
  return slugs;
}

// Start a static file server for the built files
async function startPreviewServer() {
  return new Promise((resolve, reject) => {
    const server = spawn('npx', ['serve', '-s', distPath, '-l', '3001', '--no-clipboard'], {
      stdio: 'pipe'
    });
    
    server.stdout.on('data', (data) => {
      const output = data.toString();
      if (output.includes('Accepting connections')) {
        resolve({ 
          server, 
          url: 'http://localhost:3001',
          close: () => server.kill()
        });
      }
    });
    
    server.stderr.on('data', (data) => {
      console.error('Server error:', data.toString());
    });
    
    // Give it a few seconds to start
    setTimeout(() => {
      resolve({ 
        server, 
        url: 'http://localhost:3001',
        close: () => server.kill()
      });
    }, 3000);
  });
}

// Prerender a single route
async function prerenderRoute(browser, url, outputPath) {
  console.log(`Prerendering: ${url}`);
  
  const page = await browser.newPage();
  
  try {
    // Navigate and wait for the page to be fully loaded
    await page.goto(url, { 
      waitUntil: 'networkidle0',
      timeout: 30000 
    });
    
    // Wait a bit more for React Helmet to update meta tags
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Get the fully rendered HTML
    const html = await page.content();
    
    // Create directory if it doesn't exist
    await mkdir(dirname(outputPath), { recursive: true });
    
    // Write the HTML file
    await writeFile(outputPath, html, 'utf-8');
    
    console.log(`✓ Saved: ${outputPath}`);
  } catch (error) {
    console.error(`✗ Failed to prerender ${url}:`, error.message);
  } finally {
    await page.close();
  }
}

async function main() {
  console.log('🚀 Starting prerender process...\n');
  
  // Get all blog slugs
  const slugs = await getBlogSlugs();
  const totalPages = staticPages.length + slugs.length;
  console.log(`Found ${staticPages.length} static pages and ${slugs.length} blog posts to prerender (${totalPages} total)\n`);
  
  // Start preview server
  console.log('Starting preview server...');
  const { server, url, close } = await startPreviewServer();
  console.log(`Preview server running at ${url}\n`);
  
  // Launch Puppeteer
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  console.log('Browser launched\n');
  
  try {
    console.log('Prerendering static pages...');
    console.log('-'.repeat(80));
    
    // Prerender static pages
    for (const page of staticPages) {
      const routeUrl = `${url}${page.route}`;
      const outputPath = join(distPath, page.output);
      console.log(`Prerendering: ${page.name} (${page.route})`);
      await prerenderRoute(browser, routeUrl, outputPath);
    }
    
    console.log('\nPrerendering blog posts...');
    console.log('-'.repeat(80));
    
    // Prerender each blog post
    for (const slug of slugs) {
      const routeUrl = `${url}/blog/${slug}`;
      const outputPath = join(distPath, 'blog', slug, 'index.html');
      await prerenderRoute(browser, routeUrl, outputPath);
    }
    
    console.log('\n✅ Prerendering complete!');
    console.log(`Total pages prerendered: ${totalPages}`);
  } catch (error) {
    console.error('\n❌ Prerendering failed:', error);
    process.exit(1);
  } finally {
    // Cleanup
    await browser.close();
    close();
    console.log('Cleaned up resources');
  }
}

main().catch(console.error);
