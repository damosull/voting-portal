class loginPageItems{
    
    usernameInputID = "#username";
    passwordInputID = "#password";
    signInButtonID = "#btn-submit-login";
    resetPasswordButtonID = "#reset-password";
    ssoLinkButtonID = "#sso-link";
  
    constructor() {
    }

    usernameInput() {
        return cy.get(this.usernameInputID);
    }

    passwordInput() {
        return cy.get(this.passwordInputID);
    }
    
    signInButton() {
        return cy.get(this.signInButtonID);
    }

    resetPasswordButton() {
        return cy.get(this.resetPasswordButtonID);
    }

    ssoLinkButton() {
        return cy.get(this.ssoLinkButtonID);
    }

}

export default loginPageItems;