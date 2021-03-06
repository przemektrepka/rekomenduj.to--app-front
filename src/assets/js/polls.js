/**
* polls.js
*/



//// Do stuff after poll pages load
$(function() {

  // Highlight the selected option
  $(document).on('change propertychange', '.answer--pick > input', function(e) {

    var max = $('.poll__answers').data('maxPick');
    console.log(max);
    if ( $(':checked').length == max ) {
        $('.answer--pick > input').prop('disabled', 'disabled');
        $(':checked').removeAttr('disabled');
    } else {
         $('.answer--pick > input').removeAttr('disabled');
    }

    updPicks();

  }).change();



  // Gdy podam nową wartość w polu tekstowym niech Checkbox się zaznacza
  $('.answer--input input[type=text], .answer--input input[type=number]').on('propertychange change click keyup input paste', function() {
    var inputVal = this.value;
    // console.log(inputVal);
    if (inputVal === '' || inputVal == '0' || inputVal === null) {
      // console.log('pusto');
      $(this).parent().siblings('input[type=checkbox], input[type=radio]').removeAttr('checked');
      updPicks();
    } else {
      $(this).parent().siblings('input[type=checkbox], input[type=radio]').prop('checked', true);
      updPicks();
    }
  });



  //// The number input
  $('.input--number').each(function() {
    var plus = $(this).find('.number__more');
    var minus = $(this).find('.number__less');
    var numberInput = $(this).find('input[type=number], input[type=tel]');
    var n = Number(numberInput.val());
    var min = numberInput.attr('min');
    var max = numberInput.attr('max');
    var step = (numberInput.attr('step')) ? Number(numberInput.attr('step')) : 1;
    var suffix = $(this).find('.number__suffix');
    var suffixData = suffix.data();
    var burst;
    var burstDelay;

    // [i] Init suffix state
    if ( Math.abs(n) >= 5 ) {
      suffix.text(suffixData.suffixFivemore);
    } else if ( Math.abs(n) >= 2 && Math.abs(n) <= 4 ) {
      suffix.text(suffixData.suffixMaxfive);
    } else if ( Math.abs(n) == 1 ) {
      suffix.text(suffixData.suffixSingle);
    } else {
      suffix.text(suffixData.suffixFivemore);
    }

    // [i] Roller controls
    plus.on('touchstart mousedown', function(e) {
      numberInput.addClass('input--used');
      n = Number(numberInput.val());
      if ( n < max || !max ) {
        n = n + step;
        numberInput.val( n ).change(); // just one value change on click
        e.preventDefault();

        burstDelay = setTimeout( function() {
          burst = setInterval(function() { // burst trigger on mouse down
            if ( n < max || !max ) {
              n = n + step;
              numberInput.val( n ).change();
            } else {
              n = max;
              numberInput.val( n ).change();
            }
          }, 100);
        }, 1000); // pause burst for 1sec before start
      } else {
        n = max;
        numberInput.val( n ).change();
      }
    });

    minus.on('touchstart mousedown', function(e) {
      n = Number(numberInput.val());
      if ( n > min || !min ) {
        n = n - step;
        numberInput.val( n ).change(); // just one value change on click
        e.preventDefault();

        burstDelay = setTimeout( function() {
          burst = setInterval(function() { // burst trigger on mouse down
            if ( n > min || !min ) {
              n = n - step;
              numberInput.val( n ).change();
            } else {
              n = min;
              numberInput.val( n ).change();
            }
          }, 100);
        }, 1000); // pause burst for 1sec before start
      } else {
        n = min;
        numberInput.val( n ).change();
      }
    });

    $(document).on('touchend mouseup', function(e) {
      clearInterval(burst);
      clearTimeout(burstDelay);
      // e.preventDefault();
    });

    // [i] Changin input value
    numberInput.on('change paste keyup', function() {
      n = Number(numberInput.val());

      // [i] update suffix on input change
      if ( Math.abs(n) >= 5 ) {
        suffix.text(suffixData.suffixFivemore);
      } else if ( Math.abs(n) >= 2 && Math.abs(n) <= 4 ) {
        suffix.text(suffixData.suffixMaxfive);
      } else if ( Math.abs(n) == 1 ) {
        suffix.text(suffixData.suffixSingle);
      } else {
        suffix.text(suffixData.suffixFivemore);
      }

    });
  });



  // Longpress on image answers
  $('.answer--image').longpress(function(){
    var imageURL = $(this).data(),
    modalContent = '<img src="' + imageURL.fullsize + '" alt="">';

    $('body').modal({
      message: modalContent,
    });

  });



  // Drag-n-Drop answers
  // Jabłka
  $('.answer--drag').draggable({
    addClasses: false,
    zIndex: 1111,
    revert: true,
    revertDuration: 150,
    drag: function( event, ui ) {
      $(this).addClass('picked');
    },
    stop: function( event, ui ) {
      $(this).removeClass('picked');
    }
  });

  //// Koszyki
  // On sort
  // TODO Sortable źle wyświetla pozycje przesówanego elementu.
  $('.sort-bucket--source').sortable({
    items: '.answer--sort',
    appendTo: $(this),
    classes: false,
    placeholder: 'answer--sort__placeholder',

    start: function( e,ui ) {
      $(ui.item).addClass('picked');
    },
    sort: function( e,ui ) {
      var thisTop = $(ui.item).position().top;
      $(ui.item).css('top', thisTop + $(window).scrollTop());
    },
    stop: function( e,ui ) {
      $(ui.item).removeAttr('style').removeClass('picked');
    },
  }).disableSelection();
  $('.answer--sort').disableSelection();

  // On drag
  $('.drag-bucket--target, .drag-bucket--source').droppable({
    addClasses: false,
    hoverClass: 'get-ready',
    drop: function( event, ui ) {
      $(ui.draggable).removeAttr('style').prependTo(this);
    },
    activate: function( event, ui ) {
      $(ui.draggable).addClass('picked');

      $('.drag-bucket--target, .drag-bucket--source').each(function() {
        if ( $(this).children().length > 1 ) {
          $(this).addClass('has-content');
        } else {
          $(this).removeClass('has-content');
        }
      });
    },
    deactivate: function( event, ui ) {
      $(ui.draggable).removeClass('picked');

      // content check
      $('.drag-bucket--target, .drag-bucket--source').each(function() {
        if ( $(this).children().length > 1 ) {
          $(this).addClass('has-content');
          $(this).find('.placeholder').appendTo(this);
        } else {
          $(this).removeClass('has-content');
        }
      });
    }
  });

  // First content check
  $('.drag-bucket--target, .drag-bucket--source, .sort-bucket--source').each(function() {
    if ( $(this).children().length > 1 ) {
      $(this).addClass('has-content');
    } else {
      $(this).removeClass('has-content');
    }
  });

  // Sliders

  $('.slider').each(function(e) {
    var $s = $(this),
        valPreffix = ($s.data('preffix')) ? $s.data('preffix') : '',
        valSuffix = ($s.data('suffix')) ? $s.data('suffix') : '',
        valBind = {
          slide: function( event, ui ) {
            var value = ui.value;
            $s.siblings('.slider__value').val( valPreffix + value + valSuffix );
          }
        },
        valuesBind = {
          slide: function( event, ui ) {
            var values = ui.values;
            $s.siblings('.slider__value').val( valPreffix + values[0] + valSuffix + ' — ' + valPreffix + values[1] + valSuffix );
          }
        },
        snapOptions = {
          value: $s.data('sDefault'),
          min: $s.data('sMin'),
          max: $s.data('sMax'),
          step: $s.data('sStep'),
        },
        rangeValOptions = {
          range: 'min',
        },
        rangeOptions = {
          range: true,
          values: $s.data('sDefault'),
          min: $s.data('sMin'),
          max: $s.data('sMax'),
          step: $s.data('sStep'),
        },
        options = {};

    if ( $s.hasClass('slider--snapping') ) {
      options = $.extend(options, snapOptions, valBind);
    }
    if ( $s.hasClass('slider--value-range') ) {
      options = $.extend(options, rangeValOptions);
    }
    if ( $s.hasClass('slider--range') ) {
      options = $.extend(options, rangeOptions, valuesBind);
    }
    if ( $s.hasClass('slider--select') ) {
      var $select = $s.siblings('select'),
          selectItems = $select.children().size();

      options = {
        range: 'min',
        value: $select[ 0 ].selectedIndex + 1,
        min: 1,
        max: selectItems,
        step: 1,
        slide: function( event, ui ) {
          $select[ 0 ].selectedIndex = ui.value - 1;
        }
      };
      $select.attr('disabled', 'disabled');
    }

    $s.slider(options);

    if ( $s.hasClass('slider--range') ) {
      $s.siblings('.slider__value').val( valPreffix + $s.slider( 'values', 0 ) + valSuffix + ' — ' + valPreffix + $s.slider( 'values', 1 ) + valSuffix );
    } else {
      $s.siblings('.slider__value').val( valPreffix + $s.slider( 'value' ) + valSuffix );
    }
  });

});
