import workflowPageItems from '../../../elements/pages/workflow/workflowPageItems';
import loginPageItems from '../../../elements/pages/login/loginPageItems';

const workflowPage = new workflowPageItems();
const loginPage = new loginPageItems();
const username = Cypress.env('Internal_Admin_Username');
const userPassword = Cypress.env('Internal_Admin_Password');

describe('Login Page', function () {
  beforeEach(function () {
    sessionStorage.clear();
  });
  it('LogIn with a Internal Admin user', function () {
    cy.visit('/');

    loginPage.usernameInput().type(username);
    loginPage.passwordInput().type(userPassword);
    loginPage.signInButton().click();
    
    workflowPage.workflowMenuButton().should('exist')

  });
});
