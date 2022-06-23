import { Given, Then, And } from 'cypress-cucumber-preprocessor/steps'
const constants = require ('../../../../support/constants')
var idMeeting = [1101707,1129790]
var idCompany = [38673]

Given('I am logged in as the {string} User', (username) => {
  sessionStorage.clear()
  cy.loginWithAdmin(constants.USER[username])
  cy.visit('/Workflow')
  //Waiting for page load
  cy.stausCode200('@WORKFLOW_SECURITIES_WATCHLIST')
  cy.removeAllExistingSelectedCriteria()
})

And('I should logout from the application', () => {
  cy.logout()
})

And('I navigate to the meeting with id {string}', (meetingId) => {
  cy.visit('MeetingDetails/Index/' + meetingId)
  cy.stausCode204('@LOGGER')
  cy.stausCode200('@GET_FILINGS')
  cy.stausCode200('@VOTE_TALLY')
})

Then('the meeting id should match the expected current meeting id and previous meeting id', () => {
  cy.get('#link-next-meeting-id').click({force: true})
  /* Click Previous button, get Meeting ID for that meeting and verify it is same meeting id as stored in a variable as 
  first meeting id*/
  cy.get('#link-prev-meeting-id').click({force: true})
  cy.location('href').should('include', idMeeting[0])
  cy.stausCode204('@LOGGER')
  cy.stausCode200('@GET_FILINGS')
  cy.stausCode200('@VOTE_TALLY')
})

And('the company id should match the expected company id', () => {
  // Navigate to Company Page, get company id and verify it is same company id as stored in a variable as first company id
  cy.get('#company-navigate').click({ force: true })
  cy.location('href').should('include', idCompany[0])
})

And('I verify all listed items Meetings dropdown check for each in list includes the text "20"', () => {
  /* Click into Meetings dropdown on Company page and verify all listed items Meetings dropdown check for each in list
  includes the text '20' */
  cy.get('#btn-related-meetings-title-area > span').click()
  cy.get('.dropdown.related-meetings-list.open > ul > li').then(($rows) => {
      for (let i = 1; i < $rows.length - 1; i++) {
          cy.get(`#related-meetings > li > ul > li:nth-child(${i + 1}) > a > span:nth-child(1)`).then(
              (fn) => {
                  const fntxt = fn.text()
                  expect(fntxt).to.include('20')
              })
      }
  })
})
