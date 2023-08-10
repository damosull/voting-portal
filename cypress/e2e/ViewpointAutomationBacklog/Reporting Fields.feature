@37986 @37990
Feature: Report related tests
    #Test Suite - https://dev.azure.com/glasslewis/Development/_testPlans/define?planId=48536&suiteId=48537
    #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/37986

    #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/37972
    @37972
    Scenario: Generate Ballot Reconciliation Report, download and verify file headers
        Given I am logged in as the "ROBECO" user
        When I navigate to the Reporting page
        And I set the meeting date to next date 5 and past date 2 days
        And I add the first 4 column option into the header list
        And I click on the Apply button
        Then I "save" the report for "Ballot Reconciliation"
        When I click on the Download button to download the report
        Then the download initiated toast message appears
        And I "delete" the report for "Ballot Reconciliation"
        When I click on the notification toolbar
        And I "verify ready for download of" the report for "Ballot Reconciliation"
        Then I verify the report name and headers for Ballot Reconciliation Report


    #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/37971
    @37971
    Scenario: Generate Ballot Status Report, download and verify file headers
        Given I am logged in as the "CHARLESSCHWAB" user
        When I navigate to the Reporting page
        And I navigate to the report type page for "Ballot Status"
        And I filter the report type to "xlsx"
        And I set the date range to the next or last 7 days
        Then I "save" the report for "Ballot Status"
        When I click on the Download button to download the report
        Then the download initiated toast message appears
        And I "delete" the report for "Ballot Status"
        When I click on the notification toolbar
        Then I "verify ready for download of" the report for "Ballot Status"
        When I download the first report from the notification toolbar
        And I refresh the page
        And I click on the notification toolbar
        Then I verify the report name and a few columns for Ballot Status Report


    #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/37962
    @37962
    Scenario: Generate Ballot Vote Data Report, download and verify file headers
        Given I am logged in as the "OPERS" user
        When I navigate to the Reporting page
        And I navigate to the report type page for "Ballot Vote Data"
        And I set the meeting date to next date 2 and past date 5 days
        And I select "Ballot Voted Date" column
        And I "save" the report for "Ballot Vote Data"
        And I click on the Download button to download the report
        Then the download initiated toast message appears
        And I "delete" the report for "Ballot Vote Data"
        When I click on the notification toolbar
        And I "verify ready for download of" the report for "Ballot Vote Data"
        And I verify the report name and headers for Ballot Vote Data Report


    #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/40409
    @40409
    Scenario: Create Ballot Vote Subscription entry and validate in SB_Subscription Database table
        Given I am logged in as the "CALPERS" user
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


    #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/37963
    @37963
    Scenario: Generate Engagement report, download and verify file headers
        Given I am logged in as the "CALPERS" user
        When I navigate to the Reporting page
        And I navigate to the report type page for "Engagement"
        And I set the meeting date to next date 5 and past date 5 days
        And I click on the Update button
        And I add all the columns
        And I "save" the report for "Engagement"
        And I click on the Download button to download the report
        Then the download initiated toast message appears
        And I "delete" the report for "Ballot Reconciliation"
        When I click on the notification toolbar
        And I "verify ready for download of" the report for "Engagement"
        And I verify the report name and headers for Engagement Report


    Scenario: Generate Meeting Summary Report, download and verify file headers
        Given I am logged in as the "CALPERS" user
        When I navigate to the Reporting page
        And I navigate to the report type page for "Meeting Summary"
        And I filter the report type to "xlsx"
        And I set the date range to the next or last 14 days
        And I "save" the report for "Meeting Summary"
        When I click on the Download button to download the report
        Then the download initiated toast message appears
        And I "delete" the report for "Meeting Summary"
        When I click on the notification toolbar
        Then I "verify ready for download of" the report for "Meeting Summary"
        When I download the first report from the notification toolbar
        And I refresh the page
        And I click on the notification toolbar
        Then I verify the report name and a few columns for Meeting Summary Report


    #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/37988
    @37988
    Scenario: Generate Policy Report, download and verify file headers
        Given I am logged in as the "RUSSELL" user
        When I navigate to the Reporting page
        And I navigate to the report type page for "Policy"
        And I filter the report type to "xlsx"
        Then I set the first available Policy ID as the filter for Policy report
        And I "save" the report for "Policy"
        When I click on the Download button to download the report
        Then the download initiated toast message appears
        And I "delete" the report for "Policy"
        When I click on the notification toolbar
        Then I "verify ready for download of" the report for "Policy"
        When I download the first report from the notification toolbar
        And I refresh the page
        And I click on the notification toolbar
        Then I verify the report name and a few columns for Policy Report


    #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/38014
    @38014
    Scenario: Generate Proxy Voting Report, download and verify file headers
        Given I am logged in as the "CHARLESSCHWAB" user
        When I navigate to the Reporting page
        And I navigate to the report type page for "Proxy Voting"
        And I filter the report type to "xlsx"
        And I select the past 7 days
        And I expand Vote Comparison and select GL Recs Against Mgmt
        Then I "save" the report for "Proxy Voting"
        When I click on the Download button to download the report
        Then the download initiated toast message appears
        And I "delete" the report for "Proxy Voting"
        When I click on the notification toolbar
        Then I "verify ready for download of" the report for "Proxy Voting"
        When I download the first report from the notification toolbar
        And I refresh the page
        And I click on the notification toolbar
        Then I verify the report name and a few columns for Proxy Voting Report


    #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/38778
    @38778
    Scenario: Generate Proxy Voting Summary Report, download and verify file headers
        Given I am logged in as the "OPERS" user
        When I navigate to the Reporting page
        And I navigate to the report type page for "Proxy Voting Summary"
        And I filter the report type to "xlsx"
        And I set the date range to the next or last 15 days
        And I "save" the report for "Proxy Voting Summary"
        When I click on the Download button to download the report
        Then the download initiated toast message appears
        And I "delete" the report for "Proxy Voting Summary"
        When I click on the notification toolbar
        Then I "verify ready for download of" the report for "Proxy Voting Summary"
        When I download the first report from the notification toolbar
        And I refresh the page
        And I click on the notification toolbar
        Then I verify the report name and a few columns for Proxy Voting Summary Report


    Scenario: Generate Vote Results Report, download and verify file headers
        Given I am logged in as the "OPERS" user
        When I navigate to the Reporting page
        And I navigate to the report type page for "Vote Results"
        And I set the date range to the next or last 7 days
        And I "save" the report for "Vote Results"
        When I click on the Download button to download the report
        Then the download initiated toast message appears
        And I "delete" the report for "Vote Results"
        When I click on the notification toolbar
        Then I "verify ready for download of" the report for "Vote Results"
        Then I verify the report name and headers for Vote Results Report


    #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/37939
    @37939
    Scenario: Generate Voting Activity Report, download and verify file headers
        Given I am logged in as the "CALPERS" user
        When I navigate to the Reporting page
        And I navigate to the report type page for "Voting Activity"
        And I filter the report type to "xlsx"
        And I set the date range to the next or last 7 days
        And I have added the reporting criteria for "Decision Status" with status "Voted"
        And I set minimal columns for the AVA Report
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
        And I refresh the page
        And I click on the notification toolbar
        Then I verify the report name and a few columns for Voting Activity Report
