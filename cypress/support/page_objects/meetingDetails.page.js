class meetingDetailsPage {

    launchBallotsButton() { return cy.get('#launch-ballots-voted-modal').should('be.visible') }
    voteNowButton() { return cy.get('#btn-vote-now').should('be.visible') }
    takeNoActionButton() { return cy.get('#btn-take-no-action').should('be.visible') }
    instructButton() { return cy.get('#btn-instruct').should('be.visible') }
    unlockButton() { return cy.get('#btn-unlock').should('be.visible') }
    votedBallots() { return cy.get('[data-bind="visible: override.votedBallotsBoxVisible"] > .ccb').should('be.visible') }
    proceedButton() { return cy.get('.floatright > .green').should('be.visible') }
    quickVoteDropdown() { return cy.get('#quick-vote-container > span > span') }
    quickVoteSelect() { return cy.get('#quickVoteSelect') }
    takeNoActionBallots() { return cy.get('[data-bind="visible: override.tnaBallotsBoxVisible"] > .ccb').should('be.visible') }
}

module.exports = new meetingDetailsPage();