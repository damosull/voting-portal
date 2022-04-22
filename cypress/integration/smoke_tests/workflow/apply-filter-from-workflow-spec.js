import { USER } from '../../../support/constants';

const data = {
  company: 'SK Innovation',
  policies: ['WEL-NYSCR'],
};

describe('US39254 - ', { tags: '@smoke' }, () => {
  beforeEach(() => {
    cy.viewport(1100, 900);
    cy.loginWithAdmin(USER.WELLINGTON);
    cy.visit('/Workflow');
    cy.stausCode200('@GET_AVAILABLE_ASSIGNEES_CUSTOMER'); // Last loaded API on tha page - ext
  });

  data.policies.forEach((policy) => {
    //Test Case 40729 - https://dev.azure.com/glasslewis/Development/_workitems/edit/40729
    it.skip('Verify ballot section display the correct results when filter is applied from the workflow page', () => {

      cy.contains('Upcoming Meetings').click();

      cy.removeAllExistingSelectedCriteria();

      // Step 2 - User clicks on Add Criteria & selects Policy ID
      cy.AddMultipleCriteria(['Policy ID']);

      cy.wait('@LIST_SERVICE');
      cy.wait('@FILTER_CRITERIA_EDITORS');

      // Step 3 - User selects one policy from the list (e.g. TCW-TH) & clicks Update
      cy.addCriteriaStatus([`${policy}`]);

      cy.wait('@WORKFLOW_EXPANSION');
      cy.wait('@WORKFLOW_SECURITIES_WATCHLIST');
      cy.wait('@GET_AVAILABLE_ASSIGNEES_CUSTOMER');

      // Step 4 - User clicks on the Control Number hyperlink on the workflow page
      // Go through the list of meetings and click in the record that matches the name
      cy.get('table > tbody > tr > td:nth-child(4)').each(($list, index) => {
        if ($list.text() == policy) {
          cy.get('table > tbody > tr > td:nth-child(5)').eq(index).find('a').click({ force: true });

          return false;
        }
      });

      cy.wait('@GET_MEETING_ID');
      cy.wait('@RELATED_MEETINGS');
      cy.wait('@GET_AGENDA');
      cy.wait('@PAGE_SECTION_ORDER');
      cy.wait('@MEETING_SECURITY_WATCHLIST');
      cy.wait('@ASSIGNED_MEETING_ID');
      cy.wait('@VOTE_TALLY');

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

      // Check which position the column "Policy ID" is and wrapped into the object index
      cy.get('#ballots-grid > div > div > table > thead > tr > th').should('be.visible').each(($headers, index) => {
        if ($headers.text().trim() == 'Policy ID') {
          cy.wrap(index).as('index');

          // Ends the loop when the column is found
          return false;
        }
      });

      // Check that the "Policy ID" column will display the expected value
      cy.get('@index').then((pos) => {
        cy.get(`#md-ballots-grid-results > tr > td:nth-child(${pos + 1})`).each(($ballot) => {
          expect(policy).to.eq($ballot.text().trim());
        });
      });
    });
  });
});
