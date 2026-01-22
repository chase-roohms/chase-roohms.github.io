import { useMemo, useState } from 'react';
import { FaProjectDiagram, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
import { professionalProjects, personalProjects } from '../utils/projectsData';
import ProjectCard from '../components/ProjectCard';
import SearchBar from '../components/SearchBar';
import TopicFilter from '../components/TopicFilter';
import FilterResultsCount from '../components/FilterResultsCount';
import { useContentFilter } from '../hooks/useContentFilter';

export default function Projects() {
  const ITEMS_PER_PAGE = 6;
  
  // Pagination state for each section
  const [professionalPage, setProfessionalPage] = useState(0);
  const [personalPage, setPersonalPage] = useState(0);

  // Sort projects by date (newest first)
  const sortedProfessionalProjects = useMemo(() => 
    [...professionalProjects].sort((a, b) => 
      new Date(b.fullDate).getTime() - new Date(a.fullDate).getTime()
    ), []);

  const sortedPersonalProjects = useMemo(() => 
    [...personalProjects].sort((a, b) => 
      new Date(b.fullDate).getTime() - new Date(a.fullDate).getTime()
    ), []);

  // Combine all projects for filtering
  const allProjects = useMemo(() => 
    [...sortedProfessionalProjects, ...sortedPersonalProjects], 
    [sortedProfessionalProjects, sortedPersonalProjects]
  );

  const {
    searchQuery,
    selectedTopic,
    allTopics,
    filteredItems: filteredAllProjects,
    handleSearchChange,
    handleTopicChange,
  } = useContentFilter(allProjects);

  // Separate filtered projects back into professional and personal
  const filteredProfessionalProjects = filteredAllProjects.filter(project =>
    sortedProfessionalProjects.includes(project)
  );
  const filteredPersonalProjects = filteredAllProjects.filter(project =>
    sortedPersonalProjects.includes(project)
  );
  const totalFilteredProjects = filteredAllProjects.length;

  // Reset pagination when filters change
  useMemo(() => {
    setProfessionalPage(0);
    setPersonalPage(0);
  }, [searchQuery, selectedTopic]);

  // Calculate pagination for professional projects
  const professionalTotalPages = Math.ceil(filteredProfessionalProjects.length / ITEMS_PER_PAGE);
  const professionalStartIndex = professionalPage * ITEMS_PER_PAGE;
  const professionalEndIndex = professionalStartIndex + ITEMS_PER_PAGE;
  const paginatedProfessionalProjects = filteredProfessionalProjects.slice(
    professionalStartIndex,
    professionalEndIndex
  );

  // Calculate pagination for personal projects
  const personalTotalPages = Math.ceil(filteredPersonalProjects.length / ITEMS_PER_PAGE);
  const personalStartIndex = personalPage * ITEMS_PER_PAGE;
  const personalEndIndex = personalStartIndex + ITEMS_PER_PAGE;
  const paginatedPersonalProjects = filteredPersonalProjects.slice(
    personalStartIndex,
    personalEndIndex
  );

  // Pagination handlers
  const handleProfessionalPrevPage = () => {
    setProfessionalPage((prev) => Math.max(0, prev - 1));
  };

  const handleProfessionalNextPage = () => {
    setProfessionalPage((prev) => Math.min(professionalTotalPages - 1, prev + 1));
  };

  const handlePersonalPrevPage = () => {
    setPersonalPage((prev) => Math.max(0, prev - 1));
  };

  const handlePersonalNextPage = () => {
    setPersonalPage((prev) => Math.min(personalTotalPages - 1, prev + 1));
  };

  // Pagination component
  const PaginationControls = ({ 
    currentPage, 
    totalPages, 
    onPrevious, 
    onNext,
    itemCount 
  }: { 
    currentPage: number; 
    totalPages: number; 
    onPrevious: () => void; 
    onNext: () => void;
    itemCount: number;
  }) => {
    if (totalPages <= 1) return null;

    return (
      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          onClick={onPrevious}
          disabled={currentPage === 0}
          className="p-3 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          aria-label="Previous page"
        >
          <FaChevronLeft className="text-primary-400" />
        </button>
        <span className="text-gray-400">
          Page {currentPage + 1} of {totalPages} ({itemCount} {itemCount === 1 ? 'project' : 'projects'})
        </span>
        <button
          onClick={onNext}
          disabled={currentPage === totalPages - 1}
          className="p-3 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          aria-label="Next page"
        >
          <FaChevronRight className="text-primary-400" />
        </button>
      </div>
    );
  };

  return (
    <>
      <Helmet>
        <title>Projects - Chase Roohms - DevOps Engineer & Automation Evangelist</title>
        <meta name="description" content="Professional and personal projects by Chase Roohms, including DevOps automation, web applications, and infrastructure solutions." />
        <meta name="author" content="Chase Roohms" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://chaseroohms.com/projects/" />
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
        <link rel="canonical" href="https://chaseroohms.com/projects/" />
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
        <SearchBar
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search projects by title, description, or technology..."
        />
      </div>

      {/* Topic Filter */}
      <div className="mb-12">
        <TopicFilter
          topics={allTopics}
          selectedTopic={selectedTopic}
          onTopicChange={handleTopicChange}
        />
      </div>

      {/* Results Count */}
      <FilterResultsCount
        count={totalFilteredProjects}
        searchQuery={searchQuery}
        selectedTopic={selectedTopic}
        itemType="project"
      />

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
                {paginatedProfessionalProjects.map((project) => (
                  <ProjectCard 
                    key={project.id} 
                    project={project} 
                    onTopicClick={handleTopicChange}
                  />
                ))}
              </div>
              <PaginationControls
                currentPage={professionalPage}
                totalPages={professionalTotalPages}
                onPrevious={handleProfessionalPrevPage}
                onNext={handleProfessionalNextPage}
                itemCount={filteredProfessionalProjects.length}
              />
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
                {paginatedPersonalProjects.map((project) => (
                  <ProjectCard 
                    key={project.id} 
                    project={project} 
                    onTopicClick={handleTopicChange}
                  />
                ))}
              </div>
              <PaginationControls
                currentPage={personalPage}
                totalPages={personalTotalPages}
                onPrevious={handlePersonalPrevPage}
                onNext={handlePersonalNextPage}
                itemCount={filteredPersonalProjects.length}
              />
            </section>
          )}
        </>
      )}
      </div>
    </>
  );
}
