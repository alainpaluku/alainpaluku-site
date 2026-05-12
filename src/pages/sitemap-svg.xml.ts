import type { APIRoute } from 'astro';
import { getSortedArticles, buildImageUrl, escapeXml, SITE_URL, XML_HEADERS } from '../lib/sitemap-utils';


export const GET: APIRoute = async () => {
  const articles = await getSortedArticles();

  const svgImages = articles.flatMap(article => {
    const allImages = [article.data.image, ...(article.data.images || [])].filter(Boolean);
    return allImages
      .filter(img => img.toLowerCase().endsWith('.svg'))
      .map(svg => ({
        loc: buildImageUrl(svg),
        title: `${article.data.title} - Schéma technique`,
        caption: article.data.description,
        articleUrl: `${SITE_URL}/articles/${article.id}/`,
        date: article.data.date,
      }));
  });

  // Si pas de SVG, retourner un sitemap vide valide
  if (svgImages.length === 0) {
    const emptySitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
</urlset>`;
    return new Response(emptySitemap, { headers: XML_HEADERS });
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${svgImages.map(svg => `  <url>
    <loc>${escapeXml(svg.articleUrl)}</loc>
    <lastmod>${svg.date.toISOString()}</lastmod>
    <image:image>
      <image:loc>${escapeXml(svg.loc)}</image:loc>
      <image:title>${escapeXml(svg.title)}</image:title>
      <image:caption>${escapeXml(svg.caption)}</image:caption>
    </image:image>
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, { headers: XML_HEADERS });
};
