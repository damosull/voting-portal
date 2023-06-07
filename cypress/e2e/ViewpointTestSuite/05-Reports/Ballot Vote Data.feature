Feature: Ballot Vote Data
    #Test Suite - https://dev.azure.com/glasslewis/Development/_testPlans/execute?planId=9215&suiteId=9733

    #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/32357
    @32357
    Scenario: Ballot vote data report - fields options
        Given I am logged in as the "CALPERS" User
        When I navigate to the Reporting page
        And I choose the report type to be "Ballot Vote Data"
        And I expand the Configure Columns section
        Then I verify that the mandatory fields cannot be removed from the configuration for Ballot Vote Data Report
        And I verify the default field list for current selection for Ballot Vote Data Report
        And I verify the default field list for available selection for Ballot Vote Data Report
        And I should logout from the application
