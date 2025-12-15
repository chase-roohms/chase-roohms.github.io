import { Link } from 'react-router-dom';
import { BsCalendar3 } from 'react-icons/bs';
import type { NewsItem } from '../utils/newsData';

interface NewsCardProps {
  news: NewsItem;
  showViewAll?: boolean;
}

export default function NewsCard({ news, showViewAll = false }: NewsCardProps) {
  // Format date as "MMM D, YYYY"
  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <article className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:bg-gray-800 transition-all">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
        <BsCalendar3 className="w-4 h-4" />
        <time>{formatDate(news.fullDate)}</time>
      </div>
      
      <h3 className="text-xl font-bold mb-3 text-gray-100">{news.title}</h3>
      
      <p className="text-gray-400 mb-4">{news.description}</p>
      
      {news.link && (
        <a
          href={news.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-400 hover:text-primary-300 font-semibold transition-colors inline-block mb-4"
        >
          View Link →
        </a>
      )}
      
      {showViewAll && (
        <Link 
          to="/news" 
          className="text-primary-400 hover:text-primary-300 transition-colors block"
        >
          View All News →
        </Link>
      )}
    </article>
  );
}
