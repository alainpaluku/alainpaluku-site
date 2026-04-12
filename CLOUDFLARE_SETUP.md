# 🚀 Guide de Déploiement Cloudflare Pages

## 📋 Variables d'Environnement à Configurer

Voici les variables d'environnement que vous devez ajouter sur Cloudflare Pages :

```bash
RESEND_API_KEY=re_8GryjpRr_412YMhL4c6eKeuU3hdrGNpeW
RESEND_FROM_EMAIL=noreply@alainpaluku.com
RESEND_TO_EMAIL=contact@alainpaluku.com
RESEND_AUDIENCE_ID=858287a8-9ae5-400f-8e9f-25a8332e8796
```

---

## 🔧 Comment Ajouter les Variables d'Environnement sur Cloudflare

### Étape 1 : Accéder à Cloudflare Pages

1. Allez sur : https://dash.cloudflare.com/
2. Connectez-vous avec votre compte Cloudflare
3. Dans le menu de gauche, cliquez sur **"Workers & Pages"**

### Étape 2 : Créer un Nouveau Projet

1. Cliquez sur **"Create application"**
2. Sélectionnez l'onglet **"Pages"**
3. Cliquez sur **"Connect to Git"**

### Étape 3 : Connecter GitHub

1. Cliquez sur **"Connect GitHub"**
2. Autorisez Cloudflare à accéder à votre compte GitHub
3. Sélectionnez le repository : **alainpaluku/alainpaluku-site**
4. Cliquez sur **"Begin setup"**

### Étape 4 : Configuration du Build

Configurez les paramètres suivants :

| Paramètre | Valeur |
|-----------|--------|
| **Project name** | `alainpaluku` (ou le nom de votre choix) |
| **Production branch** | `main` |
| **Framework preset** | `Astro` |
| **Build command** | `bun run build` |
| **Build output directory** | `dist` |

### Étape 5 : Ajouter les Variables d'Environnement

1. Faites défiler jusqu'à la section **"Environment variables"**
2. Cliquez sur **"Add variable"** pour chaque variable :

#### Variable 1 : RESEND_API_KEY
- **Variable name** : `RESEND_API_KEY`
- **Value** : `re_8GryjpRr_412YMhL4c6eKeuU3hdrGNpeW`
- Cliquez sur **"Add variable"**

#### Variable 2 : RESEND_FROM_EMAIL
- **Variable name** : `RESEND_FROM_EMAIL`
- **Value** : `noreply@alainpaluku.com`
- Cliquez sur **"Add variable"**

#### Variable 3 : RESEND_TO_EMAIL
- **Variable name** : `RESEND_TO_EMAIL`
- **Value** : `contact@alainpaluku.com`
- Cliquez sur **"Add variable"**

#### Variable 4 : RESEND_AUDIENCE_ID
- **Variable name** : `RESEND_AUDIENCE_ID`
- **Value** : `858287a8-9ae5-400f-8e9f-25a8332e8796`
- Cliquez sur **"Add variable"**

### Étape 6 : Déployer

1. Une fois toutes les variables ajoutées, cliquez sur **"Save and Deploy"**
2. Cloudflare va :
   - Cloner votre repository
   - Installer les dépendances avec Bun
   - Lancer le build
   - Déployer votre site

### Étape 7 : Vérifier le Déploiement

1. Attendez que le build se termine (environ 2-3 minutes)
2. Une fois terminé, vous verrez un lien vers votre site : `https://alainpaluku.pages.dev`
3. Cliquez sur le lien pour vérifier que tout fonctionne

---

## 🌐 Configuration du Domaine Personnalisé

### Ajouter votre domaine alainpaluku.com

1. Dans votre projet Cloudflare Pages, allez dans l'onglet **"Custom domains"**
2. Cliquez sur **"Set up a custom domain"**
3. Entrez votre domaine : `alainpaluku.com`
4. Cloudflare va vous donner des enregistrements DNS à configurer

### Configuration DNS

Ajoutez ces enregistrements DNS dans votre registrar de domaine :

| Type | Name | Content | Proxy |
|------|------|---------|-------|
| CNAME | @ | alainpaluku.pages.dev | ✅ Proxied |
| CNAME | www | alainpaluku.pages.dev | ✅ Proxied |

**Note** : Si vous avez déjà un enregistrement A pour `@`, supprimez-le avant d'ajouter le CNAME.

---

## 🔄 Déploiements Automatiques

Une fois configuré, chaque fois que vous poussez du code sur la branche `main` :

1. Cloudflare détecte automatiquement le push
2. Lance un nouveau build
3. Déploie la nouvelle version
4. Votre site est mis à jour en 2-3 minutes

---

## 📊 Vérifier les Variables d'Environnement

Pour vérifier que les variables sont bien configurées :

1. Allez dans votre projet Cloudflare Pages
2. Cliquez sur **"Settings"**
3. Allez dans **"Environment variables"**
4. Vous devriez voir vos 4 variables listées

### Modifier une Variable

1. Cliquez sur les **trois points** à côté de la variable
2. Sélectionnez **"Edit"**
3. Modifiez la valeur
4. Cliquez sur **"Save"**
5. **Important** : Vous devez redéployer pour que les changements prennent effet
   - Allez dans **"Deployments"**
   - Cliquez sur **"Retry deployment"** sur le dernier déploiement

---

## 🔒 Sécurité

### Variables Sensibles

- ✅ Les variables d'environnement sont **chiffrées** par Cloudflare
- ✅ Elles ne sont **jamais exposées** dans le code source
- ✅ Elles sont **uniquement accessibles** pendant le build et l'exécution

### Bonnes Pratiques

1. **Ne jamais** commiter le fichier `.env` sur GitHub
2. **Toujours** utiliser `.gitignore` pour exclure `.env`
3. **Régénérer** les clés API si elles sont exposées accidentellement
4. **Utiliser** des clés API différentes pour dev/production

---

## 🐛 Dépannage

### Le build échoue

1. Vérifiez les logs dans l'onglet **"Deployments"**
2. Cliquez sur le déploiement échoué
3. Consultez les logs pour voir l'erreur

### Les variables ne fonctionnent pas

1. Vérifiez que les noms sont **exactement** les mêmes que dans le code
2. Vérifiez qu'il n'y a **pas d'espaces** avant/après les valeurs
3. Redéployez après avoir modifié les variables

### Le site ne se charge pas

1. Vérifiez que le build s'est terminé avec succès
2. Vérifiez les logs de déploiement
3. Testez d'abord avec l'URL `*.pages.dev` avant le domaine personnalisé

---

## 📞 Support

- **Documentation Cloudflare Pages** : https://developers.cloudflare.com/pages/
- **Documentation Astro** : https://docs.astro.build/
- **Support Cloudflare** : https://community.cloudflare.com/

---

## ✅ Checklist de Déploiement

- [ ] Compte Cloudflare créé
- [ ] Repository GitHub connecté
- [ ] Variables d'environnement ajoutées (4 variables)
- [ ] Configuration du build correcte
- [ ] Premier déploiement réussi
- [ ] Site accessible via `*.pages.dev`
- [ ] Domaine personnalisé configuré (optionnel)
- [ ] DNS configuré (si domaine personnalisé)
- [ ] Formulaire de contact testé
- [ ] Newsletter testée

---

**Bon déploiement ! 🚀**
