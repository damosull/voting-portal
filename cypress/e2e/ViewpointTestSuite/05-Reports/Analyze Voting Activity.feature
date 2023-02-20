Feature: Analyze Voting Activity
    #Test Suite - https://dev.azure.com/glasslewis/Development/_testPlans/execute?planId=9215&suiteId=9503

    #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/2753
    @2753
    Scenario: Verify External User can download the PDF Ad-hoc Report from the Notification Toolbar
        Given I am logged in as the "ROBECO" User
        When I navigate to the Reporting page
        And I navigate to the report type page for "Voting Activity"
        And I filter the report type to "pdf"
        And I set the date range to the next or last 2 days
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
        Then I verify the contents on the Voting Activity PDF Report
        And I should logout from the application


    #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/2754
    @2754
    Scenario: Verify External User can download the Excel Ad-hoc Report from the Notification Toolbar
        Given I am logged in as the "CHARLESSCHWAB" User
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


    #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/2824
    @2824
    Scenario: Report Default Criteria for External user
        Given I am logged in as the "CHARLESSCHWAB" User
        When I navigate to the Reporting page
        And I navigate to the report type page for "Voting Activity"
        Then I verify the default expanded and collapsed sections
        And I should be "able" to see "Past 90 Days" on the UI
        When I select the dates between -4000 and -2 days from today
        Then I should be "able" to see "Date Range cannot be longer than 10 years" on the UI
        When I select the dates between -4 and 2 days from today
        Then I should be "able" to see "Date range cannot include future dates" on the UI
        And I should logout from the application


    #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/2825
    @2825
    Scenario: Report Default Criteria for internal user
        Given I am logged in as the "AUTOMATIONINTERNAL" User
        When I navigate to the Reporting page
        And I navigate to the report type page for "Voting Activity"
        When I search for the customer "California Public Employee Retirement System"
        Then I verify the default expanded and collapsed sections
        And I should be "able" to see "Past 90 Days" on the UI
        When I select the dates between -4000 and -2 days from today
        Then I should be "able" to see "Date Range cannot be longer than 10 years" on the UI
        When I select the dates between -4 and 2 days from today
        Then I should be "able" to see "Date range cannot include future dates" on the UI
        And I should logout from the application
