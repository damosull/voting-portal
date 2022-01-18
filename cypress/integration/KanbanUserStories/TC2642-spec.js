//Test Case 2642 - https://dev.azure.com/glasslewis/Development/_workitems/edit/2642

import { API, USER } from '../../support/constants';
var arrAPIPolicy = [];
var arrUIPolicy = [];

describe('US28436 - Test 6', () => {
  beforeEach(() => {
    cy.intercept('POST', API.POST.WORKFLOW_EXPANSION).as('WorkflowExpansion');
    cy.intercept('POST', API.POST.WORKFLOW_SECURITIES_WATCHLIST).as('WorkflowSecuritiesWatchlists');
    cy.intercept('POST', API.POST.AVAILABLE_ASSIGNEES_CUSTOMER).as('AvailableAssigneesForCustomer');
    cy.intercept('POST', API.POST.GET_AGENDA).as('GetAgenda');
    cy.intercept('POST', API.POST.VOTE_TALLY).as('VoteTally');
    cy.intercept('POST', API.POST.MEETING_DETAILS).as('MeetingDetails');
    cy.intercept('GET', API.GET.GET_MEETING_ID).as('GetMeetingID');
    cy.intercept('GET', API.GET.RELATED_MEETINGS).as('RelatedMeetings');
    cy.intercept('GET', API.GET.PAGE_SECTION_ORDER).as('PageSectionOrder');
    cy.intercept('GET', API.GET.MEETING_SECURITY_WATCHLIST).as('MeetingSecurityWatchlist');
    cy.intercept('GET', API.GET.ASSIGNED_MEETING_ID).as('AssignedMeetingID');
    cy.intercept('GET', API.GET.GET_FILINGS).as('GetFilings');
    cy.intercept('GET', API.GET.WORKFLOW_RESEARCH_INFO).as('WFResearch');
    cy.intercept('PUT', API.PUT.BALLOT_GRID_STATE).as('BallotsGridState');

    cy.loginSession(USER.NEUBERGER);
    cy.visit('/').url().should('include', '/Workflow');
  });

  it('Verify ballot section display the correct results when filter is applied', () => {
    cy.log('Test Case 2642 - https://dev.azure.com/glasslewis/Development/_workitems/edit/2642');

    // Wait for initial page to load
    cy.wait('@WorkflowExpansion');
    //cy.wait('@WorkflowSecuritiesWatchlists');
    //cy.wait('@AvailableAssigneesForCustomer');

    // Click on Upcoming Meetings link
    cy.contains('Upcoming Meetings').click();

    cy.removeAllExistingSelectedCriteria();

    // Go through the list of meetings and click in the first occurrence of one with 2 or more values
    cy.get('table > tbody > tr > td:nth-child(4)').each(($list, index) => {
      const strValue = $list.text();
      if (strValue.includes('values')) {
        cy.get('table > tbody > tr > td:nth-child(2)').find('a').eq(index).click();
        return false;
      }
    });

    cy.wait('@GetMeetingID');
    cy.wait('@RelatedMeetings');
    // Store the policies returned by the API
    cy.wait('@GetAgenda').then((xhr) => {
      arrAPIPolicy = xhr.response.body.AgendaVotes[0].PolicyIds;
      arrAPIPolicy.sort();
      cy.wrap(arrAPIPolicy).as('arrAPIPolicy');
    });
    cy.wait('@PageSectionOrder');
    //cy.wait('@MeetingSecurityWatchlist');
    //cy.wait('@AssignedMeetingID');
    cy.wait('@VoteTally');

    // Click on Filters: Policy
    cy.get(':nth-child(2) > .darkgrey').click();
    cy.get('#add-policy-target').invoke('attr', 'style', 'display: block');

    // Traverse the Policy filter dropdownn and push the values available into an array
    cy.get('#meeting-detail-policy > li').each(($filter, index) => {
      arrUIPolicy.push($filter.text().trim());

      if ($filter.length == index) {
        cy.get('@arrAPIPolicy').then((arrAPIPolicy) => {
          arrUIPolicy.sort();
          // Compare the list of policies returned by the API with the list of policies available in the UI
          expect(arrAPIPolicy).to.deep.equal(arrUIPolicy);
        });
      }

      // Click on "Select all" when running for the first time to uncheck all the options
      if (index == 0) {
        cy.get($filter).should('have.class', 'checked');
        cy.get('[for="vc-filter-selectall-policy"]').click({ force: true });
        cy.get($filter).should('not.have.class', 'checked');
      }

      // Code to uncheck the last policy selected
      if (index >= 1) {
        cy.get(':nth-child(2) > .darkgrey').click();
        cy.get('#add-policy-target').invoke('attr', 'style', 'display: block');
        cy.get('#meeting-detail-policy > li > div > label')
          .eq(index - index)
          .click({ force: true });
      }

      // It selects one option at a time in the Policy filter dropdown
      cy.get('#meeting-detail-policy > li > div > label').eq(index).click({ force: true });
      cy.get('#add-policy-target > div button.btn-update').click({ force: true });

      cy.wait('@MeetingDetails');
      cy.wait('@GetAgenda');
      cy.wait('@GetFilings');
      cy.wait('@WFResearch');
      cy.wait('@VoteTally');

      // It gets the size of the list
      cy.get('#ballots-grid > div > div > table > thead > tr > th > a').then((size) => {
        cy.wrap(size.length).as('len');
      });

      cy.get('@len').then((len) => {
        cy.get('#ballots-grid > div > div > table > thead > tr > th').each(($columns, index) => {
          // "Recursive" code to add the Policy ID to the list if it's not displayed by default
          if ($columns.text().trim() != 'Policy ID') {
            if (index + 1 == len) {
              cy.get('#btn-mdballots-details-config-columns').click();
              cy.get('#ballots-configure-columns-target').invoke('attr', 'style', 'display: block');

              cy.get('.company-name-search > input').last().fill('Policy ID');
              cy.get('[data-js="md-ballots-section"]').find('#mytable > ul > li > div > input').check({ force: true });
              cy.get('#configure-columns-modal > button.secondary.blue').eq(1).click();
              cy.wait('@BallotsGridState');

              cy.get('#ballots-grid > div > div > table > thead > tr > th').each(($columns, index) => {
                if ($columns.text().trim() == 'Policy ID') {
                  cy.wrap(index).as('position');
                }
              });
            }
          } else {
            cy.wrap(index).as('position');
          }
        });
      });

      cy.get('@position').then((position) => {
        //It checks that the Ballots section are showing only the policies filtered by the user
        cy.get(`#md-ballots-grid-results > tr > td:nth-child(${position + 1})`).each(($ballot) => {
          expect($filter.text().trim()).to.eq($ballot.text().trim());
        });
      });
    });
  });
});
