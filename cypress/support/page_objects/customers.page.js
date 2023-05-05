class customersPage {
	addCriteria() {
		return cy.get('#btn-add-criteria');
	}
	customerNamePopUp() {
		return cy.get('#company-name-target-CustomerName');
	}
	customerNameInput() {
		return cy.get('#company-name-target-CustomerName > div.k-widget.k-multiselect.k-header > div > input');
	}
	customerNameSearchResults() {
		return cy.get('select#txt-company-name-CustomerName');
	}
	customerNameSearchResultsList() {
		return cy.get('#txt-company-name-CustomerName > option');
	}
	customerNameSearchResultsSelectedOption() {
		return cy.get('#txt-company-name-CustomerName_option_selected');
	}
	customerNameSearchUpdateButton() {
		return cy.get('#btn-update-CustomerName');
	}
	customerNameLinks() {
		return cy.get('#customer-grid-kendo > div.k-grid-content > table > tbody > tr > td:nth-child(2) > a');
	}
	customerTable() {
		return cy.get("tbody[role='rowgroup']");
	}
}

module.exports = new customersPage();
