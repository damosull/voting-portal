import { When, Then, And } from "cypress-cucumber-preprocessor/steps"
import customFieldsPage from "../page_objects/customFields.page"

When('I navigate to the custom fields page', () => {
    cy.visit('/CustomerDetails/CustomFields')
})

Then('I verify that all the relevant API calls for custom fields page are made', () => {
    //3 API Calls
    cy.statusCode200('@CURRENT_USER')
    cy.statusCode200('@CUSTOM_FIELDS')
    cy.statusCode200('@CUSTOM_FIELDS_2')
})

And('I click Add Custom Field', () => {
    customFieldsPage.addCustomFieldButton().click()
})

And('I select {string} from the dropdown list', (option) => {
    customFieldsPage.customFieldTypeDropdown().select(option).should('include.text', option)
})

And('the Page View field displays {string}', (pageview) => {
    customFieldsPage.pageViewDropdown().should('include.text', pageview)
})

Then('the Active checkbox should be checked', () => {
    customFieldsPage.activeCheckbox().should('be.checked')
})

And('the Filter Under Add Criteria checkbox should not be checked', () => {
    customFieldsPage.filterUnderAddCriteriaCheckbox().should('not.be.checked')
})

And('I uncheck the Active checkbox', () => {
    customFieldsPage.activeCheckbox().uncheck({ force: true })
})

And('I check the Filter Under Add Criteria checkbox', () => {
    customFieldsPage.filterUnderAddCriteriaCheckbox().check({ force: true })
})

When('I enter a Description {string} into the Description Field and click OK button', (desc) => {
    customFieldsPage.descriptionText().click()
    customFieldsPage.descriptionInput().type(desc)
    customFieldsPage.descriptionSubmit().click()
})

And('I enter a first picklist value of {string} and click OK button', (arg) => {
    customFieldsPage.firstPicklist().click()
    customFieldsPage.descriptionInput().type(arg)
    customFieldsPage.descriptionSubmit().click()
})

And('I enter a second picklist value of {string} and click OK button', (arg2) => {
    customFieldsPage.secondPicklist().click()
    customFieldsPage.descriptionInput().type(arg2)
    customFieldsPage.descriptionSubmit().click()
})

And('I enter a third picklist value of {string} and click OK button', (argx) => {
    customFieldsPage.picklistButton().click()
    customFieldsPage.thirdPicklist().click()
    customFieldsPage.descriptionInput().type(argx)
    customFieldsPage.descriptionSubmit().click()
})

When('I click the Sort Alphabatically button', () => {
    customFieldsPage.sortAlphabeticallyButton().click()
})

Then('Picklist option 1 should contain {string}', (txt) => {
    customFieldsPage.picklistOptions().first().should('include.text', txt)
})

When('I enter a label value {string} and click OK button', (arg3) => {
    customFieldsPage.labelNameText().click()
    customFieldsPage.descriptionInput().type(arg3)
    customFieldsPage.descriptionSubmit().click()
})

And('I save the picklist', () => {
    customFieldsPage.saveButton().click()
})

Then('I delete the {string} picklist', (pl) => {
    cy.visit('https://viewpoint.aqua.glasslewis.com/CustomerDetails/CustomFields/')
    cy.contains(pl).click({ force: true })
    customFieldsPage.deleteButton().should('have.text', 'Delete').click({ force: true })
    cy.contains(pl).should('not.exist')
})

Then('I delete the active {string} picklist', (plst) => {
    cy.visit('https://viewpoint.aqua.glasslewis.com/CustomerDetails/CustomFields/')
    cy.contains(plst).click({ force: true })
    customFieldsPage.activeCheckbox().uncheck({ force: true })
    cy.wait('@ACTIVE_FLAG')
    customFieldsPage.deleteButton().click({ force: true })
    cy.contains(plst).should('not.exist')
})

Then('The picklist created {string} should be present in the column list unchecked', (name) => {
    customFieldsPage.filterColumnNameInput().type(name)
    customFieldsPage.inputWithValue(name).should('not.be.checked')
    customFieldsPage.filterColumnNameInput().clear()
})

Then('the third picklist value should have an arrow up icon visible', () => {
    customFieldsPage.thirdPicklistArrowIcon().should('be.visible')
})

Then('The picklist created {string} should be orange in colour', (name) => {
    customFieldsPage.filterColumnNameInput().type(name)
    customFieldsPage.picklistLabel().should('have.css', 'color', 'rgb(255, 83, 13)')
    customFieldsPage.filterColumnNameInput().clear()
})