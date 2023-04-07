<?php
/** @var \Kirby\Cms\App $kirby */
/** @var \Kirby\Cms\Site $site */
/** @var \Kirby\Cms\Page $page */
?>
<div class="px-lg py-xs md:sticky md:h-[100svh] md:top-0 md:left-0 md:grid md:grid-rows-[auto_1fr] md:p-0 md:overflow-hidden">
  <div class="w-full flex justify-between items-center md:border-b md:border-white md:ml-3xl md:py-3xl md:pr-3xl lg:items-start">
    <a href="<?= $site->url() ?>" class="block font-heading leading-heading text-size-xl md:text-size-3xl"<?php e($page->isHomePage(), ' aria-current="page"') ?>>
      <?= $site->title()->escape() ?>
    </a>

    <burger-menu class="burger-menu z-20 md:hidden">
      <button class="relative w-8 h-8 bg-transparent border-none cursor-pointer" type="button" data-element="navigation-trigger">
        <span class="block burger-menu-bar" aria-hidden="true"></span>
      </button>
    </burger-menu>
  </div>

  <nav class="navigation-panel md:flex md:flex-col md:justify-between" aria-label="primary" data-element="navigation-panel">
    <div class="h-full flex items-end pt-[5vh] md:hidden">
      <div class="w-[75vw] translate-y-[1px] origin-bottom children:h-full children:w-full">
        <?= asset('assets/images/logo-footer-mobile.svg')->read() ?>
      </div>
    </div>

    <div class="h-full bg-primary-50 md:px-3xl md:bg-primary-700 md:h-initial">
      <ul class="w-[75vw] py-4xl space-y-3xl md:w-full md:py-3xl md:space-y-lg" role="list">
        <?php if ($home = $site->homePage()): ?>
          <a
            href="<?= $home->url() ?>"
            class="navigation-link text-xl md:text-lg md:whitespace-nowrap md:hidden"<?php e($home->isOpen(), ' aria-current="page"') ?>
          >
            Startseite
          </a>
        <?php endif ?>
        <?php foreach (($listedItems = $site->children()->listed()) as $item): ?>
          <?php $index = $item->indexOf($listedItems) + 1 ?>
          <a
            href="<?= $item->url() ?>"
            class="navigation-link text-xl md:text-lg lg:whitespace-nowrap"
            <?php e($item->isOpen(), 'aria-current="page"') ?>
            style="--delay: <?= $index * 50 ?>ms"
          >
            <?= $item->title()->escape() ?>
          </a>
        <?php endforeach ?>
      </ul>
    </div>

    <div class="hidden md:block">
      <div class="animate-scale origin-bottom lg:max-w-[65%] lg:mx-auto">
        <div class="w-full mb-[-1px] children:h-full children:w-full">
          <?= asset('assets/images/logo-footer.svg')->read() ?>
        </div>
        <div class="w-full h-[15svh] bg-primary-600"></div>
      </div>
    </div>
  </nav>
</div>
