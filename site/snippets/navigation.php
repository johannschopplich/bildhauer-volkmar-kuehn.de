<?php
/** @var \Kirby\Cms\App $kirby */
/** @var \Kirby\Cms\Site $site */
/** @var \Kirby\Cms\Page $page */
?>
<div class="px-lg py-xs md:sticky md:h-[100svh] md:top-0 md:left-0 md:grid md:grid-rows-[auto_1fr] md:p-0 md:overflow-hidden">
  <div class="w-full flex justify-between items-center md:p-3xl lg:items-start">
    <a href="<?= $site->url() ?>" class="block font-heading leading-heading text-size-xl md:text-size-3xl"<?php e($page->isHomePage(), ' aria-current="page"') ?>>
      <?= $site->title()->escape() ?>
    </a>

    <burger-menu class="burger-menu z-20 md:hidden">
      <button class="relative w-8 h-8 bg-transparent border-none cursor-pointer" type="button" data-element="navigation-trigger">
        <span class="block burger-menu-bar" aria-hidden="true"></span>
      </button>
    </burger-menu>
  </div>

  <nav class="navigation-panel z-10 md:max-w-[320px] md:mt-auto md:pt-4xl" aria-label="primary" data-element="navigation-panel" data-theme="dark">
    <div class="relative z-1 h-full flex items-end pt-[5vh] md:pt-0">
      <div class="w-[75vw] translate-y-[1px] origin-bottom children:h-full children:w-full md:w-full md:animate-scale">
        <?= asset('assets/images/logo-footer.svg')->read() ?>
      </div>
    </div>

    <div class="relative h-full bg-primary-600 md:px-3xl md:bg-primary-700">
      <div class="hidden absolute -top-4 inset-x-0 bottom-0 bg-primary-600 origin-bottom md:block md:animate-scale"></div>

      <ul class="relative w-[75vw] py-4xl space-y-3xl md:w-full md:space-y-sm" role="list">
        <?php if ($home = $site->homePage()): ?>
          <a
            href="<?= $home->url() ?>"
            class="navigation-link font-heading text-3xl leading-heading md:text-2xl md:leading-heading md:hidden"<?php e($home->isOpen(), ' aria-current="page"') ?>
          >
            Startseite
          </a>
        <?php endif ?>
        <?php foreach (($listedItems = $site->children()->listed()) as $item): ?>
          <?php $index = $item->indexOf($listedItems) + 1 ?>
          <a
            href="<?= $item->url() ?>"
            class="navigation-link font-heading text-3xl md:text-2xl md:leading-heading md:duration-0"
            <?php e($item->isOpen(), 'aria-current="page"') ?>
            style="--delay: <?= $index * 50 ?>ms"
          >
            <?= $item->title()->escape() ?>
          </a>
        <?php endforeach ?>
      </ul>
    </div>
  </nav>
</div>
