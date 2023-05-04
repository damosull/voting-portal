class changePasswordPage {
	changePasswordTitle() {
		return cy.get('.form-horizontal.clearfix h4');
	}

	currentPasswordLabel() {
		return cy.get("div[data-bind='visible: askCurrentPassword'] label[for='set-psw-newpsw']");
	}

	newPasswordLabel() {
		return cy.get('.control-label').contains('New Password');
	}

	confirmNewPasswordLabel() {
		return cy.get("label[for='set-psw-confirmation']");
	}

	updateButton() {
		return cy.get('#up-btn-save');
	}
}

module.exports = new changePasswordPage();
