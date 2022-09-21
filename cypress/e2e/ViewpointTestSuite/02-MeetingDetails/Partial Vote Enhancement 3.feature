Feature: Partial Vote Enhancement Tests
#Test Suite - https://dev.azure.com/glasslewis/Development/_testPlans/execute?planId=9215&suiteId=28714

  #Test Case - https://dev.azure.com/glasslewis/Development/_workitems/edit/28728
  @28728
  Scenario: Verify 'Set Partial Vote' button still displays when partial vote has not been set and the user Votes on a meeting
    Given I am logged in as the "CALPERS" User
    And I capture meeting ID by running the query "for meetings with partial vote"
    When I navigate to the meeting details page for the captured meeting ID
    Then I can view the Meeting Details page
    And I click on the Clear Partial Vote link if it exists
    And I can see the Set Partial Vote button
    And I click on the Change Vote or Rationale button if it exists
    When I quick vote "For" on the meeting
    And I click on the Vote button
    And I handle the override pop-up if it exists
    Then I can see a Vote success message
    And I can see the Set Partial Vote button
    And I should logout from the application
    When I am logged in as the "CALPERS" User
    And I navigate to the meeting details page for the captured meeting ID
    Then I can view the Meeting Details page
    And I can see the Set Partial Vote button
    When I click on the Vote button
    And I handle the override pop-up if it exists
    Then I can see a Vote success message
    And I can see the Set Partial Vote button
    And I should logout from the application


  #Test Case - https://dev.azure.com/glasslewis/Development/_workitems/edit/28729
  @28729
  Scenario: Verify 'Partial Vote Applied' button is displayed when user filters on one account and sets partial vote, BUT 'Set Partial Vote' button is displayed when user THEN filters on another account that does not have partial vote applied
    Given I am logged in as the "CALPERS" User
    And I capture meeting ID by running the query "for meetings with partial vote"
    When I navigate to the meeting details page for the captured meeting ID
    Then I can view the Meeting Details page
    When I filter for "first" account
    Then I can see the Set Partial Vote button
    When I click on the Set Partial Vote button
    Then I can see the Partial Vote modal
    When I set the partial vote for the first row to 10 percent
    And I save the partial vote changes
    Then A toast message appears for "PARTIAL_VOTE_INPUT_SAVED"
    When I close the partial vote modal
    Then I can see the Partial Vote Applied button
    When I filter for "second" account
    Then I can see the Set Partial Vote button
    And I click on the Change Vote or Rationale button if it exists
    When I quick vote "For" on the meeting
    And I click on the Vote button
    And I handle the override pop-up if it exists
    Then I can see a Vote success message
    And I can see the Set Partial Vote button
    When I filter for "all" account
    Then I can see the Partial Vote Applied button
    And I should logout from the application


  #Test Case - https://dev.azure.com/glasslewis/Development/_workitems/edit/28731
  @28731
  Scenario: Verify User receives toast message "At least 1 item must be greater than zero" when the total % equals to 0%
    Given I am logged in as the "CALPERS" User
    And I capture meeting ID by running the query "for meetings with partial vote"
    When I navigate to the meeting details page for the captured meeting ID
    Then I can view the Meeting Details page
    And I click on the Clear Partial Vote link if it exists
    And I can see the Set Partial Vote button
    When I click on the Set Partial Vote button
    Then I can see the Partial Vote modal
    And I save the partial vote changes
    Then A toast message appears for "PARTIAL_VOTE_VALUES_UNCHANGED"
    And I should logout from the application


  #Test Case - https://dev.azure.com/glasslewis/Development/_workitems/edit/28732
  @28732
  Scenario: Verify user receives toast message 'You have not applied a valid amount please review values entered' when user enters a value equal to No of Shares
    Given I am logged in as the "CALPERS" User
    And I capture meeting ID by running the query "for meetings with partial vote"
    When I navigate to the meeting details page for the captured meeting ID
    Then I can view the Meeting Details page
    And I click on the Clear Partial Vote link if it exists
    And I can see the Set Partial Vote button
    When I click on the Set Partial Vote button
    Then I can see the Partial Vote modal
    When I select the nominal radio button
    And I enter a value equal to the number of shares
    Then A toast message appears for "PARTIAL_VOTE_INPUT_GREATER"
    And the partial vote amount is automatically corrected to total number of shares
    When I set the partial vote for the first row to 10 shares
    And I save the partial vote changes
    Then A toast message appears for "PARTIAL_VOTE_INPUT_SAVED"
    When I close the partial vote modal
    Then I can see the Partial Vote Applied button
    And I can see the Clear Partial Vote link
    And I should logout from the application


  #Test Case - https://dev.azure.com/glasslewis/Development/_workitems/edit/28733
  @28733
  Scenario: Verify User can set a '%' value in the 'Set Partial Vote' modal and Instruct a meeting
    Given I am logged in as the "CALPERS" User
    And I capture meeting ID by running the query "for meetings with partial vote"
    When I navigate to the meeting details page for the captured meeting ID
    Then I can view the Meeting Details page
    And I click on the Clear Partial Vote link if it exists
    And I can see the Set Partial Vote button
    When I click on the Set Partial Vote button
    Then I can see the Partial Vote modal
    When I apply a 10 percent filter to "all" accounts
    Then A toast message appears for "PARTIAL_VOTE_INPUT_SAVED"
    When I close the partial vote modal
    Then I can see the Partial Vote Applied button
    And I can see the Clear Partial Vote link
    And I click on the Change Vote or Rationale button if it exists
    When I quick vote "For" on the meeting
    Then I should be able to use the Instruct functionality on the meeting
    And I can see the Partial Vote Applied button
    And I should logout from the application
    When I am logged in as the "CALPERS" User
    And I navigate to the meeting details page for the captured meeting ID
    Then I can view the Meeting Details page
    And I can see the Partial Vote Applied button
    And I should logout from the application


  #Test Case - https://dev.azure.com/glasslewis/Development/_workitems/edit/28734
  @28734
  Scenario: Verify User can set a 'NOMINAL' value in the 'Set Partial Vote' modal and 'Instruct' a meeting
    Given I am logged in as the "CALPERS" User
    And I capture meeting ID by running the query "for meetings with partial vote"
    When I navigate to the meeting details page for the captured meeting ID
    Then I can view the Meeting Details page
    And I click on the Clear Partial Vote link if it exists
    And I can see the Set Partial Vote button
    When I click on the Set Partial Vote button
    Then I can see the Partial Vote modal
    When I select the nominal radio button
    And I set the partial vote for the first row to 10 shares
    And I save the partial vote changes
    Then A toast message appears for "PARTIAL_VOTE_INPUT_SAVED"
    When I close the partial vote modal
    Then I can see the Partial Vote Applied button
    And I can see the Clear Partial Vote link
    And I click on the Change Vote or Rationale button if it exists
    When I quick vote "For" on the meeting
    Then I should be able to use the Instruct functionality on the meeting
    And I should logout from the application
