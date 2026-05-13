## 2026-05-13 - Adding aria-labels to input fields missing labels
**Learning:** Some standalone input fields like search inputs or simple inline forms (like the newsletter form in the footer) rely solely on placeholders, which is insufficient for screen readers.
**Action:** When adding or reviewing input fields, always ensure an `aria-label` or an associated `<label>` tag is present, even if a placeholder is used, to maintain accessibility.
