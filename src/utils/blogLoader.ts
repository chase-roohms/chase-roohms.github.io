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

interface ParsedBlogPost extends Omit<BlogPost, 'views'> {
  path: string;
}

// Calculate reading time in minutes (average 200 words per minute)
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const readingTime = Math.ceil(words / wordsPerMinute);
  return readingTime;
}

// Import all markdown files as raw strings so prerendered pages can hydrate
// against the same content immediately on the client.
const blogFiles = import.meta.glob('../content/blog/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const parsedBlogPosts: ParsedBlogPost[] = Object.entries(blogFiles)
  .map(([path, source]) => {
    const { data, content } = matter(source);

    return {
      path,
      slug: data.slug,
      title: data.title,
      date: data.date,
      description: data.description,
      topics: data.topics || [],
      content,
      icon: data.icon,
      author: data.author,
      image: data.image,
      readingTime: calculateReadingTime(content),
    };
  })
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

function createListingPost(post: ParsedBlogPost): BlogPost {
  return {
    slug: post.slug,
    title: post.title,
    date: post.date,
    description: post.description,
    topics: [...post.topics],
    content: '',
    icon: post.icon,
    author: post.author,
    image: post.image,
    readingTime: post.readingTime,
  };
}

function createFullPost(post: ParsedBlogPost): BlogPost {
  return {
    slug: post.slug,
    title: post.title,
    date: post.date,
    description: post.description,
    topics: [...post.topics],
    content: post.content,
    icon: post.icon,
    author: post.author,
    image: post.image,
    readingTime: post.readingTime,
  };
}

function findParsedPost(slug: string): ParsedBlogPost | undefined {
  return parsedBlogPosts.find((post) => post.slug === slug);
}

export function getAllBlogPostsSync(): BlogPost[] {
  return parsedBlogPosts.map(createListingPost);
}

export function getBlogPostSync(slug: string): BlogPost | null {
  const post = findParsedPost(slug);
  return post ? createFullPost(post) : null;
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const posts = getAllBlogPostsSync();
  
  // Fetch all blog views at once for efficiency
  const viewsMap = await fetchAllBlogViews();

  return posts.map((post) => ({
    ...post,
    views: viewsMap.get(post.slug),
  }));
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const post = getBlogPostSync(slug);
  
  if (!post) return null;
  
  // Fetch view count for this specific post
  const views = await fetchBlogViews(slug);
  
  return {
    ...post,
    views,
  };
}

// Get related posts based on shared topics (excluding the current post)
export function getRelatedPostsSync(currentSlug: string, limit: number = 3): BlogPost[] {
  const allPosts = getAllBlogPostsSync();
  const currentPost = allPosts.find(post => post.slug === currentSlug);
  
  if (!currentPost) return [];
  
  const postsWithScore = allPosts
    .filter(post => post.slug !== currentSlug)
    .map(post => {
      const sharedTopics = post.topics.filter(topic => currentPost.topics.includes(topic));
      return {
        post,
        score: sharedTopics.length,
      };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return new Date(b.post.date).getTime() - new Date(a.post.date).getTime();
    });
  
  return postsWithScore.slice(0, limit).map(item => item.post);
}

export async function getRelatedPosts(currentSlug: string, limit: number = 3): Promise<BlogPost[]> {
  return getRelatedPostsSync(currentSlug, limit);
}
