import {Given,When,And} from "cypress-cucumber-preprocessor/steps"
const loginPage = require ("../page_objects/login.page")
const constants = require ('../constants')

Given('I am on the login page of Viewpoint', ()=> {
    cy.visit('/')
    //verify page loaded
    loginPage.usernameInput().should('be.visible')
})

Given('I am logged in as the {string} User', (username) => {
    sessionStorage.clear()
    cy.loginWithAdmin(constants.USER[username])
    cy.visit('/Workflow')
    //Waiting for page load
    cy.stausCode200('@WORKFLOW_EXPANSION')
    cy.get('.k-loading-text', { timeout: 90000 }).should('not.exist')
})

And('I should logout from the application', () => {
    cy.logout()
})

When(/I login with "([^"]*)" and "([^"]*)"$/, function (username, password) {
    loginPage.usernameInput().type(username)
    loginPage.passwordInput().type(password)
    loginPage.signInButton().click()
})

When('I refresh the page', ()=> {
    cy.reload()
})
