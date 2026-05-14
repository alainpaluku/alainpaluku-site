export function createFilterSystem(
  searchInputId: string,
  containerSelector: string,
  itemSelector: string,
  filterButtonSelector: string,
  clearButtonId: string,
  counterId: string,
  noResultsId: string,
  filterAttribute: string = "data-category"
) {
  const searchInput = document.getElementById(searchInputId) as HTMLInputElement;
  const container = document.getElementById(containerSelector);
  const noResults = document.getElementById(noResultsId);
  const clearFilter = document.getElementById(clearButtonId);
  const filterButtons = document.querySelectorAll(filterButtonSelector);
  const visibleCountEl = document.getElementById(counterId);

  let activeFilter: string | null = null;

  const ACTIVE_CLASSES = ["border-accent", "bg-accent/10", "text-accent"];
  const INACTIVE_CLASSES = ["border-border", "bg-muted/20", "text-muted-foreground"];

  // ⚡ Bolt Performance Optimization: Cache DOM queries and data attributes
  // Avoids querying the DOM and calling getAttribute on every keystroke
  const items = Array.from(document.querySelectorAll(itemSelector)).map(el => {
    const htmlEl = el as HTMLElement;
    return {
      el: htmlEl,
      title: htmlEl.getAttribute("data-title") || "",
      description: htmlEl.getAttribute("data-description") || "",
      tags: htmlEl.getAttribute("data-tags") || "",
      category: htmlEl.getAttribute("data-category") || "",
      isVisible: true // ⚡ Bolt: Cache visibility state to prevent redundant DOM writes
    };
  });

  function setButtonActive(button: Element, active: boolean) {
    button.setAttribute("aria-pressed", active ? "true" : "false");
    if (active) {
      button.classList.remove(...INACTIVE_CLASSES);
      button.classList.add(...ACTIVE_CLASSES);
    } else {
      button.classList.remove(...ACTIVE_CLASSES);
      button.classList.add(...INACTIVE_CLASSES);
    }
  }

  function applyFilters() {
    const searchTerm = searchInput?.value.toLowerCase() || "";
    let visibleCount = 0;

    items.forEach((item) => {
      const matchesFilter =
        !activeFilter ||
        (filterAttribute === "data-tags" ? item.tags.includes(activeFilter) : item.category === activeFilter);

      // ⚡ Bolt: Short-circuit search if filter already hides item
      let matchesSearch = true;
      if (matchesFilter && searchTerm) {
        matchesSearch =
          item.title.includes(searchTerm) ||
          item.description.includes(searchTerm) ||
          item.tags.includes(searchTerm) ||
          item.category.includes(searchTerm);
      }

      const isVisibleTarget = matchesSearch && matchesFilter;

      // ⚡ Bolt: Only write to DOM if visibility state changed
      if (item.isVisible !== isVisibleTarget) {
        item.el.style.display = isVisibleTarget ? "block" : "none";
        item.isVisible = isVisibleTarget;
      }

      if (isVisibleTarget) visibleCount++;
    });

    if (visibleCountEl) visibleCountEl.textContent = visibleCount.toString();

    if (noResults && container) {
      noResults.classList.toggle("hidden", visibleCount > 0);
      container.classList.toggle("opacity-0", visibleCount === 0);
    }
  }

  searchInput?.addEventListener("input", applyFilters);

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filterValue = button.getAttribute(
        filterAttribute === "data-tags" ? "data-tag" : "data-category"
      );

      if (activeFilter === filterValue) {
        activeFilter = null;
        setButtonActive(button, false);
        clearFilter?.classList.add("hidden");
      } else {
        filterButtons.forEach((btn) => setButtonActive(btn, false));
        activeFilter = filterValue;
        setButtonActive(button, true);
        clearFilter?.classList.remove("hidden");
      }

      applyFilters();
    });
  });

  clearFilter?.addEventListener("click", () => {
    activeFilter = null;
    if (searchInput) searchInput.value = "";
    filterButtons.forEach((btn) => setButtonActive(btn, false));
    clearFilter.classList.add("hidden");
    applyFilters();
  });
}
