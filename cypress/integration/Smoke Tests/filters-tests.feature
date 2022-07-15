Feature: Filters smoke tests


  #TestCase - 28351
  Scenario: Verify the workflow page elements and filter columns are displaying correctly and in the right order
    Given I am logged in as the "AUTOMATIONINTERNAL" User
    Then I can view the workflow page
    And I can see the filter columns are displayed in the correct order
    When I click on the Manage Filters button
    Then I can see the Manage Filters page
    And I should logout from the application

  #Test scenario: 40482 https://dev.azure.com/glasslewis/Development/_workitems/edit/40482
  Scenario: Verify external user is able to add and remove a filter subscription
    Given I am logged in as the "CALPERS" User
    Then I can view the workflow page
    When I navigate to Manage Filters page
    And I "add" the subscription
    Then I should be able to see a success message for the "added" subscription
    And the subscription is available in the database
    When I "remove" the subscription
    Then I should be able to see a success message for the "removed" subscription
    And I should logout from the application