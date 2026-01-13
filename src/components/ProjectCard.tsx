import { useState, useEffect } from 'react';
import Card from './Card';
import type { Project } from '../utils/projectsData';
import { fetchGitHubStars, fetchDockerHubPulls } from '../utils/projectStats';

interface ProjectCardProps {
  project: Project;
  showTech?: boolean;
  onTopicClick?: (topic: string) => void;
}

export default function ProjectCard({ project, showTech = true, onTopicClick }: ProjectCardProps) {
  const [githubStars, setGithubStars] = useState<number | undefined>(undefined);
  const [dockerPulls, setDockerPulls] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (project.github_link) {
      fetchGitHubStars(project.github_link).then(setGithubStars);
    }
    if (project.docker_link) {
      fetchDockerHubPulls(project.docker_link).then(setDockerPulls);
    }
  }, [project.github_link, project.docker_link]);

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
      githubStars={githubStars}
      dockerPulls={dockerPulls}
    />
  );
}
