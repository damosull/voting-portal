Feature: Workflow Export
    #Test Suite - https://dev.azure.com/glasslewis/Development/_testPlans/execute?planId=9215&suiteId=9665

    #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/29585
    @29585
    Scenario: Verify User can Export selected Companies 'Current view' HTML file under the Specific saved filter
        Given I am logged in as the "CALPERS" user
        When I navigate to the workflow page
        Then I can view the workflow page
        When I select 2 meetings from the top
        And I save the data from row 1 on the workflow grid
        And I generate a request for Workflow Export as "html" for "currently displayed" fields
        Then A toast message appears for "EXPORT_INITIATED"
        When I click on the notification toolbar
        And I "verify export ready" the report for "Workflow Export"
        And I verify the report name and headers for Workflow Export Report "html"
        And I verify the Workflow Export Report contains data seen on the UI
        And I should logout from the application


    #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/3367
    @3367
    Scenario: Verify User can Export 'HTML' file of 'All available fields' from the Workflow data
        Given I am logged in as the "CALPERS" user
        When I navigate to the workflow page
        Then I can view the workflow page
        When I select 2 meetings from the top
        And I save the data from row 1 on the workflow grid
        And I generate a request for Workflow Export as "html" for "all" fields
        Then A toast message appears for "EXPORT_INITIATED"
        When I click on the notification toolbar
        Then I "verify export ready" the report for "Workflow Export"
        And I verify the report name and headers for Workflow Export Report "html"
        And I verify the Workflow Export Report contains data seen on the UI
        And I should logout from the application
