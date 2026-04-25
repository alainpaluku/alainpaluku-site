import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://alainpaluku.com',
  output: 'server',
  adapter: cloudflare(),
  server: {
    port: 3000,
    host: true,
  },
  integrations: [
    tailwind(),
    sitemap({
      filter: (page) => {
        // Exclure les pages API et les pages de test
        return !page.includes('/api/') && !page.includes('/test/');
      },
      customPages: [
        'https://alainpaluku.com/',
        'https://alainpaluku.com/articles/',
        'https://alainpaluku.com/a-propos/',
        'https://alainpaluku.com/contact/',
      ],
      serialize(item) {
        // Priorités personnalisées par type de page
        if (item.url.endsWith('/')) {
          // Page d'accueil
          item.priority = 1.0;
          item.changefreq = 'daily';
        } else if (item.url.includes('/articles/') && !item.url.endsWith('/articles/')) {
          // Articles individuels
          item.priority = 0.9;
          item.changefreq = 'monthly';
        } else if (item.url.includes('/articles/categorie/')) {
          // Pages de catégories
          item.priority = 0.8;
          item.changefreq = 'weekly';
        } else if (item.url.includes('/articles/')) {
          // Page liste articles
          item.priority = 0.85;
          item.changefreq = 'weekly';
        } else {
          // Autres pages (à propos, contact)
          item.priority = 0.7;
          item.changefreq = 'monthly';
        }
        return item;
      },
      i18n: {
        defaultLocale: 'fr',
        locales: {
          fr: 'fr-FR',
        },
      },
    }),
  ],
  // Optimisations Cloudflare
  compressHTML: true,
  build: {
    inlineStylesheets: 'always',
    assets: '_astro',
  },
  vite: {
    build: {
      minify: 'esbuild',
      cssMinify: true,
      target: 'esnext',
      cssCodeSplit: false,
      rollupOptions: {
        output: {
          manualChunks: undefined,
        },
      },
    },
    ssr: {
      external: ['resend'],
      noExternal: []
    },
    optimizeDeps: {
      exclude: ['resend']
    }
  },
});
