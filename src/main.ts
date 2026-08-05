/// <reference types="vite/client" />

import "./styles/main.css";

interface AppModule {
  install?: () => void | Promise<void>;
}

interface PageTemplate {
  default?: () => void | Promise<void>;
}

// Remove the temporary stylesheet that prevents a flash of unstyled content
// before Vite injects its own styles.
if (import.meta.env.DEV) {
  for (const el of document.querySelectorAll(`[id*="vite-dev"]`)) {
    el.remove();
  }
}

for (const mod of Object.values(
  import.meta.glob<AppModule>("./modules/*.ts", {
    eager: true,
  }),
)) {
  mod.install?.();
}

const templates = Object.fromEntries(
  Object.entries(import.meta.glob<PageTemplate>("./templates/*.ts")).map(
    ([key, value]) => [key.slice(12, -3), value],
  ),
);

const { template = "default" } = document.body.dataset;
templates[template]?.().then((mod) => mod.default?.());
