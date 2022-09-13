Feature: Vote Card Tests
#https://dev.azure.com/glasslewis/Development/_testPlans/execute?planId=53607&suiteId=53788

  #TC - https://dev.azure.com/glasslewis/Development/_workitems/edit/28433
  @28433
  Scenario: Verify the Vote Card Summary Details do not change when a user filters on an Account on the Meeting Details page
    Given I am logged in as the "CALPERS" User
    When I navigate to the workflow page
    Then I can view the workflow page
    And I remove all existing selected criteria
    And I have added the criteria for "Decision Status" with status "Voted"
    And I have added the criteria for "Customer Account" with status "SWIM"
    When I select a random meeting
    Then I can view the Meeting Details page
    And I can verify that the Account filter has the value "SWIM"
    And I can verify that the vote card summary remains unchanged when user changes the filters on "account"
    And I should logout from the application

  #TC - https://dev.azure.com/glasslewis/Development/_workitems/edit/28435
  @28435
  Scenario: Verify filtering on Account does not impact Vote Tally section of the Meeting Details page
    Given I am logged in as the "ROBECO" User
    When I navigate to the meeting details page for the meeting "RBVOAC"
    Then I can view the Meeting Details page
    And I can verify that the Account filter has the value "189506"
    And I can verify that the vote card summary remains unchanged when user changes the filters on "account"
    And I should logout from the application

  #TC - https://dev.azure.com/glasslewis/Development/_workitems/edit/28434
  @28434
  Scenario: Verify filtering on Account Group does NOT impact Vote Tally section
    Given I am logged in as the "ROBECO" User
    When I navigate to the meeting details page for the meeting "RBVOAG"
    Then I can view the Meeting Details page
    And I can verify that the Account Group filter has the value "ProxyExchange Accounts"
    And I can verify that the vote card summary remains unchanged when user changes the filters on "account group"
    And I should logout from the application

  #TC - https://dev.azure.com/glasslewis/Development/_workitems/edit/37937
  @37937
  Scenario: Vote card ballot filtering
    Given I am logged in as the "ROBECO" User
    When I navigate to the workflow page
    Then I can view the workflow page
    And I remove all existing selected criteria
    And I arrange the table in "descending" order for "control number"
    When I select a random meeting
    Then I can view the Meeting Details page
    And I can verify that the Info section displays all read only fields
    When I click on the Ballots filter
    And I select control number 1 from the top
    And I click on the update button for Ballots filter
    Then I should be able to see the results for the Ballots filter
    When I click on the Ballots filter
    And I select control number 2 from the top
    And I click on the update button for Ballots filter
    Then I should be able to see the results for the Ballots filter
    And I should logout from the application

  #TC - https://dev.azure.com/glasslewis/Development/_workitems/edit/37938
  @37938
  Scenario: filter on voted/unvoted ballots
    Given I am logged in as the "CALPERS" User
    When I navigate to the meeting details page for the meeting "CAVOUB"
    Then I can view the Meeting Details page
    And I can use the Filter on unvoted ballots functionality
    And I verify the vote tally modal is displayed when user clicks on the total voted hyperlink
    And I verify that the vote tally modal contains all the expected headers
    When I click on the Ballots Voted Link
    Then I should be "able" to see the "Change Vote or Rationale" on the UI
    And I verify the vote tally modal is displayed when user clicks on the total voted hyperlink
    When I click on the Ballots Not Voted Link
    Then I can see the Vote, Take No Action and Instruct buttons
    And I should logout from the application
