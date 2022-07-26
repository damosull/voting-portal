Feature: Load Test

  Scenario Outline: Vote from random 50 meetings on a random user
    Given I am logged in as a random external user
    When I increase the meetings per page value to <iterations>
    Then I can view the workflow page
    When I select a random meeting
    Then I can view the Meeting Details page
    When I click on the Change Vote or Rationale button if it exists
    And I replace my FOR votes with AGAINST and vice-versa
    And I click on the Vote button
    And I handle the override pop-up if it exists
    Then I can see a Vote success message
    And I should logout from the application

    Examples:
      | iterations |
      | "50"       |
      | "50"       |
      | "50"       |
      | "50"       |
      | "50"       |
      | "50"       |
      | "50"       |
      | "50"       |
      | "50"       |
      | "50"       |
      | "50"       |
      | "50"       |
      | "50"       |
      | "50"       |
      | "50"       |


  Scenario Outline: Vote from random 20 meetings on a random user
    Given I am logged in as a random external user
    When I increase the meetings per page value to <iterations>
    Then I can view the workflow page
    When I select a random meeting
    Then I can view the Meeting Details page
    When I click on the Change Vote or Rationale button if it exists
    And I replace my FOR votes with AGAINST and vice-versa
    And I click on the Vote button
    And I handle the override pop-up if it exists
    Then I can see a Vote success message
    And I should logout from the application

    Examples:
      | iterations |
      | "20"       |
      | "20"       |
      | "20"       |
      | "20"       |
      | "20"       |
