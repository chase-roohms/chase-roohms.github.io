import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import Skills from '../components/Skills';
import CircuitDecoration from '../components/CircuitDecoration';
import ProjectCard from '../components/ProjectCard';
import BlogPostCard from '../components/BlogPostCard';
import { getFeaturedProject } from '../utils/projectsData';
import { profileData } from '../utils/profileData';
import { getAllBlogPosts, type BlogPost } from '../utils/blogLoader';
import headshot from '../assets/images/headshot.webp';

export default function Home() {
  const { name, headline, biography } = profileData;
  const first_name = name.split(" ")[0];
  const last_name = name.split(" ")[1];
  
  const [recentPost, setRecentPost] = useState<BlogPost | null>(null);
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
        <title>Chase Roohms - DevOps Engineer & Automation Evangelist</title>
        <meta name="description" content="DevOps Engineer at SolarWinds specializing in automation and infrastructure as code. Explore my projects, blog posts, and professional journey." />
        <meta name="author" content="Chase Roohms" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://chaseroohms.com/" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Chase Roohms" />
        <meta property="og:title" content="Chase Roohms - DevOps Engineer" />
        <meta property="og:description" content="DevOps Engineer at SolarWinds specializing in automation and infrastructure as code." />
        <meta property="og:image" content="https://chaseroohms.com/social-preview.webp" />
        <meta property="og:image:type" content="image/webp" />
        <meta property="og:image:alt" content="Chase Roohms - DevOps Engineer Portfolio" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Chase Roohms - DevOps Engineer" />
        <meta name="twitter:description" content="DevOps Engineer at SolarWinds specializing in automation and infrastructure as code." />
        <meta name="twitter:image" content="https://chaseroohms.com/social-preview.webp" />
        <link rel="canonical" href="https://chaseroohms.com/" />
      </Helmet>
      
      <CircuitDecoration />
      
      <div className="section-container py-8 md:py-20 relative z-10">
      {/* Hero Section */}
      <section className="pb-8 md:py-20">
        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Text Content */}
          <div className="flex-[2]">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Hi, I'm <a href="https://www.google.com/search?q=Chase+Roohms" target="_blank" rel="noopener noreferrer" className="text-[#ff6200] cursor-pointer [&>span]:inline-block [&>span]:transition-transform [&>span]:duration-300 hover:[&>span]:scale-110"><span>{first_name}</span> <span>{last_name}</span></a>
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              {headline}
            </p>
            <div className="flex gap-4 justify-center md:justify-start">
              <Link to="/projects" className="btn-primary">
                My Projects
              </Link>
              <Link to="/contact" className="btn-secondary">
                Get in Touch
              </Link>
            </div>
          </div>

          {/* Image Placeholder */}
          <div className="flex-1 flex justify-center md:justify-end mt-8 md:mt-0">
            <div className="w-48 h-48 md:w-80 md:h-80 bg-gray-900 border-2 border-gray-800 rounded-2xl flex items-center justify-center">
              <img src={headshot} alt="Headshot" fetchPriority="high" className="w-full h-full object-cover rounded-2xl" />
            </div>
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
              {biography.map((paragraph, index) => (
                <p key={index} className="text-gray-400 text-lg">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="text-center">
              <Link to="/about" className="btn-secondary inline-block">
                Learn More About Me
              </Link>
            </div>
          </div>

          {/* Recent Blog Post Section */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold">Latest Blog Post</h2>
              <Link to="/blog" className="text-primary-400 hover:text-primary-300 transition-colors text-sm font-semibold">
                View All →
              </Link>
            </div>
            {recentPost ? (
              <BlogPostCard post={recentPost} showTopics={false} />
            ) : (
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                <p className="text-gray-400">Loading...</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Project & Skills */}
      <section className="py-4 md:py-20 md:border-t border-gray-800">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Recent Project Section */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold">Featured Project</h2>
              <Link to="/projects" className="text-primary-400 hover:text-primary-300 transition-colors text-sm font-semibold">
                View All →
              </Link>
            </div>
            {featuredProject && (
              <ProjectCard 
                project={featuredProject}
                showTech={false}
              />
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
