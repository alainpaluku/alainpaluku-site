# Configuration Cloudflare Pages avec Astro 6

## 🚀 Configuration dans le Dashboard Cloudflare Pages

### Build Settings
- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Root directory**: (laisser vide)
- **Node version**: `20`

### Environment Variables

Dans **Settings > Environment variables > Production**, ajoutez :

```
RESEND_API_KEY=re_8GryjpRr_412YMhL4c6eKeuU3hdrGNpeW
RESEND_FROM_EMAIL=noreply@alainpaluku.com
RESEND_TO_EMAIL=contact@alainpaluku.com
RESEND_AUDIENCE_ID=858287a8-9ae5-400f-8e9f-25a8332e8796
```

## 📝 Notes importantes

- **Pas besoin de wrangler.toml** : Cloudflare Pages génère automatiquement la configuration
- Le build Astro avec `output: 'server'` génère automatiquement les Functions Cloudflare
- Les variables d'environnement doivent être configurées dans le dashboard Cloudflare

## 🔧 Commandes locales

```bash
# Build
npm run build

# Preview (nécessite wrangler pour tester localement)
npm run preview

# Clean
npm run clean
```

## � Dashboard Cloudflare

https://dash.cloudflare.com/ → Workers & Pages → Votre projet
