import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Skills from '../components/Skills';
import headshot from '../assets/images/headshot.webp';

export default function Home() {
  const name = "Chase Roohms";
  const first_name = name.split(" ")[0];
  const last_name = name.split(" ")[1];
  const headline = "DevOps Engineer at SolarWinds and an Automation Evangelist";
  const biography = "I'm a DevOps Engineer at SolarWinds, where I specialize in automation and infrastructure as code. I have a passion for solving complex problems and enjoy working on projects that involve both software development and IT security.";
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
      <div className="section-container py-8 md:py-20">
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
            <div className="flex gap-4">
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

      {/* Quick About */}
      <section className="py-20 border-t border-gray-800">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">About Me</h2>
          <p className="text-gray-400 text-lg text-center mb-6">
            {biography}
          </p>
          <div className="flex justify-center">
            <Link to="/about" className="btn-secondary">
              Read My Full Bio
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Skills/Tech */}
      <section className="py-20 border-t border-gray-800">
        <h2 className="text-3xl font-bold mb-12 text-center">Skills & Technologies</h2>
        <Skills />
      </section>
      </div>
    </>
  );
}
