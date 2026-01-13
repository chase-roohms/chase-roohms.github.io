import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import { getBlogPost, getRelatedPosts, type BlogPost } from '../utils/blogLoader';
import { formatDate } from '../utils/dateFormatter';
import { FaArrowLeft, FaCalendar, FaCopy, FaCheck, FaClock } from 'react-icons/fa';
import * as FaIcons from 'react-icons/fa';
import * as SiIcons from 'react-icons/si';
import * as BsIcons from 'react-icons/bs';
import { Helmet } from 'react-helmet-async';
import BlogPostCard from '../components/BlogPostCard';
import ShareButtons from '../components/ShareButtons';
import 'highlight.js/styles/github-dark.css';

function CodeBlock({ children, className }: { children: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group not-prose">
      <button
        onClick={handleCopy}
        className="absolute right-3 top-3 p-1.5 rounded bg-gray-800 hover:bg-gray-700 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100 z-10"
        aria-label="Copy code"
      >
        {copied ? <FaCheck className="w-3.5 h-3.5 text-green-400" /> : <FaCopy className="w-3.5 h-3.5 text-gray-400" />}
      </button>
      <pre className={className}>
        <code className={className}>{children}</code>
      </pre>
    </div>
  );
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      Promise.all([
        getBlogPost(slug),
        getRelatedPosts(slug, 3)
      ])
        .then(([loadedPost, related]) => {
          setPost(loadedPost);
          setRelatedPosts(related);
          setLoading(false);
        })
        .catch(err => {
          console.error('Error loading blog post:', err);
          setError('Failed to load blog post');
          setLoading(false);
        });
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="section-container py-8 md:py-20">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-400 text-lg">Loading post...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="section-container py-8 md:py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Error Loading Post</h1>
          <p className="text-gray-400 mb-6">{error}</p>
          <Link to="/blog" className="btn-primary inline-flex items-center gap-2">
            <FaArrowLeft /> Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="section-container py-8 md:py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <p className="text-gray-400 mb-6">
            The blog post you're looking for doesn't exist.
          </p>
          <Link to="/blog" className="btn-primary inline-flex items-center gap-2">
            <FaArrowLeft /> Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.description,
    "image": post.image || "https://chaseroohms.com/social-preview.webp",
    "datePublished": post.date,
    "dateModified": post.date,
    "author": {
      "@type": "Person",
      "name": post.author || "Chase Roohms",
      "url": "https://chaseroohms.com"
    },
    "publisher": {
      "@type": "Person",
      "name": "Chase Roohms",
      "url": "https://chaseroohms.com"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://chaseroohms.com/blog/${post.slug}`
    },
    "keywords": post.topics.join(", ")
  };

  return (
    <>
      <Helmet>
        <title>{post.title} - Chase Roohms</title>
        <meta name="description" content={post.description} />
        <meta name="author" content={post.author || 'Chase Roohms'} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://chaseroohms.com/blog/${post.slug}`} />
        <meta property="og:site_name" content="Chase Roohms" />
        {post.image && <meta property="og:image" content={post.image} />}
        {post.image && <meta property="og:image:width" content="1920" />}
        {post.image && <meta property="og:image:height" content="716" />}
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content={post.author || 'Chase Roohms'} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.description} />
        {post.image && <meta name="twitter:image" content={post.image} />}
        {post.image && <link rel="preload" as="image" href={post.image} />}
        <link rel="canonical" href={`https://chaseroohms.com/blog/${post.slug}`} />
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>
      <div className="section-container py-8 md:py-20">
        <div className="max-w-4xl mx-auto">
        {/* Post Header */}
        <article>
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center gap-3">
              {post.icon && (() => {
                const iconMap = { ...FaIcons, ...SiIcons, ...BsIcons };
                const IconComponent = iconMap[post.icon as keyof typeof iconMap];
                return IconComponent ? <IconComponent className="text-primary-400" /> : null;
              })()}
              {post.title}
            </h1>
            
            <div className="flex items-center gap-4 text-gray-400 mb-4">
              <span className="flex items-center gap-2">
                <FaCalendar className="w-4 h-4" />
                {formatDate(post.date)}
              </span>
              {post.readingTime && (
                <>
                  <span>•</span>
                  <span className="flex items-center gap-2">
                    <FaClock className="w-4 h-4" />
                    {post.readingTime} min read
                  </span>
                </>
              )}
            </div>

            <p className="text-xl text-gray-400 mb-6">
              {post.description}
            </p>

            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {post.topics.map(topic => (
                  <Link
                    key={topic}
                    to={`/blog?topic=${encodeURIComponent(topic)}`}
                    className="text-sm bg-primary-950 text-primary-400 border border-primary-800 px-3 py-1 rounded-full hover:bg-primary-900 hover:border-primary-700 transition-colors"
                  >
                    {topic}
                  </Link>
                ))}
              </div>
              <ShareButtons
                url={`https://chaseroohms.com/blog/${post.slug}`}
                title={post.title}
                description={post.description}
              />
            </div>
          </header>

          {/* Post Content */}
          <div className="prose prose-invert prose-lg max-w-none
            prose-headings:text-gray-100 
            prose-p:text-gray-300 
            prose-a:text-primary-400 prose-a:no-underline hover:prose-a:text-primary-300
            prose-strong:text-gray-100
            prose-code:text-primary-400 prose-code:bg-gray-900 prose-code:px-2 prose-code:py-1 prose-code:rounded
            prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-800
            prose-ul:text-gray-300 prose-ol:text-gray-300
            prose-li:text-gray-300
            prose-blockquote:text-gray-400 prose-blockquote:border-primary-600
            prose-img:rounded-lg prose-img:w-full prose-img:h-auto
            prose-figcaption:text-center prose-figcaption:text-sm prose-figcaption:text-gray-400 prose-figcaption:mt-2
          ">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw, rehypeHighlight]}
              components={{
                code({ className, children, ...props }: { className?: string; children?: React.ReactNode; [key: string]: unknown }) {
                  const match = /language-(\w+)/.exec(className || '');
                  const codeString = String(children).replace(/\n$/, '');
                  
                  if (!match) {
                    return <code className={className} {...props}>{children}</code>;
                  }
                  
                  return <CodeBlock className={className}>{codeString}</CodeBlock>;
                },
                img({ src, alt, ...props }: { src?: string; alt?: string; [key: string]: unknown }) {
                  return <img src={src} alt={alt} loading="lazy" {...props} />;
                }
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16 pt-8 border-t border-gray-800">
            <h2 className="text-3xl font-bold mb-8">Related Posts</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map(relatedPost => (
                <BlogPostCard
                  key={relatedPost.slug}
                  post={relatedPost}
                  showTopics={true}
                />
              ))}
            </div>
          </div>
        )}

        {/* Back to Blog */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <Link 
            to="/blog" 
            className="btn-secondary inline-flex items-center gap-2"
          >
            <FaArrowLeft /> Back to Blog
          </Link>
        </div>
        </div>
      </div>
    </>
  );
}
