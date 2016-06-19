<?php

$lang = 'pl';

$tagsBodyBasic = 'preload device--mobile'; // platform-ios

$tagsNav = 'nav--single';
$tagsTemplate = 'template--poll';

// Grab URL Vars
$url = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]"; $parts = parse_url($url);
if ( isset($parts['query']) ) {
  parse_str($parts['query'], $query);
  $q = $query['q'];
} else {
  $q = 1;
}

$multiple = false;
$answerType = "pick";
?>

<!DOCTYPE html>
<html lang="<?php echo $lang ?>">
<head>
  <?php include 'components/head.php' ?>
</head>

<body class="<?php echo $tagsBodyBasic . ' ' . $tagsNav . ' ' . $tagsTemplate ?>">
  <?php include 'components/bof-scripts.php' ?>

  <div class="page__wrapper">

    <?php include 'components/nav.php' ?>

    <main>

      <?php
      // Question types and variations

      switch ($q) {
        case '1':
        $multiple = false;
        $answerType = "pick";
        $questionIntro = " ";
        $questionCall = "Pytanie jednkrotnego wyboru";
        break;

        case '2':
        $multiple = true;
        $answerType = "pick";
        $questionIntro = " ";
        $questionCall = "Pytanie wielokrotnego wyboru";
        break;

        case '3':
        $multiple = 3;
        $answerType = "pick";
        $questionIntro = " ";
        $questionCall = "Pytanie wielokrotnego wyboru z ograniczeniem ilości odpowiedzi jakie użytkownik może wybrać";
        break;

        case '4':
        $multiple = 0;
        $answerType = "kids";
        $questionIntro = "Specjalnie przygotowany zestaw";
        $questionCall = "Pytanie jednokrotnego wyboru o status rodziny.";
        break;

        case '5':
        $multiple = 0;
        $answerType = "longform";
        $questionIntro = "Długa forma z dynamicznym polem tekstowym.";
        $questionCall = "Pytanie, w którym użytkownik odpowiada długim tekstem.";
        $extraInfo = "Opisz swoje doświadczenie...";
        break;

        case '6':
        $multiple = 3;
        $answerType = "images";
        $imageGrid = true;
        $questionIntro = "Forma graficzna odpowiedzi";
        $questionCall = "Użytkownik wybiera jedną lub więcej grafik, które pasują do pytania. W tym wypadku zastosowano ograniczenie do 3 grafik.";
        $extraInfo = "Aby spojrzeć bliżej, prztrzymaj palec na grafice";
        break;

        case '7':
        $answerType = "drag";
        $questionIntro = "Forma interaktywna odpowiedzi";
        $questionCall = "Użytkownik ma za zadanie przyporządkować poniższe propozycje do odpowiednich grup";
        $extraInfo = "Aby przenieść, przytrzymaj palec na odpowiedzi i przesuń ją.";
        break;

        case '8':
        $answerType = "sort";
        $questionIntro = "Forma interaktywna odpowiedzi";
        $questionCall = "Użytkownik ma za zadanie uporządkować poniższe odpowiedzi";
        $extraInfo = "Aby przenieść, przytrzymaj palec na odpowiedzi i przesuń ją.";
        break;

        default:
        $multiple = false;
        $answerType = "pick";
        break;
      }
      include 'content/poll_question.php'

      ?>

    </main>

    <?php include 'components/footer.php' ?>
  </div>

  <?php
  include 'components/eof-scripts.php'
  ?>
</body>
</html>