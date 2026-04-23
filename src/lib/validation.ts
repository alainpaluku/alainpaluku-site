export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function sanitizeInput(input: string): string {
  return input.trim().replace(/<[^>]*>/g, "");
}

function validateStringField(value: unknown, minLength: number): boolean {
  return typeof value === "string" && value.trim().length >= minLength;
}

export function validateContactForm(data: {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
}): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!validateStringField(data.name, 2)) errors.push("Le nom doit contenir au moins 2 caractères");
  if (!data.email || typeof data.email !== "string" || !validateEmail(data.email)) errors.push("Email invalide");
  if (!validateStringField(data.subject, 3)) errors.push("Le sujet doit contenir au moins 3 caractères");
  if (!validateStringField(data.message, 10)) errors.push("Le message doit contenir au moins 10 caractères");

  return { valid: errors.length === 0, errors };
}

export function validateNewsletterForm(data: {
  name?: unknown;
  email?: unknown;
}): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!validateStringField(data.name, 2)) errors.push("Le nom doit contenir au moins 2 caractères");
  if (!data.email || typeof data.email !== "string" || !validateEmail(data.email)) errors.push("Email invalide");

  return { valid: errors.length === 0, errors };
}
