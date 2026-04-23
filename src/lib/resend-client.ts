import { Resend } from "resend";

export const RESEND_CONFIG = {
  apiKey: import.meta.env.RESEND_API_KEY,
  fromEmail: import.meta.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
  toEmail: import.meta.env.RESEND_TO_EMAIL || "delivered@resend.dev",
  audienceId: import.meta.env.RESEND_AUDIENCE_ID,
} as const;

export const resendClient = new Resend(RESEND_CONFIG.apiKey);

/**
 * Valide que toutes les variables d'environnement nécessaires sont présentes
 */
export function validateResendConfig(): { valid: boolean; missing: string[] } {
  const missing: string[] = [];

  if (!RESEND_CONFIG.apiKey) missing.push("RESEND_API_KEY");
  if (!RESEND_CONFIG.fromEmail) missing.push("RESEND_FROM_EMAIL");
  if (!RESEND_CONFIG.toEmail) missing.push("RESEND_TO_EMAIL");

  return { valid: missing.length === 0, missing };
}


