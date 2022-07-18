class reportingPage{

    configureColumnsDropdown() { return cy.get("div[class='section'] h3[class='toggle closed']") }
    getLoadingSpinner() { return cy.get('.k-loading-text') }
    
}

module.exports = new reportingPage()