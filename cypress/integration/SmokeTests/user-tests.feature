Feature: User related smoke tests


  Scenario: Verify internal user is able to login successfully with a valid username and password
    Given I am on the login page
    When I provide my username and password and sign in
    Then I should be able to see the workflow page
    And I should logout from the application

  Scenario: Verify internal user is able to create a new external user
    Given I am logged in as the "AUTOMATIONINTERNAL" User
    And I cleanup the newly created user from the database to reuse the test script
    When I navigate to the users page
    And I fill the required details for a new user and submit
    Then the new user should be created successfully
    And I should logout from the application
    
  Scenario: Verify user is able to create a watchlist and assign it
    Given I am logged in as the "CALPERS" User
    And I delete the created test watchlist from database
    When I navigate to the watchlist page
    And I create a new watchlist
    And I submit the watchlist
    Then I should be able to search for the new watchlist
    And I should be able to assign the watchlist successfully
    And I should logout from the application

