import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import Skills from '../components/Skills';
import BiographyText from '../components/BiographyText';
import BlogPostCard from '../components/BlogPostCard';
import { getFeaturedProject } from '../utils/projectsData';
import { fetchGitHubStars, fetchDockerHubPulls, fetchGHCRPulls, formatNumber } from '../utils/projectStats';
import { profileData } from '../utils/profileData';
import { getPageTitle } from '../utils/pageTitle';
import { getAllBlogPosts, getAllBlogPostsSync, type BlogPost } from '../utils/blogLoader';
import headshot from '../assets/images/headshot.webp';
import transmuteFeature from '../assets/images/transmute-feature.webp';

export default function Home() {
  const { name, headline, biography } = profileData;
  const first_name = name.split(" ")[0];
  const last_name = name.split(" ")[1];
  const [primaryHeadline] = headline.split('\n');
  
  const [recentPost, setRecentPost] = useState<BlogPost | null>(() => getAllBlogPostsSync()[0] ?? null);
  const featuredProject = getFeaturedProject();

  const [stars, setStars] = useState<number | undefined>();
  const [dockerPulls, setDockerPulls] = useState<number | undefined>();
  const [ghcrPulls, setGhcrPulls] = useState<number | undefined>();
  const pulls = dockerPulls !== undefined || ghcrPulls !== undefined ? (dockerPulls ?? 0) + (ghcrPulls ?? 0) : undefined;

  useEffect(() => {
    if (featuredProject?.github_link) fetchGitHubStars(featuredProject.github_link).then(setStars);
    if (featuredProject?.docker_link) fetchDockerHubPulls(featuredProject.docker_link).then(setDockerPulls);
    if (featuredProject?.ghcr_link) fetchGHCRPulls(featuredProject.ghcr_link).then(setGhcrPulls);
  }, [featuredProject?.github_link, featuredProject?.docker_link, featuredProject?.ghcr_link]);

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
      
      <div className="section-container py-10 md:py-16">
      {/* Hero: portrait and glass share the right-hand side */}
      <section className="relative pb-14 md:pb-20">
        <div className="grid items-center gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:gap-12">
          <div className="order-2 text-center md:order-1 md:text-left">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-ivory">
              <a href="https://www.google.com/search?q=Chase+Roohms" target="_blank" rel="noopener noreferrer">
                {first_name} {last_name}
              </a>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-xl mx-auto md:mx-0">
              <span className="block">{primaryHeadline}</span>
              <span className="block mt-2">
                Founder of{' '}
                <a
                  href="https://transmute.sh"
                  target="_blank"
                  rel="noopener noreferrer"
                  referrerPolicy="no-referrer"
                  className="text-ivory underline decoration-primary-400/60 underline-offset-4 hover:decoration-primary-400 transition-colors"
                >
                  Transmute
                </a>
              </span>
            </p>
            <div className="flex flex-wrap items-center gap-6 justify-center md:justify-start">
              <Link to="/projects/" className="btn-primary">
                My Projects
              </Link>
              <Link to="/contact/" className="font-medium text-gray-200 hover:text-ivory transition-colors">
                Get in touch →
              </Link>
            </div>
          </div>

          <div className="order-1 flex justify-center md:order-2 md:justify-end">
            <div className="relative w-56 sm:w-64 md:w-full md:max-w-[26rem] aspect-[4/5] overflow-hidden rounded-md shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)]">
              <img
                src={headshot}
                alt="Chase Roohms professional headshot"
                fetchPriority="high"
                className="h-full w-full object-cover object-[50%_35%] brightness-[0.9]"
              />
              {/* Darken the stone at the edges so the portrait sits in the scene */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(85%_70%_at_50%_42%,transparent_38%,rgba(15,15,15,0.85)_100%),linear-gradient(to_top,rgba(15,15,15,0.7),transparent_35%),linear-gradient(to_left,rgba(240,180,80,0.10),transparent_40%)]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Transmute owns the first section after the hero */}
      {featuredProject && (
        <section className="py-12 md:py-16 border-t border-gray-800">
          <figure className="grid gap-6 md:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)] md:items-center md:gap-10">
            <a
              href={featuredProject.link}
              target="_blank"
              rel="noopener noreferrer"
              className="order-2 block overflow-hidden rounded-md border border-gray-800 md:order-1"
            >
              <img
                src={transmuteFeature}
                alt="The Transmute converter: drop a file, pick a format"
                loading="lazy"
                className="aspect-[1420/780] w-full object-cover"
              />
            </a>
            <figcaption className="order-1 md:order-2">
              <p className="text-sm text-gray-400 mb-2">Featured project</p>
              <h2 className="text-3xl font-bold text-ivory mb-3">{featuredProject.title}</h2>
              <p className="text-lg text-gray-300 mb-5">{featuredProject.description}</p>
              {(stars !== undefined || pulls !== undefined) && (
                <dl className="flex gap-8 mb-6">
                  {stars !== undefined && (
                    <div>
                      <dt className="text-sm text-gray-400">GitHub stars</dt>
                      <dd className="text-2xl font-semibold tabular-nums text-ivory">{stars.toLocaleString()}</dd>
                    </div>
                  )}
                  {pulls !== undefined && (
                    <div>
                      <dt className="text-sm text-gray-400">Image pulls</dt>
                      <dd className="text-2xl font-semibold tabular-nums text-ivory">{formatNumber(pulls)}</dd>
                    </div>
                  )}
                </dl>
              )}
              <div className="flex flex-wrap gap-5 text-sm font-medium">
                <a href={featuredProject.link} target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-ivory transition-colors">
                  transmute.sh →
                </a>
                <Link to="/projects/" className="text-gray-400 hover:text-ivory transition-colors">
                  All projects →
                </Link>
              </div>
            </figcaption>
          </figure>
        </section>
      )}

      {/* About & Blog Post */}
      <section className="py-12 md:py-16 border-t border-gray-800">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div>
            <h2 className="text-3xl font-bold mb-6">About Me</h2>
            <div className="space-y-4 mb-6">
              <BiographyText paragraphs={biography} className="text-gray-300 text-lg" />
            </div>
            <Link to="/about/" className="btn-secondary inline-flex">
              Learn More About Me
            </Link>
          </div>

          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold">Latest Blog Post</h2>
              <Link to="/blog/" className="text-gray-300 hover:text-ivory transition-colors text-sm font-medium">
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
        </div>
      </section>

      {/* Skills */}
      <section className="py-12 md:py-16 border-t border-gray-800">
        <h2 className="text-3xl font-bold mb-6">Skills & Technologies</h2>
        <Skills />
      </section>
      </div>
    </>
  );
}
