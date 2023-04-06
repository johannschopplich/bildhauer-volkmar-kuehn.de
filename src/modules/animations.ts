import { getTornis } from "../utils/tornis";
import type { TornisData } from "../utils/tornis";

export function install() {
  const { watchViewport } = getTornis();
  watchViewport(updateViewportProps);
}

function updateViewportProps(data: TornisData) {
  const { scroll, size } = data;

  if (scroll.changed) {
    let scrollOffset = scroll.top / (size.docY - size.y);

    // Clamp values
    scrollOffset = Math.min(Math.max(scrollOffset, 0), 1);

    document.documentElement.style.setProperty(
      "--scrollY",
      scrollOffset.toString()
    );
  }
}
