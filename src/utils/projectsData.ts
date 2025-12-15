import opsgenieSwirHeader from '../assets/images/opsgenie-swir-header.webp';
import homelabHeader from '../assets/images/homelab-header.webp';
import mythicmateHeader from '../assets/images/mythicmate-header.webp';
import onePacePostersHeader from '../assets/images/one-pace-posters-header.webp';
import tomJerryPostersHeader from '../assets/images/tom-jerry-posters-header.webp';
import websiteHomePageHeader from '../assets/images/website-home-page-header.webp';

export interface Project {
  id: string;
  fullDate: string;
  title: string;
  description: string;
  tech: string[];
  image: string;
  link?: string;
}

export const professionalProjects: Project[] = [
  {
    id: 'modern-portfolio',
    fullDate: '2025-12-13',
    title: 'Modern Portfolio',
    description: 'Launched a complete overhaul of my portfolio website with Vite, React, TypeScript, and Tailwind CSS.',
    tech: ['Vite', 'React', 'TypeScript', 'Tailwind'],
    image: websiteHomePageHeader,
    link: 'https://github.com/chase-roohms/chase-roohms.github.io',
  },
  {
    id: 'opsgenie-swir',
    fullDate: '2025-04-01',
    title: 'OpsGenie -> SWIR',
    description: 'Led an overhaul of my team\'s incident response platform and enhanced our IR practices.',
    tech: ['Leadership', 'Incident Response'],
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
    id: 'mythicmate',
    fullDate: '2023-11-14',
    title: 'MythicMate',
    description: 'Developed an AI powered Discord companion for Dungeons and Dragons, using Java and OpenAI\'s GPT-4.',
    tech: ['Java', 'Maven', 'OpenAI'],
    image: mythicmateHeader,
    link: 'https://github.com/chase-roohms/MythicMate',
  },
];

export const personalProjects: Project[] = [
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
