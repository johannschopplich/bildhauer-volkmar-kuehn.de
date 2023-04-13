<?php

use Kirby\Toolkit\Html;

/** @var \Kirby\Cms\Block $block */
$alt     = $block->alt();
$caption = $block->caption();
$link    = $block->link();
$size    = $block->size();
$img     = null;

if ($block->location() === 'web') {
  $img = Html::img($block->src(), ['alt' => $alt]);
} elseif ($image = $block->image()->toFile()) {
  if ($alt->isEmpty()) $alt = $image->alt();
  if ($caption->isEmpty()) $caption = $image->caption();

  $img = Html::img(
    $image->blurhashUri(),
    [
      'loading' => 'lazy',
      'data-srcset' => $image->srcset(),
      'data-sizes' => 'auto',
      'data-zoomable' => $link->isEmpty() ? 'true' : null,
      'width' => $image->width(),
      'height' => $image->height(),
      'style' => 'aspect-ratio: ' . $image->ratio(),
      'alt' => $alt->isNotEmpty() ? $alt->escape() : null
    ]
  );
} else {
  return;
}

?>
<figure <?= attr([
  'class' => $size->value() ?? null
]) ?>>
  <?php if ($link->isNotEmpty()): ?>
    <a href="<?= $link->toUrl() ?>">
      <?= $img ?>
    </a>
  <?php else: ?>
    <?= $img ?>
  <?php endif ?>

  <?php if ($caption->isNotEmpty()): ?>
    <figcaption>
      <?= $caption ?>
    </figcaption>
  <?php endif ?>
</figure>
