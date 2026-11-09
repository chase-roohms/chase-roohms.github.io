import { useState, useEffect, useMemo, isValidElement, type ReactNode } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import { getBlogPost, getBlogPostSync, getRelatedPostsSync, getAllBlogPostsSync, type BlogPost } from '../utils/blogLoader';
import { getSeriesNeighbors } from '../utils/blogSeries';
import { formatDate } from '../utils/dateFormatter';
import { getPageTitle } from '../utils/pageTitle';
import { FaUsers, FaRobot, FaCloud, FaArrowLeft, FaCalendar, FaCopy, FaCheck, FaClock, FaEye, FaDollarSign, FaStar, FaBalanceScale, FaDocker, FaGithub, FaHome, FaExchangeAlt, FaUserTie, FaSyncAlt, FaArrowRight } from 'react-icons/fa';
import type { IconType } from 'react-icons';

// Explicit icon map instead of wildcard imports to avoid bundling all 15k+ icons
const blogIconMap: Record<string, IconType> = {
  FaUsers, FaRobot, FaDollarSign, FaStar, FaBalanceScale, FaDocker, FaGithub, FaHome, FaExchangeAlt, FaUserTie, FaSyncAlt, FaCloud,
};
import { Helmet } from 'react-helmet-async';
import BlogPostCard from '../components/BlogPostCard';
import ShareButtons from '../components/ShareButtons';
import 'highlight.js/styles/github-dark.css';

function CodeBlock({ children, className }: { children: React.ReactNode; className?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    // Extract text content for copying
    const getTextContent = (node: ReactNode): string => {
      if (typeof node === 'string') return node;
      if (Array.isArray(node)) return node.map(getTextContent).join('');
      if (isValidElement<{ children?: ReactNode }>(node) && node.props.children) {
        return getTextContent(node.props.children);
      }
      return '';
    };
    
    const textContent = getTextContent(children);
    await navigator.clipboard.writeText(textContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group not-prose">
      <button
        onClick={handleCopy}
        className="absolute right-3 top-3 p-1.5 rounded-md bg-gray-800 hover:bg-gray-700 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100 z-10"
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
  const syncPost = useMemo(() => (slug ? getBlogPostSync(slug) : null), [slug]);
  const seriesInfo = useMemo(() => (slug ? getSeriesNeighbors(getAllBlogPostsSync(), slug) : null), [slug]);
  const relatedPosts = useMemo(() => {
    if (!slug) return [];
    // Skip posts already linked by the series prev/next navigation
    const linked = new Set([seriesInfo?.prev?.slug, seriesInfo?.next?.slug]);
    return getRelatedPostsSync(slug, 5).filter(p => !linked.has(p.slug)).slice(0, 2);
  }, [slug, seriesInfo]);
  // Async results are keyed by slug so stale results from a previous post are ignored
  const [loaded, setLoaded] = useState<{ slug: string; post: BlogPost } | null>(null);
  const [loadError, setLoadError] = useState<{ slug: string; message: string } | null>(null);

  const post = loaded && loaded.slug === slug ? loaded.post : syncPost;
  const error = loadError && loadError.slug === slug ? loadError.message : null;

  useEffect(() => {
    if (!slug || !syncPost) {
      return;
    }

    getBlogPost(slug)
      .then((loadedPost) => {
        if (loadedPost) {
          setLoaded({ slug, post: loadedPost });
        }
      })
      .catch(err => {
        console.error('Error loading blog post:', err);
        setLoadError({ slug, message: 'Failed to refresh blog metadata' });
      });
  }, [slug, syncPost]);

  if (error) {
    return (
      <div className="section-container py-8 md:py-20">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Error Loading Post</h1>
          <p className="text-gray-400 mb-6">{error}</p>
          <Link to="/blog/" className="btn-primary inline-flex items-center gap-2">
            <FaArrowLeft /> Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="section-container py-8 md:py-20">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <p className="text-gray-400 mb-6">
            The blog post you're looking for doesn't exist.
          </p>
          <Link to="/blog/" className="btn-primary inline-flex items-center gap-2">
            <FaArrowLeft /> Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  // Social/structured-data image URLs must be absolute, while post frontmatter may use root-relative paths.
  const absoluteImage = post.image
    ? new URL(post.image, 'https://chaseroohms.com').href
    : undefined;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.description,
    "image": absoluteImage || "https://chaseroohms.com/social-preview.webp",
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
      "@id": `https://chaseroohms.com/blog/${post.slug}/`
    },
    "keywords": post.topics.join(", ")
  };

  return (
    <>
      <Helmet>
        <title>{getPageTitle(post.title)}</title>
        <meta name="description" content={post.description} />
        <meta name="author" content={post.author || 'Chase Roohms'} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://chaseroohms.com/blog/${post.slug}/`} />
        <meta property="og:site_name" content="Chase Roohms" />
        {absoluteImage && <meta property="og:image" content={absoluteImage} />}
        {post.image && <meta property="og:image:width" content="1920" />}
        {post.image && <meta property="og:image:height" content="716" />}
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content={post.author || 'Chase Roohms'} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.description} />
        {absoluteImage && <meta name="twitter:image" content={absoluteImage} />}
        {post.image && <link rel="preload" as="image" href={post.image} />}
        <link rel="canonical" href={`https://chaseroohms.com/blog/${post.slug}/`} />
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>
      <div className="section-container py-8 md:py-20">
        <div className="max-w-3xl mx-auto">
        {/* Post Header */}
        <article>
          <header className="mb-10">
            {seriesInfo && (
              <Link
                to={`/blog/#series-${seriesInfo.series.id}`}
                className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-gray-400 transition-colors hover:text-ivory"
              >
                {seriesInfo.series.name}
                {seriesInfo.series.numbered && (
                  <>
                    <span className="text-gray-600">·</span>
                    <span>
                      Part {seriesInfo.part} of {seriesInfo.total}
                    </span>
                  </>
                )}
              </Link>
            )}
            <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center gap-3">
              {post.icon && (() => {
                const IconComponent = blogIconMap[post.icon];
                return IconComponent ? <IconComponent className="text-primary-400" /> : null;
              })()}
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-gray-400 mb-4">
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
              {post.views !== undefined && post.views > 0 && (
                <>
                  <span>•</span>
                  <span className="flex items-center gap-2 group/views relative">
                    <FaEye className="w-4 h-4" />
                    {post.views.toLocaleString()} views
                    <span className="absolute hidden group-hover/views:block bg-gray-950 text-white text-xs rounded py-1 px-2 -mt-14 left-0 whitespace-nowrap border border-gray-700 z-10">
                      Blog views (updates every 6 hours)
                    </span>
                  </span>
                </>
              )}
            </div>

            <p className="text-xl text-gray-300 mb-6 max-w-3xl">
              {post.description}
            </p>

            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {post.topics.map(topic => (
                  <Link
                    key={topic}
                    to={`/blog?topic=${encodeURIComponent(topic)}`}
                    className="text-sm bg-gray-900 text-gray-300 border border-gray-700 px-3 py-1 rounded-full hover:border-gray-500 hover:text-gray-100 transition-colors"
                    aria-label={`Filter blog posts by ${topic}`}
                    title={`Filter blog posts by ${topic}`}
                  >
                    {topic}
                  </Link>
                ))}              </div>
              <ShareButtons
                url={`https://chaseroohms.com/blog/${post.slug}/`}
                title={post.title}
                description={post.description}
              />
            </div>
          </header>

          {/* Post Content */}
          <div className="prose prose-invert prose-lg max-w-[68ch]
            prose-headings:text-gray-100
            prose-p:text-gray-300
            prose-a:text-ivory prose-a:underline prose-a:decoration-primary-400/60 prose-a:underline-offset-4 hover:prose-a:decoration-primary-400
            prose-strong:text-gray-100
            prose-code:text-gray-200 prose-code:bg-gray-900 prose-code:font-normal prose-code:px-2 prose-code:py-1 prose-code:rounded
            prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-800
            prose-ul:text-gray-300 prose-ol:text-gray-300
            prose-li:text-gray-300
            prose-blockquote:text-gray-400 prose-blockquote:border-gray-700 prose-blockquote:font-normal
            prose-img:rounded-lg prose-img:h-auto
            prose-figcaption:text-center prose-figcaption:text-sm prose-figcaption:text-gray-400 prose-figcaption:mt-2
          ">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw, rehypeHighlight]}
              components={{
                code({ node: _node, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  
                  // If no language match, render as inline code
                  if (!match) {
                    return <code className={className} {...props}>{children}</code>;
                  }
                  
                  // For code blocks, preserve the syntax-highlighted children
                  return <CodeBlock className={className}>{children}</CodeBlock>;
                },
                img({ src, alt, className, ...props }) {
                  const altText = alt || 'Blog post image';
                  return <img src={src} alt={altText} className={className} loading="lazy" {...props} />;
                },
                a({ href, children, ...props }) {
                  const isExternal = typeof href === 'string' && /^https?:\/\//i.test(href);

                  if (isExternal) {
                    return (
                      <a href={href} target="_blank" rel="noopener" {...props}>
                        {children}
                      </a>
                    );
                  }

                  return <a href={href} {...props}>{children}</a>;
                }
              } satisfies Components}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </article>

        {/* Series navigation */}
        {seriesInfo && (seriesInfo.prev || seriesInfo.next) && (
          <nav aria-label={`${seriesInfo.series.name} series`} className="mt-16 pt-8 border-t border-gray-800">
            <p className="text-sm font-medium text-gray-400 mb-4">
              More in {seriesInfo.series.name}
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {seriesInfo.prev ? (
                <Link to={`/blog/${seriesInfo.prev.slug}/`} className="group surface rounded-xl p-5 transition-colors hover:border-gray-600">
                  <span className="flex items-center gap-2 text-xs text-gray-500"><FaArrowLeft /> {seriesInfo.series.numbered ? `Part ${seriesInfo.part - 1}` : 'Previous'}</span>
                  <span className="mt-2 block font-semibold text-gray-100 group-hover:text-ivory">{seriesInfo.prev.title}</span>
                </Link>
              ) : <span className="hidden sm:block" />}
              {seriesInfo.next && (
                <Link to={`/blog/${seriesInfo.next.slug}/`} className="group surface rounded-xl p-5 text-right transition-colors hover:border-gray-600">
                  <span className="flex items-center justify-end gap-2 text-xs text-gray-500">{seriesInfo.series.numbered ? `Part ${seriesInfo.part + 1}` : 'Next'} <FaArrowRight /></span>
                  <span className="mt-2 block font-semibold text-gray-100 group-hover:text-ivory">{seriesInfo.next.title}</span>
                </Link>
              )}
            </div>
          </nav>
        )}

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16 pt-8 border-t border-gray-800">
            <h2 className="text-2xl font-bold mb-6">Related posts</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
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
            to="/blog/" 
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
