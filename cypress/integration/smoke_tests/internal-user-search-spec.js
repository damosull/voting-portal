import { USER } from '../../support/constants';

describe('Internal user', function () {
  sessionStorage.clear();

  it.skip('Search for client', function () {
    cy.visit('/');

    var username = USER.AUTOMATIONINTERNAL;
    var userpwd = 'Test12345%';
    cy.get('input#username').type(username).should('have.value', username);

    cy.get('input#password').type(userpwd);
    cy.get('#btn-submit-login').click();

    //Assert:
    //1. Verify if it lands in the Workflow page
    cy.get('#workflow-link.active').should('exist');

    //2. Verify if session exists
    cy.getCookie('DEV-session').should('exist');

    cy.intercept('POST', '**/Api/Data/WorkflowExpansion').as('WorkflowExpansion');

    // Search for customer
    //'California Public Employee Retirement System (CalPERS)'
    cy.get('.customerName-Search .k-input').type('CAL', { force: true });
    cy.get('#kendoCustomers-list .k-item').first().click({ force: true });

    // check all meetings in response have CalPERS customer id
    cy.wait('@WorkflowExpansion').then((xhr) => {
      const data = JSON.parse(xhr.response.body);
      const items = data.items;

      items.forEach((item) => {
        const ballots = item.Agendas[0].Policies[0].Ballots;
        ballots.forEach((ballot) => {
          const value = ballot.Summaries.CustomerID.Value;
          expect(value).to.equal(620);
        });
      });
    });
  });
});
