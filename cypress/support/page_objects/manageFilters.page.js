class manageFiltersPage {
	pageBody() {
		return cy.get('body');
	}
	filterNameInput() {
		return cy.get('#filter-name-edit');
	}
	addSubscriptionButton() {
		return cy.get('#add-subscription');
	}
	addSubscriptionPopupTitle() {
		return cy.get('#subscriptions-modal-content > h3');
	}
	addSubscriptionPopupUserInput() {
		return cy.get('#users');
	}
	addSubscriptionPopupUserList() {
		return cy.get('#users_listbox > li');
	}
	addSubscriptionPopupScheduleDropdown() {
		return cy.get('#schedule-type');
	}
	addSubscriptionPopupMondayCheckbox() {
		return cy.get('#Mon');
	}
	addSubscriptionPopupCSVCheckbox() {
		return cy.get('#IncludeCSVResultset');
	}
	addSubscriptionOkButton() {
		return cy.get('#ok');
	}
	existingSubscriptionRemove() {
		return cy.get('#current-subscribers-list > tbody > tr > td > i[class="fa fa-times"]');
	}
	existingSubscriptionRemoveButton() {
		return cy.get('[class="fa fa-times"]');
	}
	OkButton() {
		return cy.get('#apprise-btn-confirm');
	}
	toastMessage() {
		return cy.get('.toast-message');
	}
}

module.exports = new manageFiltersPage();
