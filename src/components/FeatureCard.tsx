import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import type { ReactNode } from 'react';

interface FeatureCardProps {
  href: string;
  external?: boolean;
  image: string;
  imageAlt?: string;
  imageSide?: 'left' | 'right';
  eager?: boolean;
  eyebrow: string;
  meta?: string;
  title: string;
  description: string;
  mobileDescription?: string;
  footer: ReactNode;
  action: string;
}

// Shared layout for the large featured cards (latest post, featured project)
export default function FeatureCard({
  href,
  external = false,
  image,
  imageAlt = '',
  imageSide = 'left',
  eager = false,
  eyebrow,
  meta,
  title,
  description,
  mobileDescription,
  footer,
  action,
}: FeatureCardProps) {
  const className = `group surface grid overflow-hidden rounded-xl transition-colors hover:border-primary-500 ${
    imageSide === 'left' ? 'md:grid-cols-[1.15fr_1fr]' : 'md:grid-cols-[1fr_1.15fr]'
  }`;

  const content = (
    <>
      <div
        className={`order-2 relative aspect-[16/9] md:aspect-auto md:min-h-[22rem] overflow-hidden bg-gray-900 ${
          imageSide === 'right' ? 'md:order-2' : 'md:order-1'
        }`}
      >
        <img
          src={image}
          alt={imageAlt}
          loading={eager ? undefined : 'lazy'}
          fetchPriority={eager ? 'high' : undefined}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
      <div className={`order-1 flex flex-col justify-center gap-3 p-5 sm:p-8 md:gap-4 md:p-10 ${imageSide === 'right' ? 'md:order-1' : 'md:order-2'}`}>
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-semibold text-primary-400">{eyebrow}</span>
          {meta && <span className="text-sm text-gray-500">· {meta}</span>}
        </div>
        <h2 className="text-2xl md:text-3xl font-bold leading-tight text-gray-50">{title}</h2>
        {mobileDescription ? (
          <>
            <p className="text-gray-300 md:hidden">{mobileDescription}</p>
            <p className="hidden text-lg text-gray-300 md:block">{description}</p>
          </>
        ) : (
          <p className="text-gray-300 md:text-lg">{description}</p>
        )}
        <div className="mt-2 flex items-center justify-between gap-4 text-sm text-gray-400">
          <span>{footer}</span>
          <span className="flex items-center gap-2 font-semibold text-primary-400">
            {action} <FaArrowRight className="transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </>
  );

  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {content}
    </a>
  ) : (
    <Link to={href} className={className}>
      {content}
    </Link>
  );
}
