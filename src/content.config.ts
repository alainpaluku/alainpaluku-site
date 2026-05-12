import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    // ✅ OBLIGATOIRE - Métadonnées de base
    title: z.string().min(10, "Le titre doit contenir au moins 10 caractères"),
    description: z.string().min(100, "La description doit contenir au moins 100 caractères").max(160, "La description ne doit pas dépasser 160 caractères"),
    date: z.coerce.date(),
    
    // ✅ OBLIGATOIRE - Images
    image: z.url("L'image principale doit être une URL valide"),
    images: z.array(z.url()).min(2, "Au moins 2 images secondaires sont requises"),
    
    // ✅ OBLIGATOIRE - Auteur
    author: z.string().default('Alain Paluku'),
    authorImage: z.url().default('https://assets.alainpaluku.com/profil/avatar.png'),
    
    // ✅ OBLIGATOIRE - Catégorie (une seule parmi les 3)
    category: z.enum(['Énergie', 'Industrie', 'Automatisme'] as const, {
      message: "La catégorie doit être: Énergie, Industrie ou Automatisme",
    }),
    
    // ✅ OBLIGATOIRE - Statut de publication
    draft: z.boolean().default(false),
    
    // ⚠️ OPTIONNEL - Ressources complémentaires
    resources: z.array(z.object({
      title: z.string(),
      url: z.url(),
      type: z.enum(['code', 'documentation', 'materiel', 'article', 'video']),
    })).optional(),
  }),
});

export const collections = {
  blog,
};
