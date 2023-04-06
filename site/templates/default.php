<?php
/** @var \Kirby\Cms\App $kirby */
/** @var \Kirby\Cms\Site $site */
/** @var \Kirby\Cms\Page $page */
snippet('layouts/default', slots: true);
?>

<div class="py-4xl">
  <div class="w-min border-b-2 border-primary-700 py-3xl mb-5xl">
    <div class="max-w-screen-sm ml-lg sm:ml-3xl">
      <?php snippet('title', ['title' => $page->title()->escape()]) ?>
    </div>
  </div>

  <div class="max-w-screen-md mx-lg sm:mx-3xl">
    <?php if ($page->intendedTemplate()->name() === 'articles'): ?>
      <?php snippet('articles', ['query' => $page->children()->listed()]) ?>
    <?php else: ?>
      <section class="prose">
        <?= $page->text()->toBlocks() ?>
      </section>
    <?php endif ?>
  </div>
</div>

<?php endsnippet() ?>
