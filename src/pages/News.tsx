import { Link, useLocation } from 'react-router-dom';
import { BsCalendar3 } from 'react-icons/bs';
import { FaNewspaper, FaRss, FaTimes } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
import { newsItems } from '../utils/newsData';
import { formatDateShort } from '../utils/dateFormatter';
import { useState, useEffect } from 'react';

export default function News() {
  const [showRssDialog, setShowRssDialog] = useState(false);
  const rssUrl = 'https://chaseroohms.com/news-rss.xml';
  const location = useLocation();

  // Handle scroll to anchor when navigating from another page
  useEffect(() => {
    if (location.hash) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        const element = document.getElementById(location.hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [location]);

  // Check if link is internal (relative path or same domain)
  const isInternalLink = (url?: string) => {
    if (!url) return false;
    return url.startsWith('/') || 
           url.startsWith('./') || 
           url.startsWith('../') ||
           url.includes('chaseroohms.com');
  };

  // Convert internal URL to path
  const getInternalPath = (url: string) => {
    if (url.startsWith('/')) return url;
    try {
      const urlObj = new URL(url);
      return urlObj.pathname;
    } catch {
      return url;
    }
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
        <title>News - Chase Roohms - DevOps Engineer & Automation Evangelist</title>
        <meta name="description" content="Latest professional updates, achievements, and milestones from Chase Roohms' career in DevOps and software development." />
        <meta name="author" content="Chase Roohms" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://chaseroohms.com/news" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Chase Roohms" />
        <meta property="og:title" content="News - Chase Roohms" />
        <meta property="og:description" content="Latest professional updates, achievements, and milestones from Chase Roohms' career in DevOps and software development." />
        <meta property="og:image" content="https://chaseroohms.com/social-preview.webp" />
        <meta property="og:image:type" content="image/webp" />
        <meta property="og:image:alt" content="Chase Roohms - DevOps Engineer Portfolio" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="News - Chase Roohms" />
        <meta name="twitter:description" content="Latest professional updates, achievements, and milestones from Chase Roohms' career in DevOps and software development." />
        <meta name="twitter:image" content="https://chaseroohms.com/social-preview.webp" />
        <link rel="canonical" href="https://chaseroohms.com/news" />
        <link rel="alternate" type="application/rss+xml" title="Chase Roohms - News RSS Feed" href="https://chaseroohms.com/news-rss.xml" />
      </Helmet>
      <div className="section-container py-8 md:py-20">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-4xl md:text-5xl font-bold flex items-center gap-3">
            <FaNewspaper className="text-primary-400" />
            News
          </h1>
          <button
            onClick={() => setShowRssDialog(true)}
            className="flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors font-semibold"
            aria-label="Subscribe to RSS feed"
          >
            <FaRss />
            <span className="hidden sm:inline">RSS Feed</span>
          </button>
        </div>
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
                      <div id={item.id} className="bg-gray-900 border-l-4 border-primary-600 rounded-lg p-6 hover:bg-gray-800 transition-all hover:shadow-lg hover:shadow-primary-900/20 scroll-mt-24">
                        {/* Date Badge */}
                        <div className="flex items-center gap-2 mb-3">
                          <div className="inline-flex items-center gap-2 bg-primary-900 text-primary-400 px-3 py-1 rounded-full text-sm font-semibold">
                            <BsCalendar3 className="w-3 h-3" />
                            {formatDateShort(item.fullDate)}
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
                          isInternalLink(item.link) ? (
                            <Link
                              to={getInternalPath(item.link)}
                              className="inline-block mt-4 text-primary-400 hover:text-primary-300 font-semibold"
                            >
                              Learn more →
                            </Link>
                          ) : (
                            <a
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-block mt-4 text-primary-400 hover:text-primary-300 font-semibold"
                            >
                              Learn more →
                            </a>
                          )
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* RSS Feed Dialog */}
      {showRssDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={() => setShowRssDialog(false)} role="dialog" aria-modal="true" aria-labelledby="rss-dialog-title">
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 id="rss-dialog-title" className="text-2xl font-bold flex items-center gap-2">
                <FaRss className="text-orange-500" />
                RSS Feed
              </h2>
              <button
                onClick={() => setShowRssDialog(false)}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Close dialog"
              >
                <FaTimes size={24} />
              </button>
            </div>
            <p className="text-gray-400 mb-4">
              Subscribe to this RSS feed to get notified of new updates.
            </p>
            <div className="bg-gray-950 border border-gray-800 rounded p-3 mb-4">
              <code className="text-primary-400 text-sm break-all">{rssUrl}</code>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(rssUrl);
                  // Could add a toast notification here
                }}
                className="flex-1 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors font-semibold"
              >
                Copy URL
              </button>
              <a
                href={rssUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors font-semibold text-center"
              >
                Open Feed
              </a>
            </div>
          </div>
        </div>
      )}
      </div>
    </>
  );
}
