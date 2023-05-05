@workflow @workflow-expansion
Feature: Verify UI and API's data in workflow-expansion

    Background:
        Given I am logged in as the "CALPERS" User

    # @59640
    # Scenario: verify API & and UI test to compare aggregate cache data with DB data
    #     When I navigate to the URL '/Workflow/CacheAggregated'
    #     Then I can see data source title 'Cache only; NO EXPANSION' is visible
    #     And I verify the workflow table and filters have loaded
    #     When I store data from UI table and 'WorkflowExpansionPerformanceAggregated' API within the page
    #     And I navigate to the URL '/Workflow/DbAggregated'
    #     Then I can see data source title 'Database only; NO EXPANSION' is visible
    #     And I verify the workflow table and filters have loaded
    #     When I store data from UI table and 'WorkflowExpansionDbAggregated' API within the page
    #     Then the data from '@CacheAggregatedTable' table and '@DbAggregatedTable' table are equal
    #     And the data from CacheAggregated API and DbAggregated API are equal

    @59641
    Scenario: verify API & and UI test to compare aggregate cache data with DB data(ignore Items.Agendas property in API)
        When I navigate to the URL '/Workflow/Db'
        Then I can see data source title 'Database only, no server side meeting aggregation; full Expansion' is visible
        When I arrange the table in 'ascending' order for 'control number'
        Then I verify the workflow table and filters have loaded
        When I store data from UI table and 'WorkflowExpansionDB' API within the page
        And I navigate to the URL '/Workflow/Performance'
        Then I can see data source title 'Cache only, no server side meeting aggregation; full Expansion' is visible
        When I arrange the table in 'ascending' order for 'control number'
        Then I verify the workflow table and filters have loaded
        When I store data from UI table and 'WorkflowExpansionPerformance' API within the page
        Then the data from '@CacheTable' table and '@DbTable' table are equal
        And the data from DbNonAggregated API and CacheNonAggregated API are equal

    @59998
    Scenario: Verify lookups, Agendas mostly focus on Summaries and inner property of Agendas(Polices, Policies.Ballots)
        When I navigate to the URL '/Workflow'
        When I arrange the table in 'ascending' order for 'control number'
        Then I verify the workflow table and filters have loaded
        When I store first Agenda Key number
        And I get the response for 'WorkflowExpansionPerformance' API
        And I get the response for 'WorkflowExpansionDb' API
        Then 'Agendas' property from DbNonAggregated and CacheNonAggregated API are equal
        And 'Agendas.Policies' property from DbNonAggregated and CacheNonAggregated API are equal
        And 'Agendas.Policies.Ballots' property from DbNonAggregated and CacheNonAggregated API are equal
        And 'lookups.MeetingIDs' property from DbNonAggregated and CacheNonAggregated API are equal
        And all Summaries property from DbNonAggregated and CacheNonAggregated API are equal