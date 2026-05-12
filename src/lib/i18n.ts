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
    nav: {
      home: 'Accueil',
      about: 'À propos',
      articles: 'Articles',
      contact: 'Contact',
    },
    languageSwitch: 'English',
    languageLabel: 'Changer la langue vers l’anglais',
    siteTitle: 'Alain Paluku - Ingénieur Électricien',
    defaultDescription:
      'Alain Paluku est Ingénieur Électricien, Développeur Système Embarqué et Master en Électroénergétique en cours à l’Université Catholique la Sapientia – Goma. Expertise en réseaux électriques BT/MT/HT, énergies renouvelables, SCADA et automatisme industriel.',
    home: {
      title: 'ACCUEIL',
      headline: 'Alain Paluku',
      subtitle: 'Ingénieur Électricien | Développeur Système Embarqué | Master en Électroénergétique en cours',
      contact: 'Me contacter',
      about: 'En savoir plus',
      recentArticles: 'Articles récents',
      more: 'Voir plus',
      preparing: '// Articles techniques en préparation',
      preparingText:
        'Revenez bientôt pour lire les publications sur l’énergie, l’industrie et l’automatisme.',
    },
    about: {
      title: 'À PROPOS',
      subtitle: 'Ingénieur Électricien | Développeur Système Embarqué',
      intro:
        'Alain Paluku construit des solutions fiables à l’intersection de l’électroénergétique, des systèmes embarqués et de l’automatisation industrielle.',
      education: 'Formation',
      inProgress: 'En cours',
      expertise: 'Domaines d’expertise',
      articles: 'Articles',
      articlesText: 'Explorez les articles techniques et analyses du secteur.',
      readArticles: 'Lire les articles',
      workTogether: 'Travaillons ensemble',
      workText: 'Projet en réseaux électriques, énergie renouvelable ou automatisme ? Discutons.',
      contact: 'Me contacter',
    },
    footer: {
      stay: 'Restez informé',
      newsletter: 'Recevez mes derniers articles sur l’énergie et l’industrie.',
      firstName: 'Prénom',
      email: 'Adresse email',
      subscribe: 'S’inscrire',
      navigation: 'Navigation',
      contact: 'Contact',
      follow: 'Suivez-moi',
      rights: 'Tous droits réservés.',
    },
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      articles: 'Articles',
      contact: 'Contact',
    },
    languageSwitch: 'Français',
    languageLabel: 'Switch language to French',
    siteTitle: 'Alain Paluku - Electrical Engineer',
    defaultDescription:
      'Alain Paluku is an Electrical Engineer, Embedded Systems Developer and ongoing Master’s student in Electroenergetics at Université Catholique la Sapientia – Goma, focused on LV/MV/HV power networks, renewable energy, SCADA and industrial automation.',
    home: {
      title: 'HOME',
      headline: 'Alain Paluku',
      subtitle: 'Electrical Engineer | Embedded Systems Developer | Master’s in Electroenergetics in progress',
      contact: 'Contact me',
      about: 'Learn more',
      recentArticles: 'Recent articles',
      more: 'See more',
      preparing: '// Technical articles in progress',
      preparingText: 'Come back soon for publications about energy, industry and automation.',
    },
    about: {
      title: 'ABOUT',
      subtitle: 'Electrical Engineer | Embedded Systems Developer',
      intro:
        'Alain Paluku builds reliable solutions at the intersection of electroenergetics, embedded systems and industrial automation.',
      education: 'Education',
      inProgress: 'In progress',
      expertise: 'Areas of expertise',
      articles: 'Articles',
      articlesText: 'Explore technical articles and sector insights.',
      readArticles: 'Read articles',
      workTogether: 'Let’s work together',
      workText: 'Have a power systems, renewable energy or automation project? Let’s talk.',
      contact: 'Contact me',
    },
    footer: {
      stay: 'Stay informed',
      newsletter: 'Receive my latest articles about energy and industry.',
      firstName: 'First name',
      email: 'Email address',
      subscribe: 'Subscribe',
      navigation: 'Navigation',
      contact: 'Contact',
      follow: 'Follow me',
      rights: 'All rights reserved.',
    },
  },
} as const;
