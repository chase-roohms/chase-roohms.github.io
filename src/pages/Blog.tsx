import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FaBlog, FaSearch, FaRss, FaTimes } from 'react-icons/fa';
import { getAllBlogPosts, type BlogPost } from '../utils/blogLoader';
import BlogPostCard from '../components/BlogPostCard';

const ITEMS_PER_PAGE = 9;

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedTopic = searchParams.get('topic') || 'All';
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [currentPage, setCurrentPage] = useState(1);
  const [showRssDialog, setShowRssDialog] = useState(false);
  const rssUrl = 'https://chaseroohms.com/blog-rss.xml';

  useEffect(() => {
    getAllBlogPosts().then(loadedPosts => {
      setPosts(loadedPosts);
      setLoading(false);
    });
  }, []);

  // Reset to page 1 when search or topic changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedTopic]);

  // Get all unique topics
  const allTopics = ['All', ...new Set(posts.flatMap(post => post.topics))];

  // Filter posts by selected topic and search query
  const filteredPosts = posts.filter(post => {
    const matchesTopic = selectedTopic === 'All' || post.topics.includes(selectedTopic);
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.topics.some(topic => topic.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTopic && matchesSearch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

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
        <link rel="alternate" type="application/rss+xml" title="Chase Roohms - Blog RSS Feed" href="https://chaseroohms.com/blog-rss.xml" />
      </Helmet>
      <div className="section-container py-8 md:py-20">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-4xl md:text-5xl font-bold flex items-center gap-3">
            <FaBlog className="text-primary-400" />
            Blog
          </h1>
          <button
            onClick={() => setShowRssDialog(true)}
            className="flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors font-semibold"
            aria-label="Subscribe to RSS feed"
          >
            <FaRss />
            <span className="hidden sm:inline">RSS Feed</span>
          </button>
        </div>
      <p className="text-gray-400 text-lg mb-8">
        Technical articles, tutorials, and thoughts on software development.
      </p>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search posts by title, description, or topic..."
            value={searchQuery}
            onChange={(e) => {
              const value = e.target.value;
              setSearchQuery(value);
              const newParams: Record<string, string> = {};
              if (value) newParams.search = value;
              if (selectedTopic !== 'All') newParams.topic = selectedTopic;
              setSearchParams(newParams);
            }}
            className="w-full pl-12 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
          />
        </div>
      </div>

      {/* Topic Filter */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Filter by Topic</h2>
        <div className="flex flex-wrap gap-2">
          {allTopics.map(topic => (
            <button
              key={topic}
              onClick={() => {
                const newParams: Record<string, string> = {};
                if (searchQuery) newParams.search = searchQuery;
                if (topic !== 'All') newParams.topic = topic;
                setSearchParams(newParams);
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

      {/* Results Count */}
      {(searchQuery || selectedTopic !== 'All') && (
        <p className="text-gray-400 mb-6">
          Found {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''}
          {searchQuery && ` matching "${searchQuery}"`}
          {selectedTopic !== 'All' && ` in ${selectedTopic}`}
        </p>
      )}

      {/* Blog Posts Grid */}
      {filteredPosts.length === 0 ? (
        <p className="text-gray-400 text-center py-12">
          No blog posts found. Try adjusting your search or filters.
        </p>
      ) : (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {paginatedPosts.map(post => (
              <BlogPostCard
                key={post.slug}
                post={post}
                onTopicClick={(topic) => setSearchParams({ topic })}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-gray-400 hover:bg-gray-800 hover:border-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Previous
              </button>
              
              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-lg font-semibold transition-all ${
                      currentPage === page
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-900 border border-gray-800 text-gray-400 hover:bg-gray-800 hover:border-primary-500'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-gray-400 hover:bg-gray-800 hover:border-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      {/* RSS Feed Dialog */}
      {showRssDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={() => setShowRssDialog(false)}>
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <FaRss className="text-orange-500" />
                RSS Feed
              </h2>
              <button
                onClick={() => setShowRssDialog(false)}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Close dialog"
              >
                <FaTimes size={24} />
              </button>
            </div>
            <p className="text-gray-400 mb-4">
              Subscribe to this RSS feed to get notified of new blog posts.
            </p>
            <div className="bg-gray-950 border border-gray-800 rounded p-3 mb-4">
              <code className="text-primary-400 text-sm break-all">{rssUrl}</code>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(rssUrl);
                  // Could add a toast notification here
                }}
                className="flex-1 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors font-semibold"
              >
                Copy URL
              </button>
              <a
                href={rssUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors font-semibold text-center"
              >
                Open Feed
              </a>
            </div>
          </div>
        </div>
      )}
      </div>
    </>
  );
}
