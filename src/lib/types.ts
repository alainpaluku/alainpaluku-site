// Types partagés pour le projet

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface NewsletterFormData {
  name: string;
  email: string;
}

export interface ApiResponse {
  success?: boolean;
  error?: string;
}

// Types pour les ressources (alignés avec le schema Astro Content)
export interface Resource {
  title: string;
  url: string;
  type: "code" | "documentation" | "materiel" | "article" | "video" | "demo";
}
