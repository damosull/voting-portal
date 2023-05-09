import { Then } from '@badeball/cypress-cucumber-preprocessor';
import siteConfigurationPage from '../page_objects/siteConfiguration.page';
Then('I verify that all the relevant API calls for site configuration page are made', () => {
	cy.statusCode200('@CURRENT_USER');
	cy.statusCode200('@GET_WD_CRITERIA_COLUMN');
	cy.statusCode200('@SITE_CONFIG_GET_DEFAULT');
	cy.statusCode200('@SITE_CONFIG');
	cy.statusCode200('@SITE_CONFIG_ID');
	cy.statusCode200('@LIST_SERVICE_DECISION_STATUS');
});

Then('I verify that the site configuration page has loaded successfully', () => {
	siteConfigurationPage.newSiteLabel().should('be.visible').and('have.text', '*New Site');
	siteConfigurationPage.criteriaButton().should('be.visible').and('have.text', 'Add Criteria');
	siteConfigurationPage.columnsSection().should('be.visible').and('have.text', 'Columns');
	siteConfigurationPage.voteCardSection().should('be.visible').and('have.text', 'Vote Card');
	siteConfigurationPage.presentationSection().should('be.visible').and('have.text', 'Presentation');
});
