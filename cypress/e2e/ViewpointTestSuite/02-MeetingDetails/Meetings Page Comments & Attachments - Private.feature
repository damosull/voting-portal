Feature: Meeting Page Comments & Attachments - Private
#Test Suite - https://dev.azure.com/glasslewis/Development/_testPlans/execute?planId=9215&suiteId=9257

  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/28568
  @28568
  Scenario: Verify user can add/edit/delete comments with attachments on the Meeting page with privacy set to Private
    Given I am logged in as the "AUTOMATIONEXTERNAL" User
    And I navigate to the workflow page
    Then I can view the workflow page
    When I select a random meeting
    Then I can view the Meeting Details page
    And I save the meeting url
    And I remove all existing comments
    When I set the privacy dropdown to "Private"
    Then the search text for comments section should be disabled
    When I attach a file to the comment
    And I add a comment and submit
    Then A toast message appears for "COMMENT_WITH_ATTACHMENT_SAVED"
    When I edit the comment
    And I amend the name of the attachment
    And I save the changes to the comment
    Then A toast message appears for "COMMENT_WITH_ATTACHMENT_UPDATED"
    When I edit the comment
    And I amend the contents of the comment
    And I save the changes to the comment
    Then A toast message appears for "COMMENT_UPDATED"
    When I edit the comment
    And I delete the attachment from the comment
    And I save the changes to the comment
    Then A toast message appears for "COMMENT_WITH_ATTACHMENT_DELETED"
    And I verify the cancel functionality when trying to delete a comment
    When I delete the existing comment
    Then A toast message appears for "COMMENT_DELETED"
    And I should logout from the application
    When I am logged in as the "CALPERS" User
    And I navigate to the Meeting Details page for the saved meeting ID
    Then I can view the Meeting Details page
    And I cannot see an existing comment on the meeting
    And I should logout from the application


  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/28569
  @28569
  Scenario: Verify when a user changes the privacy settings of a Comment in a Meeting Details page from Private to Shared with, @mentioned user receives a notification
    Given I am logged in as the "AUTOMATIONEXTERNAL" User
    When I navigate to the workflow page
    Then I can view the workflow page
    When I select a random meeting
    Then I can view the Meeting Details page
    And I save the meeting url
    And I remove all existing comments
    When I set the privacy dropdown to "Private"
    And I attach a file to the comment
    And I add a comment by mentioning user "CalpersAutomation External Admin"
    And I submit the comment
    Then A toast message appears for "COMMENT_WITH_ATTACHMENT_SAVED"
    And I should logout from the application
    When I am logged in as the "CALPERS" User
    And I navigate to the Meeting Details page for the saved meeting ID
    And I verify that all the relevant API calls for meeting details page are made
    Then I should see "0" comments on the UI
    And The notification dropdown "should not" contain a notification mentioning "You were mentioned by"
    And I should logout from the application
    When I am logged in as the "AUTOMATIONEXTERNAL" User
    And I navigate to the Meeting Details page for the saved meeting ID
    Then I verify that all the relevant API calls for meeting details page are made
    When I edit the comment
    And I amend the privacy dropdown to "Shared With"
    And I amend the shared with field to "nothing"
    And I save the changes to the comment
    Then A toast message appears for "COMMENT_SELECT_ATLEAST_ONE_USER"
    When I amend the shared with field to "Everyone"
    And I save the changes to the comment
    Then A toast message appears for "COMMENT_UPDATED"
    And I should logout from the application
    When I am logged in as the "CALPERS" User
    And I navigate to the Meeting Details page for the saved meeting ID
    And I verify that all the relevant API calls for meeting details page are made
    Then I should see "1" comments on the UI
    And The notification dropdown "should" contain a notification mentioning "You were mentioned by"
    And I remove all existing comments
    And I should logout from the application
