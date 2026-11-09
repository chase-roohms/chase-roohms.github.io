import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App.tsx'
import { registerServiceWorker, checkInstallability } from './utils/pwa'
import { isDynamicImportError } from './utils/lazyWithRetry'

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
  if (isDynamicImportError(event.message) || isDynamicImportError(event.error)) {
    event.preventDefault();
    handleChunkError();
  }
});

window.addEventListener('unhandledrejection', (event) => {
  if (isDynamicImportError(event.reason)) {
    event.preventDefault();
    handleChunkError();
  }
});

// Clear reload flag after successful load
if (sessionStorage.getItem('chunkErrorReload') === 'true') {
  console.log('Successfully reloaded after chunk error');
  sessionStorage.removeItem('chunkErrorReload');
}

const rootElement = document.getElementById('root')!

const app = (
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>
)

if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, app)
} else {
  createRoot(rootElement).render(app)
}

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
