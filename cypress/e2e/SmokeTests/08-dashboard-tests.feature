@dashboard
Feature: Dashboard related smoke tests
    #Test Suite - https://dev.azure.com/glasslewis/Development/_testPlans/define?planId=56788&suiteId=56791

    Background:
        Given I am logged in as the "CALPERS" user

    #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/40490
    @40490
    Scenario: Create Dashboard Subscription entry and validate in SB_Subscription Database table
        When I navigate to the dashboard page
        Then I select Subscriptions link
        And I click Add Subscription button
        And I select Calpers External Admin from Users list on dashboard page
        And I enter Filename DashboardTest
        And I enter Schedule to run Subscription on dashboard page
        And I enter Subject,header & footer
        And I click OK
        Then I verify Toast message - Subscription added
        And I connect to Aqua Database and verify new row has been added to SB_Subscription table
        And I remove Subscription entry from Viewpoint on dashboard page
        And I should logout from the application


    #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/39541
    @39541
    Scenario: Validate Dashboard
        When I navigate to the dashboard page
        Then I verify sidebar links
        And I verify Upcoming Meetings highlighted
        And I verify heading buttons and links
        And I verify Widget headers
        And I verify each widget has edit and remove buttons
        And I verify Subscriptions
        And I add a widget
        And I check dropdown values selectable
        And I select certain values
        And I check returned table headers
        And I remove widget
        And I should logout from the application