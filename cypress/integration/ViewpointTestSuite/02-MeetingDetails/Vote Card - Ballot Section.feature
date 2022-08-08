Feature: Vote Card - Ballot Section

  #Test Case - https://dev.azure.com/glasslewis/Development/_workitems/edit/28444
  Scenario: Verify User can see 'Ballot Activity Log' gets updated in the Vote Card page with 'Received' Ballot Status
    Given I am logged in as the "WELLINGTON" User
    And I click on upcoming meetings
    And I change the meeting status by amending the database
    When I navigate to the meeting details page for the meeting "WLNCVTD"
    Then I can view the Meeting Details page
    When I click on the Change Vote or Rationale button
    And I navigate via the Control Number link
    Then the ballot activity log should have the correct date, username and status