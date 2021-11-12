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
        
        /* ===== ===== TRANSPARENCIA ===== ===== */

        /* ===== ===== Zone Title-Item  ===== ===== */

        var url = window.location.pathname;
        var filename = url.split('/');
        var spanTranspMenu = $('span[toggle-nav-transp="true"]');

        if(filename[2] == "transparencia-y-acceso-a-la-informacion-publica" && filename[3]){
          spanTranspMenu.each(function( index, element ) {
            var itemId = $(element).attr('id');
            var itemIdNormalize = itemId.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            
            if(filename[3]){
              var itemActiveUrl = filename[3];
              
              if(itemIdNormalize == itemActiveUrl+'-title'){
                var baseIdItemActive = itemId.replace('-title', '');
                var itemActiveMenu = $("#"+baseIdItemActive+'-title');
                $("#idTitleItemPage").html(itemActiveMenu.html());
                $("#"+baseIdItemActive+'-div').addClass('show');
                var div_icon = $('#'+baseIdItemActive+"-icon div[class='menu-transp-access-infor-public__field-icono-de-enlace']").clone();
                console.log();
                $('#icon-zone-title-item').append(div_icon);
              }

            }
  
          });
        } 
        /* ===== ===== ===== ===== ===== ===== ===== ===== ===== */

      });
    }
  };

})(jQuery, Drupal);
