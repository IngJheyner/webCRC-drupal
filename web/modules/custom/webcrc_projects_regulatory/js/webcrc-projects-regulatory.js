/**
 * @file
 * Global utilities.
 *
 */
 (function ($, Drupal) {
    Drupal.behaviors.webcrc = {
        attach: function (context, settings) {
            /*===========================================
            FUNCION PARRAFO PARA TEXTO
            =============================================*/
            let ftn = () => {
                /* ===== ===== Ocultar o modificar texto de la presentacion de los parrafos ===== ===== */
                $('div.field--name-field-interacciones-proyectos table tbody tr.draggable').each(function (idx, el){                   
                    $(el).find("td:nth-child(2)").find('div.paragraph-type').children('span').html('Interacción ' + (idx + 1));
                    $(el).find("td:nth-child(2)").find('div.paragraph-summary').css("display", "none");                
                });
            }

            /*===========================================
            FUNCION CARGUE DE INTERACCIONES
            =============================================*/
            let ftnInter = (code, iframeC, nameRouteFile) => {

                let iframeProposals = document.querySelector(iframeC);  
                
                if(iframeProposals != null){
                    
                    let iframe = '';
                    
                    iframeProposals.onload = function (e){
                        
                        iframe = document.querySelector(iframeC).contentWindow.document;
                        
                        let files = iframe.getElementById('ief-dropzone-upload');
                        $(files).wrap("<details class='required-fields field-group-details js-form-wrapper form-wrapper seven-details' data-drupal-selector='edit-group-file-conv' id='edit-group-file-conv'><div class='seven-details__wrapper details-wrapper'></div></details>");
                        $(files).parent().before("<summary role='button' aria-controls='edit-group-prueba' aria-expanded='false' aria-pressed='false' class='seven-details__summary form-required'><span>Cargar Archivos.</span></summary>");
                        
                        iframe = document.querySelector(iframeC).contentWindow.document; 
                        
                        /* ===== ===== Oculatar y apaercer elementos ===== ===== */
                        let uploadFile = iframe.getElementById('edit-upload');
                        iframe.getElementById('edit-actions').style.display = 'none';

                        $(uploadFile).on('click mouseover', function () {
                            
                            iframe.getElementById('edit-group-file-conv').removeAttribute('open'); 
                            iframe.getElementById('edit-actions').style.display = 'none';       
                           
                        
                        });
                        
                        iframe.getElementById('edit-group-file-conv').addEventListener('click', function() {
                            
                            let newFiles = iframe.getElementById('ief-dropzone-upload'); 
                            iframe.getElementById('edit-actions').style.display = 'block';

                            $(newFiles).children('div.form-wrapper').each(function (idx, el) {                                
                                $(el).children('fieldset').children('div.fieldset__wrapper').children(nameRouteFile).children().children('input').val(code);
                                $(el).children('fieldset').children('div.fieldset__wrapper').children(nameRouteFile).css('display', 'none');
                                $(el).children('fieldset').find('div.field--name-uid').css("display", "none");                               
                            
                            });

                        });

                    } 

                }

            }

            /* ===== ===== Modif. Parrafos enlaces e interacciones ===== ===== */
            ftn();

            /* ===== ===== Validar que el campo codigo no este vacio ===== ===== */
            $('div.field-group-tabs-wrapper > div.horizontal-tabs > ul li.horizontal-tab-button-3').on('click', function () {
                let code = $('form#node-proyectos-regulatorios-edit-form input[id="edit-title-0-value"], form#node-proyectos-regulatorios-form input[id="edit-title-0-value"]').val();

                if(code.length){

                    $('#edit-field-interacciones-proyectos-wrapper div.form-actions').show();                 
                    $('#edit-field-interacciones-proyectos-wrapper table#field-interacciones-proyectos-values tbody tr').show();                    
                    $('#edit-field-interacciones-proyectos-wrapper table#field-interacciones-proyectos-values p').remove();

                }else{

                    $('#edit-field-interacciones-proyectos-wrapper div.form-actions').hide();
                    $('#edit-field-interacciones-proyectos-wrapper table#field-interacciones-proyectos-values tbody tr').hide();
                        
                    $(document, context).once('webcrc').each(function () {
                        $('#edit-field-interacciones-proyectos-wrapper table#field-interacciones-proyectos-values tbody tr').parent().after("<p style='text-align:center'><strong>El campo <em>Código </em> de la sección información esta vacío.</strong></p>");
                    });

                }

            });

            let iframeC = undefined;
            let nameRouteFile = undefined;

            $("div.field--name-field-interacciones-proyectos table tbody div.field-group-tabs-wrapper input.entity-browser-processed").on("click", function () {

                if($(this).attr('value') == 'Gestionar Propuestas') {
                    
                    iframeC = 'iframe#entity_browser_iframe_propuesta_interacciones_media';
                    nameRouteFile = 'div.field--name-field-ruta-file-propuestas';

                }else if($(this).attr('value') == 'Gestionar Comentarios'){

                    iframeC = 'iframe#entity_browser_iframe_comentarios_interacciones_media';
                    nameRouteFile = 'div.field--name-field-ruta-archivo-comentarios';

                }else{
                    iframeC = 'iframe#entity_browser_iframe_interactions_extemporaneous';
                    nameRouteFile = 'div.field--name-field-extemporaneous-route-file';
                }

            });

            $(document, context).ajaxComplete( function () {

                ftn();

                let code = $('form#node-proyectos-regulatorios-edit-form input[id="edit-title-0-value"], form#node-proyectos-regulatorios-form input[id="edit-title-0-value"]').val();

                ftnInter(code, iframeC, nameRouteFile);
                        
            });

        }
    };
}(jQuery, Drupal));