import workflowPageItems from '../../../elements/pages/workflow/workflowPageItems'
import loginPageItems from '../../../elements/pages/login/loginPageItems'

const workflowPage = new workflowPageItems();
const loginPage = new loginPageItems();

describe('Login Page', function () {
  beforeEach(function () {
    sessionStorage.clear();
  });
  it('LogIn with a Internal Admin user', function () {
    cy.visit('/');

    var username = Cypress.env('Internal_Admin_Username');
    var userpassword = Cypress.env('Internal_Admin_Password');

    loginPage.usernameInput().type(username);
    loginPage.passwordInput().type(userpassword);
    loginPage.signInButton().click();
    
    //1. Verify if it lands in the Workflow page
    workflowPage.workflowMenuButton().should('exist')
    //2. Verify if session exists
    //cy.getCookie('DEV-session').should('exist');
  });
});
