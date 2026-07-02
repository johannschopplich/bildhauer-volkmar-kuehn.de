<div align="center">

[![Bildhauer Volkmar Kühn](./public/assets/images/og.jpg)](https://bildhauer-volkmar-kuehn.de)

# Bildhauer Volkmar Kühn

Website for the German sculptor Volkmar Kühn.

[Website](https://bildhauer-volkmar-kuehn.de)

</div>

## Why

[Volkmar Kühn](https://de.wikipedia.org/wiki/Volkmar_K%C3%BChn) is a German sculptor whose works shape public spaces, particularly in Gera – the town I grew up in. Since 1968 he has been living and working in the former Mildenfurth monastery, which the logo represents.

Shortly before Easter 2023, Dad asked me to build a small website for him: "Just a text and a photo. Really simple." A static page would have meant maintaining content by hand, so I spent the free Easter hours on a Kirby site the family can edit themselves – gallery, events, the Kunstspeicher Mildenfurth and the artist's vita included. A few design ideas that had been lying around as code snippets in unordered bookmarks finally found a home.

## How It's Built

- [Kirby 5](https://getkirby.com) – flat-file CMS; content lives under `storage/`, separate from the `public/` webroot
- [Vite](https://vite.dev) + [UnoCSS](https://unocss.dev) (preset-wind4) + TypeScript – styling and frontend build
- [kirby-helpers](https://github.com/johannschopplich/kirby-helpers) – meta, robots.txt, sitemap and a schema.org graph linking Wikipedia, Wikidata and GND

Images render as WebP srcsets with ThumbHash placeholders ([kirby-thumbhash](https://github.com/tobimori/kirby-thumbhash) + [unlazy](https://unlazy.byjohann.dev)) and zoom via [medium-zoom](https://github.com/francoischalifour/medium-zoom); the mobile nav is an accessible `<burger-menu>` web component.

## Development

1. Create your `.env` from the example:

   ```bash
   cp .env.development.example .env
   ```

2. Install dependencies:

   ```bash
   pnpm install
   composer install
   ```

3. Start the frontend watchers (Vite + UnoCSS, via mprocs):

   ```bash
   pnpm run dev
   ```

4. Run the PHP server in a second shell – or use a dev server of your choice (e.g. Laravel Valet):

   ```bash
   composer start
   ```

Build the production assets with `pnpm run build`. Deployment runs through [`scripts/ploi-deploy.sh`](./scripts/ploi-deploy.sh) on [ploi.io](https://ploi.io).

Content is not part of the repository – [`scripts/sync-content.sh`](./scripts/sync-content.sh) rsyncs `storage/content` between local and server (dry-run by default, `--apply` to execute).

## License

The code is licensed under [MIT](./LICENSE); words and images are licensed under [CC BY-NC-SA 4.0](./CC-BY-NC-SA-4.0).

© 2023-PRESENT [Johann Schopplich](https://github.com/johannschopplich)
