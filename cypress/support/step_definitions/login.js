import { Given, When, Then, attach } from '@badeball/cypress-cucumber-preprocessor';
import loginPage from '../page_objects/login.page';
import meetings from '../../fixtures/meetings.json';
const constants = require('../constants');

Given('I am on the login page of Viewpoint', () => {
	cy.visit('/');
	//verify page loaded
	loginPage.usernameInput().should('be.visible');
});

Given('I am logged in as the {string} user', (username) => {
	Cypress.env('username', username);
	cy.loginWithAdmin(constants.USER[username]);
});

Given('I am logged in as a random external user', () => {
	let randomUserId = Math.floor(Math.random() * (Object.keys(constants.USER).length - 3) + 3);
	const username = Object.values(constants.USER)[randomUserId];
	//login & log the user and time
	//cy.log('Random Number Is: ' + randomUserId + ' & logging in with: ' + username)
	cy.task('log', `logging in with: ${username} at ${new Date().toISOString().split('T')[1].split('.')[0]} GMT`);
	attach(`logging in with: ${username}`);
	cy.loginWithAdmin(username);
});

Given('I launch a random meeting for a random user', () => {
	//fetch a random user and meeting
	let rand = Math.floor(Math.random() * meetings.length) + 1;
	let username = meetings[rand].emailId;
	let meetingId = meetings[rand].meetingId;
	//login & log the user and meeting id along with time
	//cy.log('logging in with: ' + username + ' for meeting ID: ' + meetingId)
	cy.task(
		'log',
		`logging in with: ${username} for meeting ID: ${meetingId} at ${
			new Date().toISOString().split('T')[1].split('.')[0]
		} GMT`
	);
	cy.loginWithAdmin(username);
	//launch meeting details page
	cy.visit('MeetingDetails/Index/' + meetingId);
});

Then('I should logout from the application', () => {
	cy.request({
		method: 'GET',
		url: '/Home/Logout',
	}).then(() => {
		cy.visit('/');
	});
});

When('I login via the UI with the user {string}', function (username) {
	loginPage.usernameInput().type(constants.USER[username]);
	loginPage.passwordInput().type(constants.PASSWORD);
	loginPage.signInButton().click();
});

When('I refresh the page', () => {
	cy.reload();
});

When('I navigate to the URL {string}', (url) => {
	const isWorkFlowUrl = url.includes('WORKFLOW');
	const chosenUrl = isWorkFlowUrl ? constants.PAGES[url] : url;
	cy.visit(chosenUrl);
});

Then('I turn {string} the customer settings for {string} for {string}', (state, feature, customer) => {
	cy.visit('/Workflow');

	//Alias csrf token
	cy.wait('@WORKFLOW_EXPANSION', { responseTimeout: 150000 }).then((resp) => {
		var csrftoken = resp.request.headers.csrftoken;
		cy.wrap(csrftoken).as('csrftoken');
	});

	//get customer ID
	cy.getCustomerIDFromDB(customer).as('custid');

	//Turn on requested customer settings
	cy.get('@custid').then(function (cid) {
		const unixTime = Math.floor(Date.now() / 1000);
		const settings = `?&pCustomerID=${cid}&_=${unixTime}`;
		switch (feature) {
			case 'VAM and VAP':
				cy.ChangeCustomerSetting(state, settings, 'CanModifyVotesRationaleAfterMeetingDate');
				cy.ChangeCustomerSetting(state, settings, 'RequireRationaleVap');
				cy.ChangeCustomerSetting(state, settings, 'RequireRationaleVam');
				break;
			case 'Controversy Alert':
				cy.ChangeCustomerSetting(state, settings, 'IsControversyAlertEnabled');
				break;
			default:
				break;
		}
	});
});

Given('I set the setting {string} to {string} for the user {string}', (feature, value, customer) => {
	cy.loginWithAdmin(constants.USER.AUTOMATIONINTERNAL);
	cy.visit('/Users/UserProfile');
	cy.getAutomationUserIDFromDB(constants.USER[customer]).as('userid');
	cy.get('@userid').then((uid) => {
		loginPage.pageBody().then(($body) => {
			// we can use Cypress.$ to parse the string body
			// thus enabling us to query into it easily
			const $html = Cypress.$($body);
			const csrf = $html.find('input[name=csrf-token]').val();
			cy.request({
				method: 'POST',
				url: `/Api/Data/Permissions/UpdateUserPermissions`,
				headers: {
					CSRFToken: csrf,
				},
				body: {
					UserID: uid,
					Changes: [
						{
							ID: 335,
							Name: feature,
							Access: value,
						},
					],
				},
			}).then((resp) => {
				expect(resp.status).to.eq(200);
			});
		});
	});
	cy.logout();
});

Then('I randomly wait between {int} and {int} seconds', (min, max) => {
	let randomWaitInMilliseconds = Math.floor(Math.random() * (max * 1000 - min * 1000)) + min * 1000;
	cy.wait(randomWaitInMilliseconds);
});

Given('I am on the SSO Login page', () => {
	cy.visit('/ExternalSamlAuth/SamlLogin');
	loginPage.usernameInput().should('be.visible');
});

When('I SSO login with the email address {string}', (emailid) => {
	loginPage.usernameInput().type(emailid);
	loginPage.signInButton().click();
});

When('I should be redirected to the Bank Of America login page', () => {
	//SSO is enabled only in Ultra
	if (Cypress.env('testEnv') == 'ultra') {
		loginPage.ssoConfirmationLabel().should('be.visible');
		cy.origin('https://fedsso-pp.bankofamerica.com', () => {
			cy.url().should('include', '/bofa-customform-ui/login');
			cy.get("img[alt='Bank of America Logo']").should('be.visible');
		});
	} else {
		loginPage.usernameInput().should('be.visible');
	}
});
