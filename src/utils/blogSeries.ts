import type { BlogPost } from './blogLoader';

export interface BlogSeries {
  id: string;
  name: string;
  description: string;
  /** Posts build on each other, so show part numbers (01, 02…) */
  numbered?: boolean;
}

// Display order on the blog page. A post opts in with `series: "<id>"` in
// its frontmatter; posts without one fall into the last group.
export const BLOG_SERIES: BlogSeries[] = [
  {
    id: 'transmute',
    name: 'Transmute',
    description: 'Building, launching, and growing an open-source, self-hosted file converter.',
    numbered: true,
  },
  {
    id: 'ai-at-work',
    name: 'AI at Work',
    description: 'Rolling AI out inside a large company: what drives adoption and when an agent earns its keep.',
  },
  {
    id: 'self-hosting',
    name: 'Self Hosting',
    description: 'Running my own hardware at home, from a budget home lab to a house an AI can drive.',
  },
  {
    id: 'automation',
    name: 'Automation & CI',
    description: 'When to automate, and the GitHub Actions and Docker work that follows.',
  },
  {
    id: 'career',
    name: 'Career',
    description: 'Working with people: communication, leadership, and growing as an engineer.',
  },
];

export const UNGROUPED_SERIES: BlogSeries = {
  id: 'other',
  name: 'More Writing',
  description: 'Posts that stand on their own.',
};

export function getSeries(id?: string): BlogSeries | undefined {
  return BLOG_SERIES.find((s) => s.id === id);
}

export interface SeriesGroup {
  series: BlogSeries;
  /** Oldest first, so the list reads as parts of a series */
  posts: BlogPost[];
}

export function groupPostsBySeries(posts: BlogPost[]): SeriesGroup[] {
  const byId = new Map<string, BlogPost[]>();
  for (const post of posts) {
    const id = getSeries(post.series) ? post.series! : UNGROUPED_SERIES.id;
    const list = byId.get(id) ?? [];
    list.push(post);
    byId.set(id, list);
  }

  return [...BLOG_SERIES, UNGROUPED_SERIES]
    .filter((series) => byId.has(series.id))
    .map((series) => ({
      series,
      posts: [...byId.get(series.id)!].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      ),
    }));
}

/** Previous and next post within the same series, chronologically */
export function getSeriesNeighbors(posts: BlogPost[], slug: string) {
  const current = posts.find((p) => p.slug === slug);
  const series = getSeries(current?.series);
  if (!current || !series) return null;

  const group = posts
    .filter((p) => p.series === series.id)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const index = group.findIndex((p) => p.slug === slug);

  return {
    series,
    part: index + 1,
    total: group.length,
    prev: group[index - 1] ?? null,
    next: group[index + 1] ?? null,
  };
}
