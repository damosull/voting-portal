Feature: Reporting related smoke tests

    # Test scenario: 37962 https://dev.azure.com/glasslewis/Development/_workitems/edit/37962
    Scenario: Generate ballot vote data report, download and verify file
        Given I am logged in as the "CALPERS" User
        When I navigate to the Reporting page
        And I click on the "Ballot Vote Data" filter
        And I set the meeting date to next date 2 and past date 2 days
        And I select "Ballot Voted Date" column
        And I save the configuration with the name of "configName_BallotVoteReport"
        And I click on the download the report button
        Then Download initiated toast message appears
        And I delete the given "configName_BallotVoteReport" configuration
        When I click on the notification dropdown
        And Report is ready to download message appears in the notifications with the name of "configName_BallotVoteReport"
        Then I verify the report headers with the name of "configName_BallotVoteReport"
        And I should logout from the application
