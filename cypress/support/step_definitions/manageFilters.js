import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import manageFiltersPage from '../page_objects/manageFilters.page';
import * as dateUtils from '../../utils/date';
const constants = require('../constants');

When('I navigate to the Manage Filters page', () => {
	cy.intercept('GET', constants.API.GET.SUBSCRIPTION_FILTER).as('SUBSCRIPTION_FILTER');
	cy.visit('/ManageFilters');
});

Then('I can see the Manage Filters page', () => {
	cy.url().should('include', '/ManageFilters');
	manageFiltersPage.filterNameInput().should('have.text', 'Upcoming Meetings');
	cy.wait('@SUBSCRIPTION_FILTER');
});

When('I {string} the subscription', (action) => {
	switch (action) {
		case 'add':
			//Step 4 - Click "Add Subscription" button
			manageFiltersPage.addSubscriptionButton().click();
			cy.wait('@SUBSCRIPTIONS');
			//Step 5 - Select 'Calpers External Admin' from Users list
			manageFiltersPage.addSubscriptionPopupTitle().should('be.visible');
			manageFiltersPage.addSubscriptionPopupUserInput().click().type('Charles');
			manageFiltersPage.addSubscriptionPopupUserList().focus().blur().click({ force: true });
			//Step 6 - Enter Schedule to run Subscription
			//Weekly, 8 AM every Monday
			manageFiltersPage.addSubscriptionPopupScheduleDropdown().select('1');
			manageFiltersPage.addSubscriptionPopupMondayCheckbox().check({ force: true });
			manageFiltersPage.addSubscriptionPopupCSVCheckbox().check({ force: true });
			//Step 7 - Click OK
			manageFiltersPage.addSubscriptionOkButton().click();
			cy.wait('@LOGGER');
			cy.wait('@DATA');
			break;
		case 'remove':
			//Step 11 - Remove Subscription entry from Viewpoint
			manageFiltersPage.existingSubscriptionRemove().first().click({ force: true });
			manageFiltersPage.OkButton().click();
			break;
	}
});

Then('I should be able to see a success message for the {string} subscription', (action) => {
	switch (action) {
		case 'added':
			manageFiltersPage.toastMessage().should('contain.text', constants.messages.toast.SUBSCRIPTION_ADDED);
			break;
		case 'removed':
			manageFiltersPage.toastMessage().should('contain.text', constants.messages.toast.SUBSCRIPTION_DELETED);
			break;
	}
});

Then('the subscription is available in the database', () => {
	cy.getAutomationUserIDFromDB(constants.USER.CHARLESSCHWAB).as('userid');
	//Step 9 - Connect to Aqua Database and verify new row has been added
	cy.executeQuery('SELECT TOP 1 * FROM FL_Subscription ORDER BY SubscriptionID DESC').then((result) => {
		//Step 10 - Verify FL_Subscription table Column data correct data
		// Verify Active
		expect(result[0].IsActive).to.be.true;
		// SubscriberID
		cy.get('@userid').then((uidResult) => {
			expect(result[0].UserID).to.equal(uidResult);
		});
		// Customer ID
		expect(result[0].CustomerID).to.equal(constants.USERID[Cypress.env('username')]);
		// Deliver to Everyone = false
		expect(result[0].IsEveryone).to.be.false;
		// Created date
		cy.compare2Dates(result[0].CreatedDate, dateUtils.getCurrentTime());
		// Last Modified date
		cy.compare2Dates(result[0].LastModifiedDate, dateUtils.getCurrentTime());
		// Created by
		cy.get('@userid').then((uidResult) => {
			expect(result[0].LastModifiedBy).to.equal(uidResult);
		});
		// Total Fields
		expect(Object.keys(result[0]).length).to.equal(19);
	});
});

Then('I remove all existing subscriptions', () => {
	manageFiltersPage.pageBody().then(($body) => {
		if ($body.find('[class="fa fa-times"]').length > 0) {
			const len = $body.find('[class="fa fa-times"]').length;
			for (let i = len; i >= 0; i--) {
				if (i > 0) {
					manageFiltersPage
						.existingSubscriptionRemoveButton()
						.eq(i - 1)
						.click({ force: true });
					manageFiltersPage.OkButton().click();
				}
			}
			manageFiltersPage.existingSubscriptionRemoveButton().filter(':visible').should('have.length', 0);
		}
	});
});

Then('I verify that all the relevant API calls for manage filters page are made', () => {
	cy.statusCode200('@CURRENT_USER');
	cy.statusCode200('@FILTERS_DIRECTORY');
	cy.statusCode200('@GET_FOR_USER');
	cy.statusCode200('@GET_CURRENT_USER_COLLEAGUES');
	cy.statusCode200('@GET_BY_ID');
	cy.statusCode200('@SUBSCRIPTION_FILTER');
	cy.statusCode200('@FILTER_TO_SHARE');
	cy.statusCode200('@REPORT_TYPE');
});

Then('I verify that the manage filters page for an {string} user has loaded successfully', (userType) => {
	if (userType.includes('external')) {
		manageFiltersPage.quickFiltersSection().contains('Advanced Filter').and('be.visible');
	}

	manageFiltersPage.quickFiltersSection().contains('Contested Meetings').and('be.visible');
	manageFiltersPage.quickFiltersSection().contains('Glass Lewis Conflicts of Interest').and('be.visible');
	manageFiltersPage.quickFiltersSection().contains('Proxy Paper Republications').and('be.visible');
	manageFiltersPage.quickFiltersSection().contains('Report Feedback Statements').and('be.visible');
	manageFiltersPage.quickFiltersSection().contains('Requires Attention').and('be.visible');
	manageFiltersPage.quickFiltersSection().contains('Sustainalytics ESG').and('be.visible');
	manageFiltersPage.quickFiltersSection().contains('Upcoming Meetings').and('be.visible');
	manageFiltersPage.quickFiltersSection().contains('Sustainalytics ESG').scrollIntoView();
	manageFiltersPage.quickFiltersSection().contains('Vote Rejections').and('be.visible');
	manageFiltersPage.quickFiltersSection().contains('Votes Against Management').and('be.visible');
	manageFiltersPage.quickFiltersSection().contains('Votes Against Policy').and('be.visible');
	manageFiltersPage.summaryTitle().should('be.visible').and('have.text', 'Summary ');
	manageFiltersPage.filterNameLabel().should('be.visible').and('have.text', 'Filter Name');
	manageFiltersPage.subscriptionsTitle().should('be.visible').and('have.text', 'Subscriptions');
});
