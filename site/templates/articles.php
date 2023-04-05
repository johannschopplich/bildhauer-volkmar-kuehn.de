<?php
/** @var \Kirby\Cms\App $kirby */
/** @var \Kirby\Cms\Site $site */
/** @var \Kirby\Cms\Page $page */
/** @var \Kirby\Cms\Collection $query */
snippet('layouts/default', slots: true);
?>

<div class="py-4xl">
  <div class="max-w-screen-md mx-lg sm:mx-3xl">
    <div class="mb-5xl">
      <?php snippet('title', ['title' => $page->title()->escape()]) ?>
    </div>

    <?php snippet('articles', ['query' => $query]) ?>
  </div>
</div>

<?php endsnippet() ?>
