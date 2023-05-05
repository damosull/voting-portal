class vepPage {
	getLoadingSpinner() {
		return cy.get('.k-loading-text');
	}
	containsText(text) {
		return cy.contains(text);
	}
	customerName() {
		return cy.get('#cp-customer-name');
	}
	vepOnCheckbox() {
		return cy.get('#ckb-customer-hasnewvepenabled');
	}
	deleteButton() {
		return cy.get('#cf-btn-delete');
	}
	newProfileButton() {
		return cy.get("button[data-bind='click: AddNew, visible: DisplayNewButton']");
	}
	allCheckboxes() {
		return cy.get('.vgcheckbox');
	}
	configurationNameLabel() {
		return cy.get('#text-label-name');
	}
	configurationNameInput() {
		return cy.get('.editable-input input');
	}
	configurationNameOkButton() {
		return cy.get('.editable-submit');
	}
	configurationNameCancelButton() {
		return cy.get('.editable-cancel');
	}
	configurationNameModifiedLabel() {
		return cy.get('.vep-modified');
	}
	configurationProfileNameLabel() {
		return cy.get("span[data-bind='text: ProfileName']");
	}
	votingGroupsLabel() {
		return cy.get("span[data-bind^='text: VotingGroups.SelectionString']");
	}
	editVotingGroupsButton() {
		return cy.get("a[data-bind='click: ShowVotingGroupsSelectionClick, visible: Permissions.CanModify']");
	}
	votingGroupsModal() {
		return cy.get("div[id^='voting-groups-kendo-modal']");
	}
	votingGroupsSelectAllCheckbox() {
		return cy.get('#voting-groups-selectall');
	}
	votingGroupsApplyButton() {
		return cy.get("button[data-bind='click: ApplyVotingGroupsSelectionClick']");
	}
	saveVoteExecutionButton() {
		return cy.get("button[data-bind='click: OnNewFieldSaveClicked, visible: DisplaySaveButton']");
	}

	priorityLevelLabel() {
		return cy.get('#priority-market .content-left h3');
	}

	marketSpecific() {
		return cy.get('#priority-market .content-right h3');
	}

	votingInstructionsLabel() {
		return cy.get('.section.clearfix h3');
	}
}

module.exports = new vepPage();
