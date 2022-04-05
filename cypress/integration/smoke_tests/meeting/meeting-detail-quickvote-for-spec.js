import '../../../support/commands.js';
import meetingDetailsPageItems from '../../../elements/pages/meetingDetails/meetingDetailsPageItems'

const { MEETINGID, USER } = require('../../../support/constants');
const meetingDetailsPage = new meetingDetailsPageItems();

describe('Test QuickVote functionality in MeetingDetails page', function () {

  beforeEach(function () {
    cy.loginWithAdmin(USER.CALPERS);
    cy.visit('/Workflow');
    cy.stausCode200('@GET_AVAILABLE_ASSIGNEES_CUSTOMER'); // Last loaded API on tha page - ext
    
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
    meetingDetailsPage.unlockButton().click({ force: true });
    verifyMeetingOptionButtons();
    meetingDetailsPage.quickVoteDropdown().click({ force: true });
    meetingDetailsPage.quickVoteSelect().select('For', { force: true });
    meetingDetailsPage.voteNowButton().click({ force: true });
    meetingDetailsPage.votedBallots().click({ force: true });
    meetingDetailsPage.proceedButton().click();
    meetingDetailsPage.unlockButton().should('have.text', 'Change Vote or Rationale');
  });

  it(`QuickVote on Recommendations Pending meeting`, function () {
    cy.AddTenDaysToMeetingDates(MEETINGID.CPRP3);
    cy.visit('MeetingDetails/Index/' + MEETINGID.CPRP3);
    waitForAPICalls();
    meetingDetailsPage.unlockButton().click({ force: true });
    verifyMeetingOptionButtons();
    meetingDetailsPage.quickVoteDropdown().click({ force: true });
    meetingDetailsPage.quickVoteSelect().select('For', { force: true });
    meetingDetailsPage.voteNowButton().click({ force: true });
    meetingDetailsPage.votedBallots().click({ force: true });
    meetingDetailsPage.proceedButton().click();
    meetingDetailsPage.unlockButton().should('have.text', 'Change Vote or Rationale');
  });

  it(`Take No Action on first Recommendations Pending meeting`, function () {
    cy.AddTenDaysToMeetingDates(MEETINGID.CPRP5);
    cy.visit('MeetingDetails/Index/' + MEETINGID.CPRP5);
    waitForAPICalls();
    meetingDetailsPage.unlockButton().click({ force: true });
    verifyMeetingOptionButtons();
    meetingDetailsPage.takeNoActionButton().click({ force: true });
    meetingDetailsPage.takeNoActionBallots().click({ force: true });
    meetingDetailsPage.proceedButton().click();
    meetingDetailsPage.unlockButton().should('have.text', 'Change Vote or Rationale');
  });

  /*Functions*/

  function clickOntheVoteDropDownButton() {
    meetingDetailsPage.quickVoteDropdown().click({ force: true });
  }

  function selectForAsAllVote() {
    meetingDetailsPage.quickVoteSelect().select('For', { force: true });
  }

  function clickonVoteNowButton() {
    meetingDetailsPage.voteNowButton().click({ force: true });
  }

  function tickTheBallotCheckbox() {
    meetingDetailsPage.votedBallots().click({ force: true });
  }

  function clickOnTheProceedButton() {
    meetingDetailsPage.proceedButton().click();
  }

  function checkVoteButtonStatus(buttonName) {
    meetingDetailsPage.unlockButton().should('have.text', buttonName);
  }

  function clickOnChangeVoteOrRationaleButton() {
    meetingDetailsPage.unlockButton().click({ force: true });
  }

  function clickOnInstructButton() {
    meetingDetailsPage.instructButton().click({ force: true });
  }

  function visitMeeting(url,meetingID) {
    cy.visit(url + meetingID);
  }

  function addTenDaysToMeetingDates(meetingID) {
    cy.AddTenDaysToMeetingDates(meetingID);
  }

  function waitForAPICalls() {
    cy.stausCode204('@LOGGER');
    cy.stausCode200('@GET_FILINGS');
    cy.stausCode200('@VOTE_TALLY');
  }
  
  function verifyMeetingOptionButtons() {
    meetingDetailsPage.voteNowButton();
    meetingDetailsPage.takeNoActionButton();
    meetingDetailsPage.instructButton();
  }

});

