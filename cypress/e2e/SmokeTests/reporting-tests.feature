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
        And I set the date range to the next or last 2 days
        And I select Decision Status Criteria
        And I select Voted criteria
        And I add columns to the report
        And I set the Footer under the Grouping & Presentation
        And I set the Header under the Grouping & Presentation
        And I add subscription to the report
        And I "save" the report for "Voting Activity"
        Then the voting activity report saved message appears
        And the saved config name appears under My configuration section
        When I click on the Download button to download the report
        Then the download initiated toast message appears
        And I "delete" the report for "Voting Activity"
        When I click on the notification toolbar
        Then I "verify ready for download of" the report for "Voting Activity"
        When I download the first report from the notification toolbar
        Then I verify some information for the downloaded "Voting Activity" report
        And I should logout from the application


    #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/37962
    @37962 @focus
    Scenario: Generate ballot vote data report, download and verify file
        Given I am logged in as the "RUSSELL" User
        When I navigate to the Reporting page
        And I navigate to the report type page for "Ballot Vote Data"
        And I set the meeting date to next date 2 and past date 2 days
        And I select "Ballot Voted Date" column
        And I "save" the report for "Ballot Vote Data"
        And I click on the Download button to download the report
        Then the download initiated toast message appears
        And I "delete" the report for "Ballot Vote Data"
        When I click on the notification toolbar
        And I "verify ready for download of" the report for "Ballot Vote Data"
        And I verify some information for the downloaded "Ballot Vote Data" report
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
        And I verify some information for the downloaded "Ballot Status via MD Page" report
        And I should logout from the application


    #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/56838
    @56838
    Scenario: Verify user is able to download Workflow Export Request report
        Given I am logged in as the "NEUBERGER" User
        When I navigate to the workflow page
        Then I can view the workflow page
        And I remove all existing selected criteria
        When I select "2" meetings from the top
        And I generate a request for Workflow Export
        Then A toast message appears for "EXPORT_INITIATED"
        When I click on the notification toolbar
        And I "verify export ready" the report for "Workflow Export"
        And I verify some information for the downloaded "Workflow Export" report
        And I should logout from the application
