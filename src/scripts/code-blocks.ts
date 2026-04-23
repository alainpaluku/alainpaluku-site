import { initializeWithAstro } from "../lib/client-utils";

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

function toggleButtonText(button: HTMLButtonElement, showAlt: boolean) {
  button.querySelector('.default-text')?.classList.toggle(CONFIG.CLASSES.hidden, showAlt);
  button.querySelector('.alt-text')?.classList.toggle(CONFIG.CLASSES.hidden, !showAlt);
}

async function handleCopy(button: HTMLButtonElement, code: HTMLElement) {
  try {
    await navigator.clipboard.writeText(code.textContent || '');
    toggleButtonText(button, true);
    setTimeout(() => toggleButtonText(button, false), CONFIG.COPY_FEEDBACK_DURATION);
  } catch (err) {
    console.error('Échec de la copie:', err);
  }
}

function handleExpand(button: HTMLButtonElement, code: HTMLElement) {
  const isExpanded = code.style.maxHeight === 'none';
  code.style.maxHeight = isExpanded ? `${CONFIG.MAX_HEIGHT}px` : 'none';
  button.title = isExpanded ? 'Voir plus' : 'Voir moins';
  toggleButtonText(button, !isExpanded);
}

function enhanceCodeBlock(pre: Element) {
  if (pre.querySelector(`.${CONFIG.CLASSES.actions}`)) return;

  const code = pre.querySelector(CONFIG.SELECTORS.code) as HTMLElement | null;
  if (!code) return;

  const actionsDiv = document.createElement('div');
  actionsDiv.className = CONFIG.CLASSES.actions;

  const copyBtn = createButton(CONFIG.CLASSES.copyBtn, 'Copier le code', { default: 'Copier', alt: 'Copié !' });
  const expandBtn = createButton(CONFIG.CLASSES.expandBtn, 'Voir plus / Voir moins', { default: 'Voir plus', alt: 'Voir moins' });

  actionsDiv.appendChild(copyBtn);
  actionsDiv.appendChild(expandBtn);
  pre.appendChild(actionsDiv);

  copyBtn.addEventListener('click', () => handleCopy(copyBtn, code));

  if (code.scrollHeight > CONFIG.MAX_HEIGHT) {
    code.style.maxHeight = `${CONFIG.MAX_HEIGHT}px`;
    code.style.overflowY = 'auto';
    code.style.transition = 'max-height 0.3s ease';
    expandBtn.addEventListener('click', () => handleExpand(expandBtn, code));
  } else {
    expandBtn.style.display = 'none';
  }
}

export function enhanceCodeBlocks() {
  document.querySelectorAll(CONFIG.SELECTORS.codeBlocks).forEach(enhanceCodeBlock);
}

if (typeof window !== 'undefined') {
  initializeWithAstro(enhanceCodeBlocks);
}
