/// <reference types="Cypress" />
import '../../support/commands.js';

describe('Admin User functionality tests', function () {
  beforeEach(function () {
    sessionStorage.clear();
    cy.intercept('POST', '**/Api/Data/WorkflowExpansion').as('WorkflowExpansion');
    cy.intercept('POST', '**/Api/Data/WorkflowSecuritiesWatchlists').as('WorkflowSecuritiesWatchlists');

    cy.loginInternalAdm('AutomationInternal');
    cy.visit('/Workflow');
    cy.wait('@WorkflowExpansion');
    cy.wait('@WorkflowSecuritiesWatchlists');
  });
  it('Create Calpers User', function () {
    cy.get('#admin-link-container > a > span').click({ force: true });
    cy.get('#navlink--users').click({ force: true });
    cy.get('.gl-btn').contains('Add New User').trigger('mouseover').click();
    cy.get('#btn-add-new-user', { timeout: 40000 }).click({ force: true });
    cy.randomString(6).then((data) => {
      cy.get('#UserFirstName').type(data);
      cy.get('#UserLastName').type(data);
      cy.get('#ContactEmail').type(data + '@abc.com');
    });
    cy.get('#UserType').select('External', { force: true });
    cy.get('tbody > tr > td > select')
      .eq(0)
      .select('California Public Employee Retirement System (CalPERS)', { force: true });
    cy.get('tbody > tr > td > select').eq(1).select('User', { force: true });
    cy.get('.button-primary.blue').contains('Done').click();
    cy.get('.toast-message').should('contain.text', 'User created successfully');
  });
});
