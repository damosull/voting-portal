import { When, Then } from '@badeball/cypress-cucumber-preprocessor';

When('I navigate to the custodians page', () => {
	cy.visit('/Custodians/Index');
});

Then('I verify that all the relevant API calls for custodians page are made', () => {
	//7 API Calls
	cy.statusCode200('@CURRENT_USER');
	cy.statusCode200('@CUSTODIAN_GRID_STATE');
	cy.statusCode200('@GET_CUSTODIAN_SCREEN_FILTERS');
	cy.statusCode200('@FILTER_CRITERIA_EDITORS');
	cy.statusCode200('@WEBUIRES_MULTI_SELECT_STATIC');
	cy.statusCode200('@POST_CUSTODIAN_LIST');
	cy.statusCode200('@LIST_SERVICE_STATUS_CODE');
});
