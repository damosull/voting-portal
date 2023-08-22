Feature: Partial Vote Enhancement Tests
  #Test Suite - https://dev.azure.com/glasslewis/Development/_testPlans/execute?planId=9215&suiteId=28714

  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/28721
  @28721
  Scenario: Verify NO 'Set Partial Vote' button available for historical meetings where they don't hold the security for that meeting
    Given I am logged in as the "CALPERS" user
    And I capture meeting ID by running the query "for meetings with partial vote"
    When I navigate to the meeting details page for the meeting "stored as environment variable"
    Then I can view the Meeting Details page
    And I click on the Clear Partial Vote link if it exists
    And I can see the Set Partial Vote button
    And I should logout from the application
    When I am logged in as the "PUTNAM" user
    And I navigate to the meeting details page for the meeting "stored as environment variable"
    Then I can view the Meeting Details page
    And I should be "able" to see "You do not have ballots for this meeting" on the UI
    And I should logout from the application


  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/28722
  @28722
  Scenario: Verify 'Set Partial Vote' modal will be available for Past meetings but will be read only
    Given I am logged in as the "CALPERS" user
    And I capture meeting ID by running the query "for meetings with partial vote"
    Then I can verify that the set partial vote modal is read only for past meetings
    And I should logout from the application


  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/28723
  @28723
  Scenario: Verify User will receive toast message 'You have not applied a valid amount (%) please review values entered' if the total % equals to 100%
    Given I am logged in as the "CALPERS" user
    And I capture meeting ID by running the query "for meetings with partial vote"
    When I navigate to the meeting details page for the meeting "stored as environment variable"
    Then I can view the Meeting Details page
    And I click on the Clear Partial Vote link if it exists
    And I can see the Set Partial Vote button
    When I click on the Set Partial Vote button
    Then I can see the Partial Vote modal
    When I enter a percent greater than number of shares
    Then A toast message appears for "PARTIAL_VOTE_INPUT_GREATER"
    And the partial vote percent is automatically corrected to 100%
    When I close the partial vote modal
    Then I can see the Set Partial Vote button
    When I click on the Set Partial Vote button
    Then I can see the Partial Vote modal
    When I set the partial vote for the first row to 50 percent
    And I save the partial vote changes
    Then A toast message appears for "PARTIAL_VOTE_INPUT_SAVED"
    When I close the partial vote modal
    Then I can see the Clear Partial Vote link
    When I quick vote "For" on the meeting
    And I click on the Vote button
    And I handle the override pop-up if it exists
    Then I can see a Vote success message
    And I should logout from the application


  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/28726
  @28726
  Scenario: Verify user can click 'Clear partial vote' button to clear previously saved partial vote and reset back to the "Partial Vote Percentage" Value on the Customer Profile Page
    Given I am logged in as the "CALPERS" user
    When I navigate to the meeting details page for the meeting "stored as environment variable"
    Then I can view the Meeting Details page
    And I can see the Partial Vote Applied button
    When I click on the Partial Vote Applied button
    Then I can see the Partial Vote modal
    When I set the partial vote for the first row to 49 percent
    And I save the partial vote changes
    Then A toast message appears for "PARTIAL_VOTE_INPUT_SAVED"
    And I verify that the DB has updated with the absolute amount
    When I close the partial vote modal
    Then I can verify I am on the Meeting Details page
    When I click on the Clear Partial Vote link
    Then I can see the Set Partial Vote button
    And A toast message appears for "PARTIAL_VOTE_CLEANED"
    And I can see zero values in the partial vote amount applied textbox
    When I close the partial vote modal
    Then I can verify I am on the Meeting Details page
    And I should be "unable" to see "Clear partial vote" on the UI
    And I can see the Set Partial Vote button
    When I click on the Set Partial Vote button
    Then I can see the Partial Vote modal
    And I verify that the absolute amount for the current meeting is correct
    And I should logout from the application


  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/28725
  @28725
  Scenario: Verify user can click 'Clear partial vote' button to clear previously saved partial vote
    Given I am logged in as the "CALPERS" user
    And I capture meeting ID by running the query "for meetings with partial vote"
    When I navigate to the meeting details page for the meeting "stored as environment variable"
    Then I can view the Meeting Details page
    And I click on the Change Vote or Rationale button if it exists
    And I click on the Clear Partial Vote link if it exists
    When I quick vote "For" on the meeting
    And I click on the Vote button
    And I handle the override pop-up if it exists
    Then I can see a Vote success message
    When I click on the Set Partial Vote button
    Then I can see the Partial Vote modal
    When I set the partial vote for the first row to 50 percent
    And I save the partial vote changes
    Then A toast message appears for "PARTIAL_VOTE_INPUT_SAVED"
    When I close the partial vote modal
    Then I can see the Clear Partial Vote link
    And I should be "able" to see "For your updated settings to be processed for your ballots please Re-Vote the meeting." on the UI
    And I verify that the DB has updated with the absolute amount
    And I can see the Partial Vote Applied button
    When I click on the Clear Partial Vote link
    Then I can see the Set Partial Vote button
    And A toast message appears for "PARTIAL_VOTE_CLEANED"
    And I can see zero values in the partial vote amount applied textbox
    And I close the partial vote modal
    And I should logout from the application


  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/28727
  @28727
  Scenario: Verify warning message displays when user has set partial vote and navigates away from Meeting Details page WITHOUT VOTING
    Given I am logged in as the "CALPERS" user
    And I capture meeting ID by running the query "for meetings with partial vote"
    When I navigate to the meeting details page for the meeting "stored as environment variable"
    Then I can view the Meeting Details page
    And I click on the Clear Partial Vote link if it exists
    And I can see the Set Partial Vote button
    When I click on the Set Partial Vote button
    Then I can see the Partial Vote modal
    When I set the partial vote for the first row to 10 percent
    And I save the partial vote changes
    Then A toast message appears for "PARTIAL_VOTE_INPUT_SAVED"
    And I verify that the DB has updated with the absolute amount
    When I close the partial vote modal
    Then I can see the Partial Vote Applied button
    And I can see the Clear Partial Vote link
    And I click on the Change Vote or Rationale button if it exists
    When I click on the next meeting button
    Then I should be "able" to see "Confirm Navigation" on the UI
    Then I should be "able" to see "You have applied a partial vote to this meeting but have not Voted your ballots. Are you sure you want to leave this page?" on the UI
    Then I should be "able" to see "Leave this page" on the UI
    Then I should be "able" to see "Stay on this page" on the UI
    And I click on the Cancel button
    When I click on the previous meeting button
    Then I should be "able" to see "Confirm Navigation" on the UI
    Then I should be "able" to see "You have applied a partial vote to this meeting but have not Voted your ballots. Are you sure you want to leave this page?" on the UI
    Then I should be "able" to see "Leave this page" on the UI
    Then I should be "able" to see "Stay on this page" on the UI
    And I click on the Cancel button
    When I click on the Workflow option from the toolbar
    Then I can view the workflow page
