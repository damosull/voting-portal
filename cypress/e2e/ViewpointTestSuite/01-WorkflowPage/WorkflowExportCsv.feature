Feature: Workflow Export
    #Test Suite - https://dev.azure.com/glasslewis/Development/_testPlans/execute?planId=9215&suiteId=9270

    #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/3358
    @3358
    Scenario: Verify User can export 'Current View' into 'CSV' file under the my filters
        Given I am logged in as the "PUTNAM" user
        When I navigate to the workflow page
        Then I can view the workflow page
        When I select 2 meetings from the top
        And I save the data from row 1 on the workflow grid
        And I generate a request for Workflow Export as "csv" for "currently displayed" fields
        Then A toast message appears for "EXPORT_INITIATED"
        When I click on the notification toolbar
        Then I "verify export ready" the report for "Workflow Export"
        And I verify the report name and headers for Workflow Export Report "csv"
        And I verify the Workflow Export Report contains data seen on the UI
        And I should logout from the application


    #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/2727
    @2727 @3339
    Scenario: Verify User can export 'All Available Fields' into 'CSV' file under the 'My Filters'
        Given I am logged in as the "PUTNAM" user
        When I navigate to the workflow page
        Then I can view the workflow page
        When I select 2 meetings from the top
        And I save the data from row 1 on the workflow grid
        And I generate a request for Workflow Export as "csv" for "all" fields
        Then A toast message appears for "EXPORT_INITIATED"
        When I click on the notification toolbar
        Then I "verify export ready" the report for "Workflow Export"
        And I verify the report name and headers for Workflow Export Report "csv"
        And I verify the Workflow Export Report contains data seen on the UI
        And I should logout from the application
