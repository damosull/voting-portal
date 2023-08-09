Feature: Custom Fields
  #Test Suite - https://dev.azure.com/glasslewis/Development/_testPlans/define?planId=48536&suiteId=48537

  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/37902
  @37902
  Scenario Outline: Custom Fields work for meetings with no ballots
    Given I am logged in as the "RUSSELL" user
    When I navigate to the workflow page
    Then I can view the workflow page
    When I filter for meetings without ballots
    And I have added the column <column_name>
    And I have added the column "Error Logged?"
    And I select 5 meetings from the top
    And I scroll to the end of the meetings table
    And I select <column_value> from the Quick Pick dropdown
    And I navigate to the workflow page
    Then I can view the workflow page
    And I remove all existing selected criteria
    When I have added the criteria for <column_name> and checking the checkbox for <column_value>
    And I filter for meetings without ballots
    And I have added the column <column_name>
    And I can view the workflow page
    And I scroll to the end of the meetings table
    Then I should be able to see <column_value> in the column <column_name>
    And I should logout from the application

    Examples:
      | column_name        | column_value |
      | "Meeting Audited?" | "Yes"        |
