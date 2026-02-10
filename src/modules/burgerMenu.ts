import { onClickOutside, scrollLock } from "../utils";

type BurgerStatus = "open" | "closed";

class BurgerMenu extends HTMLElement {
  private _status: BurgerStatus = "closed";
  private _enabled = false;
  private trigger?: HTMLElement;
  private panel?: HTMLElement;
  private lock?: () => void;
  private unlock?: () => void;
  private resizeObserver?: ResizeObserver;
  private stopClickOutside?: () => void;
  private boundOnKeyDown = this.onKeyDown.bind(this);

  get status() {
    return this._status;
  }

  set status(value: BurgerStatus) {
    if (this._status === value) return;
    this._status = value;
    this.update();
  }

  get enabled() {
    return this._enabled;
  }

  set enabled(value: boolean) {
    if (this._enabled === value) return;
    this._enabled = value;
    this.update();
  }

  connectedCallback() {
    this.trigger = this.querySelector<HTMLElement>(
      '[data-element="navigation-trigger"]',
    )!;
    this.panel = document.querySelector<HTMLElement>(
      '[data-element="navigation-panel"]',
    )!;

    if (!this.trigger || !this.panel) return;

    const { lock, unlock } = scrollLock(document.documentElement);
    this.lock = lock;
    this.unlock = unlock;

    this.update();

    this.trigger.addEventListener("click", (event: Event) => {
      event.preventDefault();
      if (this._status === "closed") window.scrollTo(0, 0);
      this.toggle();
    });

    document.addEventListener("keydown", this.boundOnKeyDown);

    this.stopClickOutside = onClickOutside(
      document.querySelector<HTMLElement>(
        '[data-element="navigation-content"]',
      )!,
      () => {
        this.toggle("closed");
      },
      { ignore: ['[data-element="navigation-trigger"]'] },
    );

    this.resizeObserver = new ResizeObserver(([entry]) => {
      this.enabled = entry.contentRect.width <= 768;
    });

    this.resizeObserver.observe(this.parentNode as Element);
  }

  disconnectedCallback() {
    document.removeEventListener("keydown", this.boundOnKeyDown);
    this.resizeObserver?.disconnect();
    this.stopClickOutside?.();
  }

  toggle(forcedStatus?: BurgerStatus) {
    this.status =
      forcedStatus ?? (this._status === "closed" ? "open" : "closed");
  }

  private onKeyDown(event: KeyboardEvent) {
    if (event.key === "Escape" && this._status === "open" && this._enabled) {
      this.toggle("closed");
      this.trigger?.focus();
    }
  }

  private update() {
    if (!this.trigger || !this.panel) return;

    const isOpen = this._status === "open";

    // Update custom element attributes
    this.setAttribute("status", this._status);
    this.setAttribute("enabled", this._enabled ? "true" : "false");

    // Update trigger ARIA
    this.trigger.setAttribute("aria-expanded", String(isOpen));
    this.trigger.setAttribute(
      "aria-label",
      isOpen ? "Menü schließen" : "Menü öffnen",
    );

    // Use inert to manage focus and pointer events on the panel
    this.panel.inert = !isOpen && this._enabled;

    // Toggle panel visibility class and scroll lock
    this.panel.classList.toggle("is-open", isOpen);
    if (isOpen && this._enabled) {
      this.lock?.();
    } else {
      this.unlock?.();
    }
  }
}

export function install() {
  window.customElements.define("burger-menu", BurgerMenu);
}
