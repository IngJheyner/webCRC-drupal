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
        // $('[data-toggle="tooltip"]').tooltip();
      });

      /*===========================================
      DATABLE GLOBAL JQUERY
      =============================================*/
      $('#datable-webcrc').once('webcrc').each(function () {

        let idTable = $(this).attr('id-table');
        let columnDefs = '';

        switch (idTable) {
          case 'projects-comments':
            columnDefs = [
              { className: "max-desktop", responsivePriority: 1, targets: 0 },
              { className: "max-desktop", responsivePriority: 2, targets: 1 },
              { className: "tablet-l desktop", targets: 2 },
              { className: "tablet-l desktop", targets: 3 },
              { className: "tablet-l desktop", targets: 4 },
              { className: "tablet-l desktop", targets: 5 },
              { className: "tablet-l desktop", targets: 6 }
            ]
            break;
          case 'library-virtual':
            columnDefs = [
              { className: "max-desktop", responsivePriority: 1, targets: 0 },
              { className: "max-desktop", responsivePriority: 2, targets: 1 },
              { className: "tablet-l desktop", targets: 2 },
              { className: "tablet-l desktop", targets: 3 },           
            ]
            break;
        }

        $('#datable-webcrc').dataTable({
            "searching": false,
            "order": [],
            "info": false,
            "paging": false,
            "lengthChange": false,
            "responsive": true,
            "columnDefs": columnDefs,
        });
      
      });

      /*===========================================
      COLOCAR EL DATEPICKER A CAMPO DE TIPO FECHA
      EN EL SITIO
      -- created-min
      -- created-max
      =============================================*/
      $('#edit-created-min').once('webcrc').each(function () {
        $('#edit-created-min').datepicker({
          language: 'es',
          todayBtn: "linked",
          clearBtn: true,
          format: "dd/mm/yyyy",
          multidate: false,
          todayHighligth: true,
          orientation: "bottom left",
        });
      });
      $('#edit-created-max').once('webcrc').each(function () {
        $('#edit-created-max').datepicker({
          language: 'es',
          todayBtn: "linked",
          clearBtn: true,
          format: "dd/mm/yyyy",
          multidate: false,
          todayHighligth: true,
          orientation: "bottom left",
        });
      });
     
      
    }
  };

})(jQuery, Drupal);
