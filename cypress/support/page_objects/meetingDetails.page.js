class meetingDetailsPage {

    proceedButtonLocator = '.floatright > .green'
    unlockButtonLocator = '#btn-unlock'

    launchBallotsButton() { return cy.get('#launch-ballots-voted-modal').should('be.visible') }
    workflowButton() { return cy.get('#workflow-link') }
    voteNowButton() { return cy.get('#btn-vote-now') }
    takeNoActionButton() { return cy.get('#btn-take-no-action') }
    instructButton() { return cy.get('#btn-instruct') }
    unlockButton() { return cy.get(this.unlockButtonLocator) }
    votedBallots() { return cy.get('[data-bind="visible: override.votedBallotsBoxVisible"] > .ccb').should('be.visible') }
    getLoadingSpinner() { return cy.get('.k-loading-text', { timeout: 90000 }) }
    proceedButton() { return cy.get(this.proceedButtonLocator).should('be.visible') }
    quickVoteDropdown() { return cy.get('#quick-vote-container > span') }
    quickVoteSelect() { return cy.get('#quickVoteSelect') }
    takeNoActionBallots() { return cy.get('[data-bind="visible: override.tnaBallotsBoxVisible"] > .ccb').should('be.visible') }
    voteCardRow() { return cy.get('#md-votecard-grid-results > tr') }
    confirmPopUp() { return cy.get('.confirm-popup') }
    confirmPopUpContent() { return cy.get('.confirm-content') }
    popUpOkButton() { return cy.get('#apprise-btn-confirm') }
    popUpCancelButton() { return cy.get('#apprise-btn-undefined') }
    warningPopUp() { return cy.get('#vote-warnings-and-errors-modal') }
    checkboxOverride() { return cy.get("label[for='override-voted']") }
    voteSuccessMessage() { return cy.contains('Vote success') }
    totalVotedLink() { return cy.get('#launch-ballots-voted-modal') }
    totalNotVotedLink() { return cy.get('#launch-ballots-not-voted-modal') }
    closeVoteTallyPopup() { return cy.get('#close-panel') }
    totalVotedLabel() { return cy.get("span[data-bind='text: VotedStatusCount']") }
    glassLewisLogoLink() { return cy.get("a[id='logo-link'] span") }
}

module.exports = new meetingDetailsPage();