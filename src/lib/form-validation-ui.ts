/**
 * Utilitaires pour la validation UI des formulaires
 */

export function showError(
  input: HTMLElement,
  errorEl: HTMLElement | null,
  message: string
): void {
  input.classList.add("border-red-500");
  input.classList.remove("border-border");
  if (errorEl) {
    errorEl.textContent = message;
    errorEl.classList.remove("hidden");
  }
}

export function hideError(
  input: HTMLElement,
  errorEl: HTMLElement | null
): void {
  input.classList.remove("border-red-500");
  input.classList.add("border-border");
  if (errorEl) {
    errorEl.classList.add("hidden");
  }
}

export function validateField(
  input: HTMLInputElement | HTMLTextAreaElement,
  errorEl: HTMLElement | null,
  minLength: number,
  fieldName: string
): boolean {
  const value = input.value.trim();

  if (value.length === 0) {
    showError(input, errorEl, `${fieldName} requis`);
    return false;
  }

  if (value.length < minLength) {
    showError(
      input,
      errorEl,
      `${fieldName} doit contenir au moins ${minLength} caractères`
    );
    return false;
  }

  hideError(input, errorEl);
  return true;
}

export function validateEmailField(
  input: HTMLInputElement,
  errorEl: HTMLElement | null
): boolean {
  const value = input.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (value.length === 0) {
    showError(input, errorEl, "Email requis");
    return false;
  }

  if (!emailRegex.test(value)) {
    showError(input, errorEl, "Email invalide");
    return false;
  }

  hideError(input, errorEl);
  return true;
}

export function showStatus(
  statusEl: HTMLElement,
  message: string,
  isSuccess: boolean
): void {
  statusEl.textContent = message;
  statusEl.classList.remove("hidden");
  
  if (isSuccess) {
    statusEl.classList.remove("text-red-500");
    statusEl.classList.add("text-accent");
  } else {
    statusEl.classList.remove("text-accent");
    statusEl.classList.add("text-red-500");
  }
}
