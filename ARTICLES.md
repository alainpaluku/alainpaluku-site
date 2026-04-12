# 📝 Guide de Rédaction des Articles

Guide complet pour créer et publier des articles sur alainpaluku.com

---

## 📋 Structure d'un Article

Chaque article est un fichier Markdown (`.md`) dans `src/content/blog/`

### Frontmatter Obligatoire

```yaml
---
title: "Titre de l'article"
description: "Description SEO entre 100 et 160 caractères pour le référencement Google"
date: 2024-03-15
image: "https://images.unsplash.com/photo-xxxxx?w=1200"
images: 
  - "https://images.unsplash.com/photo-xxxxx?w=1200"
  - "https://images.unsplash.com/photo-yyyyy?w=1200"
category: "Énergie"
draft: false
author: "Alain Paluku"
authorImage: "https://assets.alainpaluku.com/profil/avatar.png"
---
```

### Champs Requis

| Champ | Type | Description | Validation |
|-------|------|-------------|------------|
| `title` | string | Titre de l'article | Min 10 caractères |
| `description` | string | Description SEO | 100-160 caractères |
| `date` | date | Date de publication | Format YYYY-MM-DD |
| `image` | string | Image principale | URL valide |
| `images` | array | Images secondaires | Min 2 URLs |
| `category` | enum | Catégorie | Énergie, Industrie, ou Automatisme |
| `draft` | boolean | Brouillon ou publié | true = brouillon |
| `author` | string | Nom de l'auteur | Requis |
| `authorImage` | string | Photo de l'auteur | URL valide |

### Champs Optionnels

```yaml
resources:
  - title: "Code source GitHub"
    url: "https://github.com/user/repo"
    type: "code"
  - title: "Documentation officielle"
    url: "https://example.com/docs"
    type: "documentation"
  - title: "Datasheet composant"
    url: "https://example.com/datasheet.pdf"
    type: "materiel"
```

---

## ✍️ Rédaction du Contenu

### Structure Recommandée

```markdown
## Introduction

Contexte et problématique...

## Développement

### Sous-section 1

Contenu technique...

### Sous-section 2

Explications détaillées...

## Conclusion

Synthèse et perspectives...
```

### Éléments à Inclure

1. **Tableaux** (au moins 1)
2. **Code** (au moins 1 bloc)
3. **Formules mathématiques** (au moins 1)
4. **Images** (minimum 2)

---

## 📊 Tableaux

### Syntaxe Markdown

```markdown
| Paramètre | Valeur | Unité |
|-----------|--------|-------|
| Tension   | 230    | V     |
| Courant   | 10     | A     |
| Puissance | 2300   | W     |
```

### Alignement

```markdown
| Gauche | Centre | Droite |
|:-------|:------:|-------:|
| Texte  | Texte  | 100    |
```

---

## 💻 Blocs de Code

### Python

```markdown
\`\`\`python
def calculate_power(voltage, current):
    """Calcul de la puissance électrique"""
    return voltage * current

# Exemple
P = calculate_power(230, 10)
print(f"Puissance: {P} W")
\`\`\`
```

### C/C++ (Arduino/ESP32)

```markdown
\`\`\`cpp
#include <Arduino.h>

void setup() {
  Serial.begin(115200);
  pinMode(LED_BUILTIN, OUTPUT);
}

void loop() {
  digitalWrite(LED_BUILTIN, HIGH);
  delay(1000);
  digitalWrite(LED_BUILTIN, LOW);
  delay(1000);
}
\`\`\`
```

### JavaScript/TypeScript

```markdown
\`\`\`typescript
interface SensorData {
  temperature: number;
  humidity: number;
}

async function readSensor(): Promise<SensorData> {
  const response = await fetch('/api/sensor');
  return response.json();
}
\`\`\`
```

---

## 🔢 Formules Mathématiques

### Formules Inline

```markdown
La loi d'Ohm s'écrit $V = R \times I$ où $V$ est la tension.
```

Rendu : La loi d'Ohm s'écrit $V = R \times I$ où $V$ est la tension.

### Équations Block

```markdown
$
P = V \times I = R \times I^2 = \frac{V^2}{R}
$
```

Rendu :
$$
P = V \times I = R \times I^2 = \frac{V^2}{R}
$$

### Systèmes d'Équations

```markdown
$
\begin{cases}
V = R \times I \\
P = V \times I \\
E = P \times t
\end{cases}
$
```

### Symboles Courants

| Symbole | Code | Rendu |
|---------|------|-------|
| Multiplication | `\times` | $\times$ |
| Division | `\div` | $\div$ |
| Fraction | `\frac{a}{b}` | $\frac{a}{b}$ |
| Puissance | `x^2` | $x^2$ |
| Indice | `x_i` | $x_i$ |
| Racine | `\sqrt{x}` | $\sqrt{x}$ |
| Somme | `\sum_{i=1}^{n}` | $\sum_{i=1}^{n}$ |
| Intégrale | `\int_{a}^{b}` | $\int_{a}^{b}$ |

---

## 🎨 Images

### Image Principale

Définie dans le frontmatter :
```yaml
image: "https://images.unsplash.com/photo-xxxxx?w=1200"
```

### Images Secondaires

```yaml
images: 
  - "https://images.unsplash.com/photo-xxxxx?w=1200"
  - "https://images.unsplash.com/photo-yyyyy?w=1200"
```

### Utilisation dans le Contenu

```markdown
![Description de l'image](https://images.unsplash.com/photo-xxxxx?w=1200)
```

### Recommandations

- **Format** : JPEG pour photos, PNG pour graphiques
- **Taille** : 1200x630px minimum (ratio 16:9)
- **Source** : Unsplash (gratuit) ou vos propres images
- **Alt text** : Toujours décrire l'image

---

## 📂 Catégories

### Énergie ⚡

Sujets :
- Réseaux électriques (BT, MT, HT)
- Smart Grids
- Énergies renouvelables
- Centrales (hydrauliques, photovoltaïques)
- Onduleurs et convertisseurs
- Stockage d'énergie

### Industrie 🏭

Sujets :
- Installations électriques industrielles
- Sécurité électrique
- Protection des équipements
- Distribution électrique
- Tableaux électriques
- Mise à la terre

### Automatisme 🤖

Sujets :
- Systèmes SCADA
- IoT industriel
- Maintenance prédictive
- Protocoles (Modbus, Profibus, Profinet)
- Automates programmables (PLC)
- Supervision et monitoring
- Capteurs et actionneurs

---

## 📝 Exemple Complet

```markdown
---
title: "Introduction aux Smart Grids"
description: "Découvrez les réseaux électriques intelligents, leur fonctionnement et leurs avantages pour la transition énergétique moderne."
date: 2024-03-15
image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200"
images: 
  - "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200"
  - "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200"
category: "Énergie"
draft: false
author: "Alain Paluku"
authorImage: "https://assets.alainpaluku.com/profil/avatar.png"
resources:
  - title: "Norme IEC 61850"
    url: "https://webstore.iec.ch/publication/6028"
    type: "documentation"
---

## Introduction

Les Smart Grids représentent l'évolution des réseaux électriques traditionnels vers des systèmes intelligents et interconnectés.

## Architecture d'un Smart Grid

### Composants Principaux

| Composant | Fonction | Technologie |
|-----------|----------|-------------|
| Compteurs intelligents | Mesure en temps réel | AMI |
| Capteurs | Surveillance réseau | IoT |
| Systèmes de contrôle | Gestion automatisée | SCADA |

### Communication

Le protocole IEC 61850 permet la communication entre équipements :

\`\`\`python
import iec61850

# Connexion au serveur IEC 61850
client = iec61850.Client('192.168.1.100', 102)
client.connect()

# Lecture d'une valeur
voltage = client.read('MMXU1.PhV.phsA.cVal.mag.f')
print(f"Tension phase A: {voltage} V")
\`\`\`

## Avantages

La puissance transmise est donnée par :

$
P = \sqrt{3} \times U \times I \times \cos(\varphi)
$

## Conclusion

Les Smart Grids sont essentiels pour la transition énergétique.
```

---

## ✅ Checklist de Publication

Avant de publier un article :

- [ ] Titre descriptif (min 10 caractères)
- [ ] Description SEO (100-160 caractères)
- [ ] Date correcte (YYYY-MM-DD)
- [ ] Image principale (1200x630px)
- [ ] Minimum 2 images secondaires
- [ ] Catégorie valide
- [ ] Au moins 1 tableau
- [ ] Au moins 1 bloc de code
- [ ] Au moins 1 formule mathématique
- [ ] `draft: false` pour publication
- [ ] Orthographe vérifiée
- [ ] Liens testés

---

## 🚀 Publication

### 1. Créer le Fichier

```bash
# Créer un nouveau fichier
touch src/content/blog/mon-article.md
```

### 2. Rédiger le Contenu

Suivre la structure ci-dessus

### 3. Tester Localement

```bash
# Lancer le serveur de développement
bun run dev

# Vérifier l'article sur http://localhost:3000/articles/
```

### 4. Publier

```bash
# Commit et push
git add src/content/blog/mon-article.md
git commit -m "Add article: Mon Article"
git push

# Déploiement automatique sur Cloudflare Pages
```

---

## 🔍 Validation Automatique

Le schéma Zod dans `src/content/config.ts` valide automatiquement :

- ✅ Titre : min 10 caractères
- ✅ Description : 100-160 caractères
- ✅ Image : URL valide
- ✅ Images : min 2, URLs valides
- ✅ Catégorie : Énergie, Industrie, ou Automatisme
- ✅ Date : format valide

Si une validation échoue, le build échouera avec un message d'erreur clair.

---

## 📚 Ressources

- [Markdown Guide](https://www.markdownguide.org/)
- [KaTeX Documentation](https://katex.org/docs/supported.html)
- [Unsplash](https://unsplash.com/) - Images gratuites
- [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/)

---

**Bon courage dans la rédaction ! ✍️**
