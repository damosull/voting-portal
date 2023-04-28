import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import userProfilePage from '../page_objects/userProfile.page';

When('I navigate to the user profile page', () => {
	cy.visit('/Users/UserProfile');
});

When('I navigate to the users profiles page', () => {
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

Then('I verify that the user profile page has loaded successfully', ()=> {
  userProfilePage.userProfileTitle().should('be.visible').and('have.text', 'User Profile');
	userProfilePage.firstNameLabel().should('be.visible').and('have.text', 'First Name');
	userProfilePage.emailLabel().should('be.visible').and('have.text', 'Email');
	userProfilePage.loginTypeLabel().should('be.visible').and('have.text', 'Login Type');
	userProfilePage.updateButton().should('be.visible').and('have.text', 'Update');
});

Then('I verify that all the relevant API calls for users profiles page are made for {string}', (userType)=> {
	cy.statusCode200('@CURRENT_USER');
	cy.statusCode200('@GET_USER_LIST');

	if(userType.includes('internal')){
		cy.statusCode200('@USER_CREATOR_PERMISSIONS');
		cy.statusCode200('@USER_VIEW_MODEL_VALIDATION_RULES');
		cy.statusCode200('@VOTING_GROUP_SEARCH');
	}
});

Then('I verify that the users profiles page has loaded successfully', ()=>{
	userProfilePage.userListTitle().contains('Active Users').and('be.visible');
	userProfilePage.activeUsersList().should('be.visible');
	userProfilePage.userListTitle().contains('Inactive Users').and('be.visible');
	userProfilePage.inactiveUsersList().should('be.visible');
});