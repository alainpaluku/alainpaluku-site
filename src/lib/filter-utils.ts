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

  function filterItems() {
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
        (filterAttribute === "data-tags"
          ? tags.includes(activeFilter)
          : category === activeFilter);

      if (matchesSearch && matchesFilter) {
        (item as HTMLElement).style.display = "block";
        visibleCount++;
      } else {
        (item as HTMLElement).style.display = "none";
      }
    });

    if (visibleCountEl) {
      visibleCountEl.textContent = visibleCount.toString();
    }

    if (noResults && container) {
      if (visibleCount === 0) {
        noResults.classList.remove("hidden");
        container.classList.add("opacity-0");
      } else {
        noResults.classList.add("hidden");
        container.classList.remove("opacity-0");
      }
    }
  }

  searchInput?.addEventListener("input", filterItems);

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filterValue = button.getAttribute(
        filterAttribute === "data-tags" ? "data-tag" : "data-category"
      );

      if (activeFilter === filterValue) {
        activeFilter = null;
        button.classList.remove("border-accent", "bg-accent/10", "text-accent");
        button.classList.add(
          "border-border",
          "bg-muted/20",
          "text-muted-foreground"
        );
        clearFilter?.classList.add("hidden");
      } else {
        filterButtons.forEach((btn) => {
          btn.classList.remove("border-accent", "bg-accent/10", "text-accent");
          btn.classList.add(
            "border-border",
            "bg-muted/20",
            "text-muted-foreground"
          );
        });

        activeFilter = filterValue;
        button.classList.remove(
          "border-border",
          "bg-muted/20",
          "text-muted-foreground"
        );
        button.classList.add("border-accent", "bg-accent/10", "text-accent");
        clearFilter?.classList.remove("hidden");
      }

      filterItems();
    });
  });

  clearFilter?.addEventListener("click", () => {
    activeFilter = null;
    if (searchInput) searchInput.value = "";
    filterButtons.forEach((btn) => {
      btn.classList.remove("border-accent", "bg-accent/10", "text-accent");
      btn.classList.add(
        "border-border",
        "bg-muted/20",
        "text-muted-foreground"
      );
    });
    clearFilter.classList.add("hidden");
    filterItems();
  });
}
