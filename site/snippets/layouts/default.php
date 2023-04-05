<?php
/** @var \Kirby\Cms\App $kirby */
/** @var \Kirby\Cms\Site $site */
/** @var \Kirby\Cms\Page $page */
?>
<!DOCTYPE html>
<html class="
  var-color-primary
  var-color-accent
  var-color-accent-200
  var-color-accent-500
  var-color-accent-700
  var-color-linen
" lang="de">
<head>

  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <title><?= $page->customTitle()->or($page->title() . ' – ' . $site->title()) ?></title>

  <?php $meta = $page->meta() ?>
  <?= $meta->robots() ?>
  <?= $meta->jsonld() ?>
  <?= $meta->social() ?>

  <meta name="theme-color" content="#776852">
  <?php /* <link rel="manifest" href="/manifest.json"> */ ?>
  <?php /* <link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png" sizes="180x180"> */ ?>
  <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌳</text></svg>">

  <?= vite()->js('main.ts') ?>
  <?= vite()->css('main.ts') ?>

  <?php if (vite()->isDev()) : ?>
    <?= css('assets/dev/index.css?v=' . time(), ['id' => 'vite-dev-css']) ?>
  <?php endif ?>

  <?= css('assets/fonts/Silverknife.css') ?>
  <?= css('https://indestructibletype.com/fonts/Jost.css') ?>

</head>

<body class="grid grid-rows-[auto_1fr] children:min-w-0 md:grid-rows-none md:grid-cols-[1fr_2fr]" data-template="<?= $page->intendedTemplate()->name() ?>">

  <div data-theme="dark">
    <a href="#main" class="skip-link">Zum Inhalt springen</a>
    <?php snippet('navigation') ?>
  </div>

  <main id="main" tabindex="-1">
    <div>
      <?= $slot ?>
    </div>

    <?php snippet('footer') ?>
  </main>

</body>
</html>
