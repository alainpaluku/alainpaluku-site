# 🌐 alainpaluku.com

Site web personnel d'Alain Paluku, ingénieur électricien spécialisé en développement de systèmes embarqués.

[![Astro](https://img.shields.io/badge/Astro-5.0-FF5D01?logo=astro)](https://astro.build)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com)
[![Cloudflare](https://img.shields.io/badge/Cloudflare-Pages-F38020?logo=cloudflare)](https://pages.cloudflare.com)

---

## 📖 Description

Site portfolio avec blog technique, formulaire de contact et newsletter. Construit avec Astro 5 en mode SSR (Server-Side Rendering) et déployé sur Cloudflare Pages.

**Fonctionnalités** :
- 📝 Blog technique avec articles Markdown
- 📧 Formulaire de contact (Resend API)
- 📬 Newsletter (Resend API)
- 🎨 Design responsive avec Tailwind CSS
- 🔍 SEO optimisé (sitemaps, RSS, Open Graph)
- ⚡ Performance optimale (Cloudflare Edge)

---

## 🚀 Démarrage Rapide

### Prérequis

- [Bun](https://bun.sh/) (recommandé) ou Node.js 20+
- Compte [Resend](https://resend.com/) pour les emails
- Compte [Cloudflare](https://cloudflare.com/) pour le déploiement

### Installation

```bash
# Cloner le repository
git clone https://github.com/alainpaluku/alainpaluku-site.git
cd alainpaluku-site

# Installer les dépendances
bun install

# Créer le fichier .env
cp .env.example .env
# Puis éditer .env avec vos clés API
```

### Configuration `.env`

```bash
RESEND_API_KEY=your_resend_api_key
RESEND_FROM_EMAIL=noreply@yourdomain.com
RESEND_TO_EMAIL=contact@yourdomain.com
RESEND_AUDIENCE_ID=your_audience_id
```

### Développement

```bash
# Lancer le serveur de développement
bun run dev

# Le site sera accessible sur http://localhost:3000
```

### Build

```bash
# Build pour production
bun run build

# Preview du build
bun run preview
```

---

## 🌍 Déploiement sur Cloudflare Pages

### 1. Créer un Projet Pages

1. Allez sur https://dash.cloudflare.com/
2. **Workers & Pages** > **Create application**
3. Sélectionnez l'onglet **"Pages"**
4. **Connect to Git** > Sélectionnez votre repository

### 2. Configuration Build

| Paramètre | Valeur |
|-----------|--------|
| **Framework preset** | `Astro` |
| **Build command** | `npm run build` |
| **Build output directory** | `dist` |
| **Root directory** | (laisser vide) |

### 3. Variables d'Environnement

Dans **Settings** > **Environment variables**, ajoutez :

```
RESEND_API_KEY=your_key
RESEND_FROM_EMAIL=noreply@yourdomain.com
RESEND_TO_EMAIL=contact@yourdomain.com
RESEND_AUDIENCE_ID=your_audience_id
```

### 4. Déployer

Cliquez sur **"Save and Deploy"**. Le site sera disponible sur `https://your-project.pages.dev`

### 5. Domaine Personnalisé (Optionnel)

1. **Custom domains** > **Set up a custom domain**
2. Ajoutez votre domaine
3. Configurez les DNS selon les instructions Cloudflare

---

## 🛠️ Technologies

| Technologie | Usage |
|-------------|-------|
| **Astro 5** | Framework SSR |
| **TypeScript** | Type safety |
| **Tailwind CSS** | Styling |
| **Cloudflare Pages** | Hébergement + Edge |
| **Resend** | Service email |
| **KaTeX** | Formules mathématiques |

---

## 📁 Structure du Projet

```
alainpaluku-site/
├── src/
│   ├── components/       # Composants Astro réutilisables
│   ├── content/
│   │   └── blog/        # Articles Markdown
│   ├── layouts/         # Layouts de page
│   ├── lib/             # Utilitaires TypeScript
│   ├── pages/
│   │   ├── api/         # API endpoints (contact, newsletter)
│   │   ├── articles/    # Pages articles
│   │   └── *.astro      # Pages du site
│   ├── scripts/         # Scripts client
│   └── styles/          # CSS global
├── public/              # Assets statiques
├── .env                 # Variables d'environnement (local)
├── astro.config.mjs     # Configuration Astro
└── package.json         # Dépendances
```

Voir [ARCHITECTURE.md](./ARCHITECTURE.md) pour plus de détails.

---

## 📝 Ajouter un Article

1. Créer un fichier dans `src/content/blog/mon-article.md`
2. Ajouter le frontmatter :

```yaml
---
title: "Titre de l'article"
description: "Description 100-160 caractères"
date: 2024-03-15
image: "https://images.unsplash.com/photo-xxx"
images: 
  - "https://images.unsplash.com/photo-xxx"
  - "https://images.unsplash.com/photo-yyy"
category: "Énergie" # ou "Industrie" ou "Automatisme"
draft: false
author: "Alain Paluku"
authorImage: "https://assets.alainpaluku.com/profil/avatar.png"
---
```

3. Rédiger le contenu en Markdown
4. Commit et push → Déploiement automatique

---

## 🔧 Scripts Disponibles

```bash
bun run dev      # Serveur de développement
bun run build    # Build production
bun run preview  # Preview du build
```

---

## 📊 SEO & Performance

- ✅ Sitemaps automatiques (pages, images)
- ✅ Flux RSS complet
- ✅ Open Graph + Twitter Cards
- ✅ Schema.org structured data
- ✅ Cache edge Cloudflare
- ✅ Compression Brotli
- ✅ HTTP/3 activé
- ✅ Images lazy-loaded

---

## 🤝 Contact

- **Email** : contact@alainpaluku.com
- **Site** : https://alainpaluku.com
- **GitHub** : https://github.com/alainpaluku

---

## 📄 Licence

Tous droits réservés © 2024 Alain Paluku
