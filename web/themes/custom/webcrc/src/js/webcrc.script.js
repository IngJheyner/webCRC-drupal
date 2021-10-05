import 'popper.js';
import 'bootstrap';
import '@fortawesome/fontawesome-free';
import anime from 'animejs/lib/anime.es';

(function ($, Drupal) {

  'use strict';

  Drupal.behaviors.helloWorld = {
    attach: function (context, settings) {

      $(document, context).once('webcrc').each( function () {

        $(document).ready( function () {

          var indicatorCount = document.querySelectorAll('.count_indicator');

          if(indicatorCount) {

            indicatorCount.forEach(count_indicator => {

              const valueCount = parseFloat(count_indicator.getAttribute('data-target'));
              anime({
                targets: count_indicator,
                innerHTML: [0, valueCount],
                easing: 'linear',
                round: 100
              });
            });
          }
        });

        /* ===== ===== TOOLTIP ===== ===== */
        $('[data-toggle="tooltip"]').tooltip();
      });
    }
  };

})(jQuery, Drupal);
