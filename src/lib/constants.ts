// Configuration centralisée du site
import { getLocalizedPath, type Locale, ui } from './i18n';

export const SITE_CONFIG = {
  name: 'Alain Paluku',
  title: 'Ingénieur Électricien | Développeur Système Embarqué',
  email: 'contact@alainpaluku.com',
  phone: '+243 897 023 743',
  whatsapp: 'https://wa.me/243897023743',
  avatar: '/logo.png',
  currentYear: new Date().getFullYear(),
};

export const SOCIAL_LINKS = [
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/alainpaluku',
    icon: 'linkedin',
  },
  {
    name: 'GitHub',
    href: 'https://github.com/alainpaluku',
    icon: 'github',
  },
  {
    name: 'Medium',
    href: 'https://medium.com/@alainpaluku',
    icon: 'medium',
  },
  {
    name: 'Hugging Face',
    href: 'https://huggingface.co/alainpaluku',
    icon: 'huggingface',
  },
];

export const CONTACT_LINKS = [
  {
    href: 'https://wa.me/243897023743',
    label: 'WhatsApp',
    icon: 'whatsapp',
  },
  {
    href: 'mailto:contact@alainpaluku.com',
    label: 'Email',
    icon: 'email',
  },
];

export const getNavLinks = (locale: Locale = 'fr') => [
  { href: getLocalizedPath('home', locale), label: ui[locale].nav.home, isContact: false },
  { href: getLocalizedPath('about', locale), label: ui[locale].nav.about, isContact: false },
  { href: getLocalizedPath('articles', locale), label: ui[locale].nav.articles, isContact: false },
  { href: getLocalizedPath('contact', locale), label: ui[locale].nav.contact, isContact: true },
];

export const NAV_LINKS = getNavLinks('fr');
