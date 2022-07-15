import {Given,When,And} from "cypress-cucumber-preprocessor/steps"
import loginPage from "../page_objects/login.page"
import workflowPage from "../page_objects/workflow.page"
const constants = require ('../constants')

Given('I am on the login page of Viewpoint', ()=> {
    cy.visit('/')
    //verify page loaded
    loginPage.usernameInput().should('be.visible')
})

Given('I am logged in as the {string} User', (username) => {
    sessionStorage.clear()
    cy.loginWithAdmin(constants.USER[username])
    workflowPage.getWorkflowPage()
    //Waiting for page load
    cy.wait('@WORKFLOW_EXPANSION', {responseTimeout: 120000})
    workflowPage.waitForWorkflowPageLoad()
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

Given('I login as Internal User and retrieve Customer ID for {string} to verify customer settings for VAM and VAP', (customer) => {

    cy.loginWithAdmin(constants.USER.AUTOMATIONINTERNAL)
    cy.visit('/Workflow')

    //Alias csrf token
    cy.wait('@WORKFLOW_EXPANSION').then((resp) => {
        var csrftoken = resp.request.headers.csrftoken;
        cy.wrap(csrftoken).as('csrftoken')
    })

    //get customer ID
    cy.getCustomerIDFromDB(customer).as('custid')

    //verify CanModifyVotesRationaleAfterMeetingDate = true
    //& RequireRationaleVap = true for Customer
    cy.get('@custid').then(function (cid) {
      const unixTime = Math.floor(Date.now() / 1000)
      const settings = `?&pCustomerID=${cid}&_=${unixTime}`
      cy.TurnOnCustomerSetting(settings, 'CanModifyVotesRationaleAfterMeetingDate')
      cy.TurnOnCustomerSetting(settings, 'RequireRationaleVap')
      cy.TurnOnCustomerSetting(settings, 'RequireRationaleVam')
    })
    cy.logout()
})