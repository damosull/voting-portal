Feature: Navigation from meeting details page to company page
  #Test Suite - https://dev.azure.com/glasslewis/Development/_testPlans/execute?planId=37349&suiteId=43744

  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/43760
  @43760
  Scenario: Verify user can navigate from Meeting Details page to Company page and the associated meetings in meetings dropdown on Company Page all include text '20'
    Given I am logged in as the "CALPERS" user
    When I navigate to the meeting with id "1101707"
    Then I can view the Meeting Details page
    And the meeting id should match the expected current meeting id and previous meeting id
    And the company id should match the expected company id
    And I verify all listed items Meetings dropdown check for each in list includes the text "20"
    And I should logout from the application