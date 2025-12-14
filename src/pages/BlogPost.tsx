import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import { getBlogPost, type BlogPost } from '../utils/blogLoader';
import { FaArrowLeft, FaCalendar } from 'react-icons/fa';
import * as FaIcons from 'react-icons/fa';
import * as SiIcons from 'react-icons/si';
import * as BsIcons from 'react-icons/bs';
import { Helmet } from 'react-helmet-async';
import 'highlight.js/styles/github-dark.css';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      getBlogPost(slug)
        .then(loadedPost => {
          setPost(loadedPost);
          setLoading(false);
        })
        .catch(err => {
          console.error('Error loading blog post:', err);
          setError('Failed to load blog post');
          setLoading(false);
        });
    }
  }, [slug]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

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
      </Helmet>
      <div className="section-container py-8 md:py-20">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 mb-8 transition-colors"
          >
            <FaArrowLeft /> Back to Blog
          </Link>

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
              {post.author && (
                <>
                  <span>•</span>
                  <span>{post.author}</span>
                </>
              )}
            </div>

            <p className="text-xl text-gray-400 mb-6">
              {post.description}
            </p>

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
            prose-img:rounded-lg
            prose-figcaption:text-center prose-figcaption:text-sm prose-figcaption:text-gray-400 prose-figcaption:mt-2
          ">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw, rehypeHighlight]}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </article>

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
