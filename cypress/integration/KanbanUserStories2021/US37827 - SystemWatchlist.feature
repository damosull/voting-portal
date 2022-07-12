Feature: Add/Remove System Watchlist

  #Test scenario 37827 - https://dev.azure.com/glasslewis/Development/_testPlans/define?planId=37349&suiteId=37350
  Scenario: Verify internal user is able to add System Watch list
    Given I am logged in as the "AUTOMATIONINTERNAL" User
    Then I can view the workflow page
    When I apply the System Watch list for "California Public"
    Then all the results on the table should belong to "Calpers"
    And I clear the list of watchlists
    And I should logout from the application


  #Test scenario 37827 - https://dev.azure.com/glasslewis/Development/_testPlans/define?planId=37349&suiteId=37350
  Scenario: Verify external user is able to verify System Watch list and Meeting name
    Given I am logged in as the "CALPERS" User
    Then I can view the workflow page
    When I apply the System Watch list
    Then all the results on the table should show relevant System Watch list and Meeting name
    And I should logout from the application


  #Test scenario 37827 - https://dev.azure.com/glasslewis/Development/_testPlans/define?planId=37349&suiteId=37350
  Scenario: Verify internal user is able to verify System Watch list and deselect them
    Given I am logged in as the "AUTOMATIONINTERNAL" User
    When I navigate to the meeting page from the previous scenario
    Then I should be able to deselect the watch list from the previous scenario
    And I should be able to deselect the system watch list from the workflow page
    And I should logout from the application