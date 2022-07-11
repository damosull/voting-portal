class usersPermission{

    workflowVotingDropdown() { return cy.contains('Workflow Voting') }
    userNameInput() { return cy.get('#userName') }
    userNameInputList() { return cy.get('#userName-list') }
    votePermissionDropdown() { return cy.get('#sel213') }
    instructPermissionDropdown() { return cy.get('#sel214') }
    takeNoActionPermissionDropdown() { return cy.get('#sel215') }
    submitButton(){ return cy.get("button[data-bind='click:SubmitChanges']") }
    
}

module.exports = new usersPermission();