Feature: Meeting smoke tests


  Scenario: Verify that the votes against Glass Lewis are captured in filter criteria
    Given I am logged in as the "CALPERS" User
    And I remove all existing selected criteria
    When I filter with the criteria of vote against Glass Lewis
    Then the filtered results should display the data only for vote against Glass Lewis
    And I should logout from the application

  Scenario: Verify that the votes against Management are captured in filter criteria
    Given I am logged in as the "CALPERS" User
    And I remove all existing selected criteria
    When I filter with the criteria of vote against Management
    Then the filtered results should display the data only for vote against Management
    And I should logout from the application

  # #WARNING: This test could be flaky as its dependent on the data in GLP database
  # Scenario: Verify user is able to vote against each of the policy recommendations
  #   Given I am logged in as the "CALPERS" User
  #   And I remove all existing selected criteria
  #   And I have added the criteria for "Decision Status" with status "Recommendations Available"
  #   When I select the first available meeting
  #   Then the meetings page should be loaded successfully
  #   And I should get a success message for votes submitted successfully for each vote against the policy recommendations
  #   And I should logout from the application

  # Scenario: Verify user is able to do a quick vote for Glass Lewis recommendations
  #   Given I am logged in as the "CALPERS" User
  #   And I remove all existing selected criteria
  #   And I have added the criteria for "Decision Status" with status "Recommendations Available"
  #   When I select the first available meeting
  #   Then the meetings page should be loaded successfully
  #   When I choose to perform a quick vote for Glass Lewis recommendations and click Vote Now
  #   Then I should get a button stating "Change Vote or Rationale"
  #   And I should logout from the application

  # Scenario: Verify user is able to vote on a US Recommendation Pending meeting
  #   Given I am logged in as the "CALPERS" User
  #   And I remove all existing selected criteria
  #   When I navigate to the meeting details page for the meeting "CPRP4"
  #   Then I can view the Meeting Details page
  #   When I click on the Change Vote or Rationale button
  #   And I "vote for the items" under the meeting "CPRP4"
  #   Then I should get a button stating "Change Vote or Rationale"
  #   And I should logout from the application

  # Scenario: Verify user is able to vote on a Global Recommendation Pending meeting
  #   Given I am logged in as the "CALPERS" User
  #   And I remove all existing selected criteria
  #   When I navigate to the meeting details page for the meeting "CPRP2"
  #   Then I can view the Meeting Details page
  #   When I click on the Change Vote or Rationale button
  #   And I "vote for the items" under the meeting "CPRP2"
  #   Then I should get a button stating "Change Vote or Rationale"
  #   And I should logout from the application

  # Scenario: Verify user is able to use the Instruct functionality on Recommendation Pending meeting
  #   Given I am logged in as the "CALPERS" User
  #   And I remove all existing selected criteria
  #   When I navigate to the meeting details page for the meeting "CPRP1"
  #   Then I can view the Meeting Details page
  #   When I click on the Change Vote or Rationale button
  #   Then I should be able to click on the Instruct button
  #   And I should logout from the application

  Scenario: Verify user is able to quickvote on a Global Recommendation Pending meeting
    Given I am logged in as the "CALPERS" User
    And I remove all existing selected criteria
    When I navigate to the meeting details page for the meeting "CPRP3"
    Then I can view the Meeting Details page
    When I click on the Change Vote or Rationale button
    And I "vote for the items" under the meeting "CPRP3"
    Then I should get a button stating "Change Vote or Rationale"
    And I should logout from the application

  # Scenario: Verify user is able to take no action on a Recommendation Pending meeting
  #   Given I am logged in as the "CALPERS" User
  #   And I remove all existing selected criteria
  #   When I navigate to the meeting details page for the meeting "CPRP5"
  #   Then I can view the Meeting Details page
  #   When I click on the Change Vote or Rationale button
  #   And I "take no action" under the meeting "CPRP5"
  #   Then I should get a button stating "Change Vote or Rationale"
  #   And I should logout from the application

  Scenario: Verify user is able to share a meeting with another user
    Given I am logged in as the "CALPERS" User
    And I remove all existing selected criteria
    When I navigate to the meeting details page for the meeting "CPRP6"
    Then I can view the Meeting Details page
    When I click on the Change Vote or Rationale button
    And I click on the share meeting option
    And I provide the details like the username to share with and submitted
    Then I should see a request saved message
    And I verify that the request was saved in the database
    And I should logout from the application

  # #Test scenario 37790 - https://dev.azure.com/glasslewis/Development/_workitems/edit/37790
  # #Test scenario 40741 - https://dev.azure.com/glasslewis/Development/_workitems/edit/40741
  # Scenario: Verify user is able to process Vote, Take No Action and Review Required actions
  #   Given I am logged in as the "CALPERS" User
  #   And I remove all existing selected criteria
  #   When I change the meeting date filter to choose next 10 days
  #   And I add the filter criteria
  #   Then the filtered results should be displayed
  #   And I save the filter
  #   When I select the first available meeting
  #   And I vote for the items on the meeting
  #   And I proceed with the override of the votes
  #   Then I see that Assert Vote tally changes to TNA
  #   When I click on the Change Vote or Rationale button and then on Instruct
  #   And I proceed with the override of the votes
  #   Then the vote tally should be updated
  #   And the activity should match against the ballot activity log
  #   And I should logout from the application