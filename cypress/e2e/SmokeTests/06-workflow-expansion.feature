@workflow @workflow-expansion
Feature: Verify UI and API's data in workflow-expansion

    Background:
        Given I am logged in as the "CALPERS" User

    @59640 @59641
    Scenario Outline: verify UI test to compare Aggregate/NonAggregated cache data with DB data
        When I navigate to the URL <Cache_URL>
        Then I can see data source title <Cache_URL> is visible
        When I arrange the table in 'ascending' order for 'control number'
        Then I verify the workflow table and filters have loaded
        When I store data from UI <Cache_UI_Table> within the page
        And I navigate to the URL <Db_URL>
        Then I can see data source title <Db_URL> is visible
        When I arrange the table in 'ascending' order for 'control number'
        Then I verify the workflow table and filters have loaded
        When I store data from UI <Db_UI_Table> within the page
        Then the data from <Cache_UI_Table> table and <Db_UI_Table> table are equal

        Examples:
            | Cache_URL                         | Cache_UI_Table         | Db_URL                   | Db_UI_Table         |
            | "WORKFLOW_PERFORMANCE_AGGREGATED" | 'CacheAggregatedTable' | "WORKFLOW_DB_AGGREGATED" | 'DbAggregatedTable' |
            | "WORKFLOW_PERFORMANCE"            | 'CacheTable'           | "WORKFLOW_DB"            | 'DbTable'           |

    @60136
    Scenario: verify API data to compare aggregate cache data with DB data
        When I navigate to the workflow page
        And I arrange the table in 'ascending' order for 'control number'
        Then I verify the workflow table and filters have loaded
        When I store first Agenda Key number
        And I get the response for 'WorkflowExpansionDbAggregated' API
        And I get the response for 'WorkflowExpansionPerformanceAggregated' API
        And the data from CacheAggregated API and DbAggregated API are equal

    @59998
    Scenario: Verify API data to compare NonAggregated cache data with DB data
        When I navigate to the workflow page
        And I arrange the table in 'ascending' order for 'control number'
        Then I verify the workflow table and filters have loaded
        When I store first Agenda Key number
        And I get the response for 'WorkflowExpansionPerformance' API
        And I get the response for 'WorkflowExpansionDb' API
        Then 'Agendas' property from DbNonAggregated and CacheNonAggregated API are equal
        And 'Agendas.Policies' property from DbNonAggregated and CacheNonAggregated API are equal
        And 'Agendas.Policies.Ballots' property from DbNonAggregated and CacheNonAggregated API are equal
        And 'lookups.MeetingIDs' property from DbNonAggregated and CacheNonAggregated API are equal
        And all Summaries property from DbNonAggregated and CacheNonAggregated API are equal
        And the data from DbNonAggregated API and CacheNonAggregated API are equal