import { When, Then } from "cypress-cucumber-preprocessor/steps"


When('I navigate to the system permissions page', () => {
    cy.visit('/systempermissions')
})

Then('I verify that all the relevant API calls for system permissions page are made', () => {
    //2 API Calls
    cy.statusCode200('@CURRENT_USER')
    cy.statusCode200('@PERMISSIONS')
})