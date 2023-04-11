<footer class="sticky top-[100svh] py-4xl">
  <div class="max-w-prose flex items-end mx-lg sm:mx-3xl">
    <div class="flex-1">
      <p>© <?= date('Y') ?> Volkmar Kühn</p>

      <p class="flex flex-wrap">
        <?php foreach ($site->footerPages()->toPages() as $item): ?>
          <a href="<?= $item->url() ?>" class="text-underline pr-lg">
            <?= $item->title()->escape() ?>
          </a>
        <?php endforeach ?>
      </p>
    </div>

    <div>
      <!-- Footer image -->
    </div>
  </div>
</footer>
