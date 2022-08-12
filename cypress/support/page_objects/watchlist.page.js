class watchlistPage {

    createNewWatchlistButton() { return cy.get('#btn-create-new > a') }
    popupTextContainer() { return cy.get('#popupTextContainer > input[type=text]') }
    saveButton() { return cy.get('#apprise-btn-confirm') }
    newWatchListName() { return cy.get('#wlName') }
    administrationUserTextField() { return cy.get('#txtAddUser') }
    addAdministrationUserButton() { return cy.get('#WLMain > div:nth-child(2) > div:nth-child(2) > button') }
    watchListFilterList() { return cy.get('#workflow-filter-list > div > div') }

}

module.exports = new watchlistPage();