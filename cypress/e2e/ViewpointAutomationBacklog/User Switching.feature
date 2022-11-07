Feature: Internal User Switching
#Test Suite - https://dev.azure.com/glasslewis/Development/_testPlans/define?planId=48536&suiteId=48537

  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/48105
  @48105
  Scenario: Internal user switching customer while using custom fields and/or criteria
    Given I am logged in as the "AUTOMATIONINTERNAL" User
    And I navigate to the workflow page
    Then I can view the workflow page
    And I remove all existing selected criteria for the internal user
    When I search for the customer "Wellington Management"
    Then I can view the workflow page
    And I have added the filter criteria "Error Logged?"
    And I have added the filter criteria "Glass Lewis Commentary"
    And I have added the filter criteria "Decision Status"
    And I have added the column "Error Logged?"
    And I have added the column "Glass Lewis Commentary"
    Then I can view the workflow page
    When I search for the customer "California Public Employee Retirement System"
    Then I can view the workflow page
    Then I should be "unable" to see the text "Error Logged?" on the UI
    And I should be "unable" to see the text "Glass Lewis Commentary" on the UI
    And I should be "unable" to see the text "Wellington" on the UI
    And I should be "able" to see the text "Decision Status" on the UI
    And I should be "able" to see the text "CalPERS2" on the UI
    And I should logout from the application
