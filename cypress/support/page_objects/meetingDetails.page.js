class meetingDetailsPage {

    launchBallotsButton() { return cy.get('#launch-ballots-voted-modal').should('be.visible') }
    workflowButton() { return cy.get('#workflow-link') }
    voteNowButton() { return cy.get('#btn-vote-now').should('be.visible') }
    takeNoActionButton() { return cy.get('#btn-take-no-action').should('be.visible') }
    instructButton() { return cy.get('#btn-instruct').should('be.visible') }
    unlockButton() { return cy.get('#btn-unlock').should('be.visible') }
    votedBallots() { return cy.get('[data-bind="visible: override.votedBallotsBoxVisible"] > .ccb').should('be.visible') }
    proceedButton() { return cy.get('.floatright > .green').should('be.visible') }
    quickVoteDropdown() { return cy.get('#quick-vote-container > span') }
    quickVoteSelect() { return cy.get('#quickVoteSelect') }
    takeNoActionBallots() { return cy.get('[data-bind="visible: override.tnaBallotsBoxVisible"] > .ccb').should('be.visible') }
    voteCardRow() { return cy.get('#md-votecard-grid-results > tr') }
    confirmPopUp() { return cy.get('.confirm-popup') }
    confirmPopUpContent() { return cy.get('.confirm-content') }
    popUpOkButton() { return cy.get('#apprise-btn-confirm') }
    popUpCancelButton() { return cy.get('#apprise-btn-undefined') }
    checkboxOverride() { return cy.get("label[for='override-voted']") }
    voteSuccessMessage() { return cy.contains('Vote success') }
    totalVotedLink() { return cy.get('#launch-ballots-voted-modal') }
    totalNotVotedLink() { return cy.get('#launch-ballots-not-voted-modal') }
    closeVoteTallyPopup() { return cy.get('#close-panel') }
}

module.exports = new meetingDetailsPage();