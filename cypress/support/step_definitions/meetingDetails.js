import {When,And,Then} from "cypress-cucumber-preprocessor/steps"
import meetingDetailsPage from "../page_objects/meetingDetails.page"
import userPermissionPage from "../page_objects/userPermission.page"
const constants = require ('../constants')

Then('I can view the Meeting Details page', () => {
    cy.wait('@GET_MEETING_ID')
    cy.wait('@RELATED_MEETINGS')
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

And('I click on the Proceed button', () => {
    cy.wait('@VOTE_REQUEST_VALIDATION')
    meetingDetailsPage.getLoadingSpinner().should('not.exist')
    cy.clickIfExist(meetingDetailsPage.proceedButtonLocator)    
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

And('I verify that the Voted section shows all votes and nothing is displayed under Total Not Voted', () => {
    let value1,value2
    meetingDetailsPage.totalVotedLink().should(($el) => {
        value1 = $el.text()
        expect(value1).to.not.equal('0')
    })
    meetingDetailsPage.totalVotedLabel().should(($el) => {
        value2 = $el.text()
        expect(value1).to.equal(value2)
    })
})

When('I click on the Glass Lewis logo on the top left', () => {
    meetingDetailsPage.glassLewisLogoLink().click()
})

And('I vote for an item which had no previous vote with Glass Lewis Recommendations', () => {
    meetingDetailsPage.voteCardRow().then(($rows) => {
        $rows.each((index, value) => {
            const rec = Cypress.$(value).find('td.vote-card-policy-rec').text()
            const glRec = Cypress.$(value).find('td:nth-of-type(4)').text()
            if (rec.includes('Manual')) {
                cy.get(`#md-votecard-grid-results > tr:nth-child(${index + 1}) > td.vote-card-vote-dec > select`).select(
                    glRec, { force: true })
            }
        })
    })
})

And('The {string} functionality is not available', (permission_name)=> {
    
    cy.clickIfExist(userPermissionPage.changeVoteOrRationale());

    switch (permission_name) {
        case "Vote":
            userPermissionPage.voteButton().should('not.be.visible');
            break;
        case "Instruct":
            userPermissionPage.instructButton().should('not.exist')
            break;
        case "Take No Action":
            userPermissionPage.takeNoActionButton().should('not.exist')
            break;
        default:
        break;
    }
})

And('I can verify that all policy recommendations are matching {string} recommendations', (institute) => {
    meetingDetailsPage.voteCardRow().then(($rows) => {
        $rows.each((index, value) => {
            const rec = Cypress.$(value).find('td.vote-card-policy-rec').text()
            if (rec.includes('Manual') || rec.includes('Not')) {
                // Do Nothing
            } else {
                if (institute === 'GL') {
                    let glValue = Cypress.$(value).find('td:nth-of-type(4)').text()
                    expect(glValue).to.equal(rec)
                } else if (institute === 'MGMT') {
                    let mgmtValue = Cypress.$(value).find('td:nth-of-type(3)').text()
                    expect(mgmtValue).to.equal(rec)
                }
                
            }
        })
    })
})

And('I can verify that at least one policy recommendations is against {string} recommendations', (institute) => {
    meetingDetailsPage.voteCardRow().then(($rows) => {
        let count = 0
        $rows.each((index, value) => {
            const rec = Cypress.$(value).find('td.vote-card-policy-rec').text()
            if (rec.includes('Manual') || rec.includes('Not')) {
                // Do Nothing
            } else {
                if (institute === 'GL') {
                    let glValue = Cypress.$(value).find('td:nth-of-type(4)').text()
                    if (glValue !== rec) { count = count + 1 }
                } else if (institute === 'MGMT') {
                    let mgmtValue = Cypress.$(value).find('td:nth-of-type(3)').text()
                    if (mgmtValue !== rec) { count = count + 1 }
                }
            }
        })
        expect(count).to.be.greaterThan(0)
    })
})

Then('I get back a validation message {string}',(message) => {
    meetingDetailsPage.validationMessage().contains(message)
})