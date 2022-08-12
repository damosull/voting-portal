import { When, Then, And } from "cypress-cucumber-preprocessor/steps"
import customerDetailsPage from "../page_objects/customerDetails.page"
const constants = require('../constants')


Then('I should be able to turn the {string}', (setting) => {
    switch (setting) {
        case "ACSI checkbox to YES":
            customerDetailsPage.acsiCheckbox().should('not.be.visible').check({ force: true }).should('be.checked')
            break
        default:
            break
    }
    customerDetailsPage.saveButton().click()
    customerDetailsPage.successMessage().should('contain.text', constants.messages.toast.CUSTOMER_SETTINGS_UPDATED)
})

When('I navigate to the customer details page', () => {
    cy.visit('/CustomerDetails')
})

Then('I verify that all the relevant API calls for customer details page are made', () => {
    //7 API Calls
    cy.statusCode200('@CURRENT_USER')
    cy.statusCode200('@CUSTOMER_DETAILS')
    cy.statusCode200('@FILTER_PREFERENCE')
    cy.statusCode200('@LIST_SERVICE_VP_ONLY_WATCHLIST')
    cy.statusCode200('@LIST_SERVICE_POLICY_ID')
    cy.statusCode200('@GET_CURRENT_USER_COLLEAGUES')
    cy.statusCode200('@CUSTOMER_FORMATS')
})

And('I select Custom Fields from The Customer Settings panel', () => {
    customerDetailsPage.customFieldsLink().click()
})
