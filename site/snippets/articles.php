<?php

/** @var \Kirby\Cms\Collection $query */ ?>
<div class="grid gap-x-xs gap-y-3xl">
  <?php foreach ($query as $article): ?>
    <?php /** @var \Kirby\Cms\Page $article */ ?>
    <div class="relative">
      <?php snippet('helpers/image', [
        'image' => $article->thumbnail()->toFile()
      ]) ?>

      <div class="mx-2px">
        <p class="flex items-center gap-1 after:content-empty after:w-full after:h-1px after:bg-primary-400">
          <span class="text-primary-400 text-size-lg leading-none uppercase tracking-widest">
            <?= $article->category()->escape() ?>
          </span>
        </p>
      </div>

      <h2 class="mx-2px font-heading text-3xl leading-heading tracking-tight">
        <a href="<?= $article->url() ?>" class="hyphenated">
          <span class="absolute inset-0" aria-hidden="true"></span>
          <?= $article->title()->escape() ?>
        </a>
      </h2>
    </div>
  <?php endforeach ?>
</div>
