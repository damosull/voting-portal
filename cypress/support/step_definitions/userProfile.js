import { When, Then } from "cypress-cucumber-preprocessor/steps"

When('I navigate to the user profile page', () => {
    cy.visit('/Users/UserProfile')
})

When('I navigate to the internal users profile page', () => {
    cy.visit('/Users/UsersProfiles')
})

Then('I verify that all the relevant API calls for user profile page are made', () => {
    //2 API Calls
    cy.statusCode200('@CURRENT_USER')
    cy.statusCode200('@GET_AUTHENTICATED_USER')
})

Then('I verify that all the relevant API calls for internal users profile page are made', () => {
    //5 API Calls
    cy.statusCode200('@CURRENT_USER')
    cy.statusCode200('@GET_USER_LIST')
    cy.statusCode200('@USER_PROFILE_HTML')
    cy.statusCode200('@USER_CREATOR_PERMISSIONS')
    cy.statusCode200('@USER_VIEW_MODEL_VALIDATION_RULES')
})