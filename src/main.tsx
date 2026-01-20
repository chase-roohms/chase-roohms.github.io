import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App.tsx'
import { registerServiceWorker, checkInstallability } from './utils/pwa'
import { unlockAchievement, getAchievementStats, getAchievements } from './utils/achievements'

// Handle chunk loading errors (occurs after deployments when cached chunks are outdated)
let hasReloadedForChunkError = false;
const handleChunkError = () => {
  if (hasReloadedForChunkError) return;
  
  console.warn('[App] Chunk load error detected - reloading to fetch latest assets');
  hasReloadedForChunkError = true;
  sessionStorage.setItem('chunkErrorReload', 'true');
  
  // Clear service worker caches and reload
  const hasCaches = 'caches' in window;
  if (hasCaches) {
    caches.keys().then(keys => {
      Promise.all(keys.map(key => caches.delete(key))).then(() => {
        window.location.reload();
      });
    });
  } else {
    window.location.reload();
  }
};

window.addEventListener('error', (event) => {
  if (event.message?.includes('ChunkLoadError') || event.message?.includes('Loading chunk')) {
    event.preventDefault();
    handleChunkError();
  }
});

window.addEventListener('unhandledrejection', (event) => {
  if (event.reason?.message?.includes('ChunkLoadError') || event.reason?.message?.includes('Loading chunk')) {
    event.preventDefault();
    handleChunkError();
  }
});

// Easter egg for developers opening the console
console.log('%c🚀 Welcome, Developer! 🚀', 'color: #ff6200; font-size: 24px; font-weight: bold;');
console.log('%cYou found the developer console!', 'color: #0ea5e9; font-size: 16px;');
console.log('%c\n"Great developers think in code, but dream in automation" - Chase\n', 'color: #f59e0b; font-style: italic;');
console.log('%cInterested in how this site was built? Check out:', 'color: #8b5cf6;');
console.log('%chttps://github.com/chase-roohms/chase-roohms.github.io', 'color: #ec4899;');

// Add interactive console functions
(window as unknown as Record<string, unknown>).explore = () => {
  console.clear();
  console.log('%c🎉 Achievement Unlocked! 🎉', 'color: #10b981; font-size: 20px; font-weight: bold;');
  console.log('%cYou are a true Console Explorer!', 'color: #0ea5e9; font-size: 16px;');
  console.log('%c\n✨ You discovered the hidden explore() function!\n', 'color: #fff;');
  
  unlockAchievement('console_explorer');
  
  console.log('%cTry these other commands:', 'color: #fbbf24; font-weight: bold;');
  console.log('%c• achievements() - View your achievement progress', 'color: #fff;');
  console.log('%c• about() - Learn about this site', 'color: #fff;');
};

(window as unknown as Record<string, unknown>).achievements = () => {
  const stats = getAchievementStats();
  console.clear();
  console.log('%c🏆 Achievement Progress 🏆', 'color: #ff6200; font-size: 20px; font-weight: bold;');
  console.log(`%c\nUnlocked: ${stats.unlocked} / ${stats.total} (${stats.percentage}%)`, 'color: #10b981; font-size: 16px;');
  console.log('%c\nVisit /achievements for full details!', 'color: #0ea5e9;');
  
  const allAchievements = getAchievements();
  allAchievements.forEach(a => {
    const status = a.unlocked ? '✅' : '🔒';
    const color = a.unlocked ? '#10b981' : '#6b7280';
    console.log(`%c${status} ${a.unlocked ? a.title : '???'}`, `color: ${color};`);
  });
};

(window as unknown as Record<string, unknown>).about = () => {
  console.clear();
  console.log('%c💻 About This Site 💻', 'color: #ff6200; font-size: 20px; font-weight: bold;');
  console.log('%c\nBuilt with:', 'color: #10b981; font-weight: bold;');
  console.log('%c• React + TypeScript', 'color: #fff;');
  console.log('%c• Vite', 'color: #fff;');
  console.log('%c• Tailwind CSS', 'color: #fff;');
  console.log('%c• PWA Support', 'color: #fff;');
  console.log('%c\nSource Code:', 'color: #10b981; font-weight: bold;');
  console.log('%chttps://github.com/chase-roohms/chase-roohms.github.io', 'color: #0ea5e9;');
};

// Clear reload flag after successful load
if (sessionStorage.getItem('chunkErrorReload') === 'true') {
  console.log('Successfully reloaded after chunk error');
  sessionStorage.removeItem('chunkErrorReload');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>,
)

// Register service worker for PWA support (production only)
if (import.meta.env.PROD) {
  registerServiceWorker()
  checkInstallability()
} else {
  console.log('[PWA] Service worker disabled in development mode')
  
  // Unregister any existing service workers in development
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(registrations => {
      registrations.forEach(registration => {
        registration.unregister()
        console.log('[PWA] Unregistered existing service worker')
      })
    })
    
    // Clear all caches
    caches.keys().then(keys => {
      keys.forEach(key => {
        caches.delete(key)
        console.log('[PWA] Cleared cache:', key)
      })
    })
  }
}
