/// <reference types="Cypress" />


describe('Internal user', function () {
  sessionStorage.clear()
  
  it('Search for client', function () {
    cy.visit("/");

    var username = Cypress.env('Internal_Admin_Username');
    var userpwd = Cypress.env('Internal_Admin_Password');
    cy.get("input#username").type(username).should('have.value', username);

    cy.get("input#password").type(userpwd);
    cy.get("#btn-submit-login").click();

    //Assert:
    //1. Verify if it lands in the Workflow page
    cy.get('#workflow-link.active', { timeout: 10000 }).should('exist');

    //2. Verify if session exists
    cy.getCookie('DEV-session').should('exist');

    cy.server();
    cy.route('POST', '/Api/Data/WorkflowExpansion').as('post');

    // Search for customer
    //'California Public Employee Retirement System (CalPERS)'
    cy.get('.customerName-Search .k-input').type("CAL",{force:true});
    cy.get('#kendoCustomers-list .k-item').first().click({force:true});
    
    // check all meetings in response have CalPERS customer id
    cy.wait('@post').its('response.body.items').each((item) => {
      expect(item.Summaries.CustomerID.Value).to.equal(196);
    });
  });
});
