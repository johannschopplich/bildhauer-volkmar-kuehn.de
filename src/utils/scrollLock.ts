export const isIOS =
  window.navigator.userAgent &&
  /iP(ad|hone|od)/.test(window.navigator.userAgent);

function checkOverflowScroll(ele: Element): boolean {
  const style = window.getComputedStyle(ele);
  if (
    style.overflowX === "scroll" ||
    style.overflowY === "scroll" ||
    (style.overflowX === "auto" && ele.clientHeight < ele.scrollHeight) ||
    (style.overflowY === "auto" && ele.clientWidth < ele.scrollWidth)
  ) {
    return true;
  } else {
    const parent = ele.parentNode as Element;
    if (!parent || parent.tagName === "BODY") return false;

    return checkOverflowScroll(parent);
  }
}

function preventDefault(rawEvent: TouchEvent): boolean {
  const e = rawEvent || window.event;
  const _target = e.target as Element;

  // Do not prevent if element or parentNodes have overflow: scroll set.
  if (checkOverflowScroll(_target)) return false;

  // Do not prevent if the event has more than one touch (usually meaning this is a multi touch gesture like pinch to zoom).
  if (e.touches.length > 1) return true;

  if (e.preventDefault) e.preventDefault();

  return false;
}

/**
 * Lock scrolling of the element
 */
export function scrollLock(
  element?: HTMLElement | SVGElement | Window | Document | null
) {
  let isLocked = false;
  let initialOverflow: CSSStyleDeclaration["overflow"];

  if (element) {
    initialOverflow = (element as HTMLElement).style.overflow;
  }

  const listener = (e: Event) => {
    preventDefault(e as TouchEvent);
  };

  const lock = () => {
    if (!element || isLocked) return;
    if (isIOS) {
      element.addEventListener("touchmove", listener, { passive: false });
    }
    (element as HTMLElement).style.overflow = "hidden";
    isLocked = true;
  };

  const unlock = () => {
    if (!element || !isLocked) return;
    if (isIOS) {
      element.removeEventListener("touchmove", listener);
    }
    (element as HTMLElement).style.overflow = initialOverflow;
    isLocked = false;
  };

  return {
    lock,
    unlock,
  };
}
