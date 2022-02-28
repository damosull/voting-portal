import '../../../../support/commands.js';
import { MEETINGID, USER } from "../../../../support/constants";
import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';

const unixTime = Math.floor(Date.now() / 1000);

Given('I login as Internal User and retrieve Customer ID for {string}', (customer) => {

    cy.loginWithAdmin(USER.AUTOMATIONINTERNAL);
    cy.visit('/Workflow');

    //Alias csrf token
    cy.wait('@WORKFLOW_EXPANSION').then((resp) => {
        var csrftoken = resp.request.headers.csrftoken;
        cy.wrap(csrftoken).as('csrftoken');
    });
    cy.wait('@WORKFLOW_SECURITIES_WATCHLIST');

    //get customer ID
    cy.getCustomerIDFromDB(customer).as('custid')

});

When('I verify customer settings for VAM and VAP', () => {
    //verify CanModifyVotesRationaleAfterMeetingDate = true
    //& RequireRationaleVap = true for Customer
    cy.get('@custid').then(function (cid) {
        const settings = `?&pCustomerID=${cid}&_=${unixTime}`;
        cy.TurnOnCustomerSetting(settings, 'CanModifyVotesRationaleAfterMeetingDate')
        cy.TurnOnCustomerSetting(settings, 'RequireRationaleVap')
        cy.TurnOnCustomerSetting(settings, 'RequireRationaleVam')
    });
    cy.logout()
});

/* When('I verify customer settings for VAM', () => {
    //verify CanModifyVotesRationaleAfterMeetingDate = true
    //& RequireRationaleVap = true for Customer
    cy.get('@custid').then(function (cid) {
        const settings = `?&pCustomerID=${cid}&_=${unixTime}`;
        cy.TurnOnCustomerSetting(settings, 'CanModifyVotesRationaleAfterMeetingDate')
        cy.TurnOnCustomerSetting(settings, 'RequireRationaleVam')
    });
    cy.logout()
}); */



When('I login as External User {string}', (extadm) => {
    cy.loginWithAdmin(extadm);
    cy.visit('/Workflow');
    cy.wait('@WORKFLOW_SECURITIES_WATCHLIST');
    cy.removeAllExistingSelectedCriteria();
});

And('I change meeting date on Russell meeting id 981568 to 10 days in the past and navigate to it', () => {

    cy.SetMeetingDateXdaysFromCurrent(MEETINGID.RSNCVAP2, -10)
    cy.visit('MeetingDetails/Index/' + MEETINGID.RSNCVAP2)
    cy.wait('@GET_AGENDA')
    cy.wait('@MEETING_SECURITY_WATCHLIST');

    cy.get('#btn-unlock').should('be.visible').should('have.text', 'Change Vote or Rationale').click({ force: true });
    cy.verifyMeetingOptionButtons();
});

And('I change meeting date on Russell meeting id 1068747 to 10 days in the future and navigate to it', () => {

    cy.AddTenDaysToMeetingDates(MEETINGID.RSNCVAM1)
    cy.visit('MeetingDetails/Index/' + MEETINGID.RSNCVAM1)
    cy.wait('@GET_AGENDA')
    cy.wait('@MEETING_SECURITY_WATCHLIST');

    cy.get('#btn-unlock').should('be.visible').should('have.text', 'Change Vote or Rationale').click({ force: true });
    cy.verifyMeetingOptionButtons();
});

And('I change meeting date on Russell meeting id {string} to 10 days in the future and navigate to it', (meetid) => {

    cy.AddTenDaysToMeetingDates(meetid)
    cy.visit('MeetingDetails/Index/' + meetid)
    cy.wait('@GET_AGENDA')
    cy.wait('@MEETING_SECURITY_WATCHLIST');

    cy.get('#btn-unlock').should('be.visible').should('have.text', 'Change Vote or Rationale').click({ force: true });
    cy.verifyMeetingOptionButtons();
});

And('I clear the rationales for VAP entries and add rationales for other proposals', () => {
    ClearRationaleForVAPEntriesAndAddRationaleVotingWithPolicy();
});

And('I clear the rationales for VAM entries and add rationales for other proposals', () => {
    ClearRationaleForVAMEntriesAndAddRationaleVotingWithManagement();
});

And('I enter rationales for all proposals in the meeting', () => {
    EnterRationaleTextForAllProposals();
});

And('I clear the rationales for VAM entries and VAP entries and add rationales for remaining proposals', () => {
    ClearRationaleForVAMAndVAPEntriesAndAddRationaleForOtherProposals();
});

And('I click the vote button and check the override checkbox', () => {
    cy.get('#btn-vote-now').click()
    //check override checkbox 
    cy.get('[data-bind="visible: override.votedBallotsBoxVisible"] > .ccb').click()
});

Then('the Proceed button should be disabled', () => {
    //cy.get('.floatright > .green').should('be.not.visible')
});

Then('the Proceed button should be enabled', () => {
    cy.get('.floatright > .green').should('be.visible')
});

And('there should be a warning message that states "You are voting against policy for proposal X"', () => {
    //cy.get('[data-bind="visible: requireNoteOnVam|| requireNoteOnVap"] > :nth-child(1)').should('include.text', 'Please enter a rationale for all mentioned items and for all selected ballots in order to vote this meeting:')
    //cy.get('[data-bind="visible: requireNoteOnVap"]').should('include.text', 'Vote(s) against policy without a rationale for proposal')
    cy.get('[data-bind="visible: requireNoteOnVap"]').should('include.text', 'Vote(s) against policy on proposal(s):')
    cy.get('.floatright > .gray').should('be.visible')
});

And('there should be a warning message that states "You are voting against management for proposal X"', () => {
    //cy.get('[data-bind="visible: requireNoteOnVam|| requireNoteOnVap"] > :nth-child(1)').should('include.text', 'Please enter a rationale for all mentioned items and for all selected ballots in order to vote this meeting:')
    //cy.get('[data-bind="visible: requireNoteOnVam"]').should('include.text', 'Vote(s) against management without a rationale for proposal')

    cy.get('[data-bind="visible: requireNoteOnVap"]').should('include.text', 'Vote(s) against policy on proposal(s):')
    cy.get('.floatright > .gray').should('be.visible')
});


function ClearRationaleForVAMAndVAPEntriesAndAddRationaleForOtherProposals(){
    cy.get('#md-votecard-grid-results > tr').then(($rows) => {
        $rows.each((index, value) => {
          const vamrec = Cypress.$(value).find('td:nth-child(3)').text();
          const vaprec = Cypress.$(value).find('td.vote-card-policy-rec').text();
          var selected = Cypress.$(value).find(':selected').text();
          if (!vaprec.includes('Non Voting')) {
            if ((vaprec.toLowerCase() !== selected.toLowerCase()) || (vamrec.toLowerCase() !== selected.toLowerCase())) {
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
    };

    function ClearRationaleForVAMEntriesAndAddRationaleVotingWithManagement(){
      cy.get('#md-votecard-grid-results > tr').then(($rows) => {
        $rows.each((index, value) => {
          const rec = Cypress.$(value).find('td:nth-child(3)').text();
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
    };

    function EnterRationaleTextForAllProposals(){
      cy.get('#md-votecard-grid-results > tr').then(($rows) => {
        $rows.each((index, value) => {
          const rec = Cypress.$(value).find('td.vote-card-policy-rec').text();
          if (!rec.includes('Non Voting')) {
            cy.get(`tr:nth-child(${index + 1}) > td.cell-with-rationale > div > div > span`)
              .scrollIntoView()
              .click({ force: true });
            cy.get(
              `#md-votecard-grid-results > tr:nth-child(${index + 1}) > td.cell-with-rationale > div > div > div > div.editable-input > textarea`
            ).clear({ force: true });
            cy.get(
              `#md-votecard-grid-results > tr:nth-child(${index + 1}) > td.cell-with-rationale > div > div > div > div.editable-input > textarea`
            ).type('test rationale', { force: true });
            cy.get(
              `#md-votecard-grid-results > tr:nth-child(${index + 1
              }) > td.cell-with-rationale > div > div > div > div.editable-input > div.editable-buttons > button.js-editable-submit.secondary.blue.btn-update`
            ).click({ force: true });
          }
        })
      })
    }

    function ClearRationaleForVAPEntriesAndAddRationaleVotingWithPolicy() {
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