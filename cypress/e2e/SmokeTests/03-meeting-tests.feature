@meeting @meeting-details
Feature: Meetings related smoke tests
  #Test Suite - https://dev.azure.com/glasslewis/Development/_testPlans/define?planId=56788&suiteId=56793

  @59875
  Scenario: Verify internal user to be able to search for a customer and navigate to a meeting
    Given I am logged in as the "AUTOMATIONINTERNAL" user
    When I navigate to the workflow page
    Then I can view the workflow page
    When I search for the customer ""
    Then the Customer Name field is blank
    And I cannot click on any of the meetings
    When I search for the customer "California Public Employee Retirement System"
    Then I can view the workflow page
    When I select a random meeting
    Then I can view the Meeting Details page
    And I should logout from the application


  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/56827
  @56827
  Scenario: Verify user is able to do a quick vote
    Given I am logged in as the "RUSSELL" user
    When I navigate to the workflow page
    Then I can view the workflow page
    When I select a random meeting
    Then I can view the Meeting Details page
    When I click on the Change Vote or Rationale button if it exists
    Then I can see the Vote, Take No Action and Instruct buttons
    When I quick vote "For" on the meeting
    And I click on the Vote button
    And I handle the override pop-up if it exists
    Then I can see a Vote success message
    And I should be "able" to see "Change Vote or Rationale" on the UI
    And I should logout from the application


  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/568235
  @56835
  Scenario: Verify external user is able to add comment to each rationale, save it and verify the toast message
    Given I am logged in as the "ROBECO" user
    When I navigate to the workflow page
    Then I can view the workflow page
    When I have added the criteria for "Decision Status" with status "Recommendations Pending"
    And I select a random meeting
    Then I can view the Meeting Details page
    And I am able to iterate through rationales, add text entry, save and verify toast message for each entry
    And I should logout from the application


  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/56828
  @56828
  Scenario: Verify user is able to vote on a US Recommendation Pending meeting
    Given I am logged in as the "CALPERS" user
    When I navigate to the meeting details page for the meeting "CPRP4"
    Then I can view the Meeting Details page
    When I click on the Change Vote or Rationale button if it exists
    And I quick vote "For" on the meeting
    And I click on the Vote button
    And I handle the override pop-up if it exists
    Then I can see a Vote success message
    Then I should be "able" to see "Change Vote or Rationale" on the UI
    And I should logout from the application


  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/56829
  @56829
  Scenario: Verify user is able to vote on a Global Recommendation Pending meeting
    Given I am logged in as the "CALPERS" user
    When I navigate to the meeting details page for the meeting "CPRP2"
    Then I can view the Meeting Details page
    When I click on the Change Vote or Rationale button if it exists
    And I quick vote "For" on the meeting
    And I click on the Vote button
    And I handle the override pop-up if it exists
    Then I can see a Vote success message
    Then I should be "able" to see "Change Vote or Rationale" on the UI
    And I should logout from the application


  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/56830
  @56830
  Scenario: Verify user is able to use the Instruct functionality on Recommendation Pending meeting
    Given I am logged in as the "NEUBERGER" user
    When I navigate to the workflow page
    Then I can view the workflow page
    When I have added the criteria for "Decision Status" with status "Recommendations Pending"
    And I select a random meeting
    Then I can view the Meeting Details page
    And I should be able to use the Instruct functionality on the meeting
    And I should logout from the application


  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/56831
  @56831
  Scenario: Verify user is able to quickvote on a Global Recommendation Pending meeting
    Given I am logged in as the "CALPERS" user
    When I navigate to the meeting details page for the meeting "CPRP3"
    Then I can view the Meeting Details page
    When I click on the Change Vote or Rationale button if it exists
    And I quick vote "For" on the meeting
    And I click on the Vote button
    And I handle the override pop-up if it exists
    Then I can see a Vote success message
    Then I should be "able" to see "Change Vote or Rationale" on the UI
    And I should logout from the application


  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/56832
  @56832
  Scenario: Verify user is able to take no action on a Recommendation Pending meeting
    Given I am logged in as the "CALPERS" user
    When I navigate to the workflow page
    Then I can view the workflow page
    When I have added the criteria for "Decision Status" with status "Recommendations Pending"
    And I select a random meeting
    Then I can view the Meeting Details page
    And I should be able to use the Take No Action functionality on the meeting
    And I should be "able" to see "Change Vote or Rationale" on the UI
    And I should logout from the application


  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/56824
  @56824
  Scenario: Verify that the votes against Glass Lewis are captured in filter criteria
    Given I am logged in as the "RUSSELL" user
    When I navigate to the workflow page
    Then I can view the workflow page
    When I have added the criteria for "Policy Recs With/Against Glass Lewis" and selecting the radio button for "One Against"
    And I select a random meeting
    Then I can view the Meeting Details page
    And the filtered results should display the data only for vote against Glass Lewis
    And I should logout from the application


  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/39049
  @39049
  Scenario: Verify that the votes against Management are captured in filter criteria
    Given I am logged in as the "RUSSELL" user
    When I navigate to the workflow page
    Then I can view the workflow page
    When I have added the criteria for "Policy Recs With/Against Management" and selecting the radio button for "One Against"
    And I select a random meeting
    Then I can view the Meeting Details page
    And the filtered results should display the data only for vote against Management
    And I should logout from the application


  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/56826
  @56826
  Scenario: Verify user is able to filter meetings with recommendations pending
    Given I am logged in as the "WELLINGTON" user
    When I navigate to the workflow page
    Then I can view the workflow page
    When I have added the criteria for "Decision Status" with status "Recommendations Pending"
    And I select a random meeting
    Then I can view the Meeting Details page
    And I can see the Vote, Take No Action and Instruct buttons
    And I should logout from the application


  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/56833
  @56833
  Scenario: Verify user is able to share a meeting with another user
    Given I am logged in as the "CALPERS" user
    When I navigate to the meeting details page for the meeting "CPRP6"
    Then I can view the Meeting Details page
    When I click on the Change Vote or Rationale button if it exists
    And I click on the share meeting option
    And I provide the details like the username to share with and submitted
    Then A toast message appears for "SHARE_MEETING_REQUEST_SAVED"
    And I verify that the request was saved in the database
    And I should logout from the application


  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/56834
  @56834
  Scenario: Verify external user is able to add meeting note and post private comment
    Given I am logged in as the "CHARLESSCHWAB" user
    When I navigate to the workflow page
    Then I can view the workflow page
    When I have added the criteria for "Decision Status" with status "Recommendations Pending"
    And I select a random meeting
    Then I can view the Meeting Details page
    And I am able to add meeting note and post private comment
    And I should logout from the application
