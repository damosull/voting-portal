@reporting
Feature: Reporting related smoke tests
    #Test Suite - https://dev.azure.com/glasslewis/Development/_testPlans/define?planId=56788&suiteId=56794

    #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/37939
    @37939
    Scenario: Report - Voting Activity
        Given I am logged in as the "CALPERS" User
        When I navigate to the Reporting page
        And I navigate to the report type page for "Voting Activity"
        And I filter the report type to "xlsx"
        And I set the date range to the next or last 3 days
        And I select Decision Status Criteria
        And I select Voted criteria
        And I add columns to the report
        And I set the Footer under the Grouping & Presentation
        And I set the Header under the Grouping & Presentation
        And I add subscription to the report
        And I "save" the report for "Voting Activity"
        Then the report saved message appears
        When I click on the Download button to download the report
        Then the download initiated toast message appears
        And I "delete" the report for "Voting Activity"
        When I click on the notification toolbar
        Then I "verify ready for download of" the report for "Voting Activity"
        When I download the first report from the notification toolbar
        And I click on the notification toolbar
        Then I verify the report name and a few columns for Voting Activity Report
        And I should logout from the application


    #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/37962
    @37962
    Scenario: Generate ballot vote data report, download and verify file headers
        Given I am logged in as the "RUSSELL" User
        When I navigate to the Reporting page
        And I navigate to the report type page for "Ballot Vote Data"
        And I set the meeting date to next date 1 and past date 1 days
        And I select "Ballot Voted Date" column
        And I "save" the report for "Ballot Vote Data"
        And I click on the Download button to download the report
        Then the download initiated toast message appears
        And I "delete" the report for "Ballot Vote Data"
        When I click on the notification toolbar
        And I "verify ready for download of" the report for "Ballot Vote Data"
        And I verify the report name and headers for Ballot Vote Data Report
        And I should logout from the application


    #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/56837
    @56837
    Scenario: Verify user is able to download Ballot status report generated via Meeting Details page
        Given I am logged in as the "WELLINGTON" User
        When I navigate to the workflow page
        Then I can view the workflow page
        And I remove all existing selected criteria
        And I have added the criteria for "Decision Status" with status "Recommendations Pending"
        And I select the first available meeting
        And I export the ballot status report
        Then A toast message appears for "EXPORT_INITIATED"
        When I click on the notification toolbar
        And I "verify export ready" the report for "Ballot Status via MD Page"
        When I download the first report from the notification toolbar
        And I click on the notification toolbar
        And I verify the report name and a few columns for Ballot Status Report generated via Meeting Details page
        And I should logout from the application


    #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/56838
    @56838
    Scenario: Verify user is able to download Workflow Export Request report
        Given I am logged in as the "NEUBERGER" User
        When I navigate to the workflow page
        Then I can view the workflow page
        And I remove all existing selected criteria
        When I select 2 meetings from the top
        And I generate a request for Workflow Export
        Then A toast message appears for "EXPORT_INITIATED"
        When I click on the notification toolbar
        And I "verify export ready" the report for "Workflow Export"
        And I verify the report name and headers for Workflow Export Report
        And I should logout from the application
