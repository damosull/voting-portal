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

Then('I verify that the {string} page for an internal user has loaded successfully', () => {
	systemPermissionsItems.forEach((item) => {
		systemPermissionsPage.systemPermissionsSectionHeading(item).should('be.visible');
	});
});

When('I expand the {string} section', (textField) => {
	systemPermissionsPage.systemPermissionsSectionHeading().contains(textField).should('be.visible').click();
});

Then('the {string} section is expanded successfully', () => {
	systemPermissionsPage.expandField().should('have.attr', 'aria-expanded', 'true');
});

const systemPermissionsItems = [
	'Administration - System Permissions',
	'Assign Meetings',
	'Company Page',
	'Custodian Administration',
	'Customer Administration - Custom Fields',
	'Customer Administration - Customer Profile',
	'Customer Administration - Groups',
	'Customer Administration - Users',
	'Customer Administration - Vote Execution Profile',
	'Cutomer Administration - Customer Accounts',
	'Cutomer Administration - Web Disclosure',
	'Dashboard',
	'Export Filter Results',
	'Ownership',
	'Reports',
	'Research',
	'Search Categories',
	'Share Meeting',
	'User Admin',
	'User Admin User Profile',
	'Watchlists',
	'Workflow - Bulk Assign',
	'Workflow Filters',
	'Workflow Grid Fields - BFS Data',
	'Workflow Grid Fields - EDI Data',
	'Workflow Grid Fields - Sustainalytics Data',
	'Workflow Grid Fields - Viewpoint Data',
	'Workflow Meeting Activity',
	'Workflow Meeting Ballots',
	'Workflow Meeting Comments',
	'Workflow Meeting Materials',
	'Workflow Meeting Vote Results',
	'Workflow Meetings Vote Card',
	'Workflow Shared Filters',
	'Workflow System Filters',
	'Workflow Voting',
];
