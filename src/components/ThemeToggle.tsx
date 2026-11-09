import { useEffect } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';

type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';
const THEME_COLORS: Record<Theme, string> = { dark: '#0f0f0f', light: '#f6f5f3' };

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.remove('dark', 'light');
  root.classList.add(theme);
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[theme]);
}

function hasSavedTheme(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) !== null;
  } catch {
    return false;
  }
}

/**
 * Light/dark switch. The initial theme is set by the inline script in
 * index.html (saved choice, else the browser setting) so there is no flash.
 * Until the visitor picks one, the site keeps following the OS setting.
 *
 * The icon is chosen with CSS rather than React state so prerendered HTML
 * hydrates cleanly whichever theme the visitor ends up on.
 */
export default function ThemeToggle({ className = '' }: { className?: string }) {
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (event: MediaQueryListEvent) => {
      if (!hasSavedTheme()) applyTheme(event.matches ? 'dark' : 'light');
    };
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  const toggle = () => {
    const next: Theme = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
    applyTheme(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Storage unavailable (private mode); the choice lasts for this page only
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle light and dark mode"
      title="Toggle light and dark mode"
      className={`rounded-md p-2 text-gray-300 transition-colors hover:bg-gray-800/70 hover:text-ivory ${className}`}
    >
      <FiSun className="hidden h-[18px] w-[18px] dark:block" aria-hidden="true" />
      <FiMoon className="block h-[18px] w-[18px] dark:hidden" aria-hidden="true" />
    </button>
  );
}
