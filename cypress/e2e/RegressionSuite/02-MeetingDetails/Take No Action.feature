Feature: Take No Action Folder Tests
  #Test Suite - https://dev.azure.com/glasslewis/Development/_testPlans/execute?planId=9215&suiteId=9386

  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/2949
  @2949
  Scenario: Verify NO Error Message is displayed when 'Vote' option is selected where Vote Decision dropdown has 'X values'
    Given I am logged in as the "NEUBERGER" user
    When I navigate to the workflow page
    Then I can view the workflow page
    And I arrange the table in "descending" order for "control number"
    When I have added the criteria for "Decision Status" with status "Recommendations Pending"
    And I select the first available meeting
    Then I can view the Meeting Details page
    And I save the meeting url
    And I click on the Change Vote or Rationale button if it exists
    When I filter for "first" account
    And I replace my FOR votes with AGAINST and vice-versa
    And I click on the Vote button
    And I handle the override pop-up if it exists
    Then I can see a Vote success message
    When I filter for "second" account
    And I click on the Change Vote or Rationale button if it exists
    And I replace my FOR votes with AGAINST and vice-versa
    And I click on the Vote button
    And I handle the override pop-up if it exists
    Then I can see a Vote success message
    When I filter for "all" account
    And I click on the Change Vote or Rationale button if it exists
    And I quick vote "For" on the meeting
    And I click on the Vote button
    And I handle the override pop-up if it exists
    Then I can see a Vote success message
    And I should be "able" to see "Voted under Vote Tally" on the UI
    And I should logout from the application


  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/3293
  @3293
  Scenario: Verify a user can Take No Action on Vote Card page & verify correct vote string should display in "Last Vote" field
    Given I am logged in as the "CALPERS" user
    When I navigate to the workflow page
    Then I can view the workflow page
    When I have added the criteria for "Decision Status" with status "Manual Vote Required"
    And I select a random meeting
    Then I can view the Meeting Details page
    And I save the company name
    And The "Vote" functionality is "available"
    And The "Instruct" functionality is "available"
    And The "Take No Action" functionality is "available"
    When I replace my FOR votes with AGAINST and vice-versa
    Then I should be able to use the Take No Action functionality on the meeting
    When I navigate to the workflow page
    Then I can view the workflow page
    And I remove all existing selected criteria
    When I have added the criteria for "Company Name" "from this test"
    Then I should be able to see and navigate to the company name saved previously
    And I can view the Meeting Details page
    And I should be "able" to see "Change Vote or Rationale" on the UI
    And I can verify that "TNA" is displayed in the "Last Vote" field in the ballot section
    And I should logout from the application


  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/3295
  @3295
  Scenario: Verify a user can Revote on Vote Card page
    Given I am logged in as the "CALPERS" user
    And I navigate to the workflow page
    Then I can view the workflow page
    And I have added the criteria for "Decision Status" with status "Take No Action"
    When I select a random meeting
    Then I can view the Meeting Details page
    And I save the company name
    And I should be "able" to see "Change Vote or Rationale" on the UI
    When I click on the Change Vote or Rationale button
    And I quick vote with the first available option on the dropdown
    And I click on the Vote button
    And I handle the override pop-up if it exists
    Then I can see a Vote success message
    When I navigate to the workflow page
    Then I can view the workflow page
    And I remove all existing selected criteria
    When I have added the criteria for "Decision Status" with status "Voted"
    And I have added the criteria for "Company Name" "from this test"
    And I can view the workflow page
    Then I should be able to see and navigate to the company name saved previously
    And I can view the Meeting Details page
    And I should be "able" to see "Change Vote or Rationale" on the UI
    And I should logout from the application


  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/3306
  @3306
  Scenario: Verify no validation messages displayed
    Given I am logged in as the "CALPERS" user
    And I navigate to the workflow page
    Then I can view the workflow page
    And I have added the criteria for "Decision Status" with status "Manual Vote Required"
    When I select the first available meeting
    Then I can view the Meeting Details page
    And I save the company name
    And The "Vote" functionality is "available"
    And The "Instruct" functionality is "available"
    And The "Take No Action" functionality is "available"
    When I quick vote with the first available option on the dropdown
    Then I should be able to use the Take No Action functionality on the meeting
    When I navigate to the workflow page
    Then I can view the workflow page
    And I should be "unable" to see the text "requires a vote decision" on the UI
    And I should be "unable" to see the text "you are voting contrary to your custom policy" on the UI
    And I remove all existing selected criteria
    When I have added the criteria for "Decision Status" with status "Take No Action"
    And I have added the criteria for "Company Name" "from this test"
    And I can view the workflow page
    Then I should be able to see and navigate to the company name saved previously
    And I can view the Meeting Details page
    And I should logout from the application
