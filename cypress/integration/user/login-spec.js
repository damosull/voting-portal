/// <reference types="Cypress" />

describe('Login Page', function () {
  beforeEach(function () {
    sessionStorage.clear();
  });
  it('LogIn with a Internal Admin user', function () {
    cy.visit('/');

    var username = Cypress.env('Internal_Admin_Username');
    var userpwd = Cypress.env('Internal_Admin_Password');
    cy.get('input#username').fill(username).should('have.value', username);

    cy.get('input#password').fill(userpwd);
    cy.get('#btn-submit-login').click();

    //Assert:
    //1. Verify if it lands in the Workflow page
    cy.get('#workflow-link.active', { timeout: 10000 }).should('exist');

    //2. Verify if session exists
    cy.getCookie('DEV-session').should('exist');
  });
});
