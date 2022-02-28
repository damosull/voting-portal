import { messages, USER } from '../../../support/constants';

const pastDays = 30;
const arrCriteria = ['Decision Status'];
const unixTime = Math.floor(Date.now() / 1000);
const filterName = `MyFilter_${unixTime}`;
const toast = messages.toast;

describe('Workflow', () => {
  beforeEach(() => {
    cy.loginWithAdmin(USER.CALPERS);
    cy.visit('/').url().should('include', '/Workflow');
  });
  
  //Test scenario 37790 - https://dev.azure.com/glasslewis/Development/_workitems/edit/37790
  //Test scenario 40741 - https://dev.azure.com/glasslewis/Development/_workitems/edit/40741
  it('Vote, Take No Action and Review Required', () => {
    // Wait for initial page to load
    cy.wait('@WORKFLOW_EXPANSION');
    cy.wait('@WORKFLOW_SECURITIES_WATCHLIST');

    // Remove any pre-existing filter from the page
    cy.removeAllExistingSelectedCriteria();

    // Step 1 - Click on "Meeting Date"
    cy.get('#rdo-meeting-date').check().should('be.checked');

    // Wait for meeting date grouping
    cy.wait('@AVAILABLE_ASSIGNEES_CUSTOMER');

    // Step 2 - Change Next 30 days to 10 Days
    cy.get('#date-range-target-meeting-deadline').invoke('attr', 'style', 'display: block');
    cy.get('.k-formatted-value').first().invoke('attr', 'style', 'display: block').clear();
    cy.get('.k-formatted-value').first().invoke('attr', 'style', 'display: block').type(pastDays);
    cy.get('#btn-meeting-deadline-date-update').click({ force: true });

    // Step 3 - Select Decision Status and Recommendations Pending
    cy.AddMultipleCriteria(arrCriteria);

    cy.get('#multiselect-static-target-DecisionStatus').invoke('attr', 'style', 'display: block');
    cy.get('#AwaitingResearch-cb-DecisionStatus').check({ force: true });
    cy.get('#btn-update-DecisionStatus').click({ force: true });
    cy.contains('Decision Status (1)');

    // Step 4 - Save filter
    cy.saveFilter(filterName);
    cy.get('.toast-message').should('contain.text', toast.FILTER_CREATED);
    cy.contains('My Filters').siblings().find('span').should('contain', filterName);

    // Step 5 - Select first meeting
    cy.selectFirstMeeting();

    cy.wait('@GET_MEETING_ID');
    cy.wait('@RELATED_MEETINGS');
    cy.wait('@GET_AGENDA');
    cy.wait('@PAGE_SECTION_ORDER');
    cy.wait('@MEETING_SECURITY_WATCHLIST');
    cy.wait('@ASSIGNED_MEETING_ID');
    cy.wait('@VOTE_TALLY');

    // Verify header buttons [Vote], [Take no Action] and [Instruct]
    cy.verifyMeetingOptionButtons();

    // Step 6 - Select 'For' in the option 'Quick Vote'
    cy.get('#quick-vote-container > span > span').click({ force: true });
    cy.get('#quickVoteSelect').select('For', { force: true });

    // Assert that all records have the option "For"
    cy.get('#md-votecard-grid-results > tr').then(($rows) => {
      $rows.each((index, value) => {
        var selected = Cypress.$(value).find(':selected').text();
        // I ignore the first line because it's the header of the table
        if (selected !== '') {
          expect(selected).to.include('For');
        }
      });
    });

    // Assert Total Vote is 0 before the vote starts
    cy.get('#launch-ballots-voted-modal').should('have.text', 0);

    // Store the "Total Not Voted" to later compare with the "Total Voted"
    cy.get('#launch-ballots-not-voted-modal')
      .invoke('text')
      .then((text) => {
        cy.wrap(text).as('totalNotVoted');
      });

    // Step 7 - Click on [Vote]
    cy.get('#btn-vote-now').click({ force: true });

    cy.wait('@MEETING_DETAILS');
    cy.wait('@GET_AGENDA');
    cy.wait('@WORKFLOW_RESEARCH_INFO');
    cy.wait('@GET_FILINGS');
    cy.wait('@VOTE_TALLY');

    cy.contains('Vote success');

    // Step 7 - Verify Vote Tally gets updated
    // Compare the total shown previously in Not Voted with the total shown in Total Voted
    cy.get('@totalNotVoted').then((vote) => {
      cy.get('#launch-ballots-voted-modal').should('have.text', vote).siblings().contains('Total Voted:');
      cy.contains(`Voted (${vote})`);
    });

    // Assert Total Not Voted is 0
    cy.get('#launch-ballots-not-voted-modal').should('have.text', 0);

    // Step 8 - Click on Change Vote or Rationale
    cy.get('#btn-unlock').should('be.visible').should('have.text', 'Change Vote or Rationale').click({ force: true });
    cy.verifyMeetingOptionButtons();

    // Step 9 - Select Take No Action
    cy.get('#btn-take-no-action').should('be.visible').should('have.text', 'Take No Action').click({ force: true });

    // Proceed with the override
    cy.get('#vote-warnings-and-errors-modal').should('be.visible');
    cy.contains('Do you want to override the existing vote decisions? Select ballots to override');
    cy.get('#override-voted').check({ force: true }).should('be.checked');
    cy.get('.floatright > .green').should('have.text', 'Proceed').click({ force: true });

    cy.wait('@MEETING_DETAILS');
    cy.wait('@GET_AGENDA');
    cy.wait('@WORKFLOW_RESEARCH_INFO');
    cy.wait('@GET_FILINGS');
    cy.wait('@VOTE_TALLY');

    cy.contains('Vote success');

    // Step 9 - Assert Vote tally changes to TNA
    cy.get('@totalNotVoted').then((vote) => {
      cy.contains(`TNA (${vote})`);
    });

    // Step 10 - Click on Change Vote or Rationale
    cy.get('#btn-unlock').click({ force: true });
    cy.verifyMeetingOptionButtons();

    // Step 11 - Click on Instruct
    cy.get('#btn-instruct').should('have.text', 'Instruct').click({ force: true });

    // Proceed with the override
    cy.get('#vote-warnings-and-errors-modal').should('be.visible');
    cy.contains('Do you want to override the existing vote decisions? Select ballots to override');
    cy.get('#override-tnaed').check({ force: true }).should('be.checked');
    cy.get('.floatright > .green').should('have.text', 'Proceed').click({ force: true });

    cy.wait('@MEETING_DETAILS');
    cy.wait('@GET_AGENDA');
    cy.wait('@WORKFLOW_RESEARCH_INFO');
    cy.wait('@GET_FILINGS');
    cy.wait('@VOTE_TALLY');

    cy.contains('Instructed successfully');

    // Step 11 - Verify Vote Tally gets updated
    cy.get('@totalNotVoted').then((vote) => {
      cy.contains(`Review Required (${vote})`);
      cy.get('#launch-ballots-not-voted-modal').should('have.text', vote);
      cy.get('#launch-ballots-voted-modal').should('have.text', 0);
    });

    // Step 12 - Verify the activity section and match the activity against the Ballot activity log by clicking on the control number hyperlink
    let arrMeetingActivity = [];
    let arrMeetingUser = [];
    let arrMeetingDate = [];
    let arrMeetingFinal = [];

    // tr:nth-child(n+2) => this block of code is to ignore the first line, which is "First Ballot Received"
    cy.get('#meeting-details-activity > div > div > table > tbody > tr:nth-child(n+2)').then(($rows) => {
      $rows.each((index, value) => {
        const action = Cypress.$(value).find(`td:nth-child(1)`).text();
        // The string, for the same status, is different in each list. So I'm manually altering to "Instructed"
        if (action.includes('Edited(Fully)')) {
          arrMeetingActivity.push('Instructed');
        } else {
          arrMeetingActivity.push(action);
        }

        const user = Cypress.$(value).find(`td:nth-child(2)`).text();
        // substring is to remove the text "Ballot(s) intructed by" from the string. Replace All is to remove the single quotes
        const newUser = user.substring(user.indexOf("'")).replaceAll("'", '');
        arrMeetingUser.push(newUser);

        const date = Cypress.$(value).find(`td:nth-child(3)`).text();
        arrMeetingDate.push(date);

        // Concat all the arrays into a single one
        arrMeetingFinal = arrMeetingActivity.concat(arrMeetingUser, arrMeetingDate);
        cy.wrap(arrMeetingFinal).as('objMeetingFinal');
      });
    });

    cy.get('#meeting-details-activity');
    cy.get('.ballots-grid-control-number-link').first().click();
    cy.wait('@BALLOT_ACTIVITY_LOG');

    cy.get('#ballot-activitylog-modal').should('be.visible');

    let arrBallotActivity = [];
    let arrBallotUser = [];
    let arrBallotDate = [];
    let arrBallotFinal = [];

    // tr:not(:last-child) => this block of code is to ignore the last line, which is "Created"
    cy.get('#ballotActivityLogGrid > div > table > tbody > tr:not(:last-child)').then(($rows) => {
      $rows.each((index, value) => {
        const action = Cypress.$(value).find(`td:nth-child(1)`).text();
        if (action.includes('Edited(Fully)')) {
          arrBallotActivity.push('Instructed');
        } else {
          arrBallotActivity.push(action);
        }

        const user = Cypress.$(value).find(`td:nth-child(2)`).text();
        const newUser = user.substring(user.indexOf("'")).replaceAll("'", '');
        arrBallotUser.push(newUser);

        const date = Cypress.$(value).find(`td:nth-child(3)`).text();
        arrBallotDate.push(date);

        /* The Ballot activity log popup displays the list ordered by desc, whereas the activity table displays ordered by asc.
        The block below is triggered when the array has found the last position. It then reverses the list so its
         'ordered' by asc, which can be use used to compare with the activity list
        */
        if (index == $rows.length - 1) {
          arrBallotActivity.reverse();
          arrBallotUser.reverse();
          arrBallotDate.reverse();
        }

        arrBallotFinal = arrBallotActivity.concat(arrBallotUser, arrBallotDate);
        cy.wrap(arrBallotFinal).as('objBallotFinal');
      });
    });

    // Access both lists and then compare one with the other. The resul must be "true"
    cy.get('@objBallotFinal').then((ballotFinal) => {
      cy.get('@objMeetingFinal').then((meetingFinal) => {
        var isArrEqual = JSON.stringify(ballotFinal) == JSON.stringify(meetingFinal);
        expect(isArrEqual).to.be.true;
      });
    });

    cy.visit('/').url().should('include', '/Workflow');
    deleteMyFilter(filterName);
  });

  function deleteMyFilter (filterToDelete){
    cy.intercept('GET', '**/ManageFilters').as('manageFilters');
    cy.intercept('GET', '**/Api/Data/Subscription/?FilterId=**').as('subscriptionFilter');
    cy.intercept('GET', '**/Api/Data/FilterPreference/SharedUsers/?FilterToShareID=**').as('filterToShare');
    cy.intercept('GET', '**/Api/Data/Filters/GetByID?Id=**').as('getByID');
    cy.intercept('DELETE', '**/Api/Data/WorkflowFilters/**?isConfirmed=false').as('filterDeleted');

    cy.get('#btn-manage-filters').click();

    cy.wait('@manageFilters');
    cy.wait('@subscriptionFilter');
    cy.wait('@filterToShare');

    cy.contains('My Filters')
      .siblings()
      .find('li')
      .then((myFilter) => {
        cy.wrap(myFilter).each((value, index) => {
          const found = value.text().trim();
          // It compares the existing filter name with the ones available under My Filters.
          if (found == filterToDelete) {
            cy.wait('@getByID');
            cy.wrap(myFilter).eq(index).click();
            cy.contains('Delete Filter').click();
            cy.wait('@filterDeleted');
            cy.get('.toast-message').should('contain.text', toast.FILTER_DELETED);
          } else {
            if (index == myFilter.length - 1) {
              cy.log('No filter was found');
              return false;
            }
        }
      });
    });
  }

});
