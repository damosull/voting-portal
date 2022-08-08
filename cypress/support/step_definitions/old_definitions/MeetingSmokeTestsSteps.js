import { When, Then, And } from 'cypress-cucumber-preprocessor/steps'
const constants = require("../../constants")
const meetingDetailsPage = require("../../page_objects/meetingDetails.page")
const unixTime = Math.floor(Date.now() / 1000)
const filterName = `MyFilter_${unixTime}`


Then('the filtered results should display the data only for vote against Glass Lewis', () => {
  //arrays to store GL recommendations and vote decisons
  let GLvals = []
  let Selected = []

  cy.get('table > tbody > tr').eq(0).within(() => {
      cy.get('[data-js="meeting-details-link"]').first().click({ force: true })
  })

  cy.get('#md-votecard-grid-results > tr').then(($rows) => {
      $rows.each((index, value) => {
          const rec = Cypress.$(value).find(`td:nth-child(4)`).text()
          if (rec.includes('Non Voting') || rec.includes('N/A')) {
              //skip
          } else {
              GLvals.push(rec)
              var selected = Cypress.$(value).find(':selected').text()
              Selected.push(selected)
          }
      })
      var diff = arraysEqual(GLvals, Selected)
      expect(diff).to.be.false
  })
})

Then('the filtered results should display the data only for vote against Management', () => {
  //arrays to store Management recommendations and vote decisons
  let Mgmtvals = []
  let Selected = []

  cy.get('table > tbody > tr').eq(0).within(() => {
      cy.get('[data-js="meeting-details-link"]').first().click({ force: true })
  })

  cy.get('#md-votecard-grid-results > tr').then(($rows) => {
      $rows.each((index, value) => {
          const rec = Cypress.$(value).find(`td:nth-child(3)`).text()
          if (rec.includes('Non Voting') || rec.includes('N/A')) {
              //skip
          } else {
              Mgmtvals.push(rec)
              var selected = Cypress.$(value).find(':selected').text()
              Selected.push(selected)
          }
      })

      if (Mgmtvals == null || Selected == null) {
          cy.log('nulls')
      } else {
          cy.log(Mgmtvals)
          cy.log(Selected)
          var diff = arraysEqual(Mgmtvals, Selected)
          expect(diff).to.be.false
      }
  })
})

And('I provide the details like the username to share with and submitted', () => {
  //Step 6 - Select 'Calpers External Admin' from Users list
  cy.get('#in-share-meeting-user-name').type('Calpers', {delay: 50})
  cy.wait('@IDENTITY_SEARCH')
  cy.get('#in-share-meeting-user-name_listbox li').eq(0).should('be.visible').click({force: true})
  //Step 8 - Click Add button
  cy.get('#btn-share-meeting-add').click()
  //Step 9 - Add Comment "This is a test comment"
  cy.get('#txt-share-meeting-comment').type('This is a test comment')
  //Step 10 - Click Share button
  cy.get('#btn-share-meeting-confirm').click()
})

Then('I should see a request saved message', () => {
  cy.get('.toast-message').should('contain.text', constants.messages.toast.SHARE_MEETING_REQUEST_SAVED)
})

And('I verify that the request was saved in the database', () => {
  let today = new Date().toISOString().slice(0, 10)
  cy.getAutomationUserIDFromDB(constants.USER.CALPERS).as('userid')
  //Step 11 - Connect to Aqua GLP Database and verify new row has been added to PX_ShareMeeting table
  cy.executeQuery('SELECT TOP 1 * FROM PX_ShareMeeting ORDER BY ShareMeetingID DESC').then((result) => {
    var cols = []
    for (var j = 0; j < result.length; j++) {
      cols.push(result[j])
    }
    //Step 12 - Verify PX_ShareMeeting table Column data for correct data
    cy.get('@userid').then(function (uid) {
      assert.equal(cols[1], uid) //verify Auatomation QaUat User id
    })
    expect(cols[3]).to.include(today) //Created date
    assert.equal(cols[4], 'This is a test comment') //verify Comment
  })  
})

When('I change the meeting date filter to choose next 10 days', () => {
  // Step 1 - Click on "Meeting Date"
  cy.get('#rdo-meeting-date').check().should('be.checked')

  // Wait for meeting date grouping
  cy.wait('@GET_AVAILABLE_ASSIGNEES_CUSTOMER')

  // Step 2 - Change Next 30 days to 10 Days
  cy.get('#date-range-target-meeting-deadline').invoke('attr', 'style', 'display: block')
  cy.get('.k-formatted-value').first().invoke('attr', 'style', 'display: block').clear()
  cy.get('.k-formatted-value').first().invoke('attr', 'style', 'display: block').type('10')
  cy.get('#btn-meeting-deadline-date-update').click({ force: true })  
})

And('I add the filter criteria', () => {
  const arrCriteria = ['Decision Status']
  // Step 3 - Select Decision Status and Recommendations Pending
  cy.AddMultipleCriteria(arrCriteria)
  cy.get('#multiselect-static-target-DecisionStatus').invoke('attr', 'style', 'display: block')
  cy.get('#AwaitingResearch-cb-DecisionStatus').check({ force: true })
  cy.get('#btn-update-DecisionStatus').click({ force: true })  
})

Then('the filtered results should be displayed', () => {
  cy.contains('Decision Status (1)')
})

And('I save the filter', () => {
  cy.saveFilter(filterName)
  cy.get('.toast-message').should('contain.text', constants.messages.toast.FILTER_CREATED)
  cy.contains('My Filters').siblings().find('span').should('contain', filterName)
})

And('I vote for the items on the meeting', () => {
 // Step 6 - Select 'For' in the option 'Quick Vote'
 cy.get('#quick-vote-container > span > span').click({ force: true })
 cy.get('#quickVoteSelect').select('For', { force: true })
 // Assert that all records have the option "For"
 cy.get('#md-votecard-grid-results > tr').then(($rows) => {
   $rows.each((index, value) => {
     var selected = Cypress.$(value).find(':selected').text()
     // I ignore the first line because it's the header of the table
     if (selected !== '') {
       expect(selected).to.include('For')
     }
   })
 })
 // Assert Total Vote is 0 before the vote starts
 cy.get('#launch-ballots-voted-modal').should('have.text', 0)
 // Store the "Total Not Voted" to later compare with the "Total Voted"
 cy.get('#launch-ballots-not-voted-modal')
   .invoke('text')
   .then((text) => {
     cy.wrap(text).as('totalNotVoted')
   })
 // Step 7 - Click on [Vote]
 cy.get('#btn-vote-now').click({ force: true })
 cy.wait('@MEETING_DETAILS')
 cy.wait('@GET_AGENDA')
 cy.wait('@WORKFLOW_RESEARCH_INFO')
 cy.wait('@GET_FILINGS')
 cy.wait('@VOTE_TALLY')
 meetingDetailsPage.proceedButton().click()
 cy.contains('Vote success')
 // Step 7 - Verify Vote Tally gets updated
 // Compare the total shown previously in Not Voted with the total shown in Total Voted
 cy.get('@totalNotVoted').then((vote) => {
   cy.get('#launch-ballots-voted-modal').should('have.text', vote).siblings().contains('Total Voted:')
   cy.contains(`Voted (${vote})`)
 })
 // Assert Total Not Voted is 0
 cy.get('#launch-ballots-not-voted-modal').should('have.text', 0)
 // Step 8 - Click on Change Vote or Rationale
 cy.get('#btn-unlock').should('be.visible').should('have.text', 'Change Vote or Rationale').click({ force: true })
 cy.verifyMeetingOptionButtons()
 // Step 9 - Select Take No Action
 cy.get('#btn-take-no-action').should('be.visible').should('have.text', 'Take No Action').click({ force: true }) 
})

And('I proceed with the override of the votes', () => {
  // Proceed with the override
  cy.get('#vote-warnings-and-errors-modal').should('be.visible')
  cy.contains('Do you want to override the existing vote decisions? Select ballots to override')
  cy.get('#override-voted').check({ force: true }).should('be.checked')
  cy.get('.floatright > .green').should('have.text', 'Proceed').click({ force: true })
  cy.wait('@MEETING_DETAILS')
  cy.wait('@GET_AGENDA')
  cy.wait('@WORKFLOW_RESEARCH_INFO')
  cy.wait('@GET_FILINGS')
  cy.wait('@VOTE_TALLY')
})

When('I click on the Change Vote or Rationale button and then on Instruct', () => {
  // Step 10 - Click on Change Vote or Rationale
  cy.get('#btn-unlock').click({ force: true })
  cy.verifyMeetingOptionButtons()
  // Step 11 - Click on Instruct
  cy.get('#btn-instruct').should('have.text', 'Instruct').click({ force: true })
})

Then('the vote tally should be updated', () => {
  cy.contains('Instructed successfully')
  // Step 11 - Verify Vote Tally gets updated
  cy.get('@totalNotVoted').then((vote) => {
    cy.contains(`Review Required (${vote})`)
    cy.get('#launch-ballots-not-voted-modal').should('have.text', vote)
    cy.get('#launch-ballots-voted-modal').should('have.text', 0)
  })
})

And('the activity should match against the ballot activity log', () => {
  // Step 12 - Verify the activity section and match the activity against the Ballot activity log by clicking on the control number hyperlink
  let arrMeetingActivity = []
  let arrMeetingUser = []
  let arrMeetingDate = []
  let arrMeetingFinal = []

  // tr:nth-child(n+2) => this block of code is to ignore the first line, which is "First Ballot Received"
  cy.get('#meeting-details-activity > div > div > table > tbody > tr:nth-child(n+2)').then(($rows) => {
    $rows.each((index, value) => {
      const action = Cypress.$(value).find(`td:nth-child(1)`).text()
      // The string, for the same status, is different in each list. So I'm manually altering to "Instructed"
      if (action.includes('Edited(Fully)')) {
        arrMeetingActivity.push('Instructed')
      } else {
        arrMeetingActivity.push(action)
      }

      const user = Cypress.$(value).find(`td:nth-child(2)`).text()
      // substring is to remove the text "Ballot(s) intructed by" from the string. Replace All is to remove the single quotes
      const newUser = user.substring(user.indexOf("'")).replaceAll("'", '')
      arrMeetingUser.push(newUser)

      const date = Cypress.$(value).find(`td:nth-child(3)`).text()
      arrMeetingDate.push(date)

      // Concat all the arrays into a single one
      arrMeetingFinal = arrMeetingActivity.concat(arrMeetingUser, arrMeetingDate)
      cy.wrap(arrMeetingFinal).as('objMeetingFinal')
    })
  })

  cy.get('.ballots-grid-control-number-link').eq(0).scrollIntoView().click({force: true})
  cy.wait('@BALLOT_ACTIVITY_LOG')
  cy.get('#ballot-activitylog-modal').should('be.visible')

  let arrBallotActivity = []
  let arrBallotUser = []
  let arrBallotDate = []
  let arrBallotFinal = []

  // tr:not(:last-child) => this block of code is to ignore the last line, which is "Created"
  cy.get('#ballotActivityLogGrid > div > table > tbody > tr:not(:last-child)').then(($rows) => {
    $rows.each((index, value) => {
      const action = Cypress.$(value).find(`td:nth-child(1)`).text()
      if (action.includes('Edited(Fully)')) {
        arrBallotActivity.push('Instructed')
      } else {
        arrBallotActivity.push(action)
      }

      const user = Cypress.$(value).find(`td:nth-child(2)`).text()
      const newUser = user.substring(user.indexOf("'")).replaceAll("'", '')
      arrBallotUser.push(newUser)

      const date = Cypress.$(value).find(`td:nth-child(3)`).text()
      arrBallotDate.push(date)

      /* The Ballot activity log popup displays the list ordered by desc, whereas the activity table displays ordered by asc.
      The block below is triggered when the array has found the last position. It then reverses the list so its
      'ordered' by asc, which can be use used to compare with the activity list
      */
      if (index == $rows.length - 1) {
        arrBallotActivity.reverse()
        arrBallotUser.reverse()
        arrBallotDate.reverse()
      }

      arrBallotFinal = arrBallotActivity.concat(arrBallotUser, arrBallotDate)
      cy.wrap(arrBallotFinal).as('objBallotFinal')
    })
  })

  // Access both lists and then compare one with the other. The resul must be "true"
  cy.get('@objBallotFinal').then((ballotFinal) => {
    cy.get('@objMeetingFinal').then((meetingFinal) => {
      var isArrEqual = JSON.stringify(ballotFinal) == JSON.stringify(meetingFinal)
      expect(isArrEqual).to.be.true
    })
  })


})

/*Functions*/
//compare arrays
function arraysEqual(a1, a2) {
  return JSON.stringify(a1) == JSON.stringify(a2)
}