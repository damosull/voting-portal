Feature: Meeting Page Comments & Attachments - Share With
  #Test Suite - https://dev.azure.com/glasslewis/Development/_testPlans/execute?planId=9215&suiteId=9830

  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/28571
  @28571
  Scenario: Verify user can post a Comment AND a Comment with Attachments to Everyone
    Given I am logged in as the "AUTOMATIONEXTERNAL" user
    And I navigate to the workflow page
    Then I can view the workflow page
    When I select a random meeting
    Then I can view the Meeting Details page
    And I remove all existing comments
    And I save the meeting url
    Then I should be able to view the default placeholder, shared with dropdown and attachment button in comments section
    When I submit the comment
    Then A toast message appears for "COMMENT_SUBMIT_WITHOUT_DATA"
    When I add a comment with 4001 characters
    And I submit the comment
    Then A toast message appears for "COMMENT_TOO_LONG"
    When I add a comment with 4000 characters
    And I submit the comment
    Then A toast message appears for "COMMENT_SAVED"
    When I edit the comment
    And I add an attachment to the comment and rename the file with a string of 270 characters
    And I save the changes to the comment
    Then A toast message appears for "COMMENT_WITH_ATTACHMENT_SAVED"
    And I should logout from the application
    When I am logged in as the "RUSSELL" user
    And I navigate to the Meeting Details page for the saved meeting ID
    And I verify that all the relevant API calls for meeting details page are made for "external" user
    Then I should see "0" comments on the UI
    And I should logout from the application
    When I am logged in as the "CALPERS" user
    And I navigate to the Meeting Details page for the saved meeting ID
    And I verify that all the relevant API calls for meeting details page are made for "external" user
    Then I should see "1" comments on the UI
    And I remove all existing comments
    And I should logout from the application


  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/28573
  @28573
  Scenario: Verify only the Shared With user can view the posted comment with attachment in the meeting page when shared to individual user
    Given I am logged in as the "AUTOMATIONEXTERNAL" user
    When I navigate to the workflow page
    Then I can view the workflow page
    When I select a random meeting
    Then I can view the Meeting Details page
    And I save the meeting url
    And I remove all existing comments
    When I attach a file to the comment
    And I add a comment by mentioning user "CalpersAutomation External Admin"
    And I amend the shared with field to "CalpersAutomation External Admin"
    And I submit the comment
    Then A toast message appears for "COMMENT_WITH_ATTACHMENT_SAVED"
    And I should logout from the application
    When I login via the UI with the user "CALPERS_SAGAR"
    Then I can view the workflow page
    When I navigate to the Meeting Details page for the saved meeting ID
    And I verify that all the relevant API calls for meeting details page are made for "external" user
    Then I should see "0" comments on the UI
    And I should logout from the application
    When I am logged in as the "CALPERS" user
    And I navigate to the Meeting Details page for the saved meeting ID
    And I verify that all the relevant API calls for meeting details page are made for "external" user
    Then I should see "1" comments on the UI
    And The notification dropdown "should" contain a notification mentioning "You were mentioned by"
    And I remove all existing comments
    And I should logout from the application


  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/28574
  @28574
  Scenario: Verify users added in the "Shared With" list, but not @mentioned in the comment textbox, will not trigger the @notification
    Given I am logged in as the "AUTOMATIONEXTERNAL" user
    When I navigate to the workflow page
    Then I can view the workflow page
    When I select a random meeting
    Then I can view the Meeting Details page
    And I save the meeting url
    And I remove all existing comments
    When I attach a file to the comment
    And I add a comment by mentioning user "CalpersAutomation External Admin"
    And I amend the shared with field to "CalpersAutomation External Admin"
    And I add the user "CalPERS | ExtAdmin Sagar Maheshwari" to shared with field
    And I submit the comment
    Then A toast message appears for "COMMENT_WITH_ATTACHMENT_SAVED"
    And I should logout from the application
    When I login via the UI with the user "CALPERS_SAGAR"
    Then I can view the workflow page
    When I navigate to the Meeting Details page for the saved meeting ID
    And I verify that all the relevant API calls for meeting details page are made for "external" user
    Then I should see "1" comments on the UI
    And The notification dropdown "should not" contain a notification mentioning "You were mentioned by"
    And I should logout from the application
    When I am logged in as the "CALPERS" user
    And I navigate to the Meeting Details page for the saved meeting ID
    And I verify that all the relevant API calls for meeting details page are made for "external" user
    Then I should see "1" comments on the UI
    And The notification dropdown "should" contain a notification mentioning "You were mentioned by"
    And I remove all existing comments
    And I should logout from the application


  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/28577
  @28577
  Scenario: Verify External Admin User can 'Delete' comments/Comments with attachments shared with everyone in the Meeting Page
    Given I am logged in as the "AUTOMATIONEXTERNAL" user
    When I navigate to the workflow page
    Then I can view the workflow page
    When I select a random meeting
    Then I can view the Meeting Details page
    And I save the meeting url
    And I remove all existing comments
    When I add a comment and submit
    Then A toast message appears for "COMMENT_SAVED"
    And I should logout from the application
    When I login via the UI with the user "CALPERS_SAGAR"
    Then I can view the workflow page
    When I navigate to the Meeting Details page for the saved meeting ID
    And I verify that all the relevant API calls for meeting details page are made for "external" user
    Then I should see "1" comments on the UI
    When I attach a file to the comment
    And I add a comment and submit
    Then A toast message appears for "COMMENT_WITH_ATTACHMENT_SAVED"
    When I delete the existing comment
    Then A toast message appears for "COMMENT_DELETED"
    And I verify the cancel functionality when trying to delete a comment
    When I delete the existing comment
    Then A toast message appears for "COMMENT_DELETED"
    And I should see "0" comments on the UI
    And I should logout from the application
    When I am logged in as the "CALPERS" user
    And I navigate to the Meeting Details page for the saved meeting ID
    And I verify that all the relevant API calls for meeting details page are made for "external" user
    Then I should see "0" comments on the UI
    And I should logout from the application


  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/4400
  @4400
  Scenario: Verify External Admin User can 'Delete' other users /Comments with attachments & Mentioned user receives no notification
    Given I am logged in as the "AUTOMATIONEXTERNAL" user
    When I navigate to the workflow page
    Then I can view the workflow page
    When I select a random meeting
    Then I can view the Meeting Details page
    And I save the meeting url
    And I remove all existing comments
    When I attach a file to the comment
    And I add a comment by mentioning user "CalpersAutomation External Admin"
    And I submit the comment
    Then A toast message appears for "COMMENT_WITH_ATTACHMENT_SAVED"
    And I should logout from the application
    When I am logged in as the "CALPERS" user
    When I navigate to the Meeting Details page for the saved meeting ID
    And I verify that all the relevant API calls for meeting details page are made for "external" user
    Then I should see "1" comments on the UI
    And The notification dropdown "should" contain a notification mentioning "You were mentioned by"
    When I delete the existing comment
    Then A toast message appears for "COMMENT_DELETED"
    And I should see "0" comments on the UI
    And The notification dropdown "should not" contain a notification mentioning "You were mentioned by"
    And I should logout from the application


  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/28570
  @28570
  Scenario: Verify External Admin user can see "View All" hyperlink in the comment section, when the meeting has more than 10 comments in the Meeting Details page
    Given I am logged in as the "AUTOMATIONEXTERNAL" user
    When I navigate to the workflow page
    Then I can view the workflow page
    When I select a random meeting
    Then I can view the Meeting Details page
    And I remove all existing comments
    When I add a random comment 11 times
    Then I should be "able" to see "View All button" on the UI
    And I should see "10" comments on the UI
    When I click on the View All button
    Then I should see "11" comments on the UI
    And I should logout from the application
