//Test Case 40729 - https://dev.azure.com/glasslewis/Development/_workitems/edit/40729

import { API } from '../../support/constants';
const api = API;

const data = {
  company: 'SK Innovation',
  policies: ['WEL-NYSCR'],
};

describe('US39254 - ', () => {
  beforeEach(() => {
    cy.intercept('POST', api.POST.WORKFLOW_EXPANSION).as('WorkflowExpansion');
    cy.intercept('POST', api.POST.WORKFLOW_SECURITIES_WATCHLIST).as('WorkflowSecuritiesWatchlists');
    cy.intercept('POST', api.POST.AVAILABLE_ASSIGNEES_CUSTOMER).as('AvailableAssigneesForCustomer');
    cy.intercept('POST', api.POST.GET_AGENDA).as('GetAgenda');
    cy.intercept('POST', api.POST.VOTE_TALLY).as('VoteTally');
    cy.intercept('POST', api.POST.GET_STATUS).as('GetStatus');
    cy.intercept('GET', api.GET.GET_MEETING_ID).as('GetMeetingID');
    cy.intercept('GET', api.GET.RELATED_MEETINGS).as('RelatedMeetings');
    cy.intercept('GET', api.GET.PAGE_SECTION_ORDER).as('PageSectionOrder');
    cy.intercept('GET', api.GET.MEETING_SECURITY_WATCHLIST).as('MeetingSecurityWatchlist');
    cy.intercept('GET', api.GET.ASSIGNED_MEETING_ID).as('AssignedMeetingID');
    cy.intercept('GET', api.GET.FILTER_CRITERIA_FOR_FIELDS).as('FilterCriteriaFields');
    cy.intercept('GET', '**/Api/Data//ListService/PolicyID?CustomerID=**').as('ListService');

    cy.loginExtAdm('Wellington');
    cy.visit('/').url().should('include', '/Workflow');
  });

  data.policies.forEach((policy) => {
    it('Verify ballot section display the correct results when filter is applied from the workflow page', () => {
      // Wait for initial page to load
      cy.wait('@WorkflowExpansion');
      cy.wait('@WorkflowSecuritiesWatchlists');
      cy.wait('@AvailableAssigneesForCustomer');

      cy.contains('Upcoming Meetings').click();

      cy.removeAllExistingSelectedCriteria();

      // Step 2 - User clicks on Add Criteria & selects Policy ID
      cy.AddMultipleCriteria(['Policy ID']);

      cy.wait('@ListService');
      cy.wait('@FilterCriteriaFields');

      // Step 3 - User selects one policy from the list (e.g. TCW-TH) & clicks Update
      cy.addCriteriaStatus([`${policy}`]);

      cy.wait('@WorkflowExpansion');
      cy.wait('@WorkflowSecuritiesWatchlists');
      cy.wait('@AvailableAssigneesForCustomer');
      cy.wait('@GetStatus');

      // Step 4 - User clicks on the Control Number hyperlink on the workflow page
      // Go through the list of meetings and click in the record that matches the name
      cy.get('table > tbody > tr > td:nth-child(4)').each(($list, index) => {
        if ($list.text() == policy) {
          cy.get('table > tbody > tr > td:nth-child(5)').eq(index).find('a').click({ force: true });
        }
      });

      cy.wait('@GetMeetingID');
      cy.wait('@RelatedMeetings');
      cy.wait('@GetAgenda');
      cy.wait('@PageSectionOrder');
      cy.wait('@MeetingSecurityWatchlist');
      cy.wait('@AssignedMeetingID');
      cy.wait('@VoteTally');

      // Step 5 - Verify User can see Ballot Section under the Comments section
      cy.get('div #ballots-section').should('be.visible');

      cy.get('#btn-mdballots-details-config-columns').click();
      cy.get('#ballots-configure-columns-target').invoke('attr', 'style', 'display: block');

      // Step 6 - Displays the modal with the list of fields , Apply & Cancel buttons
      cy.get('#configure-columns-modal > button.secondary.blue').eq(1).should('be.visible');
      cy.get('#configure-columns-modal > button.secondary.gray').eq(1).should('be.visible');

      // Step 7 - Verify that the Default Field 'Control Number' is not available in the 'Columns' modal
      cy.get('[data-js="md-ballots-section"]')
        .find('#mytable > ul > li')
        .each(($column) => {
          expect($column.text().trim()).to.not.equal('Control Number');
        });

      // Step 8 - Verify that the user enter a character (e.g.: 'Custodian') in the responsive search of the "Columns" Modal
      cy.get('.company-name-search > input').last().type('Custodian');

      cy.get('[data-js="md-ballots-section"]')
        .find('#mytable > ul > li')
        .each(($column) => {
          expect($column.text().trim()).to.have.string('Custodian');
        });

      cy.get('#configure-columns-modal > button.secondary.gray').eq(1).click();

      // Step 9 - User adds Policy ID to the grid
      cy.get('#md-ballots-grid-results > tr > td:nth-child(9)').each(($ballot) => {
        expect(policy).to.eq($ballot.text().trim());
      });
    });
  });
});
