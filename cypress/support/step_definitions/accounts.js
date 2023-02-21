import { When, Then } from '@badeball/cypress-cucumber-preprocessor';

When('I navigate to the accounts page', () => {
	cy.visit('/Accounts/Index');
});

Then('I verify that all the relevant API calls for accounts page are made', () => {
	//8 API Calls
	cy.statusCode200('@CURRENT_USER');
	cy.statusCode200('@CUSTOMER_DETAILS');
	cy.statusCode200('@ACCOUNTS_GRID_STATE');
	cy.statusCode200('@GET_ACCOUNT_FILTERS_BY_SCREEN_ID');
	cy.statusCode200('@FILTER_CRITERIA_EDITORS');
	cy.statusCode200('@WEBUIRES_MULTI_SELECT_STATIC');
	cy.statusCode200('@ACCOUNTS_NEW');
	cy.statusCode200('@LIST_SERVICE_ACCOUNT_STATUS_CODE');
});
