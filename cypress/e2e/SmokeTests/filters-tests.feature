@filters
Feature: Filters related smoke tests
#Test Suite - https://dev.azure.com/glasslewis/Development/_testPlans/define?planId=56788&suiteId=56792

  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/40482
  @40482
  Scenario: Verify external user is able to add and remove a filter subscription
    Given I am logged in as the "CHARLESSCHWAB" User
    When I navigate to the Manage Filters page
    Then I can see the Manage Filters page
    And I remove all existing subscriptions
    When I "add" the subscription
    Then I should be able to see a success message for the "added" subscription
    And the subscription is available in the database
    When I "remove" the subscription
    Then I should be able to see a success message for the "removed" subscription
    And I should logout from the application
