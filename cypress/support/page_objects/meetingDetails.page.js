class meetingDetailsPage {

    proceedButtonLocator = '.floatright > .green'
    unlockButtonLocator = '#btn-unlock'

    //Header
    pageBody() { return cy.get('body') }
    getLoadingSpinner() { return cy.get('.k-loading-text', { timeout: 90000 }) }
    voteSuccessMessage() { return cy.contains('Vote success') }
    glassLewisLogoLink() { return cy.get("a[id='logo-link'] span") }

    //Company name & buttons on top of the page
    workflowButton() { return cy.get('#workflow-link') }
    voteNowButton() { return cy.get('#btn-vote-now') }
    takeNoActionButton() { return cy.get('#btn-take-no-action') }
    instructButton() { return cy.get('#btn-instruct') }
    unlockButton() { return cy.get(this.unlockButtonLocator) }
    votedBallots() { return cy.get('[data-bind="visible: override.votedBallotsBoxVisible"] > .ccb').should('be.visible') }
    controversyAlertDiv() { return cy.get('#controversyLinks') }
    controversyAlertLink() { return cy.get('#controversyLinks a') }

    //Info Section
    launchBallotsButton() { return cy.get('#launch-ballots-voted-modal').should('be.visible') }
    totalVotedLink() { return cy.get('#launch-ballots-voted-modal') }
    totalNotVotedLink() { return cy.get('#launch-ballots-not-voted-modal') }
    closeVoteTallyPopup() { return cy.get('#close-panel') }
    totalVotedLabel() { return cy.get("span[data-bind='text: VotedStatusCount']") }

    //Vote Card Section
    quickVoteDropdown() { return cy.get('#quick-vote-container > span') }
    quickVoteSelect() { return cy.get('#quickVoteSelect') }
    voteCardRow() { return cy.get('#md-votecard-grid-results > tr') }

    //Others
    proceedButton() { return cy.get(this.proceedButtonLocator).should('be.visible') }
    takeNoActionBallots() { return cy.get('[data-bind="visible: override.tnaBallotsBoxVisible"] > .ccb').should('be.visible') }
    confirmPopUp() { return cy.get('.confirm-popup') }
    confirmPopUpContent() { return cy.get('.confirm-content') }
    popUpOkButton() { return cy.get('#apprise-btn-confirm') }
    popUpCancelButton() { return cy.get('#apprise-btn-undefined') }
    warningPopUp() { return cy.get('#vote-warnings-and-errors-modal') }
    checkboxOverride() { return cy.get("label[for='override-voted']") }

}

module.exports = new meetingDetailsPage();