Feature: Vote Tally Folder Tests
#Test Suite - https://dev.azure.com/glasslewis/Development/_testPlans/execute?planId=9215&suiteId=9447

  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/2590
  @2590
  Scenario: Verify a user lands on current Meeting it displays correct Vote Tally Counts for Combination of ballots
    Given I am logged in as the "CALPERS" User
    When I navigate to the workflow page
    Then I can view the workflow page
    And I remove all existing selected criteria
    And I arrange the table in "descending" order for "control number"
    When I have added the criteria for "Decision Status" with status "Recommendations Pending"
    And I select the first available meeting
    Then I can view the Meeting Details page
    And I save the meeting url
    And I click on the Change Vote or Rationale button if it exists
    And I verify the vote tally section displays counts of total voted and total not voted items
    And I should be "able" to see "Recommendations Pending under Vote Tally" on the UI
    When I filter for "first" account
    And I replace my FOR votes with AGAINST and vice-versa
    And I click on the Vote button
    And I handle the override pop-up if it exists
    Then I can see a Vote success message
    And I should be "able" to see "Voted under Vote Tally" on the UI
    And I should be "able" to see "Recommendations Pending under Vote Tally" on the UI
    When I filter for "second" account
    And I click on the Change Vote or Rationale button if it exists
    And I replace my FOR votes with AGAINST and vice-versa
    Then I should be able to use the Take No Action functionality on the meeting
    And I should be "able" to see "Voted under Vote Tally" on the UI
    And I should be "able" to see "Take No Action under Vote Tally" on the UI
    And I should be "able" to see "Recommendations Pending under Vote Tally" on the UI
    When I filter for "all but top two" account
    And I click on the Change Vote or Rationale button if it exists
    And I replace my FOR votes with AGAINST and vice-versa
    Then I should be able to use the Instruct functionality on the meeting
    And I should be "able" to see "Voted under Vote Tally" on the UI
    And I should be "able" to see "Take No Action under Vote Tally" on the UI
    And I should be "able" to see "Review Required under Vote Tally" on the UI
    And I should be "unable" to see "Recommendations Pending under Vote Tally" on the UI
    And I verify the vote tally modal is displayed when user clicks on the total voted hyperlink
    And I verify that the vote tally modal contains all the expected headers
    And I verify that the vote tally modal displays a value for each table column
    When I close the vote tally popup
    Then I can verify that the vote card summary remains unchanged when user changes the filters on "account"
    And I should logout from the application

  
  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/28455
  @28455
  Scenario: Verify when a user lands on current Meeting it displays correct Vote Tally Counts after Voting
    Given I am logged in as the "RUSSELL" User
    When I navigate to the workflow page
    Then I can view the workflow page
    And I remove all existing selected criteria
    When I have added the criteria for "Decision Status" with status "Recommendations Pending"
    And I select a random meeting
    Then I can view the Meeting Details page
    And I verify the vote tally section displays counts of total voted and total not voted items
    And I should be "able" to see "Recommendations Pending under Vote Tally" on the UI
    When I replace my FOR votes with AGAINST and vice-versa
    And I click on the Vote button
    And I handle the override pop-up if it exists
    Then I can see a Vote success message
    And I verify that the total voted number has changed to the previous total not voted number
    And I should be "unable" to see "Recommendations Pending under Vote Tally" on the UI
    And I verify the vote tally modal is displayed when user clicks on the total voted hyperlink
    And I verify that the vote tally modal contains all the expected headers
    And I verify that the vote tally with count of 0 is not hyperlinked
    And I verify that the vote tally modal displays a value for each table column
    And I close the vote tally popup
    And I should logout from the application
    

  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/28456
  @28456
  Scenario: Verify Vote Tally has correct counts for meeting with Decision Status = Recommendations Available
    Given I am logged in as the "RUSSELL" User
    When I navigate to the workflow page
    Then I can view the workflow page
    And I remove all existing selected criteria
    And I arrange the table in "descending" order for "control number"
    When I have added the criteria for "Decision Status" with status "Recommendations Available"
    And I select the first available meeting
    Then I can view the Meeting Details page
    And I verify the vote tally section displays counts of total voted and total not voted items
    And I should be "able" to see "Recommendations Available under Vote Tally" on the UI
    When I filter for "first" account
    And I replace my FOR votes with AGAINST and vice-versa
    Then I should be able to use the Instruct functionality on the meeting
    And I should be "able" to see "Recommendations Available under Vote Tally" on the UI
    And I should be "able" to see "Review Required under Vote Tally" on the UI
    And I verify that the Instruct button has changed to Re-Instruct button
    And I verify the vote tally modal is displayed when user clicks on the total voted hyperlink
    And I verify that the vote tally modal contains all the expected headers
    And I verify that the vote tally modal displays a value for each table column
    And I close the vote tally popup
    And I should logout from the application


  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/28457
  @28457
  Scenario: Verify Vote Tally has correct counts for meeting with Decision Status = Manual Vote Required
    Given I am logged in as the "CALPERS" User
    When I navigate to the workflow page
    Then I can view the workflow page
    And I remove all existing selected criteria
    When I have added the criteria for "Decision Status" with status "Manual Vote Required"
    And I have added the criteria for "Customer Account" with status "SWIM"
    And I select a random meeting
    Then I can view the Meeting Details page
    And I verify the vote tally section displays counts of total voted and total not voted items
    And I should be "able" to see "Manual Vote Required under Vote Tally" on the UI
    And I can verify that the Account filter has the value "SWIM"
    When I replace my FOR votes with AGAINST and vice-versa
    Then I should be able to use the Take No Action functionality on the meeting
    And I should be "able" to see "Manual Vote Required under Vote Tally" on the UI
    And I should be "able" to see "Take No Action under Vote Tally" on the UI
    And I should be "able" to see "Change Vote or Rationale" on the UI
    And I verify the vote tally modal is displayed when user clicks on the total voted hyperlink
    And I verify that the vote tally modal contains all the expected headers
    And I verify that the vote tally modal displays a value for each table column
    And I close the vote tally popup
    And I should logout from the application


  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/28458
  @28458
  Scenario: Verify when a user lands on current Meeting with Decision Status = Info Only it displays correct  Vote Tally Counts for Info Only
    Given I am logged in as the "CALPERS" User
    When I navigate to the meeting details page for the meeting "CAIO"
    Then I can view the Meeting Details page
    And I verify the vote tally section displays counts of total voted and total not voted items
    And I should be "able" to see "Info Only under Vote Tally" on the UI
    And I can verify that the Quick Vote option is disabled and Vote Decision options are unavailable
    And I should be "unable" to see "Vote Button" on the UI
    And I verify the vote tally modal is displayed when user clicks on the total voted hyperlink
    And I verify that the vote tally modal contains all the expected headers
    And I verify that the vote tally modal displays a value for each table column
    And I close the vote tally popup
    And I should logout from the application


  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/28459
  @28459
  Scenario: Verify a user lands on current Meeting it displays correct Vote Tally counts
    Given I am logged in as the "CALPERS" User
    When I navigate to the Meeting Details page for the saved meeting ID
    Then I can view the Meeting Details page
    And I should be "able" to see "Voted under Vote Tally" on the UI
    And I should be "able" to see "Take No Action under Vote Tally" on the UI
    And I should be "able" to see "Review Required under Vote Tally" on the UI
    And I verify the vote tally modal is displayed when user clicks on the total voted hyperlink
    And I verify that the vote tally modal contains all the expected headers
    And I verify that the vote tally modal displays a value for each table column
    And I close the vote tally popup
    And I should logout from the application

  
  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/28460
  @28460
  Scenario: Verify that Vote Tally section does not change based on Filtering on the Meeting Details page
    Given I am logged in as the "RUSSELL" User
    When I navigate to the workflow page
    Then I can view the workflow page
    When I remove all existing selected criteria
    And I arrange the table in "descending" order for "policy id"
    And I select the first available meeting
    Then I can view the Meeting Details page
    And I can verify that the vote card summary remains unchanged when user changes the filters on "policy"
    And I verify the vote tally modal is displayed when user clicks on the total voted hyperlink
    And I verify that the vote tally modal displays a value for each table column
    And I close the vote tally popup
    And I should logout from the application