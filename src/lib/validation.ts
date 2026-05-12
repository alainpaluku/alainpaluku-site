export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function sanitizeInput(input: string): string {
  return input.trim().replace(/<[^>]*>/g, "");
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function validateStringField(value: unknown, minLength: number): boolean {
  return typeof value === "string" && value.trim().length >= minLength;
}

export function validateContactForm(data: unknown): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  const formData = isRecord(data) ? data : {};

  if (!validateStringField(formData.name, 2)) errors.push("Le nom doit contenir au moins 2 caractères");
  if (typeof formData.email !== "string" || !validateEmail(formData.email)) errors.push("Email invalide");
  if (!validateStringField(formData.subject, 3)) errors.push("Le sujet doit contenir au moins 3 caractères");
  if (!validateStringField(formData.message, 10)) errors.push("Le message doit contenir au moins 10 caractères");

  return { valid: errors.length === 0, errors };
}

export function validateNewsletterForm(data: unknown): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  const formData = isRecord(data) ? data : {};

  if (!validateStringField(formData.name, 2)) errors.push("Le nom doit contenir au moins 2 caractères");
  if (typeof formData.email !== "string" || !validateEmail(formData.email)) errors.push("Email invalide");

  return { valid: errors.length === 0, errors };
}
