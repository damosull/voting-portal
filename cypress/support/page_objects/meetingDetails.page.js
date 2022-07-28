class meetingDetailsPage {

    proceedButtonLocator = '.floatright > .green'
    unlockButtonLocator = '#btn-unlock'
    checkboxOverrideLocator = "label[for='override-voted']"
    warningPopUpLocator = '#vote-warnings-and-errors-modal'

    //Header
    pageBody() { return cy.get('body') }
    getLoadingSpinner() { return cy.get('.k-loading-text') }
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
    totalVotedLink() { return cy.get('#launch-ballots-voted-modal') }
    totalNotVotedLink() { return cy.get('#launch-ballots-not-voted-modal') }
    closeVoteTallyPopup() { return cy.get('#close-panel') }
    totalVotedLabel() { return cy.get("span[data-bind='text: VotedStatusCount']") }

    //Vote Card Section
    quickVoteDropdown() { return cy.get('#quick-vote-container > span') }
    quickVoteSelect() { return cy.get('#quickVoteSelect') }
    voteCardRow() { return cy.get('#md-votecard-grid-results > tr') }
    accountButton() { return cy.get('#btn-account').eq(0) }
    accountDiv() { return cy.get('#add-account-target') }
    selectAllAccountCheckbox() { return cy.get('#multiselect-static-all-account').should('not.be.visible') }
    individualAccountCheckbox() { return cy.get("ul#meeting-detail-account > li > div > input[type='checkbox']").should('not.be.visible') }
    swimAccountCheckbox() { return cy.get('input[value="SWIM"]').should('not.be.visible') }
    updateAccountButton() { return cy.get('#btn-update-account') }
    cancelAccountButton() { return cy.get('#btn-cancel-account') }
    accountGroupButton() { return cy.get('#btn-account-group') }
    accountGroupDiv() { return cy.get('#add-account-group-target') }
    selectAllAccountGroupCheckbox() { return cy.get('#multiselect-static-all-accountGroup').should('not.be.visible') }
    individualAccountGroupCheckbox() { return cy.get("ul#meeting-detail-account-group > li > div > input[type='checkbox']").should('not.be.visible') }
    updateAccountGroupButton() { return cy.get('#btn-update-account-group') }
    cancelAccountGroupButton() { return cy.get('#btn-cancel-account-group') }

    //Others
    proceedButton() { return cy.get(this.proceedButtonLocator).should('be.visible') }
    takeNoActionBallots() { return cy.get('[data-bind="visible: override.tnaBallotsBoxVisible"] > .ccb').should('be.visible') }
    confirmPopUp() { return cy.get('.confirm-popup') }
    confirmPopUpContent() { return cy.get('.confirm-content') }
    popUpOkButton() { return cy.get('#apprise-btn-confirm') }
    popUpCancelButton() { return cy.get('#apprise-btn-undefined') }
    warningPopUp() { return cy.get(this.warningPopUpLocator) }
    checkboxOverride() { return cy.get(this.checkboxOverrideLocator) }

    //Vote Tally section
    validationMessage() { return cy.get("div[class='row'] div[class='row validationMessage']") }
    jobNumberLink(jobNumber) { return cy.get("a[title='" + jobNumber + "']") }
}

module.exports = new meetingDetailsPage();