Feature: Ballot Vote Data Report

  #Test scenario 43748 - https://dev.azure.com/glasslewis/Development/_workitems/edit/43748
  Scenario: Verify internal user can provide access to ASCI column on the ballot vote data report
    Given I am logged in as the "AUTOMATIONINTERNAL" User
    And I capture the csrf token from the session
    When I navigate to Customer search page
    And I search for Russell Investments
    And I update the ASCI setting to "true"
    And I update the external admin permissions to "Allow"
    Then I should logout from the application
    When I am logged in as the "RUSSELL" User
    And I navigate to the reporting tab
    And I select Ballot Vote Data report
    And I limit report size to 2 days
    Then I can verify that the ACSI checkbox from Configure Columns is visible
    When I save the configuration and download the report
    #Then the "ASCI" header should be included in the report
    And I delete the ballot configuration
    And I should logout from the application
    

  #Test scenario 44615 - https://dev.azure.com/glasslewis/Development/_workitems/edit/44615
  Scenario: Verify internal user can disable access to ASCI column on the ballot vote data report
    Given I am logged in as the "AUTOMATIONINTERNAL" User
    And I capture the csrf token from the session
    When I navigate to Customer search page
    And I search for Russell Investments
    And I update the ASCI setting to "false"
    And I update the external admin permissions to "Allow"
    Then I should logout from the application
    When I am logged in as the "RUSSELL" User
    And I navigate to the reporting tab
    And I select Ballot Vote Data report
    And I limit report size to 2 days
    Then I can verify that the ACSI checkbox from Configure Columns is not visible
    When I save the configuration and download the report
    #Then the "ASCI" header should be included in the report
    And I delete the ballot configuration
    And I should logout from the application


  #Test scenario 44689 - https://dev.azure.com/glasslewis/Development/_workitems/edit/44689
  Scenario: Verify internal user can disable access to ASCI column and user permissions disallowed on the ballot vote data report
    Given I am logged in as the "AUTOMATIONINTERNAL" User
    And I capture the csrf token from the session
    When I navigate to Customer search page
    And I search for Russell Investments
    And I update the ASCI setting to "false"
    And I update the external admin permissions to "RoleDefault"
    Then I should logout from the application
    When I am logged in as the "RUSSELL" User
    And I navigate to the reporting tab
    And I select Ballot Vote Data report
    And I limit report size to 2 days
    Then I can verify that the ACSI checkbox from Configure Columns is not visible
    When I save the configuration and download the report
    #Then the "ASCI" header should be included in the report
    And I delete the ballot configuration
    And I should logout from the application