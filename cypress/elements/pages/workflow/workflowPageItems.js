class workflowPageItems{
      
    watchListDropDownButtonID = '#btn-watchlists';
    manageWatchListDropDownButtonID = '#btn-manage-watchlists';
    watchlistSearchInputID = ".watchlist-search-input"
    watchlistScrollableContainerID = '.floatleft > .scrollableContainer'
    cogIconID = '#admin-link-container'
    usersID = '#navlink--users'
    workflowMenuButtonID = '#workflow-link';

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
    workflowMenuButton() {
        return cy.get(this.workflowMenuButtonID).should('be.visible');
    }
    cogIcon() {
        return cy.get(this.cogIconID); 
    }
    users() {
        return cy.get(this.usersID); 
    }
}

export default workflowPageItems;