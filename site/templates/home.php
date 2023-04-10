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

  <div class="max-w-screen-sm mx-lg sm:mx-3xl">
    <?php $blocks = $page->text()->toBlocks() ?>
    <?php if ($blocks->isNotEmpty()): ?>
      <section class="prose md:column-count-2">
        <?= $blocks ?>
      </section>
    <?php endif ?>
  </div>

  <?php $images = $page->gallery()->toFiles() ?>
  <?php if ($images->isNotEmpty()): ?>
    <div class="mx-1 mt-5xl md:mx-3xl">
      <div class="masonry-grid gap-1 md:gap-2" style="--masonry-col-max-w: clamp(10rem, 25vw, 15rem);">
        <?php foreach ($page->gallery()->toFiles() as $image): ?>
          <?php /** @var \Kirby\Cms\File $image */ ?>
          <figure>
            <?php snippet('helpers/image', [
              'image' => $image
            ]) ?>

            <?php if ($image->caption()->isNotEmpty() && !$page->isHomePage()): ?>
              <figcaption class="text-sm leading-normal text-center px-md py-xs">
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
