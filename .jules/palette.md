## 2024-05-14 - Screen Reader Labels for Placeholder-Only Forms
**Learning:** Compact components (like the newsletter form in the footer and the search input in the articles listing) often omit visible `<label>` elements to save space, relying solely on `placeholder` text which is insufficient for screen reader users and fails WCAG guidelines.
**Action:** When working on compact UI forms, always ensure each `<input>` has an associated `<label>` using the `.sr-only` class to maintain visual design while providing explicit accessible names for screen readers.
