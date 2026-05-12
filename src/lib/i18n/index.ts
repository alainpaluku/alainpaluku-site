import * as frMain from './fr/main';
import * as frSecondary from './fr/secondary';
import * as frUI from './fr/ui';
import * as enMain from './en/main';
import * as enSecondary from './en/secondary';
import * as enUI from './en/ui';

export type Locale = 'fr' | 'en';
export const DEFAULT_LOCALE: Locale = 'fr';
export const LOCALES: Locale[] = ['fr', 'en'];

export const localeLabels: Record<Locale, string> = {
  fr: 'Français',
  en: 'English',
};

export const localeNames: Record<Locale, string> = {
  fr: 'fr-FR',
  en: 'en-US',
};

export const routeMap = {
  home: { fr: '/', en: '/en/' },
  about: { fr: '/a-propos/', en: '/en/about/' },
  articles: { fr: '/articles/', en: '/en/articles/' },
  contact: { fr: '/contact/', en: '/en/contact/' },
} as const;

export type RouteKey = keyof typeof routeMap;

export const getLocaleFromPath = (pathname: string): Locale =>
  pathname === '/en' || pathname.startsWith('/en/') ? 'en' : DEFAULT_LOCALE;

export const getLocalizedPath = (key: RouteKey, locale: Locale) => routeMap[key][locale];

const trimSlash = (path: string) => path.replace(/\/$/, '') || '/';

export const getAlternatePath = (pathname: string, locale: Locale): string => {
  const normalized = trimSlash(pathname);
  for (const routes of Object.values(routeMap)) {
    if (trimSlash(routes.fr) === normalized || trimSlash(routes.en) === normalized) {
      return routes[locale];
    }
  }
  if (locale === 'en') return normalized === '/' ? '/en/' : `/en${normalized}/`;
  return normalized.replace(/^\/en/, '') || '/';
};

export const ui = {
  fr: {
    ...frMain,
    ...frSecondary,
    ...frUI.ui_fr,
    footer: frUI.footer,
    validation: frUI.validation,
  },
  en: {
    ...enMain,
    ...enSecondary,
    ...enUI.ui_en,
    footer: enUI.footer,
    validation: enUI.validation,
  },
} as const;
