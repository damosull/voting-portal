@user
Feature: User related smoke tests
  #Test Suite - https://dev.azure.com/glasslewis/Development/_testPlans/define?planId=56788&suiteId=56795

  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/56839
  @56839
  Scenario: Verify internal user is able to login successfully with a valid username and password
    Given I am on the login page of Viewpoint
    When I login via the UI with the user "AUTOMATIONINTERNAL"
    Then I can view the workflow page
    And I should logout from the application


  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/39053
  @39053
  Scenario: Verify internal user is able to create a new Calpers external user
    Given I am logged in as the "AUTOMATIONINTERNAL" User
    When I navigate to the users page
    And I fill the required details for a new user and submit
    Then the new user should be created successfully
    And I should logout from the application


  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/56840
  @56840
  Scenario: Verify user is able to create a watchlist and assign it
    Given I am logged in as the "CALPERS" User
    And I delete the created test watchlist from database
    When I navigate to the manage watchlist page
    And I create a new watchlist
    And I submit the watchlist
    Then I should be able to search for the new watchlist
    And I should be able to assign the watchlist successfully
    And I should logout from the application


  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/61733
  #NOTE: SSO is disabled on Aqua. However, we have handled this in the step definition
  @61733 @sso
  Scenario: Verify SSO users are redirected to their relevant organisation page
    Given I am on the SSO Login page
    When I SSO login with the email address "donna.chitman@bofa.com"
    Then I should be redirected to the Bank Of America login page