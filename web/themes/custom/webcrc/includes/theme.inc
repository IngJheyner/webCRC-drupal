<?php

/**
 * @file
 * Custom theme hooks.
 */

 /**
 * Implements theme_preprocess_superfish_menu_item()
 * With elements from https://www.drupal.org/project/superfish/issues/2958789#comment-12568378
 */
  function webcrc_preprocess_superfish_menu_items(array &$variables) 
  {
    template_preprocess_superfish_menu_items($variables);

    // Get the menu name
    $menu_id = $variables['element']['#menu_name'];
    // Iterate through the menu items
    foreach ($variables['menu_items'] as &$menu_item) 
    {
      $menu_item_id = $menu_item['attributes']['id']->value();
      // Get the Menu Item Extras by UUID and menu name, using a helper function
      $entity = \Drupal::entityTypeManager()
        ->getStorage('menu_link_content')
        ->loadByProperties(
          [
            'menu_name' => $menu_id,
            'uuid' => _webcrc_superfish_uuid($menu_item_id)
          ]);
      // This should return an array with one item with an arbitrary numeric key, get the value
      $entity = reset($entity);
      // verify that the resulting value is an Entity, build a view, and add it to the menu item
      if ($entity instanceof \Drupal\Core\Entity\EntityInterface) 
      {
        $view_builder = \Drupal::entityTypeManager()->getViewBuilder($entity->getEntityTypeId());
        // Provide a view mode to allow control of which fields appear in the Superfish menu
        $entity_view = $view_builder->view($entity, 'superfish');
        $menu_item['entity'] = $entity_view;
        $menu_item['entity']['#show_item_link'] = FALSE;
      }
    }
  }

  /**
   * @param $uuid, a Superfish ID
   * @return string $uuid
   *
   * Helper function to extract a UUID from a Superfish menu item ID string
   */
  function _webcrc_superfish_uuid($uuid) {
    $uuid = preg_replace('/^.*-menu-link-content/', '', $uuid);
    $uuid = explode("--", $uuid);
    $uuid = $uuid[0];
    return $uuid;
  }
  
  /**
  * Use language code for the language switcher
  */
  function webcrc_preprocess_links__language_block(&$variables) {
    foreach ($variables['links'] as $i => $link) {
      // @var \Drupal\language\Entity\ConfigurableLanguage $linkLanguage
      $linkLanguage = $link['link']['#options']['language'];
      $variables['links'][$i]['link']['#title'] = $linkLanguage->get('id');
    }
  }