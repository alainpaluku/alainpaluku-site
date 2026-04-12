/**
 * Rend les tableaux responsives en ajoutant des data-labels
 * pour le style card en mode mobile
 */

import { initializeWithAstro } from "../lib/client-utils";

function makeTablesResponsive() {
  const tables = document.querySelectorAll('.prose table');
  
  tables.forEach((table) => {
    const headers: string[] = [];
    const headerCells = table.querySelectorAll('thead th');
    
    // Récupérer les en-têtes
    headerCells.forEach((th) => {
      headers.push(th.textContent?.trim() || '');
    });
    
    // Ajouter data-label à chaque cellule
    const rows = table.querySelectorAll('tbody tr');
    rows.forEach((row) => {
      const cells = row.querySelectorAll('td');
      cells.forEach((cell, index) => {
        if (headers[index]) {
          cell.setAttribute('data-label', headers[index]);
        }
      });
    });
  });
}

// Initialisation avec support Astro
if (typeof window !== 'undefined') {
  initializeWithAstro(makeTablesResponsive);
}

export { makeTablesResponsive };
