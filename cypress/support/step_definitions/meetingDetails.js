import { When, And, Then } from "cypress-cucumber-preprocessor/steps"
import meetingDetailsPage from "../page_objects/meetingDetails.page"
import workflowPage from "../page_objects/workflow.page"
const constants = require('../constants')
let meetingId

Then('I can view the Meeting Details page', () => {
    cy.wait('@GET_MEETING_ID')
    cy.wait('@RELATED_MEETINGS')
    cy.wait('@VOTE_TALLY')
    cy.url().should('include', '/MeetingDetails/Index/')
})

Then('I can see the Vote, Take No Action and Instruct buttons', () => {
    cy.verifyMeetingOptionButtons()
})

Then('I can verify I am on the Meeting Details page', () => {
    cy.url().should('include', '/MeetingDetails/Index/')
    meetingDetailsPage.homeButton().should('be.visible')
    meetingDetailsPage.accountButton().should('be.visible')
})

When('I navigate to the meeting with id {string}', (meetingId) => {
    cy.visit('MeetingDetails/Index/' + meetingId)
})

When('I navigate to the meeting details page for the meeting {string}', (meetingID) => {
    cy.AddTenDaysToMeetingDates(constants.MEETINGID[meetingID])
    cy.visit('MeetingDetails/Index/' + constants.MEETINGID[meetingID])
})

When('I reduce 10 days from meeting date and navigate to the meeting details page for the meeting {string}', (meetingID) => {
    cy.SetMeetingDateXdaysFromCurrent(constants.MEETINGID[meetingID], -10)
    cy.visit('MeetingDetails/Index/' + constants.MEETINGID[meetingID])
})

When('I click on the Change Vote or Rationale button', () => {
    meetingDetailsPage.unlockButton().click()
    cy.verifyMeetingOptionButtons()
})

When('I click on the Change Vote or Rationale button if it exists', () => {
    cy.clickIfExist(meetingDetailsPage.unlockButtonLocator)
})

Then('I should be {string} to see the {string} on the UI', (isVisible, element) => {
    isVisible = isVisible.includes('unable') ? 'not.be.visible' : 'be.visible'
    switch (element) {
        case "Controversy Alert link":
            meetingDetailsPage.controversyAlertDiv().should(isVisible)
            break
        case "Change Vote or Rationale":
            meetingDetailsPage.unlockButton().should(isVisible).should('have.text', 'Change Vote or Rationale')
            break
        default:
            break
    }
})

And('I quick vote {string} on the meeting', (voteType) => {
    meetingDetailsPage.quickVoteSelect().select(voteType, { force: true })
})

And('I capture the value of Total Not Voted', () => {
    // Store the "Total Not Voted" to later compare with the "Total Voted"
    meetingDetailsPage.totalNotVotedLink().invoke('text').then((text) => {
        cy.wrap(text).as('totalNotVoted')
    })
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

Then('I should be able to use the Instruct functionality on the meeting', () => {
    meetingDetailsPage.instructButton().click()
    cy.clickIfExist(meetingDetailsPage.votedBallotsLocator)
    cy.clickIfExist(meetingDetailsPage.proceedButtonLocator)
    meetingDetailsPage.instructedSuccessMessage().should('be.visible')
})

Then('I should be able to use the Take No Action functionality on the meeting', () => {
    meetingDetailsPage.takeNoActionButton().click()
    meetingDetailsPage.getLoadingSpinner().should('not.exist')
    meetingDetailsPage.pageBody().then((body) => {
        //Verify element exists
        if (body.find(meetingDetailsPage.warningPopUpLocator).is(':visible')) {
            meetingDetailsPage.warningPopUp().within(() => {
                meetingDetailsPage.genericCheckbox().should('not.be.visible').check({ force: true })
            })
            meetingDetailsPage.proceedButton().click()
        }
    })
    meetingDetailsPage.voteSuccessMessage().should('be.visible')
})

Then('I should get a popup window with a warning and OK and Cancel buttons', () => {
    meetingDetailsPage.confirmPopUp().should('be.visible')
    meetingDetailsPage.confirmPopUpContent().should('contain.text', 'your vote decisions will not be saved')
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
    meetingDetailsPage.voteNowButton().click({ force: true })
})

And('I click on the Proceed button', () => {
    meetingDetailsPage.getLoadingSpinner().should('not.exist')
    cy.clickIfExist(meetingDetailsPage.proceedButtonLocator)
})

And('I click the Company link', () => {
    meetingDetailsPage.companyNameLink().click()
})

And('I handle the override pop-up if it exists', () => {
    cy.wait('@VOTE_REQUEST_VALIDATION')
    meetingDetailsPage.getLoadingSpinner().should('not.exist')
    meetingDetailsPage.pageBody().then((body) => {
        //Verify element exists
        if (body.find(meetingDetailsPage.warningPopUpLocator).is(':visible')) {
            meetingDetailsPage.warningPopUp().within(() => {
                meetingDetailsPage.genericCheckbox().should('not.be.visible').check({ force: true })
            })
            meetingDetailsPage.proceedButton().click({force: true})
        }
    })
})

And('I select the checkbox and click Proceed', () => {
    meetingDetailsPage.checkboxOverride().should('be.visible').click()
    meetingDetailsPage.proceedButton().click()
})

Then('The Proceed button should be enabled', () => {
    meetingDetailsPage.proceedButton().should('be.visible')
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
    let value1, value2
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

When('I click on the home button', () => {
    meetingDetailsPage.homeButton().click()
})

And('I click on the share meeting option', () => {
    meetingDetailsPage.shareMeetingButton().click()
    meetingDetailsPage.shareMeetingPopUpHeading().should('be.visible')
    cy.wait('@SHARE_MEETING_LISTS')
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

And('I add a controversy alert file for the meeting', () => {
    cy.addControversyAlertFile()
})

And('The {string} functionality is not available', (permission_name) => {

    cy.clickIfExist(meetingDetailsPage.unlockButtonLocator);

    switch (permission_name) {
        case "Vote":
            meetingDetailsPage.voteNowButton().should('not.be.visible');
            break;
        case "Instruct":
            meetingDetailsPage.instructButton().should('not.exist')
            break;
        case "Take No Action":
            meetingDetailsPage.takeNoActionButton().should('not.exist')
            break;
        default:
            break;
    }
})

And('I export the ballot status report', () => {
    meetingDetailsPage.exportButtonDropdown().click()
    meetingDetailsPage.exportBallotStatusReportButton().click()
    meetingDetailsPage.pdfRadio().click()
    meetingDetailsPage.exportButton().click()
})

Then('A toast message appears', () => {
    meetingDetailsPage.toastMessage().should('contain.text', constants.messages.toast.EXPORT_INITIATED)
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

Then('I should see a message that contains the text {string}', (message) => {
    meetingDetailsPage.pageBody().contains(message)
})

And('I should be able to verify the UI shows filename with "..." and its extension is .pdf', () => {
    meetingDetailsPage.controversyAlertLink().should('contain.text', '...')
    //due to the page load issue when downloading a file, below code will click on download link
    //and then refresh page after 5 seconds so that the script does not fail
    cy.window().document().then(function (doc) {
        doc.addEventListener('click', () => {
            setTimeout(function () { doc.location.reload() }, 5000)
        })
        meetingDetailsPage.controversyAlertLink().invoke('removeAttr', 'target').click()
    })
    cy.readFile(`${Cypress.config('downloadsFolder')}\\AutomationTest123.pdf`).should((fileContent) => {
        expect(fileContent.length).to.be.gt(100)
    })
})

And('I clear the rationales for VAM entries and VAP entries and add rationales for remaining proposals', () => {
    meetingDetailsPage.voteCardRow().then(($rows) => {
        $rows.each((index, value) => {
            const vamrec = Cypress.$(value).find('td:nth-child(3)').text()
            const vaprec = Cypress.$(value).find('td.vote-card-policy-rec').text()
            var selected = Cypress.$(value).find(':selected').text()
            if (!vaprec.includes('Non Voting')) {
                if ((vaprec.toLowerCase() !== selected.toLowerCase()) || (vamrec.toLowerCase() !== selected.toLowerCase())) {
                    cy.get(`#md-votecard-grid-results > tr:nth-child(${index + 1}) > td.cell-with-rationale > div > div > span`)
                        .scrollIntoView()
                        .click({ force: true })
                    cy.get(
                        `#md-votecard-grid-results > tr:nth-child(${index + 1}) > td.cell-with-rationale > div > div > div > div.editable-input > textarea`
                    ).clear({ force: true })
                    cy.get(
                        `#md-votecard-grid-results > tr:nth-child(${index + 1
                        }) > td.cell-with-rationale > div > div > div > div.editable-input > div.editable-buttons > button.js-editable-submit.secondary.blue.btn-update`
                    ).click({ force: true })
                } else {
                    cy.get(`tr:nth-child(${index + 1}) > td.cell-with-rationale > div > div > span`)
                        .scrollIntoView()
                        .click({ force: true })
                    cy.get(
                        `#md-votecard-grid-results > tr:nth-child(${index + 1}) > td.cell-with-rationale > div > div > div > div.editable-input > textarea`
                    ).clear({ force: true })
                    cy.get(
                        `#md-votecard-grid-results > tr:nth-child(${index + 1}) > td.cell-with-rationale > div > div > div > div.editable-input > textarea`
                    ).type('test', { force: true })
                    cy.get(
                        `#md-votecard-grid-results > tr:nth-child(${index + 1
                        }) > td.cell-with-rationale > div > div > div > div.editable-input > div.editable-buttons > button.js-editable-submit.secondary.blue.btn-update`
                    ).click({ force: true })
                }
            }
        })
    })
})

And('I clear the rationales for VAM entries and add rationales for other proposals', () => {
    meetingDetailsPage.voteCardRow().then(($rows) => {
        $rows.each((index, value) => {
            const rec = Cypress.$(value).find('td:nth-child(3)').text()
            var selected = Cypress.$(value).find(':selected').text()
            if (!rec.includes('Non Voting')) {
                if (rec.toLowerCase() !== selected.toLowerCase()) {
                    cy.get(`#md-votecard-grid-results > tr:nth-child(${index + 1}) > td.cell-with-rationale > div > div > span`)
                        .scrollIntoView()
                        .click({ force: true })
                    cy.get(
                        `#md-votecard-grid-results > tr:nth-child(${index + 1}) > td.cell-with-rationale > div > div > div > div.editable-input > textarea`
                    ).clear({ force: true })
                    cy.get(
                        `#md-votecard-grid-results > tr:nth-child(${index + 1
                        }) > td.cell-with-rationale > div > div > div > div.editable-input > div.editable-buttons > button.js-editable-submit.secondary.blue.btn-update`
                    ).click({ force: true })
                } else {
                    cy.get(`tr:nth-child(${index + 1}) > td.cell-with-rationale > div > div > span`)
                        .scrollIntoView()
                        .click({ force: true })
                    cy.get(
                        `#md-votecard-grid-results > tr:nth-child(${index + 1}) > td.cell-with-rationale > div > div > div > div.editable-input > textarea`
                    ).clear({ force: true })
                    cy.get(
                        `#md-votecard-grid-results > tr:nth-child(${index + 1}) > td.cell-with-rationale > div > div > div > div.editable-input > textarea`
                    ).type('test', { force: true })
                    cy.get(
                        `#md-votecard-grid-results > tr:nth-child(${index + 1
                        }) > td.cell-with-rationale > div > div > div > div.editable-input > div.editable-buttons > button.js-editable-submit.secondary.blue.btn-update`
                    ).click({ force: true })
                }
            }
        })
    })
})

And('I clear the rationales for VAP entries and add rationales for other proposals', () => {
    meetingDetailsPage.voteCardRow().then(($rows) => {
        $rows.each((index, value) => {
            const rec = Cypress.$(value).find('td.vote-card-policy-rec').text()
            var selected = Cypress.$(value).find(':selected').text()
            if (!rec.includes('Non Voting')) {
                if (rec.toLowerCase() !== selected.toLowerCase()) {
                    cy.get(`#md-votecard-grid-results > tr:nth-child(${index + 1}) > td.cell-with-rationale > div > div > span`)
                        .scrollIntoView()
                        .click({ force: true })
                    cy.get(
                        `#md-votecard-grid-results > tr:nth-child(${index + 1}) > td.cell-with-rationale > div > div > div > div.editable-input > textarea`
                    ).clear({ force: true })
                    cy.get(
                        `#md-votecard-grid-results > tr:nth-child(${index + 1
                        }) > td.cell-with-rationale > div > div > div > div.editable-input > div.editable-buttons > button.js-editable-submit.secondary.blue.btn-update`
                    ).click({ force: true })
                } else {
                    cy.get(`tr:nth-child(${index + 1}) > td.cell-with-rationale > div > div > span`)
                        .scrollIntoView()
                        .click({ force: true })
                    cy.get(
                        `#md-votecard-grid-results > tr:nth-child(${index + 1}) > td.cell-with-rationale > div > div > div > div.editable-input > textarea`
                    ).clear({ force: true })
                    cy.get(
                        `#md-votecard-grid-results > tr:nth-child(${index + 1}) > td.cell-with-rationale > div > div > div > div.editable-input > textarea`
                    ).type('test', { force: true })
                    cy.get(
                        `#md-votecard-grid-results > tr:nth-child(${index + 1
                        }) > td.cell-with-rationale > div > div > div > div.editable-input > div.editable-buttons > button.js-editable-submit.secondary.blue.btn-update`
                    ).click({ force: true })
                }
            }
        })
    })
})

And('I enter rationales for all proposals in the meeting', () => {
    meetingDetailsPage.voteCardRow().then(($rows) => {
        $rows.each((index, value) => {
            const rec = Cypress.$(value).find('td.vote-card-policy-rec').text();
            if (!rec.includes('Non Voting')) {
                cy.get(`tr:nth-child(${index + 1}) > td.cell-with-rationale > div > div > span`)
                    .scrollIntoView()
                    .click({ force: true })
                cy.get(
                    `#md-votecard-grid-results > tr:nth-child(${index + 1}) > td.cell-with-rationale > div > div > div > div.editable-input > textarea`
                ).clear({ force: true })
                cy.get(
                    `#md-votecard-grid-results > tr:nth-child(${index + 1}) > td.cell-with-rationale > div > div > div > div.editable-input > textarea`
                ).type('test rationale', { force: true })
                cy.get(
                    `#md-votecard-grid-results > tr:nth-child(${index + 1
                    }) > td.cell-with-rationale > div > div > div > div.editable-input > div.editable-buttons > button.js-editable-submit.secondary.blue.btn-update`
                ).click({ force: true })
            }
        })
    })
})

Then('the following alert is displayed in Vote Tally section {string}', (message) => {
    meetingDetailsPage.validationMessage().contains(message);
})

Then('I check the Job Number hyperlink with the Job Number of {string} and {string}', (jobNumberOne, jobNumberTwo) => {
    meetingDetailsPage.jobNumberLink(jobNumberOne).should('be.visible');
    meetingDetailsPage.jobNumberLink(jobNumberTwo).should('be.visible');
})

Then('the given agendas appears on the page', () => {

    var voteCard = [
        'Elect Alain Bouchard',
        'Elect Paule Doré',
        'Elect Julie Godin',
        'Elect Serge Godin',
        'Elect André Imbeau',
        'Elect Gilles Labbé',
        'Elect Michael B. Pedersen',
        'Elect Stephen S. Poloz',
        'Elect Mary Powell',
        'Elect Alison C. Reed',
        'Elect Michael E. Roach',
        'Elect George D. Schindler',
        'Elect Kathy N. Waller',
        'Elect Joakim Westh',
        'Elect Frank Witter',
        'Appointment of Auditor and Authority to Set Fees',
        'Shareholder Proposal Regarding Report on Non-Management Employee Representation on the Board',
        'Shareholder Proposal Regarding French as Official Company Language',
    ];

    voteCard.forEach(function (proposals) {
        cy.contains(proposals);
    });

})

And('I can verify that the Account filter has the value {string}', (value) => {
    meetingDetailsPage.accountButton().click()
    meetingDetailsPage.accountDiv().should('contain.text', value)
    meetingDetailsPage.cancelAccountButton().click({ scrollBehavior: false })
})

And('I can verify that the Account Group filter has the value {string}', (value) => {
    meetingDetailsPage.accountGroupButton().click()
    meetingDetailsPage.accountGroupDiv().should('contain.text', value)
    meetingDetailsPage.cancelAccountGroupButton().click({ scrollBehavior: false })
})

And('I can verify that the vote card summary remains unchanged when user changes the filters on {string}', (filterValue) => {
    let preFilterTotalVoted, preFilterTotalNotVoted, postFilterTotalVoted, postFilterTotalNotVoted
    meetingDetailsPage.totalVotedLink().should(($el) => {
        return preFilterTotalVoted = $el.text()
    })
    meetingDetailsPage.totalNotVotedLink().should(($el) => {
        return preFilterTotalNotVoted = $el.text()
    })
    //Change Filter Value based on Account / Account Group
    if (filterValue.includes('account group')) {
        meetingDetailsPage.accountGroupButton().click()
        meetingDetailsPage.accountGroupButton().invoke('text').then((text) => {
            if (text.includes('(1)')) {
                meetingDetailsPage.selectAllAccountGroupCheckbox().check({ force: true })
            } else {
                meetingDetailsPage.selectAllAccountGroupCheckbox().uncheck({ force: true })
                meetingDetailsPage.individualAccountGroupCheckbox().eq(0).check({ force: true })
            }
        })
        meetingDetailsPage.updateAccountGroupButton().click({ scrollBehavior: false })
    } else {
        meetingDetailsPage.accountButton().click()
        meetingDetailsPage.accountButton().invoke('text').then((text) => {
            if (text.includes('(1)')) {
                meetingDetailsPage.selectAllAccountCheckbox().check({ force: true })
            } else {
                meetingDetailsPage.selectAllAccountCheckbox().uncheck({ force: true })
                meetingDetailsPage.individualAccountCheckbox().eq(0).check({ force: true })
            }
        })
        meetingDetailsPage.updateAccountButton().click({ scrollBehavior: false })
    }
    //Wait for page to load and then compare values
    meetingDetailsPage.getLoadingSpinner().should('not.be.visible')
    meetingDetailsPage.totalVotedLink().should(($el) => {
        postFilterTotalVoted = $el.text()
        expect(postFilterTotalVoted).to.equal(preFilterTotalVoted)
    })
    meetingDetailsPage.totalNotVotedLink().should(($el) => {
        postFilterTotalNotVoted = $el.text()
        expect(postFilterTotalNotVoted).to.equal(preFilterTotalNotVoted)
    })
})

Then('I verify that all the relevant API calls for meeting details page are made', () => {
    //35 API Calls
    cy.statusCode200('@CURRENT_USER')
    cy.statusCode200('@SETTINGS_READ')
    cy.statusCode200('@GET_CUSTOMER_SETTINGS')
    cy.statusCode200('@RATIONALE_LIBRARY')
    cy.statusCode200('@VOTE_CARD')
    cy.statusCode200('@VOTE_CARD_GRID_STATE')
    cy.statusCode200('@GET_MEETING_ID')
    cy.statusCode200('@VOTE_RESULTS')
    cy.statusCode200('@COMMENTS_IDENTITY_SEARCH')
    cy.statusCode200('@WORKFLOW_RESEARCH_INFO')
    cy.statusCode200('@RELATED_MEETINGS')
    cy.statusCode200('@MEETING_SECURITY_WATCHLIST')
    cy.statusCode200('@META_BALLOTS_GRID')
    cy.statusCode200('@BALLOTS_GRID_STATE')
    cy.statusCode200('@ASSIGNED_MEETING_ID')
    cy.statusCode200('@VOTE_AGAINST_POLICY_WL')
    cy.statusCode200('@MEETING_DETAILS_ACTIVITY')
    cy.statusCode200('@GET_FILINGS')
    cy.statusCode200('@VOTE_TALLY')
    cy.statusCode200('@VOTE_TALLY_OWNERSHIP')
    cy.statusCode200('@SEARCH_BALLOTS_WITH_SIMILAR_AGENDAS')
    cy.statusCode200('@COMMENTS')
    cy.statusCode200('@SHARE_MEETING_MODAL')
})

And('I click on the control number for {string}', (controlNumber) => {
    meetingDetailsPage.controlNumberLink().contains(constants.MEETINGID[controlNumber]).click()
})

Then('I should be able to verify the pagination works as expected on the ballot section page', () => {
    //Step 3 - verify the pagination default is set to '10'.
    meetingDetailsPage.ballotsPerPageDropdown().invoke('attr', 'style', 'display: block')
    meetingDetailsPage.ballotsPerPageDropdown().select('10', { timeout: 50000 })
    meetingDetailsPage.ballotsPerPageDropdownText().then(function (val) {
        const numBallots = val.text()
        expect(numBallots).to.equal('10')
    })

    meetingDetailsPage.ballotsPerPageDropdown().find(':selected').should('have.text', '10')

    //Step 3 -Now click the pagination dropdown and change the pagination to
    cy.SetPaginationAndVerify('50', 50)

    //Step 5 - Now click the pagination dropdown and change the pagination to 20 and log out of the application.
    cy.SetPaginationAndVerify('20', 20)
})

Then('I should be able to verify the pagination is displayed on the ballot section page', () => {
    const custColumns = ['Custodian Account Number', 'Custodian Id', 'Custodian Name', 'Customer Account Name', 'Customer Account Number',]
    const columnLabels = ['BallotsGrid3', 'BallotsGrid17', 'BallotsGrid18', 'BallotsGrid2', 'BallotsGrid11']
    //Step 3 - User Clicks on 'Columns' button
    meetingDetailsPage.ballotsColumnsDropdown().click()
    meetingDetailsPage.ballotsColumnsModal().invoke('attr', 'style', 'display: block')

    //Step 4 - Verify that the user enter a character(Eg : Say 'Cus') in the responsive search of the "Columns" Modal
    meetingDetailsPage.ballotsColumnsInput().type('Cus')

    columnLabels.forEach((column) => {
        meetingDetailsPage.ballotsColumnsLabelFor(column).should('be.visible')
    })

    cy.get('#currently-selected-criteria > ul > li').first().invoke('attr', 'style', 'display: block')
    custColumns.forEach((col) => {
        meetingDetailsPage.ballotsColumnsLabelValue(col).check({ force: true }).should('be.checked')
    })

    meetingDetailsPage.ballotsColumnsApplyButton().click()

    //Step 5 - Navigate to the ballot section & click on the Columns button
    meetingDetailsPage.ballotsColumnsDropdown().click()
    meetingDetailsPage.ballotsColumnsModal().invoke('attr', 'style', 'display: block')
    custColumns.forEach((col) => {
        meetingDetailsPage.ballotsColumnsLabelValue(col).should('be.checked')
    })

    //Step 6 - Verify that the Default Field 'Control Number' is not available in the 'Columns' modal
    meetingDetailsPage.ballotsColumnsList().then(($rows) => {
        $rows.each((index, value) => {
            const mname = Cypress.$(value).find(`label`).text()
            expect(mname).to.not.equal('Control Number')
        })
    })
})

Then('I should be able to verify the chosen pagination is autosaved on the ballot section page', () => {
    meetingDetailsPage.ballotsPerPageDropdownText().then(function (val) {
        const numBallots = val.text()
        expect(numBallots).to.equal('10')
    })

    //Step7 - Set pagination to 50 and verify ballot displayed row count
    cy.SetPaginationAndVerify('50', 50)

    //Step 8 - Now change pagination  to "10"
    cy.SetPaginationAndVerify('10', 10)
})

Then('I should be able to toggle between "Management" Multiple Agendas in the Vote card page for specific meeting type', () => {
    //Step 4 - Click on the 'Management' vote card dropdown
    meetingDetailsPage.managementDropdown().invoke('attr', 'class', 'dropdown related-meetings-list open')

    //Step 5 - Verify 'Ballots' section will only display specific 'Management' agenda type ballot details [Eg : Management - 934050888]
    meetingDetailsPage.ballotSectionSpan().then(function (val) {
        const agenda = val.text()
        expect(agenda).to.include(constants.MEETINGID.NBCOMMO_AGENDA1)
    })
    meetingDetailsPage.ballotSectionLinks().then(function (ctrlnum) {
        const displayedCtrlNum = ctrlnum.text()
        expect(displayedCtrlNum).to.include(constants.MEETINGID.NBCOMMO_CTRLNUM1)
    })

    //Step 6 - Select another 'Management' Vote card in the dropdown list[Eg: Management -934050915]
    //Expected - Vote Card page gets refreshed and 'Ballots' section gets updated with the 'Agenda Type' as 'Management' and 'Ballot Control Number' as different to that of previous 'Management' number
    meetingDetailsPage.ballotSectionThirdLink().click()
    cy.wait('@GET_AGENDA')

    meetingDetailsPage.ballotSectionSpan().then(function (val) {
        const agenda = val.text()
        expect(agenda).to.include(constants.MEETINGID.NBCOMMO_AGENDA2)
    })

    //verify all agendas can can be listed
    meetingDetailsPage.managementDropdown().invoke('attr', 'class', 'dropdown related-meetings-list open')
    meetingDetailsPage.ballotSectionFourthLink().click()
    cy.wait('@GET_AGENDA')

    meetingDetailsPage.ballotSectionSpan().then(function (val) {
        const agenda = val.text()
        expect(agenda).to.include(constants.MEETINGID.NBCOMMO_AGENDA3)
    })
})

Then('the meeting id should match the expected current meeting id and previous meeting id', () => {
    var idMeeting = [1101707, 1129790]
    meetingDetailsPage.nextMeetingLink().click({ force: true })
    /* Click Previous button, get Meeting ID for that meeting and verify it is same meeting id as stored in a variable as 
    first meeting id*/
    meetingDetailsPage.previousMeetingLink().click({ force: true })
    cy.location('href').should('include', idMeeting[0])
    cy.statusCode204('@LOGGER')
})

And('the company id should match the expected company id', () => {
    var idCompany = [38673]
    // Navigate to Company Page, get company id and verify it is same company id as stored in a variable as first company id
    meetingDetailsPage.companyNameLink().click({ force: true })
    cy.location('href').should('include', idCompany[0])
})

And('I verify all listed items Meetings dropdown check for each in list includes the text "20"', () => {
    /* Click into Meetings dropdown on Company page and verify all listed items Meetings dropdown check for each in list
    includes the text '20' */
    meetingDetailsPage.meetingsDateDropdown().should('be.visible').click()
    meetingDetailsPage.meetingsDateDropdownModal().then(($rows) => {
        for (let i = 1; i < $rows.length - 1; i++) {
            cy.get(`#related-meetings > li > ul > li:nth-child(${i + 1}) > a > span:nth-child(1)`).then(
                (fn) => {
                    const fntxt = fn.text()
                    expect(fntxt).to.include('20')
                })
        }
    })
})

Then('the filtered results should display the data only for vote against Glass Lewis', () => {
    //arrays to store GL recommendations and vote decisons
    let GLvals = []
    let Selected = []

    meetingDetailsPage.allTableRows().eq(0).within(() => {
        meetingDetailsPage.meetingDetailsLink().click({ force: true })
    })

    meetingDetailsPage.voteCardRow().then(($rows) => {
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

    meetingDetailsPage.allTableRows().eq(0).within(() => {
        meetingDetailsPage.meetingDetailsLink().click({ force: true })
    })

    meetingDetailsPage.voteCardRow().then(($rows) => {
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
    meetingDetailsPage.shareMeetingUsernameInput().type('Calpers', { delay: 50 })
    cy.wait('@IDENTITY_SEARCH')
    meetingDetailsPage.shareMeetingUsernameResults().eq(0).should('be.visible').click({ force: true })
    //Step 8 - Click Add button
    meetingDetailsPage.shareMeetingAddButton().click()
    //Step 9 - Add Comment "This is a test comment"
    meetingDetailsPage.shareMeetingCommentInput().type('This is a test comment')
    //Step 10 - Click Share button
    meetingDetailsPage.shareMeetingConfirmButton().click()
})

Then('I should see a request saved message', () => {
    meetingDetailsPage.toastMessage().should('contain.text', constants.messages.toast.SHARE_MEETING_REQUEST_SAVED)
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

Then('the vote tally should be updated', () => {
    cy.contains('Instructed successfully')
    // Step 11 - Verify Vote Tally gets updated
    cy.get('@totalNotVoted').then((vote) => {
        cy.contains(`Review Required (${vote})`)
        meetingDetailsPage.totalNotVotedLink().should('have.text', vote)
        meetingDetailsPage.totalVotedLink().should('have.text', 0)
    })
})

And('the activity should match against the ballot activity log', () => {
    // Step 12 - Verify the activity section and match the activity against the Ballot activity log by clicking on the control number hyperlink
    let arrMeetingActivity = []
    let arrMeetingUser = []
    let arrMeetingDate = []
    let arrMeetingFinal = []

    // tr:nth-child(n+2) => this block of code is to ignore the first line, which is "First Ballot Received"
    meetingDetailsPage.ballotRowTwo().then(($rows) => {
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

    meetingDetailsPage.ballotGridControlNumberLink().eq(0).scrollIntoView().click({ force: true })
    cy.wait('@BALLOT_ACTIVITY_LOG')
    meetingDetailsPage.ballotActivityModal().should('be.visible')

    let arrBallotActivity = []
    let arrBallotUser = []
    let arrBallotDate = []
    let arrBallotFinal = []

    // tr:not(:last-child) => this block of code is to ignore the last line, which is "Created"
    meetingDetailsPage.ballotRowSecondLast().then(($rows) => {
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

Then('I am able to iterate through rationales, add text entry, save and verify toast message for each entry', () => {
    meetingDetailsPage.voteCardRow().each(($ele, $idx) => {
        cy.get(`#md-votecard-grid-results > tr:nth-child(${$idx + 1}) > td:nth-child(3)`)

        const voting = $ele.text()
        if (!voting.includes('Non Voting')) {
            cy.get(`tr:nth-child(${$idx + 1}) > td.cell-with-rationale > div > div > span`)
                .scrollIntoView()
                .click({ force: true })
            cy.get(
                `tr:nth-child(${$idx + 1}) > td.cell-with-rationale > div > div > div > div.editable-input > textarea`
            ).clear({ force: true })
            cy.get(
                `tr:nth-child(${$idx + 1}) > td.cell-with-rationale > div > div > div > div.editable-input > textarea`
            ).type('test', { force: true })
            cy.get(
                `tr:nth-child(${$idx + 1
                }) > td.cell-with-rationale > div > div > div > div.editable-input > div.editable-buttons > button.js-editable-submit.secondary.blue.btn-update`
            ).click({ force: true })
        }
        if ($idx > 4) {
            return false
        }
    })
})

Then('I am able to add meeting note and post private comment', () => {
    //Test Meeting note entry
    meetingDetailsPage.meetingNoteSpan().should('be.visible').click({ force: true })
    meetingDetailsPage.meetingNoteInput().should('be.visible').clear({ force: true })
    meetingDetailsPage.meetingNoteInput().type('The quick brown fox jumps over a lazy dog - ~!@#$%^&*-_=+[]|,./<>? +')
    meetingDetailsPage.meetingNoteSubmitButton().click()
    meetingDetailsPage.toastMessage().should('contain.text', 'Meeting note saved')

    //Post Private Comment
    meetingDetailsPage.sharedWithDropdown().each(($el, index) => {
        cy.wrap($el)
        $el.get(`.k-button > :nth-child(${index}) > span`)
        meetingDetailsPage.deleteButton().click({ force: true })
    })
    meetingDetailsPage.commentTextArea().type('hello CalPERS | ExtUser Sagar Maheshwari')
    meetingDetailsPage.shareVisibilityDropdown().select('Private')
    meetingDetailsPage.postCommentButton().click()
    meetingDetailsPage.toastMessage().should('contain.text', 'Comment saved')
})

Then('I can see the Ballot section under the comments section', () => {
    // Step 5 - Verify User can see Ballot Section under the Comments section
    meetingDetailsPage.ballotSectionDiv().should('be.visible')
    meetingDetailsPage.ballotsColumnsDropdown().click()
    meetingDetailsPage.ballotsColumnsModal().invoke('attr', 'style', 'display: block')
    // Step 6 - Displays the modal with the list of fields , Apply & Cancel buttons
    meetingDetailsPage.ballotApplyButton().eq(1).should('be.visible')
    meetingDetailsPage.ballotCancelButton().eq(1).should('be.visible')
})

And('I can verify that the default field "Control Number" is not available in the "Columns" modal', () => {
    // Step 7 - Verify that the Default Field 'Control Number' is not available in the 'Columns' modal
    meetingDetailsPage.ballotSectionData()
        .find('#mytable > ul > li')
        .each(($column) => {
            expect($column.text().trim()).to.not.equal('Control Number')
        })
})

And('I can verify that the user gets the appropriate results for "Custodian" in the responsive search of the "Columns" Modal', () => {
    // Step 8 - Verify that the user enter a character (e.g.: 'Custodian') in the responsive search of the "Columns" Modal
    meetingDetailsPage.ballotSectionCompanyNameInput().last().type('Custodian')

    meetingDetailsPage.ballotSectionData()
        .find('#mytable > ul > li')
        .each(($column) => {
            expect($column.text().trim()).to.have.string('Custodian')
        })

    meetingDetailsPage.ballotCancelButton().eq(1).click()
})

And('I can verify that the ballot section displays just the results based on the policy filtered', () => {
    // Check which position the column "Policy ID" is and wrapped into the object index
    meetingDetailsPage.ballotTableHeadings().should('be.visible').each(($headers, index) => {
        if ($headers.text().trim() == 'Policy ID') {
            cy.wrap(index).as('index')
            // Check that the "Policy ID" column will display the expected value
            cy.get('@index').then((pos) => {
                cy.get(`#md-ballots-grid-results > tr > td:nth-child(${pos + 1})`).each(($ballot) => {
                    expect(workflowPage.workflowFilterData.policy).to.eq($ballot.text().trim())
                })
            })
            // Ends the loop when the column is found
            return false
        }
    })
})

And('I clear the list of watchlists', () => {
    //save meeting url
    cy.url().then((url) => {
        meetingId = url
    })
    meetingDetailsPage.watchListsDropdown().click({ force: true })
    meetingDetailsPage.systemWatchListsDiv().each((el) => {
        cy.wrap(el).find(':checkbox').uncheck({ force: true })
    })
    meetingDetailsPage.systemWatchListSecondCheckbox().check({ force: true })
    meetingDetailsPage.systemWatchListSecondCheckboxLabel().then(function (el) {
        const syswl = el.text()
        expect(syswl.includes(`2020 Pay-for-Performance 'F' Grades`)).to.be.true
    })
    meetingDetailsPage.systemWatchListUpdateButton().click({ force: true })
    meetingDetailsPage.watchListsDropdownLabelNumber().eq(1).should('have.text', '1')
})

When('I navigate to the meeting page from the previous scenario', () => {
    cy.visit(meetingId)
})

/*Functions*/
//compare arrays
function arraysEqual(a1, a2) {
    return JSON.stringify(a1) == JSON.stringify(a2)
}