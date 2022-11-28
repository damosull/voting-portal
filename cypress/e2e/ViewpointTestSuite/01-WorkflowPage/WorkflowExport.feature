Feature: Workflow Export
#Test Suite - https://dev.azure.com/glasslewis/Development/_testPlans/execute?planId=9215&suiteId=9270

    #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/3358
    @3358
    Scenario: Verify User can export 'Current View' into 'CSV' file under the my filters
        Given I am logged in as the "PUTNAM" User
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
