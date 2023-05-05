class userProfilePage {
	userProfileTitle() {
		return cy.get('.floatleft h1');
	}

	firstNameLabel() {
		return cy.get("label[for='userDetails_UserFirstName']");
	}

	emailLabel() {
		return cy.get("label[for='ContactEmail']");
	}

	loginTypeLabel() {
		return cy.get("label[for='userDetails_LoginType']");
	}

	updateButton() {
		return cy.get('#up-btn-save');
	}

	activeUsersList() {
		return cy.get('#active-users-list-container');
	}

	inactiveUsersList() {
		return cy.get('#inactive-users-list-container');
	}

	userListTitle() {
		return cy.get('#users-list h3');
	}
}

module.exports = new userProfilePage();
