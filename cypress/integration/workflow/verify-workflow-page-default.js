describe('verify workflow page elements (TestCase - 28351)', function () {
  beforeEach(function () {
    cy.intercept('POST', '**/Api/Data/WorkflowExpansion').as('WorkflowExpansion');
    cy.intercept('POST', '**/Api/Data/WorkflowSecuritiesWatchlists').as('WorkflowSecuritiesWatchlists');

    cy.loginInternalAdm('AutomationInternal');
    cy.visit('/Workflow');
    cy.wait('@WorkflowExpansion');
    cy.wait('@WorkflowSecuritiesWatchlists');
  });
  it('verify pre-set filters', function () {
    cy.get('#btn-date-modal').contains('Next 30 Days').should('be.visible');
    cy.get('#editorDiv1000 > h4').contains('Number of Ballots > 0').should('be.visible');
    cy.get('#system-filters').contains('Upcoming Meeting').should('have.class', 'highlightedFilter');
    cy.get('#btn-manage-filters').click();
    cy.url().should('include', '/ManageFilters');
  });

  it('verify filter columns are correctly displayed and in the correct order', function () {
    const filterColumns = [
      'Company Name',
      'Agenda Key',
      'Policy ID',
      'Control Number',
      'Decision Status',
      'Security Country of Trade',
      'Deadline Date',
      'Meeting Date',
      'Record Date',
      'Meeting Type',
      'Shares',
      'Ballot Blocking',
    ];

    filterColumns.forEach((column, index) => {
      cy.get(`th[data-title='${column}']`).should('be.visible');
      if (index == filterColumns.length / 2) {
        cy.get('#btn-scroll-end').click();
      }
    });
  });
});
