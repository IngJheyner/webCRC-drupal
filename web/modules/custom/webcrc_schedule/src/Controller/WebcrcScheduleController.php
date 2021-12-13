<?php

namespace Drupal\webcrc_schedule\Controller;

use Drupal\Core\Controller\ControllerBase;

/**
 * Returns responses for Agenda Regulatoria routes.
 */
class WebcrcScheduleController extends ControllerBase {

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
