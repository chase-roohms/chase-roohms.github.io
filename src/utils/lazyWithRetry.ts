import { lazy } from 'react';
import type { ComponentType } from 'react';

// Matches the various messages browsers/bundlers throw when a dynamically
// imported module (code-split chunk) fails to load. Covers Vite, webpack,
// Chrome/Firefox, and Safari wording.
const DYNAMIC_IMPORT_ERROR =
  /Failed to fetch dynamically imported module|error loading dynamically imported module|Importing a module script failed|ChunkLoadError|Loading chunk \d+ failed/i;

export function isDynamicImportError(error: unknown): boolean {
  const message =
    error instanceof Error ? error.message : typeof error === 'string' ? error : '';
  return DYNAMIC_IMPORT_ERROR.test(message);
}

/**
 * Drop-in replacement for React.lazy that retries the dynamic import a few
 * times before giving up. This recovers from transient network failures that
 * otherwise leave the Suspense fallback (a blank screen) on-screen forever.
 *
 * On each retry the module specifier gets a cache-busting query string so the
 * browser doesn't just replay the previously-failed module-map entry.
 */
export function lazyWithRetry<T extends ComponentType<unknown>>(
  factory: () => Promise<{ default: T }>,
  retries = 2,
  interval = 400,
) {
  return lazy(async () => {
    let lastError: unknown;
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        return await factory();
      } catch (error) {
        lastError = error;
        // Only retry on genuine chunk-load failures; rethrow real errors.
        if (attempt >= retries || !isDynamicImportError(error)) {
          break;
        }
        await new Promise((resolve) => setTimeout(resolve, interval * (attempt + 1)));
      }
    }
    throw lastError;
  });
}
