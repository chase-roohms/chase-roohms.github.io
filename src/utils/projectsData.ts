import opsgenieSwirHeader from '../assets/images/opsgenie-swir-header.webp';
import homelabHeader from '../assets/images/homelab-header.webp';
import mythicmateHeader from '../assets/images/mythicmate-header.webp';
import onePacePostersHeader from '../assets/images/one-pace-posters-header.webp';
import tomJerryPostersHeader from '../assets/images/tom-jerry-posters-header.webp';
import websiteHomePageHeader from '../assets/images/website-home-page-header.webp';
import pDashHeader from '../assets/images/p-dash-header.webp';
import deVexHeader from '../assets/images/de-vex-header.webp';
import looneyTunesPostersHeader from '../assets/images/looney-tunes-posters-header.webp';
import plexWrappedHeader from '../assets/images/plex-wrapped-header.webp';
import dumpsterrHeader from '../assets/images/dumpsterr-header.webp';
import kometaConfigsHeader from '../assets/images/kometa-configs-header.webp';
import tagAndReleaseHeader from '../assets/images/tag-and-release-header.webp';
import discordWebhookNotifierHeader from '../assets/images/discord-webhook-notifier-header.webp';

export interface Project {
  id: string;
  fullDate: string;
  title: string;
  description: string;
  tech: string[];
  image: string;
  link?: string;
  github_link?: string;
  docker_link?: string;
}

export const professionalProjects: Project[] = [
  {
    id: 'discord-webhook-notifier',
    fullDate: '2026-01-14',
    title: 'Discord Webhook Notifier',
    description: 'GitHub Action that sends notifications to Discord webhooks.',
    tech: ['Bash', 'GitHub Actions', 'CI/CD'],
    image: discordWebhookNotifierHeader,
    link: 'https://github.com/marketplace/actions/discord-webhook-notifier',
    github_link: 'https://github.com/chase-roohms/discord-notify',
  },
  {
    id: 'tag-and-release',
    fullDate: '2026-01-13',
    title: 'Tag and Release',
    description: 'GitHub Action that creates a semantic version release with optional parent tag updates (e.g., updating v3 and v3.5 when releasing v3.5.2) ',
    tech: ['Bash', 'GitHub Actions', 'CI/CD'],
    image: tagAndReleaseHeader,
    link: 'https://github.com/marketplace/actions/tag-and-release-semantic-version',
    github_link: 'https://github.com/chase-roohms/tag-and-release',
  },
  {
    id: 'dumpsterr',
    fullDate: '2026-01-08',
    title: 'Dumpsterr',
    description: 'Dockerized Python application that safely empties your Plex trash, verifying file availability before doing so. Prevents unintentional deletion of movies and shows when drives are disconnected.',
    tech: ['Python', 'Docker'],
    image: dumpsterrHeader,
    link: 'https://github.com/chase-roohms/dumpsterr',
    github_link: 'https://github.com/chase-roohms/dumpsterr',
    docker_link: 'https://hub.docker.com/r/neonvariant/dumpsterr',
  },
  {
    id: 'plex-wrapped',
    fullDate: '2025-12-29',
    title: 'Plex Wrapped',
    description: 'Static site generator to share personalized yearly summaries of Plex media consumption with my users.',
    tech: ['Python', 'HTML', 'UI'],
    image: plexWrappedHeader,
    link: 'https://github.com/chase-roohms/plex-wrapped',
    github_link: 'https://github.com/chase-roohms/plex-wrapped'
  },
  {
    id: 'modern-portfolio',
    fullDate: '2025-12-13',
    title: 'Modern Portfolio',
    description: 'Launched a complete overhaul of my portfolio website with Vite, React, TypeScript, and Tailwind CSS.',
    tech: ['React', 'UI'],
    image: websiteHomePageHeader,
    link: 'https://github.com/chase-roohms/chase-roohms.github.io',
    github_link: 'https://github.com/chase-roohms/chase-roohms.github.io'
  },
  {
    id: 'poster-grid-generator',
    fullDate: '2025-11-04',
    title: 'Poster Grid Generator',
    description: 'Python script to generate aesthetic grids to showcase posters I create.',
    tech: ['Python'],
    image: onePacePostersHeader,
    link: 'https://github.com/chase-roohms/poster-tools/blob/main/generate-pretty-display.py',
    github_link: 'https://github.com/chase-roohms/poster-tools'
  },
  {
    id: 'kometa-configs',
    fullDate: '2025-04-18',
    title: 'Automated Kometa Configs',
    description: 'Automates the creation of configuration files for use in Kometa, manages metadata, playlists, collections, etc. for a Plex instance.',
    tech: ['Bash', 'IaC', 'GitHub Actions'],
    image: kometaConfigsHeader,
    link: 'https://github.com/chase-roohms/kometa-configs',
    github_link: 'https://github.com/chase-roohms/kometa-configs'
  },
  {
    id: 'opsgenie-swir',
    fullDate: '2025-04-01',
    title: 'OpsGenie -> SWIR',
    description: 'Led an overhaul of my team\'s incident response platform and enhanced our IR practices.',
    tech: ['Leadership'],
    image: opsgenieSwirHeader,
    link: 'https://www.solarwinds.com/blog/migrating-from-opsgenie-heres-the-incident-response-solution-you-actually-need',
  },
  {
    id: 'homelab',
    fullDate: '2024-12-08',
    title: 'HomeLab',
    description: 'Self-hosted home lab setup for various internal and external services and applications.',
    tech: ['Linux', 'Bash', 'Docker'],
    image: homelabHeader,
    link: '/blog/home-lab-setup',
  },
  {
    id: 'p-dash',
    fullDate: '2024-07-26',
    title: 'P-Dash',
    description: 'An aggressive and speedy port scanner, for when you just need info and don\'t care about being discreet.',
    tech: ['Python', 'Networking', 'Security'],
    image: pDashHeader,
    link: 'https://github.com/chase-roohms/p-dash',
    github_link: 'https://github.com/chase-roohms/p-dash',
  },
  {
    id: 'de-vex',
    fullDate: '2024-07-26',
    title: 'De-Vex',
    description: 'Translates VEX JSON files to human readable text, saving them into a text file for easy review. ',
    tech: ['Python', 'Security'],
    image: deVexHeader,
    link: 'https://github.com/chase-roohms/de-vex',
    github_link: 'https://github.com/chase-roohms/de-vex',
  },
  {
    id: 'mythicmate',
    fullDate: '2023-11-14',
    title: 'MythicMate',
    description: 'Developed a Dockerized, AI powered, Discord companion for Dungeons and Dragons, using Java and OpenAI\'s GPT-4.',
    tech: ['Java', 'AI', 'Docker'],
    image: mythicmateHeader,
    link: 'https://github.com/chase-roohms/mythicmate',
    github_link: 'https://github.com/chase-roohms/mythicmate',
    docker_link: 'https://hub.docker.com/r/neonvariant/mythicmate',
  },
];

export const personalProjects: Project[] = [
  {
    id: 'looney-tunes-posters',
    fullDate: '2025-12-20',
    title: 'Looney Tunes Posters',
    description: 'Created custom posters for original Looney Tunes shows and movies.',
    tech: ['Photoshop'],
    image: looneyTunesPostersHeader,
    link: 'https://github.com/chase-roohms/looney-tunes-assets',
  },
  {
    id: 'one-pace-posters',
    fullDate: '2025-12-13',
    title: 'One Pace Posters',
    description: 'Created custom posters for the One Pace fan-edit project.',
    tech: ['Photoshop'],
    image: onePacePostersHeader,
    link: 'https://www.reddit.com/r/onepace/comments/1pleut8/one_pace_location_posters/',
  },
  {
    id: 'tom-jerry-posters',
    fullDate: '2025-12-01',
    title: 'Tom & Jerry Posters',
    description: 'Created custom posters for the Tom & Jerry shows and movies.',
    tech: ['Photoshop'],
    image: tomJerryPostersHeader,
    link: 'https://theposterdb.com/set/371611',
  },
];
