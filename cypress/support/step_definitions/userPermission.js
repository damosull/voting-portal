import { When, Then, And } from "cypress-cucumber-preprocessor/steps"
import userPermissionPage from "../page_objects/userPermission.page"
const constants = require ('../constants')

And('I navigate to the User Permissions page', ()=> {
    cy.visit("/UserPermissions")
})

Then('I verify that all the relevant API calls for user permissions page are made', () => {
    cy.statusCode200('@CURRENT_USER')
})

And('I type {string} into the user name input', (userName)=> {
    userPermissionPage.userNameInput().type(userName)
})

And('I choose the first element from the dropdown', ()=> {
    userPermissionPage.userNameInputList().click()
})

And('I change the {string} user permission to {string}', (permission_name, access_decision)=> {

    switch (permission_name) {
        case "Vote":
            userPermissionPage.votePermissionDropdown().select(access_decision)
            break
        case "Instruct":
            userPermissionPage.instructPermissionDropdown().select(access_decision)
            break
        case "Take No Action":
            userPermissionPage.takeNoActionPermissionDropdown().select(access_decision)
            break
        case "View ACSI Recommendations":
            userPermissionPage.viewACSIRecommendations().select(access_decision)
            break
        case "View Rule Name":
            userPermissionPage.viewRuleName().select(access_decision)
            break
        default:
            break
    }

})

And('I click on the Submit changes button', ()=> {
    userPermissionPage.submitButton().click()
})

When('I navigate to User Permissions page for {string}', (username)=> {
    cy.visit("/UserPermissions")
    cy.statusCode200('@CURRENT_USER')

    userPermissionPage.userNameInput().type(constants.USER[username])
    userPermissionPage.userNameInputList().click()
})

And('I click on the {string} dropdown', (setting)=> {
    cy.contains(setting).should('be.visible').click()
})