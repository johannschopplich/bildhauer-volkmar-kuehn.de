<?php
/** @var \Kirby\Cms\App $kirby */
/** @var \Kirby\Cms\Site $site */
/** @var \Kirby\Cms\Page $page */
?>
<div class="px-lg pt-sm pb-lg md:h-[100svh] md:px-3xl md:py-4xl md:sticky md:top-0 md:left-0 md:grid md:grid-rows-[auto_1fr]">
  <div class="relative w-full flex flex-col gap-xs items-center lg:flex-row lg:items-start lg:justify-between">
    <a href="<?= $site->url() ?>" class="block text-underline font-heading leading-heading text-size-2xl md:text-size-3xl"<?php e($page->isHomePage(), ' aria-current="page"') ?>>
      <?= $site->title()->escape() ?>
    </a>

    <?php /*
    <a href="<?= $site->url() ?>" class="<?= $page->isHomeOrErrorPage() ? 'block' : 'hidden md:block' ?>">
      <img class="w-full mx-auto mt-3 md:mt-5 lg:-mt-4 lg:-mr-2 max-w-42 2xl:max-w-46" src="<?= asset('assets/img/filzfuchs-logo-v6.png')->resize(480)->url() ?>" alt="filzfuchs Logo">
    </a>
    */ ?>

    <burger-menu class="burger-menu absolute top-0 right-0 z-20 md:hidden">
      <button class="relative w-8 h-8 bg-transparent border-none cursor-pointer" data-element="navigation-trigger" type="button">
        <span class="block burger-menu-bar" aria-hidden="true"></span>
      </button>
    </burger-menu>
  </div>

  <nav class="navigation-panel flex flex-col justify-center md:mt-auto z-10" aria-label="primary" data-element="navigation-panel">
    <ul class="space-y-3xl md:space-y-sm tracking-tight" role="list">
      <?php if ($home = $site->homePage()): ?>
        <a href="<?= $home->url() ?>" class="navigation-link font-heading text-3xl leading-heading md:text-2xl md:leading-heading md:hidden"<?php e($home->isOpen(), ' aria-current="page"') ?>>
          Startseite
        </a>
      <?php endif ?>
      <?php foreach ($site->children()->listed() as $item): ?>
        <a href="<?= $item->url() ?>" class="navigation-link font-heading text-size-3xl md:text-2xl md:leading-heading"<?php e($item->isOpen(), ' aria-current="page"') ?>>
          <?= $item->title()->escape() ?>
        </a>
      <?php endforeach ?>
    </ul>
  </nav>
</div>
