import { isIOS } from "./shared";

/**
 * Lock scrolling of the element.
 */
export function scrollLock(
  element: HTMLElement | SVGElement | Window | Document,
  initialValue = false
) {
  let isLocked = initialValue;
  const _element = element as HTMLElement;
  const initialOverflow = _element.style.overflow;

  const listener = (e: Event) => {
    preventDefault(e as TouchEvent);
  };

  const lock = () => {
    if (isLocked) return;
    if (isIOS) {
      element.addEventListener("touchmove", listener, { passive: false });
    }
    _element.style.overflow = "hidden";
    isLocked = true;
  };

  const unlock = () => {
    if (!isLocked) return;
    if (isIOS) {
      element.removeEventListener("touchmove", listener);
    }
    _element.style.overflow = initialOverflow;
    isLocked = false;
  };

  return {
    lock,
    unlock,
  };
}

function checkOverflowScroll(element: Element): boolean {
  const style = window.getComputedStyle(element);
  if (
    style.overflowX === "scroll" ||
    style.overflowY === "scroll" ||
    (style.overflowX === "auto" &&
      element.clientHeight < element.scrollHeight) ||
    (style.overflowY === "auto" && element.clientWidth < element.scrollWidth)
  ) {
    return true;
  }

  const parent = element.parentNode as Element | null;
  if (!parent || parent.tagName === "BODY") return false;

  return checkOverflowScroll(parent);
}

function preventDefault(rawEvent: TouchEvent): boolean {
  const event = rawEvent || window.event;
  const target = event.target as Element;

  // Do not prevent if element or parentNodes have overflow: scroll set.
  if (checkOverflowScroll(target)) return false;

  // Do not prevent if the event has more than one touch (usually meaning this is a multi touch gesture like pinch to zoom).
  if (event.touches.length > 1) return true;

  event.preventDefault?.();

  return false;
}
