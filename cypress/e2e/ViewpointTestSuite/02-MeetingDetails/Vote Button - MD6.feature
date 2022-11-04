Feature: Vote Button Tests
#Test Suite - https://dev.azure.com/glasslewis/Development/_testPlans/execute?planId=53607&suiteId=54213

  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/3289
  @3289
  Scenario: Verify a user can vote on a vote card
    Given I am logged in as the "CALPERS" User
    And I navigate to the workflow page
    Then I can view the workflow page
    And I remove all existing selected criteria
    And I have added the criteria for "Decision Status" with status "Recommendations Pending"
    When I select a random meeting
    Then I can view the Meeting Details page
    When I replace my FOR votes with AGAINST and vice-versa
    And I click on the Vote button
    And I handle the override pop-up if it exists
    Then I can see a Vote success message
    And I verify the vote tally section by checking the total votes and hyperlinks
    And I verify that the Voted section shows all votes and nothing is displayed under Total Not Voted
    When I click on the Glass Lewis logo on the top left
    Then I can view the workflow page
    And I should logout from the application


  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/28480
  @28480
  Scenario: Verify a user can revote on the vote card
    Given I am logged in as the "CALPERS" User
    And I navigate to the workflow page
    Then I can view the workflow page
    And I remove all existing selected criteria
    And I have added the criteria for "Decision Status" with status "Voted"
    When I select a random meeting
    Then I can view the Meeting Details page
    And I can verify that the Quick Vote option and Vote Decision are read only
    When I click on the Change Vote or Rationale button
    And I replace my FOR votes with AGAINST and vice-versa
    And I click on the Vote button
    And I select the checkbox and click Proceed
    Then I can see a Vote success message
    And I should logout from the application


  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/3331
  @3331
  Scenario: Verify a user can vote on Vote Card with filtering set
    Given I am logged in as the "CALPERS" User
    And I navigate to the workflow page
    Then I can view the workflow page
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


  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/28479
  #This test has been automated assuming that there is a typo in the test case and the buttons on the pop up would be 'OK' instead of 'Leave'
  @28479
  Scenario: Verify a Warning Message is returned when user is leaving the Vote Card without clicking 'Vote' button
    Given I am logged in as the "CALPERS" User
    And I navigate to the workflow page
    Then I can view the workflow page
    And I remove all existing selected criteria
    And I have added the criteria for "Decision Status" with status "Voted"
    When I select a random meeting
    Then I can view the Meeting Details page
    When I click on the Change Vote or Rationale button
    And I replace my FOR votes with AGAINST and vice-versa
    And I click on the home button
    Then I should get a popup window with a warning and OK and Cancel buttons
    When I click on the Cancel button
    Then I can verify I am on the Meeting Details page
    When I click on the Workflow option from the toolbar
    And I click on the OK button
    And I refresh the page
    Then I can view the workflow page
    When I select a random meeting
    Then I can view the Meeting Details page
    When I click on the Change Vote or Rationale button
    And I replace my FOR votes with AGAINST and vice-versa
    And I click on the home button
    Then I should get a popup window with a warning and OK and Cancel buttons
    When I click on the OK button
    Then I can view the workflow page
    And I should logout from the application


  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/27932
  # Role default: Allowed -> I test it with "Explicitly Denied" so I expect I will not see those voting options
  @27932
  Scenario Outline: Different permission setup on vote card functionality
    Given I am logged in as the "AUTOMATIONINTERNAL" User
    When I navigate to the User Permissions page
    And I type "RobecoAutomation External Admin" into the user name input
    And I choose the first element from the dropdown
    And I click on the "Workflow Voting" dropdown
    And I change the <permission_name> user permission to <access_decision>
    And I click on the Submit changes button
    And I should logout from the application
    Given I am logged in as the "ROBECO" User
    And I navigate to the workflow page
    Then I can view the workflow page
    When I select the first available meeting
    Then I can view the Meeting Details page
    And The <permission_name> functionality is "not available"
    And I should logout from the application
    Given I am logged in as the "AUTOMATIONINTERNAL" User
    When I navigate to the User Permissions page
    And I type "RobecoAutomation External Admin" into the user name input
    And I choose the first element from the dropdown
    And I click on the "Workflow Voting" dropdown
    And I change the <permission_name> user permission to <default_role_access>
    And I click on the Submit changes button

    Examples:
      | permission_name  | access_decision     | default_role_access |
      | "Vote"           | "Explicitly Denied" | "Role Default"      |
      | "Instruct"       | "Explicitly Denied" | "Role Default"      |
      | "Take No Action" | "Explicitly Denied" | "Role Default"      |
