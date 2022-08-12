Feature: Vote Card - Ballot Section

  #Test Case - https://dev.azure.com/glasslewis/Development/_workitems/edit/28444
  Scenario: Verify User can see 'Ballot Activity Log' gets updated in the Vote Card page with 'Received' Ballot Status
    Given I am logged in as the "WELLINGTON" User
    And I change the meeting status of user "WELLINGTON" for the control number "WLNCVTD_CTRLNUM" to "Received" by amending the database
    When I navigate to the meeting details page for the meeting "WLNCVTD"
    Then I can view the Meeting Details page
    When I click on the Change Vote or Rationale button
    And I click on the control number for "WLNCVTD_CTRLNUM"
    Then the ballot activity log for "WLNCVTD_CTRLNUM" should have the correct date, username of "WELLINGTON" and status of "Received"