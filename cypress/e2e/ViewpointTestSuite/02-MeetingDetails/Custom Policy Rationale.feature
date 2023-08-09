Feature: Custom Policy Rationale & Custom Policy Rationale & Associated Rulename
  #Test Suite - https://dev.azure.com/glasslewis/Development/_testPlans/execute?planId=9215&suiteId=9456

  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/2569
  @2569
  Scenario: Verify no pre-populated rationale will be available when Decision Status = Recommendations Pending and Policy Rec = N/A
    Given I am logged in as the "CALPERS" user
    When I navigate to the workflow page
    Then I can view the workflow page
    When I have added the criteria for "Decision Status" with status "Recommendations Pending"
    And I select a random meeting
    Then I can view the Meeting Details page
    And I can verify that the "policy" rec column displays with "N/A"
    And I can verify that I am unable to access Custom Policy Rationale modal for policy rec column
    And I am able to iterate through rationales, add text entry, save and verify toast message for each entry
    And I should logout from the application


  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/4379
  @4379
  Scenario: Verify user permissions for 'View Rule Name' - Explicitly Denied
    Given I am logged in as the "AUTOMATIONINTERNAL" user
    When I navigate to User Permissions page for "CALPERS"
    And I click on the "Workflow Meetings Vote Card" dropdown
    Then I change the "View Rule Name" user permission to "Explicitly Denied"
    And I click on the Submit changes button
    And I should logout from the application
    When I am logged in as the "CALPERS" user
    When I navigate to the workflow page
    Then I can view the workflow page
    When I have added the criteria for "Policy Recs With/Against Management" and selecting the radio button for "One Against"
    And I select a random meeting
    Then I can view the Meeting Details page
    When I click on a policy rec link in the vote card section
    Then I should be "able" to see "Custom Policy Rationale modal" on the UI
    And I should be "unable" to see "Rule Name heading" on the UI
    And I can see the other items on Custom Policy Rationale modal like Policy ID, Rationale, Replace Rationale, Item Number and Proposal
    And I should logout from the application


  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/4379
  @4379
  Scenario: Verify user permissions for 'View Rule Name' - Role Default
    Given I am logged in as the "AUTOMATIONINTERNAL" user
    When I navigate to User Permissions page for "CALPERS"
    And I click on the "Workflow Meetings Vote Card" dropdown
    Then I change the "View Rule Name" user permission to "Role Default"
    And I click on the Submit changes button
    And I should logout from the application
    When I am logged in as the "CALPERS" user
    When I navigate to the workflow page
    Then I can view the workflow page
    When I have added the criteria for "Policy Recs With/Against Management" and selecting the radio button for "One Against"
    And I select a random meeting
    Then I can view the Meeting Details page
    When I click on a policy rec link in the vote card section
    Then I should be "able" to see "Custom Policy Rationale modal" on the UI
    And I should be "able" to see "Rule Name heading" on the UI
    And I can see the other items on Custom Policy Rationale modal like Policy ID, Rationale, Replace Rationale, Item Number and Proposal
    And I should logout from the application
