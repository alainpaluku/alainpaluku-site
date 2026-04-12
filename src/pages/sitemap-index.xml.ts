import type { APIRoute } from 'astro';

/**
 * Sitemap Index - Point d'entrée principal
 * Regroupe tous les sitemaps du site pour faciliter la soumission aux moteurs de recherche
 */
export const GET: APIRoute = async () => {
  const now = new Date().toISOString();
  
  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://alainpaluku.com/sitemap-0.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://alainpaluku.com/sitemap-images.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://alainpaluku.com/sitemap-svg.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>
</sitemapindex>`;

  return new Response(sitemapIndex, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=7200, stale-while-revalidate=86400',
    },
  });
};
