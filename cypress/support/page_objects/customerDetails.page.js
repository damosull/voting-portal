class customerDetailsPage {
	customerNameLabel() {
		return cy.get('#cp-customer-name');
	}
	acsiCheckbox() {
		return cy.get('#ckb-view-acsi');
	}
	saveButton() {
		return cy.get('#btn-save-cd-settings');
	}
	successMessage() {
		return cy.get('.toast-message');
	}
	customFieldsLink() {
		return cy.get('#leftcol > nav > ul:nth-child(6) > li:nth-child(1) > a');
	}
	summarySection() {
		return cy.get('#Summary');
	}
	glassLewisCustomerIdValue() {
		return cy.get("span[data-bind='text:CustomerDetails.SummaryViewModel.GlpCustomerID']");
	}
}

module.exports = new customerDetailsPage();
