export interface BlogStats {
  views?: number;
}

// Cache to avoid repeated API calls
const blogViewsCache = new Map<string, number | undefined>();

export async function fetchBlogViews(slug: string): Promise<number | undefined> {
  // Check cache first
  if (blogViewsCache.has(slug)) {
    return blogViewsCache.get(slug);
  }

  try {
    // Fetch from automated stats repository
    const statsUrl = 'https://raw.githubusercontent.com/chase-roohms/dev-stats/refs/heads/main/data/google-analytics-stats.json';
    const response = await fetch(statsUrl, { 
      signal: AbortSignal.timeout(10000),
      headers: { 'Accept': 'application/json' }
    });
    
    if (!response.ok) {
      console.warn('Could not fetch Google Analytics stats from automated repository');
      return undefined;
    }
    
    const stats = await response.json();
    
    // Look up the view count for this specific blog post
    // The slug should match the path in the analytics data
    const blogPath = `/blog/${slug}/`;
    
    if (stats?.blog_posts?.[blogPath]?.page_views !== undefined) {
      const views = stats.blog_posts[blogPath].page_views;
      // Check if the views is a number
      if (typeof views !== 'number') {
        console.warn(`Invalid view count for blog post: ${blogPath}`);
        return undefined;
      }
      // Cache the result
      blogViewsCache.set(slug, views);
      return views;
    }
    
    console.warn(`No stats found for blog post: ${blogPath}`);
    return undefined;
  } catch (error) {
    console.error('Error fetching blog views:', error);
    return undefined;
  }
}

// Fetch all blog views at once for efficiency
export async function fetchAllBlogViews(): Promise<Map<string, number>> {
  const viewsMap = new Map<string, number>();
  
  try {
    const statsUrl = 'https://raw.githubusercontent.com/chase-roohms/dev-stats/refs/heads/main/data/google-analytics-stats.json';
    const response = await fetch(statsUrl, { 
      signal: AbortSignal.timeout(10000),
      headers: { 'Accept': 'application/json' }
    });
    
    if (!response.ok) {
      console.warn('Could not fetch Google Analytics stats from automated repository');
      return viewsMap;
    }
    
    const stats = await response.json();
    
    // Extract all blog post paths and their view counts
    if (stats?.blog_posts) {
      for (const [path, data] of Object.entries(stats.blog_posts)) {
        // Match paths like /blog/slug/
        const match = path.match(/^\/blog\/([^/]+)\/$/);
        if (match && typeof (data as any).page_views === 'number') {
          const slug = match[1];
          const views = (data as any).page_views;
          viewsMap.set(slug, views);
          // Also update cache
          blogViewsCache.set(slug, views);
        }
      }
    }
    
    return viewsMap;
  } catch (error) {
    console.error('Error fetching all blog views:', error);
    return viewsMap;
  }
}
