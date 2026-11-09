/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Amber accent and graphite neutrals. Values live in CSS variables
        // (src/index.css) so light and dark themes share the same classes.
        primary: Object.fromEntries(
          [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((s) => [s, `rgb(var(--primary-${s}) / <alpha-value>)`])
        ),
        // Warm off-white for display text (warm near-black in light mode)
        ivory: 'rgb(var(--ivory) / <alpha-value>)',
        gray: Object.fromEntries(
          [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((s) => [s, `rgb(var(--gray-${s}) / <alpha-value>)`])
        ),
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
