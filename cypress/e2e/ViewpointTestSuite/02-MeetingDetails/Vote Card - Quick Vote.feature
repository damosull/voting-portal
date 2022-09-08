Feature: Vote Card - Quick Vote
#Test Suite - https://dev.azure.com/glasslewis/Development/_testPlans/execute?planId=9215&suiteId=28461

  #Test Case - https://dev.azure.com/glasslewis/Development/_workitems/edit/28462
  @28462
  Scenario: Verify that if a user selects Quick Vote option where Research Paper is published & votes on the Vote Card
    Given I am logged in as the "RUSSELL" User
    When I navigate to the workflow page
    Then I can view the workflow page
    And I remove all existing selected criteria
    When I have added the criteria for "Decision Status" with status "Recommendations Available"
    And I arrange the table in "descending" order for "control number"
    And I select a random meeting
    Then I can view the Meeting Details page
    When I click on the Change Vote or Rationale button if it exists
    And I can verify that the quick vote button is visible and has a width of 125 pixels
    And I can verify that the quick vote dropdown options display a list of valid options
    When I quick vote "MGMT Rec" on the meeting
    Then I can verify that the vote decision match the value from the "mgmt" column
    When I quick vote "GL Rec" on the meeting
    Then I can verify that the vote decision match the value from the "gl" column
    When I quick vote "Policy Rec" on the meeting
    Then I can verify that the vote decision match the value from the "policy" column
    When I click on the Vote button
    And I handle the override pop-up if it exists
    Then I can see a Vote success message
    And I should be "able" to see the "Change Vote or Rationale" on the UI
    And I should be able to verify that all ballots have decision status as "Voted"
    And I should logout from the application


  #Test Case - https://dev.azure.com/glasslewis/Development/_workitems/edit/28463
  @28463
  Scenario: Verify that an Error Message is displayed when a user selects an invalid Quick Vote option
    Given I am logged in as the "WELLINGTON" User
    When I navigate to the workflow page
    Then I can view the workflow page
    And I remove all existing selected criteria
    When I have added the criteria for "Decision Status" with status "Recommendations Pending"
    And I arrange the table in "descending" order for "control number"
    And I select the first available meeting
    Then I can view the Meeting Details page
    When I click on the Change Vote or Rationale button if it exists
    And I can verify that the quick vote dropdown options display a list of valid options
    When I click on the Vote button
    Then I should see a message that contains the text "You must enter a vote decision for"
    When I click on the Cancel button on the vote popup
    And I quick vote "For" on the meeting
    And I click on the Vote button
    And I handle the override pop-up if it exists
    Then I can see a Vote success message
    And I should logout from the application


  #Test Case - https://dev.azure.com/glasslewis/Development/_workitems/edit/28464
  @28464
  Scenario: Verify that if a user select Quick Vote "Policy Rec" & vote on the vote card
    Given I am logged in as the "CALPERS" User
    When I navigate to the workflow page
    Then I can view the workflow page
    And I remove all existing selected criteria
    When I have added the criteria for "Decision Status" with status "Manual Vote Required"
    And I arrange the table in "descending" order for "control number"
    And I select the first available meeting
    Then I can view the Meeting Details page
    When I click on the Change Vote or Rationale button if it exists
    Then I can verify that the quick vote button is visible and has a width of 125 pixels
    And I can verify that the quick vote dropdown options display a list of valid options
    When I quick vote "Policy Rec" on the meeting
    And I click on the Vote button
    Then I should see a message that contains the text "You must enter a vote decision for"
    When I click on the Cancel button on the vote popup
    And I vote for an item which had no previous vote with Glass Lewis Recommendations
    And I click on the Vote button
    And I handle the override pop-up if it exists
    Then I can see a Vote success message
    And I should logout from the application


  #Test Case - https://dev.azure.com/glasslewis/Development/_workitems/edit/28466
  @28466
  Scenario: Verify that if a user select Quick Vote "Against/Withold" & vote on the vote card
    Given I am logged in as the "WELLINGTON" User
    When I navigate to the workflow page
    Then I can view the workflow page
    And I remove all existing selected criteria
    When I have added the criteria for "Decision Status" with status "Recommendations Pending"
    And I arrange the table in "descending" order for "control number"
    And I select the first available meeting
    Then I can view the Meeting Details page
    When I click on the Change Vote or Rationale button if it exists
    And I can verify that the quick vote button is visible and has a width of 125 pixels
    And I can verify that the quick vote dropdown options display a list of valid options
    When I quick vote "Against/Withhold" on the meeting
    And I click on the Vote button
    And I handle the override pop-up if it exists
    Then I can see a Vote success message
    And I should logout from the application