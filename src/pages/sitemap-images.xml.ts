import type { APIRoute } from 'astro';
import { getSortedArticles, buildImageUrl, escapeXml, SITE_URL, XML_HEADERS } from '../lib/sitemap-utils';


export const GET: APIRoute = async () => {
  const articles = await getSortedArticles();

  // Si pas d'articles, retourner un sitemap vide valide
  if (articles.length === 0) {
    const emptySitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
</urlset>`;
    return new Response(emptySitemap, { headers: XML_HEADERS });
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${articles.map(article => {
  const allImages = [article.data.image, ...(article.data.images || [])].filter(Boolean);
  
  // Si pas d'images, ne pas inclure l'article
  if (allImages.length === 0) return '';
  
  return `  <url>
    <loc>${SITE_URL}/articles/${article.id}/</loc>
    <lastmod>${article.data.date.toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
${allImages.map((img, i) => `    <image:image>
      <image:loc>${escapeXml(buildImageUrl(img))}</image:loc>
      <image:title>${escapeXml(article.data.title)}${i > 0 ? ` - Image ${i}` : ''}</image:title>
      <image:caption>${escapeXml(article.data.description)}</image:caption>
    </image:image>`).join('\n')}
  </url>`;
}).filter(Boolean).join('\n')}
</urlset>`;

  return new Response(sitemap, { headers: XML_HEADERS });
};
