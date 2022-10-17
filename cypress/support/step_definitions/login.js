import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor"
import loginPage from "../page_objects/login.page"
import meetings from "../../fixtures/meetings.json"
const constants = require('../constants')

Given('I am on the login page of Viewpoint', () => {
    cy.visit('/')
    //verify page loaded
    loginPage.usernameInput().should('be.visible')
})

Given('I am logged in as the {string} User', (username) => {
    sessionStorage.clear()
    cy.loginWithAdmin(constants.USER[username])
})

Given('I am logged in as a random external user', () => {
    sessionStorage.clear()
    let randomUserId = Math.floor(Math.random() * (Object.keys(constants.USER).length - 3) + 3)
    if (randomUserId === 0 || randomUserId === 1) { randomUserId = 2 }
    cy.log('Random Number Is: ' + randomUserId)
    const username = Object.values(constants.USER)[randomUserId]
    cy.log('logging in with: ' + username)
    cy.loginWithAdmin(username)
})

Given('I launch a random meeting for a random user', () => {
    sessionStorage.clear()
    //fetch a random user and meeting
    let rand = Math.floor(Math.random() * meetings.length) + 1
    let username = meetings[rand].emailId
    let meetingId = meetings[rand].meetingId
    //login
    cy.log('logging in with: ' + username)
    cy.loginWithAdmin(username)
    //launch meeting details page
    cy.log('launching meeting with ID: ' + meetingId)
    cy.visit('MeetingDetails/Index/' + meetingId)
})

Then('I should logout from the application', () => {
    cy.request({
        method: 'GET',
        url: '/Home/Logout',
    }).then((resp) => {
        //expect(resp.status).to.eq(200)
        cy.visit('/')
    })
})

When('I login via the UI with the user {string}', function (username) {
    loginPage.usernameInput().type(constants.USER[username])
    loginPage.passwordInput().type(constants.PASSWORD)
    loginPage.signInButton().click()
})

When('I refresh the page', () => {
    cy.reload()
})

Then('I turn on the customer settings for {string} for {string}', (feature, customer) => {
    cy.visit('/Workflow')

    //Alias csrf token
    cy.wait('@WORKFLOW_EXPANSION', { responseTimeout: 150000 }).then((resp) => {
        var csrftoken = resp.request.headers.csrftoken;
        cy.wrap(csrftoken).as('csrftoken')
    })

    //get customer ID
    cy.getCustomerIDFromDB(customer).as('custid')

    //Turn on requested customer settings
    cy.get('@custid').then(function (cid) {
        const unixTime = Math.floor(Date.now() / 1000)
        const settings = `?&pCustomerID=${cid}&_=${unixTime}`
        switch (feature) {
            case "VAM and VAP":
                cy.TurnOnCustomerSetting(settings, 'CanModifyVotesRationaleAfterMeetingDate')
                cy.TurnOnCustomerSetting(settings, 'RequireRationaleVap')
                cy.TurnOnCustomerSetting(settings, 'RequireRationaleVam')
                break
            case "Controversy Alert":
                cy.TurnOnCustomerSetting(settings, 'IsControversyAlertEnabled')
                break
            default:
                break
        }
    })
})

Given('I set the setting {string} to {string} for the user {string}', (feature, value, customer) => {
    sessionStorage.clear()
    cy.loginWithAdmin(constants.USER.AUTOMATIONINTERNAL)
    cy.visit('/Users/UserProfile')
    cy.getAutomationUserIDFromDB(constants.USER[customer]).as('userid')
    cy.get('@userid').then((uid) => {
        loginPage.pageBody().then(($body) => {
            // we can use Cypress.$ to parse the string body
            // thus enabling us to query into it easily
            const $html = Cypress.$($body)
            const csrf = $html.find('input[name=csrf-token]').val()
            cy.request({
                method: 'POST',
                url: `https://viewpoint.aqua.glasslewis.com/Api/Data/Permissions/UpdateUserPermissions`,
                headers: {
                    CSRFToken: csrf,
                },
                body:
                {
                    UserID: uid,
                    Changes:
                        [{
                            ID: 335,
                            Name: feature,
                            Access: value
                        }]
                },
            }).then((resp) => {
                expect(resp.status).to.eq(200)
            })
        })
    })
    cy.logout()
})