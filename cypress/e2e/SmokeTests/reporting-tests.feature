@reporting
Feature: Reporting related smoke tests

    #TC - https://dev.azure.com/glasslewis/Development/_workitems/edit/37962
    @37962
    Scenario: Generate ballot vote data report, download and verify file
        Given I am logged in as the "CHARLESSCHWAB" User
        When I navigate to the Reporting page
        And I click on the "Ballot Vote Data" filter
        And I set the meeting date to next date 2 and past date 2 days
        And I select "Ballot Voted Date" column
        And I "save" the report for "Ballot Vote Data"
        And I click on the download the report button
        Then the download initiated toast message appears
        And I "delete" the report for "Ballot Vote Data"
        When I click on the notification dropdown
        And I "verify ready for download of" the report for "Ballot Vote Data"
        And I verify the contents for "Ballot Vote Data" report
        And I should logout from the application
