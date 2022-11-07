Feature: Controversy Alert
#Test Suite - https://dev.azure.com/glasslewis/Development/_testPlans/define?planId=48536&suiteId=48537

  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/50256
  @50256
  Scenario: Verify "Controversy Alert" field displays in the Configure Columns dropdown list
    Given I am logged in as the "CHARLESSCHWAB" User
    And I navigate to the workflow page
    Then I can view the workflow page
    When I have added the column "Controversy Alert"
    And I can view the workflow page
    And I select "2" meetings from the top
    And I scroll to the end of the meetings table
    Then I should be able to see a "column" named "Controversy Alert"
    When I select "No" from the Quick Pick dropdown
    Then I should be able to see "Yes|No|Pick one" in the column "Controversy Alert"
    And I should be able to verify that the column "Controversy Alert" is "checked"
    And I should logout from the application


  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/50285
  @50285
  Scenario: Verify that the Controversy File name hyperlink does not display
    Given I am logged in as the "CHARLESSCHWAB" User
    And I navigate to the workflow page
    Then I can view the workflow page
    And I remove all existing selected criteria
    When I have added the criteria for "Controversy Alert" and checking the checkbox for "No"
    And I have added the column "Controversy Alert"
    And I can view the workflow page
    And I select a random meeting
    And I can view the Meeting Details page
    Then I should be "unable" to see "Controversy Alert link" on the UI
    And I should logout from the application


  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/50281
  @50281
  Scenario: Verify user is able to download controversy alert PDF file
    Given I am logged in as the "AUTOMATIONINTERNAL" User
    And I turn "on" the customer settings for "Controversy Alert" for "California Public Employee Retirement System (CalPERS)"
    Then I should logout from the application
    When I am logged in as the "AUTOMATIONEXTERNAL" User
    And I add a controversy alert file for the meeting
    And I navigate to the meeting details page for the meeting "CAVOCA"
    Then I can view the Meeting Details page
    And I should be "able" to see "Controversy Alert link" on the UI
    And I should be able to verify the UI shows filename with "..." and its extension is .pdf
    And I should logout from the application


  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/50530
  @50530
  Scenario: Turning Off the Controversy alert in customer settings
    Given I am logged in as the "AUTOMATIONINTERNAL" User
    And I turn "off" the customer settings for "Controversy Alert" for "California Public Employee Retirement System (CalPERS)"
    Then I should logout from the application
    When I am logged in as the "AUTOMATIONEXTERNAL" User
    And I add a controversy alert file for the meeting
    And I navigate to the meeting details page for the meeting "CAVOCA"
    Then I can view the Meeting Details page
    And I should be "unable" to see "Controversy Alert link" on the UI
    And I should logout from the application


  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/50531
  @50531
  Scenario: Turning On the Controversy alert in customer settings
    Given I am logged in as the "AUTOMATIONINTERNAL" User
    And I turn "on" the customer settings for "Controversy Alert" for "California Public Employee Retirement System (CalPERS)"
    Then I should logout from the application
    When I am logged in as the "AUTOMATIONEXTERNAL" User
    And I add a controversy alert file for the meeting
    And I navigate to the meeting details page for the meeting "CAVOCA"
    Then I can view the Meeting Details page
    And I should be "able" to see "Controversy Alert link" on the UI
    And I should logout from the application