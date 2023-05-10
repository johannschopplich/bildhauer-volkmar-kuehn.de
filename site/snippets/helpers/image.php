<?php

use Kirby\Toolkit\Html;

/** @var \Kirby\Cms\File|null $image */
if (isset($image) && !$image) return;

echo Html::img($image->thumbhashUri(), [
  'loading' => 'lazy',
  'data-srcset' => $image->srcset(),
  'data-sizes' => 'auto',
  'data-zoomable' => 'true',
  'width' => $image->width(),
  'height' => $image->height(),
  'style' => 'aspect-ratio: ' . $image->ratio(),
  'alt' => $image->alt()->isNotEmpty() ? $image->alt()->escape() : null
]);
