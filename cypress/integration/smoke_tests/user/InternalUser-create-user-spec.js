import '../../../support/commands.js';
import { USER, messages } from '../../../support/constants.js';
import  workflowPageItems from '../../../elements/pages/workflow/workflowPageItems'
import  usersPageItems from '../../../elements/pages/user/users/usersPageItems'

const workflowPage = new workflowPageItems();
const usersPage = new usersPageItems();
const testUser = {
  firsName: "Test",
  lastName: "User",
  contactEmail: "testuserforusercreation@test.com",
  type: "External",
  customerName : "California Public Employee Retirement System (CalPERS)",
  role: "User"
}

describe('Admin User functionality tests', function () {
  before(function () {
    cy.loginWithAdmin(USER.AUTOMATIONINTERNAL);
    cy.visit('/Workflow');
    cy.stausCode200('@WORKFLOW_SECURITIES_WATCHLIST'); // Last loaded API on tha page - int
  });

  after(function () {
    deleteCreatedTestUser();
  });

  it('Create Calpers User', function () {
    
    // Workflow page
    workflowPage.cogIcon().click();
    workflowPage.users().click();

    // Users page
    cy.stausCode204('@LOGGER'); // Last loaded API on tha page

    usersPage.addNewUserButton().click();
    
    usersPage.userFirstName().type(testUser.firsName);
    usersPage.userLastName().type(testUser.lastName);
    usersPage.contactEmail().type(testUser.contactEmail);
    usersPage.userType().select(testUser.type);
    usersPage.customerNameDropDown().select(testUser.customerName);
    usersPage.userRole().select(testUser.role);  
    usersPage.doneButton().click();
    
    cy.get('.toast-message').should('contain.text', messages.toast.USER_CREATED_SUCCESSFULLY);
  });
  
  function deleteCreatedTestUser(){
    cy.sqlServer(
      `
      DELETE FROM GLP.dbo.UM_UserPreferences
      WHERE userID IN (
        SELECT userID FROM GLP.dbo.UM_User
        WHERE LoginID = '`+ testUser.contactEmail +`'
        )
      DELETE FROM GLP.dbo.UM_User
      WHERE LoginID = '`+ testUser.contactEmail +`'
      `
    );
};
});
