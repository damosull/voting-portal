import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import customerDetailsPage from '../page_objects/customerDetails.page';
const constants = require('../constants');

Then('I should be able to turn the {string}', (setting) => {
	switch (setting) {
		case 'ACSI checkbox to YES':
			customerDetailsPage.acsiCheckbox().should('not.be.visible').check({ force: true }).should('be.checked');
			break;
		default:
			break;
	}
	customerDetailsPage.saveButton().click();
	customerDetailsPage.successMessage().should('contain.text', constants.messages.toast.CUSTOMER_SETTINGS_UPDATED);
});

When('I navigate to the customer details page', () => {
	cy.visit('/CustomerDetails');
});

Then('I verify that all the relevant API calls for customer details page are made for {string} user', (userType) => {
	//7 API Calls
	cy.statusCode200('@CURRENT_USER');
	cy.statusCode200('@CUSTOMER_DETAILS');
	cy.statusCode200('@FILTER_PREFERENCE');
	cy.statusCode200('@LIST_SERVICE_VP_ONLY_WATCHLIST');
	cy.statusCode200('@LIST_SERVICE_POLICY_ID');
	cy.statusCode200('@CUSTOMER_FORMATS');

	if (userType.includes('external')) {
		cy.statusCode200('@GET_CURRENT_USER_COLLEAGUES');
	} else {
		cy.statusCode200('@USERS_FOR_CUSTOMER');
	}
});

Then('I select Custom Fields from The Customer Settings panel', () => {
	customerDetailsPage.customFieldsLink().click();
});

Then('I verify that the customer details page has loaded successfully for {string} user', (userType) => {
	customerDetailsPage.summarySection().should('be.visible');

	if (userType.includes('external')) {
		customerDetailsPage
			.customerNameLabel()
			.should('be.visible')
			.and('have.text', 'California Public Employee Retirement System (CalPERS)');
		customerDetailsPage.customFieldsLink().should('be.visible').and('have.text', 'Custom Fields');
		customerDetailsPage.glassLewisCustomerIdValue().should('be.visible').and('have.text', 'CAL095');
	} else {
		customerDetailsPage.customerNameLabel().should('be.visible').and('have.text', 'Paradice Investment Management');
		customerDetailsPage.glassLewisCustomerIdValue().should('be.visible').and('have.text', 'PIM0916');
	}
});
