import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import userPermissionPage from '../page_objects/userPermission.page';
const constants = require('../constants');

Then('I navigate to the User Permissions page', () => {
	cy.visit('/UserPermissions');
});

Then('I verify that all the relevant API calls for user permissions page are made', () => {
	cy.statusCode200('@CURRENT_USER');
});

Then('I type {string} into the user name input', (userName) => {
	userPermissionPage.userNameInput().type(userName);
});

Then('I choose the first element from the dropdown', () => {
	userPermissionPage.userNameInputList().click();
});

Then('I change the {string} user permission to {string}', (permission_name, access_decision) => {
	switch (permission_name) {
		case 'Vote':
			userPermissionPage.votePermissionDropdown().select(access_decision);
			break;
		case 'Instruct':
			userPermissionPage.instructPermissionDropdown().select(access_decision);
			break;
		case 'Take No Action':
			userPermissionPage.takeNoActionPermissionDropdown().select(access_decision);
			break;
		case 'View ACSI Recommendations':
			userPermissionPage.viewACSIRecommendations().select(access_decision);
			break;
		case 'View Rule Name':
			userPermissionPage.viewRuleName().select(access_decision);
			break;
		default:
			break;
	}
});

Then('I click on the Submit changes button', () => {
	userPermissionPage.submitButton().click();
});

When('I navigate to User Permissions page for {string}', (username) => {
	cy.visit('/UserPermissions');
	cy.statusCode200('@CURRENT_USER');

	userPermissionPage.userNameInput().type(constants.USER[username]);
	userPermissionPage.userNameInputList().click();
});

Then('I click on the {string} dropdown', (setting) => {
	cy.contains(setting).should('be.visible').click();
});

Then('the search results for {string} are loaded successfully', (username) => {
	userPermissionPage.userNameInputList().should('be.visible').and('have.text', username);
});
