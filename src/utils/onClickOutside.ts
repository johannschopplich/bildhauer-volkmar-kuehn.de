import { isIOS } from "./shared";

export interface OnClickOutsideOptions {
  /**
   * List of elements that should not trigger the event.
   */
  ignore?: string[];
  /**
   * Use capturing phase for internal event listener.
   * @default true
   */
  capture?: boolean;
}

let _iOSWorkaround = false;

/**
 * Listen for clicks outside of an element.
 */
export function onClickOutside(
  target: HTMLElement | SVGElement,
  handler: (evt: PointerEvent) => void,
  options: OnClickOutsideOptions = {},
) {
  const { ignore = [], capture = true } = options;

  // Fixes: https://github.com/vueuse/vueuse/issues/1520
  // How it works: https://stackoverflow.com/a/39712411
  if (isIOS && !_iOSWorkaround) {
    _iOSWorkaround = true;
    for (const el of document.body.children) {
      el.addEventListener("click", () => {});
    }
  }

  let shouldListen = true;

  const shouldIgnore = (event: PointerEvent) => {
    return ignore.some((target) => {
      return Array.from(document.querySelectorAll(target)).some(
        (el) => el === event.target || event.composedPath().includes(el),
      );
    });
  };

  const listener = (event: Event) => {
    const _event = event as PointerEvent;

    if (
      !target ||
      target === _event.target ||
      _event.composedPath().includes(target)
    )
      return;

    if (_event.detail === 0) shouldListen = !shouldIgnore(_event);

    if (!shouldListen) {
      shouldListen = true;
      return;
    }

    handler(_event);
  };

  window.addEventListener("click", listener, { passive: true, capture });
  window.addEventListener(
    "pointerdown",
    (e) => {
      if (target)
        shouldListen = !e.composedPath().includes(target) && !shouldIgnore(e);
    },
    { passive: true },
  );

  const stop = () => {
    window.removeEventListener("click", listener, { capture });
    window.removeEventListener("pointerdown", listener, { capture });
  };

  return stop;
}
