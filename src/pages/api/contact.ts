import type { APIRoute } from "astro";
import { validateContactForm, sanitizeInput } from "../../lib/validation";
import { createErrorResponse, createSuccessResponse, parseRequestBody, checkResendConfig } from "../../lib/api-utils";
import { getContactAdminEmailTemplate, getContactUserEmailTemplate } from "../../lib/email-templates";
import { resendClient, RESEND_CONFIG } from "../../lib/resend-client";
import { formatDateGMT2 } from "../../lib/date-utils";
import { logger } from "../../lib/logger";
import { checkRateLimit, getClientIP } from "../../lib/rate-limit";
import type { ContactFormData } from "../../lib/types";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    logger.info("Contact API - Requête reçue");

    // Rate limiting
    const clientIP = getClientIP(request);
    const rateLimit = checkRateLimit(clientIP, { maxRequests: 3, windowMs: 60000 });

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
            'X-RateLimit-Limit': '3',
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

    const validation = validateContactForm(body);

    if (!validation.valid) {
      logger.warning("Validation formulaire échouée", { errors: validation.errors });
      return createErrorResponse(validation.errors[0], 400);
    }

    const contactData = body as ContactFormData;
    const name = sanitizeInput(contactData.name);
    const email = sanitizeInput(contactData.email);
    const subject = sanitizeInput(contactData.subject);
    const message = sanitizeInput(contactData.message);

    const { dateFormatted, timeFormatted } = formatDateGMT2();

    // 1. Email à l'admin avec tous les détails
    try {
      const { data, error: adminError } = await resendClient.emails.send({
        from: `Portfolio Contact <${RESEND_CONFIG.fromEmail}>`,
        to: [RESEND_CONFIG.toEmail],
        replyTo: email,
        subject: `[Contact] ${subject}`,
        html: getContactAdminEmailTemplate({
          name,
          email,
          subject,
          message,
          dateFormatted,
          timeFormatted,
        }),
      });

      if (adminError) {
        logger.error("Erreur envoi email admin", { 
          error: adminError,
          errorName: adminError.name,
          errorMessage: adminError.message,
        });
        
        // Message d'erreur plus explicite
        if (adminError.message?.includes("Unable to fetch")) {
          return createErrorResponse(
            "Impossible de contacter le service d'email. Vérifiez votre connexion internet ou contactez directement: contact@alainpaluku.com", 
            503
          );
        }
        
        return createErrorResponse("Impossible d'envoyer le message. Réessayez plus tard.", 500);
      }

      logger.success("Email admin envoyé", { emailId: data?.id });
    } catch (err) {
      logger.error("Exception lors de l'envoi email admin", { 
        error: err,
        message: err instanceof Error ? err.message : String(err),
      });
      
      // En cas d'erreur réseau, proposer une alternative
      return createErrorResponse(
        "Service d'email temporairement indisponible. Contactez-nous directement: contact@alainpaluku.com ou WhatsApp: +243 897 023 743", 
        503
      );
    }

    // 2. Email de confirmation à l'utilisateur
    try {
      const { error: userError } = await resendClient.emails.send({
        from: `ALAIN PALUKU <${RESEND_CONFIG.fromEmail}>`,
        to: [email],
        subject: "Message bien reçu ✓",
        html: getContactUserEmailTemplate({ name, subject }),
      });

      if (userError) {
        logger.warning("Erreur envoi email confirmation", { error: userError });
        // Ne pas bloquer si l'email de confirmation échoue
      } else {
        logger.success("Email de confirmation envoyé");
      }
    } catch (err) {
      logger.warning("Exception email confirmation", { error: err });
      // Ne pas bloquer
    }

    logger.success("Contact API - Succès total");
    return createSuccessResponse();
  } catch (error) {
    logger.error("Contact API - Erreur serveur", { error });
    return createErrorResponse("Une erreur inattendue s'est produite", 500);
  }
};
