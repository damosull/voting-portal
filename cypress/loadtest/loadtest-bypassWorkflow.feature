@loadtest
Feature: Generate Load for Voting on Viewpoint bypassing Workflow page

  Scenario Outline: Vote on a random meeting for a random user bypassing Workflow page
    Given I launch a random meeting for a random user
    Then I can view the Meeting Details page
    And I randomly wait between 4 and 8 seconds
    And I verify that there are ballots available for the meeting
    When I click on the Change Vote or Rationale button if it exists
    And I replace my FOR votes with AGAINST and vice-versa
    And I click on the Vote button
    And I handle the override pop-up if it exists
    Then I can see a Vote success message
    And I randomly wait between 5 and 10 seconds
    And I should logout from the application
    
    Examples:
      | iterations |
      | "run"      |
      | "run"      |
      | "run"      |
      | "run"      |
      | "run"      |
      | "run"      |
      | "run"      |
      | "run"      |
      | "run"      |
      | "run"      |
      | "run"      |
      | "run"      |
      | "run"      |
      | "run"      |
      | "run"      |
      | "run"      |
      | "run"      |
      | "run"      |
      | "run"      |
      | "run"      |
      | "run"      |
      | "run"      |
      | "run"      |
      | "run"      |
      | "run"      |
      | "run"      |
      | "run"      |
      | "run"      |
      | "run"      |
      | "run"      |
      | "run"      |
      | "run"      |
      | "run"      |
      | "run"      |
      | "run"      |
      | "run"      |
      | "run"      |
      | "run"      |
      | "run"      |
      | "run"      |
      | "run"      |
      | "run"      |
      | "run"      |
      | "run"      |
      | "run"      |
      | "run"      |
      | "run"      |
      | "run"      |
      | "run"      |
      | "run"      |