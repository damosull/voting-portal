class workflowPage {

    getPageHeading() { return cy.get('h1') }
    
    // Meeting section
    meeting() { return cy.get('#metaname-CompanyName > div > span > a') }

    // Watchlist section
    watchListDropDownButton() { return cy.get('#btn-watchlists') }
    manageWatchListDropDownButton() { return cy.get('#btn-manage-watchlists') }
    watchlistSearchInput() { return cy.get('.watchlist-search-input') }
    watchlistScrollableContainer() { return cy.get('.floatleft > .scrollableContainer') }

    // Cog icon dropdown section
    workflowMenuButton() { return cy.get('#workflow-link').should('be.visible') }
    cogIcon() { return cy.get('#admin-link-container') }
    users() { return cy.get('#navlink--users') }

    // Filter section
    addCriteriaButton() { return cy.get('#btn-add-criteria') }
    criteriaInput() { return cy.get('#txt-filter-criteria') }
    applyCriteriaButton() { return cy.get('#btn-apply-criteria') }
}

module.exports = new workflowPage();
