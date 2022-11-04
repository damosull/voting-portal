Feature: Add/Remove System Watchlist
#Test Suite - https://dev.azure.com/glasslewis/Development/_testPlans/define?planId=37349&suiteId=37350

  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/37827
  @37827
  Scenario: Verify internal user is able to add System Watch list
    Given I am logged in as the "AUTOMATIONINTERNAL" User
    And I navigate to the workflow page
    Then I can view the workflow page
    When I apply the System Watch list for "California Public"
    Then all the results on the table should belong to "Calpers"
    And I clear the list of watchlists
    And I should logout from the application


  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/37827
  @37827
  Scenario: Verify external user is able to verify System Watch list and Meeting name
    Given I am logged in as the "CALPERS" User
    And I navigate to the workflow page
    Then I can view the workflow page
    When I apply the System Watch list
    Then all the results on the table should show relevant System Watch list and Meeting name
    And I should logout from the application


  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/37827
  @37827
  Scenario: Verify internal user is able to verify System Watch list and deselect them
    Given I am logged in as the "AUTOMATIONINTERNAL" User
    When I navigate to the Meeting Details page for the saved meeting ID
    Then I should be able to deselect the watch list from the previous scenario
    And I should be able to deselect the system watch list from the workflow page
    And I should logout from the application