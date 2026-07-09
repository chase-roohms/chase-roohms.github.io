import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { isDynamicImportError } from '../utils/lazyWithRetry';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

// Guards against infinite reload loops: only auto-reload once per browser tab.
const RELOAD_FLAG = 'chunkErrorReload';

async function reloadForChunkError(): Promise<void> {
  // Bail if we already reloaded this session for a chunk error.
  if (sessionStorage.getItem(RELOAD_FLAG) === 'true') return;
  sessionStorage.setItem(RELOAD_FLAG, 'true');

  // Clear any service-worker caches that might be serving a stale chunk map,
  // then reload to fetch the latest HTML + chunks (same effect as a manual refresh).
  try {
    if ('caches' in window) {
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));
    }
  } catch {
    // Ignore cache-clearing failures — reloading is what matters.
  }
  window.location.reload();
}

/**
 * Catches render errors from the lazy-loaded route tree. A failed dynamic
 * import (code-split chunk) rejects inside Suspense and is re-thrown during
 * render; without a boundary that leaves the user on a blank screen. When we
 * detect such a failure we transparently reload to recover.
 */
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    if (isDynamicImportError(error)) {
      void reloadForChunkError();
      return;
    }
    console.error('[ErrorBoundary] Uncaught render error:', error, info);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // While the automatic reload is in flight (chunk errors), or as a
      // graceful fallback for unexpected errors, show a minimal recovery UI
      // instead of a blank screen.
      return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
          <h1 className="text-2xl font-semibold mb-2">Something went wrong</h1>
          <p className="opacity-80 mb-6">
            The page failed to load. This usually fixes itself on a refresh.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="px-4 py-2 rounded-md bg-primary-600 hover:bg-primary-700 text-white transition-colors"
          >
            Reload
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
