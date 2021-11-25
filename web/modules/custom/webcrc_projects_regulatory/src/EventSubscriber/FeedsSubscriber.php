<?php

namespace Drupal\webcrc_projects_regulatory\EventSubscriber;

use Drupal\feeds\Event\FeedsEvents;
use Drupal\feeds\Event\ParseEvent;
use Drupal\feeds\Feeds\Item\ItemInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Drupal\Core\Database\Connection;

/**
 * (describe what your event listener does here)
 */
class FeedsSubscriber implements EventSubscriberInterface {

    protected $database;

    public function __construct(){
        $this->database = \Drupal::service('database');
    }


    /**
     * Modify events after existing parser.
     *
     * @param \Drupal\feeds\Event\ParseEvent $event
     *
     *   The parse event.
     */
    public function afterParse(ParseEvent $event) {
        /**
         * @var \Drupal\feeds\Result\ParserResultInterface
         * @var \Drupal\feeds\Feeds\Item\ItemInterface
         */
        if ($event->getFeed()->getType()->id() == 'projects_comments'){

            /*foreach ($event->getParserResult() as $item) {
                $this->alterItem($item, $event);                
            }*/

            $query = $this->database->select('paragraph__feeds_item', 'pfi')
                                    ->fields('pfi', ['entity_id', 'feeds_item_guid'])
                                    ->condition('pfi.bundle', 'iterecciones_proyectos', '=');
            $result = $query->execute();

            $delta = 0;
            $entity_id = 0;

            /*while($rows = $result->fetchAssoc()){

                $this->database->delete('node__field_interacciones_proyectos')
                                ->condition('entity_id', $rows['feeds_item_guid'])
                                ->execute();
            }*/

            while($row = $result->fetchAssoc()){
                //dump($row);
                if($row['feeds_item_guid'] == $entity_id)
                    $delta++;
                else
                    $delta = 0;             
            
                $this->database->insert('node__field_interacciones_proyectos')
                                ->fields([
                                    'bundle' => 'proyectos_regulatorios',
                                    'deleted' => 0,
                                    'entity_id' => $row['feeds_item_guid'],
                                    'revision_id' => $row['feeds_item_guid'],
                                    'langcode' => 'es',
                                    'delta' => $delta,
                                    'field_interacciones_proyectos_target_id ' => $row['entity_id'],
                                    'field_interacciones_proyectos_target_revision_id ' => $row['entity_id'],
                                ])
                                ->execute();

                $entity_id = $row['feeds_item_guid'];
            }

        }
    }


    /**
     * Alters a single item.
     *
     * @param \Drupal\feeds\Feeds\Item\ItemInterface
     *   The item to make modifications on.
     * @param \Drupal\feeds\Event\ParseEvent $event
     *   The parse event.
     */
    //protected function alterItem(ItemInterface $item, ParseEvent $event) {
        // Get the field after mapping and adjust it.
        //$this->splitTaxonomyTerms('mappedfield', $item);
        //dump($item);
    //}
   

    /**
     * {@inheritdoc}
     */
    public static function getSubscribedEvents() {
        $events = [];
        $events[FeedsEvents::PARSE][] = ['afterParse', FeedsEvents::AFTER];
        return $events;
    }


    /**
     * Splits a taxonomy term into individual strings
     * separated on comma.
     *
     * @param string $field
     * @param \Drupal\feeds\Feeds\Item\ItemInterface $item
     */
    //protected function splitTaxonomyTerms(string $field, ItemInterface $item): void {
        //$raw_value = $item->get($field);
        //$new_value = preg_split('/\s*,\s*/', $raw_value);
        //$item->set($field, $new_value);
    //}
}