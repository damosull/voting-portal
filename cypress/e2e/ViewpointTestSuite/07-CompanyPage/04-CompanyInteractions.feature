Feature: CR # 23401 - Company Interactions
#Test Suite - https://dev.azure.com/glasslewis/Development/_testPlans/execute?planId=9215&suiteId=9341

    #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/3728
    @3728
    Scenario: Verify External Admin user cannot view Engagements in the company page when the system permission "View Interaction" is turned off for External Admin role
        Given I set the setting "Permission.CompanyPage.ViewInteraction" to "Deny" for the user "ROBECO"
        When I am logged in as the "ROBECO" User
        Then I can view the workflow page
        And I select a random meeting
        And I click the Company link
        Then The anchor bar should not contain a link to Engagements
        And There is no Engagements section on the Company page
        And I should logout from the application
