import Card from './Card';
import type { Project } from '../utils/projectsData';

interface ProjectCardProps {
  project: Project;
  showTech?: boolean;
  onTopicClick?: (topic: string) => void;
}

export default function ProjectCard({ project, showTech = true, onTopicClick }: ProjectCardProps) {
  return (
    <Card
      image={project.image}
      imageAlt={project.title}
      title={project.title}
      description={project.description}
      date={project.fullDate}
      tags={project.tech}
      showTags={showTech}
      onTagClick={onTopicClick}
      link={project.link}
      wrapInLink={true}
    />
  );
}
