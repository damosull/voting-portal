import { And, Then } from "cypress-cucumber-preprocessor/steps"
import meetingDetailsPage from "../page_objects/meetingDetails.page"
const constants = require ('../constants')
const dayjs = require('dayjs')
var utc = require('dayjs/plugin/utc')
dayjs.extend(utc)

And('I change the meeting status of user {string} for the control number {string} to {string} by amending the database', (userName, controlNumber, meetingStatus) => {
    // Get the user's name and ID from the database
    cy.getAutomationUserIDFromDB(constants.USER[userName]).as('userid')
    // Mimic the API calls done on GLASS to change the meeting to the requested status
    cy.get('@userid').then((uid) => {
      cy.request({
        method: 'POST',
        url: `${constants.glassAPI}/GetByControllerNumbers`,
        body: [constants.MEETINGID[controlNumber]],
      }).then((resp) => {
        expect(resp.status).to.eq(200)
        const lastModDate = resp.body[0].lastModifiedDate
        const custName = resp.body[0].customerName
        const compName = resp.body[0].companyName
  
        cy.request({
          method: 'PATCH',
          url: `${constants.glassAPI}/StatusReason`,
          body: [
            {
              controlNumber: constants.MEETINGID[controlNumber],
              status: meetingStatus,
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

Then('the ballot activity log for {string} should have the correct date, username of {string} and status of {string}', (controlNumber, userName, meetingStatus) => {
  cy.wait('@BALLOT_ACTIVITY_LOG').then(() => {
    cy.request({
      method: 'POST',
      url: `${constants.glassAPI}/GetByControllerNumbers`,
      body: [constants.MEETINGID[controlNumber]],
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

  meetingDetailsPage.ballotActivityModal().should('be.visible')

  // It checks that the status shown is correcct
  meetingDetailsPage.ballotActivityModalDataRowOne()
    .eq(0)
    .then((actionUI) => {
      expect(meetingStatus).to.include(actionUI.text())
    })

  // It checks that the username shown is correct
  cy.getAutomationUsernameFromDB(constants.USER[userName]).as('fullname')
  cy.get('@fullname').then((fullname) => {
    meetingDetailsPage.ballotActivityModalDataRowOne()
      .eq(1)
      .then((userUI) => {
        expect(fullname).to.include(userUI.text())
      })
  })

  // It checks that the date shown is correcct
  cy.get('@lastModifiedDate').then((glassDate) => {
    meetingDetailsPage.ballotActivityModalDataRowOne()
      .eq(2)
      .then((dateUI) => {
        expect(glassDate).to.include(dateUI.text())
      })
  })
})

And('I delete the created test watchlist from database', () => {
  cy.sqlServer(
    `
    DELETE FROM [GLP].[dbo].[PX_WatchListSecurity]
    WHERE WatchListID IN (
      SELECT WatchListID FROM [GLP].[dbo].[PX_WatchList]
      WHERE WatchListName = '` + constants.testWatchlistName + `'
    )
    
    DELETE FROM [GLP].[dbo].[PX_WatchListUser]
    WHERE WatchListID in (
      SELECT WatchListID FROM [GLP].[dbo].[PX_WatchList]
      WHERE WatchListName = '` + constants.testWatchlistName + `'
    )
    
    DELETE FROM [GLP].[dbo].[PX_WatchList]
    WHERE WatchListName = '` + constants.testWatchlistName + `'
    `
  )
})

And('I cleanup the newly created user from the database to reuse the test script', () => {
  cy.sqlServer(
    `
    DELETE FROM GLP.dbo.UM_UserPreferences
    WHERE userID IN (
      SELECT userID FROM GLP.dbo.UM_User
      WHERE LoginID = '`+ constants.TESTUSER.CONTACTEMAIL +`'
      )
    DELETE FROM GLP.dbo.UM_User
    WHERE LoginID = '`+ constants.TESTUSER.CONTACTEMAIL +`'
    `
  )
})