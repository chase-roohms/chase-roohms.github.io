import { Link } from 'react-router-dom';

interface CardProps {
  image?: string;
  imageAlt: string;
  title: string;
  description: string;
  date?: string;
  readingTime?: number;
  tags?: string[];
  showTags?: boolean;
  onTagClick?: (tag: string) => void;
  link?: string;
  linkText?: string;
  internalLink?: string;
  wrapInLink?: boolean;
  githubStars?: number;
  dockerPulls?: number;
}

export default function Card({
  image,
  imageAlt,
  title,
  description,
  date,
  readingTime,
  tags,
  showTags = true,
  onTagClick,
  link,
  linkText = "View Project →",
  internalLink,
  wrapInLink = false,
  githubStars,
  dockerPulls,
}: CardProps) {
  // Format date as "MMM D, YYYY"
  const formatDate = (dateString: string) => {
    // Parse date and assume it's noon CST (UTC-6, so 18:00 UTC)
    // This ensures the date displays correctly regardless of user's timezone
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(Date.UTC(year, month - 1, day, 18, 0, 0));
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric'
    });
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

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

  const content = (
    <>
      {image && (
        <div className="bg-gray-800 h-48 rounded-lg mb-4 flex items-center justify-center">
          <img src={image} alt={imageAlt} loading="lazy" className="h-full w-full object-cover rounded-lg" />
        </div>
      )}

      {date && (
        <div className="mb-3 flex items-center gap-3">
          <span className="text-sm text-primary-400 font-semibold">
            {formatDate(date)}
          </span>
          {readingTime && (
            <span className="text-sm text-gray-500">
              • {readingTime} min read
            </span>
          )}
        </div>
      )}

      <h3 className={`text-xl font-bold mb-2 ${wrapInLink ? 'mb-3 group-hover:text-primary-400 transition-colors' : ''}`}>
        {title}
      </h3>

      <p className={`text-gray-400 mb-4 ${wrapInLink ? 'line-clamp-3 flex-1' : ''}`}>
        {description}
      </p>

      {(githubStars !== undefined || dockerPulls !== undefined) && (
        <div className="flex items-center gap-4 mb-4">
          {githubStars !== undefined && (
            <div className="flex items-center gap-1.5 text-gray-400 group/stat">
              <svg 
                className="w-4 h-4 text-yellow-500" 
                fill="currentColor" 
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm font-medium">{formatNumber(githubStars)}</span>
              <div className="absolute hidden group-hover/stat:block bg-gray-950 text-white text-xs rounded py-1 px-2 -mt-8 whitespace-nowrap border border-gray-700 z-10">
                {githubStars.toLocaleString()} GitHub Stars
              </div>
            </div>
          )}
          {dockerPulls !== undefined && (
            <div className="flex items-center gap-1.5 text-gray-400 group/stat">
              <svg 
                className="w-4 h-4 text-blue-500" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span className="text-sm font-medium">{formatNumber(dockerPulls)}</span>
              <div className="absolute hidden group-hover/stat:block bg-gray-950 text-white text-xs rounded py-1 px-2 -mt-8 whitespace-nowrap border border-gray-700 z-10">
                {dockerPulls.toLocaleString()} Docker Hub Pulls
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );

  const tagsSection = showTags && tags && tags.length > 0 && (
    <div className={`flex flex-wrap gap-2 ${wrapInLink ? 'mt-auto' : 'mb-4'}`}>
      {tags.map((tag) => (
        onTagClick ? (
          <button
            key={tag}
            onClick={() => onTagClick(tag)}
            className="text-xs bg-primary-950 text-primary-400 border border-primary-800 px-2 py-1 rounded-full hover:bg-primary-900 hover:border-primary-700 transition-colors"
            aria-label={`Filter by ${tag}`}
            title={`Filter by ${tag}`}
          >
            {tag}
          </button>
        ) : (
          <span
            key={tag}
            className="text-sm bg-primary-950 text-primary-400 border border-primary-800 px-3 py-1 rounded-full"
          >
            {tag}
          </span>
        )
      ))}
    </div>
  );

  const externalLink = link && (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary-400 hover:text-primary-300 font-semibold"
    >
      {linkText}
    </a>
  );

  return (
    <article className={`bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-primary-500 hover:bg-gray-800 transition-all ${wrapInLink ? 'group flex flex-col min-h-[280px]' : ''}`}>
      {wrapInLink && internalLink ? (
        <>
          <Link to={internalLink} className="flex-1 flex flex-col">
            {content}
          </Link>
          {tagsSection}
        </>
      ) : wrapInLink && link && isInternalLink(link) ? (
        <>
          <Link to={getInternalPath(link)} className="flex-1 flex flex-col">
            {content}
          </Link>
          {tagsSection}
        </>
      ) : wrapInLink && link ? (
        <>
          <a href={link} target="_blank" rel="noopener noreferrer" className="flex-1 flex flex-col">
            {content}
          </a>
          {tagsSection}
        </>
      ) : (
        <>
          {content}
          {tagsSection}
          {externalLink}
        </>
      )}
    </article>
  );
}
