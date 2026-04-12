# 🏗️ Architecture du Code

Documentation technique de l'architecture du site alainpaluku.com

---

## 📐 Vue d'Ensemble

Le site est construit avec **Astro 5** en mode **SSR (Server-Side Rendering)** et déployé sur **Cloudflare Pages**. L'architecture suit une approche modulaire avec séparation claire des responsabilités.

```
┌─────────────────────────────────────────┐
│         Cloudflare Pages Edge           │
│  (Global CDN + Workers Runtime)         │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│         Astro SSR Application           │
│  - Pages rendering                      │
│  - API routes                           │
│  - Content collections                  │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│         External Services               │
│  - Resend (Email API)                   │
│  - Unsplash (Images CDN)                │
└─────────────────────────────────────────┘
```

---

## 📂 Structure Détaillée

### `/src/components/`

Composants Astro réutilisables. Chaque composant est autonome et peut être importé dans n'importe quelle page.

```
components/
├── ArticleCard.astro      # Carte d'article (liste)
├── Button.astro           # Bouton réutilisable
├── Footer.astro           # Pied de page
├── Header.astro           # En-tête + navigation
├── Icon.astro             # Icônes SVG
├── Logo.astro             # Logo du site
├── ResourceIcon.astro     # Icônes de ressources
├── ResourceList.astro     # Liste de ressources
├── ScrollToTop.astro      # Bouton scroll to top
├── SocialLinks.astro      # Liens sociaux
└── ThemeToggle.astro      # Toggle dark/light mode
```

**Conventions** :
- Composants en PascalCase
- Props typées avec TypeScript
- Styles scoped avec Tailwind

### `/src/content/`

Collections de contenu gérées par Astro Content Collections.

```
content/
├── blog/              # Articles Markdown
│   └── *.md          # Un fichier = un article
└── config.ts         # Schéma de validation Zod
```

**Schéma d'article** (`config.ts`) :
```typescript
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().min(10),
    description: z.string().min(100).max(160),
    date: z.date(),
    image: z.string().url(),
    images: z.array(z.string().url()).min(2),
    category: z.enum(['Énergie', 'Industrie', 'Automatisme']),
    draft: z.boolean().default(false),
    author: z.string(),
    authorImage: z.string().url(),
    resources: z.array(resourceSchema).optional(),
  }),
});
```

### `/src/layouts/`

Layouts de page pour structure HTML commune.

```
layouts/
└── BaseLayout.astro   # Layout principal (HTML, head, body)
```

**BaseLayout** inclut :
- Meta tags SEO
- Open Graph / Twitter Cards
- Schema.org structured data
- Scripts globaux
- Styles globaux

### `/src/lib/`

Utilitaires et fonctions réutilisables.

```
lib/
├── api-utils.ts           # Helpers API (validation, erreurs)
├── client-utils.ts        # Utilitaires client-side
├── constants.ts           # Constantes globales
├── date-utils.ts          # Formatage dates
├── email-templates.ts     # Templates emails HTML
├── filter-utils.ts        # Filtres articles
├── form-validation-ui.ts  # Validation formulaires
├── logger.ts              # Logger personnalisé
├── resend-client.ts       # Client Resend API
├── types.ts               # Types TypeScript
└── validation.ts          # Schémas de validation
```

**Exemple** : `resend-client.ts`
```typescript
import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export async function sendContactEmail(data: ContactFormData) {
  return await resend.emails.send({
    from: import.meta.env.RESEND_FROM_EMAIL,
    to: import.meta.env.RESEND_TO_EMAIL,
    subject: `[Contact] ${data.subject}`,
    html: generateContactEmailHTML(data),
  });
}
```

### `/src/pages/`

Pages du site et API routes.

```
pages/
├── api/
│   ├── contact.ts         # POST /api/contact
│   └── newsletter.ts      # POST /api/newsletter
├── articles/
│   ├── [...slug].astro    # Page article dynamique
│   └── index.astro        # Liste des articles
├── a-propos.astro         # Page à propos
├── contact.astro          # Page contact
├── index.astro            # Page d'accueil
├── manifest.json.ts       # PWA manifest
├── rss.xml.ts             # Flux RSS
├── sitemap-images.xml.ts  # Sitemap images
├── sitemap-index.xml.ts   # Sitemap index
└── sitemap-svg.xml.ts     # Sitemap SVG
```

**API Routes** :
- Endpoints serverless sur Cloudflare Workers
- Validation avec Zod
- Gestion d'erreurs standardisée
- Rate limiting (via Cloudflare)

### `/src/scripts/`

Scripts client-side (exécutés dans le navigateur).

```
scripts/
├── code-blocks.ts         # Amélioration blocs de code
└── table-responsive.ts    # Tables responsive
```

**Exemple** : `code-blocks.ts`
```typescript
export function enhanceCodeBlocks() {
  document.querySelectorAll('pre').forEach((pre) => {
    // Ajouter bouton copier
    const button = document.createElement('button');
    button.textContent = 'Copier';
    button.onclick = () => {
      navigator.clipboard.writeText(pre.textContent || '');
    };
    pre.appendChild(button);
  });
}
```

### `/src/styles/`

Styles globaux CSS.

```
styles/
└── global.css    # Styles globaux + Tailwind
```

**Contenu** :
- Imports Tailwind (`@tailwind base/components/utilities`)
- Variables CSS custom
- Styles prose (articles)
- Animations

---

## 🔄 Flux de Données

### 1. Rendu de Page

```
User Request
    ↓
Cloudflare Edge
    ↓
Astro SSR (Cloudflare Workers)
    ↓
Fetch Content Collections
    ↓
Render Components
    ↓
Generate HTML
    ↓
Return to User (cached)
```

### 2. Soumission Formulaire

```
User Submit Form
    ↓
Client-side Validation
    ↓
POST /api/contact
    ↓
Server-side Validation (Zod)
    ↓
Resend API Call
    ↓
Send Email
    ↓
Return Success/Error
    ↓
Update UI
```

### 3. Newsletter

```
User Enter Email
    ↓
POST /api/newsletter
    ↓
Validate Email
    ↓
Resend API (Add to Audience)
    ↓
Send Welcome Email
    ↓
Return Success
```

---

## 🎨 Système de Design

### Tailwind Configuration

```javascript
// tailwind.config.mjs
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2FA4DE',
        secondary: '#343b58',
        // ...
      },
    },
  },
};
```

### Composants Réutilisables

Tous les composants utilisent Tailwind avec classes utilitaires :
- Pas de CSS custom par composant
- Responsive par défaut (`sm:`, `md:`, `lg:`)
- Dark mode supporté (`dark:`)

---

## 🔐 Sécurité

### Variables d'Environnement

```typescript
// Accès sécurisé aux env vars
const apiKey = import.meta.env.RESEND_API_KEY;

// Validation au démarrage
if (!apiKey) {
  throw new Error('RESEND_API_KEY is required');
}
```

### Validation des Entrées

Toutes les entrées utilisateur sont validées avec **Zod** :

```typescript
const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  subject: z.string().min(5).max(200),
  message: z.string().min(10).max(2000),
});
```

### Headers de Sécurité

Configurés dans `public/_headers` :
- Content-Security-Policy
- X-Frame-Options
- X-Content-Type-Options
- Referrer-Policy

---

## 📊 SEO & Performance

### Sitemaps

Génération automatique de 4 sitemaps :

1. **sitemap-0.xml** : Toutes les pages
2. **sitemap-images.xml** : Toutes les images des articles
3. **sitemap-svg.xml** : Schémas techniques SVG
4. **sitemap-index.xml** : Point d'entrée unique

### RSS Feed

Flux RSS complet avec tous les articles :
- Titre, description, date
- Image principale
- Lien vers l'article
- Catégorie

### Cache Strategy

```
# public/_headers
/articles/*
  Cache-Control: public, max-age=7200, s-maxage=14400

/assets/*
  Cache-Control: public, max-age=31536000, immutable
```

---

## 🧪 Tests & Validation

### Validation TypeScript

```bash
# Vérifier les types
bun run astro check
```

### Build Validation

```bash
# Build local
bun run build

# Preview
bun run preview
```

### Diagnostics

```bash
# Vérifier les sitemaps
curl http://localhost:3000/sitemap-index.xml

# Vérifier le RSS
curl http://localhost:3000/rss.xml
```

---

## 🚀 Déploiement

### Build Process

```
1. git push
2. Cloudflare détecte le push
3. Clone repository
4. npm install
5. npm run build
6. Deploy to edge
7. Invalidate cache
8. Site live
```

### Environnements

- **Production** : `main` branch → `alainpaluku.com`
- **Preview** : Autres branches → `*.pages.dev`

---

## 📚 Ressources

- [Astro Docs](https://docs.astro.build/)
- [Cloudflare Pages](https://developers.cloudflare.com/pages/)
- [Resend API](https://resend.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

## 🔄 Évolutions Futures

- [ ] Système de commentaires
- [ ] Recherche full-text
- [ ] Analytics (Cloudflare Web Analytics)
- [ ] PWA complète
- [ ] Mode offline
- [ ] Internationalisation (i18n)

---

**Dernière mise à jour** : 2024-04-12
