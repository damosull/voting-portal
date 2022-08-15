Feature: VAM/VAP Feature

  Scenario: Live ballots with meeting date for future ballots whose meeting date has passed/Revote and no rationale entered for vote against management and vote against policy
    Given I am logged in as the "AUTOMATIONINTERNAL" User
    And I turn on the customer settings for "VAM and VAP" for "Russell Investments"
    Then I should logout from the application
    When I am logged in as the "RUSSELL" User
    And I navigate to the meeting details page for the meeting "RSNCVAMAP"
    Then I can view the Meeting Details page
    When I click on the Change Vote or Rationale button
    And I clear the rationales for VAM entries and VAP entries and add rationales for remaining proposals
    And I click on the Vote button
    Then I should see a message that contains the text "Warning - adding rationale is recommended"
    And I should see a message that contains the text "Vote(s) against policy on proposal(s):"
    And I should see a message that contains the text "Vote(s) against management on proposal(s):"

  Scenario: Live ballots with meeting date for future ballots whose meeting date has passed/Revote and rationale is entered for vote against management
    Given I am logged in as the "RUSSELL" User
    When I navigate to the meeting details page for the meeting "RSNCVAM2"
    Then I can view the Meeting Details page
    When I click on the Change Vote or Rationale button
    And I enter rationales for all proposals in the meeting
    And I click on the Vote button
    Then The Proceed button should be enabled

  Scenario: Live ballots with meeting date for past ballots whose meeting date has passed/Revote and no rationale entered for vote against policy
    Given I am logged in as the "RUSSELL" User
    When I reduce 10 days from meeting date and navigate to the meeting details page for the meeting "RSNCVAP2"
    Then I can view the Meeting Details page
    When I click on the Change Vote or Rationale button
    And I clear the rationales for VAP entries and add rationales for other proposals
    And I click on the Vote button
    Then I should see a message that contains the text "Warning - adding rationale is recommended"
    And I should see a message that contains the text "Vote(s) against policy on proposal(s):"

  Scenario: Live ballots with meeting date for future ballots whose meeting date has passed/Revote and no rationale entered for vote against management
    Given I am logged in as the "RUSSELL" User
    When I navigate to the meeting details page for the meeting "RSNCVAM1"
    Then I can view the Meeting Details page
    When I click on the Change Vote or Rationale button
    And I clear the rationales for VAM entries and add rationales for other proposals
    And I click on the Vote button
    Then I should see a message that contains the text "Warning - adding rationale is recommended"
    And I should see a message that contains the text "Vote(s) against management on proposal(s):"
    And I should logout from the application
