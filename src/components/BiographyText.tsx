import { Link } from 'react-router-dom';

interface BiographyTextProps {
  paragraphs: string[];
  className?: string;
}

export default function BiographyText({ paragraphs, className = 'text-gray-400 leading-relaxed' }: BiographyTextProps) {
  return (
    <>
      {paragraphs.map((paragraph, index) => {
        // Check if paragraph contains contact page link
        if (paragraph.includes('contact page')) {
          const parts = paragraph.split('contact page');
          return (
            <p key={index} className={className}>
              {parts[0]}
              <Link to="/contact/" className="text-primary-400 hover:text-primary-300 underline">
                contact page
              </Link>
              {parts[1]}
            </p>
          );
        }
        return (
          <p key={index} className={className}>
            {paragraph}
          </p>
        );
      })}
    </>
  );
}
