import { Then } from '@badeball/cypress-cucumber-preprocessor';
import companyPage from '../page_objects/company.page';

Then('The anchor bar should not contain a link to Engagements', () => {
	companyPage.companyNavLinks().should('not.contain', 'Engagements');
});

Then('There is no Engagements section on the Company page', () => {
	companyPage.companyPageBody().should('not.contain', 'Engagements');
});

Then('I should be navigated to the Company page', () => {
	cy.url().should('include', '/Company/Index/23600');
	companyPage.companyNameTitle().should('contain', 'International Business Machines Corp.');
});
