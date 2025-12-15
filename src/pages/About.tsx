import { BsBuilding } from 'react-icons/bs';
import { FaExternalLinkAlt, FaFileDownload, FaUserCircle } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
import Skills from '../components/Skills';
import { getExperiences, getHonorsAndAwards, getEducation } from '../utils/resumeLoader';
import { profileData } from '../utils/profileData';

export default function About() {
  const { biography } = profileData;
  const experiences = getExperiences();
  
  // Certifications with links - these aren't in the YAML, so we maintain them here
  const certifications = [
    {
      id: 2,
      title: 'GitHub Actions (GH-200)',
      period: 'Aug 2025',
      link: 'https://learn.microsoft.com/en-us/users/chaseroohms-6404/credentials/d9a24be84c644268',
    },
    {
      id: 1,
      title: 'GitHub Copilot (GH-300)',
      period: 'Aug 2025',
      link: 'https://learn.microsoft.com/en-us/users/chaseroohms-6404/credentials/74d82a397bfdb509',
    },
  ];
  
  const honors = getHonorsAndAwards();
  const education = getEducation();

  return (
    <>
      <Helmet>
        <title>About - Chase Roohms - DevOps Engineer & Automation Evangelist</title>
        <meta name="description" content="DevOps Engineer at SolarWinds specializing in automation and infrastructure as code." />
        <meta name="author" content="Chase Roohms" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://chaseroohms.com/about" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Chase Roohms" />
        <meta property="og:title" content="About - Chase Roohms" />
        <meta property="og:description" content="DevOps Engineer at SolarWinds specializing in automation and infrastructure as code." />
        <meta property="og:image" content="https://chaseroohms.com/social-preview.webp" />
        <meta property="og:image:type" content="image/webp" />
        <meta property="og:image:alt" content="Chase Roohms - DevOps Engineer Portfolio" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Chase Roohms" />
        <meta name="twitter:description" content="DevOps Engineer at SolarWinds specializing in automation and infrastructure as code." />
        <meta name="twitter:image" content="https://chaseroohms.com/social-preview.webp" />
        <link rel="canonical" href="https://chaseroohms.com/about" />
      </Helmet>
      <div className="section-container py-8 md:py-20">
        <div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 md:mb-0 flex items-center gap-3">
              <FaUserCircle className="text-primary-400" />
              About Me
            </h1>
          <a
            href="/resume.pdf"
            download="Chase-Roohms-Resume.pdf"
            className="btn-primary inline-flex items-center gap-2 w-fit"
          ><FaFileDownload className="w-4 h-4" />
            Resume
          </a>
        </div>
      
        <div>
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Background</h2>
          <div className="space-y-4">
            {biography.map((paragraph, index) => (
              <p key={index} className="text-gray-400 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Experience</h2>
          <div className="space-y-6">
            {experiences.map((experience) => (
              <div key={experience.id} className="bg-gray-900 border-l-4 border-primary-600 rounded-lg p-6 hover:bg-gray-800 transition-all hover:shadow-lg hover:shadow-primary-900/20">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-100">{experience.title}</h3>
                  <p className="text-sm text-gray-400">{experience.period}</p>
                </div>
                <p className="text-gray-400 flex items-center gap-2 mb-3">
                  <BsBuilding className="w-4 h-4" /> {experience.company}
                </p>
                <ul className="text-gray-400 list-disc list-inside space-y-2">
                  {experience.achievements.map((achievement, index) => (
                    <li key={index} className="leading-relaxed">{achievement}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Skills & Technologies</h2>
          <Skills />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Certifications</h2>
          <div className="space-y-4">
            {certifications.map((cert) => (
              <a
                key={cert.id}
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-gray-900 border-l-4 border-primary-600 rounded-lg p-4 hover:bg-gray-800 transition-all hover:shadow-lg hover:shadow-primary-900/20"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-100">{cert.title}</h3>
                  <div className="flex items-center gap-3">
                    <p className="text-sm text-gray-400">{cert.period}</p>
                    <FaExternalLinkAlt className="w-4 h-4 text-primary-400" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Honors & Awards</h2>
          <div className="space-y-4">
            {honors.map((honor) => (
              <div key={honor.id} className="bg-gray-900 border-l-4 border-primary-600 rounded-lg p-4 hover:bg-gray-800 transition-all hover:shadow-lg hover:shadow-primary-900/20">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-lg font-bold text-gray-100">{honor.title}</h3>
                  <p className="text-sm text-gray-400">{honor.period}</p>
                </div>
                <p className="text-gray-400 flex items-center gap-2 text-sm">
                  <BsBuilding className="w-3.5 h-3.5" /> {honor.institution}
                </p>
                <p className="text-gray-400 text-sm mt-2 italic leading-relaxed">{honor.details}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Education</h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="bg-gray-900 border-l-4 border-primary-600 rounded-lg p-4 hover:bg-gray-800 transition-all hover:shadow-lg hover:shadow-primary-900/20">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-lg font-bold text-gray-100">{edu.title}</h3>
                  <p className="text-sm text-gray-400">{edu.period}</p>
                </div>
                <p className="text-gray-400 flex items-center gap-2 text-sm">
                  <BsBuilding className="w-3.5 h-3.5" /> {edu.institution}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
      </div>
      </div>
    </>
  );
}
