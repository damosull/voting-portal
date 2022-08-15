Feature: Checking API calls with External user

    Background:
        Given I am logged in as the "CALPERS" User

    Scenario: Workflow page API calls are loading as expected
        When I navigate to the workflow page
        Then I verify that all the relevant API calls for workflow page are made for "external" user

    Scenario: Dashboard page API calls are loading as expected
        When I navigate to the dashboard page
        Then I verify that all the relevant API calls for dashboard page are made

    Scenario: Reporting page API calls are loading as expected
        When I navigate to the Reporting page
        Then I verify that all the relevant API calls for reporting page are made

    Scenario: MeetingDetails page API calls are loading as expected
        When I navigate to the workflow page
        And I select a random meeting
        Then I verify that all the relevant API calls for meeting details page are made

    Scenario: Password change page API calls are loading as expected
        When I navigate to the change password page
        Then I verify that all the relevant API calls for change password page are made

    Scenario: User Profile page API calls are loading as expected
        When I navigate to the user profile page
        Then I verify that all the relevant API calls for user profile page are made

    Scenario: Customer profile / Accounts page API calls are loading as expected
        When I navigate to the accounts page
        Then I verify that all the relevant API calls for accounts page are made

    Scenario: Customer profile / CustomFields page API calls are loading as expected
        When I navigate to the custom fields page
        Then I verify that all the relevant API calls for custom fields page are made

    Scenario: Customer profile / Rationale library page API calls are loading as expected
        When I navigate to the rationale page
        Then I verify that all the relevant API calls for rationale page are made

    Scenario: Customer details page API calls are loading as expected
        When I navigate to the customer details page
        Then I verify that all the relevant API calls for customer details page are made

    Scenario: Customer profile / UsersProfiles page API calls are loading as expected
        When I navigate to the user profile page
        Then I verify that all the relevant API calls for user profile page are made

    Scenario: Watch list page API calls are loading as expected
        When I navigate to the manage watchlist page
        Then I verify that all the relevant API calls for manage watchlist page are made