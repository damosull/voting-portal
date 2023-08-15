Feature: Display the Ballot Voting History
  #Test Suite - https://dev.azure.com/glasslewis/Development/_testPlans/execute?planId=37349&suiteId=40634

  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/40606
  @40606
  Scenario: Verify user is able to configure column actions
    Given I am logged in as the "CALPERS" user
    When I navigate to the workflow page
    Then I can view the workflow page
    And I should be able to verify the different column actions on the workflow page
    And I should logout from the application


  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/40606
  @40606
  Scenario: Verify pagination works as expected on the ballot section page
    Given I am logged in as the "RUSSELL" user
    When I navigate to the meeting details page for the meeting "RLNCDRP"
    Then I can view the Meeting Details page
    When I click on the Change Vote or Rationale button if it exists
    Then I should be able to verify the pagination works as expected on the ballot section page
    And I should logout from the application


  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/40724
  @40724
  Scenario: Verify pagination is displayed on the ballot section page
    Given I am logged in as the "RUSSELL" user
    When I navigate to the meeting details page for the meeting "RBNCRP"
    Then I can view the Meeting Details page
    When I click on the Change Vote or Rationale button if it exists
    Then I should be able to verify the pagination is displayed on the ballot section page
    And I should logout from the application


  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/40724
  @40724
  Scenario: Verify chosen pagination is autosaved on the ballot section page
    Given I am logged in as the "RUSSELL" user
    When I navigate to the meeting details page for the meeting "RLNCDRP"
    Then I can view the Meeting Details page
    When I click on the Change Vote or Rationale button if it exists
    Then I should be able to verify the chosen pagination is autosaved on the ballot section page
    And I should logout from the application


  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/40734
  @40734
  Scenario: Verify User can Toggle between 'Management' Multiple Agendas in the Vote card page for specific meeting type
    Given I am logged in as the "NEUBERGER" user
    When I navigate to the meeting details page for the meeting "NBCOMMO"
    Then I can view the Meeting Details page
    When I click on the Change Vote or Rationale button if it exists
    Then I should be able to toggle between "Management" Multiple Agendas in the Vote card page for specific meeting type
    And I should logout from the application


  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/40741
  @40741
  Scenario: Verify User can see 'Ballot Activity Log' gets updated in the Vote Card page
    Given I am logged in as the "RUSSELL" user
    When I navigate to the workflow page
    Then I can view the workflow page
    When I have added the criteria for "Decision Status" with status "Recommendations Pending"
    Then the filtered results should be displayed
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
    And the activity should match against the ballot activity log
    And I should logout from the application