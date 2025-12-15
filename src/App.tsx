import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import News from './pages/News';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag?: (command: string, targetId: string, config?: Record<string, any>) => void;
    dataLayer?: any[];
  }
}

// Google Analytics pageview tracker
function usePageTracking() {
  const location = useLocation();
  
  useEffect(() => {
    // Check if gtag exists (it won't in development without GA ID)
    if (typeof window.gtag !== 'undefined') {
      window.gtag('config', 'G-CWVDN28C7W', {
        page_path: location.pathname + location.search,
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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/news" element={<News />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
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
