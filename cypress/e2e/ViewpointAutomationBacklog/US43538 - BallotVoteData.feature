#US - https://dev.azure.com/glasslewis/Development/_workitems/edit/43538
Feature: Ballot Vote Data Report

  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/43546
  @43546
  Scenario: Verify internal user can revoke access to ACSI column on the ballot vote data report
    Given I am logged in as the "AUTOMATIONINTERNAL" User
    When I navigate to the customers page
    And I search for customer with name "Russell Investments"
    Then I should be able to turn the "ACSI checkbox to YES"
    When I navigate to User Permissions page for "RUSSELL"
    And I click on the "Workflow Meetings Vote Card" dropdown
    Then I change the "View ACSI Recommendations" user permission to "Explicitly Denied"
    And I click on the Submit changes button
    And I should logout from the application
    Given I am logged in as the "RUSSELL" User
    And I navigate to the Reporting page
    And I select the "Ballot Vote Data" report
    Then I can verify that the "ACSI" column should "not be visible"
    And I should logout from the application


  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/43546
  @43546
  Scenario: Verify internal user can provide access to ACSI column on the ballot vote data report
    Given I am logged in as the "AUTOMATIONINTERNAL" User
    When I navigate to the customers page
    And I search for customer with name "Russell Investments"
    Then I should be able to turn the "ACSI checkbox to YES"
    When I navigate to User Permissions page for "RUSSELL"
    And I click on the "Workflow Meetings Vote Card" dropdown
    Then I change the "View ACSI Recommendations" user permission to "Role Default"
    And I click on the Submit changes button
    And I should logout from the application
    Given I am logged in as the "RUSSELL" User
    And I navigate to the Reporting page
    And I select the "Ballot Vote Data" report
    Then I can verify that the "ACSI" column should "be visible"
    And I should logout from the application