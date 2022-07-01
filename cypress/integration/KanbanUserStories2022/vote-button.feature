Feature: Vote Button Tests
#https://dev.azure.com/glasslewis/Development/_testPlans/execute?planId=53607&suiteId=54213


  #TC - https://dev.azure.com/glasslewis/Development/_workitems/edit/3331
  #Test is currently failing. See https://glasslewis.slack.com/archives/CK9P62TSS/p1656599594754819
  Scenario: Verify a user can vote on  Vote Card with filtering set
    Given I am logged in as the "CALPERS" User
    And I remove all existing selected criteria
    And I have added the criteria for "Decision Status" with status "Voted"
    When I select the first available meeting
    Then I can view the Meeting Details page
    When I click on the Change Vote or Rationale button
    And I replace my FOR votes with AGAINST and vice-versa
    And I click on the Workflow option from the toolbar
    Then I should get a popup window with a warning and OK and Cancel buttons
    When I click on the OK button
    Then I can view the workflow page
    When I select the first available meeting
    Then I can view the Meeting Details page
    When I click on the Change Vote or Rationale button
    And I replace my FOR votes with AGAINST and vice-versa
    And I click on the Workflow option from the toolbar
    Then I should get a popup window with a warning and OK and Cancel buttons
    When I click on the Cancel button
    And I click on the Vote button
    And I select the checkbox and click Proceed
    Then I can see a Vote success message
    And I verify the vote tally section by checking the total votes and hyperlinks
    And I should logout from the application
