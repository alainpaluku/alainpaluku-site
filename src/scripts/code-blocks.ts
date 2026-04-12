/**
 * Améliore les blocs de code dans les articles Markdown
 * Ajoute les boutons Copier et Voir plus/moins
 */

import { initializeWithAstro } from "../lib/client-utils";

// Configuration
const CONFIG = {
    MAX_HEIGHT: 300,
    COPY_FEEDBACK_DURATION: 2000,
    SELECTORS: {
        codeBlocks: '.prose pre',
        code: 'code',
        actions: '.code-actions',
    },
    CLASSES: {
        actions: 'code-actions',
        button: 'code-action-btn',
        copyBtn: 'copy-btn',
        expandBtn: 'expand-btn',
        hidden: 'hidden',
    },
};

/**
 * Crée un bouton avec texte alternatif
 */
function createButton(className: string, title: string, texts: { default: string; alt: string }) {
    const button = document.createElement('button');
    button.className = `${CONFIG.CLASSES.button} ${className}`;
    button.title = title;
    button.innerHTML = `
        <span class="btn-text default-text">${texts.default}</span>
        <span class="btn-text alt-text ${CONFIG.CLASSES.hidden}">${texts.alt}</span>
    `;
    return button;
}

/**
 * Bascule entre deux textes d'un bouton
 */
function toggleButtonText(button: HTMLButtonElement, showAlt: boolean) {
    const defaultText = button.querySelector('.default-text');
    const altText = button.querySelector('.alt-text');

    if (showAlt) {
        defaultText?.classList.add(CONFIG.CLASSES.hidden);
        altText?.classList.remove(CONFIG.CLASSES.hidden);
    } else {
        defaultText?.classList.remove(CONFIG.CLASSES.hidden);
        altText?.classList.add(CONFIG.CLASSES.hidden);
    }
}

/**
 * Gère la fonctionnalité de copie
 */
async function handleCopy(button: HTMLButtonElement, code: HTMLElement) {
    const codeText = code.textContent || '';

    try {
        await navigator.clipboard.writeText(codeText);
        toggleButtonText(button, true);

        setTimeout(() => {
            toggleButtonText(button, false);
        }, CONFIG.COPY_FEEDBACK_DURATION);
    } catch (err) {
        console.error('Échec de la copie:', err);
    }
}

/**
 * Gère la fonctionnalité d'expansion/réduction
 */
function handleExpand(button: HTMLButtonElement, code: HTMLElement) {
    const isExpanded = code.style.maxHeight === 'none';

    if (isExpanded) {
        code.style.maxHeight = `${CONFIG.MAX_HEIGHT}px`;
        button.title = 'Voir plus';
        toggleButtonText(button, false);
    } else {
        code.style.maxHeight = 'none';
        button.title = 'Voir moins';
        toggleButtonText(button, true);
    }
}

/**
 * Améliore un bloc de code individuel
 */
function enhanceCodeBlock(pre: Element) {
    // Éviter le traitement multiple
    if (pre.querySelector(`.${CONFIG.CLASSES.actions}`)) return;

    const code = pre.querySelector(CONFIG.SELECTORS.code);
    if (!code) return;

    // Créer le conteneur des boutons
    const actionsDiv = document.createElement('div');
    actionsDiv.className = CONFIG.CLASSES.actions;

    // Créer les boutons
    const copyBtn = createButton(
        CONFIG.CLASSES.copyBtn,
        'Copier le code',
        { default: 'Copier', alt: 'Copié !' }
    );

    const expandBtn = createButton(
        CONFIG.CLASSES.expandBtn,
        'Voir plus / Voir moins',
        { default: 'Voir plus', alt: 'Voir moins' }
    );

    // Ajouter les boutons
    actionsDiv.appendChild(copyBtn);
    actionsDiv.appendChild(expandBtn);
    pre.appendChild(actionsDiv);

    // Attacher les événements
    copyBtn.addEventListener('click', () => handleCopy(copyBtn, code as HTMLElement));

    // Gérer l'expansion seulement si le code est long
    const codeElement = code as HTMLElement;
    const codeHeight = codeElement.scrollHeight;
    
    if (codeHeight > CONFIG.MAX_HEIGHT) {
        codeElement.style.maxHeight = `${CONFIG.MAX_HEIGHT}px`;
        codeElement.style.overflowY = 'auto';
        codeElement.style.transition = 'max-height 0.3s ease';
        expandBtn.addEventListener('click', () => handleExpand(expandBtn, codeElement));
    } else {
        expandBtn.style.display = 'none';
    }
}

/**
 * Améliore tous les blocs de code de la page
 */
export function enhanceCodeBlocks() {
    const codeBlocks = document.querySelectorAll(CONFIG.SELECTORS.codeBlocks);
    codeBlocks.forEach(enhanceCodeBlock);
}

// Initialisation avec support Astro
if (typeof window !== 'undefined') {
    initializeWithAstro(enhanceCodeBlocks);
}
