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
    
    // Create fetch attempts for multiple CORS proxies
    const createFetchAttempt = async (proxyUrl: string, parseResponse: (res: any) => any) => {
      try {
        const response = await fetch(proxyUrl, { 
          signal: AbortSignal.timeout(10000),
          headers: { 'Accept': 'application/json' }
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = parseResponse ? await parseResponse(response) : await response.json();
        if (data && typeof data.pull_count === 'number') {
          return data.pull_count;
        }
        throw new Error('Invalid response format');
      } catch (error) {
        throw error;
      }
    };
    
    // Try all proxies in parallel - first one to succeed wins
    const proxyAttempts = [
      createFetchAttempt(
        `https://api.allorigins.win/get?url=${encodeURIComponent(apiUrl)}`,
        async (res) => {
          const proxyData = await res.json();
          return JSON.parse(proxyData.contents);
        }
      ),
      createFetchAttempt(
        `https://corsproxy.io/?${encodeURIComponent(apiUrl)}`,
        (res) => res.json()
      ),
      createFetchAttempt(
        `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(apiUrl)}`,
        (res) => res.json()
      ),
    ];
    
    // Race all proxies, return first successful result
    const result = await Promise.race(
      proxyAttempts.map(attempt => 
        attempt.catch(() => undefined)
      )
    );
    
    if (result !== undefined) {
      return result;
    }
    
    // If all parallel attempts failed, try them sequentially with retries
    for (const attempt of proxyAttempts) {
      try {
        const pullCount = await attempt;
        if (pullCount !== undefined) {
          return pullCount;
        }
      } catch (error) {
        // Continue to next proxy
        continue;
      }
    }
    
    console.warn('Could not fetch Docker Hub pulls for:', dockerUrl);
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
