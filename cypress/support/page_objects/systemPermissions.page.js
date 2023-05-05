class systemPermissionsPage {
	systemPermissionsSectionHeading() {
		return cy.get('#panelbar h3');
	}
	expandField() {
		return cy.get('.expandME.k-state-highlight.k-state-active');
	}
}

module.exports = new systemPermissionsPage();
