# After API of workflow-expansion was fixed, we will remove theses steps to workflow-expansion.feature


# @workflow @workflow-expansion
# Feature: Verify UI and API's data in workflow-expansion

#     Background:
#         Given I am logged in as the "CALPERS" User

#     @59640 @59641
#     Scenario Outline: verify UI test to compare Aggregate/NonAggregated cache data with DB data
#         When I navigate to the URL <cache_url>
#         Then I can see data source title <cache_url> is visible
#         And I can view the workflow page
#         When I remove all existing selected criteria
#         Then I can view the workflow page
#         When I set the date filter between -30 and -28 days from today
#         And I update the date filter
#         Then I can view the workflow page
#         When I enable all columns
#         Then I can view the workflow page
#         When I store data from UI <cache_UI_table> within the page
#         And I navigate to the URL <db_url>
#         Then I can see data source title <db_url> is visible
#         And I can view the workflow page
#         When I remove all existing selected criteria
#         Then I can view the workflow page
#         When I set the date filter between -30 and -28 days from today
#         And I update the date filter
#         Then I can view the workflow page
#         When I enable all columns
#         Then I can view the workflow page
#         When I store data from UI <db_UI_table> within the page
#         Then the data from <cache_UI_table> table and <db_UI_table> table are equal

#         Examples:
#             | cache_url                         | cache_UI_table         | db_url                   | db_UI_table         |
#             | "WORKFLOW_PERFORMANCE_AGGREGATED" | 'CacheAggregatedTable' | "WORKFLOW_DB_AGGREGATED" | 'DbAggregatedTable' |
#             | "WORKFLOW_PERFORMANCE"            | 'CacheTable'           | "WORKFLOW_DB"            | 'DbTable'           |

#     @60136
#     Scenario: verify API data to compare aggregate cache data with DB data
#         When I navigate to the workflow page
#         And I arrange the table in 'ascending' order for 'control number'
#         Then I can view the workflow page
#         When I store first Agenda Key number
#         And I get the response for 'WorkflowExpansionDbAggregated' API
#         And I get the response for 'WorkflowExpansionPerformanceAggregated' API
#         And the data from CacheAggregated API and DbAggregated API are equal

#     @59998
#     Scenario: Verify API data to compare NonAggregated cache data with DB data
#         When I navigate to the workflow page
#         And I arrange the table in 'ascending' order for 'control number'
#         Then I can view the workflow page
#         When I store first Agenda Key number
#         And I get the response for 'WorkflowExpansionPerformance' API
#         And I get the response for 'WorkflowExpansionDb' API
#         Then 'Agendas' property from DbNonAggregated and CacheNonAggregated API are equal
#         And 'Agendas.Policies' property from DbNonAggregated and CacheNonAggregated API are equal
#         And 'Agendas.Policies.Ballots' property from DbNonAggregated and CacheNonAggregated API are equal
#         And all Summaries property from DbNonAggregated and CacheNonAggregated API are equal
#         And the data from DbNonAggregated API and CacheNonAggregated API are equal