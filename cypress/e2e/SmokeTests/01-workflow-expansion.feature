@workflow @workflow-expansion
Feature: Verify UI and API's data in workflow-expansion

    @59640 @59641
    Scenario Outline: verify UI test to compare Aggregate/NonAggregated cache data with DB data
        Given I am logged in as the <customer> user
        When I navigate to the URL <cache>
        Then I can see data source title for <cache> is visible
        And I can view the workflow page
        When I set the date filter between <start_date> and <end_date> days from today
        And I update the date filter
        Then I can view the workflow page
        When I enable all columns
        Then I can view the workflow page
        When I store data from UI <cache> within the page
        And I navigate to the URL <database>
        Then I can see data source title for <database> is visible
        And I can view the workflow page
        When I set the date filter between <start_date> and <end_date> days from today
        And I update the date filter
        Then I can view the workflow page
        When I enable all columns
        Then I can view the workflow page
        When I store data from UI <database> within the page
        Then the data from <cache> table and <database> table are equal

        Examples:
            | customer  | cache                             | database                 | start_date | end_date |
            | "OPERS"   | "WORKFLOW_PERFORMANCE_AGGREGATED" | "WORKFLOW_DB_AGGREGATED" | -45        | -42      |
            | "CALPERS" | "WORKFLOW_PERFORMANCE"            | "WORKFLOW_DB"            | -30        | -27      |
            | "EVELYN"  | "WORKFLOW_PERFORMANCE_AGGREGATED" | "WORKFLOW_DB_AGGREGATED" | -15        | -12      |

    @60136
    Scenario: verify API data to compare aggregate cache data with DB data
        Given I am logged in as the "PUTNAM" user
        When I navigate to the workflow page
        Then I can view the workflow page
        When I store first Agenda Key number
        And I get the response for 'WorkflowExpansionDbAggregated' API
        And I get the response for 'WorkflowExpansionPerformanceAggregated' API
        Then the data from CacheAggregated API and DbAggregated API are equal

    @59998
    Scenario: Verify API data to compare NonAggregated cache data with DB data
        Given I am logged in as the "ROBECO" user
        When I navigate to the workflow page
        And I arrange the table in 'ascending' order for 'control number'
        Then I can view the workflow page
        When I store first Agenda Key number
        And I get the response for 'WorkflowExpansionPerformance' API
        And I get the response for 'WorkflowExpansionDb' API
        Then 'Agendas' property from DbNonAggregated and CacheNonAggregated API are equal
        And 'Agendas.Policies' property from DbNonAggregated and CacheNonAggregated API are equal
        And 'Agendas.Policies.Ballots' property from DbNonAggregated and CacheNonAggregated API are equal
        And 'lookups.MeetingIDs' property from DbNonAggregated and CacheNonAggregated API are equal
        And all Summaries property from DbNonAggregated and CacheNonAggregated API are equal
        And the data from DbNonAggregated API and CacheNonAggregated API are equal