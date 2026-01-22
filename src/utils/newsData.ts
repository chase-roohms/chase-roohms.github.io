export interface NewsItem {
  id: string;
  fullDate: string;
  title: string;
  description: string;
  link?: string;
}

export const newsItems: NewsItem[] = [
  {
    id: 'dumpsterr-twenty-stars',
    fullDate: '2026-01-22',
    title: 'Dumpsterr Reaches 20 Stars',
    description: 'Dumpsterr, the Dockerized Python application that safely empties your Plex trash, has reached 20 stars on GitHub.',
    link: 'https://github.com/chase-roohms/dumpsterr',
  },
  {
    id: 'dockerized-mythicmate',
    fullDate: '2026-01-14',
    title: 'Dockerized MythicMate',
    description: 'Dockerized the AI powered Discord companion for Dungeons and Dragons, MythicMate, to simplify deployment and usage.',
    link: 'https://github.com/chase-roohms/mythicmate',
  },
  {
    id: 'launched-dumpsterr',
    fullDate: '2026-01-08',
    title: 'Launched Dumpsterr',
    description: 'Dockerized Python application that safely empties your Plex trash, verifying file availability before doing so. Prevents unintentional deletion of movies and shows when drives are disconnected.',
    link: 'https://github.com/chase-roohms/dumpsterr',
  },
  {
    id: 'new-portfolio',
    fullDate: '2025-12-13',
    title: 'Built a Modern Portfolio',
    description: 'Launched a complete overhaul of my portfolio website with Vite, React, TypeScript, and Tailwind CSS.',
    link: 'https://github.com/chase-roohms/chase-roohms.github.io',
  },
  {
    id: 'opsgenie-swir-webcast',
    fullDate: '2025-12-10',
    title: 'Speaker in a Webcast',
    description: 'Participated as a speaker in a webcast discussing the migration from Opsgenie to SolarWinds Incident Response platform, sharing insights and best practices.',
    link: 'https://goldcast.ondemand.goldcast.io/on-demand/4ed8f693-f755-4a35-ad2f-5ccbba38de26',
  },
  {
    id: 'migration-blog-post',
    fullDate: '2025-11-19',
    title: 'Published Migration Blog Post',
    description: 'Co-authored a blog post on the migration from Opsgenie to SolarWinds Incident Response platform, detailing best practices and lessons learned.',
    link: 'https://www.solarwinds.com/blog/migrating-from-opsgenie-heres-the-incident-response-solution-you-actually-need',
  },
  {
    id: 'devops-promotion',
    fullDate: '2025-10-01',
    title: 'Promoted to DevOps Engineer',
    description: 'Advanced to DevOps Engineer role at SolarWinds.',
  },
  {
    id: 'gh-actions-certification',
    fullDate: '2025-08-22',
    title: 'Attained GitHub Actions Certification',
    description: 'Earned certification for proficiency with GitHub Actions.',
    link: 'https://learn.microsoft.com/en-us/users/chaseroohms-6404/credentials/d9a24be84c644268',
  },
  {
    id: 'gh-copilot-certification',
    fullDate: '2025-08-14',
    title: 'Attained GitHub Copilot Certification',
    description: 'Earned certification for proficiency with GitHub Copilot.',
    link: 'https://learn.microsoft.com/en-us/users/chaseroohms-6404/credentials/74d82a397bfdb509',
  },
  {
    id: 'led-opsgenie-to-swir-migration',
    fullDate: '2025-04-01',
    title: 'Led OpsGenie to SWIR Migration',
    description: 'Successfully led team-wide migration from OpsGenie to SolarWinds Incident Response platform, enhancing incident response practices and reducing mean time to resolution.',
  },
  {
    id: 'devops-full-time',
    fullDate: '2024-10-01',
    title: 'Started DevOps Full-Time',
    description: 'Brought on full time as an Associate DevOps Engineer at SolarWinds.',
  },
  {
    id: 'security-engineer-internship',
    fullDate: '2024-06-03',
    title: 'Started Security Engineer Internship',
    description: 'Began my security engineer internship at SolarWinds, focusing on product security and incident response.',
  },
  {
    id: 'bachelor-of-science',
    fullDate: '2024-05-15',
    title: 'Completed Bachelor\'s in CS',
    description: 'Graduated Magna Cum Laude with a Bachelor of Science in Computer Science from the University of Texas State in San Marcos.',
  },
];
