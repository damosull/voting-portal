import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import rationalePage from '../page_objects/rationale.page';

When('I navigate to the rationale page', () => {
	cy.visit('/CustomerDetails/Rationale');
});

Then('I verify that all the relevant API calls for rationale page are made', () => {
	//7 API Calls
	cy.statusCode200('@CURRENT_USER');
	cy.statusCode200('@POSHYTIP');
	cy.statusCode200('@POSHYTIP_EDITABLE');
	cy.statusCode200('@CUSTOMER_DETAILS');
	cy.statusCode200('@RATIONALE_LIBRARY');
	cy.statusCode200('@POSHYTIP');
	cy.statusCode200('@POSHYTIP_EDITABLE');
});

Then('I verify the add rationale button has loaded', () => {
	rationalePage.addRationaleButton().should('be.visible');
});