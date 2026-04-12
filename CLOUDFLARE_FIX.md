# 🔧 Correction Configuration Cloudflare Pages

## ❌ Erreur Rencontrée

```
✘ [ERROR] It looks like you've run a Workers-specific command in a Pages project.
For Pages, please run `wrangler pages deploy` instead.
```

## ✅ Solution

### Sur Cloudflare Pages Dashboard

1. Allez dans votre projet : https://dash.cloudflare.com/
2. Cliquez sur **"Workers & Pages"**
3. Sélectionnez votre projet **"alainpaluku"**
4. Allez dans **"Settings"** > **"Builds & deployments"**

### Configuration Correcte

| Paramètre | Valeur |
|-----------|--------|
| **Framework preset** | `Astro` |
| **Build command** | `bun run build` |
| **Build output directory** | `dist` |
| **Root directory** | `/` (laisser vide) |

### ⚠️ IMPORTANT : Supprimer la Commande de Déploiement

Dans la section **"Build configuration"** :

1. Cherchez **"Deploy command"** ou **"Custom deploy command"**
2. **Supprimez** toute commande comme `npx wrangler deploy`
3. **Laissez ce champ VIDE**

Cloudflare Pages gère automatiquement le déploiement après le build. Vous n'avez pas besoin de commande de déploiement personnalisée.

---

## 🔄 Redéployer

Après avoir corrigé la configuration :

1. Allez dans **"Deployments"**
2. Cliquez sur **"Retry deployment"** sur le dernier déploiement échoué
3. Ou faites un nouveau commit pour déclencher un nouveau déploiement

---

## 📝 Configuration Complète Recommandée

### Build Settings

```
Framework preset: Astro
Build command: bun run build
Build output directory: dist
Root directory: (leave empty)
```

### Environment Variables

```
RESEND_API_KEY=re_8GryjpRr_412YMhL4c6eKeuU3hdrGNpeW
RESEND_FROM_EMAIL=noreply@alainpaluku.com
RESEND_TO_EMAIL=contact@alainpaluku.com
RESEND_AUDIENCE_ID=858287a8-9ae5-400f-8e9f-25a8332e8796
```

### Build Configuration

- ✅ Node version: 20 (automatique)
- ✅ Bun: Détecté automatiquement via `bun.lock`
- ❌ Deploy command: **VIDE** (ne rien mettre)

---

## 🎯 Différence Workers vs Pages

### Cloudflare Workers
- Utilise `wrangler deploy`
- Pour des applications serverless pures
- Configuration dans `wrangler.toml`

### Cloudflare Pages (VOTRE CAS)
- Déploiement automatique après build
- Pour des sites statiques + SSR
- Pas besoin de commande de déploiement
- Configuration dans le dashboard

---

## ✅ Vérification

Après le déploiement réussi, vous devriez voir :

```
✅ Build command completed
✅ Deploying to Cloudflare Pages
✅ Deployment complete
🌐 https://alainpaluku.pages.dev
```

---

## 🆘 Si le Problème Persiste

1. **Vérifiez qu'il n'y a pas de fichier `.github/workflows/`** qui pourrait contenir une commande de déploiement
2. **Supprimez le fichier `wrangler.jsonc`** (optionnel pour Pages)
3. **Contactez le support Cloudflare** si l'erreur persiste

---

**Note** : Le fichier `wrangler.jsonc` est optionnel pour Cloudflare Pages. Il est principalement utilisé pour Cloudflare Workers. Pour Pages, toute la configuration se fait via le dashboard.
