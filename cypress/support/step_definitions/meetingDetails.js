import {When,And,Then} from "cypress-cucumber-preprocessor/steps"
import meetingDetailsPage from "../page_objects/meetingDetails.page"
const constants = require ('../constants')

Then('I can view the Meeting Details page', () => {
    cy.wait('@GET_MEETING_ID')
    cy.wait('@RELATED_MEETINGS')
    cy.wait('@MEETING_SECURITY_WATCHLIST')
    cy.wait('@ASSIGNED_MEETING_ID')
    cy.wait('@VOTE_TALLY')
    cy.url().should('include', '/MeetingDetails/Index/')
})

When('I navigate to the meeting details page for the meeting {string}', (meetingID) => {
    cy.AddTenDaysToMeetingDates(constants.MEETINGID[meetingID])
    cy.visit('MeetingDetails/Index/' + constants.MEETINGID[meetingID])   
  })

When('I click on the Change Vote or Rationale button', () => {
    meetingDetailsPage.unlockButton().click()
    cy.verifyMeetingOptionButtons()
})

And('I replace my FOR votes with AGAINST and vice-versa', () => {
    meetingDetailsPage.voteCardRow().then(($rows) => {
        $rows.each((index, value) => {
            const rec = Cypress.$(value).find('td.vote-card-policy-rec').text()
            if (rec.includes('Non Voting')) {
                //do nothing
            } else {
                var selected = Cypress.$(value).find(':selected').text()
                var option1 = Cypress.$(value).find('option').eq(1).text()
                var option2 = Cypress.$(value).find('option').eq(2).text()
                if (Cypress.$(value).find('option').eq(1).text() !== selected) {
                cy.get(`#md-votecard-grid-results > tr:nth-child(${index + 1}) > td.vote-card-vote-dec > select`).select(
                    option1,
                    { force: true }
                )
                } else {
                cy.get(`#md-votecard-grid-results > tr:nth-child(${index + 1}) > td.vote-card-vote-dec > select`).select(
                    option2,
                    { force: true }
                )
                }
            }
        })
    })
})

And('I click on the Workflow option from the toolbar', () => {
    meetingDetailsPage.workflowButton().click()
})

And('I can verify that the Quick Vote option and Vote Decision are read only', () => {
    meetingDetailsPage.quickVoteDropdown().should('have.attr', 'aria-disabled', 'true')
    meetingDetailsPage.voteCardRow().then(($rows) => {
        $rows.each((index) => {
            cy.get(`#md-votecard-grid-results > tr:nth-child(${index + 1}) > td.vote-card-vote-dec > select`).should('have.attr', 'disabled')
        })
    })
})

Then('I should get a popup window with a warning and OK and Cancel buttons', () => {
    meetingDetailsPage.confirmPopUp().should('be.visible')
    meetingDetailsPage.confirmPopUpContent().should('contain.text','your vote decisions will not be saved')
    meetingDetailsPage.popUpOkButton().should('be.visible')
    meetingDetailsPage.popUpCancelButton().should('be.visible')
})

When('I click on the OK button', () => {
    meetingDetailsPage.popUpOkButton().click()
})

When('I click on the Cancel button', () => {
    meetingDetailsPage.popUpCancelButton().click()
})

And('I click on the Vote button', () => {
    meetingDetailsPage.voteNowButton().click()
})

And('I select the checkbox and click Proceed', () => {
    cy.wait('@VOTE_REQUEST_VALIDATION')
    meetingDetailsPage.checkboxOverride().should('be.visible').click({ force: true })
    meetingDetailsPage.proceedButton().click()
})

Then('I can see a Vote success message', () => {
    meetingDetailsPage.voteSuccessMessage().should('be.visible')
})

And('I verify the vote tally section by checking the total votes and hyperlinks', () => {
    meetingDetailsPage.totalVotedLink().should('be.visible').click()
    meetingDetailsPage.closeVoteTallyPopup().should('be.visible').click()
    meetingDetailsPage.totalNotVotedLink().should('be.visible').click()
    meetingDetailsPage.closeVoteTallyPopup().should('be.visible').click()
})