import { And } from "cypress-cucumber-preprocessor/steps"
import userPermissionPage from "../page_objects/userPermission.page"

And('I navigate to the User Permissions page', ()=> {
    
    cy.visit("/UserPermissions");
    //Waiting for page load
    cy.stausCode200('@CURRENT_USER');

})

And('I type {string} into the user name input', (userName)=> {
    
    userPermissionPage.userNameInput().type(userName);

})

And('I choose the first element from the dropdown', ()=> {
    
    userPermissionPage.userNameInputList().click();

})

And('I click on the Workflow Voting dropdown', ()=> {
    
    userPermissionPage.workflowVotingDropdown().click();

})

And('I change the {string} user permission to {string}', (permission_name, access_decision)=> {

    switch (permission_name) {
        case "Vote":
            userPermissionPage.votePermissionDropdown().select(access_decision);
            break;
        case "Instruct":
            userPermissionPage.instructPermissionDropdown().select(access_decision);
            break;
        case "Take No Action":
            userPermissionPage.takeNoActionPermissionDropdown().select(access_decision);
            break;
        default:
            break;
    }

})

And('I click on the Submit changes button', ()=> {
    
    userPermissionPage.submitButton().click();

})