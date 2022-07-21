Feature: Controversy Alert Column

  #TC - https://dev.azure.com/glasslewis/Development/_workitems/edit/50256
  Scenario: Verify "Controversy Alert" field displays in the Configure Columns dropdown list
    Given I am logged in as the "RUSSELL" User
    When I have added the column "Controversy Alert"
    And I can view the workflow page
    And I select "2" meetings from the top
    And I scroll to the end of the meetings table
    Then I should be able to see a "column" named "Controversy Alert"
    When I select "Yes" from the Quick Pick dropdown
    Then I should be able to see "Yes|No|Pick one" in the column "Controversy Alert"
    And I should be able to verify that the column "Controversy Alert" is "checked"
    And I should logout from the application
