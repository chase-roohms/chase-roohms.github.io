export interface ProjectStats {
  githubStars?: number;
  dockerPulls?: number;
}

export async function fetchGitHubStars(githubUrl: string): Promise<number | undefined> {
  try {
    // Extract owner and repo from GitHub URL
    // Example: https://github.com/chase-roohms/dumpsterr
    const match = githubUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
    if (!match) return undefined;
    
    const [, owner, repo] = match;
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
    
    if (!response.ok) return undefined;
    
    const data = await response.json();
    return data.stargazers_count;
  } catch (error) {
    console.error('Error fetching GitHub stars:', error);
    return undefined;
  }
}

export async function fetchDockerHubPulls(dockerUrl: string): Promise<number | undefined> {
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
    
    // Try multiple proxies and direct fetch with retry logic
    const fetchStrategies = [
      // Try direct fetch first (might work in some environments)
      async () => {
        const response = await fetch(apiUrl, { 
          mode: 'cors',
          headers: { 'Accept': 'application/json' }
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return await response.json();
      },
      // Primary CORS proxy
      async () => {
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(apiUrl)}`;
        const response = await fetch(proxyUrl, { 
          signal: AbortSignal.timeout(8000) 
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const proxyData = await response.json();
        return JSON.parse(proxyData.contents);
      },
      // Fallback CORS proxy
      async () => {
        const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(apiUrl)}`;
        const response = await fetch(proxyUrl, { 
          signal: AbortSignal.timeout(8000) 
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return await response.json();
      },
      // Another fallback
      async () => {
        const proxyUrl = `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(apiUrl)}`;
        const response = await fetch(proxyUrl, { 
          signal: AbortSignal.timeout(8000) 
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return await response.json();
      }
    ];
    
    // Try each strategy with retries
    for (const strategy of fetchStrategies) {
      for (let attempt = 0; attempt < 2; attempt++) {
        try {
          const data = await strategy();
          if (data && typeof data.pull_count === 'number') {
            return data.pull_count;
          }
        } catch (error) {
          // Continue to next attempt/strategy
          if (attempt === 1) {
            console.debug(`Strategy failed after retries:`, error);
          }
          // Small delay before retry
          await new Promise(resolve => setTimeout(resolve, 300));
        }
      }
    }
    
    console.error('All Docker Hub fetch strategies failed for:', dockerUrl);
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
