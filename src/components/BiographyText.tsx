import { Link } from 'react-router-dom';

interface BiographyTextProps {
  paragraphs: string[];
  className?: string;
}

export default function BiographyText({ paragraphs, className = 'text-gray-400 leading-relaxed' }: BiographyTextProps) {
  return (
    <>
      {paragraphs.map((paragraph, index) => {
        const parts = paragraph.split(/(\[[^\]]+\]\(https?:\/\/[^)\s]+\)|contact page)/g);

        return (
          <p key={index} className={className}>
            {parts.map((part, partIndex) => {
              if (part === 'contact page') {
                return (
                  <Link key={partIndex} to="/contact/" className="text-ivory underline decoration-primary-400/60 underline-offset-4 hover:decoration-primary-400 transition-colors">
                    contact page
                  </Link>
                );
              }

              const markdownLink = part.match(/^\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)$/);
              if (markdownLink) {
                return (
                  <a
                    key={partIndex}
                    href={markdownLink[2]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ivory underline decoration-primary-400/60 underline-offset-4 hover:decoration-primary-400 transition-colors"
                  >
                    {markdownLink[1]}
                  </a>
                );
              }

              return part;
            })}
          </p>
        );
      })}
    </>
  );
}
