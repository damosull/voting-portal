Feature: Checking API calls with Internal user

    Background:
        Given I login as Internal User

    Scenario: Workflow page API calls are loading as expected
        When I arrive on the Workflow page
        Then I check the API calls status on the Workflow page

    Scenario: Dashboard page API calls are loading as expected
        When I arrive on the Dashboard page
        Then I check the API calls status on the Dashboard page

    Scenario: Reporting page API calls are loading as expected
        When I arrive on the Reporting page
        Then I check the API calls status on the Reporting page

    Scenario: Password change page API calls are loading as expected
        When I arrive on the Password change page
        Then I check the API calls status on the Password change page

    Scenario: User Profile page API calls are loading as expected
        When I arrive on the User Profile page
        Then I check the API calls status on the User Profile page

    Scenario: Customer user profile page API calls are loading as expected
        When I arrive on the Customer user page
        Then I check the API calls status on the Customer user page

    Scenario: Users page API calls are loading as expected
        When I arrive on the Users page
        Then I check the API calls status on the Users page

    Scenario: Internal Users Profiles page API calls are loading as expected
        When I arrive on the Internal Users Profiles page
        Then I check the API calls status on the Internal Users Profiles page

    Scenario: Custodians page API calls are loading as expected
        When I arrive on the Custodians page
        Then I check the API calls status on the Custodians page

    Scenario: System Permissions page API calls are loading as expected
        When I arrive on the System Permissions page
        Then I check the API calls status on the System Permissions page

    Scenario: User Permissions page API calls are loading as expected
        When I arrive on the User Permissions page
        Then I check the API calls status on the User Permissions page

    Scenario: Watch list page API calls are loading as expected
        When I arrive on the Watch list page
        Then I check the API calls status on the Watch list page