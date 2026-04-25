import type { APIRoute } from 'astro';


export const GET: APIRoute = async () => {
  const manifest = {
    name: 'Alain Paluku - Ingénieur Électricien',
    short_name: 'Alain Paluku',
    description: 'Ingénieur Électricien spécialisé en réseaux électriques, énergies renouvelables et automatisme industriel',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#1a1b26',
    theme_color: '#c0caf5',
    orientation: 'portrait-primary',
    lang: 'fr-FR',
    dir: 'ltr',
    icons: [
      {
        src: '/logo.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/logo.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/logo.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
    ],
    categories: ['education', 'technology', 'engineering', 'business'],
    screenshots: [],
    shortcuts: [
      {
        name: 'Articles',
        short_name: 'Articles',
        description: 'Voir tous les articles',
        url: '/articles/',
        icons: [{ src: '/logo.png', sizes: '192x192' }],
      },
      {
        name: 'Contact',
        short_name: 'Contact',
        description: 'Me contacter',
        url: '/contact/',
        icons: [{ src: '/logo.png', sizes: '192x192' }],
      },
    ],
  };

  return new Response(JSON.stringify(manifest, null, 2), {
    headers: {
      'Content-Type': 'application/manifest+json; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
