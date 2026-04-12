import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const manifest = {
    name: 'Alain Paluku - Ingénieur Électricien',
    short_name: 'Alain Paluku',
    description: 'Blog technique sur l\'énergie, l\'industrie et l\'automatisme',
    start_url: '/',
    display: 'standalone',
    background_color: '#0B1D47',
    theme_color: '#2FA4DE',
    orientation: 'portrait-primary',
    lang: 'fr-FR',
    dir: 'ltr',
    icons: [
      {
        src: '/logo.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any maskable',
      },
    ],
    categories: ['education', 'technology', 'engineering'],
    screenshots: [],
  };

  return new Response(JSON.stringify(manifest, null, 2), {
    headers: {
      'Content-Type': 'application/manifest+json; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
