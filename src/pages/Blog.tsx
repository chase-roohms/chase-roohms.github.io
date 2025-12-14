import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FaBlog } from 'react-icons/fa';
import { getAllBlogPosts, type BlogPost } from '../utils/blogLoader';

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedTopic = searchParams.get('topic') || 'All';
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllBlogPosts().then(loadedPosts => {
      setPosts(loadedPosts);
      setLoading(false);
    });
  }, []);

  // Get all unique topics
  const allTopics = ['All', ...new Set(posts.flatMap(post => post.topics))];

  // Filter posts by selected topic
  const filteredPosts = selectedTopic === 'All' 
    ? posts 
    : posts.filter(post => post.topics.includes(selectedTopic));

  // Format date as "MMM D, YYYY"
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  if (loading) {
    return (
      <div className="section-container py-8 md:py-20">
        <div className="flex items-center justify-center">
          <p className="text-gray-400 text-lg">Loading blog posts...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Blog - Chase Roohms - DevOps Engineer & Automation Evangelist</title>
        <meta name="description" content="Technical articles, tutorials, and thoughts on DevOps, automation, and software development by Chase Roohms." />
        <meta name="author" content="Chase Roohms" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://chaseroohms.com/blog" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Chase Roohms" />
        <meta property="og:title" content="Blog - Chase Roohms" />
        <meta property="og:description" content="Technical articles, tutorials, and thoughts on DevOps, automation, and software development by Chase Roohms." />
        <meta property="og:image" content="https://chaseroohms.com/social-preview.webp" />
        <meta property="og:image:type" content="image/webp" />
        <meta property="og:image:alt" content="Chase Roohms - DevOps Engineer Portfolio" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Blog - Chase Roohms" />
        <meta name="twitter:description" content="Technical articles, tutorials, and thoughts on DevOps, automation, and software development by Chase Roohms." />
        <meta name="twitter:image" content="https://chaseroohms.com/social-preview.webp" />
        <link rel="canonical" href="https://chaseroohms.com/blog" />
      </Helmet>
      <div className="section-container py-8 md:py-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center gap-3">
          <FaBlog className="text-primary-400" />
          Blog
        </h1>
      <p className="text-gray-400 text-lg mb-12">
        Technical articles, tutorials, and thoughts on software development.
      </p>

      {/* Topic Filter */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Filter by Topic</h2>
        <div className="flex flex-wrap gap-2">
          {allTopics.map(topic => (
            <button
              key={topic}
              onClick={() => {
                if (topic === 'All') {
                  setSearchParams({});
                } else {
                  setSearchParams({ topic });
                }
              }}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                selectedTopic === topic
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {topic}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Posts Grid */}
      {filteredPosts.length === 0 ? (
        <p className="text-gray-400 text-center py-12">
          No blog posts found for this topic.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map(post => (
            <article
              key={post.slug}
              className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-primary-500 hover:bg-gray-800 transition-all group flex flex-col min-h-[280px]"
            >
              <Link
                to={`/blog/${post.slug}`}
                className="flex-1 flex flex-col"
              >
                <div className="mb-3">
                  <span className="text-sm text-primary-400 font-semibold">
                    {formatDate(post.date)}
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-3 group-hover:text-primary-400 transition-colors">
                  {post.title}
                </h3>

                <p className="text-gray-400 mb-4 line-clamp-3 flex-1">
                  {post.description}
                </p>
              </Link>

              <div className="flex flex-wrap gap-2 mt-auto">
                {post.topics.map(topic => (
                  <button
                    key={topic}
                    onClick={() => setSearchParams({ topic })}
                    className="text-xs bg-primary-950 text-primary-400 border border-primary-800 px-2 py-1 rounded-full hover:bg-primary-900 hover:border-primary-700 transition-colors"
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </article>
          ))}
        </div>
      )}
      </div>
    </>
  );
}
