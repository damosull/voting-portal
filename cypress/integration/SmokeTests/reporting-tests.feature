Feature: Reporting related smoke tests

    Scenario: Ballot status report meeting detail page
        Given I login as Calpers user
        When I navigate to the Workflow page
        And I remove all existing selected criteria
        And I add "Decision Status" status and "Recommendations Pending" critera
        And I select the first available meeting
        And I export the ballot status report
        Then A toast message appears
        And I click on the notification dropdown
        Then Ballot Status Report is queued
        Then I download the PDF and verify it
