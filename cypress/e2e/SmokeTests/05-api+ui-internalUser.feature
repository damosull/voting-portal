@api @api-internal @ui @ui-internal
Feature: Checking API calls and UI Page load with Internal user
    #Test Suite - https://dev.azure.com/glasslewis/Development/_testPlans/define?planId=56788&suiteId=56790

    Background:
        Given I am logged in as the "AUTOMATIONINTERNAL" user

    @56809
    Scenario: Workflow page API's and UI page are loading successfully
        When I navigate to the workflow page
        Then I verify that all the relevant API calls for workflow page are made for "internal" user
        And I can view the workflow page

    @56810
    Scenario: Dashboard page API's and UI page are loading successfully
        When I navigate to the dashboard page
        Then I verify that all the relevant API calls for dashboard page are made
        And I verify a couple of widgets have loaded

    @56811
    Scenario: Reporting page API's and UI page are loading successfully
        When I navigate to the Reporting page
        Then I verify that all the relevant API calls for reporting page are made
        And I verify that the reporting page has loaded successfully

    @56812
    Scenario: Password change page API's and UI page are loading successfully
        When I navigate to the change password page
        Then I verify that all the relevant API calls for change password page are made
        And I verify the fields to change password have loaded

    @56813
    Scenario: User Profile page API's and UI page are loading successfully
        When I navigate to the user profile page
        Then I verify that all the relevant API calls for user profile page are made
        And I verify that the user profile page has loaded successfully

    @56814
    Scenario: Customer user profile page API's and UI page are loading successfully
        When I navigate to the customers page
        Then I verify that all the relevant API calls for customer user page are made
        And I verify that the customers page has loaded successfully

    @56815
    Scenario: Users page API's and UI page are loading successfully
        When I navigate to the users page
        Then I verify that all the relevant API calls for users page are made
        And I verify that the users page for an internal user has loaded successfully

    @56816
    Scenario: Internal Users Profiles page API's and UI page are loading successfully
        When I navigate to the users profiles page
        Then I verify that all the relevant API calls for internal users profile page are made
        And I verify that the users profiles page has loaded successfully

    @56817
    Scenario: Custodians page API's and UI page are loading successfully
        When I navigate to the custodians page
        Then I verify that all the relevant API calls for custodians page are made
        And I verify that the Custodians page for an internal user has loaded successfully

    @56818
    Scenario: System Permissions page API's and UI page are loading successfully
        When I navigate to the system permissions page
        Then I verify that all the relevant API calls for system permissions page are made
        And I verify that the "System Permissions" page for an internal user has loaded successfully
        When I expand the "Administration - System Permissions" section
        Then the "Administration - System Permissions" section is expanded successfully

    @56819
    Scenario: User Permissions page API's and UI page are loading successfully
        When I navigate to the User Permissions page
        Then I verify that all the relevant API calls for user permissions page are made
        When I type "RobecoAutomation External Admin" into the user name input
        Then the search results for "RobecoAutomation External Admin" are loaded successfully
        When I choose the first element from the dropdown
        And I verify that the "User Permissions" page for an internal user has loaded successfully
        When I expand the "Administration - System Permissions" section
        Then the "Administration - System Permissions" section is expanded successfully

    @56820
    Scenario: Watch list page API's and UI page are loading successfully
        When I navigate to the manage watchlist page
        Then I verify that all the relevant API calls for manage watchlist page are made
        And I verify that the manage watchlist page has loaded successfully

    @59808
    Scenario: MeetingDetails page API's and UI page are loading successfully
        When I navigate to the URL "/MeetingDetails/Index/196/1212349"
        Then I verify that all the relevant API calls for meeting details page are made for "internal" user
        And I verify all the meeting sections have loaded

    @59814
    Scenario: Manage filters page API's and UI page are loading successfully
        When I navigate to the Manage Filters page
        Then I verify that all the relevant API calls for manage filters page are made
        And I verify that the manage filters page for an "internal" user has loaded successfully

    @59800
    Scenario: Users profiles / CustomerID page API's and UI page are loading successfully
        When I navigate to the URL "/Users/UsersProfiles/?CustomerID=690"
        Then I verify that all the relevant API calls for users profiles page are made for "internal" user
        And I verify that the users profiles page has loaded successfully

    @59809
    Scenario: Customer details page API's and UI page are loading successfully
        When I navigate to the URL "/CustomerDetails/?CustomerID=690"
        Then I verify that all the relevant API calls for customer details page are made for "internal" user
        And I verify that the customer details page has loaded successfully for "internal" user

    @59813
    Scenario: Vote execution profile page API's and UI page are loading successfully
        When I navigate to the URL "/Accounts/VEP/?CustomerID=690"
        Then I verify that all the relevant API calls for vote execution profile page are made
        And I verify that the vote execution profile page has loaded successfully

    @59810
    Scenario: Customer profile / CustomFields page API's and UI page are loading successfully
        When I navigate to the URL "/CustomerDetails/CustomFields/?CustomerID=690"
        Then I verify that all the relevant API calls for custom fields page are made
        And I verify that the custom fields page has loaded successfully

    @59811
    Scenario: Customer profile / Rationale library page API's and UI page are loading successfully
        When I navigate to the URL "/CustomerDetails/Rationale/?CustomerID=690"
        Then I verify that all the relevant API calls for rationale page are made
        And I verify that the rationale page has loaded successfully

    @59812
    Scenario: Customer admin group page API's and UI page are loading successfully
        When I navigate to the URL "/CustomerAdminGroups/Index/?CustomerID=690"
        Then I verify that all the relevant API calls for customer admin group page are made
        And I verify that the customer admin group page has loaded successfully

    @59816
    Scenario: Site configuration page API's and UI page are loading as expected
        When I navigate to the URL "/WebDisclosure/SiteConfiguration/?CustomerID=690"
        Then I verify that all the relevant API calls for site configuration page are made
        And I verify that the site configuration page has loaded successfully

    @59817
    Scenario: Accounts page API's and UI page are loading as expected
        When I navigate to the URL "/Accounts/Index/?CustomerID=690"
        Then I verify that all the relevant API calls for accounts page are made
        And I verify that the accounts page has loaded successfully