import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = 'https://chaseroohms.com';
const BLOG_DIR = path.join(__dirname, '../src/content/blog');
const OUTPUT_DIR = path.join(__dirname, '../dist');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Static pages with their priorities and change frequencies
const staticPages = [
  { url: '/', changefreq: 'weekly', priority: '1.0' },
  { url: '/about/', changefreq: 'monthly', priority: '0.8' },
  { url: '/projects/', changefreq: 'weekly', priority: '0.9' },
  { url: '/blog/', changefreq: 'weekly', priority: '0.9' },
  { url: '/news/', changefreq: 'weekly', priority: '0.8' },
  { url: '/contact/', changefreq: 'monthly', priority: '0.7' },
];

function generateSitemap() {
  // Get all blog posts
  const blogFiles = fs.readdirSync(BLOG_DIR).filter(file => file.endsWith('.md'));
  
  const blogPosts = blogFiles.map(file => {
    const content = fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8');
    const { data } = matter(content);
    
    return {
      url: `/blog/${data.slug}/`,
      lastmod: data.date,
      changefreq: 'monthly',
      priority: '0.7'
    };
  });

  // Combine all URLs
  const allPages = [...staticPages, ...blogPosts];

  // Generate sitemap XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${SITE_URL}${page.url}</loc>
    ${page.lastmod ? `<lastmod>${page.lastmod}</lastmod>` : ''}
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  fs.writeFileSync(path.join(OUTPUT_DIR, 'sitemap.xml'), sitemap);
  console.log(`✓ Generated sitemap.xml with ${allPages.length} URLs`);
}

try {
  generateSitemap();
  console.log('\n✓ Sitemap generated successfully');
} catch (error) {
  console.error('Error generating sitemap:', error);
  process.exit(1);
}
