class siteConfigurationPage {
	newSiteLabel() {
		return cy.get('#web-disclosure-name');
	}

	criteriaButton() {
		return cy.get('#btn-add-criteria');
	}

	columnsSection() {
		return cy.get('#wdsiteconfig-columns .toggle.closed');
	}

	voteCardSection() {
		return cy.get('#wdsiteconfig-vote-card .toggle.closed');
	}

	presentationSection() {
		return cy.get('#wdsiteconfig-presentation .toggle.closed');
	}
}

module.exports = new siteConfigurationPage();
