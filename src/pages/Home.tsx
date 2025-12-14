import { Link } from 'react-router-dom';
import Skills from '../components/Skills';
import headshot from '../assets/images/headshot.webp';

export default function Home() {
  const name = "Chase Roohms";
  const headline = "DevOps Engineer at SolarWinds and an Automation Evangelist";
  const biography = "I'm a DevOps Engineer at SolarWinds, where I specialize in automation and infrastructure as code. I have a passion for solving complex problems and enjoy working on projects that involve both software development and IT security.";
  return (
    <div className="section-container py-20">
      {/* Hero Section */}
      <section className="py-20">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Text Content */}
          <div className="flex-1">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 whitespace-nowrap">
              Hi, I'm <a href="https://www.google.com/search?q=Chase+Roohms" target="_blank" rel="noopener noreferrer" className="text-[#ff6200] inline-block transition-transform duration-300 hover:scale-110 cursor-pointer">{name}</a>
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
          <div className="flex-1 flex justify-center md:justify-end">
            <div className="w-64 h-64 md:w-80 md:h-80 bg-gray-900 border-2 border-gray-800 rounded-2xl flex items-center justify-center">
              <img src={headshot} alt="Headshot" loading="lazy" className="w-full h-full object-cover rounded-2xl" />
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
              Learn More
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
  );
}
