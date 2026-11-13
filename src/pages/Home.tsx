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
import transmuteFeature from '../assets/images/transmute-feature.webp';

export default function Home() {
  const { name } = profileData;
  const first_name = name.split(" ")[0];
  const last_name = name.split(" ")[1];
  
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
      {/* Hero: name set large behind the portrait, title and CTA on the left */}
      <section className="relative">
        <div className="relative flex flex-col items-center">
          <h1 className="hero-name relative z-0 w-full whitespace-nowrap text-center font-bold uppercase leading-[0.85] tracking-[-0.045em] text-[clamp(2rem,11.2vw,8.75rem)]">
            <span className="hero-name__outline">{first_name}</span>{' '}
            <span className="text-ivory">{last_name}</span>
          </h1>

          <img
            src="/headshot-hero-1000.webp"
            srcSet="/headshot-hero-600.webp 600w, /headshot-hero-1000.webp 1000w"
            sizes="(min-width: 768px) 30rem, 82vw"
            width={1000}
            height={885}
            alt="Chase Roohms"
            fetchPriority="high"
            className="hero-portrait relative z-10 -mt-[clamp(1rem,4.5vw,3.5rem)] w-[min(82vw,30rem)] select-none"
          />

          <div className="relative z-20 mt-6 pb-12 text-center lg:absolute lg:bottom-[14%] lg:left-0 lg:mt-0 lg:pb-0 lg:text-left">
            <p className="text-xl font-semibold text-ivory lg:text-2xl">Senior Software Engineer</p>
            <p className="mt-2 text-sm leading-relaxed text-gray-400 max-[374px]:text-xs">
              <span className="block whitespace-nowrap">Building the AI Developer Platform at SolarWinds.</span>
              <span className="block whitespace-nowrap">
                Founder of{' '}
                <a
                  href="https://transmute.sh"
                  target="_blank"
                  rel="noopener noreferrer"
                  referrerPolicy="no-referrer"
                  className="text-gray-200 underline decoration-primary-400/60 underline-offset-4 hover:decoration-primary-400 transition-colors"
                >
                  Transmute
                </a>
              </span>
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <Link to="/about/" className="btn-primary border border-transparent text-sm">
                About Me →
              </Link>
              <a
                href="https://www.google.com/search?q=Chase+Roohms"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-sm"
              >
                Google Me
              </a>
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
