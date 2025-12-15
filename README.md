# Chase Roohms' Portfolio

Static site generator for my personal portfolio with an integrated blog system and automated prerendering for SEO.

## Tech Stack

- Vite + React 18 + TypeScript
- React Router v6 for client-side routing
- Tailwind CSS for styling
- React Helmet Async for dynamic meta tags
- Gray Matter for markdown frontmatter parsing
- Puppeteer for prerendering

## Architecture

- Single Page Application with static prerendering
- Markdown-based blog with automatic post discovery
- Custom prerendering pipeline for social media crawler compatibility
- YAML-based resume data with Typst export capability (shoutout [rendercv](https://github.com/rendercv/rendercv))

## Development

```bash
npm install
npm run dev
```

Development server runs at `http://localhost:5173`

## Build

```bash
npm run build
```

Build process:
1. Vite production build to `dist/`
2. Puppeteer-based prerendering of all routes
3. RSS feed generation for blog and news
4. Sitemap.xml generation
5. Static HTML generation with fully-rendered meta tags for crawler compatibility

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx      # Navigation with mobile menu
│   ├── Footer.tsx      # Footer with social links
│   ├── Layout.tsx      # Main layout wrapper
│   ├── Skills.tsx      # Skills display component
│   └── ScrollToTop.tsx # Route change scroll handler
├── pages/              # Route pages
│   ├── Home.tsx        # Landing page
│   ├── About.tsx       # About/experience page
│   ├── Projects.tsx    # Project showcase
│   ├── Blog.tsx        # Blog post list
│   ├── BlogPost.tsx    # Individual post viewer
│   ├── Contact.tsx     # Contact information
│   └── News.tsx        # News/updates page
├── content/            # Content files
│   ├── blog/          # Blog posts (markdown)
│   └── resume/        # Resume data (YAML)
├── utils/              # Utility functions
│   └── blogLoader.ts  # Blog post loading logic
├── App.tsx            # Main app with routing
└── main.tsx           # Entry point

scripts/
├── prerender.js        # Prerendering script for SEO
├── generate-rss.js     # RSS feed generation for blog and news
├── generate-sitemap.js # Sitemap.xml generation
├── check-meta-tags.js  # Meta tag validation
├── verify-pages.js     # Page verification
└── optimize-image.sh   # Image optimization
```

## Blog System

Blog posts are markdown files in `src/content/blog/` with YAML frontmatter:

```yaml
---
title: "Post Title"
date: "YYYY-MM-DD"
author: "Author Name"
description: "SEO description"
topics: ["topic1", "topic2"]
slug: "url-slug"
icon: "FaBalanceScale" # Some React icon or other
image: "/blog-images/image.jpg"
---
```

## SEO Features

- **JSON-LD Structured Data**: Blog posts include BlogPosting schema markup
- **RSS Feeds**: 
  - Blog RSS feed at `/blog-rss.xml`
  - News RSS feed at `/news-rss.xml`
- **Sitemap**: Auto-generated sitemap.xml with all pages and blog posts
- **robots.txt**: Configured with sitemap reference

Posts are automatically discovered and rendered at build time. The prerender script generates static HTML for each post to ensure proper OpenGraph meta tags for social media crawlers.

## Prerendering

`scripts/prerender.js` runs post-build to generate static HTML files:

1. Starts local server serving the Vite build
2. Launches headless Chromium via Puppeteer
3. Navigates to each route (static pages + dynamically discovered blog posts)
4. Captures fully-rendered HTML with client-side meta tags
5. Writes static files to `dist/`

This ensures social media crawlers receive fully-rendered pages with correct meta tags despite the SPA architecture.

## Scripts

- `npm run dev` - Development server
- `npm run build` - Production build with prerendering
- `npm run preview` - Preview production build locally
- `npm run lint` - ESLint

## Deployment

Deployed via GitHub Pages. Build command: `npm run build`, publish directory: `dist/`

Any static host works (Vercel, Netlify, etc.) - just ensure the build command runs the full build including prerendering.
