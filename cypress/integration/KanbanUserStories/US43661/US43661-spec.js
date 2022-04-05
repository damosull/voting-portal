import { MEETINGID, USER } from "../../../support/constants";
import '../../../support/commands.js';
const unixTime = Math.floor(Date.now() / 1000);

describe('User Story US43661 tests', function () {
    // Test Case 44721 : https://dev.azure.com/glasslewis/Development/_workitems/edit/44721
    it(`Live ballots with meeting date for future ballots whose meeting date has passed/Revote and no rationale entered for vote against policy`, function () {

        cy.loginWithAdmin(USER.AUTOMATIONINTERNAL);
        cy.visit('/Workflow');
/*
        //Alias csrf token
        cy.wait('@WORKFLOW_EXPANSION').then((resp) => {
            var csrftoken = resp.request.headers.csrftoken;
            cy.wrap(csrftoken).as('csrftoken');
        });
        cy.wait('@WORKFLOW_SECURITIES_WATCHLIST');
*/
        //get customer ID
        /*
        cy.getCustomerIDFromDB('Russell Investments').as('custid')

        //verify CanModifyVotesRationaleAfterMeetingDate = true
        //& RequireRationaleVap = true for Customer
        cy.get('@custid').then(function (cid) {
            const settings = `?&pCustomerID=${cid}&_=${unixTime}`;
            cy.TurnOnCustomerSetting(settings, 'CanModifyVotesRationaleAfterMeetingDate')
            cy.TurnOnCustomerSetting(settings, 'RequireRationaleVap')
        });
        */
        cy.logout()

        //Step 1
        cy.loginWithAdmin(USER.RUSSELL);
        cy.visit('/Workflow');
        cy.wait('@WORKFLOW_SECURITIES_WATCHLIST');
        cy.removeAllExistingSelectedCriteria();
        //Step 2 - Open VAP meeting and change meeting date to today+10 days
        cy.AddTenDaysToMeetingDates(MEETINGID.RSNCVAP)

        //User Clicks on the valid company in the Workflow page
        cy.visit('MeetingDetails/Index/' + MEETINGID.RSNCVAP)
        cy.wait('@GET_AGENDA')
        cy.wait('@MEETING_SECURITY_WATCHLIST');

        cy.get('#btn-unlock').should('be.visible').should('have.text', 'Change Vote or Rationale').click({ force: true });
        cy.verifyMeetingOptionButtons();

        //Step 3 -
        //For any proposals that the vote option is against policy,clear the rational field and enter rationales for all
        //other votes - Note : Always ignore Non-Voting proposals
        ClearRationaleForVAPEntriesAndAddRationaleVotingWithPolicy();

        //Step 4 - user clicks on vote/revote button
        cy.get('#btn-vote-now').click()
        cy.wait('@VOTE_REQUEST_VALIDATION')
        //check override checkbox 
        //cy.get('[data-bind="visible: override.votedBallotsBoxVisible"] > .ccb').click()

        // Step 5 - Proceed button should be disabled
        //cy.get('.floatright > .green').should('be.not.visible')

        //Then there should be a warning message that states "You are voting against policy for proposal X"
        //cy.get('[data-bind="visible: requireNoteOnVam|| requireNoteOnVap"] > :nth-child(1)').should('include.text', 'Please enter a rationale for all mentioned items and for all selected ballots in order to vote this meeting:')
        //cy.get('[data-bind="visible: requireNoteOnVap"]').should('include.text', 'Vote(s) against policy without a rationale for proposal')
        cy.get('[data-bind="visible: requireNoteOnVap"]').should('include.text', 'Vote(s) against policy on proposal(s):')
        cy.get('.floatright > .gray').should('be.visible').click()


    })

    // Test Case 44726 : https://dev.azure.com/glasslewis/Development/_workitems/edit/44726
    it.only(`Live ballots with meeting date for past ballots whose meeting date has passed/Revote and no rationale entered for vote against policy`, function () {

        cy.loginWithAdmin(USER.AUTOMATIONINTERNAL);
        cy.visit('/Workflow');
/*
        //Alias csrf token
        cy.wait('@WORKFLOW_EXPANSION').then((resp) => {
            var csrftoken = resp.request.headers.csrftoken;
            cy.wrap(csrftoken).as('csrftoken');
        });
        cy.wait('@WORKFLOW_SECURITIES_WATCHLIST');
*/
        //get customer ID
        //cy.getCustomerIDFromDB('Russell Investments').as('custid')

        //verify CanModifyVotesRationaleAfterMeetingDate = true
        //& RequireRationaleVap = true for Customer
        /*
        cy.get('@custid').then(function (cid) {
            const settings = `?&pCustomerID=${cid}&_=${unixTime}`;
            cy.TurnOnCustomerSetting(settings, 'CanModifyVotesRationaleAfterMeetingDate')
            cy.TurnOnCustomerSetting(settings, 'RequireRationaleVap')
        });
        */
        cy.logout()

        //Step 2 Login as Russell Ext Admin User
        cy.loginWithAdmin(USER.RUSSELL);
        cy.visit('/Workflow');
        cy.wait('@WORKFLOW_SECURITIES_WATCHLIST');
        cy.removeAllExistingSelectedCriteria();

        //Step 3 - Open VAP meeting and change meeting date to today -10 days
        cy.SetMeetingDateXdaysFromCurrent(MEETINGID.RSNCVAP2, -10)

        cy.visit('MeetingDetails/Index/' + MEETINGID.RSNCVAP2)
        cy.wait('@GET_AGENDA')
        cy.wait('@WORKFLOW_SECURITIES_WATCHLIST');

        cy.get('#btn-unlock').should('be.visible').should('have.text', 'Change Vote or Rationale').click({ force: true });
        cy.verifyMeetingOptionButtons();

        //Step 4 -
        //For any proposals that the vote option is against policy,clear the rational field and enter rationales for all
        //other votes - Note : Always ignore Non-Voting proposals
        ClearRationaleForVAPEntriesAndAddRationaleVotingWithPolicy();

        //Step 5 - user clicks on vote/revote button
        cy.get('#btn-vote-now').click()
        cy.wait('@VOTE_REQUEST_VALIDATION')
        //check override checkbox 
        cy.get('[data-bind="visible: override.votedBallotsBoxVisible"] > .ccb').click()

        // Step 6 - Proceed button should be disabled
        //cy.get('.floatright > .green').should('be.not.visible')

        //Then there should be a warning message that states "You are voting against policy for proposal X"
        //cy.get('[data-bind="visible: requireNoteOnVam|| requireNoteOnVap"] > :nth-child(1)').should('include.text', 'Please enter a rationale for all mentioned items and for all selected ballots in order to vote this meeting:')
        //cy.get('[data-bind="visible: requireNoteOnVap"]').should('include.text', 'Vote(s) against policy without a rationale for proposal')
        cy.get('[data-bind="visible: requireNoteOnVap"]').should('include.text', 'Vote(s) against policy on proposal(s):')
        cy.get('.floatright > .gray').should('be.visible').click()


    })

    function ClearRationaleForVAPEntriesAndAddRationaleVotingWithPolicy(){
        cy.get('#md-votecard-grid-results > tr').then(($rows) => {
            $rows.each((index, value) => {
              const rec = Cypress.$(value).find('td.vote-card-policy-rec').text();
              var selected = Cypress.$(value).find(':selected').text();
              if (!rec.includes('Non Voting')) {
                if (rec.toLowerCase() !== selected.toLowerCase()) {
                  cy.get(`#md-votecard-grid-results > tr:nth-child(${index + 1}) > td.cell-with-rationale > div > div > span`)
                    .scrollIntoView()
                    .click({ force: true });
                  cy.get(
                    `#md-votecard-grid-results > tr:nth-child(${index + 1}) > td.cell-with-rationale > div > div > div > div.editable-input > textarea`
                  ).clear({ force: true });
                  cy.get(
                    `#md-votecard-grid-results > tr:nth-child(${index + 1
                    }) > td.cell-with-rationale > div > div > div > div.editable-input > div.editable-buttons > button.js-editable-submit.secondary.blue.btn-update`
                  ).click({ force: true });
                } else {
                  cy.get(`tr:nth-child(${index + 1}) > td.cell-with-rationale > div > div > span`)
                    .scrollIntoView()
                    .click({ force: true });
                  cy.get(
                    `#md-votecard-grid-results > tr:nth-child(${index + 1}) > td.cell-with-rationale > div > div > div > div.editable-input > textarea`
                  ).clear({ force: true });
                  cy.get(
                    `#md-votecard-grid-results > tr:nth-child(${index + 1}) > td.cell-with-rationale > div > div > div > div.editable-input > textarea`
                  ).type('test', { force: true });
                  cy.get(
                    `#md-votecard-grid-results > tr:nth-child(${index + 1
                    }) > td.cell-with-rationale > div > div > div > div.editable-input > div.editable-buttons > button.js-editable-submit.secondary.blue.btn-update`
                  ).click({ force: true });
                }
              }
            })
          })
    }

})