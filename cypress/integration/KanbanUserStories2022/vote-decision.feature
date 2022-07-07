Feature: Vote Decision Tests
#https://dev.azure.com/glasslewis/Development/_testPlans/define?planId=53607&suiteId=54187

  #TC - https://dev.azure.com/glasslewis/Development/_workitems/edit/28476
  Scenario: Verify that warning message  "You are voting against your custom policy for items xx.xx" is not be displayed when Policy Rec = Manual
    Given I am logged in as the "CALPERS" User
    And I remove all existing selected criteria
    And I have added the criteria for "Decision Status" with status "Manual Vote Required"
    When I select the first available meeting
    Then I can view the Meeting Details page
    When I vote for an item which had no previous vote with Glass Lewis Recommendations
    And I click on the Vote button
    Then I can see a Vote success message
    And I should logout from the application
