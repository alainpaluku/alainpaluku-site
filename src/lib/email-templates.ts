/**
 * Templates d'emails - Style minimaliste du site
 * Design sobre et professionnel Tokyo Night
 */

interface ContactAdminEmailParams {
  name: string;
  email: string;
  subject: string;
  message: string;
  dateFormatted: string;
  timeFormatted: string;
}

interface ContactUserEmailParams {
  name: string;
  subject: string;
}

interface NewsletterWelcomeEmailParams {
  name: string;
  email: string;
}

// Couleurs Tokyo Night Light (identiques au site)
const COLORS = {
  background: '#d5d6db',
  foreground: '#343b58',
  muted: '#cbcdcb',
  mutedForeground: '#6b6f94',
  border: '#bbbecb',
  accent: '#343b58',
  accentForeground: '#d5d6db',
  cardBg: '#ffffff',
  footerBg: '#e8e9ed', // Couleur plus claire pour le footer
};

// URLs des assets
const ASSETS = {
  avatar: 'https://assets.alainpaluku.com/profil/avatar.png',
  linkedin: 'https://assets.alainpaluku.com/profil/incon-mails/linkedin-circle.png',
  github: 'https://assets.alainpaluku.com/profil/incon-mails/github.png',
  medium: 'https://assets.alainpaluku.com/profil/incon-mails/medium.png',
};

/**
 * Génère la structure HTML de base pour tous les emails
 */
function createEmailLayout(content: string): string {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body style="margin: 0; padding: 0; font-family: 'Nunito', sans-serif; background-color: ${COLORS.background};">
  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: ${COLORS.background};">
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table cellpadding="0" cellspacing="0" border="0" width="600" style="background-color: ${COLORS.cardBg}; max-width: 600px;">
          ${content}
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * Génère le header commun à tous les emails
 */
function createEmailHeader(): string {
  return `<tr>
  <td style="padding: 24px 32px; border-bottom: 1px solid ${COLORS.border};">
    <table cellpadding="0" cellspacing="0" border="0" width="100%">
      <tr>
        <td width="60" style="vertical-align: middle;">
          <img src="${ASSETS.avatar}" alt="Alain Paluku" width="60" height="60" style="display: block; border-radius: 50%; border: 0;" />
        </td>
        <td style="vertical-align: middle; padding-left: 16px;">
          <p style="margin: 0 0 2px 0; font-size: 16px; font-weight: 700; color: ${COLORS.foreground}; line-height: 1.2; letter-spacing: 0.3px;">ALAIN PALUKU</p>
          <p style="margin: 0; font-size: 11px; font-weight: 500; color: ${COLORS.mutedForeground}; line-height: 1.4; letter-spacing: 0.2px;">Ingénieur Électricien | Développeur Système Embarqué</p>
        </td>
      </tr>
    </table>
  </td>
</tr>`;
}

/**
 * Génère le footer commun à tous les emails
 */
function createEmailFooter(includeUnsubscribe: boolean = false): string {
  const unsubscribeSection = includeUnsubscribe ? `
    <tr>
      <td style="background-color: ${COLORS.muted}; padding: 14px; text-align: center;">
        <p style="margin: 0; font-size: 11px; color: ${COLORS.mutedForeground}; font-weight: 400;">
          Vous ne souhaitez plus recevoir ces emails ? 
          <a href="{{{RESEND_UNSUBSCRIBE_URL}}}" style="color: ${COLORS.accent}; text-decoration: underline; font-weight: 600;">Se désinscrire</a>
        </p>
      </td>
    </tr>` : '';

  return `<tr>
  <td style="background-color: ${COLORS.footerBg}; padding: 28px; text-align: center;">
    <p style="margin: 0 0 18px 0; font-size: 15px; font-weight: 700; color: ${COLORS.foreground};">ALAIN PALUKU</p>
    
    <table cellpadding="0" cellspacing="0" border="0" width="100%">
      <tr><td align="center">
        <a href="https://linkedin.com/in/alainpaluku" style="display: inline-block; margin: 0 8px;"><img src="${ASSETS.linkedin}" alt="LinkedIn" width="28" height="28" style="display: block; opacity: 0.7; border: 0;" /></a>
        <a href="https://github.com/alainpaluku" style="display: inline-block; margin: 0 8px;"><img src="${ASSETS.github}" alt="GitHub" width="28" height="28" style="display: block; opacity: 0.7; border: 0;" /></a>
        <a href="https://medium.com/@alainpaluku" style="display: inline-block; margin: 0 8px;"><img src="${ASSETS.medium}" alt="Medium" width="28" height="28" style="display: block; opacity: 0.7; border: 0;" /></a>
      </td></tr>
    </table>
  </td>
</tr>${unsubscribeSection}`;
}

/**
 * Génère une section de titre
 */
function createTitleSection(title: string, subtitle: string): string {
  return `<tr>
  <td style="padding: 24px 32px 0 32px;">
    <h1 style="margin: 0 0 6px 0; font-size: 22px; font-weight: 700; color: ${COLORS.foreground};">${title}</h1>
    <p style="margin: 0; font-size: 13px; color: ${COLORS.mutedForeground}; font-weight: 500;">${subtitle}</p>
  </td>
</tr>`;
}

/**
 * Email admin - Nouveau message de contact
 */
export function getContactAdminEmailTemplate(params: ContactAdminEmailParams): string {
  const { name, email, subject, message, dateFormatted, timeFormatted } = params;
  
  const content = `
    ${createEmailHeader()}
    ${createTitleSection("Nouveau message", "Formulaire de contact")}
    
    <tr>
      <td style="padding: 24px 32px 32px 32px;">
        
        <!-- Expéditeur -->
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: ${COLORS.muted}; border-radius: 8px; margin-bottom: 20px;">
          <tr><td style="padding: 22px;">
            <p style="margin: 0 0 6px 0; font-size: 11px; font-weight: 600; color: ${COLORS.mutedForeground}; letter-spacing: 0.5px;">EXPÉDITEUR</p>
            <p style="margin: 0 0 10px 0; font-size: 17px; font-weight: 700; color: ${COLORS.foreground};">${name}</p>
            <p style="margin: 0; font-size: 14px; font-weight: 500;">
              <a href="mailto:${email}" style="color: ${COLORS.accent}; text-decoration: none;">${email}</a>
            </p>
          </td></tr>
        </table>

        <!-- Sujet -->
        <p style="margin: 0 0 6px 0; font-size: 11px; font-weight: 600; color: ${COLORS.mutedForeground}; letter-spacing: 0.5px;">SUJET</p>
        <p style="margin: 0 0 20px 0; font-size: 15px; font-weight: 600; color: ${COLORS.foreground};">${subject}</p>

        <!-- Date et heure -->
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 20px;">
          <tr>
            <td width="48%" style="vertical-align: top;">
              <p style="margin: 0 0 6px 0; font-size: 11px; font-weight: 600; color: ${COLORS.mutedForeground}; letter-spacing: 0.5px;">DATE</p>
              <p style="margin: 0; font-size: 13px; font-weight: 500; color: ${COLORS.foreground};">${dateFormatted}</p>
            </td>
            <td width="4%"></td>
            <td width="48%" style="vertical-align: top;">
              <p style="margin: 0 0 6px 0; font-size: 11px; font-weight: 600; color: ${COLORS.mutedForeground}; letter-spacing: 0.5px;">HEURE GMT+2</p>
              <p style="margin: 0; font-size: 13px; font-weight: 500; color: ${COLORS.foreground};">${timeFormatted}</p>
            </td>
          </tr>
        </table>

        <!-- Message -->
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: ${COLORS.muted}; border-radius: 8px; margin-bottom: 24px;">
          <tr><td style="padding: 22px;">
            <p style="margin: 0 0 12px 0; font-size: 11px; font-weight: 600; color: ${COLORS.mutedForeground}; letter-spacing: 0.5px;">MESSAGE</p>
            <p style="margin: 0; white-space: pre-wrap; color: ${COLORS.foreground}; font-size: 14px; line-height: 1.7; font-weight: 400;">${message}</p>
          </td></tr>
        </table>

        <!-- Bouton -->
        <table cellpadding="0" cellspacing="0" border="0" width="100%">
          <tr><td align="center">
            <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}" style="display: inline-block; background-color: ${COLORS.accent}; color: ${COLORS.accentForeground}; padding: 13px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">Répondre au message</a>
          </td></tr>
        </table>

      </td>
    </tr>
    
    ${createEmailFooter()}
  `;
  
  return createEmailLayout(content);
}

/**
 * Email utilisateur - Confirmation de réception
 */
export function getContactUserEmailTemplate(params: ContactUserEmailParams): string {
  const { name, subject } = params;
  
  const content = `
    ${createEmailHeader()}
    ${createTitleSection("Message bien reçu", "Confirmation de réception")}

    <tr>
      <td style="padding: 24px 32px 32px 32px;">
        <p style="margin: 0 0 20px 0; font-size: 15px; color: ${COLORS.foreground}; font-weight: 600;">Bonjour ${name},</p>
        
        <p style="margin: 0 0 16px 0; font-size: 14px; color: ${COLORS.mutedForeground}; line-height: 1.7; font-weight: 400;">
          Je vous confirme la bonne réception de votre message concernant <strong style="color: ${COLORS.foreground};">"${subject}"</strong>.
        </p>
        
        <p style="margin: 0 0 28px 0; font-size: 14px; color: ${COLORS.mutedForeground}; line-height: 1.7; font-weight: 400;">
          Je traiterai votre demande dans les plus brefs délais et vous apporterai une réponse détaillée sous 24 à 48 heures.
        </p>

        <!-- Info Box -->
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: ${COLORS.muted}; border-radius: 8px; margin-bottom: 28px;">
          <tr><td style="padding: 20px; text-align: center;">
            <p style="margin: 0 0 8px 0; font-size: 12px; font-weight: 600; color: ${COLORS.mutedForeground}; letter-spacing: 0.5px;">DÉLAI DE RÉPONSE</p>
            <p style="margin: 0; font-size: 16px; font-weight: 700; color: ${COLORS.foreground};">24 à 48 heures</p>
          </td></tr>
        </table>

        <!-- Bouton -->
        <table cellpadding="0" cellspacing="0" border="0" width="100%">
          <tr><td align="center">
            <a href="https://alainpaluku.com" style="display: inline-block; background-color: ${COLORS.accent}; color: ${COLORS.accentForeground}; padding: 13px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">Visiter le site</a>
          </td></tr>
        </table>
        
        <p style="margin: 24px 0 0 0; font-size: 13px; color: ${COLORS.mutedForeground}; text-align: center; line-height: 1.6; font-weight: 400;">
          Cordialement,<br/>Alain Paluku
        </p>
      </td>
    </tr>

    ${createEmailFooter()}
  `;
  
  return createEmailLayout(content);
}

/**
 * Email newsletter - Bienvenue
 */
export function getNewsletterWelcomeEmailTemplate(params: NewsletterWelcomeEmailParams): string {
  const { name } = params;
  
  const content = `
    ${createEmailHeader()}
    
    <tr>
      <td style="padding: 32px 32px 0 32px;">
        <h1 style="margin: 0 0 8px 0; font-size: 26px; font-weight: 700; color: ${COLORS.foreground}; line-height: 1.2;">Bienvenue ${name}</h1>
        <p style="margin: 0; font-size: 14px; color: ${COLORS.mutedForeground}; font-weight: 500;">Inscription confirmée avec succès</p>
      </td>
    </tr>

    <tr>
      <td style="padding: 24px 32px 32px 32px;">
        <p style="margin: 0 0 20px 0; font-size: 16px; color: ${COLORS.foreground}; font-weight: 600; line-height: 1.5;">Bonjour ${name},</p>
        
        <p style="margin: 0 0 16px 0; font-size: 14px; color: ${COLORS.mutedForeground}; line-height: 1.7; font-weight: 400;">
          Merci de votre intérêt pour mes publications. Vous recevrez désormais mes derniers articles et analyses techniques directement dans votre boîte mail.
        </p>
        
        <p style="margin: 0 0 28px 0; font-size: 14px; color: ${COLORS.mutedForeground}; line-height: 1.7; font-weight: 400;">
          Chaque mois, je partage 2 articles pour vous apporter des connaissances pratiques et des retours d'expérience dans les domaines de l'ingénierie électrique et industrielle.
        </p>

        <!-- Sujets -->
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: ${COLORS.muted}; border-radius: 8px; margin-bottom: 28px;">
          <tr><td style="padding: 28px 24px;">
            <p style="margin: 0 0 20px 0; font-size: 13px; font-weight: 600; color: ${COLORS.mutedForeground}; text-align: center; letter-spacing: 0.5px;">SUJETS ABORDÉS</p>
            
            <table cellpadding="0" cellspacing="0" border="0" width="100%">
              <tr>
                <td style="padding: 0 0 16px 0;">
                  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: ${COLORS.cardBg}; border-radius: 6px;">
                    <tr><td style="padding: 16px; text-align: center;">
                      <p style="margin: 0 0 4px 0; font-size: 15px; font-weight: 700; color: ${COLORS.foreground};">Énergie</p>
                      <p style="margin: 0; font-size: 12px; color: ${COLORS.mutedForeground}; font-weight: 500;">Réseaux électriques • Énergies renouvelables</p>
                    </td></tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="padding: 0 0 16px 0;">
                  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: ${COLORS.cardBg}; border-radius: 6px;">
                    <tr><td style="padding: 16px; text-align: center;">
                      <p style="margin: 0 0 4px 0; font-size: 15px; font-weight: 700; color: ${COLORS.foreground};">Industrie</p>
                      <p style="margin: 0; font-size: 12px; color: ${COLORS.mutedForeground}; font-weight: 500;">Installations électriques • Sécurité industrielle</p>
                    </td></tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td>
                  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: ${COLORS.cardBg}; border-radius: 6px;">
                    <tr><td style="padding: 16px; text-align: center;">
                      <p style="margin: 0 0 4px 0; font-size: 15px; font-weight: 700; color: ${COLORS.foreground};">Automatisme</p>
                      <p style="margin: 0; font-size: 12px; color: ${COLORS.mutedForeground}; font-weight: 500;">Automatisation industrielle • Maintenance prédictive</p>
                    </td></tr>
                  </table>
                </td>
              </tr>
            </table>
          </td></tr>
        </table>

        <!-- Bouton -->
        <table cellpadding="0" cellspacing="0" border="0" width="100%">
          <tr><td align="center">
            <a href="https://alainpaluku.com/articles" style="display: inline-block; background-color: ${COLORS.accent}; color: ${COLORS.accentForeground}; padding: 14px 36px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">Découvrir les articles</a>
          </td></tr>
        </table>
        
        <p style="margin: 28px 0 0 0; font-size: 13px; color: ${COLORS.mutedForeground}; text-align: center; line-height: 1.6; font-weight: 400;">
          Cordialement,<br/>Alain Paluku
        </p>
      </td>
    </tr>

    ${createEmailFooter(true)}
  `;
  
  return createEmailLayout(content);
}
