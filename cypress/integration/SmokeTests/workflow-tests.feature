Feature: Workflow related smoke tests


  Scenario Outline: Verify user is able to apply the various filters on the workflow page
    Given I am logged in as the "CALPERS" User
    When I apply the <filter>
    Then I should be able to see the results only for <filter>
    And I should logout from the application

    Examples:
      | filter                                           |
      | "ESG Risk Rating Assessment filter"              |
      | "ESG Risk Exposure Assessment filter"            |
      | "ESG Risk Management Assessment filter"          |
      | "ESG Risk Rating Percentile Global filter"       |
      | "ESG Risk Rating Percentile Industry filter"     |
      | "ESG Risk Rating Percentile Sub Industry filter" |
      | "ESG Risk Rating Highest Controversy filter"     |


  Scenario: Verify that all the meetings for California Public Employee Retirement System have a CalPERS customer id
    Given I am logged in as the "AUTOMATIONINTERNAL" User
    Then I can view the workflow page
    When I search for California Public Employee Retirement System
    Then all the meetings on the screen have a CalPERS customer id
    And I should logout from the application


  Scenario: Verify external user is able to navigate to the correct meeting detail and company page
    Given I am logged in as the "CALPERS" User
    Then I can view the workflow page
    When I search for a company on the search bar and choose meetings
    Then I can view the Meeting Details page
    And I navigate to the workflow page
    When I search for a company on the search bar and choose companies
    Then I should be navigated to the Company page
    And I should logout from the application


  Scenario: Verify internal user is able to add columns from the table on workflow page
    Given I am logged in as the "AUTOMATIONINTERNAL" User
    Then I can view the workflow page
    When I try to add the first four available Sustainalytics ESG columns
    Then I should be able to see these "four" columns on the workflow table
    When I try to add the remaining three Sustainalytics ESG columns
    Then I should be able to see these "three" columns on the workflow table
    And I should logout from the application


  Scenario: Verify internal user is able to remove columns from the table on workflow page
    Given I am logged in as the "AUTOMATIONINTERNAL" User
    Then I can view the workflow page
    When I try to remove the first column on the workflow table
    Then I should be unable to see the first column on the workflow table
    And I should logout from the application


  #Test Case 40729 - https://dev.azure.com/glasslewis/Development/_workitems/edit/40729
  Scenario: Verify ballot section display the correct results when filter is applied from the workflow page
    Given I am logged in as the "WELLINGTON" User
    Then I can view the workflow page
    When I apply the policy criteria for one of the policies
    And I click on the control number link
    Then I can see the Ballot section under the comments section
    And I can verify that the default field "Control Number" is not available in the "Columns" modal
    And I can verify that the user gets the appropriate results for "Custodian" in the responsive search of the "Columns" Modal
    And I can verify that the ballot section displays just the results based on the policy filtered
    And I should logout from the application
