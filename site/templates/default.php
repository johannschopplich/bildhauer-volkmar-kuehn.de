<?php
/** @var \Kirby\Cms\Page $page */
snippet('layouts/default', slots: true);
?>

<div class="py-4xl">
  <div class="max-w-screen-md mx-lg sm:mx-3xl">
    <div class="mb-5xl">
      <?php snippet('title', ['title' => $page->title()->escape()]) ?>
    </div>

    <section class="prose">
      <?= $page->text()->toBlocks() ?>
    </section>
  </div>
</div>

<?php endsnippet() ?>
