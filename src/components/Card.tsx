import { Link } from 'react-router-dom';

interface CardProps {
  image?: string;
  imageAlt: string;
  title: string;
  description: string;
  date?: string;
  tags?: string[];
  showTags?: boolean;
  onTagClick?: (tag: string) => void;
  link?: string;
  linkText?: string;
  internalLink?: string;
  wrapInLink?: boolean;
}

export default function Card({
  image,
  imageAlt,
  title,
  description,
  date,
  tags,
  showTags = true,
  onTagClick,
  link,
  linkText = "View Project →",
  internalLink,
  wrapInLink = false,
}: CardProps) {
  // Format date as "MMM D, YYYY"
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
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
        <div className="mb-3">
          <span className="text-sm text-primary-400 font-semibold">
            {formatDate(date)}
          </span>
        </div>
      )}

      <h3 className={`text-xl font-bold mb-2 ${wrapInLink ? 'mb-3 group-hover:text-primary-400 transition-colors' : ''}`}>
        {title}
      </h3>

      <p className={`text-gray-400 mb-4 ${wrapInLink ? 'line-clamp-3 flex-1' : ''}`}>
        {description}
      </p>
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
