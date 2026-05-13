## 2025-05-13 - [DOM Layout Thrashing in Filters]
**Learning:** Calling `document.querySelectorAll` and `getAttribute` on every keystroke during client-side filtering causes unnecessary DOM reads, which can lead to lag on pages with many elements.
**Action:** Always cache static DOM node lists and their required `data-*` attributes upfront during component initialization to transform O(N) DOM reads per event into fast memory lookups.
