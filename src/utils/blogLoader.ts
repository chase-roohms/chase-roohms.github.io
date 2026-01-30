import matter from 'gray-matter';
import { Buffer } from 'buffer';
import { fetchAllBlogViews, fetchBlogViews } from './blogStats';

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
  readingTime?: number;
  views?: number;
}

// Calculate reading time in minutes (average 200 words per minute)
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const readingTime = Math.ceil(words / wordsPerMinute);
  return readingTime;
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
  
  // Fetch all blog views at once for efficiency
  const viewsMap = await fetchAllBlogViews();
  
  // Load content to calculate reading time
  const posts = await Promise.all(
    metadata.map(async (meta) => {
      const content = await blogFiles[meta.path]();
      const { content: markdown } = matter(content);
      return {
        ...meta,
        content: '', // Don't include full content for listing page
        readingTime: calculateReadingTime(markdown),
        views: viewsMap.get(meta.slug),
      };
    })
  );
  
  return posts;
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const metadata = await getMetadata();
  const postMeta = metadata.find(post => post.slug === slug);
  
  if (!postMeta) return null;
  
  // Only load full content for the requested post
  const content = await blogFiles[postMeta.path]();
  const { data, content: markdown } = matter(content);
  
  // Fetch view count for this specific post
  const views = await fetchBlogViews(slug);
  
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
    readingTime: calculateReadingTime(markdown),
    views,
  };
}

// Get related posts based on shared topics (excluding the current post)
export async function getRelatedPosts(currentSlug: string, limit: number = 3): Promise<BlogPost[]> {
  const allPosts = await getAllBlogPosts();
  const currentPost = allPosts.find(post => post.slug === currentSlug);
  
  if (!currentPost) return [];
  
  // Calculate similarity score based on shared topics
  const postsWithScore = allPosts
    .filter(post => post.slug !== currentSlug)
    .map(post => {
      const sharedTopics = post.topics.filter(topic => currentPost.topics.includes(topic));
      return {
        post,
        score: sharedTopics.length,
      };
    })
    .filter(item => item.score > 0) // Only include posts with at least one shared topic
    .sort((a, b) => {
      // Sort by score first, then by date
      if (b.score !== a.score) return b.score - a.score;
      return new Date(b.post.date).getTime() - new Date(a.post.date).getTime();
    });
  
  return postsWithScore.slice(0, limit).map(item => item.post);
}
