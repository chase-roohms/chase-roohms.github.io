export interface ProjectStats {
  githubStars?: number;
  dockerPulls?: number;
}

// Cache to avoid repeated API calls
const githubStarsCache = new Map<string, number | undefined>();
const dockerPullsCache = new Map<string, number | undefined>();

export async function fetchGitHubStars(githubUrl: string): Promise<number | undefined> {
  // Check cache first
  if (githubStarsCache.has(githubUrl)) {
    return githubStarsCache.get(githubUrl);
  }

  try {
    // Extract owner and repo from GitHub URL
    // Example: https://github.com/chase-roohms/dumpsterr
    const match = githubUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
    if (!match) {
      console.error('GitHub URL format not recognized:', githubUrl);
      return undefined;
    }
    
    const [, owner, repo] = match;
    const repoKey = `${owner}/${repo}`;
    
    // Fetch from automated stats repository
    const statsUrl = 'https://raw.githubusercontent.com/chase-roohms/docker-stats/refs/heads/main/data/github-stats.json';
    const response = await fetch(statsUrl, { 
      signal: AbortSignal.timeout(10000),
      headers: { 'Accept': 'application/json' }
    });
    
    if (!response.ok) {
      console.warn('Could not fetch GitHub stats from automated repository');
      return undefined;
    }
    
    const stats = await response.json();
    
    // Look up the star count for this specific repository
    // Note: The cached stats use 'stars' not 'stargazers_count'
    if (stats?.repositories?.[repoKey]?.stars !== undefined) {
      const stars = stats.repositories[repoKey].stars;
      console.log(`GitHub stars for ${repoKey}: ${stars}`);
      // Cache the result
      githubStarsCache.set(githubUrl, stars);
      return stars;
    }
    
    console.warn(`No stats found for GitHub repository: ${repoKey}`);
    return undefined;
  } catch (error) {
    console.error('Error fetching GitHub stars:', error);
    return undefined;
  }
}

export async function fetchDockerHubPulls(dockerUrl: string): Promise<number | undefined> {
  // Check cache first
  if (dockerPullsCache.has(dockerUrl)) {
    return dockerPullsCache.get(dockerUrl);
  }

  try {
    // Extract namespace and repository from Docker Hub URL
    // Example: https://hub.docker.com/r/neonvariant/dumpsterr
    const match = dockerUrl.match(/hub\.docker\.com\/r\/([^/]+)\/([^/]+)/);
    if (!match) {
      console.error('Docker Hub URL format not recognized:', dockerUrl);
      return undefined;
    }
    
    const [, namespace, repository] = match;
    const repoKey = `${namespace}/${repository}`;
    
    // Fetch from automated stats repository
    const statsUrl = 'https://raw.githubusercontent.com/chase-roohms/docker-stats/refs/heads/main/data/dockerhub-stats.json';
    const response = await fetch(statsUrl, { 
      signal: AbortSignal.timeout(10000),
      headers: { 'Accept': 'application/json' }
    });
    
    if (!response.ok) {
      console.warn('Could not fetch Docker Hub stats from automated repository');
      return undefined;
    }
    
    const stats = await response.json();
    
    // Look up the pull count for this specific repository
    if (stats?.repositories?.[repoKey]?.pull_count !== undefined) {
      const pulls = stats.repositories[repoKey].pull_count;
      // Cache the result
      dockerPullsCache.set(dockerUrl, pulls);
      return pulls;
    }
    
    console.warn(`No stats found for Docker repository: ${repoKey}`);
    return undefined;
  } catch (error) {
    console.error('Error fetching Docker Hub pulls:', error);
    return undefined;
  }
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}
