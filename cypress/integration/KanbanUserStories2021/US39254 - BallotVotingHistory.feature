Feature: Display the Ballot Voting History

  #Test case 40606 - https://dev.azure.com/glasslewis/Development/_workitems/edit/40606
  Scenario: Verify user is able to configure column actions
    Given I am logged in as the "CALPERS" User
    And I clear the existing filter criteria
    When I add the criteria for "Decision Status" with status "Recommendations Available"
    Then I should be able to verify the different column actions on the workflow page
    And I should logout from the application

  #Test case 40606 - https://dev.azure.com/glasslewis/Development/_workitems/edit/40606
  Scenario: Verify pagination works as expected on the ballot section page
    Given I am logged in as the "RUSSELL" User
    And I clear the existing filter criteria
    When I navigate to the meeting details page for the meeting "RLNCDRP"
    Then I can view the Meeting Details page
    When I click on the Change Vote or Rationale button
    Then I should be able to verify the pagination works as expected on the ballot section page
    And I should logout from the application

  #Test case 40724 - https://dev.azure.com/glasslewis/Development/_workitems/edit/40724
  Scenario: Verify pagination is displayed on the ballot section page
    Given I am logged in as the "RUSSELL" User
    And I clear the existing filter criteria
    When I navigate to the meeting details page for the meeting "RBNCRP"
    Then I can view the Meeting Details page
    When I click on the Change Vote or Rationale button
    Then I should be able to verify the pagination is displayed on the ballot section page
    And I should logout from the application

  #Test case 40724 - https://dev.azure.com/glasslewis/Development/_workitems/edit/40724
  Scenario: Verify chosen pagination is autosaved on the ballot section page
    Given I am logged in as the "RUSSELL" User
    And I clear the existing filter criteria
    When I navigate to the meeting details page for the meeting "RLNCDRP"
    Then I can view the Meeting Details page
    When I click on the Change Vote or Rationale button
    Then I should be able to verify the chosen pagination is autosaved on the ballot section page
    And I should logout from the application


  #Test Case 40734 - https://dev.azure.com/glasslewis/Development/_workitems/edit/40734
  Scenario: Verify User can Toggle between 'Management' Multiple Agendas in the Vote card page for specific meeting type
    Given I am logged in as the "NEUBERGER" User
    And I clear the existing filter criteria
    When I navigate to the meeting details page for the meeting "NBCOMMO"
    Then I can view the Meeting Details page
    When I click on the Change Vote or Rationale button
    Then I should be able to toggle between "Management" Multiple Agendas in the Vote card page for specific meeting type
    And I should logout from the application