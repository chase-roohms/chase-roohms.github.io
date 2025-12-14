import { FaProjectDiagram } from 'react-icons/fa';
import opsgenieSwirHeader from '../assets/images/opsgenie-swir-header.webp';
import homelabHeader from '../assets/images/homelab-header.webp';
import mythicmateHeader from '../assets/images/mythicmate-header.webp';
import onePacePostersHeader from '../assets/images/one-pace-posters-header.webp';
import tomJerryPostersHeader from '../assets/images/tom-jerry-posters-header.webp';

export default function Projects() {
  const professionalProjects = [
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
      fullDate: '2024-12-01',
      title: 'HomeLab',
      description: 'Self-hosted home lab setup for various internal and external services and applications.',
      tech: ['Linux', 'Bash', 'Docker'],
      image: homelabHeader,
      link: '/blog/home-lab-setup',
    },
    {
      id: 'mythicmate',
      fullDate: '2023-11-01',
      title: 'MythicMate',
      description: 'Developed an AI powered Discord companion for Dungeons and Dragons, using Java and OpenAI\'s GPT-4.',
      tech: ['Java', 'Maven', 'OpenAI'],
      image: mythicmateHeader,
      link: 'https://github.com/chase-roohms/MythicMate',
    },
  ];

  const personalProjects = [
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

  // Sort projects by date (newest first)
  const sortedProfessionalProjects = [...professionalProjects].sort((a, b) => 
    new Date(b.fullDate).getTime() - new Date(a.fullDate).getTime()
  );

  const sortedPersonalProjects = [...personalProjects].sort((a, b) => 
    new Date(b.fullDate).getTime() - new Date(a.fullDate).getTime()
  );

  // Reusable project card renderer
  const renderProjectCard = (project: typeof professionalProjects[0]) => (
    <div
      key={project.id}
      className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-primary-500 hover:bg-gray-800 transition-all"
    >
      <div className="bg-gray-800 h-48 rounded-lg mb-4 flex items-center justify-center">
        <img src={project.image} alt={project.title} loading="lazy" className="h-full w-full object-cover" />
      </div>

      <h3 className="text-xl font-bold mb-2">{project.title}</h3>
      <p className="text-gray-400 mb-4">{project.description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {project.tech.map((tech) => (
          <span
            key={tech}
            className="text-sm bg-primary-950 text-primary-400 border border-primary-800 px-3 py-1 rounded-full"
          >
            {tech}
          </span>
        ))}
      </div>

      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-400 hover:text-primary-300 font-semibold"
        >
          View Project →
        </a>
      )}
    </div>
  );

  return (
    <div className="section-container py-20">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center gap-3">
        <FaProjectDiagram className="text-primary-400" />
        Projects
      </h1>
      <p className="text-gray-400 text-lg mb-12">
        Here are some of my professional and personal projects.
      </p>

      {/* Professional Projects Section */}
      <section className="mb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedProfessionalProjects.map(renderProjectCard)}
        </div>
      </section>

      {/* Personal Projects Section */}
      <section>
        <h2 className="text-3xl font-bold mb-3 text-primary-400">Personal</h2>
        <p className="text-gray-400 mb-8">
          A peek behind the curtains at some of my other projects and hobbies.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedPersonalProjects.map(renderProjectCard)}
        </div>
      </section>
    </div>
  );
}
