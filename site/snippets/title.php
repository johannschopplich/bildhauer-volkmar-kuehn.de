<?php
/** @var string $title */
/** @var string|null $props */
?>
<h1 class="<?= trim('relative text-primary-700 font-heading font-italic text-2xl whitespace-nowrap md:text-3xl ' . ($props ?? ''), ' ') ?>">
  <?= $title ?>
</h1>
