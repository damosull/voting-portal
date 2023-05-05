@api @api-internal
Feature: API Smoke Tests - Internal User
#Test Suite - https://dev.azure.com/glasslewis/Development/_testPlans/define?planId=56788&suiteId=56790

    Background:
        Given I am logged in as the "AUTOMATIONINTERNAL" User

    @56809
    Scenario: Workflow page API calls are loading as expected
        When I navigate to the workflow page
        Then I verify that all the relevant API calls for workflow page are made for "internal" user
        And I verify the workflow table and filters have loaded

    @56810
    Scenario: Dashboard page API calls are loading as expected
        When I navigate to the dashboard page
        Then I verify that all the relevant API calls for dashboard page are made
        And I verify a couple of widgets have loaded

    @56811
    Scenario: Reporting page API calls are loading as expected
        When I navigate to the Reporting page
        Then I verify that all the relevant API calls for reporting page are made
        And I verify that the reporting page has loaded successfully

    @56812
    Scenario: Password change page API calls are loading as expected
        When I navigate to the change password page
        Then I verify that all the relevant API calls for change password page are made
        And I verify the fields to change password have loaded

    @56813
    Scenario: User Profile page API calls are loading as expected
        When I navigate to the user profile page
        Then I verify that all the relevant API calls for user profile page are made
        And I verify that the user profile page has loaded successfully

    @56814
    Scenario: Customer user profile page API calls are loading as expected
        When I navigate to the customers page
        Then I verify that all the relevant API calls for customer user page are made
        And I verify that the customers page has loaded successfully

    @56815
    Scenario: Users page API calls are loading as expected
        When I navigate to the users page
        Then I verify that all the relevant API calls for users page are made
        And I verify that the users page for an internal user has loaded successfully

    @56816
    Scenario: Internal Users Profiles page API calls are loading as expected
        When I navigate to the users profiles page
        Then I verify that all the relevant API calls for internal users profile page are made
        And I verify that the users profiles page has loaded successfully

    @56817
    Scenario: Custodians page API calls are loading as expected
        When I navigate to the custodians page
        Then I verify that all the relevant API calls for custodians page are made
        And I verify that the Custodians page for an internal user has loaded successfully

    @56818
    Scenario: System Permissions page API calls are loading as expected
        When I navigate to the system permissions page
        Then I verify that all the relevant API calls for system permissions page are made

    @56819
    Scenario: User Permissions page API calls are loading as expected
        When I navigate to the User Permissions page
        Then I verify that all the relevant API calls for user permissions page are made

    @56820
    Scenario: Watch list page API calls are loading as expected
        When I navigate to the manage watchlist page
        Then I verify that all the relevant API calls for manage watchlist page are made
        And I verify that the manage watchlist page has loaded successfully

    @56821
    Scenario: MeetingDetails page API calls are loading as expected
        When I navigate to the URL "/MeetingDetails/Index/196/1173535"
        Then I verify that all the relevant API calls for meeting details page are made for "internal" user
        And I verify all the meeting sections have loaded

    @56822
    Scenario: Manage filters page API calls are loading as expected
        When I navigate to the Manage Filters page
        Then I verify that all the relevant API calls for manage filters page are made
        And I verify that the manage filters page for an "internal" user has loaded successfully

    @56823
    Scenario: Users profiles / CustomerID page API calls are loading as expected
        When I navigate to the URL "/Users/UsersProfiles/?CustomerID=690"
        Then I verify that all the relevant API calls for users profiles page are made for "internal" user
        And I verify that the users profiles page has loaded successfully

    @56827
    Scenario: Customer profile / Rationale library page API calls are loading as expected
        When I navigate to the URL "/CustomerDetails/Rationale/?CustomerID=690"
        Then I verify that all the relevant API calls for rationale page are made
        And I verify that the rationale page has loaded successfully