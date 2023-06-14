import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import usersPage from '../page_objects/users.page';
const constants = require('../constants');

When('I navigate to the users page', () => {
	cy.visit('/Users/Index');
});

Then('I verify that all the relevant API calls for users page are made', () => {
	//11 API Calls
	cy.statusCode200('@CURRENT_USER');
	cy.statusCode200('@USER_CREATOR_PERMISSIONS');
	cy.statusCode200('@USER_VIEW_MODEL_VALIDATION_RULES');
	cy.statusCode200('@CUSTOMER_SEARCH');
	cy.statusCode200('@USER_SCREEN_FILTERS');
	cy.statusCode200('@FILTER_CRITERIA_EDITORS');
	cy.statusCode200('@WEBUIRES_MULTI_SELECT_STATIC');
	cy.statusCode200('@WEBUIRES_USER_SPECIAL');
	cy.statusCode200('@POST_USER_LISTS');
	cy.statusCode200('@LIST_SERVICE_STATUS_CODE');
});

Then('I fill the required details for a new user and submit', () => {
	usersPage.addNewUserButton().click();
	usersPage.userFirstName().type(constants.TESTUSER.FIRSNAME);
	usersPage.userLastName().type(constants.TESTUSER.LASTNAME);
	cy.randomString(8).then((data) => {
		usersPage.contactEmail().type(`automation-${data}@glasslewis.com`);
	});
	usersPage.userType().select(constants.TESTUSER.TYPE);
	usersPage.customerNameDropDown().select(constants.TESTUSER.CUSTOMERNAME);
	usersPage.userRole().select(constants.TESTUSER.ROLE);
	usersPage.doneButton().click();
});

Then('the new user should be created successfully', () => {
	usersPage.successMessage().should('contain.text', constants.messages.toast.USER_CREATED_SUCCESSFULLY);
});

Then('I verify that the users page for an internal user has loaded successfully', () => {
	usersPage.tableData().should('be.visible');
});
