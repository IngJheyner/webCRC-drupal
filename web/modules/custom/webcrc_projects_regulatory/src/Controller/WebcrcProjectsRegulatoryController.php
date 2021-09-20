<?php

namespace Drupal\webcrc_projects_regulatory\Controller;

use Drupal\Core\Controller\ControllerBase;

/**
 * Returns responses for webcrc_projects_regulatory routes.
 */
class WebcrcProjectsRegulatoryController extends ControllerBase {

  /**
   * Builds the response.
   */
  public function build() {

    $build['content'] = [
      '#type' => 'item',
      '#markup' => $this->t('It works!'),
    ];

    return $build;
  }

}
