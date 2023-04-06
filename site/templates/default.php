<?php
/** @var \Kirby\Cms\App $kirby */
/** @var \Kirby\Cms\Site $site */
/** @var \Kirby\Cms\Page $page */
snippet('layouts/default', slots: true);
?>

<div class="py-4xl">
  <div class="max-w-screen-md mx-lg sm:mx-3xl">
    <div class="mb-5xl">
      <?php snippet('title', ['title' => $page->title()->escape()]) ?>
    </div>

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
