import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import Skills from '../components/Skills';
import BiographyText from '../components/BiographyText';
import ProjectCard from '../components/ProjectCard';
import BlogPostCard from '../components/BlogPostCard';
import { getFeaturedProject } from '../utils/projectsData';
import { profileData } from '../utils/profileData';
import { getPageTitle } from '../utils/pageTitle';
import { getAllBlogPosts, getAllBlogPostsSync, type BlogPost } from '../utils/blogLoader';
import headshot from '../assets/images/headshot.webp';

export default function Home() {
  const { name, headline, biography } = profileData;
  const first_name = name.split(" ")[0];
  const last_name = name.split(" ")[1];
  const [primaryHeadline] = headline.split('\n');
  
  const [recentPost, setRecentPost] = useState<BlogPost | null>(() => getAllBlogPostsSync()[0] ?? null);
  const featuredProject = getFeaturedProject();

  useEffect(() => {
    getAllBlogPosts().then(posts => {
      if (posts.length > 0) {
        setRecentPost(posts[0]);
      }
    });
  }, []);
  return (
    <>
      <Helmet>
        <title>{getPageTitle()}</title>
        <meta name="description" content="Senior Software Engineer on the AI Developer Platform team at SolarWinds, building enterprise AI infrastructure and developer tooling. Explore my projects, blog posts, and professional journey." />
        <meta name="author" content="Chase Roohms" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://chaseroohms.com/" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Chase Roohms" />
        <meta property="og:title" content="Chase Roohms - Senior Software Engineer" />
        <meta property="og:description" content="Senior Software Engineer on the AI Developer Platform team at SolarWinds, building enterprise AI infrastructure and developer tooling." />
        <meta property="og:image" content="https://chaseroohms.com/social-preview.webp" />
        <meta property="og:image:type" content="image/webp" />
        <meta property="og:image:alt" content="Chase Roohms - Software Engineer Portfolio" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Chase Roohms - Senior Software Engineer" />
        <meta name="twitter:description" content="Senior Software Engineer on the AI Developer Platform team at SolarWinds, building enterprise AI infrastructure and developer tooling." />
        <meta name="twitter:image" content="https://chaseroohms.com/social-preview.webp" />
        <link rel="canonical" href="https://chaseroohms.com/" />
      </Helmet>
      
      <div className="section-container py-10 md:py-20">
      {/* Hero Section */}
      <section className="pb-12 md:pb-20">
        <div className="flex flex-col-reverse md:flex-row items-center gap-10 md:gap-12">
          <div className="flex-[2] text-center md:text-left">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-primary-400">
              <a href="https://www.google.com/search?q=Chase+Roohms" target="_blank" rel="noopener noreferrer">
                {first_name} {last_name}
              </a>
            </h1>
            <p className="text-xl text-gray-400 mb-8 max-w-xl mx-auto md:mx-0">
              <span className="block">{primaryHeadline}</span>
              <span className="block mt-2">
                Founder of{' '}
                <a
                  href="https://transmute.sh"
                  target="_blank"
                  rel="noopener noreferrer"
                  referrerPolicy="no-referrer"
                  className="text-primary-400 hover:text-primary-300 transition-colors"
                >
                  Transmute
                </a>
              </span>
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <Link to="/projects/" className="btn-primary">
                My Projects
              </Link>
              <Link to="/contact/" className="btn-secondary">
                Get in Touch
              </Link>
            </div>
          </div>

          <div className="flex-1 flex justify-center md:justify-end">
            <img
              src={headshot}
              alt="Chase Roohms professional headshot"
              fetchPriority="high"
              className="w-48 h-48 md:w-72 md:h-72 rounded-2xl object-cover border border-gray-700 grayscale-[15%]"
            />
          </div>
        </div>
      </section>

      {/* About & Blog Post */}
      <section className="py-4 md:py-20 md:border-t border-gray-800">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* About Me Section */}
          <div>
            <h2 className="text-3xl font-bold mb-6">About Me</h2>
            <div className="space-y-4 mb-6">
              <BiographyText paragraphs={biography} className="text-gray-400 text-lg" />
            </div>
            <div className="text-center">
              <Link to="/about/" className="btn-secondary inline-block">
                Learn More About Me
              </Link>
            </div>
          </div>
          
          {/* Recent Project Section */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold">Featured Project</h2>
              <Link to="/projects/" className="text-primary-400 hover:text-primary-300 transition-colors text-sm font-semibold">
                All Projects →
              </Link>
            </div>
            {featuredProject && (
              <ProjectCard 
                project={featuredProject}
                showTech={false}
              />
            )}
          </div>
        </div>
      </section>

      {/* Project & Skills */}
      <section className="py-4 md:py-20 md:border-t border-gray-800">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Recent Blog Post Section */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold">Latest Blog Post</h2>
              <Link to="/blog/" className="text-primary-400 hover:text-primary-300 transition-colors text-sm font-semibold">
                All Blogs →
              </Link>
            </div>
            {recentPost ? (
              <BlogPostCard post={recentPost} showTopics={false} />
            ) : (
              <div className="surface rounded-2xl p-6">
                <p className="text-gray-400">Loading...</p>
              </div>
            )}
          </div>

          {/* Skills & Technologies Section */}
          <div>
            <h2 className="text-3xl font-bold mb-6">Skills & Technologies</h2>
            <Skills compact />
          </div>
        </div>
      </section>
      </div>
    </>
  );
}
