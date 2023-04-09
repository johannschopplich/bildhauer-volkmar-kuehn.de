import { getRem } from "../utils";

export async function install() {
  const elements = [
    ...document.querySelectorAll<HTMLElement>("[data-zoomable]"),
  ];

  if (!matchMedia("(min-width: 768px)").matches || elements.length === 0)
    return;

  const { default: mediumZoom } = await import("medium-zoom");
  const margin = getRem();

  mediumZoom(elements, {
    background: "transparent",
    margin,
  });
}
