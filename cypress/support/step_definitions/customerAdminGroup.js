import { Then } from '@badeball/cypress-cucumber-preprocessor';
import customerAdminGroupPage from '../page_objects/customerAdminGroup.page';
Then('I verify that all the relevant API calls for customer admin group page are made', () => {
	cy.statusCode200('@CURRENT_USER');
	cy.statusCode200('@CUSTOMER_ADMIN_GROUP_GET_ALL_BY_CUSTOMER_ID');
	cy.statusCode200('@LIST_GROUP_MEMBER_GET_ACCOUNT');
});

Then('I verify that the customer admin group page has loaded successfully', () => {
	customerAdminGroupPage.groupTypeLabel().should('be.visible').and('have.text', 'Group Type:');
	customerAdminGroupPage.editButton().should('be.visible').and('have.text', 'Edit');
	customerAdminGroupPage.associationsSection().should('be.visible');
	customerAdminGroupPage.associationGroupsSection().should('be.visible');
});
