Feature: Report related tests
    #Test Suite - https://dev.azure.com/glasslewis/Development/_testPlans/execute?planId=9215&suiteId=9733

    #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/32357
    @32357
    Scenario: Ballot vote data report - fields options
        Given I am logged in as the "CALPERS" User
        When I navigate to the Reporting page
        And I navigate to the report type page for "Ballot Vote Data"
        
        #And I should logout from the application