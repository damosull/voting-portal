class usersPermission{

    workflowVotingDropdown() { return cy.contains('Workflow Voting') }
    userNameInput() { return cy.get('#userName') }
    userNameInputList() { return cy.get('#userName-list') }
    votePermissionDropdown() { return cy.get('#sel213') }
    instructPermissionDropdown() { return cy.get('#sel214') }
    takeNoActionPermissionDropdown() { return cy.get('#sel215') }
    submitButton(){ return cy.get("button[data-bind='click:SubmitChanges']") }
    changeVoteOrRationale() { return cy.get('#btn-unlock') }
    voteButton() { return cy.get('#btn-vote-now') }
    takeNoActionButton() { return cy.get('#btn-take-no-action') }
    instructButton() { return cy.get('#btn-instruct') }
    
}

module.exports = new usersPermission();