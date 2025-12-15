import { BsBuilding } from 'react-icons/bs';
import { FaExternalLinkAlt, FaFileDownload, FaUserCircle } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
import Skills from '../components/Skills';

export default function About() {
  const experiences = [
    {
      id: 3,
      title: 'DevOps Engineer',
      company: 'SolarWinds',
      period: 'Oct 2025 - Present',
      achievements: [
        'Expedited the Developer workflow with an end to end Self-Service platform.',
      ],
    },
    {
      id: 2,
      title: 'Associate DevOps Engineer',
      company: 'SolarWinds',
      period: 'Oct 2024 - Oct 2025',
      achievements: [
        'Increased code scanning coverage by ~400% using GitHub CodeQL.',
        'Decreased spending on GitHub Actions runners minutes by ~45% by improving workflow efficiency.',
        'Led the migration from OpsGenie to Squadcast (SolarWinds Incident Response).',
        'Achieved SLSA level 2 compliance in multiple products by automating signed SBOM and provenance generation in CI/CD pipelines, ensuring software integrity and tamper-resistance.',
      ],
    },
    {
      id: 1,
      title: 'Security Engineer Intern',
      company: 'SolarWinds',
      period: 'June 2024 - Oct 2024',
      achievements: [
        'Reduced the legal review time by ~70% with an SBOM Vex translation script written in Python.',
        'Increased security visibility by reviewing and redesigning data-flow threat models for more than 30 products.',
      ],
    },
  ];
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
  const honors = [
    {
      id: 2,
      title: 'IT Pro Day, Rockstar of the Year',
      institution: 'SolarWinds',
      period: 'Sept 2025',
      details: 'Consistently demonstrated high performance, and embodied SolarWinds values.'
    },
    {
      id: 1,
      title: 'DevOps Dynamo',
      institution: 'SolarWinds',
      period: 'June 2025',
      details: 'Brought unmatched energy and precision to the DevOps workflow.'
    },
  ];
  const education = [
    {
      id: 1,
      title: 'Bachelor\'s in Computer Science',
      institution: 'Texas State University, San Marcos',
      period: 'Aug 2020 - May 2024',
    },
  ];

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
          <p className="text-gray-400 leading-relaxed mb-4">
            I've built my career around a passion for automation and problem solving.
            With a background in software development and IT security, I approach 
            challenges from multiple perspectives and enjoy finding smarter, more 
            efficient ways to keep systems running smoothly.
          </p>
          <p className="text-gray-400 leading-relaxed">
            A natural tinkerer, I spend my free time exploring new tools, running 
            home servers, and building side projects. That same curiosity drives 
            my work - streamlining processes, reducing manual efforts, and creating 
            solutions that scale.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Skills & Technologies</h2>
          <Skills />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Experience</h2>
          <div className="space-y-6">
            {experiences.map((experience) => (
              <div key={experience.id} className="bg-gray-900 border-l-4 border-primary-600 rounded-lg p-6 hover:bg-gray-800 transition-all hover:shadow-lg hover:shadow-primary-900/20">
                <h3 className="text-xl font-bold mb-2 text-gray-100">{experience.title}</h3>
                <p className="text-gray-400 flex items-center gap-2 mb-3">
                  <BsBuilding className="w-4 h-4" /> {experience.company} • {experience.period}
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
                  <div>
                    <h3 className="text-lg font-bold text-gray-100">{cert.title}</h3>
                    <p className="text-gray-400 text-sm mt-1">{cert.period}</p>
                  </div>
                  <FaExternalLinkAlt className="w-4 h-4 text-primary-400" />
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
                <h3 className="text-lg font-bold text-gray-100">{honor.title}</h3>
                <p className="text-gray-400 flex items-center gap-2 mt-1 text-sm">
                  <BsBuilding className="w-3.5 h-3.5" /> {honor.institution} • {honor.period}
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
                <h3 className="text-lg font-bold text-gray-100">{edu.title}</h3>
                <p className="text-gray-400 flex items-center gap-2 mt-1 text-sm">
                  <BsBuilding className="w-3.5 h-3.5" /> {edu.institution} • {edu.period}
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
