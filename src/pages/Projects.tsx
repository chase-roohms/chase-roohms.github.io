import { FaProjectDiagram } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
import { professionalProjects, personalProjects } from '../utils/projectsData';
import ProjectCard from '../components/ProjectCard';

export default function Projects() {
  // Sort projects by date (newest first)
  const sortedProfessionalProjects = [...professionalProjects].sort((a, b) => 
    new Date(b.fullDate).getTime() - new Date(a.fullDate).getTime()
  );

  const sortedPersonalProjects = [...personalProjects].sort((a, b) => 
    new Date(b.fullDate).getTime() - new Date(a.fullDate).getTime()
  );

  return (
    <>
      <Helmet>
        <title>Projects - Chase Roohms - DevOps Engineer & Automation Evangelist</title>
        <meta name="description" content="Professional and personal projects by Chase Roohms, including DevOps automation, web applications, and infrastructure solutions." />
        <meta name="author" content="Chase Roohms" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://chaseroohms.com/projects" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Chase Roohms" />
        <meta property="og:title" content="Projects - Chase Roohms" />
        <meta property="og:description" content="Professional and personal projects by Chase Roohms, including DevOps automation, web applications, and infrastructure solutions." />
        <meta property="og:image" content="https://chaseroohms.com/social-preview.webp" />
        <meta property="og:image:type" content="image/webp" />
        <meta property="og:image:alt" content="Chase Roohms - DevOps Engineer Portfolio" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Projects - Chase Roohms" />
        <meta name="twitter:description" content="Professional and personal projects by Chase Roohms, including DevOps automation, web applications, and infrastructure solutions." />
        <meta name="twitter:image" content="https://chaseroohms.com/social-preview.webp" />
        <link rel="canonical" href="https://chaseroohms.com/projects" />
      </Helmet>
      <div className="section-container py-8 md:py-20">
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
          {sortedProfessionalProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* Personal Projects Section */}
      <section>
        <h2 className="text-3xl font-bold mb-3 text-primary-400">Personal</h2>
        <p className="text-gray-400 mb-8">
          A peek behind the curtains at some of my other projects and hobbies.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedPersonalProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
      </div>
    </>
  );
}
