//Test scenario 37790 - https://dev.azure.com/glasslewis/Development/_workitems/edit/37790

import { messages, API } from '../../support/constants';
const pastDays = 10;
const api = API;
const arrCriteria = ['Decision Status'];
const unixTime = Math.floor(Date.now() / 1000);
const filterName = `MyFilter_${unixTime}`;
const toast = messages.toast;

describe('Report - Voting Activity', () => {
  //   const arrCriteria = ['Decision Status'];
  //   const unixTime = Math.floor(Date.now() / 1000);
  //   const filterName = `RegressionWorklow3_${unixTime}`;
  //   const fileExtension = 'xlsx'; /* options: pdf, xls or xlsx */
  //   const upperFileExt = fileExtension.toUpperCase();

  beforeEach(() => {
    cy.intercept('POST', api.POST.WORKFLOW_EXPANSION).as('WorkflowExpansion');
    cy.intercept('POST', api.POST.WORKFLOW_SECURITIES_WATCHLIST).as('WorkflowSecuritiesWatchlists');
    cy.intercept('POST', api.POST.AVAILABLE_ASSIGNEES_CUSTOMER).as('AvailableAssigneesForCustomer');
    cy.intercept('POST', api.POST.GET_AGENDA).as('GetAgenda');
    cy.intercept('POST', api.POST.GET_STATUS).as('GetStatus');
    cy.intercept('POST', api.POST.VOTE_TALLY).as('VoteTally');
    cy.intercept('POST', api.POST.MEETING_DETAILS).as('MeetingDetails');
    cy.intercept('GET', api.GET.GET_MEETING_ID).as('GetMeetingID');
    cy.intercept('GET', api.GET.RELATED_MEETINGS).as('RelatedMeetings');
    cy.intercept('GET', api.GET.PAGE_SECTION_ORDER).as('PageSectionOrder');
    cy.intercept('GET', api.GET.MEETING_SECURITY_WATCHLIST).as('MeetingSecurityWatchlist');
    cy.intercept('GET', api.GET.ASSIGNED_MEETING_ID).as('AssignedMeetingID');
    cy.intercept('GET', api.GET.GET_FILINGS).as('GetFilings');
    cy.intercept('GET', api.GET.WORKFLOW_RESEARCH_INFO).as('WFResearch');
    cy.intercept('GET', api.GET.BALLOT_ACTIVITY_LOG).as('BallotActivity');

    cy.loginExternal();
    cy.visit('/').url().should('include', '/Workflow');
  });

  it(`Create, download and verify Voting Activity report`, () => {
    cy.log('Test scenario 37790 - https://dev.azure.com/glasslewis/Development/_workitems/edit/37790');

    // Wait for initial page to load
    cy.wait('@WorkflowExpansion');
    cy.wait('@WorkflowSecuritiesWatchlists');

    // Step 1 - Click on "Meeting Date"
    // cy.get('#rdo-meeting-date').check().should('be.checked');

    // // Wait for meeting date grouping
    // cy.wait('@AvailableAssigneesForCustomer');
    // cy.wait('@GetStatus');

    // Step 2 - Change Next 30 days to 10 Days
    // cy.get('#date-range-target-meeting-deadline').invoke('attr', 'style', 'display: block');
    // cy.get('.k-formatted-value').first().invoke('attr', 'style', 'display: block').clear();
    // cy.get('.k-formatted-value').first().invoke('attr', 'style', 'display: block').type(pastDays);
    // cy.get('#btn-meeting-deadline-date-update').click({ force: true });

    // Step 3 - Select Decision Status and Recommendations Pending
    // cy.get('#btn-add-criteria').click({ force: true });
    // arrCriteria.forEach((value) => {
    //   cy.then(() => {
    //     cy.get('#txt-filter-criteria')
    //       .clear()
    //       .type(value)
    //       .parent()
    //       .siblings()
    //       .children()
    //       .find('input[type="checkbox"]')
    //       .check({ force: true });
    //   });
    // });

    // cy.contains('Apply').click();

    // cy.get('#multiselect-static-target-DecisionStatus').invoke('attr', 'style', 'display: block');
    // cy.get('#AwaitingResearch-cb-DecisionStatus').check({ force: true });
    // cy.get('#btn-update-DecisionStatus').click({ force: true });
    // cy.contains('Decision Status (1)');

    // Step 4 - Save filter
    // cy.saveFilter(filterName);
    // cy.get('.toast-message').should('contain.text', toast.FILTER_CREATED);
    // cy.contains('My Filters').siblings().find('span').should('contain', filterName);

    // Step 5 - Select first meeting
    // cy.get('table > tbody > tr')
    //   .eq(2)
    //   .within(() => {
    //     cy.get('[data-js="meeting-details-link"]').first().click({ force: true });
    //   });
    cy.visit('/MeetingDetails/Index/1050379');

    cy.wait('@GetMeetingID');
    cy.wait('@RelatedMeetings');
    cy.wait('@GetAgenda');
    cy.wait('@PageSectionOrder');
    cy.wait('@MeetingSecurityWatchlist');
    cy.wait('@AssignedMeetingID');
    cy.wait('@VoteTally');

    // Store Total Not Voted in order to compare with Total Voted after voting takes place

    // Verify header buttons [Vote], [Take no Action] and [Instruct]
    // cy.verifyMeetingOptionButtons();

    // // In the field "Quick Vote" select the option "For"
    // cy.get('#quick-vote-container > span > span').click({ force: true });
    // cy.get('#quickVoteSelect').select('For', { force: true });

    // // Assert that all records have the option "For"
    // cy.get('#md-votecard-grid-results > tr').then(($rows) => {
    //   $rows.each((index, value) => {
    //     var selected = Cypress.$(value).find(':selected').text();
    //     // I ignore the first line because it's the header of the table
    //     if (selected !== '') {
    //       expect(selected).to.include('For');
    //     }
    //   });
    // });

    // // Assert Total Vote is 0 before the vote starts
    // cy.get('#launch-ballots-voted-modal').should('have.text', 0);

    // // Store the "Total Not Voted" to later compare with the "Total Voted"
    // cy.get('#launch-ballots-not-voted-modal')
    //   .invoke('text')
    //   .then((text) => {
    //     cy.wrap(text).as('totalNotVoted');
    //   });

    // // Click on [Vote]
    // cy.get('#btn-vote-now').click({ force: true });

    // cy.wait('@MeetingDetails');
    // cy.wait('@GetAgenda');
    // cy.wait('@WFResearch');
    // cy.wait('@GetFilings');
    // cy.wait('@VoteTally');

    // // Compare the total shown previously in Not Voted with the total shown in Total Voted
    // cy.get('@totalNotVoted').then((vote) => {
    //   cy.get('#launch-ballots-voted-modal').should('have.text', vote).siblings().contains('Total Voted:');
    //   cy.contains(`Voted (${vote})`);
    // });

    // // Assert Total Not Voted is 0
    // cy.get('#launch-ballots-not-voted-modal').should('have.text', 0);

    // //Click on Change Vote or Rationale
    // cy.get('#btn-unlock').should('be.visible').should('have.text', 'Change Vote or Rationale').click({ force: true });
    // cy.verifyMeetingOptionButtons();

    // // Click on Take no Action
    // cy.get('#btn-take-no-action').should('be.visible').should('have.text', 'Take No Action').click({ force: true });

    // // Proceed with the override
    // cy.get('#vote-warnings-and-errors-modal').should('be.visible');
    // cy.contains('Do you want to override the existing vote decisions? Select ballots to override');
    // cy.get('#override-voted').check({ force: true }).should('be.checked');
    // cy.get('.floatright > .green').should('have.text', 'Proceed').click({ force: true });

    // cy.wait('@MeetingDetails');
    // cy.wait('@GetAgenda');
    // cy.wait('@WFResearch');
    // cy.wait('@GetFilings');
    // cy.wait('@VoteTally');

    // cy.get('@totalNotVoted').then((vote) => {
    //   cy.contains(`TNA (${vote})`);
    // });

    // //Click on Change Vote or Rationale
    // cy.get('#btn-unlock').click({ force: true });
    // cy.verifyMeetingOptionButtons();

    // //Click on Instruct
    // cy.get('#btn-instruct').should('have.text', 'Instruct').click({ force: true });

    // // Proceed with the override
    // cy.get('#vote-warnings-and-errors-modal').should('be.visible');
    // cy.contains('Do you want to override the existing vote decisions? Select ballots to override');
    // cy.get('#override-tnaed').check({ force: true }).should('be.checked');
    // cy.get('.floatright > .green').should('have.text', 'Proceed').click({ force: true });

    // cy.wait('@MeetingDetails');
    // cy.wait('@GetAgenda');
    // cy.wait('@WFResearch');
    // cy.wait('@GetFilings');
    // cy.wait('@VoteTally');

    // cy.get('@totalNotVoted').then((vote) => {
    //   cy.contains(`Review Required (${vote})`);
    //   cy.get('#launch-ballots-not-voted-modal').should('have.text', vote);
    //   cy.get('#launch-ballots-voted-modal').should('have.text', 0);
    // });

    // ------------------------------------------------- //

    const commonMeetingAction = '#meeting-details-activity > div > div > table > tbody > tr:nth-child(n+2) >';
    const logMeetingAction = `${commonMeetingAction} td:nth-child(1)`;
    const logMeetingUser = `${commonMeetingAction} td:nth-child(2)`;
    const logMeetingDate = `${commonMeetingAction} td:nth-child(3)`;

    // const logMeetingAction =
    //   `#meeting-details-activity > div > div > table > tbody > tr:nth-child(n+2) > td:nth-child(1)`;
    // const logMeetingUser =
    //   '#meeting-details-activity > div > div > table > tbody > tr:nth-child(n+2) > td:nth-child(2)';
    // const logMeetingDate =
    //   '#meeting-details-activity > div > div > table > tbody > tr:nth-child(n+2) > td:nth-child(3)';

    let arrMeetingAction = [];
    let arrMeetingUser = [];
    let arrMeetingDate = [];

    cy.get(logMeetingAction).each(($rows) => {
      arrMeetingAction.push($rows.text());
    });
    console.log('arrMeetingAction ' + arrMeetingAction);
    console.log('JSON arrMeetingAction ' + JSON.stringify(arrMeetingAction));

    cy.get(logMeetingUser).each(($rows) => {
      arrMeetingUser.push($rows.text());
    });
    console.log('arrMeetingUser ' + arrMeetingUser);
    console.log('JSON arrMeetingUser ' + JSON.stringify(arrMeetingUser));

    cy.get(logMeetingDate).each(($rows) => {
      arrMeetingDate.push($rows.text());
    });
    console.log('arrMeetingDate ' + arrMeetingDate);
    console.log('JSON arrMeetingDate ' + JSON.stringify(arrMeetingDate));

    // cy.get('#meeting-details-activity');
    // cy.get('.ballots-grid-control-number-link').first().click();
    // cy.wait('@BallotActivity');

    // const logBallotAction = '#ballotActivityLogGrid > div > table > tbody > tr:not(:last-child) > td:nth-child(1)';
    // const logBallotUser = '#ballotActivityLogGrid > div > table > tbody > tr:not(:last-child) > td:nth-child(2)';
    // const logBallotDate = '#ballotActivityLogGrid > div > table > tbody > tr:not(:last-child) > td:nth-child(3)';

    let arrBallotAction = [];
    let arrBallotUser = [];
    let arrBallotDate = [];

    // cy.get(logBallotAction).each(($rows, index) => {
    //   console.log(`Ballot #${index} ${$rows.text()}`);
    // });

    // ------------------------------------------------- //

    cy.get('#meeting-details-activity > div > div > table > tbody > tr:nth-child(n+2)').then(($rows) => {
      $rows.each((index, value) => {
        const action = Cypress.$(value).find(`td:nth-child(1)`).text();
        if (action.includes('Edited(Fully)')) {
          arrMeetingAction.push('Instructed');
        } else {
          arrMeetingAction.push(action);
        }

        const user = Cypress.$(value).find(`td:nth-child(2)`).text();
        newUser = user.substring(str.indexOf("'"));
        arrMeetingUser.push(newUser);

        const date = Cypress.$(value).find(`td:nth-child(3)`).text();
        arrMeetingDate.push(date);
      });
    });
  });
});
