import type { ReactNode } from 'react';
import type { IconType } from 'react-icons';
import { BsBuilding, BsPersonBadge } from 'react-icons/bs';
import {
  FaExternalLinkAlt,
  FaFileDownload,
  FaUserCircle,
  FaBriefcase,
  FaCertificate,
  FaTrophy,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaRocket,
  FaLaptopCode,
  FaRegCalendarAlt,
  FaChevronRight,
} from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
import Skills from '../components/Skills';
import BiographyText from '../components/BiographyText';
import { getExperiences, getHonorsAndAwards, getEducation, getContactInfo } from '../utils/resumeLoader';
import { profileData } from '../utils/profileData';

function SectionHeading({ icon: Icon, children }: { icon: IconType; children: ReactNode }) {
  return (
    <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2.5">
      <Icon className="text-primary-400 w-5 h-5 flex-shrink-0" />
      {children}
    </h2>
  );
}

export default function About() {
  const { biography } = profileData;
  const [primaryHeadline] = profileData.headline.split('\n');
  const { location } = getContactInfo();
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
  const hasExperiences = experiences.length > 0;
  const hasCertifications = certifications.length > 0;
  const hasHonors = honors.length > 0;
  const hasEducation = education.length > 0;

  return (
    <>
      <Helmet>
        <title>About - Chase Roohms - DevOps Engineer & Automation Evangelist</title>
        <meta name="description" content="DevOps Engineer at SolarWinds specializing in automation and infrastructure as code." />
        <meta name="author" content="Chase Roohms" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://chaseroohms.com/about/" />
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
        <link rel="canonical" href="https://chaseroohms.com/about/" />
      </Helmet>
      <div className="section-container py-8 md:py-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold flex items-center gap-3">
              <FaUserCircle className="text-primary-400" />
              About Me
            </h1>
            <p className="text-gray-400 mt-3 md:ml-[3.75rem]">{primaryHeadline}</p>
          </div>
          <a
            href="/resume.pdf"
            download="Chase-Roohms-Resume.pdf"
            className="btn-primary inline-flex items-center gap-2 w-fit self-center md:self-auto"
          ><FaFileDownload className="w-4 h-4" />
            Resume
          </a>
        </div>

        <section className="mb-14">
          <SectionHeading icon={BsPersonBadge}>Background</SectionHeading>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4">
              <BiographyText paragraphs={biography} />
            </div>
            <aside className="bg-gray-900 border border-gray-800 rounded-xl p-6 h-fit">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">Quick Facts</h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-gray-300">
                  <span className="w-9 h-9 rounded-lg bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                    <FaMapMarkerAlt className="text-primary-400 w-4 h-4" />
                  </span>
                  <span>{location}</span>
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <span className="w-9 h-9 rounded-lg bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                    <FaBriefcase className="text-primary-400 w-4 h-4" />
                  </span>
                  <span>AI Ops Engineer @ SolarWinds</span>
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <span className="w-9 h-9 rounded-lg bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                    <FaRocket className="text-primary-400 w-4 h-4" />
                  </span>
                  <span>
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
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <span className="w-9 h-9 rounded-lg bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                    <FaGraduationCap className="text-primary-400 w-4 h-4" />
                  </span>
                  <span>BS in Computer Science</span>
                </li>
              </ul>
            </aside>
          </div>
        </section>

        {hasExperiences && (
        <section className="mb-14">
          <SectionHeading icon={FaBriefcase}>Experience</SectionHeading>
          <div className="relative ml-2 border-l-2 border-gray-800 space-y-8 pl-8">
            {experiences.map((experience) => {
              const isCurrent = experience.period.includes('Present');
              return (
                <div key={experience.id} className="relative">
                  <span className={`absolute -left-[41px] top-2 flex h-4 w-4 rounded-full ring-4 ring-gray-950 ${isCurrent ? 'bg-primary-500' : 'bg-gray-600'}`}>
                    {isCurrent && <span className="absolute inset-0 rounded-full bg-primary-500 animate-ping opacity-75" />}
                  </span>
                  <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-primary-500/50 hover:bg-gray-800/60 transition-all hover:shadow-lg hover:shadow-primary-900/20">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2">
                      <h3 className="text-xl font-bold text-gray-100">{experience.title}</h3>
                      {isCurrent && (
                        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-primary-500/10 text-primary-300 border border-primary-500/30">
                          Current
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-400 mb-4">
                      <span className="flex items-center gap-1.5">
                        <BsBuilding className="w-3.5 h-3.5" /> {experience.company}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <FaRegCalendarAlt className="w-3.5 h-3.5" /> {experience.period}
                      </span>
                    </div>
                    <ul className="space-y-2.5">
                      {experience.achievements.map((achievement, index) => (
                        <li key={index} className="flex gap-2.5 text-gray-400 leading-relaxed">
                          <FaChevronRight className="text-primary-500 w-3 h-3 mt-1.5 flex-shrink-0" />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        )}

        <section className="mb-14">
          <SectionHeading icon={FaLaptopCode}>Skills &amp; Technologies</SectionHeading>
          <Skills />
        </section>

        {hasCertifications && (
        <section className="mb-14">
          <SectionHeading icon={FaCertificate}>Certifications</SectionHeading>
          <div className="grid sm:grid-cols-2 gap-4">
            {certifications.map((cert) => (
              <a
                key={cert.id}
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 bg-gray-900 border border-gray-800 rounded-xl p-4 hover:border-primary-500/50 hover:bg-gray-800/60 transition-all"
              >
                <span className="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                  <FaCertificate className="text-primary-400 w-5 h-5" />
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-100 truncate">{cert.title}</h3>
                  <p className="text-sm text-gray-400">{cert.period}</p>
                </div>
                <FaExternalLinkAlt className="w-3.5 h-3.5 text-gray-500 group-hover:text-primary-400 transition-colors flex-shrink-0" />
              </a>
            ))}
          </div>
        </section>
        )}

        {hasHonors && (
        <section className="mb-14">
          <SectionHeading icon={FaTrophy}>Honors &amp; Awards</SectionHeading>
          <div className="grid sm:grid-cols-2 gap-4">
            {honors.map((honor) => (
              <div key={honor.id} className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-primary-500/50 hover:bg-gray-800/60 transition-all">
                <div className="flex items-start gap-3 mb-2">
                  <span className="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                    <FaTrophy className="text-primary-400 w-5 h-5" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-100">{honor.title}</h3>
                    <p className="text-gray-400 flex items-center gap-1.5 text-sm mt-0.5">
                      <BsBuilding className="w-3.5 h-3.5" /> {honor.institution}
                    </p>
                  </div>
                  <p className="text-sm text-gray-500 flex-shrink-0">{honor.period}</p>
                </div>
                <p className="text-gray-400 text-sm italic leading-relaxed">{honor.details}</p>
              </div>
            ))}
          </div>
        </section>
        )}

        {hasEducation && (
        <section>
          <SectionHeading icon={FaGraduationCap}>Education</SectionHeading>
          <div className="grid sm:grid-cols-2 gap-4">
            {education.map((edu) => (
              <div key={edu.id} className="flex items-start gap-4 bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-primary-500/50 hover:bg-gray-800/60 transition-all">
                <span className="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                  <FaGraduationCap className="text-primary-400 w-5 h-5" />
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-100">{edu.title}</h3>
                  <p className="text-gray-400 flex items-center gap-1.5 text-sm mt-0.5">
                    <BsBuilding className="w-3.5 h-3.5" /> {edu.institution}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">{edu.period}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        )}
      </div>
    </>
  );
}
