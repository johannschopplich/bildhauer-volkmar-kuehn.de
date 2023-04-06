export interface TornisData {
  scroll: {
    changed: boolean;
    left: number;
    right: number;
    top: number;
    bottom: number;
  };
  size: { changed: boolean; x: number; y: number; docY: number };
  mouse: { changed: boolean; x: number; y: number };
  position: {
    changed: boolean;
    left: number;
    right: number;
    top: number;
    bottom: number;
  };
}

export type TornisCallback = (data: TornisData) => void;

/**
 * Tornis is a class that watches for changes in the browser window
 */
class Tornis {
  lastX: number;
  lastY: number;
  lastWidth: number;
  lastHeight: number;
  lastMouseX: number;
  lastMouseY: number;
  lastWindowX: number;
  lastWindowY: number;
  scrollHeight: number;
  scrollChange: boolean;
  sizeChange: boolean;
  mouseChange: boolean;
  positionChange: boolean;
  currWidth: number;
  currHeight: number;
  currMouseX: number;
  currMouseY: number;
  updating: boolean;
  callbacks: TornisCallback[] = [];

  // Set a whole load of initial values
  constructor() {
    this.lastX = 0;
    this.lastY = 0;
    this.lastWidth = window.innerWidth;
    this.lastHeight = window.innerHeight;
    this.lastMouseX = 0;
    this.lastMouseY = 0;
    this.lastWindowX = window.screenX;
    this.lastWindowY = window.screenY;

    this.scrollHeight = document.body.scrollHeight;

    this.scrollChange = false;
    this.sizeChange = false;
    this.mouseChange = false;
    this.positionChange = false;

    this.currWidth = window.innerWidth;
    this.currHeight = window.innerHeight;
    this.currMouseX = 0;
    this.currMouseY = 0;

    // Flag to limit `requestAnimationFrame` renders
    this.updating = false;

    // Bind this to ease class methods
    this.update = this.update.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.handleMouse = this.handleMouse.bind(this);
    this.formatData = this.formatData.bind(this);
    this.watch = this.watch.bind(this);
    this.unwatch = this.unwatch.bind(this);

    // Throttled event handlers
    this.handleResize = throttle(this.handleResize, 100);
    this.handleMouse = throttle(this.handleMouse, 50);

    // Bind event handlers to the window
    window.addEventListener("resize", this.handleResize);
    window.addEventListener("mousemove", this.handleMouse);

    // Begin the update loop
    requestAnimationFrame(this.update);
  }

  /**
   * Event handler to capture screen size
   */
  handleResize() {
    this.currWidth = window.innerWidth;
    this.currHeight = window.innerHeight;
  }

  /**
   * Event handler to capture mouse position
   */
  handleMouse(event: MouseEvent) {
    this.currMouseX = event.clientX;
    this.currMouseY = event.clientY;
  }

  /**
   * Returns a copy of the store data, formatted for public use
   */
  formatData(): TornisData {
    return {
      scroll: {
        changed: this.scrollChange,
        left: Math.floor(this.lastX),
        right: Math.floor(this.lastX + this.lastWidth),
        top: Math.floor(this.lastY),
        bottom: Math.floor(this.lastY + this.lastHeight),
      },
      size: {
        changed: this.sizeChange,
        x: Math.floor(this.lastWidth),
        y: Math.floor(this.lastHeight),
        docY: Math.floor(this.scrollHeight),
      },
      mouse: {
        changed: this.mouseChange,
        x: Math.floor(this.lastMouseX),
        y: Math.floor(this.lastMouseY),
      },
      position: {
        changed: this.positionChange,
        left: Math.floor(this.lastWindowX),
        right: Math.floor(this.lastWindowX + this.lastWidth),
        top: Math.floor(this.lastWindowY),
        bottom: Math.floor(this.lastWindowY + this.lastHeight),
      },
    };
  }

  /**
   * Update function to be looped by `requestAnimationFrame`
   */
  update() {
    const { currWidth, currHeight, currMouseX, currMouseY } = this;
    if (this.updating) return false;

    // Reset the flags
    this.scrollChange =
      this.sizeChange =
      this.mouseChange =
      this.positionChange =
        false;

    // Check window X position
    if (window.screenX !== this.lastWindowX) {
      this.positionChange = true;
      this.lastWindowX = window.screenX;
    }

    // Check window Y position
    if (window.screenY !== this.lastWindowY) {
      this.positionChange = true;
      this.lastWindowY = window.screenY;
    }

    // Check scroll X
    if (window.pageXOffset !== this.lastX) {
      this.scrollChange = true;
      this.lastX = window.pageXOffset;
    }

    // Check scroll Y
    if (window.pageYOffset !== this.lastY) {
      this.scrollChange = true;
      this.lastY = window.pageYOffset;
    }

    // Check width
    if (currWidth !== this.lastWidth) {
      this.lastWidth = currWidth;
      this.scrollHeight = document.body.scrollHeight;
      this.sizeChange = true;
    }

    // Check height
    if (currHeight !== this.lastHeight) {
      this.lastHeight = currHeight;
      this.sizeChange = true;
    }

    // Check mouse X
    if (currMouseX !== this.lastMouseX) {
      this.lastMouseX = currMouseX;
      this.mouseChange = true;
    }

    // Check mouse y
    if (currMouseY !== this.lastMouseY) {
      this.lastMouseY = currMouseY;
      this.mouseChange = true;
    }

    // Finally, we can invoke the callbacks, but if something has changed
    if (
      this.scrollChange ||
      this.sizeChange ||
      this.mouseChange ||
      this.positionChange
    ) {
      // Pass the formatted data into each watched function
      const data = this.formatData();
      for (const callback of this.callbacks) {
        callback(data);
      }
    }

    // Reset and loop this method
    this.updating = false;
    requestAnimationFrame(this.update);
  }

  /**
   * Subscribes a function to the "watched functions" list.
   * Watched functions will be automatically called on update.
   */
  watch(callback: TornisCallback, callOnWatch = true) {
    if (callOnWatch) {
      // Get a copy of the store
      const firstRunData = this.formatData();
      const { scroll, size, mouse, position } = firstRunData;

      // Most watch functions will have guard clauses that check for change
      // To cicumvent this, we simulate that all values have changed on first run
      scroll.changed = true;
      mouse.changed = true;
      size.changed = true;
      position.changed = true;

      // Run the callback using the simulated data
      callback(firstRunData);
    }

    // Add the callback to the queue to ensure it runs on future updates
    this.callbacks.push(callback);
  }

  /**
   * Unsubscribe a function from the 'watched functions' list
   */
  unwatch(callback: TornisCallback) {
    const index = this.callbacks.indexOf(callback);
    if (index !== -1) {
      this.callbacks.splice(index, 1);
    }
  }
}

// Create a singleton instance of Tornis
const tornis = new Tornis();

// Export the Tornis API functions
export function getTornis() {
  return {
    watchViewport: tornis.watch,
    unwatchViewport: tornis.unwatch,
    getViewportState: tornis.formatData,
  };
}

function throttle<T extends (...args: any[]) => void>(
  fn: T,
  delay = 100
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  let waiting = false;

  return function (...args: Parameters<T>): void {
    const now = performance.now();
    const timeSinceLastCall = now - lastCall;

    if (timeSinceLastCall >= delay) {
      lastCall = now;
      fn(...args);
    } else if (!waiting) {
      waiting = true;

      setTimeout(() => {
        waiting = false;
        lastCall = performance.now();
        fn(...args);
      }, delay - timeSinceLastCall);
    }
  };
}
