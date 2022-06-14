Feature: ac1

#  Background:
#    Given I login as Internal User and retrieve Customer ID for "Russell Investments"
#    When I verify customer settings for VAM and VAP
#
#  Scenario: Live ballots with meeting date for future ballots whose meeting date has passed/Revote and no rationale entered for vote against management and vote against policy
#    Given I login as Internal User and retrieve Customer ID for "Russell Investments"
#    When I verify customer settings for VAM and VAP
#    When I login as External User "RUSSELL"
#    And I change meeting date on Russell meeting id "1016711" to 10 days in the future and navigate to it
#    And I clear the rationales for VAM entries and VAP entries and add rationales for remaining proposals
#    And I click the vote button and check the override checkbox
#    Then the Proceed button should be disabled
#    And there should be a warning message that states "You are voting against policy for proposal X"
#    And there should be a warning message that states "You are voting against management for proposal X"
#
#  Scenario: Live ballots with meeting date for future ballots whose meeting date has passed/Revote and rationale is entered for vote against management
#    Given I login as Internal User and retrieve Customer ID for "Russell Investments"
#    When I verify customer settings for VAM and VAP
#    When I login as External User "RUSSELL"
#    And I change meeting date on Russell meeting id "1070063" to 10 days in the future and navigate to it
#    And I enter rationales for all proposals in the meeting
#    And I click the vote button and check the override checkbox
#    Then the Proceed button should be enabled
#
#  Scenario: Live ballots with meeting date for past ballots whose meeting date has passed/Revote and no rationale entered for vote against policy
#    Given I login as Internal User and retrieve Customer ID for "Russell Investments"
#    When I verify customer settings for VAM and VAP
#    When I login as External User "RUSSELL"
#    And I change meeting date on Russell meeting id 981568 to 10 days in the past and navigate to it
#    And I clear the rationales for VAP entries and add rationales for other proposals
#    And I click the vote button and check the override checkbox
#    Then the Proceed button should be disabled
#    And there should be a warning message that states "You are voting against policy for proposal X"
#
#  Scenario: Live ballots with meeting date for future ballots whose meeting date has passed/Revote and no rationale entered for vote against management
#    Given I login as Internal User and retrieve Customer ID for "Russell Investments"
#    When I verify customer settings for VAM and VAP
#    When I login as External User "RUSSELL"
#    And I change meeting date on Russell meeting id 1068747 to 10 days in the future and navigate to it
#    And I clear the rationales for VAM entries and add rationales for other proposals
#    And I click the vote button and check the override checkbox
#    Then the Proceed button should be disabled
#    And there should be a warning message that states "You are voting against management for proposal X"





