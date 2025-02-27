import type { TornisData } from "../utils";
import { getTornis } from "../utils";

export function install() {
  const { watchViewport } = getTornis();
  watchViewport(updateViewportProps);
}

function updateViewportProps({ scroll, size }: TornisData) {
  if (scroll.changed) {
    let scrollOffset = 0;

    if (size.docY !== size.y) {
      // Scroll offset only makes sense if the document height is not equal to the viewport height
      scrollOffset = scroll.top / (size.docY - size.y);
    }

    // Clamp values
    scrollOffset = Math.min(Math.max(scrollOffset, 0), 1);

    document.documentElement.style.setProperty(
      "--scrollY",
      scrollOffset.toString(),
    );
  }
}
