# 📚 Documentation Complète - alainpaluku.com

## 📖 Table des Matières

1. [Vue d'Ensemble](#vue-densemble)
2. [Architecture SEO](#architecture-seo)
3. [Guide de Rédaction](#guide-de-rédaction)
4. [Déploiement Cloudflare](#déploiement-cloudflare)
5. [Checklist SEO](#checklist-seo)

---

## Vue d'Ensemble

Site web personnel d'Alain Paluku, ingénieur électricien spécialisé en systèmes embarqués.

**Technologies**: Astro 5, Tailwind CSS, TypeScript, Cloudflare Pages  
**URL**: https://alainpaluku.com

---

## Architecture SEO

### Système Multi-Sitemap

Le site utilise 4 sitemaps pour un référencement optimal:

#### 1. Sitemap Principal (`/sitemap-0.xml`)
- Généré automatiquement par `@astrojs/sitemap`
- Toutes les pages du site avec priorités
- Mise à jour automatique à chaque build

#### 2. Sitemap Images (`/sitemap-images.xml`)
- **Objectif**: Référencer TOUTES les images de TOUS les articles
- **Contenu**: Image principale + images secondaires
- **Format**: Google Image Sitemap avec métadonnées
- **Automatique**: Oui, extrait du frontmatter

#### 3. Sitemap SVG (`/sitemap-svg.xml`)
- **Objectif**: Référencement spécifique des schémas techniques
- **Contenu**: Uniquement les fichiers `.svg`
- **Métadonnées**: Géolocalisation, licence, catégorie
- **Automatique**: Oui, filtre les SVG des articles

#### 4. Sitemap Index (`/sitemap-index.xml`)
- **Objectif**: Point d'entrée unique pour les moteurs de recherche
- **Contenu**: Regroupe tous les sitemaps
- **Soumission**: URL unique à soumettre à Google/Bing

### Workflow Automatique

```
Nouvel Article (frontmatter complet)
         ↓
    bun run build
         ↓
┌────────────────────────────┐
│  Génération Automatique:   │
│  • sitemap-0.xml           │
│  • sitemap-images.xml      │
│  • sitemap-svg.xml         │
│  • rss.xml                 │
└────────────────────────────┘
         ↓
  Deploy Cloudflare Pages
         ↓
  Indexation Google/Bing
```

### Déclaration robots.txt

```txt
Sitemap: https://alainpaluku.com/sitemap-index.xml
Sitemap: https://alainpaluku.com/sitemap-images.xml
Sitemap: https://alainpaluku.com/sitemap-svg.xml
Sitemap: https://alainpaluku.com/rss.xml
```

---

## Guide de Rédaction

### Structure Obligatoire

Chaque article DOIT contenir:

```yaml
---
title: "Titre de l'article (min 10 caractères)"
description: "Description 100-160 caractères pour SEO"
date: 2024-03-15
image: "https://images.unsplash.com/photo-xxx" # Image principale 1200x630px
images: # Minimum 2 images secondaires
  - "https://images.unsplash.com/photo-xxx"
  - "https://images.unsplash.com/photo-yyy"
  - "https://alainpaluku.com/svg/schema.svg" # SVG optionnel
category: "Énergie" # ou "Industrie" ou "Automatisme"
draft: false # true pour brouillon
author: "Alain Paluku"
authorImage: "https://assets.alainpaluku.com/profil/avatar.png"
---
```

### Contenu Obligatoire

1. **Tableaux de données** (au moins 1)
2. **Extraits de code** (au moins 1)
3. **Formules mathématiques** (au moins 1, avec KaTeX)

### Exemple Complet

Voir: `src/content/blog/protocole-modbus-rtu.md`

### Validation

Le schéma Zod dans `src/content/config.ts` valide automatiquement:
- Titre: min 10 caractères
- Description: 100-160 caractères
- Images: min 2 secondaires
- Catégorie: enum strict

---

## Déploiement Cloudflare

### Configuration Build

**Dashboard Cloudflare Pages**:
```bash
Build command: bun run build
Build output: dist
Node version: 20
```

### Variables d'Environnement

```bash
NODE_VERSION=20
BUN_VERSION=latest
RESEND_API_KEY=<votre_clé>
RESEND_FROM_EMAIL=noreply@alainpaluku.com
```

### Cache Strategy

| Ressource | Browser Cache | Edge Cache |
|-----------|---------------|------------|
| Page d'accueil | 30 min | 1h |
| Articles | 2h | 4h |
| Images | 30 jours | 30 jours |
| SVG | 30 jours | 30 jours |
| Assets JS/CSS | 1 an | 1 an |
| API | no-cache | no-cache |

**Fichier**: `public/_headers`

### Optimisations Cloudflare

- ✅ Compression Brotli automatique
- ✅ HTTP/3 activé
- ✅ Edge caching avec `s-maxage`
- ✅ `stale-while-revalidate` pour disponibilité
- ✅ Minification HTML/CSS/JS

---

## Checklist SEO

### Avant Publication

- [ ] Frontmatter complet et validé
- [ ] Minimum 2 images secondaires
- [ ] Image principale 1200x630px
- [ ] Description 100-160 caractères
- [ ] Catégorie valide (Énergie/Industrie/Automatisme)
- [ ] `draft: false`
- [ ] Author et authorImage définis
- [ ] Contenu: tableaux + code + formules
- [ ] Build local réussi: `bun run build`

### Après Publication

- [ ] Vérifier `/sitemap-images.xml` (toutes les images présentes)
- [ ] Vérifier `/sitemap-svg.xml` (si SVG utilisés)
- [ ] Soumettre à Google Search Console
- [ ] Soumettre à Bing Webmaster Tools
- [ ] Vérifier indexation après 24-48h

### Google Search Console

1. **Soumettre le sitemap index**:
   ```
   https://alainpaluku.com/sitemap-index.xml
   ```

2. **Vérifier**:
   - Couverture des pages
   - Performances des images
   - Erreurs d'exploration
   - Core Web Vitals

3. **Demander indexation** (optionnel):
   - URL de l'article
   - Accélère l'indexation (24h au lieu de 48-72h)

### Bing Webmaster Tools

- Soumettre le même sitemap index
- Activer l'indexation automatique
- Vérifier les performances

---

## Commandes Utiles

```bash
# Développement
bun run dev              # Serveur local sur :3000

# Build
bun run build            # Build production

# Preview
bun run preview          # Prévisualiser le build

# Vérifier les sitemaps localement
curl http://localhost:3000/sitemap-index.xml
curl http://localhost:3000/sitemap-images.xml
curl http://localhost:3000/sitemap-svg.xml
curl http://localhost:3000/rss.xml
```

---

## Structure du Projet

```
alainpaluku/
├── src/
│   ├── components/       # Composants Astro réutilisables
│   ├── content/
│   │   └── blog/        # Articles Markdown
│   ├── layouts/         # Layouts de page
│   ├── lib/             # Utilitaires TypeScript
│   ├── pages/
│   │   ├── api/         # API endpoints (contact, newsletter)
│   │   ├── articles/    # Pages articles
│   │   ├── sitemap-*.xml.ts  # Sitemaps
│   │   └── rss.xml.ts   # Flux RSS
│   ├── scripts/         # Scripts client
│   └── styles/          # CSS global
├── public/
│   ├── _headers         # Headers HTTP Cloudflare
│   ├── _redirects       # Redirections
│   ├── robots.txt       # Configuration robots
│   └── logo.svg         # Logo du site
├── astro.config.mjs     # Configuration Astro
├── wrangler.jsonc       # Configuration Cloudflare
└── package.json         # Dépendances
```

---

## Ressources

### Documentation Officielle
- [Astro](https://docs.astro.build)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Cloudflare Pages](https://developers.cloudflare.com/pages)

### SEO & Sitemaps
- [Google Image Sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/image-sitemaps)
- [Sitemap Protocol](https://www.sitemaps.org/protocol.html)
- [Google Search Console](https://search.google.com/search-console)
- [Bing Webmaster Tools](https://www.bing.com/webmasters)

### Outils
- [KaTeX](https://katex.org/docs/supported.html) - Formules mathématiques
- [Resend](https://resend.com/docs) - Service email
- [Unsplash](https://unsplash.com) - Images gratuites

---

## Support

Pour toute question:
- Consulter les exemples dans `src/content/blog/`
- Voir `ARCHITECTURE_SEO.md` pour détails techniques
- Utiliser le workflow GitHub `.github/workflows/create-article.yml`

**Bon courage! 🚀**
