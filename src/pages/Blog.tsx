import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FaRss, FaTimes, FaArrowRight, FaPenNib } from 'react-icons/fa';
import { getAllBlogPosts, getAllBlogPostsSync, type BlogPost } from '../utils/blogLoader';
import BlogPostCard from '../components/BlogPostCard';
import SearchBar from '../components/SearchBar';
import TopicSelect from '../components/TopicSelect';
import FilterResultsCount from '../components/FilterResultsCount';
import { useContentFilter } from '../hooks/useContentFilter';
import { getPageTitle } from '../utils/pageTitle';
import { groupPostsBySeries, getSeries } from '../utils/blogSeries';
import { formatDateShort } from '../utils/dateFormatter';

function firstSentence(text: string) {
  const match = text.match(/^.*?[.!?](?=\s|$)/);
  return match ? match[0] : text;
}

function FeaturedPost({ post }: { post: BlogPost }) {
  const series = getSeries(post.series);
  const teaser = firstSentence(post.description);
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
      <div className="flex flex-col justify-center gap-3 p-5 sm:p-8 md:gap-4 md:p-10">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-semibold text-primary-400">Latest post</span>
          {series && (
            <span className="text-sm text-gray-500">· {series.name}</span>
          )}
        </div>
        <h2 className="text-2xl md:text-3xl font-bold leading-tight text-gray-50">
          {post.title}
        </h2>
        <p className="text-gray-300 md:hidden">{teaser}</p>
        <p className="hidden text-lg text-gray-300 md:block">{post.description}</p>
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

function SeriesPostRow({ post, part, isLatest }: { post: BlogPost; part?: number; isLatest: boolean }) {
  return (
    <Link
      to={`/blog/${post.slug}/`}
      className="group -mx-3 flex gap-x-3 rounded-lg px-3 py-3 transition-colors hover:bg-gray-800/60"
    >
      {part !== undefined && (
        <span className="w-6 shrink-0 text-sm leading-6 tabular-nums text-primary-500/80">
          {String(part).padStart(2, '0')}
        </span>
      )}
      <span className="min-w-0 flex-1 sm:flex sm:items-baseline sm:justify-between sm:gap-6">
        <span className="min-w-0">
          <span className="block font-medium leading-6 text-gray-200 transition-colors group-hover:text-primary-400">
            {post.title}
          </span>
          <span className="mt-0.5 hidden text-sm text-gray-500 sm:block">{post.description}</span>
        </span>
        <span className="mt-1 block whitespace-nowrap text-xs tabular-nums text-gray-500 sm:mt-0">
          {isLatest ? <span className="font-semibold text-primary-400">New</span> : formatDateShort(post.date)}
        </span>
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
        <div className="flex items-center justify-between gap-6 mb-6 md:mb-14">
          <h1 className="text-4xl md:text-5xl font-bold flex items-center gap-3">
            <FaPenNib className="text-primary-400" />
            Blog
          </h1>
          <button
            onClick={() => setShowRssDialog(true)}
            className="btn-secondary shrink-0"
            aria-label="Subscribe to RSS feed"
          >
            <FaRss />
            <span className="hidden sm:inline">RSS</span>
          </button>
        </div>

        <div className="flex flex-col">
        {/* Latest post, series agnostic. Sits below search on mobile, above it on desktop */}
        {latestPost && !isFiltering && (
          <div className="order-2 md:order-1">
            <FeaturedPost post={latestPost} />
          </div>
        )}

        {/* Search + topic filter */}
        <div className="order-1 mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between md:order-2 md:mb-10 md:mt-14">
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
          <div className="mt-12 border-b border-gray-800 md:mt-0">
            {seriesGroups.map(({ series, posts: seriesPosts }) => (
              <section
                key={series.id}
                id={`series-${series.id}`}
                aria-labelledby={`series-${series.id}-title`}
                className="grid scroll-mt-24 gap-x-12 gap-y-3 border-t border-gray-800 py-8 md:grid-cols-[15rem_minmax(0,1fr)] md:py-10 lg:grid-cols-[18rem_minmax(0,1fr)]"
              >
                <div>
                  <h2 id={`series-${series.id}-title`} className="text-xl font-bold">
                    {series.name}
                  </h2>
                  <p className="mt-1 text-sm text-gray-400">{series.description}</p>
                  <p className="mt-2 text-sm text-gray-500">
                    {seriesPosts.length} {seriesPosts.length === 1 ? 'post' : 'posts'}
                  </p>
                </div>
                {(() => {
                  const List = series.numbered ? 'ol' : 'ul';
                  return (
                    <List className="md:-mt-3">
                      {seriesPosts.map((post, i) => (
                        <li key={post.slug}>
                          <SeriesPostRow
                            post={post}
                            part={series.numbered ? i + 1 : undefined}
                            isLatest={post.slug === latestPost?.slug}
                          />
                        </li>
                      ))}
                    </List>
                  );
                })()}
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
