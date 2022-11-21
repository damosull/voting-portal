@loadtest
Feature: Generate Load for Voting on Viewpoint bypassing Workflow page

  Scenario Outline: Vote on a random meeting for a random user
    Given I launch a random meeting for a random user
    Then I can view the Meeting Details page
    And I verify that there are ballots available for the meeting
    When I click on the Change Vote or Rationale button if it exists
    And I replace my FOR votes with AGAINST and vice-versa
    And I randomly wait between 7 and 12 seconds
    And I click on the Vote button
    And I handle the override pop-up if it exists
    Then the vote should be submitted successfully
    And I randomly wait between 6 and 11 seconds
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