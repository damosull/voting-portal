@workflow
Feature: Workflow related smoke tests
  #Test Suite - https://dev.azure.com/glasslewis/Development/_testPlans/define?planId=56788&suiteId=56796

  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/56848
  @56848
  Scenario: Verify cache service is working and returning correct Customer ID
    Given I am logged in as the "CALPERS" user
    When I navigate to the workflow page
    Then all the meetings on the screen have a "CALPERS" customer id
    And I should logout from the application


  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/56849
  @56849
  Scenario: Verify external user is able to navigate to the correct meeting detail and company page
    Given I am logged in as the "CALPERS" user
    When I navigate to the workflow page
    Then I can view the workflow page
    When I search for a company on the search bar and choose meetings
    Then I can view the Meeting Details page
    And I navigate to the workflow page
    When I search for a company on the search bar and choose companies
    Then I should be navigated to the Company page
    And I should logout from the application


  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/56850
  @56850
  Scenario: Verify internal user is able to add columns from the table on workflow page
    Given I am logged in as the "AUTOMATIONINTERNAL" user
    When I navigate to the workflow page
    Then I can view the workflow page
    When I search for the customer ""
    Then the Customer Name field is blank
    And I can view the workflow page
    When I search for the customer "California Public Employee Retirement System"
    And I try to add the first four available Sustainalytics ESG columns
    Then I should be able to see these "four" columns on the workflow table
    When I try to add the remaining three Sustainalytics ESG columns
    Then I should be able to see these "three" columns on the workflow table
    And I should logout from the application


  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/56851
  @56851
  Scenario: Verify internal user is able to remove columns from the table on workflow page
    Given I am logged in as the "AUTOMATIONINTERNAL" user
    When I navigate to the workflow page
    Then I can view the workflow page
    When I search for the customer ""
    Then the Customer Name field is blank
    And I can view the workflow page
    When I search for the customer "California Public Employee Retirement System"
    And I try to remove the first column on the workflow table
    Then I should be unable to see the first column on the workflow table
    And I should logout from the application


  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/40729
  @40729
  Scenario: Verify ballot section display the correct results when filter is applied from the workflow page
    Given I am logged in as the "WELLINGTON" user
    When I navigate to the workflow page
    Then I can view the workflow page
    When I apply the policy criteria for one of the policies
    And I click on the control number link
    Then I can see the Ballot section under the comments section
    And I can verify that the default field "Control Number" is not available in the "Columns" modal
    And I can verify that the user gets the appropriate results for "Custodian" in the responsive search of the "Columns" Modal
    And I can verify that the ballot section displays just the results based on the policy filtered
    And I should logout from the application


  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/56841
  #to https://dev.azure.com/glasslewis/Development/_workitems/edit/56847
  @56841 @56842 @56843 @56844 @56845 @56846 @56847
  Scenario Outline: Verify user is able to apply the various ESG filters on the workflow page
    Given I am logged in as the "CALPERS" user
    When I navigate to the workflow page
    And I have added the filter criteria <filter>
    Then I should be able to see the results only for <filter>
    And I should logout from the application

    Examples:
      | filter                                    |
      | "ESG Risk Rating Assessment"              |
      | "ESG Risk Exposure Assessment"            |
      | "ESG Risk Management Assessment"          |
      | "ESG Risk Rating Percentile Global"       |
      | "ESG Risk Rating Percentile Industry"     |
      | "ESG Risk Rating Percentile Sub Industry" |
      | "ESG Risk Rating Highest Controversy"     |