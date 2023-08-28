import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import dashboardPage from '../page_objects/dashboard.page';
import * as dateUtils from '../../utils/date';
const constants = require('../constants');

When('I navigate to the dashboard page', () => {
	cy.visit('/Dashboard');
});

Then('I verify that all the relevant API calls for dashboard page are made', () => {
	//23 API Calls
	cy.statusCode200('@CURRENT_USER');
	cy.statusCode200('@SPA');
	cy.statusCode200('@GET_MARKUP_WORKFLOW');
	cy.statusCode200('@DASHBOARD_MARKUP');
	cy.statusCode200('@DASHBOARD');
	cy.statusCode200('@WIDGET_META');
	cy.statusCode200('@DASHBOARD_PERMISSIONS');
	cy.statusCode200('@DASHBOARD_SETTINGS');
	cy.statusCode200('@GET_MARKUP_MEETING_DETAILS');
	cy.statusCode200('@GET_USER_PERMISSION');
	cy.statusCode200('@WORKFLOW_CONFIGURE_COLUMNS_WITH_NO_SEARCH');
	cy.statusCode200('@DASHBOARD_FILTERS');
	cy.statusCode200('@WORKFLOW_META_DATA');
	cy.statusCode200('@ESG_RANKINGS_FIELDS');
	cy.statusCode200('@DASHBOARD_DETAILS');
	cy.statusCode200('@WORKFLOW_WIDGET_DATA');
	cy.statusCode200('@DASHBOARD_FILTER_DETAILS');
	cy.statusCode200('@GL_BLOG_DATA');
	cy.statusCode200('@DASHBOARD_SUBSCRIPTION');
});

Then('I select Subscriptions link', () => {
	dashboardPage.subscriptionsContainerAtTheBottom().should('include.text', 'Subscriptions').click();
	dashboardPage.pageBody().then(($body) => {
		if ($body.find('#current-subscribers-list > tbody > tr > td > i[class="fa fa-times"]').length > 0) {
			dashboardPage.deleteSubscriptionLink().eq(1).click();
			dashboardPage.okButton().click();
		}
	});
});

Then('I click Add Subscription button', () => {
	dashboardPage.addSubscriptionButton().should('include.text', 'Add Subscription').click();
	dashboardPage.addSubscriptionPopupTitle().should('have.text', 'ADD SUBSCRIPTION');
	dashboardPage.getLoadingSpinner().should('not.exist');
});

Then('I select Calpers External Admin from Users list on dashboard page', () => {
	dashboardPage.addSubscriptionPopupUserInput().wait(500).type('Cal');
	dashboardPage.addSubscriptionPopupUserDropdown().should('be.visible');
	dashboardPage.addSubscriptionPopupUserInput().type('{enter}');
});

Then('I enter Filename DashboardTest', () => {
	dashboardPage.addSubscriptionPopupFilenameInput().type('DashboardTest');
});

Then('I enter Schedule to run Subscription on dashboard page', () => {
	// Daily, every 5 hours, 9AM to 6PM
	dashboardPage.addSubscriptionPopupScheduleDropdown().select('0');
	dashboardPage.addSubscriptionPopupScheduleDropdown().find(':selected').should('have.text', 'Daily');
	dashboardPage.addSubscriptionPopupEveryHoursDropdown().select('5');
	dashboardPage.addSubscriptionPopupEveryHoursDropdown().find(':selected').should('have.text', '5 Hours');
	dashboardPage.addSubscriptionPopupRunAtDropdown().select('9');
	dashboardPage.addSubscriptionPopupEndTimeDropdown().select('18');
});

Then('I enter Subject,header & footer', () => {
	dashboardPage.addSubscriptionPopupSubjectInput().type('DashboardSubjectTest');
	dashboardPage.addSubscriptionPopupHeaderInput().type('TestHeader');
	dashboardPage.addSubscriptionPopupFooterInput().type('TestFooter');
});

Then('I click OK', () => {
	dashboardPage.addSubscriptionPopupOkButton().click();
});

Then('I verify Toast message - Subscription added', () => {
	dashboardPage.toastMessage().should('contain.text', constants.messages.toast.SUBSCRIPTION_ADDED);
});

Then('I connect to Aqua Database and verify new row has been added to SB_Subscription table', () => {
	cy.getAutomationUserIDFromDB(constants.USER.CALPERS).as('userid');
	// Step 11 - Connect to Aqua Database and verify new row has been added to SB_Subscription table
	cy.executeQuery('SELECT TOP 1 * FROM SB_Subscription ORDER BY SubscriptionID DESC').then((result) => {
		// Step 12 - Verify SB_Subscription table Column data for correct data
		// Verify Active
		expect(result[0].IsActive).to.be.true;
		// SubscriberID
		cy.get('@userid').then((uidResult) => {
			expect(result[0].SubscriberID).to.equal(uidResult);
		});
		// Check Frequency XML for schedule
		expect(result[0].Frequency).to.include('<EveryHours>5</EveryHours>');
		// Customer ID
		expect(result[0].CustomerID).to.equal(constants.USERID[Cypress.env('username')]);
		// Deliver to Everyone = false
		expect(result[0].DeliverToEveryone).to.be.false;
		// Created date
		cy.compare2Dates(result[0].CreatedDate, dateUtils.getCurrentTime());
		// Last Modified date
		cy.compare2Dates(result[0].LastModifiedDate, dateUtils.getCurrentTime());
		// Created by
		cy.get('@userid').then((uidResult) => {
			expect(result[0].LastModifiedBy).to.equal(uidResult);
		});
		// Verify Filename
		expect(result[0].FileName).to.equal('DashboardTest');
		// Check emailsettings table for Subject,header & footer
		expect(result[0].EmailSettings).to.equal(
			'{"Subject":"DashboardSubjectTest","Header":"TestHeader","Footer":"TestFooter"}'
		);
		// Total Fields
		expect(Object.keys(result[0]).length).to.equal(19);
	});
});

Then('I remove Subscription entry from Viewpoint on dashboard page', () => {
	dashboardPage.deleteSubscriptionLink().eq(1).click();
	dashboardPage.okButton().click();
});

Then('I verify sidebar links', () => {
	dashboardPage.sidebarLinks().eq(0).should('include.text', 'My dashboards');
	dashboardPage.sidebarLinks().eq(1).should('include.text', 'Default dashboard');
	dashboardPage.sidebarLinks().eq(2).should('include.text', 'Shared dashboards');
	dashboardPage.pageTitle().should('have.text', 'Upcoming Meetings').should('be.visible');
});

Then('I verify Upcoming Meetings highlighted', () => {
	dashboardPage.highlightedFilter().should('include.text', 'Upcoming Meetings');
});

Then('I verify heading buttons and links', () => {
	dashboardPage.saveAsButton().should('be.visible').should('have.text', 'Save As');
	dashboardPage.addWidgetButton().should('be.visible');
	dashboardPage.addWidgetButton().should('include.text', 'Add Widget');
	dashboardPage.exportButton().should('be.visible').should('include.text', 'Export');
	dashboardPage.widgetsButton().should('be.visible').should('include.text', 'Widgets');
	dashboardPage.sharingButton().should('be.visible').should('include.text', 'Sharing');
	dashboardPage.subscriptionsButton().should('be.visible').should('include.text', 'Subscriptions');
});

Then('I verify Widget headers', () => {
	dashboardPage.widgetModal().eq(0).find('.floatleft').should('include.text', 'Workflow: Upcoming Meetings');
	dashboardPage.widgetModal().eq(1).find('.floatleft').should('include.text', 'Workflow: Upcoming Meetings');
	dashboardPage.widgetModal().eq(2).find('.floatleft').should('include.text', 'Workflow: Upcoming Meetings');
	dashboardPage.widgetModal().eq(3).find('.floatleft').should('include.text', 'Glass Lewis Blog');
});

Then('I verify each widget has edit and remove buttons', () => {
	dashboardPage.widgetModal().each((widget) => {
		cy.wrap(widget).find('div > a[title="Settings"]').should('be.visible');
		cy.wrap(widget).find('div > a[title="Remove"]').should('be.visible');
	});
});

Then('I verify Subscriptions', () => {
	dashboardPage.subscriptionsContainerAtTheBottom().should('include.text', 'Subscriptions').click();
	dashboardPage.addSubscriptionButton().should('include.text', 'Add Subscription');
});

Then('I add a widget', () => {
	dashboardPage.addWidgetButton().click();
	dashboardPage.addWidgetCheckbox('Previews').check({ force: true });
	dashboardPage.applyButton().click();
	dashboardPage.previewsModalLabel().should('be.visible');
});

Then('I check dropdown values selectable', () => {
	dashboardPage.widgetCheckboxLabels().eq(8).select('Single').find(':selected').contains('Single');
	dashboardPage.widgetCheckboxLabels().eq(9).select('Single').find(':selected').contains('Single');
	dashboardPage.widgetCheckboxLabels().eq(8).select('Double').find(':selected').contains('Double');
	dashboardPage.widgetCheckboxLabels().eq(9).select('Double').find(':selected').contains('Double');
});

Then('I select certain values', () => {
	dashboardPage.updateButton().eq(4).click({ force: true });
	cy.wait('@DOCUMENTS_DATA');
});

Then('I check returned table headers', () => {
	dashboardPage.previewsModalTableRows().within(() => {
		dashboardPage.tableData().eq(0).contains('COUNTRY/MARKET');
		dashboardPage.tableData().eq(1).contains('SEASON');
		dashboardPage.tableData().eq(2).contains('FILE');
	});
});

Then('I remove widget', () => {
	dashboardPage
		.widgetModal()
		.eq(4)
		.then((wdgt) => {
			cy.wrap(wdgt).find('div > a[title="Settings"]').should('be.visible');
			cy.wrap(wdgt).find('div > a[title="Remove"]').should('be.visible').click();
		});
});

Then('I verify a couple of widgets have loaded', () => {
	dashboardPage.widgetModalContent().eq(0).should('be.visible');
	dashboardPage.widgetModalContent().eq(1).should('be.visible');
	dashboardPage.widgetModalContent().eq(2).should('be.visible');
	dashboardPage.widgetModalContent().eq(3).should('be.visible');
});
