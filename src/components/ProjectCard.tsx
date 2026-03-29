import { useState, useEffect } from 'react';
import Card from './Card';
import type { Project } from '../utils/projectsData';
import { fetchGitHubStars, fetchDockerHubPulls, fetchGHCRPulls } from '../utils/projectStats';

interface ProjectCardProps {
  project: Project;
  showTech?: boolean;
  onTopicClick?: (topic: string) => void;
}

export default function ProjectCard({ project, showTech = true, onTopicClick }: ProjectCardProps) {
  const [githubStars, setGithubStars] = useState<number | undefined>(undefined);
  const [dockerPulls, setDockerPulls] = useState<number | undefined>(undefined);
  const [ghcrPulls, setGhcrPulls] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (project.github_link) {
      fetchGitHubStars(project.github_link).then(setGithubStars);
    }
    if (project.docker_link) {
      fetchDockerHubPulls(project.docker_link).then(setDockerPulls);
    }
    if (project.ghcr_link) {
      fetchGHCRPulls(project.ghcr_link).then(setGhcrPulls);
    }
  }, [project.github_link, project.docker_link, project.ghcr_link]);

  // Combine Docker and GHCR pulls
  const hasDocker = dockerPulls !== undefined && dockerPulls > 0;
  const hasGhcr = ghcrPulls !== undefined && ghcrPulls > 0;
  const combinedPulls = (hasDocker || hasGhcr)
    ? (dockerPulls ?? 0) + (ghcrPulls ?? 0)
    : undefined;
  const pullsTooltip = hasDocker && hasGhcr
    ? 'Docker and GHCR.io pulls'
    : hasGhcr
      ? 'GHCR.io pulls'
      : 'Docker pulls';

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
      dockerPulls={combinedPulls}
      pullsTooltip={pullsTooltip}
    />
  );
}
