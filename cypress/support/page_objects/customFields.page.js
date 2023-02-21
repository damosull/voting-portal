class customFieldsPage {
	addCustomFieldButton() {
		return cy.get('#workflow-filter-list > div:nth-child(1) > div > a.gl-btn');
	}
	customFieldTypeDropdown() {
		return cy.get('#select-field-type');
	}
	pageViewDropdown() {
		return cy.get('#select-screen');
	}
	labelNameText() {
		return cy.get('#text-label-name');
	}
	descriptionText() {
		return cy.get('#text-description');
	}
	descriptionInput() {
		return cy.get('div.editable-input > input[type=text]');
	}
	descriptionSubmit() {
		return cy.get('div.editable-buttons > button.editable-submit');
	}
	activeCheckbox() {
		return cy.get('#check-active');
	}
	filterUnderAddCriteriaCheckbox() {
		return cy.get('#check-filter');
	}
	picklistButton() {
		return cy.get('#picklist-section > div.row.row-spaced.clearfix > a:nth-child(1)');
	}
	firstPicklist() {
		return cy.get('#option-name-edit-1');
	}
	secondPicklist() {
		return cy.get('#option-name-edit-2');
	}
	thirdPicklist() {
		return cy.get('#option-name-edit-3');
	}
	thirdPicklistArrowIcon() {
		return cy.get('#option-container-edit-3 > span > i.sort-up');
	}
	picklistOptions() {
		return cy.get('#picklist-section > div >div > div >span');
	}
	sortAlphabeticallyButton() {
		return cy.get('#picklist-section > div.row.row-spaced.clearfix > a.gl-btn.green');
	}
	saveButton() {
		return cy.get('#cf-btn-save');
	}
	deleteButton() {
		return cy.get('#cf-btn-delete');
	}
	filterColumnNameInput() {
		return cy.get('#txt-filter-col-name');
	}
	inputWithValue(value) {
		return cy.get(`input[value='${value}']`);
	}
	picklistLabel() {
		return cy.get('#results-list > li:nth-child(1) > div > label');
	}
}

module.exports = new customFieldsPage();
