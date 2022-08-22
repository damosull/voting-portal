Feature: Vote Decision Tests
#https://dev.azure.com/glasslewis/Development/_testPlans/define?planId=53607&suiteId=54187

  # TC - https://dev.azure.com/glasslewis/Development/_workitems/edit/28476
  Scenario: Verify that warning message  "You are voting against your custom policy for items xx.xx" is not be displayed when Policy Rec = Manual
    Given I am logged in as the "CALPERS" User
    And I navigate to the workflow page
    Then I can view the workflow page
    And I remove all existing selected criteria
    And I have added the criteria for "Decision Status" with status "Manual Vote Required"
    When I select a random meeting
    Then I can view the Meeting Details page
    When I vote for an item which had no previous vote with Glass Lewis Recommendations
    And I click on the Vote button
    Then I can see a Vote success message
    And I should logout from the application

  # https://dev.azure.com/glasslewis/Development/_testPlans/execute?planId=9215&suiteId=28472
  # TC ID - 28474
  @28474
  Scenario: Verify that a Validation Message is displayed
    Given I am logged in as the "ROBECO" User
    And I navigate to the workflow page
    Then I can view the workflow page
    And I remove all existing selected criteria
    And I have added the criteria for "Decision Status" with status "Recommendations Pending"
    And I select a random meeting
    Then I can view the Meeting Details page
    When I click on the Change Vote or Rationale button if it exists
    And I click on the Vote button
    Then I should see a message that contains the text "You must enter a vote decision for"

  # https://dev.azure.com/glasslewis/Development/_testPlans/execute?planId=9215&suiteId=28472
  # TC ID - 28473 & 28475
  @28473 @28475
  Scenario Outline: Verify Validation Messages
    Given I am logged in as the "CALPERS" User
    And I navigate to the workflow page
    Then I can view the workflow page
    And I remove all existing selected criteria
    And I have added the criteria for "Decision Status" with status <decision_staus>
    And I navigate to the <company_sequence>. meeting
    Then I can view the Meeting Details page
    When I click on the Change Vote or Rationale button if it exists
    And I click on the Vote button
    Then I should see a message that contains the text "You must enter a vote decision for"

    Examples:
    | decision_staus              | company_sequence  |
    | "Manual Vote Required"      | 1                 |
    | "Manual Vote Required"      | 2                 |