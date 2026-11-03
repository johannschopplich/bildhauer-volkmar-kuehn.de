# bildhauer-volkmar-kuehn.de

Website of the sculptor Volkmar Kühn.

## Commands

```bash
pnpm dev                           # frontend only; PHP on Herd or `composer start`
pnpm build
pnpm lint
pnpm format:check
pnpm test:types
scripts/sync-content.sh --upload   # dry run; --apply rsyncs storage/content (not in git), --download pulls
```

## Conventions

- UnoCSS class order: shortcuts/marker utilities (`hyphenate`, `animate-scale`,
  …) → `[--var:…]` assignments → position/layout → display/flex/grid → spacing →
  sizing → typography → colors/background → border → effects/transitions →
  `after:`/`before:` block → state variants → breakpoint block last. Everything
  with a breakpoint prefix (`md:p-5xl`, `max-md:text-sm`) gathers at the very end
  of the string: `max-*` first, then ascending `sm:` → `md:` → `lg:` → `xl:`;
  within one breakpoint loosely follow the base group order, with breakpoint+state
  combos at the end of that run. Loose ordering within groups.
- The UnoCSS scanner only sees `site/{snippets,templates}/**/*` – classes that
  exist only in TS need inline styles or a safelist.
