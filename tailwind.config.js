/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Amber accent
        primary: {
          50: '#fffaeb',
          100: '#fdf0c8',
          200: '#fbe08f',
          300: '#f6ca63',
          400: '#f0b450',
          500: '#dc9a2e',
          600: '#b97a1f',
          700: '#94601b',
          800: '#744c1a',
          900: '#5c3d18',
          950: '#33210b',
        },
        // Warm off-white for display text
        ivory: '#efe8dc',
        // Neutral graphite
        gray: {
          50: '#f5f5f5',
          100: '#e8e8e8',
          200: '#d0d0d0',
          300: '#b0b0b0',
          400: '#8c8c8c',
          500: '#6e6e6e',
          600: '#555555',
          700: '#3d3d3d',
          800: '#2a2a2a',
          900: '#1a1a1a',
          950: '#0f0f0f',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
