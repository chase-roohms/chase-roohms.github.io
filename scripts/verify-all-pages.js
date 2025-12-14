import { readFile } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distPath = join(__dirname, '../dist');

const pages = [
  { name: 'Home', path: 'index.html' },
  { name: 'About', path: 'about/index.html' },
  { name: 'Projects', path: 'projects/index.html' },
  { name: 'Contact', path: 'contact/index.html' },
  { name: 'News', path: 'news/index.html' },
  { name: 'Blog', path: 'blog/index.html' },
  { name: 'Blog Post (home-lab-setup)', path: 'blog/home-lab-setup/index.html' },
];

async function checkPageMetaTags(page) {
  const filePath = join(distPath, page.path);
  
  try {
    const html = await readFile(filePath, 'utf-8');
    
    // Extract meta tags
    const metaTagRegex = /<meta[^>]*>/g;
    const metaTags = html.match(metaTagRegex) || [];
    
    const hasTitle = /<title>([^<]+)<\/title>/.test(html);
    const hasDescription = metaTags.some(tag => tag.includes('name="description"'));
    const hasOgTitle = metaTags.some(tag => tag.includes('og:title'));
    const hasOgDescription = metaTags.some(tag => tag.includes('og:description'));
    const hasOgUrl = metaTags.some(tag => tag.includes('og:url'));
    const hasCanonical = /<link[^>]*rel="canonical"/.test(html);
    
    console.log(`\n${'='.repeat(80)}`);
    console.log(`${page.name}`);
    console.log('='.repeat(80));
    
    console.log(`✓ Title tag: ${hasTitle ? 'PRESENT' : 'MISSING'}`);
    console.log(`✓ Description: ${hasDescription ? 'PRESENT' : 'MISSING'}`);
    console.log(`✓ OG Title: ${hasOgTitle ? 'PRESENT' : 'MISSING'}`);
    console.log(`✓ OG Description: ${hasOgDescription ? 'PRESENT' : 'MISSING'}`);
    console.log(`✓ OG URL: ${hasOgUrl ? 'PRESENT' : 'MISSING'}`);
    console.log(`✓ Canonical: ${hasCanonical ? 'PRESENT' : 'MISSING'}`);
    
    // Extract specific values
    const titleMatch = html.match(/<title>([^<]+)<\/title>/);
    if (titleMatch) {
      console.log(`\nTitle: "${titleMatch[1]}"`);
    }
    
    const ogTitleMatch = html.match(/property="og:title"\s+content="([^"]*)"/);
    if (ogTitleMatch) {
      console.log(`OG Title: "${ogTitleMatch[1]}"`);
    }
    
    const issues = [];
    if (!hasTitle) issues.push('title');
    if (!hasDescription) issues.push('description');
    if (!hasOgTitle) issues.push('og:title');
    if (!hasOgDescription) issues.push('og:description');
    
    if (issues.length === 0) {
      console.log('\n✅ All essential meta tags present!');
    } else {
      console.log(`\n⚠️  Missing: ${issues.join(', ')}`);
    }
    
    return issues.length === 0;
    
  } catch (error) {
    console.error(`\n❌ Error reading ${page.name}: ${error.message}`);
    return false;
  }
}

async function main() {
  console.log('🔍 Verifying Meta Tags on All Prerendered Pages\n');
  
  let allPassed = true;
  
  for (const page of pages) {
    const passed = await checkPageMetaTags(page);
    if (!passed) allPassed = false;
  }
  
  console.log('\n' + '='.repeat(80));
  if (allPassed) {
    console.log('✅ All pages have proper meta tags!');
  } else {
    console.log('⚠️  Some pages are missing meta tags');
  }
  console.log('='.repeat(80));
}

main().catch(console.error);
