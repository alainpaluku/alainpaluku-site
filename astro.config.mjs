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
        'https://alainpaluku.com/en/',
        'https://alainpaluku.com/en/about/',
        'https://alainpaluku.com/en/articles/',
        'https://alainpaluku.com/en/contact/',
      ],
      serialize(item) {
        const { pathname } = new URL(item.url);

        // Priorités personnalisées par type de page
        if (pathname === '/') {
          item.priority = 1.0;
          item.changefreq = 'weekly';
        } else if (pathname.startsWith('/articles/') && pathname !== '/articles/') {
          item.priority = 0.9;
          item.changefreq = 'monthly';
        } else if (pathname === '/articles/') {
          item.priority = 0.85;
          item.changefreq = 'weekly';
        } else {
          item.priority = 0.7;
          item.changefreq = 'monthly';
        }

        return item;
      },
      i18n: {
        defaultLocale: 'fr',
        locales: {
          fr: 'fr-FR',
          en: 'en-US',
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
