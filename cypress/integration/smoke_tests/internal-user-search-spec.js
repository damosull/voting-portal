/// <reference types="Cypress" />


describe('Internal user', function () {
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

    //cy.get('.customerName-Search > .k-widget > .k-dropdown-wrap > .k-input').type("CAL"); 
    cy.server()
    cy.route('POST', '/Api/Data/WorkflowExpansion').as('post')

    cy.get('.customerName-Search .k-input').type("CAL");
    cy.get('#kendoCustomers-list .k-item').first().click();
    //'California Public Employee Retirement System (CalPERS)'


    cy.wait('@post').then((xhr) => {
      assert.isNotNull(xhr.response.body)
    })
    cy.get('@post').its('response.body.items').each((item) => {
      assert.equal(item.Summaries.CustomerID.Value, 196)

    })
  })
})