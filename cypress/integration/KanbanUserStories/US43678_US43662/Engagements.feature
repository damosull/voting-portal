Feature: Engagement permissions

    Background:
        Given I login as Internal User and retrieve Customer ID for "Robeco"

    #test case 3728
    Scenario:Verify External Admin user cannot view Engagements in the company page when the system permission "View Interaction" is turned off for External Admin role
        When I set View Interactions permissions to "Deny" for RobecoAutomation External Admin
        When I login as External User "ROBECO"
        And I select the first meeting on the Workflow page
        And I click the Company link on the Mettings detail page
        Then The anchor bar should not contain a link to Engagements
        And There is no Engagements section on the Company page

    #test case 4573
    Scenario:Verify a user can create a Custom Field Type of Picklist Multi Select & verify the Label Name is not displayed on workflow grid
        When I set View Interactions permissions to "Allow" for RobecoAutomation External Admin
        And I login as External User "ROBECO"
        And I select Customer Profile from the Admin dropdown
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
        When I navigate to the Workflow page
        Then There is no reference to my picklist 'AutomationTestPicklist' on the workflow page
        Then I delete the 'AutomationTestPicklist' picklist


    #test case 4573
    Scenario:Verify a user can Create a Multi Select Custom Field Picklist & Verify user can Add/Sort/Remove the Multi Select custom field on the Workflow page
        When I set View Interactions permissions to "Allow" for RobecoAutomation External Admin
        And I login as External User "ROBECO"
        And I select Customer Profile from the Admin dropdown
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
        When I navigate to the Workflow page
        And I open the Columns dropdown
        Then The picklist created 'Automation12 345"£ $%' should be present in the column list unchecked
        And I delete the active 'Automation12 345"£ $%' picklist

    #test case 4575
    @focus
    Scenario: Verify a user can create a Custom Field Type Multi Select with Existing Workflow field Label Name & 2 same Label Names are displayed in Workflow grid & in Add Criteria dropdown
        When I set View Interactions permissions to "Allow" for RobecoAutomation External Admin
        And I login as External User "ROBECO"
        And I select Customer Profile from the Admin dropdown
        And I select Custom Fields from The Customer Settings panel
        And I click Add Custom Field
        And I select 'Picklist - multi select' from the dropdown list
        When I enter a label value 'Ballot Status' and click OK button
        And I enter a first picklist value of 'text1' and click OK button
        And I enter a second picklist value of 'text2' and click OK button
        And I enter a third picklist value of 'text3' and click OK button
        Then the third picklist value should have an arrow up icon visible
        And I check the Filter Under Add Criteria checkbox
        And I save the picklist
        When I navigate to the Workflow page
        And I open the Columns dropdown
        Then The picklist created 'Ballot Status' should be present in the column list unchecked
        And The picklist created 'Ballot Status' should be orange in colour
        And I delete the active 'Ballot Status' picklist








