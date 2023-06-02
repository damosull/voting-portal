Feature: Add/Remove System Watchlist
#Test Suite - https://dev.azure.com/glasslewis/Development/_testPlans/define?planId=37349&suiteId=39057

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


  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/37790
  @37790
  Scenario: Verify user is able to process Vote, Take No Action and Review Required actions
    Given I am logged in as the "RUSSELL" User
    When I navigate to the workflow page
    Then I can view the workflow page
    When I have added the criteria for "Decision Status" with status "Recommendations Pending"
    Then the filtered results should be displayed
    And I save the filter
    When I select a random meeting
    Then I can view the Meeting Details page
    When I quick vote "For" on the meeting
    And I capture the value of Total Not Voted
    And I click on the Vote button
    And I handle the override pop-up if it exists
    Then I can see a Vote success message
    When I click on the Change Vote or Rationale button
    And I should be able to use the Instruct functionality on the meeting
    Then the vote tally should be updated
    And I should logout from the application