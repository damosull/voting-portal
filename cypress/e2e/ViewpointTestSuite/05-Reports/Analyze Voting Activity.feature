Feature: Analyze Voting Activity
    #Test Suite - https://dev.azure.com/glasslewis/Development/_testPlans/execute?planId=9215&suiteId=9503

    #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/2854
    @2854
    Scenario: Verify External User can download the Excel Ad-hoc Report from the Notification Toolbar
        Given I am logged in as the "CALPERS" User
        When I navigate to the Reporting page
        And I navigate to the report type page for "Voting Activity"
        And I filter the report type to "xlsx"
        And I set the date range to the next or last 3 days
        And I expand the Configure Columns section
        Then I verify the default field list for current selection for Voting Activity Report
        And I randomly wait between 5 and 8 seconds
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
