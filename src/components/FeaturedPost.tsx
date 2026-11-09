import type { BlogPost } from '../utils/blogLoader';
import { getSeries } from '../utils/blogSeries';
import { formatDateShort } from '../utils/dateFormatter';
import FeatureCard from './FeatureCard';

function firstSentence(text: string) {
  const match = text.match(/^.*?[.!?](?=\s|$)/);
  return match ? match[0] : text;
}

interface FeaturedPostProps {
  post: BlogPost;
  eager?: boolean;
  imageSide?: 'left' | 'right';
}

export default function FeaturedPost({ post, eager = false, imageSide = 'left' }: FeaturedPostProps) {
  const series = getSeries(post.series);
  return (
    <FeatureCard
      href={`/blog/${post.slug}/`}
      image={post.image ?? ''}
      imageSide={imageSide}
      eager={eager}
      eyebrow="Latest post"
      meta={series?.name}
      title={post.title}
      description={post.description}
      mobileDescription={firstSentence(post.description)}
      footer={`${formatDateShort(post.date)}${post.readingTime ? ` · ${post.readingTime} min read` : ''}`}
      action="Read"
    />
  );
}
