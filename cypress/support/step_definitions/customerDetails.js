import { Then } from "cypress-cucumber-preprocessor/steps"
import customerDetailsPage from "../page_objects/customerDetails.page"
const constants = require ('../constants')


Then('I should be able to turn the {string}', (setting)=> {
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