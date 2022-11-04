@filters
Feature: Filters related smoke tests

  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/28351
  @28351
  Scenario: Verify the workflow page elements and filter columns are displaying correctly and in the right order
    Given I am logged in as the "AUTOMATIONINTERNAL" User
    And I navigate to the workflow page
    Then I can view the workflow page
    And I can see the filter columns are displayed in the correct order
    And I should logout from the application

  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/40482
  @40482
  Scenario: Verify external user is able to add and remove a filter subscription
    Given I am logged in as the "CALPERS" User
    When I navigate to the Manage Filters page
    Then I can see the Manage Filters page
    And I remove all existing subscriptions
    When I "add" the subscription
    Then I should be able to see a success message for the "added" subscription
    And the subscription is available in the database
    When I "remove" the subscription
    Then I should be able to see a success message for the "removed" subscription
    And I should logout from the application