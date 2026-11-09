import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FaRss, FaTimes, FaArrowRight } from 'react-icons/fa';
import { getAllBlogPosts, getAllBlogPostsSync, type BlogPost } from '../utils/blogLoader';
import BlogPostCard from '../components/BlogPostCard';
import SearchBar from '../components/SearchBar';
import TopicSelect from '../components/TopicSelect';
import FilterResultsCount from '../components/FilterResultsCount';
import { useContentFilter } from '../hooks/useContentFilter';
import { getPageTitle } from '../utils/pageTitle';
import { groupPostsBySeries, getSeries } from '../utils/blogSeries';
import { formatDateShort } from '../utils/dateFormatter';

function FeaturedPost({ post }: { post: BlogPost }) {
  const series = getSeries(post.series);
  return (
    <Link
      to={`/blog/${post.slug}/`}
      className="group surface grid overflow-hidden rounded-xl transition-colors hover:border-primary-500 md:grid-cols-[1.15fr_1fr]"
    >
      {post.image && (
        <div className="relative aspect-[16/9] md:aspect-auto md:min-h-[22rem] overflow-hidden bg-gray-900">
          <img
            src={post.image}
            alt=""
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      )}
      <div className="flex flex-col justify-center gap-4 p-6 sm:p-8 md:p-10">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-semibold text-primary-400">Latest post</span>
          {series && (
            <span className="text-sm text-gray-500">· {series.name}</span>
          )}
        </div>
        <h2 className="text-3xl font-bold leading-tight text-gray-50">
          {post.title}
        </h2>
        <p className="text-lg text-gray-300">{post.description}</p>
        <div className="mt-2 flex items-center justify-between gap-4 text-sm text-gray-400">
          <span>
            {formatDateShort(post.date)}
            {post.readingTime ? ` · ${post.readingTime} min read` : ''}
          </span>
          <span className="flex items-center gap-2 font-semibold text-primary-400">
            Read <FaArrowRight className="transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}

function SeriesPostRow({ post, part, isLatest }: { post: BlogPost; part: number; isLatest: boolean }) {
  return (
    <Link
      to={`/blog/${post.slug}/`}
      className="group grid grid-cols-[1.75rem_minmax(0,1fr)_auto] items-baseline gap-x-3 rounded-lg px-3 py-2.5 -mx-3 transition-colors hover:bg-gray-800/60"
    >
      <span className="text-sm tabular-nums text-primary-500/80">{String(part).padStart(2, '0')}</span>
      <span className="min-w-0">
        <span className="block font-medium text-gray-200 transition-colors group-hover:text-primary-400">
          {post.title}
        </span>
        <span className="mt-0.5 block truncate text-sm text-gray-500">{post.description}</span>
      </span>
      <span className="whitespace-nowrap text-xs tabular-nums text-gray-500">
        {isLatest ? <span className="font-semibold text-primary-400">New</span> : formatDateShort(post.date)}
      </span>
    </Link>
  );
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>(() => getAllBlogPostsSync());
  const [showRssDialog, setShowRssDialog] = useState(false);
  const rssUrl = 'https://chaseroohms.com/blog-rss.xml';

  const {
    searchQuery,
    selectedTopic,
    allTopics,
    filteredItems: filteredPosts,
    handleSearchChange,
    handleTopicChange,
  } = useContentFilter<BlogPost>(posts);

  useEffect(() => {
    getAllBlogPosts().then(loadedPosts => {
      setPosts(loadedPosts);
    });
  }, []);

  const isFiltering = searchQuery !== '' || selectedTopic !== 'All';
  const latestPost = posts[0];
  const seriesGroups = useMemo(() => groupPostsBySeries(posts), [posts]);

  return (
    <>
      <Helmet>
        <title>{getPageTitle('Blog')}</title>
        <meta name="description" content="Technical articles, tutorials, and thoughts on DevOps, automation, and software development by Chase Roohms." />
        <meta name="author" content="Chase Roohms" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://chaseroohms.com/blog/" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Chase Roohms" />
        <meta property="og:title" content="Blog - Chase Roohms" />
        <meta property="og:description" content="Technical articles, tutorials, and thoughts on DevOps, automation, and software development by Chase Roohms." />
        <meta property="og:image" content="https://chaseroohms.com/social-preview.webp" />
        <meta property="og:image:type" content="image/webp" />
        <meta property="og:image:alt" content="Chase Roohms - Software Engineer Portfolio" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Blog - Chase Roohms" />
        <meta name="twitter:description" content="Technical articles, tutorials, and thoughts on DevOps, automation, and software development by Chase Roohms." />
        <meta name="twitter:image" content="https://chaseroohms.com/social-preview.webp" />
        <link rel="canonical" href="https://chaseroohms.com/blog/" />
        <link rel="alternate" type="application/rss+xml" title="Chase Roohms - Blog RSS Feed" href="https://chaseroohms.com/blog-rss.xml" />
      </Helmet>
      <div className="section-container py-10 md:py-20">
        {/* Page header */}
        <div className="flex items-center justify-between gap-6 mb-10 md:mb-14">
          <h1 className="text-4xl md:text-5xl font-bold">Blog</h1>
          <button
            onClick={() => setShowRssDialog(true)}
            className="btn-secondary shrink-0"
            aria-label="Subscribe to RSS feed"
          >
            <FaRss />
            <span className="hidden sm:inline">RSS</span>
          </button>
        </div>

        {/* Latest post, series agnostic */}
        {latestPost && !isFiltering && <FeaturedPost post={latestPost} />}

        {/* Search + topic filter */}
        <div className="mt-14 mb-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="w-full sm:max-w-sm">
            <SearchBar
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search posts..."
            />
          </div>
          <div className="w-full sm:w-56">
            <TopicSelect
              topics={allTopics}
              selectedTopic={selectedTopic}
              onTopicChange={handleTopicChange}
            />
          </div>
        </div>

        <FilterResultsCount
          count={filteredPosts.length}
          searchQuery={searchQuery}
          selectedTopic={selectedTopic}
          itemType="post"
        />

        {isFiltering ? (
          filteredPosts.length === 0 ? (
            <p className="text-gray-400 text-center py-12">
              No blog posts found. Try adjusting your search or filters.
            </p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map(post => (
                <BlogPostCard key={post.slug} post={post} onTopicClick={handleTopicChange} />
              ))}
            </div>
          )
        ) : (
          <div className="gap-5 lg:columns-2">
            {seriesGroups.map(({ series, posts: seriesPosts }) => (
              <section
                key={series.id}
                id={`series-${series.id}`}
                aria-labelledby={`series-${series.id}-title`}
                className="surface mb-5 break-inside-avoid scroll-mt-24 rounded-xl p-5 sm:p-6"
              >
                <div className="mb-3 border-b border-gray-800 pb-3">
                  <div className="flex items-baseline justify-between gap-4">
                    <h2 id={`series-${series.id}-title`} className="text-xl font-bold">
                      {series.name}
                    </h2>
                    <span className="text-sm text-gray-500">
                      {seriesPosts.length} {seriesPosts.length === 1 ? 'post' : 'posts'}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-400">{series.description}</p>
                </div>
                <ol>
                  {seriesPosts.map((post, i) => (
                    <li key={post.slug}>
                      <SeriesPostRow post={post} part={i + 1} isLatest={post.slug === latestPost?.slug} />
                    </li>
                  ))}
                </ol>
              </section>
            ))}
          </div>
        )}

      {/* RSS Feed Dialog */}
      {showRssDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={() => setShowRssDialog(false)} role="dialog" aria-modal="true" aria-labelledby="rss-dialog-title">
          <div className="surface rounded-2xl p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 id="rss-dialog-title" className="text-2xl font-bold flex items-center gap-2">
                <FaRss className="text-primary-400" />
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
                className="flex-1 px-4 py-2 bg-primary-400 hover:bg-primary-300 text-gray-950 rounded-lg transition-colors font-semibold"
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
