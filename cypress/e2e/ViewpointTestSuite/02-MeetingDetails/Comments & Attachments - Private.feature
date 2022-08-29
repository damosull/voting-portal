Feature: Meeting Page Comments & Attachments - Private
#Test Suite - https://dev.azure.com/glasslewis/Development/_testPlans/execute?planId=9215&suiteId=9257

  #Test Case - https://dev.azure.com/glasslewis/Development/_workitems/edit/28568
  @28568
  Scenario: Verify user can add/edit/delete comments with attachments on the Meeting page with privacy set to Private
    Given I am logged in as the "AUTOMATIONEXTERNAL" User
    And I navigate to the workflow page
    Then I can view the workflow page
    When I select a random meeting
    Then I verify that all the relevant API calls for meeting details page are made
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
    And I verify the cancel when trying to delete functionality for comments
    When I delete the existing comment
    Then A toast message appears for "COMMENT_DELETED"
    And I should logout from the application
    When I am logged in as the "CALPERS" User
    And I navigate to the meeting page from the previous scenario
    Then I can view the Meeting Details page
    And I cannot see an existing comment on the meeting
    And I should logout from the application
