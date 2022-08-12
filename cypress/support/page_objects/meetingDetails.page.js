class meetingDetailsPage {

    proceedButtonLocator = '.floatright > .green'
    unlockButtonLocator = '#btn-unlock'
    checkboxOverrideLocator = "label[for='override-voted']"
    warningPopUpLocator = '#vote-warnings-and-errors-modal'
    votedBallotsLocator = '[data-bind="visible: override.votedBallotsBoxVisible"] > .ccb'
    takeNoActionBallotsLocator = '[data-bind="visible: override.tnaBallotsBoxVisible"] > .ccb'

    //Header
    pageBody() { return cy.get('body') }
    getLoadingSpinner() { return cy.get('.k-loading-text') }
    voteSuccessMessage() { return cy.contains('Vote success') }
    instructedSuccessMessage() { return cy.contains('Instructed successfully') }
    glassLewisLogoLink() { return cy.get("a[id='logo-link'] span") }
    toastMessage() { return cy.get('.toast-message') }

    //Company name & buttons on top of the page
    companyNameLink() { return cy.get('#company-navigate') }
    meetingsDateDropdown() { return cy.get('#btn-related-meetings-title-area > span') }
    meetingsDateDropdownModal() { return cy.get('.dropdown.related-meetings-list.open > ul > li') }
    workflowButton() { return cy.get('#workflow-link') }
    voteNowButton() { return cy.get('#btn-vote-now') }
    takeNoActionButton() { return cy.get('#btn-take-no-action') }
    instructButton() { return cy.get('#btn-instruct') }
    unlockButton() { return cy.get(this.unlockButtonLocator) }
    votedBallots() { return cy.get(this.votedBallotsLocator) }
    controversyAlertDiv() { return cy.get('#controversyLinks') }
    controversyAlertLink() { return cy.get('#controversyLinks a') }
    homeButton() { return cy.get('#btn-back-filter-results') }
    watchListsDropdown() { return cy.get('#md-btn-watchlists') }
    watchListsDropdownLabelNumber() { return cy.get('span[data-bind="text: SecurityWatchlistsCount"]') }
    systemWatchListsDiv() { return cy.get('div.clearfix.scrollableContainer.systemListOfWatchlists') }
    systemWatchListSecondCheckbox() { return cy.get('#md-watchlistsEditorItem2783') }
    systemWatchListSecondCheckboxLabel() { return cy.get('#divEditorWl2783 > label') }
    systemWatchListUpdateButton() { return cy.get('#md-btn-update-security-watchlists') }
    shareMeetingButton() { return cy.get('#btn-share-meeting') }
    shareMeetingPopUpHeading() { return cy.get('#sharemeeting-modal_wnd_title') }
    nextMeetingLink() { return cy.get('#link-next-meeting-id') }
    previousMeetingLink() { return cy.get('#link-prev-meeting-id') }
    exportButtonDropdown() { return cy.get('#exportMeetingDetails > .nav > .dropdown > .dropdown-toggle') }
    exportBallotStatusReportButton() { return cy.get('#exportBallotStatusReport') }
    pdfRadio() { return cy.get('#pdf') }
    exportButton() { return cy.get('#btn-export') }

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
    meetingNoteSpan() { return cy.get('#meeting-note') }
    meetingNoteInput() { return cy.get('#meeting-notes-input') }
    meetingNoteSubmitButton() { return cy.get("button[type='submit']") }

    //Comments
    sharedWithDropdown() { return cy.get('#adhoc-users-search-reply-comment_taglist > li') }
    deleteButton() { return cy.get(`#adhoc-users-search-reply-comment_taglist > li > span.k-icon.k-delete`) }
    commentTextArea() { return cy.get(`textarea[name='Comment'`) }
    shareVisibilityDropdown() { return cy.get('#comment-viewable-type') }
    postCommentButton() { return cy.get('#btn-post-comment') }


    //Others
    proceedButton() { return cy.get(this.proceedButtonLocator) }
    takeNoActionBallots() { return cy.get(this.takeNoActionBallotsLocator) }
    confirmPopUp() { return cy.get('.confirm-popup') }
    confirmPopUpContent() { return cy.get('.confirm-content') }
    popUpOkButton() { return cy.get('#apprise-btn-confirm') }
    popUpCancelButton() { return cy.get('#apprise-btn-undefined') }
    warningPopUp() { return cy.get(this.warningPopUpLocator) }
    checkboxOverride() { return cy.get(this.checkboxOverrideLocator) }
    genericCheckbox() { return cy.get('input[type="checkbox"]') }
    managementDropdown() { return cy.get('#agendas-list > ul > li') }
    ballotSectionSpan() { return cy.get('#agendas-list > ul > li > ul > li > div > span') }
    ballotSectionLinks() { return cy.get('#md-ballots-grid-results > tr > td > a') }
    ballotSectionThirdLink() { return cy.get('#agendas-list > ul > li > ul > li:nth-child(3) > a > span') }
    ballotSectionFourthLink() { return cy.get('#agendas-list > ul > li > ul > li:nth-child(4) > a > span') }
    allTableRows() { return cy.get('table > tbody > tr') }
    meetingDetailsLink() { return cy.get('[data-js="meeting-details-link"]').first() }
    shareMeetingUsernameInput() { return cy.get('#in-share-meeting-user-name') }
    shareMeetingUsernameResults() { return cy.get('#in-share-meeting-user-name_listbox li') }
    shareMeetingAddButton() { return cy.get('#btn-share-meeting-add') }
    shareMeetingConfirmButton() { return cy.get('#btn-share-meeting-confirm') }
    shareMeetingCommentInput() { return cy.get('#txt-share-meeting-comment') }


    //Vote Tally section
    validationMessage() { return cy.get("div[class='row'] div[class='row validationMessage']") }
    jobNumberLink(jobNumber) { return cy.get("a[title='" + jobNumber + "']") }

    //Ballots section
    ballotSectionDiv() { return cy.get('div #ballots-section') }
    controlNumberLink() { return cy.get('#ballots-grid div:nth-child(2) td:nth-child(1)') }
    ballotApplyButton() { return cy.get('#configure-columns-modal > button.secondary.blue') }
    ballotCancelButton() { return cy.get('#configure-columns-modal > button.secondary.gray') }
    ballotTableHeadings() { return cy.get('#ballots-grid > div > div > table > thead > tr > th') }
    ballotSectionData() { return cy.get('[data-js="md-ballots-section"]') }
    ballotActivityModal() { return cy.get('#ballot-activitylog-modal') }
    ballotActivityModalDataRowOne() { return cy.get('#ballotActivityLogGrid > div > table > tbody > tr:nth-child(1) > td') }
    ballotsPerPageDropdown() { return cy.get(`#ballots-grid > div.k-pager-wrap.k-grid-pager.k-widget > span.k-pager-sizes.k-label > span > select`) }
    ballotsPerPageDropdownText() { return cy.get(`#ballots-grid > div.k-pager-wrap.k-grid-pager.k-widget > span.k-pager-sizes.k-label > span > span > span.k-input`) }
    ballotsColumnsDropdown() { return cy.get('#btn-mdballots-details-config-columns') }
    ballotsColumnsModal() { return cy.get('#ballots-configure-columns-target') }
    ballotsColumnsInput() { return cy.get('#ballots-configure-columns-target-dynamic > .clearfix > #configure-columns-modal > .input > #txt-filter-col-name') }
    ballotsColumnsLabelFor(forValue) { return cy.get(`label[for='${forValue}']`) }
    ballotsColumnsLabelValue(valueValue) { return cy.get(`input[value='${valueValue}']`) }
    ballotsColumnsApplyButton() { return cy.get('#ballots-configure-columns-target-dynamic > .clearfix > #configure-columns-modal > .blue') }
    ballotsColumnsList() { return cy.get('#ballots-section #results-list li') }
    ballotRowTwo() { return cy.get('#meeting-details-activity > div > div > table > tbody > tr:nth-child(n+2)') }
    ballotRowSecondLast() { return cy.get('#ballotActivityLogGrid > div > table > tbody > tr:not(:last-child)') }
    ballotGridControlNumberLink() { return cy.get('.ballots-grid-control-number-link') }
    ballotSectionCompanyNameInput() { return cy.get('.company-name-search > input') }
}

module.exports = new meetingDetailsPage();