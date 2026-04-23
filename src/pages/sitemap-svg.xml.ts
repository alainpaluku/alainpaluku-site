import type { APIRoute } from 'astro';
import { getSortedArticles, buildImageUrl, SITE_URL, XML_HEADERS } from '../lib/sitemap-utils';


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
        articleUrl: `${SITE_URL}/articles/${article.slug}`,
        date: article.data.date,
      }));
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${svgImages.map(svg => `  <url>
    <loc>${svg.articleUrl}</loc>
    <lastmod>${svg.date.toISOString()}</lastmod>
    <image:image>
      <image:loc>${svg.loc}</image:loc>
      <image:title>${svg.title}</image:title>
      <image:caption>${svg.caption}</image:caption>
      <image:geo_location>France</image:geo_location>
      <image:license>${SITE_URL}/licence</image:license>
    </image:image>
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, { headers: XML_HEADERS });
};
