class companyPage {
	companyPageBody() {
		return cy.get('#content-wrapper');
	}
	companyNavLinks() {
		return cy.get('#anchor-nav-container');
	}
	companyNameTitle() {
		return cy.get('#md-issuer-name');
	}
}

module.exports = new companyPage();
