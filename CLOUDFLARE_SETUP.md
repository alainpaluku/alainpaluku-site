# Configuration Cloudflare Pages

## 🚀 Configuration Build

Dans le dashboard Cloudflare Pages:

### Build Settings
- **Framework preset**: `Astro`
- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Root directory**: (laisser vide)
- **Node version**: `20`

### Environment Variables (Production)

Ajouter ces variables dans **Settings > Environment variables > Production**:

```
RESEND_API_KEY=votre_clé_api
RESEND_FROM_EMAIL=noreply@alainpaluku.com
RESEND_TO_EMAIL=contact@alainpaluku.com
RESEND_AUDIENCE_ID=votre_audience_id
```

## 🔧 Vérifications

### 1. Vérifier le build localement
```bash
npm run build
```

### 2. Vérifier les logs Cloudflare
- Aller dans le dashboard Cloudflare
- Sélectionner votre projet
- Onglet **Deployments**
- Cliquer sur le dernier déploiement
- Voir les logs de build

### 3. Erreurs communes

#### "Build failed"
- Vérifier que Node 20 est utilisé
- Vérifier les variables d'environnement
- Vérifier les logs de build

#### "Site ne charge pas"
- Vérifier que `output: 'server'` est dans astro.config.mjs
- Vérifier que l'adaptateur Cloudflare est installé
- Vérifier les logs de runtime

#### "API routes ne fonctionnent pas"
- Vérifier les variables d'environnement
- Vérifier les logs de la fonction
- Tester avec curl

## 📝 Commandes utiles

```bash
# Build local
npm run build

# Preview local
npm run preview

# Nettoyer
npm run clean
```

## 🔗 Liens utiles

- Dashboard: https://dash.cloudflare.com/
- Logs: Workers & Pages > Votre projet > Deployments
- Variables: Workers & Pages > Votre projet > Settings > Environment variables
