class usersPermissionPage {
	workflowVotingDropdown() {
		return cy.contains('Workflow Voting');
	}
	userNameInput() {
		return cy.get('#userName');
	}
	userNameInputList() {
		return cy.get('#userName-list');
	}
	votePermissionDropdown() {
		return cy.get('#sel213');
	}
	instructPermissionDropdown() {
		return cy.get('#sel214');
	}
	takeNoActionPermissionDropdown() {
		return cy.get('#sel215');
	}
	viewACSIRecommendations() {
		return cy.get('#sel322');
	}
	viewRuleName() {
		return cy.get('#sel340');
	}
	submitButton() {
		return cy.get("button[data-bind='click:SubmitChanges']");
	}
}

module.exports = new usersPermissionPage();
