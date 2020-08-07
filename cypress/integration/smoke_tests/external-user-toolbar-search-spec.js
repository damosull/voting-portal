/// <reference types="Cypress" />

describe('external user', function () {

  beforeEach(function () {
    // cy.server();
    //cy.route('POST', "**/Api/Data/WorkflowExpansion").as('WorkflowExpansion');
    cy.login(Cypress.env('External_Admin_Username'));
    //cy.visit("/Workflow");
    //cy.wait('@WorkflowExpansion');
  })



  it('Toolbar search', function () {
    cy.visit("/");

    //Assert:
    //1. Verify if it lands in the Workflow page
    cy.get('#workflow-link.active', { timeout: 10000 }).should('exist');
    //2. Verify if session exists
    cy.getCookie('DEV-session').should('exist');
    // Search for customer
    //'California Public Employee Retirement System (CalPERS)'
    cy.get('#toolbarSearchFieldInput').type("International Business Machines").click();
    cy.contains("International Business Machines Corp. | US").click();

    //Verify user is navigated to Meeting Detail page of that specific oganisation
    
  });
});

