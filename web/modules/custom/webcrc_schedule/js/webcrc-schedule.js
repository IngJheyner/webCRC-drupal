/**
 * @file
 * Global utilities.
 *
 */
 (function ($, Drupal) {
    Drupal.behaviors.webcrc = {

        attach: function (context, settings) {

            const ftnKeyUp = element => {
                element.addEventListener('keyup', () => {

                    let titleEdit = document.querySelector('#edit-title-0-value');
                    
                    if(titleEdit)
                        titleEdit.value = element.value;
                });
            }

            $('#edit-field-agency-activity-0-title').once('webcrc').each(function () {                
                let selectorInput = document.querySelector('#edit-field-agency-activity-0-title');
                ftnKeyUp(selectorInput);                
            });           
        }
    };
}(jQuery, Drupal));