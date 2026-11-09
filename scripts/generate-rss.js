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

// Generate Blog RSS Feed
function generateBlogRSS() {
  const blogFiles = fs.readdirSync(BLOG_DIR).filter(file => file.endsWith('.md'));
  
  const posts = blogFiles.map(file => {
    const content = fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8');
    const { data } = matter(content);
    
    return {
      title: data.title,
      description: data.description,
      link: `${SITE_URL}/blog/${data.slug}/`,
      pubDate: new Date(data.date).toUTCString(),
      author: data.author || 'Chase Roohms',
      categories: data.topics || []
    };
  }).sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Chase Roohms - Blog</title>
    <link>${SITE_URL}/blog</link>
    <description>Technical articles, tutorials, and thoughts on DevOps, automation, and software development by Chase Roohms.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/blog-rss.xml" rel="self" type="application/rss+xml"/>
    ${posts.map(post => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${post.link}</link>
      <description><![CDATA[${post.description}]]></description>
      <pubDate>${post.pubDate}</pubDate>
      <author>chaseroohms@gmail.com (${post.author})</author>
      <guid isPermaLink="true">${post.link}</guid>
      ${post.categories.map(cat => `<category>${cat}</category>`).join('\n      ')}
    </item>`).join('\n')}
  </channel>
</rss>`;

  fs.writeFileSync(path.join(OUTPUT_DIR, 'blog-rss.xml'), rss);
  console.log('✓ Generated blog-rss.xml');
}

// Run generator
try {
  generateBlogRSS();
  console.log('\n✓ RSS feed generated successfully');
} catch (error) {
  console.error('Error generating RSS feeds:', error);
  process.exit(1);
}
