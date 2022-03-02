import { USER, API } from '../../support/constants';
import workflowPageItems from '../../elements/pages/workflow/workflowPageItems';
import loginPageItems from '../../elements/pages/login/loginPageItems';

const workflowPage = new workflowPageItems();
const loginPage = new loginPageItems();

describe('Internal user', function () {
  beforeEach(function () {
    sessionStorage.clear();
  })

  it('Search for client', function () {
    cy.intercept('POST', API.POST.WORKFLOW_EXPANSION).as('WORKFLOW_EXPANSION');
    cy.visit('/');

    loginPage.usernameInput().type(USER.AUTOMATIONINTERNAL);
    loginPage.passwordInput().type(USER.PASSWORD.TEST_PASSWORD);
    loginPage.signInButton().click();

    //Assert:
    //1. Verify if it lands in the Workflow page
    workflowPage.workflowMenuButton().should('exist');

    //2. Verify if session exists
    cy.getCookie('DEV-session').should('exist');

    // Search for customer
    //'California Public Employee Retirement System (CalPERS)'
    cy.get('.customerName-Search .k-input').type('CAL', { force: true });
    cy.get('#kendoCustomers-list .k-item').first().click({ force: true });

    // check all meetings in response have CalPERS customer id
    cy.wait('@WORKFLOW_EXPANSION').then((xhr) => {
      const data = JSON.parse(xhr.response.body);
      //const parsed = JSON.parse(data); 
      const items = data.items;

      items.forEach((item) => {
        const ballots = item.Agendas[0].Policies[0].Ballots;
        ballots.forEach((ballot) => {
          const value = ballot.Summaries.CustomerID.Value;
          expect(value).to.equal(196);
        });
      });
    });
  });
});
