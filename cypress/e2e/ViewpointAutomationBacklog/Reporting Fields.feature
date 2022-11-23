Feature: Report related tests
#Test Suite - https://dev.azure.com/glasslewis/Development/_testPlans/define?planId=48536&suiteId=48537
#TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/37986
#Automated Report: Ballot Reconciliation, Ballot Vote Data, Engagement, Policy, Proxy Voting, Voting Activity
#Not Automated: Ballot Status, Meeting Summary, Proxy Voting Summary, Vote Results

    Background:
        Given I am logged in as the "CALPERS" User

    @37986
    Scenario: Generate Ballot Reconciliation Report, download and verify file headers
        When I navigate to the Reporting page
        And I set the meeting date to next date 5 and past date 0 days
        And I add the first 4 column option into the header list
        And I click on the Apply button
        And I click on the Download button to download the report
        Then the download initiated toast message appears
        When I click on the notification dropdown
        And I "verify ready for download of" the report for "Ballot Reconciliation"
        And I verify some information for the downloaded "Ballot Reconciliation" report
        And I should logout from the application


    #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/37962
    @37986 @37962
    Scenario: Generate Ballot Vote Data Report, download and verify file
        When I navigate to the Reporting page
        And I navigate to the report type page for "Ballot Vote Data"
        And I set the meeting date to next date 2 and past date 2 days
        And I select "Ballot Voted Date" column
        And I "save" the report for "Ballot Vote Data"
        And I click on the Download button to download the report
        Then the download initiated toast message appears
        And I "delete" the report for "Ballot Vote Data"
        When I click on the notification dropdown
        And I "verify ready for download of" the report for "Ballot Vote Data"
        And I verify some information for the downloaded "Ballot Vote Data" report
        And I should logout from the application


    #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/40409
    @37986 @40409
    Scenario: Create Ballot Vote Subscription entry and validate in SB_Subscription Database table
        When I navigate to the Reporting page
        And I navigate to the report type page for "Ballot Vote Data"
        And I "save" the report for "Ballot Vote Data"
        And I Add Subscription
        And I select Calpers External Admin from Users list on reporting page
        And I enter Filename for Subscription Report
        And I enter Schedule to run Subscription on reporting page
        And I click on the Ok button
        Then Subscription added toast message appears
        And Verify UI table entries for newly created Subscription
        And I verify Column data for UserIds and Filename
        And I remove Subscription entry from Viewpoint on reporting page
        And I "delete" the report for "Ballot Vote Data"
        And I should logout from the application


    #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/37963
    @37986 @37963
    Scenario: Generate Engagement report, download and verify file headers
        When I navigate to the Reporting page
        And I navigate to the report type page for "Engagement"
        And I select Interaction Date between -2 and 0 days from today
        And I click on the Update button
        And I add all the columns
        And I click on the Download button to download the report
        Then the download initiated toast message appears
        When I click on the notification dropdown
        And I "verify ready for download of" the report for "Engagement"
        And I verify some information for the downloaded "Engagement" report
        And I should logout from the application


    #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/37988
    @37986 @37988
    Scenario: Generate Policy Report, download and verify file headers
        When I navigate to the Reporting page
        And I navigate to the report type page for "Policy"
        And I remove any existing report criteria
        Then I verify the filters
        And I "save" the report for "Policy"
        And I click on the Download button to download the report
        Then the download initiated toast message appears
        And I "delete" the report for "Policy"
        When I click on the notification dropdown
        And I "verify ready for download of" the report for "Policy"
        And I verify some information for the downloaded "Policy" report
        And I should logout from the application


    #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/37939
    @37986 @37939
    Scenario: Proxy Voting Report
        When I navigate to the Reporting page
        And I navigate to the report type page for "Proxy Voting"
        And I select Report Extension XLS
        And I select the past 2 days
        And I expand Vote Comparison and select GL Recs Against Mgmt
        And I "save" the report for "Proxy Voting"
        And I click on the Download button to download the report
        Then the download initiated toast message appears
        And I "delete" the report for "Proxy Voting"
        When I click on the notification dropdown
        And I "verify ready for download of" the report for "Proxy Voting"
        And I verify some information for the downloaded "Proxy Voting" report
        And I should logout from the application


    #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/37939
    @37986 @37939 @2754
    Scenario: Generate Voting Activity Report, download and verify file headers
        When I navigate to the Reporting page
        And I navigate to the report type page for "Voting Activity"
        And I filter the report type to "xlsx"
        And I set the date range to the last 3 days
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
        When I click on the notification dropdown
        Then I "verify ready for download of" the report for "Voting Activity"
        When the voting activity report is downloaded
        Then I verify some information for the downloaded "Voting Activity" report
        And I should logout from the application
