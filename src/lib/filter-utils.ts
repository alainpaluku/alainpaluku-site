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

  function setButtonActive(button: Element, active: boolean) {
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
    const items = document.querySelectorAll(itemSelector);
    let visibleCount = 0;

    items.forEach((item) => {
      const title = item.getAttribute("data-title") || "";
      const description = item.getAttribute("data-description") || "";
      const tags = item.getAttribute("data-tags") || "";
      const category = item.getAttribute("data-category") || "";

      const matchesSearch =
        title.includes(searchTerm) ||
        description.includes(searchTerm) ||
        tags.includes(searchTerm) ||
        category.includes(searchTerm);

      const matchesFilter =
        !activeFilter ||
        (filterAttribute === "data-tags" ? tags.includes(activeFilter) : category === activeFilter);

      (item as HTMLElement).style.display = matchesSearch && matchesFilter ? "block" : "none";
      if (matchesSearch && matchesFilter) visibleCount++;
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
