export function initializeWithAstro(initFn: () => void): void {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initFn);
  } else {
    initFn();
  }
  document.addEventListener("astro:page-load", initFn);
}
