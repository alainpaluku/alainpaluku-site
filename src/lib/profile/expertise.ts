import type { Locale } from '../i18n';

export const expertise = {
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
} satisfies Record<Locale, { title: string; items: string[] }[]>;
