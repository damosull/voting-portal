Feature: Compare Policy Recommendations

  #TC - https://dev.azure.com/glasslewis/Development/_workitems/edit/48678
  Scenario: Compare Policy Recommendations to GL Recommendations
    Given I am logged in as the "CALPERS" User
    And I navigate to the workflow page
    Then I can view the workflow page
    And I remove all existing selected criteria
    And I have added the criteria for "Policy Recs With/Against Glass Lewis" and selecting the radio button for "All"
    When I select a random meeting
    Then I can view the Meeting Details page
    And I can verify that all policy recommendations are matching "GL" recommendations
    When I navigate to the workflow page
    And I remove all existing selected criteria
    And I have added the criteria for "Policy Recs With/Against Glass Lewis" and selecting the radio button for "One Against"
    When I select a random meeting
    Then I can view the Meeting Details page
    And I can verify that at least one policy recommendations is against "GL" recommendations
    And I should logout from the application

  #TC - https://dev.azure.com/glasslewis/Development/_workitems/edit/48395
  Scenario: Compare Policy Recommendations to Management Recommendations
    Given I am logged in as the "CALPERS" User
    And I navigate to the workflow page
    Then I can view the workflow page
    And I remove all existing selected criteria
    And I have added the criteria for "Policy Recs With/Against Management" and selecting the radio button for "All"
    When I select a random meeting
    Then I can view the Meeting Details page
    And I can verify that all policy recommendations are matching "MGMT" recommendations
    When I navigate to the workflow page
    Then I can view the workflow page
    And I remove all existing selected criteria
    And I have added the criteria for "Policy Recs With/Against Management" and selecting the radio button for "One Against"
    When I select a random meeting
    Then I can view the Meeting Details page
    And I can verify that at least one policy recommendations is against "MGMT" recommendations
    And I should logout from the application