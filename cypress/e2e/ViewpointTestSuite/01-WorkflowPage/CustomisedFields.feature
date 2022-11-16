Feature: Customised Fields
#Test Suite - https://dev.azure.com/glasslewis/Development/_testPlans/execute?planId=9215&suiteId=9680

    #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/4573
    @4573
    Scenario: Verify a user can create a Custom Field Type of Picklist Multi Select & verify the Label Name is not displayed on workflow grid
        Given I set the setting "Permission.CompanyPage.ViewInteraction" to "Allow" for the user "ROBECO"
        When I am logged in as the "ROBECO" User
        And I navigate to the customer details page
        And I select Custom Fields from The Customer Settings panel
        And I click Add Custom Field
        And I select 'Picklist - multi select' from the dropdown list
        And the Page View field displays 'Workflow'
        Then the Active checkbox should be checked
        And the Filter Under Add Criteria checkbox should not be checked
        When I uncheck the Active checkbox
        And I enter a Description 'abcdefghijklmnopqrstuvwxyz' into the Description Field and click OK button
        And I enter a first picklist value of 'bbpicklist value 1' and click OK button
        And I enter a second picklist value of 'aapicklist value 2' and click OK button
        When I click the Sort Alphabatically button
        Then Picklist option 1 should contain 'aapicklist value 2'
        When I enter a label value 'AutomationTestPicklist' and click OK button
        And I save the picklist
        When I navigate to the workflow page
        Then I can view the workflow page
        Then There is no reference to my picklist 'AutomationTestPicklist' on the workflow page
        Then I delete the 'AutomationTestPicklist' picklist


    #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/4574
    @4574
    Scenario: Verify a user can Create a Multi Select Custom Field Picklist & Verify user can Add/Sort/Remove the Multi Select custom field on the Workflow page
        When I am logged in as the "ROBECO" User
        And I navigate to the customer details page
        And I select Custom Fields from The Customer Settings panel
        And I click Add Custom Field
        And I select 'Picklist - multi select' from the dropdown list
        When I enter a label value 'Automation12 345"£ $%' and click OK button
        And I enter a first picklist value of 'test123' and click OK button
        And I enter a second picklist value of 'test456' and click OK button
        Then the Active checkbox should be checked
        And I enter a Description 'AutomationTestDescription' into the Description Field and click OK button
        And the Filter Under Add Criteria checkbox should not be checked
        And I save the picklist
        When I navigate to the workflow page
        Then I can view the workflow page
        And I click on the Columns dropdown
        Then The picklist created 'Automation12 345"£ $%' should be present in the column list unchecked
        And I delete the active 'Automation12 345"£ $%' picklist


    #TC: https://dev.azure.com/glasslewis/Development/_workitems/edit/4575
    @4575
    Scenario: Verify a user can create a Custom Field Type Multi Select with Existing Workflow field Label Name & 2 same Label Names are displayed in Workflow grid & in Add Criteria dropdown
        When I am logged in as the "ROBECO" User
        And I navigate to the customer details page
        And I select Custom Fields from The Customer Settings panel
        And I click Add Custom Field
        And I select 'Picklist - multi select' from the dropdown list
        When I enter a label value 'Controversy Alert' and click OK button
        And I enter a first picklist value of 'text1' and click OK button
        And I enter a second picklist value of 'text2' and click OK button
        And I enter a third picklist value of 'text3' and click OK button
        Then the third picklist value should have an arrow up icon visible
        And I check the Filter Under Add Criteria checkbox
        And I save the picklist
        When I navigate to the workflow page
        Then I can view the workflow page
        And I click on the Columns dropdown
        Then The picklist created 'Controversy Alert' should be present in the column list unchecked
        And The picklist created 'Controversy Alert' should be orange in colour
        And I should logout from the application
