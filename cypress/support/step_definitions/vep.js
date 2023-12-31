import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import vepPage from '../page_objects/vep.page';

Then('I can view the Vote Execution page', () => {
	cy.url().should('include', '/Accounts/VEP/');
	vepPage.getLoadingSpinner().should('not.exist');
	vepPage.customerName().should('be.visible');
	vepPage.newProfileButton().should('be.visible');
});

When('I click on the Configuration Name label', () => {
	vepPage.configurationNameLabel().click();
});

Then('I can see the OK and Cancel buttons', () => {
	vepPage.configurationNameOkButton().should('be.visible');
	vepPage.configurationNameCancelButton().should('be.visible');
});

When('I amend the configuration name to {string}', (confName) => {
	switch (confName) {
		case 'random':
			cy.randomString(5).then((data) => {
				vepPage.configurationNameInput().clear().type(data);
			});
			break;
		case 'existing':
			vepPage
				.configurationProfileNameLabel()
				.eq(1)
				.invoke('text')
				.then((text) => {
					vepPage.configurationNameInput().clear().type(text);
				});
			break;
		default:
			vepPage.configurationNameInput().clear().type(confName);
	}
});

When('I click on the Ok button for Configuration Name change', () => {
	vepPage.configurationNameOkButton().click();
});

When('I click on the Cancel button for Configuration Name change', () => {
	vepPage.configurationNameCancelButton().click();
});

Then('the configuration name should show as edited', () => {
	vepPage.configurationNameModifiedLabel().should('be.visible');
});

When('I click on Edit button for Voting Groups', () => {
	vepPage.editVotingGroupsButton().click();
});

When('I select {string} voting group', (chooseGroup) => {
	vepPage.votingGroupsSelectAllCheckbox().uncheck({ force: true });
	switch (chooseGroup) {
		case 'first':
			vepPage.votingGroupsModal().find('input[type="checkbox"]').eq(1).check({ force: true });
			break;
		case 'second':
			vepPage.votingGroupsModal().find('input[type="checkbox"]').eq(2).check({ force: true });
			break;
		default:
			vepPage.votingGroupsSelectAllCheckbox().check({ force: true });
			break;
	}
});

Then('I save the current voting groups', () => {
	vepPage
		.votingGroupsLabel()
		.should('be.visible')
		.invoke('text')
		.then((text) => {
			Cypress.env('vepGroups', text);
		});
});

Then('I can view the Voting Groups modal', () => {
	vepPage.votingGroupsModal().should('be.visible');
});

When('I amend the voting groups', () => {
	vepPage.votingGroupsSelectAllCheckbox().check({ force: true });
	vepPage.votingGroupsSelectAllCheckbox().uncheck({ force: true });
	let boxToCheck = Math.floor(Math.random() * (Cypress.$('.vgcheckbox').length - 3) + 2);
	vepPage.allCheckboxes().eq(boxToCheck).check({ force: true });
});

When('I click on the Apply Voting Groups button', () => {
	vepPage.votingGroupsApplyButton().click();
});

When('I click on the Save Vote Execution button', () => {
	cy.intercept('**/Api/Data/VepConfigCrud/').as('SUBMIT_VEP_DETAILS');
	vepPage.saveVoteExecutionButton().click();
});

Then('the Vote Execution changes should be saved successfully', () => {
	cy.wait('@SUBMIT_VEP_DETAILS').its('response.statusCode').should('be.oneOf', [200, 204]);
	vepPage.votingGroupsLabel().should('not.equal', Cypress.env('vepGroups'));
});

Then('I verify that the Vote Execution Profile On checkbox is disabled', () => {
	vepPage.vepOnCheckbox().should('be.disabled');
});

Then('I uncheck the Vote Execution Profile On checkbox', () => {
	vepPage.vepOnCheckbox().uncheck({ force: true });
});

When('I click on the New Profile button', () => {
	vepPage.newProfileButton().click();
});

Then('I should be {string} to see {string} on the VEP page', (isVisible, text) => {
	isVisible = isVisible.includes('unable') ? 'not.be.visible' : 'be.visible';
	vepPage.containsText(text).should(isVisible);
});

Then('I delete the visible vote execution profile', () => {
	cy.intercept('DELETE', '**/Api/Data/VepConfigCrud/**').as('DELETE_VEP_PROFILE');
	vepPage.deleteButton().click();
	cy.wait('@DELETE_VEP_PROFILE').its('response.statusCode').should('eq', 204);
});

Then('I verify that all the relevant API calls for vote execution profile page are made', () => {
	cy.statusCode200('@CURRENT_USER');
	cy.statusCode200('@LIST_SERVICE_VP_ONLY_WATCHLIST');
	cy.statusCode200('@LIST_SERVICE_VOTING_GROUP_VEP');
	cy.statusCode200('@LIST_SERVICE_PRIORITY_LEVEL');
	cy.statusCode200('@LIST_SERVICE_COUNTRY');
	cy.statusCode200('@VEP_CONFIG_CRUD');
	cy.statusCode200('@GET_VEP_DETAILS');
	cy.statusCode200('@VEP_CRITERIA_META_DATA');
});

Then('I verify that the vote execution profile page has loaded successfully', () => {
	vepPage.votingGroupsLabel().should('be.visible').and('have.text', 'Paradice-All');
	vepPage.configurationNameLabel().should('be.visible').and('have.text', 'PIM0916');
	vepPage.priorityLevelLabel().should('be.visible').and('have.text', 'Priority level');
	vepPage.marketSpecific().should('be.visible').and('have.text', 'Market specific');
	vepPage.votingInstructionsLabel().should('be.visible').and('have.text', 'Voting instructions');
});
