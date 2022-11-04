#US - https://dev.azure.com/glasslewis/Development/_workitems/edit/45257
Feature: Similar Agendas

  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/47144
  @47144
  Scenario: Validate that similar agendas are shown in the vote registration warning
    Given I am logged in as the "WELLINGTON" User
    When I navigate to the meeting with id "1076103"
    Then I can view the Meeting Details page
    And the given agendas appears on the page
    And the following alert is displayed in Vote Tally section "There are other agendas available for this company. Please review them below:"
    And I check the Job Number hyperlink with the Job Number of "P64468" and "685122"
    When I navigate to the meeting with id "1076104"
    Then I can view the Meeting Details page
    And the given agendas appears on the page
    And the following alert is displayed in Vote Tally section "There are other agendas available for this company. Please review them below:"
    And I check the Job Number hyperlink with the Job Number of "P64467" and "685122"
    When I navigate to the meeting with id "1086628"
    Then I can view the Meeting Details page
    And the given agendas appears on the page
    And the following alert is displayed in Vote Tally section "There are other agendas available for this company. Please review them below:"
    And I check the Job Number hyperlink with the Job Number of "P64467" and "P64468"
    And I should logout from the application