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
      education: 'Formation',
      inProgress: 'En cours',
      expertise: 'Domaines d’expertise',
      articles: 'Articles',
      articlesText: 'Explorez les articles techniques et analyses du secteur.',
      readArticles: 'Lire les articles',
      workTogether: 'Travaillons ensemble',
      workText: 'Projet en réseaux électriques, énergie renouvelable ou automatisme ? Discutons.',
      contact: 'Me contacter',
      professionalProfile: 'Profil professionnel',
    },
    articles: {
      title: 'ARTICLES',
      description: 'Articles sur énergie, industrie, automatisme.',
      searchPlaceholder: 'Rechercher...',
      categories: 'Catégories :',
      clearFilters: 'Effacer les filtres',
      resultsCount: (count: number) => `${count} article${count > 1 ? 's' : ''}`,
      noResults: 'Aucun article trouvé',
      tryRefining: 'Essayez de modifier vos critères de recherche',
      comingSoon: '// Articles à venir',
      backToArticles: 'Retour aux articles',
      allArticles: 'Tous les articles',
      author: 'Auteur',
      similarArticles: 'Article similaire',
      categoriesList: ['Énergie', 'Industrie', 'Automatisme'],
    },
    contact: {
      title: 'ME CONTACTER',
      subtitle: 'Pour toute préoccupation, n’hésitez pas à me contacter.',
      directContact: 'Contact direct',
      socialNetworks: 'Réseaux sociaux',
      responseTimeTitle: 'Temps de réponse',
      responseTimeText: 'Je réponds généralement sous 24-48h. Pour les urgences, privilégiez WhatsApp.',
      form: {
        title: 'Envoyez un message',
        nameLabel: 'Nom complet',
        namePlaceholder: 'Votre nom',
        emailLabel: 'Adresse email',
        emailPlaceholder: 'nom@mail.com',
        subjectLabel: 'Objectif',
        subjectPlaceholder: 'Collaboration sur un projet',
        messageLabel: 'Message',
        messagePlaceholder: 'Décrivez votre projet ou votre demande...',
        send: 'Envoyer le message',
        sending: 'Envoi en cours...',
        success: '✓ Message envoyé avec succès !',
        error: '✗ Erreur lors de l’envoi',
        validationError: '✗ Veuillez corriger les erreurs avant d’envoyer',
        networkError: '✗ Erreur réseau. Vérifiez votre connexion et réessayez.',
      },
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
      subscribing: 'Inscription...',
      subscribeSuccess: '✓ Inscription confirmée ! Merci de votre intérêt.',
      subscribeError: '✗ Erreur lors de l’inscription',
      validationError: '✗ Veuillez corriger les erreurs',
      networkError: '✗ Erreur réseau. Vérifiez votre connexion.',
    },
    validation: {
      required: (field: string) => `${field} est requis`,
      minLength: (field: string, min: number) => `${field} doit contenir au moins ${min} caractères`,
      invalidEmail: 'Adresse email invalide',
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
      education: 'Education',
      inProgress: 'In progress',
      expertise: 'Areas of expertise',
      articles: 'Articles',
      articlesText: 'Explore technical articles and sector insights.',
      readArticles: 'Read articles',
      workTogether: 'Let’s work together',
      workText: 'Have a power systems, renewable energy or automation project? Let’s talk.',
      contact: 'Contact me',
      professionalProfile: 'Professional profile',
    },
    articles: {
      title: 'ARTICLES',
      description: 'Technical publications by Alain Paluku about energy, industry and automation.',
      searchPlaceholder: 'Search...',
      categories: 'Categories:',
      clearFilters: 'Clear filters',
      resultsCount: (count: number) => `${count} article${count > 1 ? 's' : ''}`,
      noResults: 'No articles found',
      tryRefining: 'Try refining your search criteria',
      comingSoon: '// Articles coming soon',
      backToArticles: 'Back to articles',
      allArticles: 'All articles',
      author: 'Author',
      similarArticles: 'Similar article',
      categoriesList: ['Energy', 'Industry', 'Automation'],
    },
    contact: {
      title: 'CONTACT ME',
      subtitle: 'For any concerns, feel free to contact me.',
      directContact: 'Direct contact',
      socialNetworks: 'Social networks',
      responseTimeTitle: 'Response time',
      responseTimeText: 'I usually respond within 24-48h. For emergencies, use WhatsApp.',
      form: {
        title: 'Send a message',
        nameLabel: 'Full name',
        namePlaceholder: 'Your name',
        emailLabel: 'Email address',
        emailPlaceholder: 'name@mail.com',
        subjectLabel: 'Subject',
        subjectPlaceholder: 'Project collaboration',
        messageLabel: 'Message',
        messagePlaceholder: 'Describe your project or request...',
        send: 'Send message',
        sending: 'Sending...',
        success: '✓ Message sent successfully!',
        error: '✗ Error during sending',
        validationError: '✗ Please correct the errors before sending',
        networkError: '✗ Network error. Check your connection and try again.',
      },
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
      subscribing: 'Subscribing...',
      subscribeSuccess: '✓ Subscription confirmed! Thank you for your interest.',
      subscribeError: '✗ Error during subscription',
      validationError: '✗ Please correct the errors',
      networkError: '✗ Network error. Check your connection.',
    },
    validation: {
      required: (field: string) => `${field} is required`,
      minLength: (field: string, min: number) => `${field} must contain at least ${min} characters`,
      invalidEmail: 'Invalid email address',
    },
  },
} as const;
