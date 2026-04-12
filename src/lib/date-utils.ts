/**
 * Utilitaires pour la gestion des dates
 */

/**
 * Formate une date en GMT+2 (CAT - Central Africa Time)
 */
export function formatDateGMT2(date: Date = new Date()): {
  dateFormatted: string;
  timeFormatted: string;
  isoString: string;
} {
  const gmt2Date = new Date(date.getTime() + 2 * 60 * 60 * 1000);
  
  const dateFormatted = gmt2Date.toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  
  const timeFormatted = gmt2Date.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  
  return {
    dateFormatted,
    timeFormatted,
    isoString: gmt2Date.toISOString(),
  };
}
