import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps'
const constants = require ('../../../../support/constants')
const dayjs = require('dayjs')
var utc = require('dayjs/plugin/utc')
dayjs.extend(utc)
const selector = '#ballotActivityLogGrid > div > table > tbody > tr:nth-child(1) > td'
const statusToChange = 'Received'
const glassAPI = 'https://aqua-issuer-vote-confirmation-api.azurewebsites.net/api/Ballot/'


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

When('I navigate to the meeting details page for the meeting {string}', (meetingID) => {
  cy.AddTenDaysToMeetingDates(constants.MEETINGID[meetingID])
  cy.visit('MeetingDetails/Index/' + constants.MEETINGID[meetingID])
  cy.stausCode204('@LOGGER')
  cy.stausCode200('@GET_FILINGS')
  cy.stausCode200('@VOTE_TALLY')
})

And('I click on upcoming meetings', () => {
  cy.contains('Upcoming Meetings').click()
})

And('I change the meeting status by amending the database', () => {
  // Remove any pre-existing filter from the page
  cy.removeAllExistingSelectedCriteria()
  // Get the user's name and ID from the database
  cy.getAutomationUserIDFromDB(constants.USER.WELLINGTON).as('userid')
  // Mimic the API calls done on GLASS to change the meeting to the correct status
  cy.get('@userid').then((uid) => {
    cy.request({
      method: 'POST',
      url: `${glassAPI}/GetByControllerNumbers`,
      body: [constants.MEETINGID.WLNCVTD_CTRLNUM],
    }).then((resp) => {
      expect(resp.status).to.eq(200)
      const lastModDate = resp.body[0].lastModifiedDate
      const custName = resp.body[0].customerName
      const compName = resp.body[0].companyName

      cy.request({
        method: 'PATCH',
        url: `${glassAPI}/StatusReason`,
        body: [
          {
            controlNumber: constants.MEETINGID.WLNCVTD_CTRLNUM,
            status: statusToChange,
            lastModifiedBy: uid,
            lastModifiedDate: lastModDate,
            reason: '',
            customerName: custName,
            companyName: compName,
            found: true,
            canCurrentStatusBeChanged: true,
          },
        ],
      }).then((resp) => {
        expect(resp.status).to.eq(204)
      })
    })
  })
})

And('I navigate via the Control Number link', () => {
  cy.get('#ballots-grid div:nth-child(2) td:nth-child(1)').contains(constants.MEETINGID.WLNCVTD_CTRLNUM).click()
})

Then('the ballot activity log should have the correct date, username and status', () => {
  cy.wait('@BALLOT_ACTIVITY_LOG').then(() => {
    cy.request({
      method: 'POST',
      url: `${glassAPI}/GetByControllerNumbers`,
      body: [constants.MEETINGID.WLNCVTD_CTRLNUM],
    }).then((resp) => {
      expect(resp.status).to.eq(200)
      const originalDate = resp.body[0].lastModifiedDate
      // Convert the date to the offset and format that Viewpoint shows in the UI
      const formattedDate = dayjs(originalDate).format('MM/DD/YYYY')
      const formattedTime = dayjs.utc(originalDate).utcOffset('+0800').format('HH:mm:ss')
      let leadingZeros = formattedDate.replace(/\b0/g, '')
      let finalDate = `${leadingZeros} ${formattedTime}`

      cy.wrap(finalDate).as('lastModifiedDate')
    })
  })
  cy.get('#ballot-activitylog-modal').should('be.visible')

  // It checks that the status shown is correcct
  cy.get(selector)
    .eq(0)
    .then((actionUI) => {
      expect(statusToChange).to.include(actionUI.text())
    })

  // It checks that the username shown is correct
  cy.getAutomationUsernameFromDB(constants.USER.WELLINGTON).as('fullname')
  cy.get('@fullname').then((fullname) => {
    cy.get(selector)
      .eq(1)
      .then((userUI) => {
        expect(fullname).to.include(userUI.text())
      })
  })

  // It checks that the date shown is correcct
  cy.get('@lastModifiedDate').then((glassDate) => {
    cy.get(selector)
      .eq(2)
      .then((dateUI) => {
        expect(glassDate).to.include(dateUI.text())
      })
  })
})

