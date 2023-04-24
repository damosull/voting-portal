@api @api-external
Feature: Checking API calls with External user
#Test Suite - https://dev.azure.com/glasslewis/Development/_testPlans/define?planId=56788&suiteId=56790

    Background:
        Given I am logged in as the "CALPERS" User

    @56797
    Scenario: Workflow page API calls are loading as expected
        When I navigate to the workflow page
        Then I verify that all the relevant API calls for workflow page are made for "external" user
        And I verify the workflow table and filters have loaded

    @56798
    Scenario: Dashboard page API calls are loading as expected
        When I navigate to the dashboard page
        Then I verify that all the relevant API calls for dashboard page are made

    @56799
    Scenario: Reporting page API calls are loading as expected
        When I navigate to the Reporting page
        Then I verify that all the relevant API calls for reporting page are made

    @56800
    Scenario: MeetingDetails page API calls are loading as expected
        When I navigate to the meeting with id "1173535"
        Then I verify that all the relevant API calls for meeting details page are made for "external" user
        And I verify all the meeting sections have loaded

    @56801
    Scenario: Password change page API calls are loading as expected
        When I navigate to the change password page
        Then I verify that all the relevant API calls for change password page are made

    @56802
    Scenario: User Profile page API calls are loading as expected
        When I navigate to the user profile page
        Then I verify that all the relevant API calls for user profile page are made

    @56803
    Scenario: Customer profile / Accounts page API calls are loading as expected
        When I navigate to the accounts page
        Then I verify that all the relevant API calls for accounts page are made

    @56804
    Scenario: Customer profile / CustomFields page API calls are loading as expected
        When I navigate to the custom fields page
        Then I verify that all the relevant API calls for custom fields page are made

    @56805
    Scenario: Customer profile / Rationale library page API calls are loading as expected
        When I navigate to the rationale page
        Then I verify that all the relevant API calls for rationale page are made

    @56806
    Scenario: Customer details page API calls are loading as expected
        When I navigate to the customer details page
        Then I verify that all the relevant API calls for customer details page are made

    @56807
    Scenario: Customer profile / UsersProfiles page API calls are loading as expected
        When I navigate to the user profile page
        Then I verify that all the relevant API calls for user profile page are made

    @56808
    Scenario: Watch list page API calls are loading as expected
        When I navigate to the manage watchlist page
        Then I verify that all the relevant API calls for manage watchlist page are made
