import { SiPython, SiGnubash, SiLinux, SiDocker, SiGithubactions, SiGooglecloud, SiTerraform, SiApachemaven } from 'react-icons/si';
import { FaKey, FaJava, FaCogs, FaNetworkWired } from 'react-icons/fa';

export default function Skills() {
  const skills = [
    { 
      name: 'Python',
      icon: SiPython,
    },
    { 
      name: 'Bash',
      icon: SiGnubash,
    },
    { 
      name: 'Linux',
      icon: SiLinux,
    },
    { 
      name: 'Automation',
      icon: FaCogs,
    },
    { 
      name: 'Networking',
      icon: FaNetworkWired,
    },
    { 
      name: 'Docker',
      icon: SiDocker,
    },
    { 
      name: 'CI/CD',
      icon: SiGithubactions,
    },
    { 
      name: 'GCP',
      icon: SiGooglecloud,
    },
    { 
      name: 'Code Signing',
      icon: FaKey,
    },
    { 
      name: 'IAC',
      icon: SiTerraform,
    },
    { 
      name: 'Java',
      icon: FaJava,
    },
    { 
      name: 'Maven',
      icon: SiApachemaven,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {skills.map((skill) => (
        <div
          key={skill.name}
          className="flex items-center gap-3 p-3 bg-gray-900 border border-gray-800 rounded-lg hover:bg-gray-800 hover:border-primary-500 transition-all"
        >
          <skill.icon className="w-5 h-5 text-primary-400 flex-shrink-0" />
          <p className="font-semibold text-gray-200 text-sm">{skill.name}</p>
        </div>
      ))}
    </div>
  );
}
