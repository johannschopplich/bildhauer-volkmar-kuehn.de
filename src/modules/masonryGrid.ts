export interface GridInstance {
  el: HTMLElement;
  items: ReadonlyArray<HTMLElement>;
  gap: number;
  columns: number;
  count: number;
}

export function install() {
  initMasonryGrid();
}

export function initMasonryGrid(selectors = ".masonry-grid") {
  const elements = [...document.querySelectorAll<HTMLElement>(selectors)];

  // Bail if no elements where found
  if (!elements.length) return;

  // Bail if masonry layouts are already supported by the browser
  // if (getComputedStyle(elements[0]).gridTemplateRows === "masonry") return;

  for (const el of elements) {
    const grid: GridInstance = {
      el,
      items: [...el.children] as HTMLElement[],
      gap: Number.parseFloat(getComputedStyle(el).rowGap),
      columns: 0,
      count: 0,
    };

    const debouncedUpdateGridItems = debounce(updateGridItems, 100);
    const resizeObserver = new ResizeObserver(() =>
      debouncedUpdateGridItems(grid),
    );
    resizeObserver.observe(grid.el);
  }
}

function updateGridItems(grid: GridInstance) {
  const columns = getComputedStyle(grid.el).gridTemplateColumns.split(
    " ",
  ).length;

  for (const column of grid.items) {
    const { height } = column.getBoundingClientRect();
    const h = height.toString();

    if (h !== column.dataset?.h) {
      column.dataset.h = h;
      grid.count++;
    }
  }

  // Bail if the number of columns hasn't changed
  if (grid.columns === columns && !grid.count) return;

  // Update the number of columns
  grid.columns = columns;

  // Revert to initial positioning, no margin
  for (const { style } of grid.items) style.removeProperty("margin-top");

  // If we have more than one column
  if (grid.columns > 1) {
    for (const [index, column] of grid.items.slice(columns).entries()) {
      // Bottom edge of item above
      const { bottom: prevBottom } = grid.items[index].getBoundingClientRect();
      // Top edge of current item
      const { top } = column.getBoundingClientRect();

      column.style.marginTop = `${prevBottom + grid.gap - top}px`;
    }
  }

  grid.count = 0;
}

function debounce<T extends (...args: any[]) => void>(fn: T, delay: number) {
  let timeout: ReturnType<typeof setTimeout> | undefined;

  return function (...args: Parameters<T>) {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = undefined;
      fn(...args);
    }, delay);
  };
}
