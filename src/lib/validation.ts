export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function sanitizeInput(input: string): string {
  return input.trim().replace(/<[^>]*>/g, "");
}

export function validateContactForm(data: {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
}): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.name || typeof data.name !== "string" || data.name.trim().length < 2) {
    errors.push("Le nom doit contenir au moins 2 caractères");
  }

  if (!data.email || typeof data.email !== "string" || !validateEmail(data.email)) {
    errors.push("Email invalide");
  }

  if (!data.subject || typeof data.subject !== "string" || data.subject.trim().length < 3) {
    errors.push("Le sujet doit contenir au moins 3 caractères");
  }

  if (!data.message || typeof data.message !== "string" || data.message.trim().length < 10) {
    errors.push("Le message doit contenir au moins 10 caractères");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function validateNewsletterForm(data: {
  name?: unknown;
  email?: unknown;
}): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.name || typeof data.name !== "string" || data.name.trim().length < 2) {
    errors.push("Le nom doit contenir au moins 2 caractères");
  }

  if (!data.email || typeof data.email !== "string" || !validateEmail(data.email)) {
    errors.push("Email invalide");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
