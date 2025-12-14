# Portfolio Website

A modern, clean portfolio website built with React, TypeScript, and Tailwind CSS.

## Tech Stack

- **Vite** - Fast build tool and dev server
- **React 18** - UI library
- **TypeScript** - Type safety
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

Dependencies are already installed! Start the development server:

```bash
npm run dev
```

The site will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/       # Reusable components
│   ├── Header.tsx   # Navigation header
│   ├── Footer.tsx   # Site footer
│   └── Layout.tsx   # Main layout wrapper
├── pages/           # Page components
│   ├── Home.tsx     # Landing page
│   ├── About.tsx    # About page
│   ├── Projects.tsx # Projects showcase
│   └── Contact.tsx  # Contact form
├── App.tsx          # Main app with routing
├── index.css        # Global styles & Tailwind
└── main.tsx         # Entry point
```

## Customization

### Colors

The primary color scheme is defined in `tailwind.config.js`. Modify the `primary` color object to change the site's color theme.

### Content

- Update your name and tagline in `src/pages/Home.tsx`
- Add your experience in `src/pages/About.tsx`
- Showcase your projects in `src/pages/Projects.tsx`
- Update social links in `src/components/Footer.tsx`

### Adding Blog Posts

1. Add your `.md` file to `src/content/blog/` with frontmatter (title, date, author, description, topics, slug, icon, image)
2. The blog post will automatically appear in the blog list

### Social Media Previews

Since this is a Single Page Application (SPA), social media crawlers won't execute JavaScript to see page-specific meta tags. Two solutions:

1. **Current**: Static meta tags in `index.html` provide a general preview for the main site
2. **Recommended for blog posts**: Use [Prerender.io](https://prerender.io/) free tier
   - Sign up at prerender.io
   - Add their middleware to serve pre-rendered pages to crawlers
   - This enables proper OpenGraph previews for individual blog posts

### Styling

- Global styles and Tailwind utilities are in `src/index.css`
- Component-specific styles use Tailwind classes inline

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Lint code with ESLint

## Next Steps

1. **Personalize Content**: Replace placeholder text with your information
2. **Add Images**: Add your profile photo and project screenshots
3. **Customize Design**: Adjust colors, fonts, and spacing to your taste
4. **Add Projects**: Update the projects array with your real projects
5. **Connect Form**: Integrate the contact form with a backend or service
6. **Add Analytics**: Consider adding Google Analytics or similar
7. **Deploy**: Deploy to Vercel, Netlify, or your preferred hosting

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Vercel will auto-detect Vite and deploy

### Netlify

1. Push your code to GitHub
2. Import your repository on [Netlify](https://netlify.com)
3. Build command: `npm run build`
4. Publish directory: `dist`

## License

MIT License - Feel free to use this template for your own portfolio!
