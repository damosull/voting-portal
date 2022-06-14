class workflowPageItems{
      
    // Meeting section
    meetingID = '#metaname-CompanyName > div > span > a'

    // Watchlist section
    watchListDropDownButtonID = '#btn-watchlists';
    manageWatchListDropDownButtonID = '#btn-manage-watchlists';
    watchlistSearchInputID = ".watchlist-search-input"
    watchlistScrollableContainerID = '.floatleft > .scrollableContainer'

    //  Cog icon dropdown section
    cogIconID = '#admin-link-container'
    usersID = '#navlink--users'
    workflowMenuButtonID = '#workflow-link';

    // Filter section
    addCriteriaButtonID = '#btn-add-criteria';
    criteriaInputID = '#txt-filter-criteria'
    applyCriteriaButtonID = '#btn-apply-criteria'

    constructor() {
    }

    // Meeting section
    meeting() {
        return cy.get(this.meetingID);
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

    // Filter section
    addCriteriaButton() {
        return cy.get(this.addCriteriaButtonID);
    }
    criteriaInput() {
        return cy.get(this.criteriaInputID);
    }
    applyCriteriaButton() {
        return cy.get(this.applyCriteriaButtonID);
    }
}

export default workflowPageItems;