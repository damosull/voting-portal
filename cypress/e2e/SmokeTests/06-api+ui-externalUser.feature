@api @api-external @ui @ui-external
Feature: Checking API calls and UI Page load with External user
    #Test Suite - https://dev.azure.com/glasslewis/Development/_testPlans/define?planId=56788&suiteId=56790

    Background:
        Given I am logged in as the "CALPERS" user

    @56797
    Scenario: Workflow page API's and UI page are loading successfully
        When I navigate to the workflow page
        Then I verify that all the relevant API calls for workflow page are made for "external" user
        And I can view the workflow page

    @56798
    Scenario: Dashboard page API's and UI page are loading successfully
        When I navigate to the dashboard page
        Then I verify that all the relevant API calls for dashboard page are made
        And I verify a couple of widgets have loaded

    @56799
    Scenario: Reporting page API's and UI page are loading successfully
        When I navigate to the Reporting page
        Then I verify that all the relevant API calls for reporting page are made
        And I verify that the reporting page has loaded successfully

    @56800
    Scenario: MeetingDetails page API's and UI page are loading successfully
        When I navigate to the meeting details page for the meeting "1213326"
        Then I verify that all the relevant API calls for meeting details page are made for "external" user
        And I verify all the meeting sections have loaded

    @56801
    Scenario: Password change page API's and UI page are loading successfully
        When I navigate to the change password page
        Then I verify that all the relevant API calls for change password page are made
        And I verify the fields to change password have loaded

    @56802
    Scenario: User Profile page API's and UI page are loading successfully
        When I navigate to the user profile page
        Then I verify that all the relevant API calls for user profile page are made
        And I verify that the user profile page has loaded successfully

    @56803
    Scenario: Customer profile / Accounts page API's and UI page are loading successfully
        When I navigate to the accounts page
        Then I verify that all the relevant API calls for accounts page are made
        And I verify that the accounts page has loaded successfully

    @56804
    Scenario: Customer profile / CustomFields page API's and UI page are loading successfully
        When I navigate to the custom fields page
        Then I verify that all the relevant API calls for custom fields page are made
        And I verify that the custom fields page has loaded successfully

    @56805
    Scenario: Customer profile / Rationale library page API's and UI page are loading successfully
        When I navigate to the rationale page
        Then I verify that all the relevant API calls for rationale page are made
        And I verify that the rationale page has loaded successfully

    @56806
    Scenario: Customer details page API's and UI page are loading successfully
        When I navigate to the customer details page
        Then I verify that all the relevant API calls for customer details page are made for "external" user
        And I verify that the customer details page has loaded successfully for "external" user

    @56808
    Scenario: Watch list page API's and UI page are loading successfully
        When I navigate to the manage watchlist page
        Then I verify that all the relevant API calls for manage watchlist page are made
        And I verify that the manage watchlist page has loaded successfully

    @59829
    Scenario: Manage filters page API's and UI page are loading successfully
        When I navigate to the Manage Filters page
        Then I verify that all the relevant API calls for manage filters page are made
        And I verify that the manage filters page for an "external" user has loaded successfully

    @59830
    Scenario: Users Profiles page API's and UI page are loading successfully
        When I navigate to the users profiles page
        Then I verify that all the relevant API calls for users profiles page are made for "external" user
        And I verify that the users profiles page has loaded successfully
