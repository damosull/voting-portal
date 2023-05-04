import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import customersPage from '../page_objects/customers.page';
import customerDetailsPage from '../page_objects/customerDetails.page';

Then('I search for customer with name {string}', (customerName) => {
	customersPage.addCriteria().should('be.visible');
	customersPage.customerNamePopUp().invoke('attr', 'style', 'display: block');
	customersPage.customerNameInput().type(customerName);
	cy.wait('@POST_CUSTOMER_DYNAMIC');
	customersPage.customerNameSearchResultsSelectedOption().should('be.visible').click();
	customersPage.customerNameInput().type('{ENTER}');
	//Click Update button
	customersPage.customerNameSearchUpdateButton().click();
	//Click the customer name to go into the customer settings
	customersPage.customerNameLinks().eq(0).click();
	customerDetailsPage.customerNameLabel().should('be.visible');
});

When('I navigate to the customers page', () => {
	cy.visit('/Customers');
});

Then('I verify that all the relevant API calls for customer user page are made', () => {
	cy.statusCode200('@CURRENT_USER');
	cy.statusCode200('@GET_CUSTOMER_SCREEN_FILTERS');
	cy.statusCode200('@FILTER_CRITERIA_EDITORS');
	cy.statusCode200('@WEBUIRES_MULTI_SELECT_STATIC');
	cy.statusCode200('@WEBUIRES_COMPANY_NAME_SPECIAL');
	cy.statusCode200('@POST_CUSTOMER_DYNAMIC');
	cy.statusCode200('@LIST_SERVICE_STATUS_CODE');
});

Then('I verify that the customers page has loaded successfully', () => {
	customersPage.customerTable().should('be.visible');
});
