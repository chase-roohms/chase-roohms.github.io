import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about/', label: 'About' },
    { path: '/projects/', label: 'Projects' },
    { path: '/blog/', label: 'Blog' },
    { path: '/contact/', label: 'Contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 border-b border-gray-800 bg-gray-950/80 backdrop-blur-md">
      <nav className="section-container py-4">
        <div className="flex justify-between items-center">
          {/* Logo/Brand */}
          <Link
            to="/"
            className="flex items-center gap-2.5"
            aria-label="Chase Roohms, home"
          >
            <span
              aria-hidden="true"
              className="h-2 w-2 rotate-45 rounded-[1px] bg-primary-400"
            />
            <span className="text-lg font-semibold tracking-tight text-gray-100">
              Chase Roohms
            </span>
          </Link>

          <div className="flex items-center gap-1">
          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? 'text-ivory bg-gray-800/70'
                      : 'text-gray-300 hover:text-ivory'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <ThemeToggle className="md:ml-2" />

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <ul className="md:hidden mt-4 space-y-1 border-t border-gray-800 pt-3">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`block py-2 font-medium transition-colors ${
                    isActive(item.path)
                      ? 'text-ivory'
                      : 'text-gray-300 hover:text-ivory'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </header>
  );
}
