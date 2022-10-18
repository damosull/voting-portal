class vepPage {

    customerName() { return cy.get('#cp-customer-name') }
    newProfileButton() { return cy.get("button[data-bind='click: AddNew, visible: DisplayNewButton']") }
    allCheckboxes() { return cy.get(".vgcheckbox") }
    configurationNameLabel() { return cy.get('#text-label-name') }
    configurationNameInput() { return cy.get('.editable-input') }
    configurationNameOkButton() { return cy.get(".editable-submit") }
    configurationNameCancelButton() { return cy.get(".editable-cancel") }
    configurationNameModifiedLabel() { return cy.get(".vep-modified") }
    configurationProfileNameLabel() { return cy.get("span[data-bind='text: ProfileName']") }
    votingGroupsLabel() { return cy.get("span[data-bind^='text: VotingGroups.SelectionString']") }
    editVotingGroupsButton() { return cy.get("a[data-bind='click: ShowVotingGroupsSelectionClick, visible: Permissions.CanModify']") }
    votingGroupsModal() { return cy.get("div[id^='voting-groups-kendo-modal']") }
    votingGroupsSelectAllCheckbox() { return cy.get("#voting-groups-selectall") }
    votingGroupsApplyButton() { return cy.get("button[data-bind='click: ApplyVotingGroupsSelectionClick']") }
    saveVoteExecutionButton() { return cy.get("button[data-bind='click: OnNewFieldSaveClicked, visible: DisplaySaveButton']") }

}

module.exports = new vepPage();