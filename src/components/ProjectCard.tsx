import Card from './Card';
import type { Project } from '../utils/projectsData';

interface ProjectCardProps {
  project: Project;
  showTech?: boolean;
}

export default function ProjectCard({ project, showTech = true }: ProjectCardProps) {
  return (
    <Card
      image={project.image}
      imageAlt={project.title}
      title={project.title}
      description={project.description}
      date={project.fullDate}
      tags={project.tech}
      showTags={showTech}
      link={project.link}
      wrapInLink={true}
    />
  );
}
