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

  <div class="max-w-prose px-lg mx-auto sm:px-3xl md:mx-0">
    <?php if ($page->intendedTemplate()->name() === 'articles'): ?>
      <?php snippet('articles', ['query' => $page->children()->listed()]) ?>
    <?php else: ?>
      <section class="prose <?= e($page->isHomePage(), 'md:column-count-2') ?>">
        <?= $page->text()->toBlocks() ?>
      </section>
    <?php endif ?>
  </div>

  <?php if ($page->isHomePage() && ($images = $page->gallery()->toFiles())->isNotEmpty()): ?>
    <div class="mx-1 mt-5xl md:mx-3xl">
      <div class="masonry-grid gap-1 md:gap-2" style="--masonry-col-max-w: clamp(10rem, 25vw, 15rem);">
        <?php foreach ($images as $image): ?>
          <?php /** @var \Kirby\Cms\File $image */ ?>
          <figure>
            <?php snippet('helpers/image', ['image' => $image]) ?>

            <?php if ($image->caption()->isNotEmpty()): ?>
              <figcaption class="text-sm leading-normal text-center px-sm py-xs">
                <?= $image->caption() ?>
              </figcaption>
            <?php endif ?>
          </figure>
        <?php endforeach ?>
      </div>
    </div>
  <?php endif ?>
</div>

<?php endsnippet() ?>
