class userProfilePage {
	userProfileTitle(){
		return cy.get(".floatleft h1");
	}

	firstNameLabel(){
		return cy.get("label[for='userDetails_UserFirstName']");
	}

	emailLabel(){
		return cy.get("label[for='ContactEmail']");
	}

	loginTypeLabel(){
		return cy.get("label[for='userDetails_LoginType']");
	}

	updateButton() {
		return cy.get("#up-btn-save");
	}
}

module.exports = new userProfilePage();