Feature: Create, modify & delete a Vote Execution Profile
#Test Suite - https://dev.azure.com/glasslewis/Development/_testPlans/execute?planId=9215&suiteId=9245

  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/4165
  @4165
  Scenario: Verify an Internal Admin can create a Vote Execution Profile and assign a voting group
    Given I delete all existing Vote Execution Profiles for the customer with id 187
    When I am logged in as the "AUTOMATIONINTERNAL" User
    And I navigate to the URL "/Accounts/VEP/?CustomerID=187"
    Then I can view the Vote Execution page
    And I verify that the Vote Execution Profile On checkbox is disabled
    When I click on the New Profile button
    And I click on the Configuration Name label
    And I amend the configuration name to "Test"
    And I click on the Cancel button for Configuration Name change
    Then I should be "able" to see "New Configuration*" on the VEP page
    When I click on Edit button for Voting Groups
    And I verify all Voting Groups in the DB are visible on the UI
    And I select "first" voting group
    And I click on the Apply Voting Groups button
    And I click on the Configuration Name label
    And I amend the configuration name to "Test"
    And I click on the Ok button for Configuration Name change
    And I click on the Save Vote Execution button
    Then the Vote Execution changes should be saved successfully
    And I should be "able" to see "Test" on the VEP page
    And I should be "unable" to see "New Configuration*" on the VEP page
    When I click on the New Profile button
    And I click on Edit button for Voting Groups
    And I select "second" voting group
    And I click on the Apply Voting Groups button
    And I click on the Configuration Name label
    And I amend the configuration name to "Test"
    And I click on the Ok button for Configuration Name change
    Then I should be "able" to see "This vote profile configuration name already exists; please rename the profile." on the UI
    When I amend the configuration name to "Test2"
    And I click on the Ok button for Configuration Name change
    And I click on the Save Vote Execution button
    Then the Vote Execution changes should be saved successfully
    And I should be "able" to see "Test2" on the VEP page
    And I should logout from the application


  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/4166
  @4166
  Scenario: Verify an Internal Admin user can modify an existing Vote Execution Profile & Save New Vote Execution Profile Configuration Name
    Given I am logged in as the "AUTOMATIONINTERNAL" User
    When I navigate to the URL "/Accounts/VEP/?CustomerID=544"
    Then I can view the Vote Execution page
    When I click on the Configuration Name label
    Then I can see the OK and Cancel buttons
    When I amend the configuration name to "random"
    And I click on the Cancel button for Configuration Name change
    Then I should be "able" to see "Americas" on the UI
    When I click on the Configuration Name label
    And I amend the configuration name to "existing"
    And I click on the Ok button for Configuration Name change
    Then I should be "able" to see "This vote profile configuration name already exists; please rename the profile." on the UI
    When I amend the configuration name to "random"
    And I click on the Ok button for Configuration Name change
    Then the configuration name should show as edited
    And I should logout from the application


  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/4167 https://dev.azure.com/glasslewis/Development/_workitems/edit/4211
  @4167 @4211
  Scenario: Verify an Internal Admin user can modify an existing Vote Execution Profile & "Save" the changes
    Given I am logged in as the "AUTOMATIONINTERNAL" User
    When I navigate to the URL "/Accounts/VEP/?CustomerID=696"
    Then I can view the Vote Execution page
    And I save the current voting groups
    When I click on Edit button for Voting Groups
    Then I can view the Voting Groups modal
    When I amend the voting groups
    And I click on the Apply Voting Groups button
    And I click on the Save Vote Execution button
    Then the Vote Execution changes should be saved successfully
    And I should logout from the application


  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/4168
  @4168
  Scenario: Verify an Internal Admin user can delete an existing Vote Execution Profile
    Given I set the setting "Permission.CustomerAdmin.VoteExecutionProfile.Delete" to "Allow" for the user "AUTOMATIONINTERNAL"
    When I am logged in as the "AUTOMATIONINTERNAL" User
    And I navigate to the URL "/Accounts/VEP/?CustomerID=187"
    Then I can view the Vote Execution page
    And I uncheck the Vote Execution Profile On checkbox
    And I delete the visible vote execution profile
    When I click on Edit button for Voting Groups
    And I select "first" voting group
    And I click on the Apply Voting Groups button
    And I click on the Save Vote Execution button
    Then the Vote Execution changes should be saved successfully
    And I should be "able" to see "Voting Groups (2)" on the VEP page
    And I should logout from the application


  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/4168
  @4168
  Scenario: Verify an Internal Admin user can delete an existing Vote Execution Profile
    Given I set the setting "Permission.CustomerAdmin.VoteExecutionProfile.View" to "Allow" for the user "OPERS"
    Given I set the setting "Permission.CustomerAdmin.VoteExecutionProfile.Modify" to "Allow" for the user "OPERS"
    Given I set the setting "Permission.CustomerAdmin.VoteExecutionProfile.Delete" to "Allow" for the user "OPERS"
    When I am logged in as the "OPERS" User
    And I navigate to the URL "/Accounts/VEP/"
    Then I can view the Vote Execution page
    And I delete the visible vote execution profile
    And I should logout from the application