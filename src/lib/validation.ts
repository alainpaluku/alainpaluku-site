export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function sanitizeInput(input: string): string {
  return input.trim().replace(/<[^>]*>/g, "");
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function validateStringField(value: unknown, minLength: number, maxLength: number = 5000): boolean {
  if (typeof value !== "string") return false;
  const length = value.trim().length;
  return length >= minLength && length <= maxLength;
}

export function validateContactForm(data: unknown): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  const formData = isRecord(data) ? data : {};

  if (!validateStringField(formData.name, 2, 100)) errors.push("Le nom doit contenir entre 2 et 100 caractères");
  if (typeof formData.email !== "string" || !validateEmail(formData.email) || formData.email.length > 255) errors.push("Email invalide");
  if (!validateStringField(formData.subject, 3, 200)) errors.push("Le sujet doit contenir entre 3 et 200 caractères");
  if (!validateStringField(formData.message, 10, 5000)) errors.push("Le message doit contenir entre 10 et 5000 caractères");

  return { valid: errors.length === 0, errors };
}

export function validateNewsletterForm(data: unknown): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  const formData = isRecord(data) ? data : {};

  if (!validateStringField(formData.name, 2, 100)) errors.push("Le nom doit contenir entre 2 et 100 caractères");
  if (typeof formData.email !== "string" || !validateEmail(formData.email) || formData.email.length > 255) errors.push("Email invalide");

  return { valid: errors.length === 0, errors };
}
