/**
 * Utilitaires pour les scripts côté client
 */

/**
 * Initialise un gestionnaire d'événements qui fonctionne avec la navigation Astro
 * @param initFn Fonction d'initialisation à appeler
 */
export function initializeWithAstro(initFn: () => void): void {
  // Initialiser au chargement
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initFn);
  } else {
    initFn();
  }

  // Réinitialiser après navigation Astro
  document.addEventListener("astro:page-load", initFn);
}
