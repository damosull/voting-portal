class custodiansPage {
	custodiansTableData() {
		return cy.get("tbody[role='rowgroup']");
	}
}

module.exports = new custodiansPage();
