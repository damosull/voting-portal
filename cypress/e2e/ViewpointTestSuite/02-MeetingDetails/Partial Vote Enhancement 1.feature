Feature: Partial Vote Enhancement Tests
#Test Suite - https://dev.azure.com/glasslewis/Development/_testPlans/execute?planId=9215&suiteId=28714

  #Test Case - https://dev.azure.com/glasslewis/Development/_workitems/edit/28715
  @28715
  Scenario: Verify No Warning Message displayed when the user has set a combination partial vote & then navigated away from the Meeting Details page when the user has VOTED
    Given I am logged in as the "CALPERS" User
    And I capture meeting ID by running the query "for meetings with partial vote"
    When I navigate to the meeting details page for the captured meeting ID
    Then I can view the Meeting Details page
    And I save the company name
    And I click on the Clear Partial Vote link if it exists
    And I can see the Set Partial Vote button
    When I click on the Set Partial Vote button
    Then I can see the Partial Vote modal
    And I can verify that the Apply percent buttons are enabled in the Partial Vote modal
    And I can verify that the radio buttons are displayed for NOMINAL & PERCENT fields
    And I should be "able" to see "You have filtered on the following accounts:" on the UI
    And I can increase and decrease % by selecting the up and down arrows
    When I set the partial vote for the first row to 10 percent
    And I save the partial vote changes
    Then A toast message appears for "PARTIAL_VOTE_INPUT_SAVED"
    And I verify that the DB has updated with the absolute amount
    When I close the partial vote modal
    Then I can see the Partial Vote Applied button
    And I click on the Change Vote or Rationale button if it exists
    When I quick vote "For" on the meeting
    And I click on the Vote button
    And I handle the override pop-up if it exists
    Then I can see a Vote success message
    When I click on the home button
    And I set the meetings per page value to "20"
    And I click on the Meeting Date radio button
    Then I can view the workflow page
    And I remove all existing selected criteria
    And I have added the column "Voted Shares"
    When I have added the criteria for "Company Name" "from this test"
    And I scroll to the end of the meetings table
    Then I can verify that the voted shares value matches the saved value
    And I should logout from the application
    When I am logged in as the "CALPERS" User
    And I navigate to the meeting details page for the captured meeting ID
    Then I can view the Meeting Details page
    And I can see the Partial Vote Applied button
    And I should logout from the application


  #Test Case - https://dev.azure.com/glasslewis/Development/_workitems/edit/28716
  @28716
  Scenario: Verify User can choose to 'Vote' where user has chosen a 'NOMINAL' value in the  'Set Partial Vote' modal
    Given I am logged in as the "CALPERS" User
    And I capture meeting ID by running the query "for meetings with partial vote"
    When I navigate to the meeting details page for the captured meeting ID
    Then I can view the Meeting Details page
    And I save the company name
    And I click on the Clear Partial Vote link if it exists
    And I can see the Set Partial Vote button
    When I click on the Set Partial Vote button
    Then I can see the Partial Vote modal
    When I select the nominal radio button
    And I set the partial vote for the first row to 10 shares
    And I save the partial vote changes
    Then A toast message appears for "PARTIAL_VOTE_INPUT_SAVED"
    And I verify that the DB has updated with the absolute amount
    When I close the partial vote modal
    Then I can see the Partial Vote Applied button
    And I click on the Change Vote or Rationale button if it exists
    When I quick vote "For" on the meeting
    And I click on the Vote button
    And I handle the override pop-up if it exists
    Then I can see a Vote success message
    When I click on the home button
    And I click on the Meeting Date radio button
    Then I can view the workflow page
    And I remove all existing selected criteria
    When I have added the criteria for "Company Name" "from this test"
    And I have added the column "Voted Shares"
    Then I can view the workflow page
    And I scroll to the end of the meetings table
    Then I can verify that the voted shares value matches the saved value
    And I should logout from the application


  #Test Case - https://dev.azure.com/glasslewis/Development/_workitems/edit/28717
  @28717
  Scenario: Verify user can select 'Take No Action' where user has chosen '%' option in the 'Set Partial Vote' modal
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
    And I click on the Change Vote or Rationale button if it exists
    And I should be able to verify the Take No Action functionality for a partially voted meeting
    Then I can see the Partial Vote Applied button
    And I should logout from the application


  #Test Case - https://dev.azure.com/glasslewis/Development/_workitems/edit/28718
  @28718
  Scenario: Verify user can select 'Take No Action' option where user has chosen 'NOMINAL' option in the 'Set Partial Vote' modal
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
    And I verify that the DB has updated with the absolute amount
    When I close the partial vote modal
    Then I can see the Partial Vote Applied button
    And I click on the Change Vote or Rationale button if it exists
    And I should be able to verify the Take No Action functionality for a partially voted meeting
    Then I can see the Partial Vote Applied button
    And I should logout from the application


  #Test Case - https://dev.azure.com/glasslewis/Development/_workitems/edit/28719
  @28719
  Scenario: Verify user cannot enter alphanumerics in the 'Set Partial Vote' modal
    Given I am logged in as the "CALPERS" User
    And I capture meeting ID by running the query "for meetings with partial vote"
    When I navigate to the meeting details page for the captured meeting ID
    Then I can view the Meeting Details page
    And I click on the Clear Partial Vote link if it exists
    And I can see the Set Partial Vote button
    When I click on the Set Partial Vote button
    Then I can see the Partial Vote modal
    And I can verify that the radio buttons are displayed for NOMINAL & PERCENT fields
    And I can verify that I cannot enter alphanumeric values in percentage and nominal textboxes
    And I should logout from the application


  #Test Case - https://dev.azure.com/glasslewis/Development/_workitems/edit/28720
  @28720
  Scenario: Verify system throws an error message if User selects 'Value' that is more than the Total 'No. of Shares' in the Set Partial Vote modal
    Given I am logged in as the "CALPERS" User
    And I capture meeting ID by running the query "for meetings with partial vote"
    When I navigate to the meeting details page for the captured meeting ID
    Then I can view the Meeting Details page
    And I click on the Clear Partial Vote link if it exists
    And I can see the Set Partial Vote button
    When I click on the Set Partial Vote button
    Then I can see the Partial Vote modal
    When I select the nominal radio button
    And I enter a value greater than number of shares
    Then A toast message appears for "PARTIAL_VOTE_INPUT_GREATER"
    And the partial vote amount is automatically corrected to total number of shares
    And I should logout from the application
