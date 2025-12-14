import { spawn } from 'child_process';
import puppeteer from 'puppeteer';

const pages = [
  { path: '/', name: 'Home' },
  { path: '/about', name: 'About' },
  { path: '/projects', name: 'Projects' },
  { path: '/contact', name: 'Contact' },
  { path: '/news', name: 'News' },
  { path: '/blog', name: 'Blog' },
];

// Start dev server
async function startDevServer() {
  return new Promise((resolve) => {
    const server = spawn('npm', ['run', 'dev'], {
      stdio: 'pipe',
      shell: true
    });
    
    let resolved = false;
    
    server.stdout.on('data', (data) => {
      const output = data.toString();
      if (output.includes('Local:') && !resolved) {
        resolved = true;
        setTimeout(() => {
          resolve({ 
            server, 
            url: 'http://localhost:5173',
            close: () => {
              server.kill('SIGTERM');
              setTimeout(() => server.kill('SIGKILL'), 2000);
            }
          });
        }, 2000);
      }
    });
    
    server.stderr.on('data', (data) => {
      console.error('Server error:', data.toString());
    });
  });
}

// Check meta tags for a page
async function checkPage(browser, baseUrl, page) {
  const url = `${baseUrl}${page.path}`;
  console.log(`\n${'='.repeat(80)}`);
  console.log(`Checking: ${page.name} (${url})`);
  console.log('='.repeat(80));
  
  const browserPage = await browser.newPage();
  
  try {
    await browserPage.goto(url, { 
      waitUntil: 'networkidle0',
      timeout: 10000 
    });
    
    // Wait for React to render
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Get meta tags
    const metaTags = await browserPage.evaluate(() => {
      const tags = {};
      
      // Get title
      tags.title = document.title;
      
      // Get important meta tags
      const metaSelectors = [
        'meta[name="description"]',
        'meta[property="og:title"]',
        'meta[property="og:description"]',
        'meta[property="og:url"]',
        'meta[property="og:image"]',
        'meta[name="twitter:card"]',
        'link[rel="canonical"]'
      ];
      
      metaSelectors.forEach(selector => {
        const element = document.querySelector(selector);
        if (element) {
          const key = element.getAttribute('name') || 
                     element.getAttribute('property') || 
                     element.getAttribute('rel');
          tags[key] = element.getAttribute('content') || element.getAttribute('href');
        }
      });
      
      return tags;
    });
    
    // Display results
    console.log(`✓ Title: ${metaTags.title}`);
    console.log(`✓ Description: ${metaTags.description || 'MISSING'}`);
    console.log(`✓ OG Title: ${metaTags['og:title'] || 'MISSING'}`);
    console.log(`✓ OG Description: ${metaTags['og:description'] || 'MISSING'}`);
    console.log(`✓ OG URL: ${metaTags['og:url'] || 'MISSING'}`);
    console.log(`✓ OG Image: ${metaTags['og:image'] || 'MISSING'}`);
    console.log(`✓ Twitter Card: ${metaTags['twitter:card'] || 'MISSING'}`);
    console.log(`✓ Canonical: ${metaTags.canonical || 'MISSING'}`);
    
    // Check for issues
    const issues = [];
    if (!metaTags.title) issues.push('Missing title');
    if (!metaTags.description) issues.push('Missing description');
    if (!metaTags['og:title']) issues.push('Missing og:title');
    if (!metaTags['og:description']) issues.push('Missing og:description');
    
    if (issues.length > 0) {
      console.log(`\n⚠️  Issues found: ${issues.join(', ')}`);
    } else {
      console.log('\n✅ All meta tags present!');
    }
    
  } catch (error) {
    console.error(`✗ Error checking page: ${error.message}`);
  } finally {
    await browserPage.close();
  }
}

async function main() {
  console.log('🚀 Verifying meta tags on all pages...\n');
  
  // Start dev server
  console.log('Starting dev server...');
  const { server, url, close } = await startDevServer();
  console.log(`Dev server running at ${url}`);
  
  // Launch Puppeteer
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  
  try {
    // Check each page
    for (const page of pages) {
      await checkPage(browser, url, page);
    }
    
    console.log('\n' + '='.repeat(80));
    console.log('✅ Verification complete!');
    console.log('='.repeat(80));
    
  } catch (error) {
    console.error('\n❌ Verification failed:', error);
    process.exit(1);
  } finally {
    await browser.close();
    close();
    console.log('\nCleaned up resources');
  }
}

main().catch(console.error);
