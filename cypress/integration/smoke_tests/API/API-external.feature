Feature: Engagement permissions

    Background:
        Given I login as External User

    Scenario: Workflow page API calls are loading as expected
        When I arrive on the Workflow page
        Then I check the API calls status on the Workflow page

    Scenario: Dashboard page API calls are loading as expected
        When I arrive on the Dashboard page
        Then I check the API calls status on the Dashboard page