import { FaRobot, FaCodeBranch, FaCloud, FaCode, FaLayerGroup } from 'react-icons/fa';
import type { IconType } from 'react-icons';
import { getSkillGroups } from '../utils/resumeLoader';

// Groups and items come from src/content/resume/resume.yaml (cv.sections.skills),
// so the site and the resume stay in sync.
const groupIcons: Record<string, IconType> = {
  AI: FaRobot,
  DevOps: FaCodeBranch,
  'Cloud & Infrastructure': FaCloud,
  Languages: FaCode,
};

export default function Skills() {
  const groups = getSkillGroups();

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {groups.map((group) => {
        const Icon = groupIcons[group.label] ?? FaLayerGroup;
        return (
          <section key={group.label} className="surface rounded-xl p-5">
            <h3 className="mb-4 flex items-center gap-2.5 text-base font-semibold text-ivory">
              <Icon className="h-4 w-4 text-gray-400" aria-hidden="true" />
              {group.label}
            </h3>
            <ul className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded-md border border-gray-800 bg-gray-950/60 px-2.5 py-1 text-sm text-gray-200"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
