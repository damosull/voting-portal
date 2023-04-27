class watchlistPage {
	createNewWatchlistButton() {
		return cy.get('#btn-create-new > a');
	}
	popupTextContainer() {
		return cy.get('#popupTextContainer > input[type=text]');
	}
	saveButton() {
		return cy.get('#apprise-btn-confirm');
	}
	newWatchListName() {
		return cy.get('#wlName');
	}
	administrationUserTextField() {
		return cy.get('#txtAddUser');
	}
	addAdministrationUserButton() {
		return cy.get('#WLMain > div:nth-child(2) > div:nth-child(2) > button');
	}
	watchListFilterList() {
		return cy.get('#workflow-filter-list > div > div');
	}

	allWatchlistsSection(){
		return cy.get("ul[data-bind='foreach: WLOperations.WLsList']");
	}

	summaryTitle(){
		return cy.get("div[id='WLMain'] div:nth-child(1) h2:nth-child(1)");
	}

	watchlistNameLabel(){
		return cy.get("#selected-filter-name label");
	}

	editButton(){
		return cy.get(".darkgrey.edit-btn");
	}

	systemWatchlistLabel(){
		return cy.get("div[data-bind='visible: isSystemContext'] label").contains('System Watchlist:');
	}

	deleteButton(){
		return cy.get(".dark-red.small[data-bind='click: WLOperations.Delete,visible: IsDeleteable']");
	}
}

module.exports = new watchlistPage();
