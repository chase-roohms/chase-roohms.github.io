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
    if (!match) return undefined;
    
    const [, owner, repo] = match;
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
    
    if (!response.ok) return undefined;
    
    const data = await response.json();
    const stars = data.stargazers_count;
    
    // Cache the result
    githubStarsCache.set(githubUrl, stars);
    return stars;
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
    const apiUrl = `https://hub.docker.com/v2/repositories/${namespace}/${repository}`;
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(apiUrl)}`;
    
    const response = await fetch(proxyUrl, { 
      signal: AbortSignal.timeout(20000),
      headers: { 'Accept': 'application/json' }
    });
    
    if (!response.ok) {
      console.warn('Could not fetch Docker Hub pulls for:', dockerUrl);
      return undefined;
    }
    
    const proxyData = await response.json();
    const data = JSON.parse(proxyData.contents);
    
    if (data && typeof data.pull_count === 'number') {
      const pulls = data.pull_count;
      // Cache the result
      dockerPullsCache.set(dockerUrl, pulls);
      return pulls;
    }
    
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
