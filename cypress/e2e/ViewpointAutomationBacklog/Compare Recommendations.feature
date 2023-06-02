Feature: Compare Policy Recommendations
#Test Suite - https://dev.azure.com/glasslewis/Development/_testPlans/define?planId=48536&suiteId=48537

  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/48678
  @48678
  Scenario: Compare Policy Recommendations to GL Recommendations
    Given I am logged in as the "CALPERS" User
    When I navigate to the workflow page
    And I have added the criteria for "Policy Recs With/Against Glass Lewis" and selecting the radio button for "All"
    And I select a random meeting
    Then I can view the Meeting Details page
    And I can verify that all policy recommendations are matching "GL" recommendations
    When I navigate to the workflow page
    And I remove all existing selected criteria
    And I have added the criteria for "Policy Recs With/Against Glass Lewis" and selecting the radio button for "One Against"
    And I select a random meeting
    Then I can view the Meeting Details page
    And I can verify that at least one policy recommendations is against "GL" recommendations
    And I should logout from the application


  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/48395
  @48395
  Scenario: Compare Policy Recommendations to Management Recommendations
    Given I am logged in as the "CALPERS" User
    When I navigate to the workflow page
    And I have added the criteria for "Policy Recs With/Against Management" and selecting the radio button for "All"
    And I select a random meeting
    Then I can view the Meeting Details page
    And I can verify that all policy recommendations are matching "MGMT" recommendations
    When I navigate to the workflow page
    Then I can view the workflow page
    When I remove all existing selected criteria
    And I have added the criteria for "Policy Recs With/Against Management" and selecting the radio button for "One Against"
    And I select a random meeting
    Then I can view the Meeting Details page
    And I can verify that at least one policy recommendations is against "MGMT" recommendations
    And I should logout from the application