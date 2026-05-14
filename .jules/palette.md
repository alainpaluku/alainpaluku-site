## 2024-05-14 - Screen Reader Labels for Placeholder-Only Forms
**Learning:** Compact components (like the newsletter form in the footer and the search input in the articles listing) often omit visible `<label>` elements to save space, relying solely on `placeholder` text which is insufficient for screen reader users and fails WCAG guidelines.
**Action:** When working on compact UI forms, always ensure each `<input>` has an associated `<label>` using the `.sr-only` class to maintain visual design while providing explicit accessible names for screen readers.

## 2024-05-19 - Missing Global Focus Indicators
**Learning:** The application's custom components (like buttons, links, toggles) lacked explicit `:focus-visible` styling, relying solely on hover states or outline-none, making keyboard navigation inaccessible.
**Action:** Always verify keyboard accessibility by checking focus states across all interactive elements. Implementing a global `:focus-visible` rule in the base stylesheet for `button, a, input, textarea, [tabindex]` ensures consistent focus indication and prevents accessibility regressions when building new custom components.
