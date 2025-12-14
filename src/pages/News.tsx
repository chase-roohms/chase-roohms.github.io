import { BsCalendar3 } from 'react-icons/bs';
import { FaNewspaper } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';

export default function News() {
  const newsItems = [
    {
      id: 'new-portfolio',
      fullDate: '2025-12-13',
      title: 'Built a Modern Portfolio',
      description: 'Launched a new portfolio website built with Vite, React, TypeScript, and Tailwind CSS.',
      link: 'https://chaseroohms.com',
    },
    {
      id: 'opsgenie-swir-webcast',
      fullDate: '2025-12-10',
      title: 'Speaker in a Webcast',
      description: 'Participated as a speaker in a webcast discussing the migration from Opsgenie to SolarWinds Incident Response platform, sharing insights and best practices.',
      link: 'https://goldcast.ondemand.goldcast.io/on-demand/4ed8f693-f755-4a35-ad2f-5ccbba38de26',
    },
    {
      id: 'migration-blog-post',
      fullDate: '2025-11-19',
      title: 'Published Migration Blog Post',
      description: 'Co-authored a blog post on the migration from Opsgenie to SolarWinds Incident Response platform, detailing best practices and lessons learned.',
      link: 'https://www.solarwinds.com/blog/migrating-from-opsgenie-heres-the-incident-response-solution-you-actually-need',
    },
    {
      id: 'devops-promotion',
      fullDate: '2025-10-01',
      title: 'Promoted to DevOps Engineer',
      description: 'Advanced to DevOps Engineer role at SolarWinds.',
    },
    {
      id: 'gh-actions-certification',
      fullDate: '2025-08-22',
      title: 'Attained GitHub Actions Certification',
      description: 'Earned certification for proficiency with GitHub Actions.',
      link: 'https://learn.microsoft.com/en-us/users/chaseroohms-6404/credentials/d9a24be84c644268',
    },
    {
      id: 'gh-copilot-certification',
      fullDate: '2025-08-14',
      title: 'Attained GitHub Copilot Certification',
      description: 'Earned certification for proficiency with GitHub Copilot.',
      link: 'https://learn.microsoft.com/en-us/users/chaseroohms-6404/credentials/74d82a397bfdb509',
    },
    {
      id: 'led-opsgenie-to-swir-migration',
      fullDate: '2025-04-01',
      title: 'Led OpsGenie to SWIR Migration',
      description:
        'Successfully led team-wide migration from OpsGenie to SolarWinds Incident Response platform, enhancing incident response practices and reducing mean time to resolution.',
    },
    {
      id: 'devops-full-time',
      fullDate: '2024-10-01',
      title: 'Started DevOps Full-Time',
      description: 'Brought on full time as an Associate DevOps Engineer at SolarWinds.',
    },
    {
      id: 'security-engineer-internship',
      fullDate: '2024-06-03',
      title: 'Started Security Engineer Internship',
      description: 'Began my security engineer internship at SolarWinds, focusing on product security and incident response.',
    },
    {
      id: 'bachelor-of-science',
      fullDate: '2024-05-15',
      title: 'Completed Bachelor\'s in CS',
      description: 'Graduated Magna Cum Laude with a Bachelor of Science in Computer Science from the University of Texas State in San Marcos.',
    },
  ];

  // Format date as "MMM D, YYYY" (e.g., "Dec 13, 2025")
  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Sort news items by date (newest first)
  const sortedNewsItems = [...newsItems].sort((a, b) => 
    new Date(b.fullDate).getTime() - new Date(a.fullDate).getTime()
  );

  // Group sorted news by year
  const groupedNews = sortedNewsItems.reduce((acc, item) => {
    const year = new Date(item.fullDate).getFullYear().toString();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(item);
    return acc;
  }, {} as Record<string, typeof newsItems>);

  return (
    <>
      <Helmet>
        <title>News - Chase Roohms</title>
        <meta name="description" content="Latest professional updates, achievements, and milestones from Chase Roohms' career in DevOps and software development." />
        <meta property="og:title" content="News - Chase Roohms" />
        <meta property="og:description" content="Latest professional updates, achievements, and milestones from Chase Roohms' career." />
        <meta property="og:url" content="https://chaseroohms.com/news" />
        <link rel="canonical" href="https://chaseroohms.com/news" />
      </Helmet>
      <div className="section-container py-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center gap-3">
          <FaNewspaper className="text-primary-400" />
          News
        </h1>
      <p className="text-gray-400 text-lg mb-12">
        Professional updates, achievements, and milestones.
      </p>

      {/* Timeline Container */}
      <div className="relative">
        {/* Vertical Timeline Line */}
        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary-600 hidden md:block"></div>

        {/* Timeline Items */}
        <div className="space-y-12">
          {Object.keys(groupedNews)
            .sort((a, b) => parseInt(b) - parseInt(a))
            .map((year) => (
              <div key={year} className="relative">
                {/* Year Badge */}
                <div className="mb-6 md:mb-8">
                  <span className="inline-block bg-primary-600 text-white px-4 py-1 rounded-full font-bold text-sm">
                    {year}
                  </span>
                </div>

                {/* News Items for this Year */}
                <div className="space-y-6 md:pl-8">
                  {groupedNews[year].map((item) => (
                    <div key={item.id} className="relative">
                      {/* Timeline Dot */}
                      <div className="hidden md:block absolute -left-8 top-6 w-4 h-4 bg-primary-500 rounded-full border-4 border-gray-950"></div>

                      {/* Connecting Line from Dot to Card */}
                      <div className="hidden md:block absolute -left-6 top-7 w-6 h-0.5 bg-gradient-to-r from-primary-500 to-transparent"></div>

                      {/* News Card */}
                      <div className="bg-gray-900 border-l-4 border-primary-600 rounded-lg p-6 hover:bg-gray-800 transition-all hover:shadow-lg hover:shadow-primary-900/20">
                        {/* Date Badge */}
                        <div className="flex items-center gap-2 mb-3">
                          <div className="inline-flex items-center gap-2 bg-primary-900 text-primary-400 px-3 py-1 rounded-full text-sm font-semibold">
                            <BsCalendar3 className="w-3 h-3" />
                            <span>{formatDate(item.fullDate)}</span>
                          </div>
                        </div>

                        {/* Title */}
                        {item.title && (
                          <h3 className="text-xl font-bold mb-3 text-gray-100">
                            {item.title}
                          </h3>
                        )}

                        {/* Description */}
                        <p className="text-gray-400 leading-relaxed">
                          {item.description}
                        </p>

                        {/* Link */}
                        {item.link && (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block mt-4 text-primary-400 hover:text-primary-300 font-semibold"
                          >
                            Learn more →
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
      </div>
    </>
  );
}
