import { scrollLock } from "../utils/scrollLock";

interface BurgerState {
  status: "open" | "closed";
}

const { lock, unlock } = scrollLock(document.documentElement);

class BurgerMenu extends HTMLElement {
  state: BurgerState;
  trigger?: HTMLElement;
  panel?: HTMLElement;
  focusableElements?: NodeListOf<HTMLElement>;

  constructor() {
    super();

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;

    this.state = new Proxy<BurgerState>(
      {
        status: "open",
      },
      {
        set(target, key, value) {
          if (key !== "status") return false;

          const oldValue = target[key];
          target[key] = value;

          if (oldValue !== value) {
            self.updateAttributes();
            self.updateFocus();
            self.updatePanelClass();
          }

          return true;
        },
      }
    );
  }

  connectedCallback() {
    this.trigger = this.querySelector<HTMLElement>(
      '[data-element="navigation-trigger"]'
    )!;
    this.panel = document.querySelector<HTMLElement>(
      '[data-element="navigation-panel"]'
    )!;
    this.focusableElements = getFocusableElements(this.panel);

    this.toggle();

    this.trigger.addEventListener("click", (event: Event) => {
      event.preventDefault();
      window.scrollTo(0, 0);
      this.toggle();
    });

    document.addEventListener("focusin", () => {
      if (
        !this.contains(document.activeElement) &&
        !this.panel!.contains(document.activeElement)
      ) {
        this.toggle("closed");
      }
    });
  }

  toggle(forcedStatus?: BurgerState["status"]) {
    if (forcedStatus) {
      this.state.status = forcedStatus;
      return;
    }

    this.state.status = this.state.status === "closed" ? "open" : "closed";
  }

  updateAttributes() {
    this.setAttribute("status", this.state.status);

    const ariaExpanded = this.state.status === "open" ? "true" : "false";
    const ariaLabel =
      this.state.status === "open" ? "Menü schließen" : "Menü öffnen";

    this.trigger?.setAttribute("aria-expanded", ariaExpanded);
    this.trigger?.setAttribute("aria-label", ariaLabel);
  }

  updateFocus() {
    if (!this.focusableElements) return;

    for (const element of this.focusableElements) {
      if (this.state.status === "open") {
        element.removeAttribute("tabindex");
      } else {
        element.setAttribute("tabindex", "-1");
      }
    }
  }
  updatePanelClass() {
    if (this.state.status === "open") {
      this.panel?.classList.add("is-open");
      lock();
    } else {
      this.panel?.classList.remove("is-open");
      unlock();
    }
  }
}

export function install() {
  window.customElements.define("burger-menu", BurgerMenu);
}

/**
 * Returns back a NodeList of focusable elements
 * that exist within the passed parnt HTMLElement
 */
function getFocusableElements(parent: HTMLElement) {
  return parent.querySelectorAll<HTMLElement>(
    'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled]), details:not([disabled]), summary:not(:disabled)'
  );
}
