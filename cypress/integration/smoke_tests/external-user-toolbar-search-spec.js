/// <reference types="Cypress" />

describe('external user', function () {

  beforeEach(function () {
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
    cy.get('#toolbarSearchFieldInput').type("International Breweries plc").click();
    cy.visit('/MeetingDetails/Index/977763?fromToolbar=true', { timeout: 15000 }).should('exist');
    cy.get('#company-navigate').should('have.text', 'International Breweries Plc');

    // Search for customer ('Companies' option) & verify user is navigated to correct Meeting Detail page
    cy.get('#toolbarSearchFieldInput').type("International Breweries plc");
    cy.get('input[id="toolbar-options--companies"]').should('have.value', 'Companies').click();
    cy.visit('/MeetingDetails/Index/977763?fromToolbar=true', { timeout: 15000 }).should('exist');
    cy.get('#company-navigate').should('have.text', 'International Breweries Plc');
  });
});

