Feature: Ballot Section Results

  #Test Case - https://dev.azure.com/glasslewis/Development/_workitems/edit/2642
  Scenario: Verify ballot section display the correct results when filter is applied
    Given I am logged in as the "NEUBERGER" User
    And I click on upcoming meetings
    And I clear the existing filter criteria
    When I go to a meeting with 2 or more values
    Then I verify that the ballots section are showing only the policies filtered by the user
    And I should logout from the application