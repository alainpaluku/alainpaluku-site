import { getCollection } from 'astro:content';

export const SITE_URL = 'https://alainpaluku.com';

export const XML_HEADERS = {
  'Content-Type': 'application/xml; charset=utf-8',
  'Cache-Control': 'public, max-age=3600, s-maxage=7200, stale-while-revalidate=86400',
};

export async function getSortedArticles() {
  const articles = await getCollection('blog', ({ data }) => !data.draft);
  return articles.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export function buildImageUrl(img: string): string {
  return img.startsWith('http') ? img : `${SITE_URL}${img}`;
}
