import type { APIRoute } from "astro";
import { validateContactForm, sanitizeInput } from "../../lib/validation";
import { createErrorResponse, createSuccessResponse, parseRequestBody, checkResendConfig } from "../../lib/api-utils";
import { getContactAdminEmailTemplate, getContactUserEmailTemplate } from "../../lib/email-templates";
import { resendClient, RESEND_CONFIG } from "../../lib/resend-client";
import { formatDateGMT2 } from "../../lib/date-utils";
import { logger } from "../../lib/logger";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    logger.info("Contact API - Requête reçue");
    
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

    const name = sanitizeInput(body.name);
    const email = sanitizeInput(body.email);
    const subject = sanitizeInput(body.subject);
    const message = sanitizeInput(body.message);

    const { dateFormatted, timeFormatted } = formatDateGMT2();

    // 1. Email à l'admin avec tous les détails
    const { error: adminError } = await resendClient.emails.send({
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
      logger.error("Erreur envoi email admin", { error: adminError });
      return createErrorResponse("Impossible d'envoyer le message. Réessayez plus tard.", 500);
    }

    logger.success("Email admin envoyé");

    // 2. Email de confirmation à l'utilisateur
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

    logger.success("Contact API - Succès total");
    return createSuccessResponse();
  } catch (error) {
    logger.error("Contact API - Erreur serveur", { error });
    return createErrorResponse("Une erreur inattendue s'est produite", 500);
  }
};
