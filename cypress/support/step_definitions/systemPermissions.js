import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import systemPermissionsPage from '../page_objects/systemPermissions.page';

When('I navigate to the system permissions page', () => {
	cy.visit('/systempermissions');
});

Then('I verify that all the relevant API calls for system permissions page are made', () => {
	//2 API Calls
	cy.statusCode200('@CURRENT_USER');
	cy.statusCode200('@PERMISSIONS');
});

Then('I verify that the system permissions page for an internal user has loaded successfully', () => {
	systemPermissionsPage
		.systemPermissionsSectionHeading()
		.contains('Administration - System Permissions')
		.should('be.visible');
	systemPermissionsPage.systemPermissionsSectionHeading().contains('Assign Meetings').should('be.visible');
	systemPermissionsPage.systemPermissionsSectionHeading().contains('Company Page').should('be.visible');
	systemPermissionsPage.systemPermissionsSectionHeading().contains('Custodian Administration').should('be.visible');
	systemPermissionsPage
		.systemPermissionsSectionHeading()
		.contains('Customer Administration - Custom Fields')
		.should('be.visible');
	systemPermissionsPage
		.systemPermissionsSectionHeading()
		.contains('Customer Administration - Customer Profile')
		.should('be.visible');
	systemPermissionsPage
		.systemPermissionsSectionHeading()
		.contains('Customer Administration - Groups')
		.should('be.visible');
	systemPermissionsPage
		.systemPermissionsSectionHeading()
		.contains('Customer Administration - Users')
		.should('be.visible');
	systemPermissionsPage
		.systemPermissionsSectionHeading()
		.contains('Customer Administration - Vote Execution Profile')
		.should('be.visible');
	systemPermissionsPage
		.systemPermissionsSectionHeading()
		.contains('Cutomer Administration - Customer Accounts')
		.should('be.visible');
	systemPermissionsPage
		.systemPermissionsSectionHeading()
		.contains('Cutomer Administration - Web Disclosure')
		.should('be.visible');
	systemPermissionsPage.systemPermissionsSectionHeading().contains('Dashboard').should('be.visible');
	systemPermissionsPage.systemPermissionsSectionHeading().contains('Export Filter Results').should('be.visible');
	systemPermissionsPage.systemPermissionsSectionHeading().contains('Ownership').should('be.visible');
	systemPermissionsPage.systemPermissionsSectionHeading().contains('Reports').should('be.visible');
	systemPermissionsPage.systemPermissionsSectionHeading().contains('Research').should('be.visible');
	systemPermissionsPage.systemPermissionsSectionHeading().contains('Search Categories').should('be.visible');
	systemPermissionsPage.systemPermissionsSectionHeading().contains('Share Meeting').should('be.visible');
	systemPermissionsPage.systemPermissionsSectionHeading().contains('User Admin').should('be.visible');
	systemPermissionsPage.systemPermissionsSectionHeading().contains('User Admin User Profile').should('be.visible');
	systemPermissionsPage.systemPermissionsSectionHeading().contains('Watchlists').should('be.visible');
	systemPermissionsPage.systemPermissionsSectionHeading().contains('Workflow - Bulk Assign').should('be.visible');
	systemPermissionsPage.systemPermissionsSectionHeading().contains('Workflow Filters').should('be.visible');
	systemPermissionsPage
		.systemPermissionsSectionHeading()
		.contains('Workflow Grid Fields - BFS Data')
		.should('be.visible');
	systemPermissionsPage
		.systemPermissionsSectionHeading()
		.contains('Workflow Grid Fields - EDI Data')
		.should('be.visible');
	systemPermissionsPage
		.systemPermissionsSectionHeading()
		.contains('Workflow Grid Fields - Sustainalytics Data')
		.should('be.visible');
	systemPermissionsPage
		.systemPermissionsSectionHeading()
		.contains('Workflow Grid Fields - Viewpoint Data')
		.should('be.visible');
	systemPermissionsPage.systemPermissionsSectionHeading().contains('Workflow Meeting Activity').should('be.visible');
	systemPermissionsPage.systemPermissionsSectionHeading().contains('Workflow Meeting Ballots').should('be.visible');
	systemPermissionsPage.systemPermissionsSectionHeading().contains('Workflow Meeting Comments').should('be.visible');
	systemPermissionsPage.systemPermissionsSectionHeading().contains('Workflow Meeting Materials').should('be.visible');
	systemPermissionsPage
		.systemPermissionsSectionHeading()
		.contains('Workflow Meeting Vote Results')
		.should('be.visible');
	systemPermissionsPage.systemPermissionsSectionHeading().contains('Workflow Meetings Vote Card').should('be.visible');
	systemPermissionsPage.systemPermissionsSectionHeading().contains('Workflow Shared Filters').should('be.visible');
	systemPermissionsPage.systemPermissionsSectionHeading().contains('Workflow System Filters').should('be.visible');
	systemPermissionsPage.systemPermissionsSectionHeading().contains('Workflow Voting').should('be.visible');
});

When('I expand the {string} section', (textField) => {
	systemPermissionsPage.systemPermissionsSectionHeading().contains(textField).should('be.visible').click();
});

Then('the {string} section is expanded successfully', () => {
	systemPermissionsPage.expandField().should('have.attr', 'aria-expanded', 'true');
});
