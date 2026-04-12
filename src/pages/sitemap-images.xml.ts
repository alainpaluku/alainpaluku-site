import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

/**
 * Sitemap dédié aux images des articles
 * Référence automatiquement toutes les images (principale + secondaires) de chaque article
 * Optimisé pour Google Images et la recherche visuelle
 */
export const GET: APIRoute = async () => {
  const articles = await getCollection('blog', ({ data }) => !data.draft);
  
  // Trier par date décroissante pour prioriser les articles récents
  const sortedArticles = articles.sort((a, b) => 
    b.data.date.getTime() - a.data.date.getTime()
  );
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${sortedArticles.map(article => {
  const url = `https://alainpaluku.com/articles/${article.slug}`;
  // Combiner image principale + images secondaires
  const allImages = [article.data.image, ...(article.data.images || [])].filter(Boolean);
  
  return `  <url>
    <loc>${url}</loc>
    <lastmod>${article.data.date.toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
${allImages.map((img, index) => `    <image:image>
      <image:loc>${img.startsWith('http') ? img : `https://alainpaluku.com${img}`}</image:loc>
      <image:title>${article.data.title}${index > 0 ? ` - Image ${index}` : ''}</image:title>
      <image:caption>${article.data.description}</image:caption>
    </image:image>`).join('\n')}
  </url>`;
}).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=7200, stale-while-revalidate=86400',
    },
  });
};
