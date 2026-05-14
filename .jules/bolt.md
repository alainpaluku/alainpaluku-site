## 2025-05-13 - [DOM Layout Thrashing in Filters]
**Learning:** Calling `document.querySelectorAll` and `getAttribute` on every keystroke during client-side filtering causes unnecessary DOM reads, which can lead to lag on pages with many elements.
**Action:** Always cache static DOM node lists and their required `data-*` attributes upfront during component initialization to transform O(N) DOM reads per event into fast memory lookups.

## 2025-05-14 - [Optimize DOM Writes during Client-Side Filtering]
**Learning:** During highly iterative operations like client-side search filtering (triggered by input events), blindly setting `element.style.display` on every list item for every keystroke forces unnecessary style invalidations, creating significant rendering lag.
**Action:** Extend in-memory caching to include an item's current `display` state, ensuring DOM properties are only overwritten when the target state actually diverges from the current state. Also short-circuit expensive string searches if an element is already hidden by another condition (like category filtering).
