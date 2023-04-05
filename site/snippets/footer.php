<footer class="sticky top-[100svh] py-4xl">
  <div class="max-w-screen-sm flex items-end mx-lg sm:mx-3xl">
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

    <div class="translate-y-9">
      <div class="w-34">
        <div class="children:h-full children:w-full">
          <?= asset('assets/images/logo-footer.svg')->read() ?>
        </div>
        <div class="bg-accent-50 h-10 w-full"></div>
      </div>
    </div>
  </div>
</footer>
