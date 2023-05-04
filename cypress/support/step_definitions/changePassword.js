import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import changePasswordPage from '../page_objects/changePassword.page';

When('I navigate to the change password page', () => {
	cy.visit('/SetPsw/Change');
});

Then('I verify that all the relevant API calls for change password page are made', () => {
	//2 API Calls
	cy.statusCode200('@CURRENT_USER');
	cy.statusCode200('@PASSWORD_VALIDATOR_SETUP');
});

Then('I verify the fields to change password have loaded', () => {
	changePasswordPage.changePasswordTitle().should('be.visible').and('have.text', 'Change Password');
	changePasswordPage.currentPasswordLabel().should('be.visible').and('have.text', 'Current Password');
	changePasswordPage.newPasswordLabel().should('be.visible').and('have.text', 'New Password');
	changePasswordPage.confirmNewPasswordLabel().should('be.visible').and('have.text', 'Confirm New Password');
	changePasswordPage.updateButton().should('be.visible').and('have.text', 'Update');
});
