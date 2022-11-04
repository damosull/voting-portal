@reporting
Feature: Reporting related smoke tests

    #Test scenario 37939: https://dev.azure.com/glasslewis/Development/_workitems/edit/37939
    @37939
    Scenario: Report - Voting Activity
        Given I am logged in as the "CALPERS" User
        When I navigate to the Reporting page
        And I select 'Voting Activity' Report Type
        And I filter the report type
        And I set the date range to the last 1 days
        And I select Decision Status Criteria
        And I select Voted criteria
        And I add columns to the report
        And I set the Footer under the Grouping & Presentation
        And I set the Header under the Grouping & Presentation
        And I add subscription to the report
        And I "save" the report for "Voting Activity"
        Then the voting activity report saved message appears
        And the saved config name appears under My configuration section
        When I click on the download the report button
        Then the download initiated toast message appears
        And I "delete" the report for "Voting Activity"
        When I click on the notification dropdown
        Then I "verify ready for download of" the report for "Voting Activity"
        When the voting activity report is downloaded
        Then I verify the contents for "Voting Activity" report
        And I should logout from the application


    # Test scenario: 37962 https://dev.azure.com/glasslewis/Development/_workitems/edit/37962
    @37962
    Scenario: Generate ballot vote data report, download and verify file
        Given I am logged in as the "RUSSELL" User
        When I navigate to the Reporting page
        And I click on the "Ballot Vote Data" filter
        And I set the meeting date to next date 2 and past date 2 days
        And I select "Ballot Voted Date" column
        And I "save" the report for "Ballot Vote Data"
        And I click on the download the report button
        Then the download initiated toast message appears
        And I "delete" the report for "Ballot Vote Data"
        When I click on the notification dropdown
        And I "verify ready for download of" the report for "Ballot Vote Data"
        And I verify the contents for "Ballot Vote Data" report
        And I should logout from the application


    Scenario: Ballot status report meeting detail page
        Given I am logged in as the "WELLINGTON" User
        When I navigate to the workflow page
        Then I can view the workflow page
        And I remove all existing selected criteria
        And I have added the criteria for "Decision Status" with status "Recommendations Pending"
        And I select the first available meeting
        And I export the ballot status report
        Then A toast message appears for "EXPORT_INITIATED"
        When I click on the notification dropdown
        And I "verify ready to download of" the report for "Ballot Status Report"
        And I verify the contents for "Ballot Status" report
        And I should logout from the application


    Scenario: Workflow Export Request report
        Given I am logged in as the "NEUBERGER" User
        When I navigate to the workflow page
        Then I can view the workflow page
        And I remove all existing selected criteria
        When I select "2" meetings from the top
        And I generate a request for Workflow Export
        Then A toast message appears for "EXPORT_INITIATED"
        When I click on the notification dropdown
        And I "verify ready to download of" the report for "Workflow Export Report"
        And I should logout from the application