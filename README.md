# 🌐 alainpaluku.com

Site web personnel d'Alain Paluku, ingénieur électricien spécialisé en développement de systèmes embarqués.

[![Astro](https://img.shields.io/badge/Astro-5.0-FF5D01?logo=astro)](https://astro.build)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com)
[![Cloudflare](https://img.shields.io/badge/Cloudflare-Pages-F38020?logo=cloudflare)](https://pages.cloudflare.com)

---

## 🚀 Démarrage Rapide

```bash
# Installation
bun install

# Développement
bun run dev

# Build production
bun run build

# Preview
bun run preview
```

---

## 📚 Documentation

- **[DOCUMENTATION.md](./DOCUMENTATION.md)** - Guide complet (SEO, déploiement, checklist)
- **[ARCHITECTURE_SEO.md](./ARCHITECTURE_SEO.md)** - Architecture détaillée des sitemaps
- **[GUIDE_REDACTION_ARTICLES.md](./GUIDE_REDACTION_ARTICLES.md)** - Guide de rédaction d'articles
- **[STRUCTURE_ARTICLES.md](./STRUCTURE_ARTICLES.md)** - Référence rapide structure

---

## 🏗️ Architecture SEO Automatique

Le site génère automatiquement 4 sitemaps pour un référencement optimal:

1. **Sitemap Principal** (`/sitemap-0.xml`) - Toutes les pages
2. **Sitemap Images** (`/sitemap-images.xml`) - Toutes les images des articles
3. **Sitemap SVG** (`/sitemap-svg.xml`) - Schémas techniques SVG
4. **Sitemap Index** (`/sitemap-index.xml`) - Point d'entrée unique

### Workflow Automatique

```
Créer article → bun run build → Deploy → Indexation automatique
```

Chaque nouvel article avec frontmatter complet est automatiquement:
- ✅ Ajouté au sitemap principal
- ✅ Toutes ses images référencées dans sitemap-images.xml
- ✅ Ses SVG référencés dans sitemap-svg.xml
- ✅ Ajouté au flux RSS

**Aucune action manuelle requise!**

---

## 📝 Créer un Article

### Structure Obligatoire

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

### Contenu Requis

- Minimum 2 images secondaires
- Au moins 1 tableau de données
- Au moins 1 extrait de code
- Au moins 1 formule mathématique (KaTeX)

Voir `GUIDE_REDACTION_ARTICLES.md` pour le guide complet.

---

## 🛠️ Technologies

| Technologie | Usage |
|-------------|-------|
| Astro 5 | Framework SSR |
| Tailwind CSS | Styling |
| TypeScript | Type safety |
| Cloudflare Pages | Hébergement |
| Resend | Service email |
| KaTeX | Formules mathématiques |

---

## 📊 Optimisations

- ✅ Sitemaps multiples pour SEO optimal
- ✅ Cache edge Cloudflare (30j images, 1an assets)
- ✅ Compression Brotli automatique
- ✅ HTTP/3 activé
- ✅ Images lazy-loaded
- ✅ Code splitting
- ✅ Headers de sécurité (CSP, X-Frame-Options)
- ✅ Open Graph + Twitter Cards
- ✅ Schema.org structured data
- ✅ RSS feed complet

---

## 🌍 Déploiement Cloudflare

### Configuration

```bash
Build command: bun run build
Build output: dist
Node version: 20
```

### Variables d'Environnement

```bash
RESEND_API_KEY=<votre_clé>
RESEND_FROM_EMAIL=noreply@alainpaluku.com
```

Voir `DOCUMENTATION.md` pour les détails complets.

---

## 📈 SEO & Indexation

### Soumettre à Google Search Console

```
https://alainpaluku.com/sitemap-index.xml
```

### Vérifier les Sitemaps

```bash
curl https://alainpaluku.com/sitemap-index.xml
curl https://alainpaluku.com/sitemap-images.xml
curl https://alainpaluku.com/sitemap-svg.xml
```

---

## 📁 Structure

```
src/
├── components/       # Composants Astro
├── content/blog/     # Articles Markdown
├── layouts/          # Layouts
├── lib/              # Utilitaires
├── pages/
│   ├── api/          # API endpoints
│   ├── articles/     # Pages articles
│   └── sitemap-*.xml.ts  # Sitemaps
└── styles/           # CSS global
```

---

## 🤝 Contact

- **Email**: contact@alainpaluku.com
- **Site**: https://alainpaluku.com

---

**Licence**: Tous droits réservés © 2024 Alain Paluku
