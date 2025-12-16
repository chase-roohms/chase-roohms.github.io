import { SiPython, SiGnubash, SiLinux, SiDocker, SiGithubactions, SiGooglecloud, SiTerraform, SiApachemaven } from 'react-icons/si';
import { FaKey, FaJava, FaCogs, FaNetworkWired } from 'react-icons/fa';

interface SkillsProps {
  compact?: boolean;
}

export default function Skills({ compact = false }: SkillsProps) {
  const skills = [
    { 
      name: 'Automation',
      icon: FaCogs,
      proficiency: 100,
    },
    { 
      name: 'Python',
      icon: SiPython,
      proficiency: 90,
    },
    { 
      name: 'Linux',
      icon: SiLinux,
      proficiency: 90,
    },
    { 
      name: 'CI/CD',
      icon: SiGithubactions,
      proficiency: 90,
    },
    { 
      name: 'Bash',
      icon: SiGnubash,
      proficiency: 85,
    },
    { 
      name: 'Networking',
      icon: FaNetworkWired,
      proficiency: 85,
    },
    { 
      name: 'Docker',
      icon: SiDocker,
      proficiency: 85,
    },
    { 
      name: 'Code Signing',
      icon: FaKey,
      proficiency: 80,
    },
    { 
      name: 'GCP',
      icon: SiGooglecloud,
      proficiency: 75,
    },
    { 
      name: 'IAC',
      icon: SiTerraform,
      proficiency: 70,
    },
    { 
      name: 'Java',
      icon: FaJava,
      proficiency: 60,
    },
    { 
      name: 'Maven',
      icon: SiApachemaven,
      proficiency: 50,
    },
  ].sort((a, b) => b.proficiency - a.proficiency);

  return (
    <div className={`grid gap-3 ${compact ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'}`}>
      {skills.map((skill) => {
        const circumference = 2 * Math.PI * 14; // radius = 14
        const strokeDashoffset = circumference - (skill.proficiency / 100) * circumference;
        
        return (
          <div
            key={skill.name}
            className="flex items-center gap-2.5 p-2.5 bg-gray-900 border border-gray-800 rounded-lg hover:bg-gray-800 hover:border-primary-500 transition-all"
          >
            {/* Circular Progress Ring with Icon */}
            <div className="relative w-8 h-8 flex-shrink-0">
              <svg className="w-8 h-8 transform -rotate-90">
                {/* Background circle */}
                <circle
                  cx="16"
                  cy="16"
                  r="14"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  fill="none"
                  className="text-gray-700"
                />
                {/* Progress circle */}
                <circle
                  cx="16"
                  cy="16"
                  r="14"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  fill="none"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  className="text-primary-500 transition-all duration-1000 ease-out"
                  strokeLinecap="round"
                />
              </svg>
              {/* Icon in center */}
              <div className="absolute inset-0 flex items-center justify-center">
                <skill.icon className="w-4 h-4 text-primary-400" />
              </div>
            </div>
            
            {/* Skill Name */}
            <p className="font-semibold text-gray-200 text-sm flex-1">{skill.name}</p>
          </div>
        );
      })}
    </div>
  );
}
