@ava
Feature: Analyze Voting Activity Report - End to End Tests

  Scenario Outline: Verify AVA report is as expected for Xlsx
    Given I am logged in as the <user> User
    When I navigate to the Reporting page
    And I navigate to the report type page for "Voting Activity"
    And I filter the report type to "xlsx"
    And I select the dates between <start_date> and <end_date> days from today
    And I "save" the report for "Voting Activity"
    Then the report saved message appears
    When I click on the Download button to download the report
    Then the download initiated toast message appears
    And I "delete" the report for "Voting Activity"
    When I click on the notification toolbar
    Then I "verify ready for download of" the report for "Voting Activity"
    When I download the first report from the notification toolbar
    And I capture the data from GLP DB to compare with AVA report for <user> between <start_date> and <end_date>
    Then the number of meetings should match in the AVA report
    And a random company name from the DB should be available in the AVA report

    Examples:
      | user      | start_date | end_date |
      | "CALPERS" | -49        | -49      |