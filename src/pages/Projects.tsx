import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FaProjectDiagram, FaSearch } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
import { professionalProjects, personalProjects } from '../utils/projectsData';
import ProjectCard from '../components/ProjectCard';

export default function Projects() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedTopic = searchParams.get('topic') || 'All';
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');

  // Sort projects by date (newest first)
  const sortedProfessionalProjects = [...professionalProjects].sort((a, b) => 
    new Date(b.fullDate).getTime() - new Date(a.fullDate).getTime()
  );

  const sortedPersonalProjects = [...personalProjects].sort((a, b) => 
    new Date(b.fullDate).getTime() - new Date(a.fullDate).getTime()
  );

  // Get all unique topics from tech field across all projects
  const allProjects = [...professionalProjects, ...personalProjects];
  const allTopics = ['All', ...new Set(allProjects.flatMap(project => project.tech))];

  // Filter function
  const filterProjects = (projects: typeof professionalProjects) => {
    return projects.filter(project => {
      const matchesTopic = selectedTopic === 'All' || project.tech.includes(selectedTopic);
      const matchesSearch = searchQuery === '' ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tech.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesTopic && matchesSearch;
    });
  };

  const filteredProfessionalProjects = filterProjects(sortedProfessionalProjects);
  const filteredPersonalProjects = filterProjects(sortedPersonalProjects);
  const totalFilteredProjects = filteredProfessionalProjects.length + filteredPersonalProjects.length;

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
      <p className="text-gray-400 text-lg mb-8">
        Here are some of my professional and personal projects.
      </p>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search projects by title, description, or technology..."
            value={searchQuery}
            onChange={(e) => {
              const value = e.target.value;
              setSearchQuery(value);
              const newParams: Record<string, string> = {};
              if (value) newParams.search = value;
              if (selectedTopic !== 'All') newParams.topic = selectedTopic;
              setSearchParams(newParams);
            }}
            className="w-full pl-12 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
          />
        </div>
      </div>

      {/* Topic Filter */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Filter by Topic</h2>
        <div className="flex flex-wrap gap-2">
          {allTopics.map(topic => (
            <button
              key={topic}
              onClick={() => {
                const newParams: Record<string, string> = {};
                if (searchQuery) newParams.search = searchQuery;
                if (topic !== 'All') newParams.topic = topic;
                setSearchParams(newParams);
              }}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                selectedTopic === topic
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {topic}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      {(searchQuery || selectedTopic !== 'All') && (
        <p className="text-gray-400 mb-6">
          Found {totalFilteredProjects} project{totalFilteredProjects !== 1 ? 's' : ''}
          {searchQuery && ` matching "${searchQuery}"`}
          {selectedTopic !== 'All' && ` with ${selectedTopic}`}
        </p>
      )}

      {/* No Results */}
      {totalFilteredProjects === 0 ? (
        <p className="text-gray-400 text-center py-12">
          No projects found. Try adjusting your search or filters.
        </p>
      ) : (
        <>
          {/* Professional Projects Section */}
          {filteredProfessionalProjects.length > 0 && (
            <section className="mb-20">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProfessionalProjects.map((project) => (
                  <ProjectCard 
                    key={project.id} 
                    project={project} 
                    onTopicClick={(topic) => {
                      const newParams: Record<string, string> = {};
                      if (searchQuery) newParams.search = searchQuery;
                      newParams.topic = topic;
                      setSearchParams(newParams);
                    }}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Personal Projects Section */}
          {filteredPersonalProjects.length > 0 && (
            <section>
              <h2 className="text-3xl font-bold mb-3 text-primary-400">Personal</h2>
              <p className="text-gray-400 mb-8">
                A peek behind the curtains at some of my other projects and hobbies.
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPersonalProjects.map((project) => (
                  <ProjectCard 
                    key={project.id} 
                    project={project} 
                    onTopicClick={(topic) => {
                      const newParams: Record<string, string> = {};
                      if (searchQuery) newParams.search = searchQuery;
                      newParams.topic = topic;
                      setSearchParams(newParams);
                    }}
                  />
                ))}
              </div>
            </section>
          )}
        </>
      )}
      </div>
    </>
  );
}
