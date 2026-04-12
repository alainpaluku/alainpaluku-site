import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

/**
 * Sitemap dédié aux schémas techniques SVG
 * Référence spécifiquement les images SVG pour la recherche visuelle technique
 * Inclut métadonnées enrichies: géolocalisation, licence, catégorie
 */
export const GET: APIRoute = async () => {
  const articles = await getCollection('blog', ({ data }) => !data.draft);
  
  // Extraire tous les SVG de tous les articles
  const svgImages = articles.flatMap(article => {
    const allImages = [article.data.image, ...(article.data.images || [])].filter(Boolean);
    return allImages
      .filter(img => img.toLowerCase().endsWith('.svg'))
      .map(svg => ({
        loc: svg.startsWith('http') ? svg : `https://alainpaluku.com${svg}`,
        title: `${article.data.title} - Schéma technique`,
        caption: article.data.description,
        articleUrl: `https://alainpaluku.com/articles/${article.slug}`,
        category: article.data.category,
        date: article.data.date,
      }));
  });

  // Trier par date décroissante
  const sortedSvgs = svgImages.sort((a, b) => 
    b.date.getTime() - a.date.getTime()
  );

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${sortedSvgs.map(svg => `  <url>
    <loc>${svg.articleUrl}</loc>
    <lastmod>${svg.date.toISOString()}</lastmod>
    <image:image>
      <image:loc>${svg.loc}</image:loc>
      <image:title>${svg.title}</image:title>
      <image:caption>${svg.caption}</image:caption>
      <image:geo_location>France</image:geo_location>
      <image:license>https://alainpaluku.com/licence</image:license>
    </image:image>
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=7200, stale-while-revalidate=86400',
    },
  });
};
