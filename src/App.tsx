import { useEffect, useState, useCallback } from 'react';
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
import Achievements from './pages/Achievements';
import { useKonamiCode, useSecretWord, useLogoClicks } from './hooks/useKonamiCode';
import { KonamiEasterEgg, AutomationEasterEgg, LogoClickEasterEgg } from './components/EasterEggs';
import { unlockAchievement } from './utils/achievements';

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
  const [showKonami, setShowKonami] = useState(false);
  const [showAutomation, setShowAutomation] = useState(false);
  const [showLogoEgg, setShowLogoEgg] = useState(false);
  
  // Konami Code Easter Egg
  useKonamiCode(useCallback(() => {
    setShowKonami(true);
    unlockAchievement('konami_code');
  }, []));
  
  // Secret Word Easter Egg
  useSecretWord('automation', useCallback(() => {
    setShowAutomation(true);
    unlockAchievement('automation_word');
  }, []));
  
  // Logo Click Easter Egg
  const handleLogoClick = useLogoClicks(20, () => {
    setShowLogoEgg(true);
    unlockAchievement('logo_clicker');
  });
  
  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowKonami(false);
        setShowAutomation(false);
        setShowLogoEgg(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  return (
    <>
      <ScrollToTop />
      <Layout onLogoClick={handleLogoClick}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/news" element={<News />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
      
      {/* Easter Eggs */}
      <KonamiEasterEgg 
        active={showKonami} 
        onClose={() => setShowKonami(false)} 
      />
      <AutomationEasterEgg 
        active={showAutomation} 
        onClose={() => setShowAutomation(false)} 
      />
      <LogoClickEasterEgg 
        active={showLogoEgg} 
        onClose={() => setShowLogoEgg(false)} 
      />
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
