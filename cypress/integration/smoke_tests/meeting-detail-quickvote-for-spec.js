const { MEETINGID, USER } = require('../../support/constants');
import '../../support/commands.js';
//import { USER } from '../../support/constants';

describe('Test QuickVote functionality in MeetingDetails page', function () {
  beforeEach(function () {
    cy.viewport(1100, 900);
    cy.intercept('POST', '**/Api/Data/WorkflowExpansion').as('WorkflowExpansion');
    cy.intercept('POST', '**/Api/Data/WorkflowSecuritiesWatchlists').as('WorkflowSecuritiesWatchlists');
    cy.intercept('POST', '**/Api/Data/Filters/CreateDraftFilter').as('filter');
    cy.intercept('POST', '**/Api/Data/Meeting**').as('meeting');
    cy.intercept('POST', '/Api/Data/**').as('PostData');
    cy.intercept('GET', '/Api/Data/**').as('GetData');
    cy.intercept('POST', '/api/Logger/**').as('logger');
    cy.intercept('GET', '**/Api/Data/MeetingMaterials/GetFilings?MeetingId=**').as('GetFilings');
    cy.intercept('POST', '**/Api/Data/VoteTally').as('VoteTally');
    cy.intercept('POST', '**/Api/Data/VoteRequestValidation').as('validate')

    cy.loginSession(USER.CALPERS);
    cy.visit('/').url().should('include', '/Workflow');
    cy.wait('@WorkflowExpansion');
    cy.wait('@WorkflowSecuritiesWatchlists');
    cy.removeAllExistingSelectedCriteria();
  });

  it(`Vote on US meeting on Recommendations Pending meeting`, function () {
    //make sure all dates are current with this meeting id
    cy.AddTenDaysToMeetingDates(MEETINGID.CPRP4);

    //Step 4 - navigate to Calpers meeting ID
    cy.visit('MeetingDetails/Index/' + MEETINGID.CPRP4);
    cy.wait('@PostData');
    cy.wait('@GetData');
    cy.wait('@logger');
    //neccessary for meeting to fully load
    cy.wait('@GetFilings');
    cy.wait('@VoteTally');

    cy.get('#launch-ballots-voted-modal').should('be.visible');

    cy.get('#btn-unlock').click({ force: true });
    cy.verifyMeetingOptionButtons();

    cy.get('#quick-vote-container > span > span').click({ force: true });
    cy.get('#quickVoteSelect').select('For', { force: true });
    cy.get('#btn-vote-now').click({ force: true });

    //check override checkbox and Proceed
    cy.wait('@validate')
    cy.get('[data-bind="visible: override.votedBallotsBoxVisible"] > .ccb').click({ force: true });
    cy.get('.floatright > .green').click();

    cy.get('#btn-unlock').should('be.visible').should('have.text', 'Change Vote or Rationale');
  });

  it(`Verify Instruct functionality on Recommendations Pending meeting`, function () {
    //make sure all dates are current with this meeting id
    cy.AddTenDaysToMeetingDates(MEETINGID.CPRP1);

    //Step 4 - navigate to Calpers meeting
    cy.visit('MeetingDetails/Index/' + MEETINGID.CPRP1);
    cy.wait('@PostData');
    cy.wait('@GetData');
    cy.wait('@logger');
    //neccessary for meeting to fully load
    cy.wait('@GetFilings');
    cy.wait('@VoteTally');

    cy.get('#launch-ballots-voted-modal').should('be.visible');

    cy.get('#btn-unlock').click({ force: true });
    cy.verifyMeetingOptionButtons();

    cy.get('#btn-instruct').click({ force: true });
  });

  it(`Vote on Global meeting on Recommendations Pending meeting`, function () {
    //make sure all dates are current with this meeting id
    cy.AddTenDaysToMeetingDates(MEETINGID.CPRP2);

    //Step 4 - navigate to Calpers meeting
    cy.visit('MeetingDetails/Index/' + MEETINGID.CPRP2);
    cy.wait('@PostData');
    cy.wait('@GetData');
    cy.wait('@logger');
    //neccessary for meeting to fully load
    cy.wait('@GetFilings');
    cy.wait('@VoteTally');

    cy.get('#launch-ballots-voted-modal').should('be.visible');

    cy.get('#btn-unlock').click({ force: true });
    cy.verifyMeetingOptionButtons();

    cy.get('#quick-vote-container > span > span').click({ force: true });
    cy.get('#quickVoteSelect').select('For', { force: true });
    cy.get('#btn-vote-now').click({ force: true });
    cy.get('[data-bind="visible: override.votedBallotsBoxVisible"] > .ccb').click({ force: true });
    cy.get('.floatright > .green').click();

    cy.get('#btn-unlock').should('be.visible').should('have.text', 'Change Vote or Rationale');
  });

  it(`QuickVote on Recommendations Pending meeting`, function () {
    //make sure all dates are current with this meeting id
    cy.AddTenDaysToMeetingDates(MEETINGID.CPRP3);

    //Step 4 - navigate to Calpers meeting ID 1066197
    cy.visit('MeetingDetails/Index/' + MEETINGID.CPRP3);

    cy.wait('@PostData');
    cy.wait('@GetData');
    cy.wait('@logger');
    //neccessary for meeting to fully load
    cy.waitForMeetingToLoad();
    cy.get('#btn-unlock').click({ force: true });
    cy.verifyMeetingOptionButtons();

    //Do a Quickvote For to move meeting status to Voted
    cy.get('#quick-vote-container > span > span').click({ force: true });
    cy.get('#quickVoteSelect').select('For', { force: true });
    cy.get('#btn-vote-now').click({ force: true });
    cy.get('[data-bind="visible: override.votedBallotsBoxVisible"] > .ccb').click({ force: true });
    cy.get('.floatright > .green').click();

    cy.get('#btn-unlock').should('be.visible').should('have.text', 'Change Vote or Rationale');
  });

  it(`Take No Action on first Recommendations Pending meeting`, function () {
    //make sure all dates are current with this meeting id
    cy.AddTenDaysToMeetingDates(MEETINGID.CPRP5);

    //Step 4 - navigate to Calpers meeting
    cy.visit('MeetingDetails/Index/' + MEETINGID.CPRP5);
    cy.wait('@PostData');
    cy.wait('@GetData');
    cy.wait('@logger');
    cy.wait('@GetFilings');
    cy.wait('@VoteTally');

    cy.get('#launch-ballots-voted-modal').should('be.visible');

    cy.get('#btn-unlock').click({ force: true });
    cy.verifyMeetingOptionButtons();

    cy.get('#btn-take-no-action').click({ force: true });
    cy.get('[data-bind="visible: override.tnaBallotsBoxVisible"] > .ccb').click({ force: true });
    cy.get('.floatright > .green').click();

    cy.get('#btn-unlock').should('be.visible').should('have.text', 'Change Vote or Rationale');
  });
}); // end describe
