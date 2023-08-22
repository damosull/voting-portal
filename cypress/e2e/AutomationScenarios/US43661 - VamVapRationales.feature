Feature: VAM/VAP Feature
  #Test Suite - https://dev.azure.com/glasslewis/Development/_testPlans/define?planId=48536&suiteId=48537

  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/44714 https://dev.azure.com/glasslewis/Development/_workitems/edit/44716
  @44714 @44716
  Scenario: Live ballots with meeting date for future ballots whose meeting date has passed/Revote and no rationale entered for vote against management and vote against policy
    Given I am logged in as the "AUTOMATIONINTERNAL" user
    And I turn "on" the customer settings for "VAM and VAP" for "Russell Investments"
    Then I should logout from the application
    When I am logged in as the "RUSSELL" user
    And I add 10 days to the meeting "RSNCVAMAP"
    And I navigate to the meeting details page for the meeting "RSNCVAMAP"
    Then I can view the Meeting Details page
    When I click on the Change Vote or Rationale button
    And I clear the rationales for VAM entries and VAP entries and add rationales for remaining proposals
    And I click on the Vote button
    Then I should see a message that contains the text "Warning - adding rationale is recommended"
    And I should see a message that contains the text "Vote(s) against policy on proposal(s):"
    And I should see a message that contains the text "Vote(s) against management on proposal(s):"


  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/44714 https://dev.azure.com/glasslewis/Development/_workitems/edit/44716
  @44714 @44716
  Scenario: Live ballots with meeting date for future ballots whose meeting date has passed/Revote and rationale is entered for vote against management
    Given I am logged in as the "RUSSELL" user
    And I add 10 days to the meeting "RSNCVAM2"
    When I navigate to the meeting details page for the meeting "RSNCVAM2"
    Then I can view the Meeting Details page
    When I click on the Change Vote or Rationale button
    And I enter rationales for all proposals in the meeting
    And I click on the Vote button
    Then The Proceed button should be enabled


  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/44714 https://dev.azure.com/glasslewis/Development/_workitems/edit/44716
  @44714 @44716
  Scenario: Live ballots with meeting date for past ballots whose meeting date has passed/Revote and no rationale entered for vote against policy
    Given I am logged in as the "RUSSELL" user
    When I set the meeting date to -10 days from today and navigate to the meeting details page for the meeting "RSNCVAP2"
    Then I can view the Meeting Details page
    When I click on the Change Vote or Rationale button
    And I clear the rationales for VAP entries and add rationales for other proposals
    And I click on the Vote button
    Then I should see a message that contains the text "Warning - adding rationale is recommended"
    And I should see a message that contains the text "Vote(s) against policy on proposal(s):"


  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/44714 https://dev.azure.com/glasslewis/Development/_workitems/edit/44716
  @44714 @44716
  Scenario: Live ballots with meeting date for future ballots whose meeting date has passed/Revote and no rationale entered for vote against management
    Given I am logged in as the "RUSSELL" user
    And I add 10 days to the meeting "RSNCVAM1"
    When I navigate to the meeting details page for the meeting "RSNCVAM1"
    Then I can view the Meeting Details page
    When I click on the Change Vote or Rationale button
    And I clear the rationales for VAM entries and add rationales for other proposals
    And I click on the Vote button
    Then I should see a message that contains the text "Warning - adding rationale is recommended"
    And I should see a message that contains the text "Vote(s) against management on proposal(s):"
    And I should logout from the application
