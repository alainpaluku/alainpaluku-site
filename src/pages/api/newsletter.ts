import type { APIRoute } from "astro";
import { validateNewsletterForm, sanitizeInput } from "../../lib/validation";
import { createErrorResponse, createSuccessResponse, parseRequestBody, checkResendConfig } from "../../lib/api-utils";
import { getNewsletterWelcomeEmailTemplate } from "../../lib/email-templates";
import { resendClient, RESEND_CONFIG } from "../../lib/resend-client";
import { logger } from "../../lib/logger";
import { checkRateLimit, getClientIP } from "../../lib/rate-limit";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    logger.info("Newsletter API - Requête reçue");

    // Rate limiting
    const clientIP = getClientIP(request);
    const rateLimit = checkRateLimit(clientIP, { maxRequests: 2, windowMs: 60000 });

    if (!rateLimit.allowed) {
      logger.warning("Rate limit dépassé", { ip: clientIP });
      return new Response(
        JSON.stringify({
          success: false,
          message: "Trop de requêtes. Veuillez réessayer dans une minute."
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'X-RateLimit-Limit': '2',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': new Date(rateLimit.resetTime).toISOString(),
            'Retry-After': Math.ceil((rateLimit.resetTime - Date.now()) / 1000).toString(),
          }
        }
      );
    }

    // Valider la configuration Resend
    const configError = checkResendConfig();
    if (configError) return configError;

    // Parser le body
    const { data: body, error: parseError } = await parseRequestBody(request);
    if (parseError) return parseError;

    const validation = validateNewsletterForm(body);

    if (!validation.valid) {
      logger.warning("Validation formulaire échouée", { errors: validation.errors });
      return createErrorResponse(validation.errors[0], 400);
    }

    const name = sanitizeInput(body.name);
    const email = sanitizeInput(body.email);

    // Ajouter le contact à l'audience Resend si configuré
    if (RESEND_CONFIG.audienceId) {
      const { error: contactError } = await resendClient.contacts.create({
        email,
        firstName: name,
        audienceId: RESEND_CONFIG.audienceId,
      });

      if (contactError) {
        logger.warning("Erreur ajout contact à l'audience", { error: contactError });
        // Vérifier si c'est un doublon
        if (contactError.message?.includes("already exists")) {
          return createErrorResponse("Cet email est déjà inscrit", 400);
        }
        // Ne pas bloquer l'inscription si l'ajout à l'audience échoue pour une autre raison
      } else {
        logger.success("Contact ajouté à l'audience");
      }
    }

    // Email de bienvenue personnalisé
    const { error: emailError } = await resendClient.emails.send({
      from: `ALAIN PALUKU <${RESEND_CONFIG.fromEmail}>`,
      to: [email],
      subject: `Bienvenue ${name}`,
      html: getNewsletterWelcomeEmailTemplate({ name }),
    });

    if (emailError) {
      logger.error("Erreur envoi email bienvenue", { error: emailError });
      return createErrorResponse("Impossible d'envoyer l'email de confirmation", 500);
    }

    logger.success("Newsletter API - Succès total");
    return createSuccessResponse();
  } catch (error) {
    logger.error("Newsletter API - Erreur serveur", { error });
    return createErrorResponse("Une erreur inattendue s'est produite", 500);
  }
};
