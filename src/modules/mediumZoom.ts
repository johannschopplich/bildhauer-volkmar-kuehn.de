const selector = "[data-zoomable]";

export async function install() {
  const elements = [...document.querySelectorAll<HTMLElement>(selector)];

  const { default: mediumZoom } = await import("medium-zoom");
  const margin = parseFloat(
    getComputedStyle(document.body).getPropertyValue("font-size")
  );

  mediumZoom(elements, {
    background: "var(--du-color-background)",
    margin,
  });
}
