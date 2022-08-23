@api @api-internal
Feature: API Smoke Tests - Internal User

    Background:
        Given I am logged in as the "AUTOMATIONINTERNAL" User

    Scenario: Workflow page API calls are loading as expected
        When I navigate to the workflow page
        Then I verify that all the relevant API calls for workflow page are made for "internal" user

    Scenario: Dashboard page API calls are loading as expected
        When I navigate to the dashboard page
        Then I verify that all the relevant API calls for dashboard page are made

    Scenario: Reporting page API calls are loading as expected
        When I navigate to the Reporting page
        Then I verify that all the relevant API calls for reporting page are made

    Scenario: Password change page API calls are loading as expected
        When I navigate to the change password page
        Then I verify that all the relevant API calls for change password page are made

    Scenario: User Profile page API calls are loading as expected
        When I navigate to the user profile page
        Then I verify that all the relevant API calls for user profile page are made

    Scenario: Customer user profile page API calls are loading as expected
        When I navigate to the customers page
        Then I verify that all the relevant API calls for customer user page are made

    Scenario: Users page API calls are loading as expected
        When I navigate to the users page
        Then I verify that all the relevant API calls for users page are made

    Scenario: Internal Users Profiles page API calls are loading as expected
        When I navigate to the internal users profile page
        Then I verify that all the relevant API calls for internal users profile page are made

    Scenario: Custodians page API calls are loading as expected
        When I navigate to the custodians page
        Then I verify that all the relevant API calls for custodians page are made

    Scenario: System Permissions page API calls are loading as expected
        When I navigate to the system permissions page
        Then I verify that all the relevant API calls for system permissions page are made

    Scenario: User Permissions page API calls are loading as expected
        When I navigate to the User Permissions page
        Then I verify that all the relevant API calls for user permissions page are made

    Scenario: Watch list page API calls are loading as expected
        When I navigate to the manage watchlist page
        Then I verify that all the relevant API calls for manage watchlist page are made