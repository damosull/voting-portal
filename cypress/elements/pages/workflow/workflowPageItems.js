class workflowPageItems{
      
    watchListDropDownButtonID = '#btn-watchlists';
    manageWatchListDropDownButtonID = '#btn-manage-watchlists';
    watchlistSearchInputID = ".watchlist-search-input"
    watchlistScrollableContainerID = '.floatleft > .scrollableContainer'
    cogIconID = '#admin-link-container'
    usersID = '#navlink--users'

    constructor() {
    }

    // Watchlist section
    watchListDropDownButton() {
        return cy.get(this.watchListDropDownButtonID);
    }
    manageWatchListDropDownButton() {
        return cy.get(this.manageWatchListDropDownButtonID); 
    }
    watchlistSearchInput() {
        return cy.get(this.watchlistSearchInputID); 
    }
    watchlistScrollableContainer() {
        return cy.get(this.watchlistScrollableContainerID); 
    }

    // Cog icon dropdown section
    cogIcon() {
        return cy.get(this.cogIconID); 
    }
    users() {
        return cy.get(this.usersID); 
    }
}

export default workflowPageItems;