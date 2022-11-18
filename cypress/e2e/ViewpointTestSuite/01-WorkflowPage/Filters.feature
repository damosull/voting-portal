Feature: Filters
#Test Suite - https://dev.azure.com/glasslewis/Development/_testPlans/execute?planId=9215&suiteId=28349

    #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/28350
    @28350
    Scenario: Verify user lands on the Default System Pre Set Filter "Upcoming Meetings"
        Given I am logged in as the "CALPERS" User
        And I navigate to the workflow page
        Then I can view the workflow page
        And I can verify that "Upcoming Meetings" displayed under the "Quick Filters" category on the left side of the screen
        And I should logout from the application


    #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/28351
    @28351
    Scenario: Verify that the correct search criteria fields are displayed for "Upcoming Meeting" Filter
        Given I am logged in as the "AUTOMATIONINTERNAL" User
        And I navigate to the workflow page
        Then I can view the workflow page
        And I can see the filter columns are displayed in the correct order
        And I should logout from the application