<footer class="sticky top-[100svh] py-4xl">
  <div class="max-w-screen-md flex items-end mx-lg sm:mx-3xl">
    <div class="flex-1">
      <p>© <?= date('Y') ?> Volkmar Kühn</p>

      <p class="flex flex-wrap">
        <?php foreach (($footer = $site->footerPages()->toPages()) as $p): ?>
          <a href="<?= $p->url() ?>" class="text-underline pr-lg">
            <?= $p->title()->escape() ?>
          </a>
        <?php endforeach ?>
      </p>
    </div>

    <div>
      <?php /*
      <img src="<?= asset('assets/img/fox-1.png')->url() ?>" class="w-full max-w-24 sm:max-w-36"> -->
      */ ?>
    </div>
  </div>
</footer>
