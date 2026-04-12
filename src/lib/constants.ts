// Configuration centralisée du site

export const SITE_CONFIG = {
  name: "Alain Paluku",
  title: "Ingénieur Électricien | Développeur Système Embarqué",
  email: "contact@alainpaluku.com",
  phone: "+243 897 023 743",
  whatsapp: "https://wa.me/243897023743",
  avatar: "https://assets.alainpaluku.com/profil/avatar.png",
  currentYear: new Date().getFullYear(),
};

export const SOCIAL_LINKS = [
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/alainpaluku",
    icon: "linkedin",
  },
  {
    name: "GitHub",
    href: "https://github.com/alainpaluku",
    icon: "github",
  },
  {
    name: "Medium",
    href: "https://medium.com/@alainpaluku",
    icon: "medium",
  },
  {
    name: "Hugging Face",
    href: "https://huggingface.co/alainpaluku",
    icon: "huggingface",
  },
];

export const CONTACT_LINKS = [
  {
    href: "https://wa.me/243897023743",
    label: "WhatsApp",
    icon: "whatsapp",
  },
  {
    href: "https://discord.com/users/YOURID",
    label: "Discord",
    icon: "discord",
  },
  {
    href: "mailto:contact@alainpaluku.com",
    label: "Email",
    icon: "email",
  },
];

export const NAV_LINKS = [
  { href: "/", label: "Accueil", isContact: false },
  { href: "/a-propos", label: "À Propos", isContact: false },
  { href: "/articles", label: "Articles", isContact: false },
  { href: "/contact", label: "Contact", isContact: true },
];
