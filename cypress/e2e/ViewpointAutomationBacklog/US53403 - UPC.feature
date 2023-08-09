Feature: Universal Proxy Card
  #Test Suite - https://dev.azure.com/glasslewis/Development/_testPlans/define?planId=48536&suiteId=48537

  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/53598
  @53598
  Scenario: Domestic spin control errors
    Given I am logged in as the "AUTOMATIONINTERNAL" user
    When I navigate to a domestic spin control meeting
    Then I can view the Meeting Details page
    And I click on the Change Vote or Rationale button if it exists
    When I quick vote "For" on the meeting
    Then A toast message appears for "DOMESTIC_SPIN_EXTRA_FOR_VOTES"
    When I click on the Vote button
    Then I should be "able" to see "Remove the extra 'For' votes to be able to vote." on the UI
    And I should logout from the application

  #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/53601
  @53601
  Scenario: Domestic spin control with a single group - labels and vote process
    Given I am logged in as the "AUTOMATIONINTERNAL" user
    When I navigate to a domestic spin control meeting
    Then I can view the Meeting Details page
    And I should be "able" to see "Limited 'For' votes for proposals" on the UI
    And I should be "able" to see "votes remaining" on the UI
    And I should logout from the application
