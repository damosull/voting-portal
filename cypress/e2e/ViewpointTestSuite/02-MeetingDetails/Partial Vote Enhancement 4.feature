Feature: Partial Vote Enhancement Tests
  #Test Suite - https://dev.azure.com/glasslewis/Development/_testPlans/execute?planId=9215&suiteId=28714

  #Test Case - https://dev.azure.com/glasslewis/Development/_workitems/edit/28736
  @28736
  Scenario: BUG-4886 - New Partial Voting Default Percent on Customer Level Changes TC1
    Given I am logged in as the "CALPERS" User
    And I capture meeting ID by running the query "for meetings with partial vote"
    When I navigate to the meeting details page for the captured meeting ID
    Then I can view the Meeting Details page
    And I click on the Clear Partial Vote link if it exists
    And I can see the Set Partial Vote button
    When I click on the Set Partial Vote button
    Then I can see the Partial Vote modal
    And I can see zero values in the partial vote amount applied textbox
    And I should logout from the application


  #Test Case - https://dev.azure.com/glasslewis/Development/_workitems/edit/28737
  @28737
  Scenario: BUG-4886 - New Partial Voting Default Percent on Customer Level Changes TC2
    Given I am logged in as the "CALPERS" User
    And I capture meeting ID by running the query "for meetings with partial vote"
    When I navigate to the meeting details page for the captured meeting ID
    Then I can view the Meeting Details page
    And I click on the Clear Partial Vote link if it exists
    And I can see the Set Partial Vote button
    When I click on the Set Partial Vote button
    Then I can see the Partial Vote modal
    And I can verify that the apply percent at customer level is 0
    And I should logout from the application


  #Test Case - https://dev.azure.com/glasslewis/Development/_workitems/edit/28738
  @28738 @ignore
  Scenario: BUG-4886 - New Partial Voting Default Percent on Customer Level Changes TC3
    Given I am logged in as the "CALPERS" User
    And I capture meeting ID by running the query "for meetings with partial vote"
    When I navigate to the meeting details page for the captured meeting ID
    Then I can view the Meeting Details page
    And I click on the Clear Partial Vote link if it exists
    And I can see the Set Partial Vote button
    When I click on the Set Partial Vote button
    Then I can see the Partial Vote modal
    When I click on the apply percent to all button
    Then A toast message appears for "PARTIAL_VOTE_INCORRECT_PERCENTAGE"
    And I can verify that the apply percent at customer level is 0
    And I should logout from the application


  #Test Case - https://dev.azure.com/glasslewis/Development/_workitems/edit/28739
  @28739
  Scenario: BUG-4886 - New Partial Voting Default Percent on Customer Level Changes TC4
    Given I am logged in as the "CALPERS" User
    And I capture meeting ID by running the query "for meetings with partial vote"
    When I navigate to the meeting details page for the captured meeting ID
    Then I can view the Meeting Details page
    And I click on the Clear Partial Vote link if it exists
    And I can see the Set Partial Vote button
    When I click on the Set Partial Vote button
    Then I can see the Partial Vote modal
    And I can verify that the apply percent at customer level is 0
    When I apply a 5 percent filter to "all" accounts
    Then A toast message appears for "PARTIAL_VOTE_INPUT_SAVED"
    And I can verify that all partial vote percent on the page is 5
    And I should logout from the application


  #Test Case - https://dev.azure.com/glasslewis/Development/_workitems/edit/28740
  @28740
  Scenario: BUG-4886 - New Partial Voting Default Percent on Customer Level Changes TC5
    Given I am logged in as the "CALPERS" User
    And I capture meeting ID by running the query "for meetings with partial vote"
    When I navigate to the meeting details page for the captured meeting ID
    Then I can view the Meeting Details page
    And I click on the Clear Partial Vote link if it exists
    And I can see the Set Partial Vote button
    When I click on the Set Partial Vote button
    Then I can see the Partial Vote modal
    When I set the partial vote for the first row to 10 percent
    And I save the partial vote changes
    Then A toast message appears for "PARTIAL_VOTE_INPUT_SAVED"
    When I apply a 10 percent filter to "unapplied" accounts
    Then A toast message appears for "PARTIAL_VOTE_INPUT_SAVED"
    And I can verify that all partial vote percent on the page is 10
    And I should logout from the application
