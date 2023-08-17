@bvd
Feature: Ballot Vote Data Report - End to End Tests

  Scenario Outline: Verify AVA report is as expected for Xlsx
    Given I am logged in as a random external user
    When I navigate to the Reporting page
    And I navigate to the report type page for "Ballot Vote Data"
    And I select the dates between <start_date> and <end_date> days from today
    And I "save" the report for "Ballot Vote Data"
    When I click on the Download button to download the report
    Then the download initiated toast message appears
    And I "delete" the report for "Ballot Vote Data"
    When I click on the notification toolbar
    Then I "verify ready for download of" the report for "Ballot Vote Data"
    When I download the first report from the notification toolbar
    And I capture the data from API to compare with AVA report between <start_date> and <end_date>
    Then a random company name from the DB should be available in the BVD report
    And one of the proposal items from a meeting should be available in the BVD report

    Examples:
      | start_date | end_date |
      | -49        | -49      |