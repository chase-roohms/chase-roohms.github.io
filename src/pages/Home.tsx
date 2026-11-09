import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import FeaturedPost from '../components/FeaturedPost';
import FeatureCard from '../components/FeatureCard';
import { getFeaturedProject } from '../utils/projectsData';
import { fetchGitHubStars, fetchDockerHubPulls, fetchGHCRPulls, formatNumber } from '../utils/projectStats';
import { profileData } from '../utils/profileData';
import { getPageTitle } from '../utils/pageTitle';
import { getAllBlogPosts, getAllBlogPostsSync, type BlogPost } from '../utils/blogLoader';
import headshot from '../assets/images/headshot.webp';
import transmuteFeature from '../assets/images/transmute-feature.webp';

export default function Home() {
  const { name, headline } = profileData;
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

      {/* Featured project: same card as the latest post, image on the right */}
      {featuredProject && (
        <section className="py-12 md:py-16 border-t border-gray-800">
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="text-3xl font-bold">Featured project</h2>
            <Link to="/projects/" className="text-gray-300 hover:text-ivory transition-colors text-sm font-medium">
              All projects →
            </Link>
          </div>
          <FeatureCard
            href={featuredProject.link ?? '/projects/'}
            external
            image={transmuteFeature}
            imageAlt="The Transmute converter: drop a file, pick a format"
            imageSide="right"
            eyebrow="Open source"
            meta="Self-hosted"
            title={featuredProject.title}
            description={featuredProject.description}
            footer={[
              stars !== undefined ? `${stars.toLocaleString()} GitHub stars` : null,
              pulls !== undefined ? `${formatNumber(pulls)} pulls` : null,
            ].filter(Boolean).join(' · ')}
            action="transmute.sh"
          />
        </section>
      )}

      {/* A little about me, with a way to read more */}
      <section className="py-12 md:py-14 border-t border-gray-800">
        <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="max-w-2xl text-xl text-gray-300 md:text-2xl">
            A lifelong tinkerer with a habit of turning small ideas into unnecessarily elaborate projects.
          </p>
          <Link to="/about/" className="btn-secondary shrink-0">
            More about me →
          </Link>
        </div>
      </section>

      {/* Latest writing */}
      {recentPost && (
        <section className="py-12 md:py-16 border-t border-gray-800">
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="text-3xl font-bold">Latest from the blog</h2>
            <Link to="/blog/" className="text-gray-300 hover:text-ivory transition-colors text-sm font-medium">
              All posts →
            </Link>
          </div>
          <FeaturedPost post={recentPost} />
        </section>
      )}
      </div>
    </>
  );
}
