import '../../../support/commands.js';
import workflowPageItems from '../../../elements/pages/workflow/workflowPageItems'

const { MEETINGID, USER } = require('../../../support/constants');
const workflowPage = new workflowPageItems();

describe('Test QuickVote functionality in MeetingDetails page', function () {

  beforeEach(function () {
    cy.loginWithAdmin(USER.CALPERS);
    cy.visit('/').url().should('include', '/Workflow');
    cy.wait('@WORKFLOW_EXPANSION');
    cy.wait('@WORKFLOW_SECURITIES_WATCHLIST');
    cy.removeAllExistingSelectedCriteria();
  });

  it.only(`Vote on US meeting on Recommendations Pending meeting`, function () {

    addTenDaysToMeetingDates(MEETINGID.CPRP4);
    visitMeeting('MeetingDetails/Index/',MEETINGID.CPRP4);
    waitForAPICalls();
    clickOnChangeVoteOrRationaleButton();
    verifyMeetingOptionButtons();  
    clickOntheVoteDropDownButton();
    selectForAsAllVote();
    clickonVoteNowButton();
    tickTheBallotCheckbox();
    clickOnTheProceedButton();
    checkVoteButtonStatus('Change Vote or Rationale');  
      
  });

  it(`Verify Instruct functionality on Recommendations Pending meeting`, function () {
    
    addTenDaysToMeetingDates(MEETINGID.CPRP1);
    visitMeeting('MeetingDetails/Index/',MEETINGID.CPRP1);
    waitForAPICalls();
    clickOnChangeVoteOrRationaleButton();
    verifyMeetingOptionButtons();
    clickOnInstructButton();
  
  });

  it(`Vote on Global meeting on Recommendations Pending meeting`, function () {
    cy.AddTenDaysToMeetingDates(MEETINGID.CPRP2);
    cy.visit('MeetingDetails/Index/' + MEETINGID.CPRP2);
    waitForAPICalls();
    workflowPage.unlockButton().click({ force: true });
    verifyMeetingOptionButtons();
    workflowPage.quickVoteDropdown().click({ force: true });
    workflowPage.quickVoteSelect().select('For', { force: true });
    workflowPage.voteNowButton().click({ force: true });
    workflowPage.votedBallots().click({ force: true });
    workflowPage.proceedButton().click();
    workflowPage.unlockButton().should('have.text', 'Change Vote or Rationale');
  });

  it(`QuickVote on Recommendations Pending meeting`, function () {
    cy.AddTenDaysToMeetingDates(MEETINGID.CPRP3);
    cy.visit('MeetingDetails/Index/' + MEETINGID.CPRP3);
    waitForAPICalls();
    workflowPage.unlockButton().click({ force: true });
    verifyMeetingOptionButtons();
    workflowPage.quickVoteDropdown().click({ force: true });
    workflowPage.quickVoteSelect().select('For', { force: true });
    workflowPage.voteNowButton().click({ force: true });
    workflowPage.votedBallots().click({ force: true });
    workflowPage.proceedButton().click();
    workflowPage.unlockButton().should('have.text', 'Change Vote or Rationale');
  });

  it(`Take No Action on first Recommendations Pending meeting`, function () {
    cy.AddTenDaysToMeetingDates(MEETINGID.CPRP5);
    cy.visit('MeetingDetails/Index/' + MEETINGID.CPRP5);
    waitForAPICalls();
    workflowPage.unlockButton().click({ force: true });
    verifyMeetingOptionButtons();
    workflowPage.takeNoActionButton().click({ force: true });
    workflowPage.takeNoActionBallots().click({ force: true });
    workflowPage.proceedButton().click();
    workflowPage.unlockButton().should('have.text', 'Change Vote or Rationale');
  });

  /*Functions*/

  function clickOntheVoteDropDownButton() {
    workflowPage.quickVoteDropdown().click({ force: true });
  }

  function selectForAsAllVote() {
    workflowPage.quickVoteSelect().select('For', { force: true });
  }

  function clickonVoteNowButton() {
    workflowPage.voteNowButton().click({ force: true });
  }

  function tickTheBallotCheckbox() {
    workflowPage.votedBallots().click({ force: true });
  }

  function clickOnTheProceedButton() {
    workflowPage.proceedButton().click();
  }

  function checkVoteButtonStatus(buttonName) {
    workflowPage.unlockButton().should('have.text', buttonName);
  }

  function clickOnChangeVoteOrRationaleButton() {
    workflowPage.unlockButton().click({ force: true });
  }

  function clickOnInstructButton() {
    workflowPage.instructButton().click({ force: true });
  }

  function visitMeeting(url,meetingID) {
    cy.visit(url + meetingID);
  }

  function addTenDaysToMeetingDates(meetingID) {
    cy.AddTenDaysToMeetingDates(meetingID);
  }

  function waitForAPICalls() {
    cy.wait('@LOGGER');
    cy.wait('@GET_FILINGS');
    cy.wait('@VOTE_TALLY');
  }
  
  function verifyMeetingOptionButtons() {
    workflowPage.voteNowButton();
    workflowPage.takeNoActionButton();
    workflowPage.instructButton();
  }

}); // end describe

