Feature: Vote Card Tests
#https://dev.azure.com/glasslewis/Development/_testPlans/execute?planId=53607&suiteId=53788

  # TC - https://dev.azure.com/glasslewis/Development/_workitems/edit/28433
  Scenario: Verify the Vote Card Summary Details do not change when a user filters on an Account on the Meeting Details page
    Given I am logged in as the "CALPERS" User
    And I remove all existing selected criteria
    And I have added the criteria for "Decision Status" with status "Voted"
    And I have added the criteria for "Customer Account" with status "SWIM"
    When I select a random meeting
    Then I can view the Meeting Details page
    And I can verify that the Account filter has the value "SWIM"
    And I can verify that the vote card summary remains unchanged when user changes the filters on an account
    And I should logout from the application
