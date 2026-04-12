import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async (context) => {
  const articles = await getCollection('blog', ({ data }) => !data.draft);
  
  // Trier par date décroissante
  const sortedArticles = articles.sort((a, b) => 
    b.data.date.getTime() - a.data.date.getTime()
  );

  return rss({
    title: 'Alain Paluku - Blog Technique',
    description: 'Articles techniques sur l\'énergie, l\'industrie et l\'automatisme par Alain Paluku, ingénieur électricien.',
    site: context.site || 'https://alainpaluku.com',
    items: sortedArticles.map((article) => ({
      title: article.data.title,
      description: article.data.description,
      link: `/articles/${article.slug}/`,
      pubDate: article.data.date,
      author: article.data.author || 'Alain Paluku',
      categories: [article.data.category],
      customData: `
        <enclosure url="${article.data.image}" type="image/jpeg" />
        <content:encoded><![CDATA[
          <img src="${article.data.image}" alt="${article.data.title}" />
          <p>${article.data.description}</p>
        ]]></content:encoded>
      `,
    })),
    customData: `
      <language>fr-FR</language>
      <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
      <atom:link href="https://alainpaluku.com/rss.xml" rel="self" type="application/rss+xml" />
    `,
    xmlns: {
      content: 'http://purl.org/rss/1.0/modules/content/',
      atom: 'http://www.w3.org/2005/Atom',
    },
  });
};
