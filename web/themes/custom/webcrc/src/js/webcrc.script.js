import 'popper.js';
import 'bootstrap';
import '@fortawesome/fontawesome-free';

(function () {

  'use strict';

  Drupal.behaviors.helloWorld = {
    attach: function (context) {
      console.log('Hello World');
    }
  };

})(jQuery, Drupal);
