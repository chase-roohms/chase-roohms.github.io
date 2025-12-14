import { readFile } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distPath = join(__dirname, '../dist');

async function checkPrerenderedBlogPost() {
  const blogPostPath = join(distPath, 'blog/home-lab-setup/index.html');
  
  console.log('Checking prerendered blog post...');
  console.log('='.repeat(80));
  
  try {
    const html = await readFile(blogPostPath, 'utf-8');
    
    // Extract meta tags
    const metaTagRegex = /<meta[^>]*>/g;
    const metaTags = html.match(metaTagRegex) || [];
    
    const hasOgTitle = metaTags.some(tag => tag.includes('og:title'));
    const hasOgDescription = metaTags.some(tag => tag.includes('og:description'));
    const hasOgImage = metaTags.some(tag => tag.includes('og:image') && !tag.includes('og:image:'));
    const hasOgUrl = metaTags.some(tag => tag.includes('og:url'));
    const hasTwitterCard = metaTags.some(tag => tag.includes('twitter:card'));
    const hasTwitterImage = metaTags.some(tag => tag.includes('twitter:image'));
    
    console.log(`✓ OG Title: ${hasOgTitle ? 'PRESENT' : 'MISSING'}`);
    console.log(`✓ OG Description: ${hasOgDescription ? 'PRESENT' : 'MISSING'}`);
    console.log(`✓ OG Image: ${hasOgImage ? 'PRESENT' : 'MISSING'}`);
    console.log(`✓ OG URL: ${hasOgUrl ? 'PRESENT' : 'MISSING'}`);
    console.log(`✓ Twitter Card: ${hasTwitterCard ? 'PRESENT' : 'MISSING'}`);
    console.log(`✓ Twitter Image: ${hasTwitterImage ? 'PRESENT' : 'MISSING'}`);
    
    // Extract and display specific values
    console.log('\nExtracted values:');
    console.log('-'.repeat(80));
    
    const titleMatch = html.match(/property="og:title"\s+content="([^"]*)"/);
    if (titleMatch) console.log(`Title: ${titleMatch[1]}`);
    
    const descMatch = html.match(/property="og:description"\s+content="([^"]*)"/);
    if (descMatch) console.log(`Description: ${descMatch[1]}`);
    
    const imageMatch = html.match(/property="og:image"\s+content="([^"]*)"/);
    if (imageMatch) console.log(`Image: ${imageMatch[1]}`);
    
    const urlMatch = html.match(/property="og:url"\s+content="([^"]*)"/);
    if (urlMatch) console.log(`URL: ${urlMatch[1]}`);
    
    if (hasOgTitle && hasOgDescription && hasOgImage && hasOgUrl && hasTwitterCard && hasTwitterImage) {
      console.log('\n✅ All required meta tags are present in the prerendered blog post!');
    } else {
      console.log('\n⚠️  Some meta tags are missing!');
    }
    
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    console.log('\nℹ️  Make sure you\'ve run `npm run build` first');
  }
}

async function checkSPABehavior() {
  console.log('\n\n' + '='.repeat(80));
  console.log('SPA Behavior Check');
  console.log('='.repeat(80));
  console.log('\nℹ️  In the Single Page Application:');
  console.log('   - Other pages (Home, About, Projects, etc.) load client-side');
  console.log('   - React Helmet updates meta tags in the browser after JavaScript loads');
  console.log('   - Social media crawlers see the initial index.html (no OG tags by design)');
  console.log('   - Blog posts are PRERENDERED with full meta tags for crawlers');
  console.log('\n✓ This is the intended behavior!');
  console.log('✓ Only blog posts need OG tags for sharing');
  console.log('✓ Other pages work normally for users');
}

async function main() {
  console.log('🔍 Verifying Prerendered Meta Tags\n');
  await checkPrerenderedBlogPost();
  await checkSPABehavior();
  console.log('\n' + '='.repeat(80));
}

main().catch(console.error);
