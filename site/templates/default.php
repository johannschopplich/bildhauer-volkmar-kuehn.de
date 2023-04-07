<?php
/** @var \Kirby\Cms\App $kirby */
/** @var \Kirby\Cms\Site $site */
/** @var \Kirby\Cms\Page $page */
snippet('layouts/default', slots: true);
?>

<div class="pb-4xl">
  <div class="inline-block border-b border-primary-700 py-3xl mb-4xl">
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
