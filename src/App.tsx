import { useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import ErrorBoundary from './components/ErrorBoundary';
import { lazyWithRetry } from './utils/lazyWithRetry';
import Home from './pages/Home';

// Lazy-load non-critical routes for code splitting.
// lazyWithRetry recovers from transient chunk-load failures that would
// otherwise leave the Suspense fallback (a blank screen) on-screen.
const About = lazyWithRetry(() => import('./pages/About'));
const Projects = lazyWithRetry(() => import('./pages/Projects'));
const Blog = lazyWithRetry(() => import('./pages/Blog'));
const BlogPost = lazyWithRetry(() => import('./pages/BlogPost'));
const Contact = lazyWithRetry(() => import('./pages/Contact'));
const NotFound = lazyWithRetry(() => import('./pages/NotFound'));

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag?: (command: string, targetId: string, config?: Record<string, unknown>) => void;
    dataLayer?: unknown[];
  }
}

// Google Analytics pageview tracker
function usePageTracking() {
  const location = useLocation();
  
  useEffect(() => {
    // Check if gtag exists (it won't in development without GA ID)
    if (typeof window.gtag !== 'undefined') {
      // Send pageview event
      window.gtag('event', 'page_view', {
        page_path: location.pathname + location.search,
        page_location: window.location.href,
        page_title: document.title,
      });
    }
  }, [location]);
}

function AppContent() {
  usePageTracking();

  return (
    <>
      <ScrollToTop />
      <Layout>
        <ErrorBoundary>
          <Suspense fallback={<div className="min-h-screen" />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about/" element={<About />} />
              <Route path="/projects/" element={<Projects />} />
              <Route path="/news/" element={<Navigate to="/" replace />} />
              <Route path="/blog/" element={<Blog />} />
              <Route path="/blog/:slug/" element={<BlogPost />} />
              <Route path="/contact/" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </Layout>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
