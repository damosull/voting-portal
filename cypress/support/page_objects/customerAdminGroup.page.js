class customerAdminGroupPage {
	groupTypeLabel() {
		return cy.get("label[for='select-group-type']");
	}

	editButton() {
		return cy.get('#btn-group-name-edit');
	}

	associationsSection() {
		return cy.get('#account-group-association');
	}

	associationGroupsSection() {
		return cy.get('#group-association');
	}
}

module.exports = new customerAdminGroupPage();
