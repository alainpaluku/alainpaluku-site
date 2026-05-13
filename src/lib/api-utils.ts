import type { ApiResponse } from "./types";
import { validateResendConfig } from "./resend-client";
import { logger } from "./logger";

export function createJsonResponse(
  data: ApiResponse,
  status: number = 200
): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export function createErrorResponse(error: string, status: number = 500): Response {
  return createJsonResponse({ error }, status);
}

export function createSuccessResponse(): Response {
  return createJsonResponse({ success: true });
}

/**
 * Parse le body JSON d'une requête avec gestion d'erreur
 */
export async function parseRequestBody(request: Request): Promise<{ data?: unknown; error?: Response }> {
  // Protection basique contre le CSRF en forçant le content-type
  const contentType = request.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    return { error: createErrorResponse("Type de contenu non supporté", 415) };
  }

  try {
    const data = await request.json();
    return { data };
  } catch (parseError) {
    logger.error("Erreur parsing JSON", { error: parseError });
    return { error: createErrorResponse("Format de données invalide", 400) };
  }
}

/**
 * Valide la configuration Resend et retourne une erreur si invalide
 */
export function checkResendConfig(): Response | null {
  const configValidation = validateResendConfig();
  if (!configValidation.valid) {
    logger.error("Configuration Resend invalide", { missing: configValidation.missing });
    return createErrorResponse("Service temporairement indisponible", 500);
  }
  return null;
}
