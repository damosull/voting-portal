Feature: Internal User Switching

  #TC - https://dev.azure.com/glasslewis/Development/_workitems/edit/48105
  Scenario: Internal user switching customer while using custom fields and/or criteria
    Given I am logged in as the "AUTOMATIONINTERNAL" User
    And I remove all existing selected criteria for the internal user
    When I search for the customer "Wellington"
    And I have added the criteria for "Error Logged?,Glass Lewis Commentary,Decision Status"
    And I have added the column "Error Logged?"
    And I have added the column "Glass Lewis Commentary"
    When I search for the customer "California Public"
    Then I should be "unable" to see the text "Error Logged?" on the UI
    And I should be "unable" to see the text "Glass Lewis Commentary" on the UI
    And I should be "unable" to see the text "Wellington" on the UI
    And I should be "able" to see the text "Decision Status" on the UI
    And I should be "able" to see the text "CalPERS2" on the UI
    And I should logout from the application
