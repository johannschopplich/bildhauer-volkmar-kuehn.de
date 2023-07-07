import { getTornis } from "../utils";
import type { TornisData } from "../utils";

export function install() {
  const { watchViewport } = getTornis();
  watchViewport(updateViewportProps);
}

function updateViewportProps({ scroll, size }: TornisData) {
  if (scroll.changed) {
    let scrollOffset = scroll.top / (size.docY - size.y);

    // Clamp values
    scrollOffset = Math.min(Math.max(scrollOffset, 0), 1);

    document.documentElement.style.setProperty(
      "--scrollY",
      scrollOffset.toString(),
    );
  }
}
