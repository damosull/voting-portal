import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import userProfilePage from '../page_objects/userProfile.page';

When('I navigate to the user profile page', () => {
	cy.visit('/Users/UserProfile');
});

When('I navigate to the internal users profile page', () => {
	cy.visit('/Users/UsersProfiles');
});

Then('I verify that all the relevant API calls for user profile page are made', () => {
	//2 API Calls
	cy.statusCode200('@CURRENT_USER');
	cy.statusCode200('@GET_AUTHENTICATED_USER');
});

Then('I verify that all the relevant API calls for internal users profile page are made', () => {
	//5 API Calls
	cy.statusCode200('@CURRENT_USER');
	cy.statusCode200('@GET_USER_LIST');
	cy.statusCode200('@USER_PROFILE_HTML');
	cy.statusCode200('@USER_CREATOR_PERMISSIONS');
	cy.statusCode200('@USER_VIEW_MODEL_VALIDATION_RULES');
});

Then('I verify that the user profile page has loaded successfully', () => {
	userProfilePage.userProfileTitle().should('be.visible').and('have.text', 'User Profile');
	userProfilePage.firstNameLabel().should('be.visible').and('have.text', 'First Name');
	userProfilePage.emailLabel().should('be.visible').and('have.text', 'Email');
	userProfilePage.loginTypeLabel().should('be.visible').and('have.text', 'Login Type');
	userProfilePage.updateButton().should('be.visible').and('have.text', 'Update');
});
