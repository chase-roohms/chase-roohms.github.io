import matter from 'gray-matter';
import { Buffer } from 'buffer';

// Extend Window interface to include Buffer
declare global {
  interface Window {
    Buffer: typeof Buffer;
  }
}

// Polyfill Buffer for browser
if (typeof window !== 'undefined') {
  window.Buffer = Buffer;
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  topics: string[];
  content: string;
  icon?: string;
  author?: string;
  image?: string;
}

// Import all markdown files as raw strings with eager: false for lazy loading
const blogFiles = import.meta.glob('../content/blog/*.md', { 
  query: '?raw',
  import: 'default',
  eager: false,
});

// Cache for blog post metadata (without full content)
let metadataCache: Array<Omit<BlogPost, 'content'> & { path: string }> | null = null;

async function getMetadata() {
  if (metadataCache) return metadataCache;
  
  const metadata: Array<Omit<BlogPost, 'content'> & { path: string }> = [];
  
  for (const path in blogFiles) {
    const content = await blogFiles[path]();
    const { data } = matter(content);
    
    metadata.push({
      path,
      slug: data.slug,
      title: data.title,
      date: data.date,
      description: data.description,
      topics: data.topics || [],
      icon: data.icon,
      author: data.author,
      image: data.image,
    });
  }
  
  metadataCache = metadata.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return metadataCache;
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const metadata = await getMetadata();
  
  // Return posts with empty content for listing pages
  return metadata.map(meta => ({
    ...meta,
    content: '', // Don't load content for listing page
  }));
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const metadata = await getMetadata();
  const postMeta = metadata.find(post => post.slug === slug);
  
  if (!postMeta) return null;
  
  // Only load full content for the requested post
  const content = await blogFiles[postMeta.path]();
  const { data, content: markdown } = matter(content);
  
  return {
    slug: data.slug,
    title: data.title,
    date: data.date,
    description: data.description,
    topics: data.topics || [],
    content: markdown,
    icon: data.icon,
    author: data.author,
    image: data.image,
  };
}
