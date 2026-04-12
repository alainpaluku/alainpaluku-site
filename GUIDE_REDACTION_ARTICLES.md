# 📝 Guide de Rédaction des Articles

## 📋 Structure Obligatoire d'un Article

Chaque article DOIT contenir les éléments suivants:

### 1. Frontmatter (Métadonnées)

```yaml
---
title: "Titre de l'Article"                    # ✅ OBLIGATOIRE
description: "Description SEO (150-160 car)"   # ✅ OBLIGATOIRE
date: 2024-03-15                               # ✅ OBLIGATOIRE (YYYY-MM-DD)
image: "https://example.com/image.jpg"         # ✅ OBLIGATOIRE (image principale)
images:                                        # ✅ OBLIGATOIRE (images secondaires)
  - "https://example.com/image1.jpg"
  - "https://example.com/image2.jpg"
  - "/svg/schema-technique.svg"
category: "Énergie"                            # ✅ OBLIGATOIRE (Énergie | Industrie | Automatisme)
draft: false                                   # ✅ OBLIGATOIRE
author: "Alain Paluku"                         # ✅ OBLIGATOIRE
authorImage: "https://assets.alainpaluku.com/profil/avatar.png"  # ✅ OBLIGATOIRE
resources:                                     # ⚠️ OPTIONNEL
  - title: "Code source"
    url: "https://github.com/user/repo"
    type: "code"
---
```

### 2. Contenu de l'Article

Chaque article DOIT contenir:

#### ✅ Sections de Texte
- Introduction
- Développement technique
- Conclusion

#### ✅ Images
- **Image principale** (dans frontmatter `image`)
- **Images secondaires** (dans frontmatter `images[]`)
- **SVG animés** (recommandé pour schémas techniques)
- **Photos** (PNG, JPG, WebP)

#### ✅ Tableaux
Au moins 1 tableau pour présenter des données

#### ✅ Extraits de Code
Au moins 1 bloc de code avec coloration syntaxique

#### ✅ Formules et Équations
Au moins 1 formule mathématique (inline ou block)

---

## 📐 Template Complet d'Article

```markdown
---
title: "Architecture IoT pour la Maintenance Prédictive"
description: "Conception d'une architecture IoT industrielle pour l'acquisition de données capteurs et la maintenance prédictive des équipements."
date: 2024-03-15
image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200"
images:
  - "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200"
  - "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200"
  - "/svg/architecture-iot.svg"
category: "Automatisme"
draft: false
author: "Alain Paluku"
authorImage: "https://assets.alainpaluku.com/profil/avatar.png"
resources:
  - title: "Code source ESP32"
    url: "https://github.com/alainpaluku/iot-predictive"
    type: "code"
  - title: "Documentation MQTT"
    url: "https://mqtt.org/mqtt-specification/"
    type: "documentation"
  - title: "Datasheet ADXL345"
    url: "https://www.analog.com/en/products/adxl345.html"
    type: "materiel"
---

## Introduction

La maintenance prédictive permet de réduire les coûts d'arrêt de 30 à 40% en anticipant les défaillances avant qu'elles ne surviennent.

![Architecture IoT](/svg/architecture-iot.svg)

## Architecture Proposée

L'architecture repose sur trois couches distinctes:

### Couche Capteurs

Les capteurs utilisés:

| Capteur | Modèle | Plage | Interface |
|---------|--------|-------|-----------|
| Accéléromètre | ADXL345 | ±16g | I2C/SPI |
| Température | PT100 | -200°C à +850°C | SPI |
| Courant | SCT-013 | 0-100A AC | Analogique |

### Traitement Edge

Le traitement en bordure réduit la latence et la bande passante:

\`\`\`c
#include "esp_dsp.h"
#include <Wire.h>

#define SAMPLES 1024
#define SAMPLING_FREQ 3200

void compute_fft(float* signal, int N) {
    // Fenêtrage Hanning
    dsps_wind_hann_f32(signal, N);
    
    // Transformée de Fourier rapide
    dsps_fft2r_fc32(signal, N);
    dsps_bit_rev_fc32(signal, N);
    
    // Calcul du spectre de puissance
    dsps_cplx2reC_fc32(signal, N);
}

void loop() {
    // Acquisition des données
    for(int i = 0; i < SAMPLES; i++) {
        signal[i] = read_sensor();
        delayMicroseconds(1000000 / SAMPLING_FREQ);
    }
    
    // Analyse FFT
    compute_fft(signal, SAMPLES);
}
\`\`\`

## Modèle de Prédiction

L'architecture du modèle LSTM:

$$
h_t = \sigma(W_h \cdot [h_{t-1}, x_t] + b_h)
$$

$$
\text{RUL}_t = W_o \cdot h_t + b_o
$$

Où:
- $h_t$ : état caché au temps $t$
- $x_t$ : vecteur de features
- $W_h, W_o$ : matrices de poids
- $\sigma$ : fonction d'activation (tanh)

La formule de calcul RMS:

$\text{RMS} = \sqrt{\frac{1}{N}\sum_{i=1}^{N} x_i^2}$

## Résultats

Après 6 mois de déploiement:

| Métrique | Avant | Après | Amélioration |
|----------|-------|-------|--------------|
| Arrêts non planifiés | 12/mois | 7/mois | -42% |
| Disponibilité | 87% | 96% | +9% |
| Coûts maintenance | 25k€/mois | 15k€/mois | -40% |

![Graphique résultats](/svg/resultats-maintenance.svg)

## Conclusion

Cette architecture IoT démontre qu'il est possible d'implémenter une solution de maintenance prédictive efficace avec des composants abordables (< 150€ par machine).

Les bénéfices sont mesurables dès les premiers mois avec un ROI atteint en 8 mois.
```

---

## 🎨 Images et SVG

### Images Principales (Frontmatter)

```yaml
# Image principale (affichée en haut de l'article)
image: "https://images.unsplash.com/photo-xxxxx?w=1200"

# Images secondaires (utilisées dans le contenu)
images:
  - "https://images.unsplash.com/photo-xxxxx?w=1200"  # Photo 1
  - "https://images.unsplash.com/photo-yyyyy?w=1200"  # Photo 2
  - "/svg/schema-architecture.svg"                    # SVG animé
  - "/svg/graphique-resultats.svg"                    # SVG statique
```

### Utilisation dans le Contenu

```markdown
<!-- Image externe (Unsplash) -->
![Description de l'image](https://images.unsplash.com/photo-xxxxx?w=1200)

<!-- SVG local animé -->
![Schéma technique](/svg/architecture-iot.svg)

<!-- Image avec légende -->
![Résultats de mesure](/svg/graphique.svg)
*Figure 1: Évolution de la température sur 24h*
```

### Créer un SVG Animé

Créer le fichier `public/svg/mon-schema.svg`:

```xml
<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
  <style>
    /* Animation des électrons */
    .electron {
      animation: move 2s linear infinite;
    }
    
    @keyframes move {
      from { offset-distance: 0%; }
      to { offset-distance: 100%; }
    }
    
    /* Pulsation */
    .pulse {
      animation: pulse 1.5s ease-in-out infinite;
    }
    
    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.6; transform: scale(1.1); }
    }
  </style>
  
  <!-- Circuit électrique -->
  <path id="circuit" d="M 100 200 L 700 200" 
        stroke="#343b58" stroke-width="4" fill="none"/>
  
  <!-- Électron animé -->
  <circle class="electron" r="8" fill="#2FA4DE">
    <animateMotion dur="2s" repeatCount="indefinite">
      <mpath href="#circuit"/>
    </animateMotion>
  </circle>
  
  <!-- Composant pulsant -->
  <rect x="350" y="180" width="100" height="40" 
        fill="#343b58" class="pulse"/>
  
  <!-- Texte -->
  <text x="400" y="205" text-anchor="middle" 
        fill="white" font-size="14">Capteur</text>
</svg>
```

---

## 📊 Tableaux

### Tableau Simple

```markdown
| Paramètre | Valeur | Unité |
|-----------|--------|-------|
| Tension   | 230    | V     |
| Courant   | 10     | A     |
| Puissance | 2300   | W     |
```

### Tableau Comparatif

```markdown
| Critère | Solution A | Solution B | Recommandation |
|---------|-----------|-----------|----------------|
| Coût | 500€ | 800€ | ✅ Solution A |
| Performance | 85% | 95% | ✅ Solution B |
| Maintenance | Facile | Complexe | ✅ Solution A |
```

### Tableau avec Alignement

```markdown
| Gauche | Centre | Droite |
|:-------|:------:|-------:|
| Texte  | Texte  | 100    |
| Autre  | Autre  | 200    |
```

---

## 💻 Extraits de Code

### Code Python

```markdown
\`\`\`python
import numpy as np
from scipy import signal

def calculate_fft(data, sampling_rate):
    """
    Calcul de la FFT d'un signal
    
    Args:
        data: Signal temporel
        sampling_rate: Fréquence d'échantillonnage (Hz)
    
    Returns:
        frequencies, spectrum: Fréquences et spectre
    """
    n = len(data)
    frequencies = np.fft.fftfreq(n, 1/sampling_rate)
    spectrum = np.abs(np.fft.fft(data))
    
    # Garder seulement les fréquences positives
    positive_freq_idx = frequencies > 0
    
    return frequencies[positive_freq_idx], spectrum[positive_freq_idx]

# Exemple d'utilisation
fs = 1000  # 1 kHz
t = np.linspace(0, 1, fs)
signal = np.sin(2 * np.pi * 50 * t)  # Signal 50 Hz

freq, spec = calculate_fft(signal, fs)
print(f"Fréquence dominante: {freq[np.argmax(spec)]} Hz")
\`\`\`
```

### Code C/C++ (Arduino/ESP32)

```markdown
\`\`\`cpp
#include <Arduino.h>
#include <Wire.h>

#define SENSOR_PIN A0
#define SAMPLE_RATE 1000  // Hz

float voltage = 0;
float current = 0;

void setup() {
  Serial.begin(115200);
  pinMode(SENSOR_PIN, INPUT);
  
  Serial.println("Système de mesure démarré");
}

void loop() {
  // Lecture du capteur
  int raw = analogRead(SENSOR_PIN);
  voltage = raw * (5.0 / 1023.0);
  
  // Calcul du courant (ACS712: 185mV/A)
  current = (voltage - 2.5) / 0.185;
  
  // Affichage
  Serial.print("Tension: ");
  Serial.print(voltage, 3);
  Serial.print(" V | Courant: ");
  Serial.print(current, 2);
  Serial.println(" A");
  
  delay(1000 / SAMPLE_RATE);
}
\`\`\`
```

### Code JavaScript/TypeScript

```markdown
\`\`\`typescript
interface SensorData {
  timestamp: Date;
  temperature: number;
  humidity: number;
  pressure: number;
}

class IoTDevice {
  private deviceId: string;
  private mqttClient: MQTTClient;
  
  constructor(deviceId: string) {
    this.deviceId = deviceId;
    this.mqttClient = new MQTTClient();
  }
  
  async publishData(data: SensorData): Promise<void> {
    const payload = {
      device_id: this.deviceId,
      timestamp: data.timestamp.toISOString(),
      metrics: {
        temperature: data.temperature,
        humidity: data.humidity,
        pressure: data.pressure
      }
    };
    
    await this.mqttClient.publish(
      `sensors/${this.deviceId}/data`,
      JSON.stringify(payload)
    );
  }
}
\`\`\`
```

---

## 🔢 Formules et Équations

### Formules Inline

```markdown
La loi d'Ohm s'écrit $V = R \times I$ où $V$ est la tension.

La puissance est donnée par $P = V \times I = R \times I^2$.
```

### Équations Block

```markdown
La transformée de Fourier discrète:

$$
X_k = \sum_{n=0}^{N-1} x_n \cdot e^{-i 2\pi k n / N}
$$

Le théorème de Parseval:

$$
\sum_{n=0}^{N-1} |x_n|^2 = \frac{1}{N} \sum_{k=0}^{N-1} |X_k|^2
$$
```

### Systèmes d'Équations

```markdown
Le système d'équations de Maxwell:

$$
\begin{cases}
\nabla \cdot \vec{E} = \frac{\rho}{\epsilon_0} \\
\nabla \cdot \vec{B} = 0 \\
\nabla \times \vec{E} = -\frac{\partial \vec{B}}{\partial t} \\
\nabla \times \vec{B} = \mu_0 \vec{J} + \mu_0 \epsilon_0 \frac{\partial \vec{E}}{\partial t}
\end{cases}
$$
```

### Matrices

```markdown
La matrice d'admittance du réseau:

$$
Y_{bus} = \begin{bmatrix}
Y_{11} & Y_{12} & Y_{13} \\
Y_{21} & Y_{22} & Y_{23} \\
Y_{31} & Y_{32} & Y_{33}
\end{bmatrix}
$$
```

---

## 📂 Catégories

Chaque article DOIT appartenir à UNE SEULE catégorie:

### ⚡ Énergie
- Réseaux électriques (BT, MT, HT)
- Smart Grids
- Énergies renouvelables
- Centrales hydrauliques
- Systèmes photovoltaïques
- Onduleurs
- Stockage d'énergie

### 🏭 Industrie
- Installations électriques industrielles
- Sécurité électrique
- Protection des équipements
- Distribution électrique
- Tableaux électriques
- Mise à la terre

### 🤖 Automatisme
- Systèmes SCADA
- IoT industriel
- Maintenance prédictive
- Protocoles industriels (Modbus, Profibus, etc.)
- Automates programmables (PLC)
- Supervision
- Capteurs et actionneurs

---

## ✅ Checklist de Validation

Avant de publier un article, vérifier:

- [ ] ✅ Titre présent et descriptif
- [ ] ✅ Date au format YYYY-MM-DD
- [ ] ✅ Description SEO (150-160 caractères)
- [ ] ✅ Image principale (URL valide)
- [ ] ✅ Images secondaires (au moins 2)
- [ ] ✅ Catégorie valide (Énergie | Industrie | Automatisme)
- [ ] ✅ Au moins 1 tableau
- [ ] ✅ Au moins 1 extrait de code
- [ ] ✅ Au moins 1 formule mathématique
- [ ] ✅ SVG animé (recommandé)
- [ ] ✅ Ressources (optionnel mais recommandé)
- [ ] ✅ Orthographe vérifiée
- [ ] ✅ `draft: false` pour publication

---

## 🚀 Publication

1. Créer l'article avec le workflow GitHub
2. Rédiger le contenu complet
3. Ajouter tous les éléments obligatoires
4. Valider avec la checklist
5. Passer `draft: false`
6. Merger la Pull Request
7. Le site se déploie automatiquement

---

## 📚 Exemples Complets

Voir les articles de test dans `src/content/blog/`:
- `architecture-iot-industriel.md` (Automatisme)
- `introduction-smart-grids.md` (Énergie)
- `onduleurs-photovoltaiques.md` (Énergie)
- `protocole-modbus-rtu.md` (Automatisme)
- `systeme-scada-industriel.md` (Industrie)

Ces articles servent de référence pour la structure et le style.


---

## 🎯 Résumé Rapide

### Éléments OBLIGATOIRES dans chaque article:

```yaml
---
title: "Titre (min 10 car)"                    # ✅
description: "Description (100-160 car)"       # ✅
date: 2024-03-15                               # ✅
image: "URL image principale"                  # ✅
images: ["URL1", "URL2", "/svg/schema.svg"]   # ✅ (min 2)
category: "Énergie"                            # ✅ (Énergie|Industrie|Automatisme)
draft: false                                   # ✅
author: "Alain Paluku"                         # ✅
authorImage: "URL"                             # ✅
---

## Contenu

- ✅ Au moins 1 tableau
- ✅ Au moins 1 extrait de code
- ✅ Au moins 1 formule mathématique
- ✅ Images (SVG animés recommandés)
```

### Validation Automatique

Le schéma Zod dans `src/content/config.ts` valide automatiquement:
- Titre: min 10 caractères
- Description: 100-160 caractères
- Image principale: URL valide
- Images secondaires: min 2, URLs valides
- Catégorie: une des 3 valeurs autorisées

### Exemples de SVG Animés

Pour créer des SVG animés dans vos articles, utilisez:
- Animations CSS (électrons, pulsation, clignotement)
- Gradients pour les effets visuels
- Textes et légendes
- Formules intégrées
- Balises `<animateMotion>` pour les mouvements

---

## 📞 Support

Pour toute question sur la rédaction d'articles:
- Consulter les exemples dans `src/content/blog/`
- Utiliser le workflow GitHub pour créer automatiquement la structure

**Bon courage dans la rédaction! 🚀**
