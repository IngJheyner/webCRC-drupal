Feature: As a user
  I want to edit a Page
  So that I can modify it

  Background:
    Given "page" content:
      | title           |
      | Behat page test |


  @sunnyday @api @page @edit @administrator
  Scenario Outline: Simple Page edit
    Given I am logged in as a user with the <role> role
    When I go to "edit" of the "node" entity with label "Behat page test"
    And I fill in "Title" with "Behat page test edited"
    And I press the "Save" button
    Then I should see "Behat page test edited"

    Examples:
      | role           |
      | administrator  |


  @error @api @page @edit @authenticated @anonymous
  Scenario Outline: Simple Page edit role access
    Given I am a user with <role> role
    When I go to "edit" of the "node" entity with label "Behat page test"
    Then the response status code should be 403

    Examples:
      | role           |
      | anonymous      |
      | authenticated  |
