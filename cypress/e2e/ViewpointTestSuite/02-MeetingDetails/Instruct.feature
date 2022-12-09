Feature: Instruct
  #Test Suite - https://dev.azure.com/glasslewis/Development/_testPlans/execute?planId=9215&suiteId=9249
  #Test Case 27932 is duplicate and automated as part of 'Vote Button - MD6' feature file.

  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/3056
  @3056
  Scenario: User can Instruct on meeting up to 23.59 PST day prior to Meeting date
    Given I am logged in as the "CHARLESSCHWAB" User
    When I navigate to the workflow page
    Then I can view the workflow page
    And I remove all existing selected criteria
    Then I can view the workflow page
    When I click on the Meeting Date radio button
    And I set the date filter between 1 and 1 days from today
    And I update the date filter
    Then I can view the workflow page
    When I select a random meeting
    Then I can view the Meeting Details page
    When I click on the Change Vote or Rationale button if it exists
    Then I can see the Vote, Take No Action and Instruct buttons
    When I should be able to use the Instruct functionality on the meeting
    Then I verify that the Instruct button has changed to Re-Instruct button
    When I navigate to the workflow page
    And I set the filter to Upcoming Meetings
    Then I can view the workflow page
    When I select a random meeting
    Then I can view the Meeting Details page
    And I should logout from the application


  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/28497
  @28497
  Scenario: Verify on day of meeting 'Instruct' button will be available but disabled
    Given I am logged in as the "CALPERS" User
    When I navigate to the workflow page
    Then I can view the workflow page
    And I remove all existing selected criteria
    Then I can view the workflow page
    When I click on the Meeting Date radio button
    And I set the date filter between 0 and 0 days from today
    And I update the date filter
    Then I can view the workflow page
    When I select a random meeting
    Then I can view the Meeting Details page
    And I can verify that the voting buttons are disabled
    When I navigate to the workflow page
    And I set the filter to Upcoming Meetings
    Then I can view the workflow page
    When I select a random meeting
    Then I can view the Meeting Details page
    And I should logout from the application


  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/28498
  @28498
  Scenario: Verify 'Instruct' button will not appear when meeting date has passed
    Given I am logged in as the "IMF" User
    When I navigate to the workflow page
    Then I can view the workflow page
    And I remove all existing selected criteria
    Then I can view the workflow page
    When I click on the Meeting Date radio button
    And I set the date filter as Next 0 days and Past 30 days
    And I update the date filter
    Then I can view the workflow page
    When I select a random meeting
    Then I can view the Meeting Details page
    And I can verify that the voting buttons are disabled
    When I navigate to the workflow page
    And I set the filter to Upcoming Meetings
    Then I can view the workflow page
    When I select a random meeting
    Then I can view the Meeting Details page
    And I should logout from the application
