<?php

$lang = 'pl';

$tagsBodyBasic = 'preload device--mobile scope--inside';

$tagsNav = 'nav--transparent';
$tagsTemplate = 'template--intro';

?>

<!DOCTYPE html>
<html lang="<?php echo $lang ?>">
<head>
  <?php include 'components/head.php' ?>
</head>

<body class="<?php echo $tagsBodyBasic . ' ' . $tagsNav . ' ' . $tagsTemplate ?>">
  <?php include 'components/bof-scripts.php' ?>

  <div class="page__wrapper">

    <?php // include 'components/nav.php' ?>

    <main>

      <?php
      $signup = false; $passremind = false;
      include 'content/sign-form.php'
      ?>

    </main>

    <?php include 'components/footer.php' ?>
  </div>

  <?php include 'components/eof-scripts.php' ?>
</body>
</html>
