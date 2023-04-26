@workflow @workflow-expansion
Feature: Verify UI and API's data in workflow-expansion

    Background:
        Given I am logged in as the "CALPERS" User

    @59640
    Scenario: verify API & and UI test to compare aggregate cache data with DB data
        When I navigate to the URL '/Workflow/CacheAggregated'
        Then I can see data source title 'Cache only; NO EXPANSION' is visible
        And I verify the workflow table and filters have loaded
        When I store data from UI table and 'WorkflowExpansionPerformanceAggregated' API within the page
        And I navigate to the URL '/Workflow/DbAggregated'
        Then I can see data source title 'Database only; NO EXPANSION' is visible
        And I verify the workflow table and filters have loaded
        When I store data from UI table and 'WorkflowExpansionDbAggregated' API within the page
        Then the data from '@CacheAggregatedTable' table and '@DbAggregatedTable' table are equal
        And the data from CacheAggregated API and DbAggregated API are equal
