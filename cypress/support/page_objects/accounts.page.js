class accountsPage {
	tableData() {
		return cy.get("tbody[role='rowgroup']");
	}
}

module.exports = new accountsPage();