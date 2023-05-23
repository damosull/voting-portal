Feature: Similar Agendas
  #Test Suite - https://dev.azure.com/glasslewis/Development/_testPlans/define?planId=48536&suiteId=48537
  #User Story - https://dev.azure.com/glasslewis/Development/_workitems/edit/45257

  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/47144
  @47144
  Scenario: Validate that similar agendas are shown in the vote registration warning
    Given I am logged in as the "WELLINGTON" User
    When I navigate to the URL "/MeetingDetails/Index/1186995"
    Then I can view the Meeting Details page
    And the given agendas appears on the page
    And the following alert is displayed in Vote Tally section "There are other agendas available for this company. Please review them below:"
    And I check the Job Number hyperlink with the Job Number of "P93385"
    When I navigate to the URL "/MeetingDetails/Index/1187592"
    Then I can view the Meeting Details page
    And the given agendas appears on the page
    And the following alert is displayed in Vote Tally section "There are other agendas available for this company. Please review them below:"
    And I check the Job Number hyperlink with the Job Number of "882633"
    And I should logout from the application