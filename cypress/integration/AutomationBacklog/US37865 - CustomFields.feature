Feature: Custom Fields

  #TC - https://dev.azure.com/glasslewis/Development/_workitems/edit/37902
  Scenario Outline: Custom Fields work for meetings with no ballots
    Given I am logged in as the "RUSSELL" User
    And I remove all existing selected criteria
    And I filter for meetings without ballots
    And I have added the column <column_name>
    And I have added the column "Error Logged?"
    When I select "5" meetings from the top
    And I scroll to the end of the meetings table
    And I select <column_value> from the Quick Pick dropdown
    And I refresh the page
    Then I can view the workflow page
    When I have added the criteria for <column_name> and checking the checkbox for <column_value>
    And I filter for meetings without ballots
    And I have added the column <column_name>
    And I scroll to the end of the meetings table
    Then I should be able to see <column_value> in the column <column_name>
    And I should logout from the application

    Examples:
      | column_name         | column_value |
      | "Controversy Alert" | "Yes"        |
