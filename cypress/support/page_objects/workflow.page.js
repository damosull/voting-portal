class workflowPage {

    getPageHeading() { return cy.get('h1') }
    getPageBody() { return cy.get('body') }
    getLoadingSpinner() { return cy.get('.k-loading-text', { timeout: 90000 }) }
    getWorkflowPage() { return cy.visit(Cypress.config('baseUrl') + '/Workflow') }
    
    // Meeting section
    meeting() { return cy.get('#metaname-CompanyName > div > span > a') }
    tableRows() { return cy.get('table > tbody > tr') }
    companyNameLink() { return cy.get('[data-js="meeting-details-link"]').first() }
    scrollEndButton() { return cy.get('#btn-scroll-end') }
    meetingCheckbox() { return cy.get('input[name^="ckbSelMeeting"]') }
    quickPickDropdown() { return cy.get('.cf-quickpick-label') }
    quickPickModal() { return cy.get('#js-cf-modal-content') }
    proceedButton() { return cy.get('#apprise-btn-confirm') }
    controversyAlertTableData() { return cy.get('#metaname-CF1097') }

    // Watchlist section
    watchListDropDownButton() { return cy.get('#btn-watchlists') }
    manageWatchListDropDownButton() { return cy.get('#btn-manage-watchlists') }
    watchlistSearchInput() { return cy.get('.watchlist-search-input') }
    watchlistScrollableContainer() { return cy.get('.floatleft > .scrollableContainer') }

    // Cog icon dropdown section
    workflowMenuButton() { return cy.get('#workflow-link') }
    adminLink() { return cy.get('#admin-link-container > a > span') }
    cogIcon() { return cy.get('#admin-link-container') }
    usersLink() { return cy.get('#navlink--users') }
    customersLink() { return cy.get('#navlink--customers') }

    // Filter section
    addCriteriaButton() { return cy.get('#btn-add-criteria') }
    criteriaInput() { return cy.get('#txt-filter-criteria') }
    applyCriteriaButton() { return cy.get('#btn-apply-criteria') }
    criteriaLabel() { return cy.get('#filterPreferenceControl > div > #controls > div > div > h4:nth-child(n+2)').should('be.visible') }
    criteriaOption() { return cy.get('.SingleSelect > div > div > div') }
    criteriaOptionCheckbox() { return cy.get('.editor-modal > div > div > label') }
    updateButton() { return cy.get('.SingleSelect > div > div > button').eq(0) }
    updateButtonForCheckbox() { return cy.get('.editor-modal > div > button').eq(0) }
    selectCustomerInput() { return cy.get("input[placeholder='Select Customer...']") }
    selectCustomerShadowInput() { return cy.get("#txt-ui-CustomerID") }
    selectCustomerDropdown() { return cy.get("#kendoCustomers_listbox") }
    ballotCriteriaFilter() { return cy.get(".BallotIDEditor") }
    meetingWithoutBallotsRadio() { return cy.get("#rdo-equal-to") }
    updateNumberOfBallotsButton() { return cy.get(".blue.secondary.btn-update-BallotID") }


    //Common Functions
    waitForWorkflowPageLoad() {
        this.getLoadingSpinner({timeout: 60000}).should('not.exist')
    }
}

module.exports = new workflowPage();
