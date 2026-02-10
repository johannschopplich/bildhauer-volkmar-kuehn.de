<?php

/** @var \Kirby\Cms\App $kirby */
/** @var \Kirby\Cms\Site $site */
/** @var \Kirby\Cms\Page $page */
?>
<!DOCTYPE html>
<html class="md:overscroll-none" lang="de">

<head>

  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <title><?= $page->customTitle()->or($page->title() . ' – ' . $site->title()) ?></title>

  <?php $meta = $page->meta() ?>
  <?= $meta->robots() ?>
  <?= $meta->jsonld() ?>
  <?= $meta->social() ?>

  <meta name="theme-color" content="#524231">
  <link rel="icon" href="/assets/images/favicon.svg" type="image/svg+xml">
  <link rel="manifest" href="/manifest.json">
  <link rel="apple-touch-icon" href="/assets/images/apple-touch-icon.png">

  <?php if (vite()->isDev()) : ?>
    <?= css('assets/dev/index.css?v=' . time(), ['id' => 'vite-dev-css']) ?>
  <?php endif ?>

  <?= vite()->js('main.ts') ?>
  <?= vite()->css('main.ts') ?>

  <?= css([
    'assets/fonts/Silverknife.css',
    'assets/fonts/Jost.css'
  ]) ?>

</head>

<body class="min-h-[100svh] grid grid-rows-[auto_1fr] children:min-w-0 md:grid-rows-none md:grid-cols-[1fr_2fr]" data-template="<?= $page->intendedTemplate()->name() ?>">

  <aside id="sidebar">
    <a href="#main" class="skip-link">Zum Inhalt springen</a>
    <?php snippet('navigation') ?>
  </aside>

  <main id="main" class="relative" tabindex="-1">
    <div>
      <?= $slot ?>
    </div>

    <?php snippet('footer') ?>
  </main>

</body>

</html>
