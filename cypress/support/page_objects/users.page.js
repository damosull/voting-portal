class usersPage {
	addNewUserButton() {
		return cy.get('#btn-add-new-user');
	}
	userFirstName() {
		return cy.get('#UserFirstName');
	}
	userLastName() {
		return cy.get('#UserLastName');
	}
	contactEmail() {
		return cy.get('#ContactEmail');
	}
	userType() {
		return cy.get('#UserType');
	}
	doneButton() {
		return cy.get('[type=submit]').contains('Done').filter(':visible');
	}
	customerNameDropDown() {
		return cy.get('tbody > tr > td > select').eq(0);
	}
	userRole() {
		return cy.get('tbody > tr > td > select').eq(1);
	}
	successMessage() {
		return cy.get('.toast-message');
	}
	tableData() {
		return cy.get("tbody[role='rowgroup']");
	}
}

module.exports = new usersPage();
