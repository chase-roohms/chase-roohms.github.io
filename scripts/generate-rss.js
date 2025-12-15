import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = 'https://chaseroohms.com';
const BLOG_DIR = path.join(__dirname, '../src/content/blog');
const NEWS_DATA_PATH = path.join(__dirname, '../src/utils/newsData.ts');
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
      link: `${SITE_URL}/blog/${data.slug}`,
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

// Generate News RSS Feed
function generateNewsRSS() {
  // Read and parse the newsData.ts file
  const newsContent = fs.readFileSync(NEWS_DATA_PATH, 'utf-8');
  
  // Extract the newsItems array using regex
  const newsItemsMatch = newsContent.match(/export const newsItems[^=]*=\s*\[([\s\S]*?)\];/);
  if (!newsItemsMatch) {
    console.warn('Could not parse newsData.ts');
    return;
  }

  // Parse the array content (this is a simplified approach)
  // In production, you might want to use a proper TypeScript parser
  const arrayContent = newsItemsMatch[1];
  const items = [];
  
  // Extract individual items using regex
  const itemRegex = /\{[\s\S]*?id:\s*(\d+),[\s\S]*?fullDate:\s*['"]([^'"]+)['"],[\s\S]*?title:\s*['"]([^'"]+)['"],[\s\S]*?description:\s*['"]([^'"]+)['"],[\s\S]*?(?:link:\s*['"]([^'"]+)['"],)?[\s\S]*?\}/g;
  
  let match;
  while ((match = itemRegex.exec(arrayContent)) !== null) {
    items.push({
      id: match[1],
      date: match[2],
      title: match[3],
      description: match[4],
      link: match[5] || `${SITE_URL}/news`
    });
  }

  // Sort by date (newest first)
  items.sort((a, b) => new Date(b.date) - new Date(a.date));

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Chase Roohms - News</title>
    <link>${SITE_URL}/news</link>
    <description>Professional updates, achievements, and milestones from Chase Roohms' career in DevOps and software development.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/news-rss.xml" rel="self" type="application/rss+xml"/>
    ${items.map(item => `
    <item>
      <title><![CDATA[${item.title}]]></title>
      <link>${item.link.startsWith('http') ? item.link : SITE_URL + item.link}</link>
      <description><![CDATA[${item.description}]]></description>
      <pubDate>${new Date(item.date).toUTCString()}</pubDate>
      <author>chaseroohms@gmail.com (Chase Roohms)</author>
      <guid isPermaLink="true">${item.link.startsWith('http') ? item.link : SITE_URL + item.link}</guid>
    </item>`).join('\n')}
  </channel>
</rss>`;

  fs.writeFileSync(path.join(OUTPUT_DIR, 'news-rss.xml'), rss);
  console.log('✓ Generated news-rss.xml');
}

// Run both generators
try {
  generateBlogRSS();
  generateNewsRSS();
  console.log('\n✓ RSS feeds generated successfully');
} catch (error) {
  console.error('Error generating RSS feeds:', error);
  process.exit(1);
}
