import type { Locale } from '../i18n';

export const education = {
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
} satisfies Record<Locale, { degree: string; period: string; school: string }[]>;
