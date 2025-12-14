import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import VitePrerender from 'vite-plugin-prerender'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePrerender({
      staticDir: 'dist',
      routes: [
        '/',
        '/about',
        '/projects',
        '/contact',
        '/blog',
        '/news',
        '/blog/home-lab-setup',
      ],
    }),
  ],
  base: '/',
  define: {
    'global': 'globalThis',
  },
  resolve: {
    alias: {
      'buffer': 'buffer',
    }
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis'
      }
    }
  }
})
