# 🎯 Type de Déploiement : Cloudflare Pages

## ✅ Votre Projet = Cloudflare Pages

Votre site Astro avec `output: 'server'` doit être déployé sur **Cloudflare Pages**, PAS sur Workers ou Static.

---

## 📊 Comparaison des Options

| Type | Quand l'utiliser | Votre cas |
|------|------------------|-----------|
| **Cloudflare Pages** | Sites Astro avec SSR (Server-Side Rendering) | ✅ **OUI** |
| Cloudflare Workers | Applications serverless pures (API, Workers) | ❌ Non |
| Static | Sites 100% statiques (HTML/CSS/JS uniquement) | ❌ Non |

---

## 🔍 Pourquoi Cloudflare Pages ?

Votre projet utilise :
- ✅ Astro avec `output: 'server'` (SSR)
- ✅ API Routes (`/api/contact.ts`, `/api/newsletter.ts`)
- ✅ Adapter Cloudflare (`@astrojs/cloudflare`)
- ✅ Génération dynamique de pages

**= Cloudflare Pages est le seul choix adapté**

---

## 🚀 Comment Déployer sur Cloudflare Pages

### Étape 1 : Créer un Projet Pages

1. Allez sur : https://dash.cloudflare.com/
2. Dans le menu de gauche : **"Workers & Pages"**
3. Cliquez sur **"Create application"**
4. Sélectionnez l'onglet **"Pages"** (pas Workers !)
5. Cliquez sur **"Connect to Git"**

### Étape 2 : Connecter GitHub

1. Cliquez sur **"Connect GitHub"**
2. Autorisez Cloudflare
3. Sélectionnez le repository : **alainpaluku/alainpaluku-site**
4. Cliquez sur **"Begin setup"**

### Étape 3 : Configuration du Build

| Paramètre | Valeur |
|-----------|--------|
| **Project name** | `alainpaluku` |
| **Production branch** | `main` |
| **Framework preset** | `Astro` |
| **Build command** | `bun run build` |
| **Build output directory** | `dist` |
| **Root directory** | (laisser vide) |

### Étape 4 : Variables d'Environnement

Ajoutez ces 4 variables :

```
RESEND_API_KEY=re_8GryjpRr_412YMhL4c6eKeuU3hdrGNpeW
RESEND_FROM_EMAIL=noreply@alainpaluku.com
RESEND_TO_EMAIL=contact@alainpaluku.com
RESEND_AUDIENCE_ID=858287a8-9ae5-400f-8e9f-25a8332e8796
```

### Étape 5 : Déployer

1. Cliquez sur **"Save and Deploy"**
2. Attendez 2-3 minutes
3. Votre site sera disponible sur `https://alainpaluku.pages.dev`

---

## ⚠️ NE PAS Utiliser

### ❌ Cloudflare Workers

Workers est pour :
- API serverless pures
- Edge functions
- Pas de build HTML/CSS

**Votre projet a besoin de Pages, pas Workers !**

### ❌ Static Site

Static est pour :
- Sites 100% statiques
- Pas de SSR
- Pas d'API routes

**Votre projet utilise SSR et API routes !**

---

## 🎯 Résumé Visuel

```
Votre Projet Astro
        ↓
   output: 'server'
        ↓
   @astrojs/cloudflare
        ↓
   API Routes (/api/*)
        ↓
┌─────────────────────┐
│ Cloudflare Pages    │ ← ✅ UTILISEZ CECI
└─────────────────────┘

❌ Cloudflare Workers (trop limité)
❌ Static Site (pas de SSR)
```

---

## 📝 Checklist de Déploiement

- [ ] Aller sur Cloudflare Dashboard
- [ ] Cliquer sur "Workers & Pages"
- [ ] Créer une application
- [ ] Sélectionner l'onglet **"Pages"** (important !)
- [ ] Connecter GitHub
- [ ] Sélectionner le repository
- [ ] Configurer le build (Astro, bun run build, dist)
- [ ] Ajouter les 4 variables d'environnement
- [ ] Cliquer sur "Save and Deploy"
- [ ] Attendre le déploiement
- [ ] Tester sur `*.pages.dev`

---

## 🔧 Si Vous Avez Déjà Créé un Worker

Si vous avez accidentellement créé un Worker :

1. Supprimez le Worker
2. Recommencez en sélectionnant **"Pages"** (pas Workers)
3. Suivez les étapes ci-dessus

---

## ✅ Vérification Finale

Après le déploiement, vous devriez voir :

```
✅ Build successful
✅ Deployment complete
🌐 https://alainpaluku.pages.dev
```

Testez :
- Page d'accueil : https://alainpaluku.pages.dev/
- Articles : https://alainpaluku.pages.dev/articles/
- Contact : https://alainpaluku.pages.dev/contact/

---

## 🆘 Besoin d'Aide ?

Si vous voyez encore l'erreur "Workers-specific command", c'est que vous êtes dans la mauvaise section. Assurez-vous d'être dans **"Pages"** et non **"Workers"**.

**Bon déploiement ! 🚀**
