class watchlistPageItems{
    
    createNewWatchlistButtonID = "#btn-create-new > a"
    popupTextContainerID = "#popupTextContainer > input[type=text]"
    saveButtonID = "#apprise-btn-confirm"
    newWatchListNameID = "#wlName"
    administrationUserTextFieldID = "#txtAddUser"
    addAdministrationUserButtonID = "#WLMain > div:nth-child(2) > div:nth-child(2) > button"
    watchListFilterListID = "#workflow-filter-list > div > div"

    constructor() {
    }

    createNewWatchlistButton() {
        return cy.get(this.createNewWatchlistButtonID); 
    }
    popupTextContainer() {
        return cy.get(this.popupTextContainerID); 
    }
    saveButton() {
        return cy.get(this.saveButtonID); 
    }
    newWatchListName() {
        return cy.get(this.newWatchListNameID); 
    }
    administrationUserTextField() {
        return cy.get(this.administrationUserTextFieldID); 
    }
    addAdministrationUserButton() {
        return cy.get(this.addAdministrationUserButtonID); 
    }
    watchListFilterList() {
        return cy.get(this.watchListFilterListID); 
    }

}

export default watchlistPageItems;