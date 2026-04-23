# 🌐 alainpaluku.com

Site web personnel - Blog technique avec formulaires de contact et newsletter.

## 🚀 Stack

- Astro 5 + Tailwind CSS
- Cloudflare Pages
- Resend API

## 🛠️ Développement

```bash
npm install
npm run dev
```

## 🏗️ Build

```bash
npm run build
```

**Note**: L'erreur `cloudflare:` protocol à la fin du build est normale et n'empêche pas le déploiement.

## 🌐 Déploiement Cloudflare

1. Push sur GitHub
2. Connecter à Cloudflare Pages
3. Build: `npm run build` | Output: `dist`
4. Ajouter les variables d'environnement:
   - `RESEND_API_KEY`
   - `RESEND_FROM_EMAIL`
   - `RESEND_TO_EMAIL`
   - `RESEND_AUDIENCE_ID`

## 📝 Ajouter un Article

Créer `src/content/blog/mon-article.md`:

```yaml
---
title: "Titre"
description: "Description"
date: 2024-03-15
image: "https://images.unsplash.com/..."
category: "Énergie"
author: "Alain Paluku"
---
```

## 📧 Contact

- Email: contact@alainpaluku.com
- WhatsApp: +243 897 023 743

