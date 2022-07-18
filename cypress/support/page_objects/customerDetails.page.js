class customerDetails{

    customerNameLabel() { return cy.get('#cp-customer-name') }
    acsiCheckbox() { return cy.get("#ckb-view-acsi") }
    saveButton() { return cy.get('#btn-save-cd-settings') }
    successMessage() { return cy.get('.toast-message') }

}

module.exports = new customerDetails()