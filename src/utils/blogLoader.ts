import matter from 'gray-matter';
import { Buffer } from 'buffer';

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
}

// Import all markdown files as raw strings
const blogFiles = import.meta.glob('../content/blog/*.md', { 
  query: '?raw',
  import: 'default',
});

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const posts: BlogPost[] = [];

  try {
    console.log('Blog files found:', Object.keys(blogFiles));
    
    for (const path in blogFiles) {
      console.log('Loading:', path);
      const content = await blogFiles[path]();
      console.log('Content type:', typeof content);
      const { data, content: markdown } = matter(content);
      
      posts.push({
        slug: data.slug,
        title: data.title,
        date: data.date,
        description: data.description,
        topics: data.topics || [],
        content: markdown,
        icon: data.icon,
      });
    }
    console.log('Loaded posts:', posts.length);
  } catch (error) {
    console.error('Error loading blog posts:', error);
  }

  // Sort by date (newest first)
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const posts = await getAllBlogPosts();
  return posts.find(post => post.slug === slug) || null;
}
