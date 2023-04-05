<?php
/** @var string $title */
/** @var string|null $props */
?>
<h1 class="<?= trim('relative text-contrast-higher font-heading text-2xl md:text-3xl' . ($props ?? ''), ' ') ?>">
  <?= $title ?>
</h1>
