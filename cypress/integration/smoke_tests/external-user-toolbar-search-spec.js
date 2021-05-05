/// <reference types="Cypress" />

describe('external user', function () {

  beforeEach(function () {
    sessionStorage.clear()
    cy.login(Cypress.env('External_Username'));
  })

  it('Toolbar search', function () {
    cy.visit("/");

    //Assert:
    //1. Verify if it lands in the Workflow page
    cy.get('#workflow-link.active', { timeout: 10000 }).should('exist');
    //2. Verify if session exists
    cy.getCookie('DEV-session').should('exist');

    // Search for Customer ('Meetings'option is default) & verify user is navigated to correct Meeting Detail page 
    cy.get('#toolbarSearchFieldInput').type("International Breweries plc");
    cy.contains('International Breweries Plc | NG').click();
    cy.url().should('include', '/MeetingDetails/Index/');
    cy.get('#company-navigate').should('have.text', 'International Breweries Plc');

    // Search for customer ('Companies' option) & verify user is navigated to correct Company page
    cy.get('#toolbarSearchFieldInput').type("international business machines");
    cy.get('#toolbar-options--companies').should('have.value', 'Companies').click();
    cy.contains('International Business Machines Corp. | US').click();
    cy.url().should('include', '/Company/Index/23600');
    cy.get('#md-issuer-name').should('contain', 'International Business Machines Corp.');
  });
});

