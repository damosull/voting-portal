class workflowPage {

    getPageHeading() { return cy.get('h1') }
    getLoadingSpinner() { return cy.get('.k-loading-text', { timeout: 90000 }) }
    getWorkflowPage() { return cy.visit(Cypress.config('baseUrl') + '/Workflow') }
    
    // Meeting section
    meeting() { return cy.get('#metaname-CompanyName > div > span > a') }
    tableRows() { return cy.get('table > tbody > tr') }

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


    //Common Functions
    waitForWorkflowPageLoad() {
        this.getLoadingSpinner().should('not.exist')
    }
}

module.exports = new workflowPage();
