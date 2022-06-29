class loginPage {

    usernameInput() { return cy.get('#username') }
    passwordInput() { return cy.get('#password') }
    signInButton() { return cy.get('#btn-submit-login') }
    resetPasswordButton() { return cy.get('#reset-password') }
    ssoLinkButton() { return cy.get('#sso-link') }

}

module.exports = new loginPage();
