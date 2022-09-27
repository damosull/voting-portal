import { When, Then } from "@badeball/cypress-cucumber-preprocessor"

When('I navigate to the change password page', () => {
    cy.visit('/SetPsw/Change')
})

Then('I verify that all the relevant API calls for change password page are made', () => {
    //2 API Calls
    cy.statusCode200('@CURRENT_USER')
    cy.statusCode200('@PASSWORD_VALIDATOR_SETUP')
})