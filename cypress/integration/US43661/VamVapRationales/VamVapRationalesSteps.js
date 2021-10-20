/// <reference types="Cypress" />
import '../../../support/commands.js';
import { MEETINGID } from "../../../support/constants";

import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
const unixTime = Math.floor(Date.now() / 1000);

beforeEach(function () {
    cy.viewport(1100, 900);
    cy.intercept('POST', '**/Api/Data/WorkflowExpansion').as('WorkflowExpansion');
    cy.intercept('POST', '**/Api/Data/WorkflowSecuritiesWatchlists').as('WorkflowSecuritiesWatchlists');
    cy.intercept('GET', '**/Api/Data/MeetingSecurityWatchlists/**').as('MeetingSecurityWatchlists')
    cy.intercept('POST', '**/Api/Data//MdData/GetAgenda').as('getagenda')
    cy.intercept('POST', '**/Api/Data/VoteRequestValidation').as('validation')
});

Given('I login as Internal User and retrieve Customer ID for {string}', (customer) => {

    cy.loginInternalAdm('AutomationInternal');
    cy.visit('/Workflow');

    //Alias csrf token
    cy.wait('@WorkflowExpansion').then((resp) => {
        var csrftoken = resp.request.headers.csrftoken;
        cy.wrap(csrftoken).as('csrftoken');
    });
    cy.wait('@WorkflowSecuritiesWatchlists');

    //get customer ID
    cy.getCustomerIDFromDB(customer).as('custid')

});
When('I verify customer settings for VAP', () => {
    //verify CanModifyVotesRationaleAfterMeetingDate = true
    //& RequireRationaleVap = true for Customer
    cy.get('@custid').then(function (cid) {
        const settings = `?&pCustomerID=${cid}&_=${unixTime}`;
        cy.TurnOnCustomerSetting(settings, 'CanModifyVotesRationaleAfterMeetingDate')
        cy.TurnOnCustomerSetting(settings, 'RequireRationaleVap')
    });
    cy.logout()
});

When('I verify customer settings for VAM', () => {
    //verify CanModifyVotesRationaleAfterMeetingDate = true
    //& RequireRationaleVap = true for Customer
    cy.get('@custid').then(function (cid) {
        const settings = `?&pCustomerID=${cid}&_=${unixTime}`;
        cy.TurnOnCustomerSetting(settings, 'CanModifyVotesRationaleAfterMeetingDate')
        cy.TurnOnCustomerSetting(settings, 'RequireRationaleVam')
    });
    cy.logout()
});



And('I login as External User {string}', (extadm) => {
    cy.loginExtAdm(extadm);
    cy.visit('/Workflow');
    cy.wait('@WorkflowSecuritiesWatchlists');
    cy.removeAllExistingSelectedCriteria();
});

And('I change meeting date on Russell meeting id 981568 to 10 days in the past and navigate to it', () => {

    cy.SetMeetingDateXdaysFromCurrent(MEETINGID.RSNCVAP2, -10)
    cy.visit('MeetingDetails/Index/' + MEETINGID.RSNCVAP2)
    cy.wait('@getagenda')
    cy.wait('@MeetingSecurityWatchlists');

    cy.get('#btn-unlock').should('be.visible').should('have.text', 'Change Vote or Rationale').click({ force: true });
    cy.verifyMeetingOptionButtons();
});

And('I change meeting date on Russell meeting id 1068747 to 10 days in the future and navigate to it', () => {

    cy.AddTenDaysToMeetingDates(MEETINGID.RSNCVAM1)
    cy.visit('MeetingDetails/Index/' + MEETINGID.RSNCVAM1)
    cy.wait('@getagenda')
    cy.wait('@MeetingSecurityWatchlists');

    cy.get('#btn-unlock').should('be.visible').should('have.text', 'Change Vote or Rationale').click({ force: true });
    cy.verifyMeetingOptionButtons();
});

And('I clear the rationales for VAP entries and add rationales for other proposals', () => {
    cy.ClearRationaleForVAPEntriesAndAddRationaleVotingWithPolicy()
});

And('I clear the rationales for VAM entries and add rationales for other proposals', () => {
    cy.ClearRationaleForVAMEntriesAndAddRationaleVotingWithManagement()
});

And('I click the vote button and check the override checkbox', () => {
    cy.get('#btn-vote-now').click()
    //check override checkbox 
    cy.get('[data-bind="visible: override.votedBallotsBoxVisible"] > .ccb').click()
});

Then('the Proceed button should be disabled', () => {

    // Step 6 - Proceed button should be disabled
    cy.get('.floatright > .green').should('be.not.visible')
});

And('there should be a warning message that states "You are voting against policy for proposal X"', () => {
    cy.get('[data-bind="visible: requireNoteOnVam|| requireNoteOnVap"] > :nth-child(1)').should('include.text', 'Please enter a rationale for all mentioned items and for all selected ballots in order to vote this meeting:')
    cy.get('[data-bind="visible: requireNoteOnVap"]').should('include.text', 'Vote(s) against policy without a rationale for proposal')
    cy.get('.floatright > .gray').should('be.visible').click();
});

And('there should be a warning message that states "You are voting against management for proposal X"', () => {
    cy.get('[data-bind="visible: requireNoteOnVam|| requireNoteOnVap"] > :nth-child(1)').should('include.text', 'Please enter a rationale for all mentioned items and for all selected ballots in order to vote this meeting:')
    cy.get('[data-bind="visible: requireNoteOnVam"]').should('include.text', 'Vote(s) against management without a rationale for proposal')
    cy.get('.floatright > .gray').should('be.visible').click();
});