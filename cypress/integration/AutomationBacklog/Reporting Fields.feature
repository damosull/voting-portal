Feature: Report related tests

    Background:
        Given I am logged in as the "CALPERS" User

    # This is not a test - it will just download the report for validating it later (last test on this file)
    # Test scenario 37939: https://dev.azure.com/glasslewis/Development/_workitems/edit/37939
    Scenario: Proxy Voting Report
        When I navigate to the Reporting page
        And I select 'Proxy Voting' Report Type
        And I select Report Extension XLS
        And I select the past 2 days
        And I expand Vote Comparison and select GL Recs Against Mgmt
        Then I download the proxy voting report
        And I should logout from the application

    Scenario: Ballot status report meeting detail page
        When I navigate to the workflow page
        And I remove all existing selected criteria
        And I have added the criteria for "Decision Status" with status "Recommendations Pending"
        And I select the first available meeting
        And I export the ballot status report
        Then A toast message appears
        When I click on the notification dropdown
        And Ballot Status Report is queued
        Then I download the PDF and verify it
        And I should logout from the application

    # Test scenario: 37962 https://dev.azure.com/glasslewis/Development/_workitems/edit/37962
    Scenario: Generate ballot vote data report, download and verify file
        When I navigate to the Reporting page
        And I click on the "Ballot Vote Data" filter
        And I set the meeting date to next date 2 and past date 2 days
        And I select "Ballot Voted Date" column
        And I save the configuration with the name of "configName_BallotVoteReport"
        And I click on the download the report button
        Then Download initiated toast message appears
        And I delete the given "configName_BallotVoteReport" configuration
        When I click on the notification dropdown
        And Report is ready to download message appears in the notifications with the name of "configName_BallotVoteReport"
        Then I verify the report headers with the name of "configName_BallotVoteReport"
        And I should logout from the application

    # Test scenario: 40409 https://dev.azure.com/glasslewis/Development/_workitems/edit/40409
    Scenario: Create Ballot Vote Subscription entry and validate in SB_Subscription Database table
        When I navigate to the Reporting page
        And I click on the "Ballot Vote Data" filter
        And I save the configuration with the name of "configName_BallotVoteReport_SB"
        And I Add Subscription
        And I select Calpers External Admin from Users list
        And I enter Filename for Subscription Report
        And I enter Schedule to run Subscription
        And I click on the Ok button
        Then Subscription added toast message appears
        And Verify UI table entries for newly created Subscription
        And I verify Column data for UserIds and Filename
        And I remove Subscription entry from Viewpoint
        And I delete the given 'configName_BallotVoteReport_SB' configuration
        And I should logout from the application

    # Test scenario 37963 : https://dev.azure.com/glasslewis/Development/_testPlans/define?planId=37349&suiteId=37350
    Scenario: Generate Engagement report, download and verify file headers
        When I navigate to the Reporting page
        And I select 'Engagement' Report Type
        And I select Interaction Date between '8/2/2022' and '8/3/2022'
        And I click on the Update button
        And I add all the columns
        And I click on the download the report button
        Then Download initiated toast message appears
        When I click on the notification dropdown
        Then Engagement Report is queued
        And I validate the Engagement Report
        And I should logout from the application

    Scenario: Generate basic excel report, download and verify file headers - Generate Ballot Report
        When I navigate to the Reporting page
        And I add 'Policy ID' reporting criteria
        And I add the first 4 column option into the header list
        And I click on the Apply button
        And I click on the download the report button
        Then Download initiated toast message appears
        When I click on the notification dropdown
        And Status Report is queued
        Then I validate the Ballot Status Report headers
        And I should logout from the application

    # Test scenario 37988: https://dev.azure.com/glasslewis/Development/_testPlans/define?planId=37349&suiteId=37350
    Scenario: Generate Policy report, download and verify file headers - Generate Policy Report
        When I navigate to the Reporting page
        And I select 'Policy' Report Type
        And I remove any existing report criteria
        Then I verify the filters
        When I save the new filter with random name
        And I click on the download the report button
        Then Download initiated toast message appears
        When I click on the notification dropdown
        And Report is ready for download message appears
        Then I validate and verify the report
        And I should logout from the application

    #Test scenario 37939: https://dev.azure.com/glasslewis/Development/_workitems/edit/37939
    Scenario: Report - Voting Activity
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
        And I save the Voting Activity configuration
        Then Report saved message appears
        And Saved config name appears under My configuration section
        When I click on the download the report button
        Then Download initiated toast message appears
        When I click on the notification dropdown
        Then Voting Activity report is queued
        When Report is downloaded
        And I delete the given 'configName_VotingActivityReport' configuration
        Then I am checking the report format
        And I should logout from the application

    # Validate Proxy Voting File
    # Test scenario 37939: https://dev.azure.com/glasslewis/Development/_workitems/edit/37939
    Scenario: Proxy Voting Report
        When I navigate to the Reporting page
        And I select 'Proxy Voting' Report Type
        Then I verify the proxy voting report
        And I should logout from the application