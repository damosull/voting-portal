@meeting @meeting-details
Feature: Meetings related smoke tests

  Scenario: Verify that the votes against Glass Lewis are captured in filter criteria
    Given I am logged in as the "RUSSELL" User
    And I navigate to the workflow page
    Then I can view the workflow page
    And I remove all existing selected criteria
    When I have added the criteria for "Policy Recs With/Against Glass Lewis" and selecting the radio button for "One Against"
    And I select a random meeting
    Then I can view the Meeting Details page
    Then the filtered results should display the data only for vote against Glass Lewis
    And I should logout from the application

  Scenario: Verify that the votes against Management are captured in filter criteria
    Given I am logged in as the "WELLINGTON" User
    And I navigate to the workflow page
    Then I can view the workflow page
    And I remove all existing selected criteria
    When I have added the criteria for "Policy Recs With/Against Management" and selecting the radio button for "One Against"
    And I select a random meeting
    Then I can view the Meeting Details page
    Then the filtered results should display the data only for vote against Management
    And I should logout from the application

  Scenario: Verify user is able to filter meetings with recommendations available
    Given I am logged in as the "RUSSELL" User
    And I navigate to the workflow page
    Then I can view the workflow page
    And I remove all existing selected criteria
    And I have added the criteria for "Decision Status" with status "Recommendations Available"
    When I select a random meeting
    And I can see the Vote, Take No Action and Instruct buttons
    And I should logout from the application

  Scenario: Verify user is able to do a quick vote
    Given I am logged in as the "CALPERS" User
    And I navigate to the workflow page
    Then I can view the workflow page
    And I remove all existing selected criteria
    And I have added the criteria for "Decision Status" with status "Recommendations Pending"
    When I select a random meeting
    Then I can view the Meeting Details page
    And I can see the Vote, Take No Action and Instruct buttons
    And I quick vote "For" on the meeting
    And I click on the Vote button
    Then I can see a Vote success message
    Then I should be "able" to see the "Change Vote or Rationale" on the UI
    And I should logout from the application

  Scenario: Verify user is able to vote on a US Recommendation Pending meeting
    Given I am logged in as the "CALPERS" User
    When I navigate to the meeting details page for the meeting "CPRP4"
    Then I can view the Meeting Details page
    When I click on the Change Vote or Rationale button
    And I quick vote "For" on the meeting
    And I click on the Vote button
    And I handle the override pop-up if it exists
    Then I can see a Vote success message
    Then I should be "able" to see the "Change Vote or Rationale" on the UI
    And I should logout from the application

  Scenario: Verify user is able to vote on a Global Recommendation Pending meeting
    Given I am logged in as the "CALPERS" User
    When I navigate to the meeting details page for the meeting "CPRP2"
    Then I can view the Meeting Details page
    When I click on the Change Vote or Rationale button
    And I quick vote "For" on the meeting
    And I click on the Vote button
    And I handle the override pop-up if it exists
    Then I can see a Vote success message
    Then I should be "able" to see the "Change Vote or Rationale" on the UI
    And I should logout from the application

  Scenario: Verify user is able to use the Instruct functionality on Recommendation Pending meeting
    Given I am logged in as the "CALPERS" User
    When I navigate to the meeting details page for the meeting "CPRP1"
    Then I can view the Meeting Details page
    When I click on the Change Vote or Rationale button if it exists
    Then I should be able to use the Instruct functionality on the meeting
    And I should logout from the application

  Scenario: Verify user is able to quickvote on a Global Recommendation Pending meeting
    Given I am logged in as the "CALPERS" User
    When I navigate to the meeting details page for the meeting "CPRP3"
    Then I can view the Meeting Details page
    When I click on the Change Vote or Rationale button
    And I quick vote "For" on the meeting
    And I click on the Vote button
    And I handle the override pop-up if it exists
    Then I can see a Vote success message
    Then I should be "able" to see the "Change Vote or Rationale" on the UI
    And I should logout from the application

  Scenario: Verify user is able to take no action on a Recommendation Pending meeting
    Given I am logged in as the "CALPERS" User
    When I navigate to the meeting details page for the meeting "CPRP5"
    Then I can view the Meeting Details page
    When I click on the Change Vote or Rationale button
    And I should be able to use the Take No Action functionality on the meeting
    And I should be "able" to see the "Change Vote or Rationale" on the UI
    And I should logout from the application

  Scenario: Verify user is able to share a meeting with another user
    Given I am logged in as the "CALPERS" User
    When I navigate to the meeting details page for the meeting "CPRP6"
    Then I can view the Meeting Details page
    When I click on the Change Vote or Rationale button
    And I click on the share meeting option
    And I provide the details like the username to share with and submitted
    Then A toast message appears for "SHARE_MEETING_REQUEST_SAVED"
    And I verify that the request was saved in the database
    And I should logout from the application

  Scenario: Verify external user is able to add meeting note and post private comment
    Given I am logged in as the "CHARLESSCHWAB" User
    And I navigate to the workflow page
    Then I can view the workflow page
    And I remove all existing selected criteria
    And I have added the criteria for "Decision Status" with status "Recommendations Pending"
    When I select a random meeting
    Then I can view the Meeting Details page
    And I am able to add meeting note and post private comment
    And I should logout from the application

  Scenario: Verify external user is able to add comment to each rationale, save it and verify the toast message
    Given I am logged in as the "ROBECO" User
    And I navigate to the workflow page
    Then I can view the workflow page
    And I remove all existing selected criteria
    And I have added the criteria for "Decision Status" with status "Recommendations Pending"
    When I select a random meeting
    Then I am able to iterate through rationales, add text entry, save and verify toast message for each entry
    And I should logout from the application
