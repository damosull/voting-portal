Feature: Checking API calls with External user

    Background:
        Given I login as External User

    Scenario: Workflow page API calls are loading as expected
        When I arrive on the Workflow page
        Then I check the API calls status on the Workflow page for external user

    Scenario: Dashboard page API calls are loading as expected
        When I arrive on the Dashboard page
        Then I check the API calls status on the Dashboard page for external user

    Scenario: Reporting page API calls are loading as expected
        When I arrive on the Reporting page
        Then I check the API calls status on the Reporting page for external user

    Scenario: MeetingDetails page API calls are loading as expected
        When I arrive on the MeetingDetails page
        Then I check the API calls status on the MeetingDetails page for external user

    Scenario: Password change page API calls are loading as expected
        When I arrive on the Password change page
        Then I check the API calls status on the Password change page for external user

    Scenario: User Profile page API calls are loading as expected
        When I arrive on the User Profile page
        Then I check the API calls status on the User Profile page for external user

    Scenario: Customer profile / Accounts page API calls are loading as expected
        When I arrive on the Customer profile / Accounts page
        Then I check the API calls status on the Customer profile / Accounts page for external user

    Scenario: Customer profile / CustomFields page API calls are loading as expected
        When I arrive on the Customer profile / CustomFields page
        Then I check the API calls status on the Customer profile / CustomFields page for external user

    Scenario: Customer profile / Rationale library page API calls are loading as expected
        When I arrive on the Customer profile / Rationale library page
        Then I check the API calls status on the Customer profile / Rationale library page for external user

    Scenario: Customer profile page API calls are loading as expected
        When I arrive on the Customer profile page
        Then I check the API calls status on the Customer profile page for external user

    Scenario: Customer profile / UsersProfiles page API calls are loading as expected
        When I arrive on the Customer profile / UsersProfiles page
        Then I check the API calls status on the Customer profile / UsersProfiles page for external user

    Scenario: Watch list page API calls are loading as expected
        When I arrive on the Watch list page
        Then I check the API calls status on the Watch list page for external user