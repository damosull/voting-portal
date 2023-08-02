class loginPage {
	pageBody() {
		return cy.get('body');
	}
	usernameInput() {
		return cy.get('#username');
	}
	passwordInput() {
		return cy.get('#password');
	}
	signInButton() {
		return cy.get("button[type='submit']");
	}
	resetPasswordButton() {
		return cy.get('#reset-password');
	}
	ssoLinkButton() {
		return cy.get('#sso-link');
	}
	ssoConfirmationLabel() {
		return cy.contains('You will be redirected to your identity provider');
	}
}

module.exports = new loginPage();
