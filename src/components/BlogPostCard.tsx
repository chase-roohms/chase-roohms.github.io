import Card from './Card';
import type { BlogPost } from '../utils/blogLoader';

interface BlogPostCardProps {
  post: BlogPost;
  showTopics?: boolean;
  onTopicClick?: (topic: string) => void;
}

export default function BlogPostCard({ post, showTopics = true, onTopicClick }: BlogPostCardProps) {
  return (
    <Card
      image={post.image}
      imageAlt={post.title}
      title={post.title}
      description={post.description}
      date={post.date}
      readingTime={post.readingTime}
      views={post.views}
      tags={post.topics}
      showTags={showTopics}
      onTagClick={onTopicClick}
      internalLink={`/blog/${post.slug}/`}
      wrapInLink={true}
    />
  );
}
