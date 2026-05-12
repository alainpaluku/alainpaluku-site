import type { Locale } from './i18n';

export const profile = {
  name: 'Alain Paluku',
  localImage: '/logo.png',
  canonicalImage: 'https://alainpaluku.com/logo.png',
  sameAs: [
    'https://linkedin.com/in/alainpaluku',
    'https://github.com/alainpaluku',
    'https://medium.com/@alainpaluku',
    'https://huggingface.co/alainpaluku',
  ],
  keywords: [
    'Alain Paluku',
    'ALAIN PALUK',
    'Alain Paluk',
    'ingénieur électricien',
    'electrical engineer',
    'développeur système embarqué',
    'embedded systems developer',
    'master électroénergétique',
    'Université Catholique la Sapientia Goma',
    'réseaux électriques BT MT HT',
    'SCADA',
    'automatisme industriel',
    'énergies renouvelables',
    'photovoltaïque',
    'centrale hydraulique',
  ],
  education: {
    fr: [
      {
        degree: 'Master en Électroénergétique',
        period: 'En cours',
        school: 'Université Catholique la Sapientia – Goma',
      },
      {
        degree: 'Licence en Génie Électrique',
        period: '2025',
        school: 'Université Catholique la Sapientia – Goma',
      },
      {
        degree: 'Diplôme d’État en Électricité',
        period: '2021',
        school: 'Institut Kyeshero – Goma',
      },
    ],
    en: [
      {
        degree: 'Master’s in Electroenergetics',
        period: 'In progress',
        school: 'Université Catholique la Sapientia – Goma',
      },
      {
        degree: 'Bachelor’s degree in Electrical Engineering',
        period: '2025',
        school: 'Université Catholique la Sapientia – Goma',
      },
      {
        degree: 'State Diploma in Electricity',
        period: '2021',
        school: 'Institut Kyeshero – Goma',
      },
    ],
  } satisfies Record<Locale, { degree: string; period: string; school: string }[]>,
  expertise: {
    fr: [
      {
        title: 'Énergie',
        items: [
          'Dimensionnement de réseaux électriques BT, MT et HT',
          'Dimensionnement de centrales hydrauliques et photovoltaïques',
        ],
      },
      {
        title: 'Industrie',
        items: [
          'Conception et réalisation d’installations électriques industrielles',
          'Mise en œuvre de solutions de sécurité et protection industrielle',
        ],
      },
      {
        title: 'Automatisme',
        items: [
          'Conception et mise en œuvre de solutions d’automatisation industrielle',
          'Déploiement de systèmes de monitoring et maintenance prédictive',
        ],
      },
    ],
    en: [
      {
        title: 'Energy',
        items: [
          'Sizing of LV, MV and HV electrical networks',
          'Sizing of hydroelectric and photovoltaic power plants',
        ],
      },
      {
        title: 'Industry',
        items: [
          'Design and implementation of industrial electrical installations',
          'Deployment of industrial safety and protection solutions',
        ],
      },
      {
        title: 'Automation',
        items: [
          'Design and implementation of industrial automation solutions',
          'Deployment of monitoring systems and predictive maintenance',
        ],
      },
    ],
  } satisfies Record<Locale, { title: string; items: string[] }[]>,
};
