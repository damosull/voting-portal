Feature: Vote Upto Meeting Date
  #Test Suite - https://dev.azure.com/glasslewis/Development/_testPlans/execute?planId=9215&suiteId=9827
  #Test Case 27932 is duplicate and automated as part of 'Vote Button - MD6' feature file.

  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/28496
  @28496
  Scenario: Verify that correct details displayed where the meeting date has passed
    Given I am logged in as the "CHARLESSCHWAB" User
    When I navigate to the workflow page
    Then I can view the workflow page
    And I remove all existing selected criteria
    When I click on the Meeting Date radio button
    And I set the date filter as Next 0 days and Past 30 days
    And I update the date filter
    Then I can view the workflow page
    When I select a random meeting
    Then I can view the Meeting Details page
    And I can verify that the Quick Vote option and Vote Decision are read only
    And I should be "unable" to see "rationales" on the UI
    And I can verify that the voting buttons are disabled
    And I can verify the research html and pdf links take user to the "We could not load the research paper" page
    When I filter for "first" account
    Then I can view the Meeting Details page
    And I should be "able" to see "Account (1)" on the UI
    And I can verify that the Quick Vote option and Vote Decision are read only
    And I am able to add meeting note and post private comment
    When I navigate to the workflow page
    And I set the filter to Upcoming Meetings
    Then I can view the workflow page
    When I select a random meeting
    Then I can view the Meeting Details page
    And I should logout from the application

  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/3288
  @3288
  Scenario: Verify that user cannot vote after 23.59 PST prior to the meeting date
    Given I am logged in as the "RUSSELL" User
    When I navigate to the workflow page
    Then I can view the workflow page
    And I remove all existing selected criteria
    When I click on the Meeting Date radio button
    And I set the date filter between 0 and 0 days from today
    And I update the date filter
    Then I can view the workflow page
    When I select a random meeting
    Then I can view the Meeting Details page
    And I can verify that the voting buttons are disabled
    And I can verify the hover text for the voting buttons gives a valid message
    And I can verify that the Quick Vote option and Vote Decision are read only
    And I should be "unable" to see "rationales" on the UI
    And I can verify the research html and pdf links take user to the "We could not load the research paper" page
    When I filter for "first" account
    Then I can view the Meeting Details page
    And I should be "able" to see "Account (1)" on the UI
    When I navigate to the workflow page
    And I set the filter to Upcoming Meetings
    Then I can view the workflow page
    When I select a random meeting
    Then I can view the Meeting Details page
    And I should logout from the application

  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/3388
  @3388
  Scenario: Verify that user can vote upto 23.59 (SF time) the day before the meeting date
    Given I am logged in as the "RUSSELL" User
    When I navigate to the workflow page
    Then I can view the workflow page
    And I remove all existing selected criteria
    When I click on the Meeting Date radio button
    And I set the date filter between 1 and 1 days from today
    And I update the date filter
    Then I can view the workflow page
    When I select a random meeting
    Then I can view the Meeting Details page
    When I click on the Change Vote or Rationale button if it exists
    And I replace my FOR votes with AGAINST and vice-versa
    And I click on the Vote button
    And I handle the override pop-up if it exists
    Then the vote should be submitted successfully
    When I navigate to the workflow page
    And I set the filter to Upcoming Meetings
    Then I can view the workflow page
    When I select a random meeting
    Then I can view the Meeting Details page
    And I should logout from the application

  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/20638
  @20638
  Scenario: Verify that user can vote upto 23.59 prior to the meeting date on deadline day
    Given I am logged in as the "RUSSELL" User
    When I navigate to the workflow page
    Then I can view the workflow page
    And I remove all existing selected criteria
    When I set the date filter between 0 and 0 days from today
    And I update the date filter
    Then I can view the workflow page
    When I navigate to a meeting with same deadline date and 1 meeting date ahead
    Then I can view the Meeting Details page
    When I click on the Change Vote or Rationale button if it exists
    And I replace my FOR votes with AGAINST and vice-versa
    And I click on the Vote button
    And I handle the override pop-up if it exists
    Then the vote should be submitted successfully
    And I should logout from the application
