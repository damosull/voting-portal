import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import meetingDetailsPage from '../page_objects/meetingDetails.page';
import workflowPage from '../page_objects/workflow.page';
import * as dateUtils from '../../utils/date';
const constants = require('../constants');
let meetingId, preTotalVoted, preTotalNotVoted, postTotalVoted, postTotalNotVoted;

Then('I can view the Meeting Details page', () => {
	cy.wait('@GET_MEETING_ID', { requestTimeout: 30000, responseTimeout: 75000 });
	cy.wait('@RELATED_MEETINGS', { requestTimeout: 30000, responseTimeout: 75000 });
	cy.wait('@VOTE_TALLY', { requestTimeout: 30000, responseTimeout: 75000 });
	cy.url().should('include', '/MeetingDetails/Index/');
	meetingDetailsPage.getLoadingSpinner().should('not.exist');
});

Then('I verify that there are ballots available for the meeting', () => {
	meetingDetailsPage.noBallotsAvailableMessage().should('not.be.visible');
});

Then('I can see the Vote, Take No Action and Instruct buttons', () => {
	cy.verifyMeetingOptionButtons();
});

Then('I can verify I am on the Meeting Details page', () => {
	cy.url().should('include', '/MeetingDetails/Index/');
	meetingDetailsPage.homeButton().should('be.visible');
	meetingDetailsPage.accountButton().should('be.visible');
});

When('I navigate to the meeting details page for the meeting {string}', (meetingID) => {
	//check if user passed the meetingId or a constant from constants.js
	if (meetingId.match(/^[0-9]+$/) != null) {
		cy.visit('MeetingDetails/Index/' + meetingId);
	} else if (meetingID.contains('DB')) {
		cy.visit('MeetingDetails/Index/' + Cypress.env('meetingId'));
	} else {
		cy.visit('MeetingDetails/Index/' + constants.MEETINGID[meetingID]);
	}
});

When('I navigate to the meeting details page for the captured meeting ID', () => {
	cy.visit('MeetingDetails/Index/' + Cypress.env('meetingId'));
});

When('I navigate to the Meeting Details page for the saved meeting ID', () => {
	cy.visit(meetingId);
});

When('I add {int} days to the meeting {string}', (noOfDays, meetingId) => {
	//check if user passed the meetingId or a constant from constants.js
	if (meetingId.match(/^[0-9]+$/) != null) {
		cy.SetMeetingDateXdaysFromToday(meetingId, noOfDays);
	} else {
		cy.SetMeetingDateXdaysFromToday(constants.MEETINGID[meetingId], noOfDays);
	}
});

When(
	'I set the meeting date to {int} days from today and navigate to the meeting details page for the meeting {string}',
	(noOfDays, meetingID) => {
		cy.SetMeetingDateXdaysFromToday(constants.MEETINGID[meetingID], noOfDays);
		cy.visit('MeetingDetails/Index/' + constants.MEETINGID[meetingID]);
	}
);

When('I click on the Change Vote or Rationale button', () => {
	meetingDetailsPage.unlockButton().click();
	cy.verifyMeetingOptionButtons();
});

When('I click on the Change Vote or Rationale button if it exists', () => {
	cy.clickIfExist(meetingDetailsPage.unlockButtonLocator);
	cy.verifyMeetingOptionButtons();
});

Then('I can verify that the voting buttons are disabled', () => {
	meetingDetailsPage.voteNowButton().should('be.disabled');
	meetingDetailsPage.voteNowButton().should('have.css', 'background-color', 'rgb(179, 188, 192)');
	meetingDetailsPage.takeNoActionButton().should('be.disabled');
	meetingDetailsPage.takeNoActionButton().should('have.css', 'background-color', 'rgb(179, 188, 192)');
	meetingDetailsPage.instructButton().should('be.disabled');
	meetingDetailsPage.instructButton().should('have.css', 'background-color', 'rgb(179, 188, 192)');
});

Then('I can verify the hover text for the voting buttons gives a valid message', () => {
	let hoverText = 'You can only vote up until meeting date. If you need to vote, contact your Client Service Manager.';
	meetingDetailsPage.voteNowButton().should('have.attr', 'title', hoverText);
	meetingDetailsPage.takeNoActionButton().should('have.attr', 'title', hoverText);
	meetingDetailsPage.instructButton().should('have.attr', 'title', hoverText);
});

Then(
	'I can verify the research html and pdf links take user to the "We could not load the research paper" page',
	() => {
		meetingDetailsPage.researchHtmlLink().invoke('removeAttr', 'target').click();
		meetingDetailsPage.containsText('We could not load the research paper').should('be.visible');
		cy.go('back');
		meetingDetailsPage.researchPdfLink().invoke('removeAttr', 'target').click();
		meetingDetailsPage.containsText('We could not load the research paper').should('be.visible');
		cy.go('back');
	}
);

Then('I should be {string} to see {string} on the UI', (isVisible, element) => {
	isVisible = isVisible.includes('unable') ? 'not.be.visible' : 'be.visible';
	switch (element) {
		case 'Controversy Alert link':
			meetingDetailsPage.controversyAlertDiv().should(isVisible);
			break;
		case 'Change Vote or Rationale':
			meetingDetailsPage.unlockButton().should(isVisible).should('have.text', 'Change Vote or Rationale');
			break;
		case 'Recommendations Pending under Vote Tally':
			meetingDetailsPage
				.totalNotVotedLink()
				.should('be.visible')
				.then(($el) => {
					preTotalNotVoted = Number($el.text());
					meetingDetailsPage.recommendationsPendingStatusCountLabel().should(isVisible);
					if (!isVisible.includes('not')) {
						meetingDetailsPage.recommendationsPendingStatusCountLabel().should('contain.text', preTotalNotVoted);
					}
				});
			break;
		case 'Recommendations Available under Vote Tally':
			meetingDetailsPage.recommendationsAvailableStatusCountLabel().should(isVisible);
			break;
		case 'Manual Vote Required under Vote Tally':
			meetingDetailsPage.manualVoteRequiredStatusCountLabel().should(isVisible);
			break;
		case 'Take No Action under Vote Tally':
			meetingDetailsPage.takeNoActionStatusCountLabel().should(isVisible);
			break;
		case 'Info Only under Vote Tally':
			meetingDetailsPage.infoOnlyStatusCountLabel().should(isVisible);
			break;
		case 'Voted under Vote Tally':
			meetingDetailsPage.votedStatusCountLabel().should(isVisible);
			break;
		case 'Review Required under Vote Tally':
			meetingDetailsPage.reviewRequiredStatusCountLabel().should(isVisible);
			break;
		case 'Vote Button':
			meetingDetailsPage.voteNowButton().should(isVisible);
			break;
		case 'Custom Policy Rationale modal':
			meetingDetailsPage.customPolicyRationaleModalHeading().should(isVisible);
			break;
		case 'Rule Name heading':
			meetingDetailsPage.customPolicyRationaleModalTableHeader('Rule Name').should(isVisible);
			break;
		case 'View All button':
			meetingDetailsPage.viewAllCommentsLink().should(isVisible);
			break;
		case 'rationales':
			meetingDetailsPage.rationaleEditorContainer().should(isVisible);
			break;
		default:
			meetingDetailsPage.containsText(element).should(isVisible);
			break;
	}
});

Then('I verify that the Instruct button has changed to Re-Instruct button', () => {
	meetingDetailsPage.instructButton().should('contain.text', 'Re-Instruct');
});

Then('I can verify that the quick vote button is visible and has a width of 125 pixels', () => {
	meetingDetailsPage.quickVoteDropdown().should('be.visible');
	meetingDetailsPage.quickVoteDropdown().invoke('outerWidth').should('eq', 125);
});

Then('I can verify that the quick vote dropdown options display a list of valid options', () => {
	meetingDetailsPage.quickVoteOptions().contains('For').should('exist');
	meetingDetailsPage.quickVoteOptions().contains('Against/Withhold').should('exist');
	meetingDetailsPage.quickVoteOptions().contains('MGMT Rec').should('exist');
	meetingDetailsPage.quickVoteOptions().contains('GL Rec').should('exist');
	meetingDetailsPage.quickVoteOptions().contains('Policy Rec').should('exist');
});

Then('I verify that the quick vote option for {string} is read only', (voteType) => {
	meetingDetailsPage.quickVoteDisabledOptions().should('contain.text', voteType);
});

Then('I quick vote {string} on the meeting', (voteType) => {
	meetingDetailsPage.quickVoteSelect().select(voteType, { force: true });
});

Then('I quick vote with the first available option on the dropdown', () => {
	meetingDetailsPage
		.quickVoteOptions()
		.eq(1)
		.then((element) => {
			meetingDetailsPage.quickVoteSelect().select(element.val(), { force: true });
		});
});

Then('I capture the value of Total Not Voted', () => {
	// Store the "Total Not Voted" to later compare with the "Total Voted"
	meetingDetailsPage
		.totalNotVotedLink()
		.invoke('text')
		.then((text) => {
			cy.wrap(text).as('totalNotVoted');
		});
});

Then('I can verify that the Info section displays all read only fields', () => {
	meetingDetailsPage.infoDiv().contains('Ticker').should('be.visible').click({ scrollBehavior: false });
	meetingDetailsPage.infoDiv().contains('ISIN').should('be.visible').click({ scrollBehavior: false });
	meetingDetailsPage.infoDiv().contains('Inc').should('be.visible').click({ scrollBehavior: false });
	meetingDetailsPage.infoDiv().contains('Blocking').should('be.visible').click({ scrollBehavior: false });
	meetingDetailsPage.infoDiv().contains('Deadline').should('be.visible').click({ scrollBehavior: false });
	meetingDetailsPage.infoDiv().contains('Meeting Date').should('be.visible').click({ scrollBehavior: false });
	meetingDetailsPage.infoDiv().contains('Record Date').should('be.visible').click({ scrollBehavior: false });
	meetingDetailsPage.infoDiv().contains('RFS').should('be.visible').click({ scrollBehavior: false });
	meetingDetailsPage.infoDiv().contains('Vote Tally').should('be.visible').click({ scrollBehavior: false });
	meetingDetailsPage.infoDiv().contains('Total Voted').should('be.visible').click({ scrollBehavior: false });
	meetingDetailsPage.infoDiv().contains('Total Not Voted').should('be.visible').click({ scrollBehavior: false });
});

Then('I replace my FOR votes with AGAINST and vice-versa', () => {
	meetingDetailsPage.voteCardRow().then(($rows) => {
		$rows.each((index, value) => {
			const rec = Cypress.$(value).find('td.vote-card-policy-rec').text();
			if (rec.includes('Non Voting')) {
				//do nothing
			} else {
				var selected = Cypress.$(value).find(':selected').text();
				var option1 = Cypress.$(value).find('option').eq(1).text();
				var option2 = Cypress.$(value).find('option').eq(2).text();
				if (Cypress.$(value).find('option').eq(1).text() !== selected) {
					cy.get(`#md-votecard-grid-results > tr:nth-child(${index + 1}) > td.vote-card-vote-dec > select`).select(
						option1,
						{ force: true }
					);
				} else {
					cy.get(`#md-votecard-grid-results > tr:nth-child(${index + 1}) > td.vote-card-vote-dec > select`).select(
						option2,
						{ force: true }
					);
				}
			}
		});
	});
});

Then('I click on the Workflow option from the toolbar', () => {
	meetingDetailsPage.workflowButton().click();
});

When('I click on a policy rec link in the vote card section', () => {
	meetingDetailsPage.policyRecLink().eq(0).click();
});

When('I click on the previous meeting button', () => {
	meetingDetailsPage.previousMeetingLink().invoke('attr', 'style', 'display: block');
	meetingDetailsPage.previousMeetingLink().click();
});

When('I click on the next meeting button', () => {
	meetingDetailsPage.nextMeetingLink().invoke('attr', 'style', 'display: block');
	meetingDetailsPage.nextMeetingLink().click();
});

Then(
	'I can see the other items on Custom Policy Rationale modal like Policy ID, Rationale, Replace Rationale, Item Number and Proposal',
	() => {
		meetingDetailsPage.customPolicyRationaleModalTableHeader('Policy ID').should('be.visible');
		meetingDetailsPage.customPolicyRationaleModalTableHeader('Rationale').should('be.visible');
		meetingDetailsPage.customPolicyRationaleModalTableHeader('Replace Rationale').should('be.visible');
		meetingDetailsPage.customPolicyRationaleModalItem().should('be.visible');
		meetingDetailsPage.customPolicyRationaleModalProposal().should('be.visible');
	}
);

Then('I can verify that I am unable to access Custom Policy Rationale modal for policy rec column', () => {
	meetingDetailsPage.policyRecLabel().find('a').should('have.length', 0);
	meetingDetailsPage.customPolicyRationaleModalHeading().should('not.be.visible');
});

Then('I can verify that the {string} rec column displays with {string}', (column, column_value) => {
	let rec;
	meetingDetailsPage.voteCardRow().then(($rows) => {
		$rows.each((index, value) => {
			if (column.includes('policy')) {
				rec = Cypress.$(value).find('td.vote-card-policy-rec').text();
			} else if (column.includes('gl')) {
				rec = Cypress.$(value).find('td.vote-card-policy-rec').prev().text();
			} else {
				rec = Cypress.$(value).find('td.vote-card-policy-rec').prev().prev().text();
			}
			expect(rec).to.equal(column_value);
		});
	});
});

Then('I can verify that the vote decision match the value from the {string} column', (column) => {
	let recValue, voteValue;
	meetingDetailsPage.voteCardRow().then(($rows) => {
		$rows.each((index, value) => {
			if (column.includes('policy')) {
				recValue = Cypress.$(value).find('td.vote-card-policy-rec').text();
			} else if (column.includes('gl')) {
				recValue = Cypress.$(value).find('td.vote-card-policy-rec').prev().text();
			} else {
				recValue = Cypress.$(value).find('td.vote-card-policy-rec').prev().prev().text();
			}
			//meetingDetailsPage.voteDecisionData().eq(index).find(':selected').should('contain.text', recValue)
			voteValue = Cypress.$(value).find('td.vote-card-vote-dec').find(':selected').text();
			expect(recValue.toUpperCase()).to.equal(voteValue.toUpperCase());
		});
	});
});

Then('I should be able to verify that all ballots have decision status as {string}', (ballotValue) => {
	meetingDetailsPage.ballotSectionRows().then(($rows) => {
		$rows.each((index, value) => {
			value = Cypress.$(value).find('td.col-control-number').next().next().next().next().next().text();
			expect(value).to.equal(ballotValue);
		});
	});
});

Then('I can verify that the Quick Vote option and Vote Decision are read only', () => {
	meetingDetailsPage.quickVoteDropdown().should('have.attr', 'aria-disabled', 'true');
	meetingDetailsPage.voteCardRow().then(($rows) => {
		$rows.each((index) => {
			cy.get(`#md-votecard-grid-results > tr:nth-child(${index + 1}) > td.vote-card-vote-dec > select`).should(
				'have.attr',
				'disabled'
			);
		});
	});
});

Then('I can verify that the Quick Vote option is disabled and Vote Decision options are unavailable', () => {
	meetingDetailsPage.quickVoteDropdown().should('have.attr', 'aria-disabled', 'true');
	meetingDetailsPage.voteCardRow().then(($rows) => {
		$rows.each((index) => {
			cy.get(`#md-votecard-grid-results > tr:nth-child(${index + 1}) > td.vote-card-vote-dec > select`).should(
				'not.exist'
			);
		});
	});
});

Then('I should be able to use the Instruct functionality on the meeting', () => {
	meetingDetailsPage.instructButton().click();
	meetingDetailsPage.getLoadingSpinner().should('not.exist');
	meetingDetailsPage.pageBody().then((body) => {
		//Verify element exists
		if (body.find(meetingDetailsPage.warningPopUpLocator).is(':visible')) {
			meetingDetailsPage.warningPopUp().within(() => {
				meetingDetailsPage.genericCheckbox().should('not.be.visible').check({ force: true });
			});
			meetingDetailsPage.proceedButton().click();
		}
	});
	toastContains('success');
});

Then('I should be able to use the Take No Action functionality on the meeting', () => {
	meetingDetailsPage.takeNoActionButton().click();
	meetingDetailsPage.getLoadingSpinner().should('not.exist');
	meetingDetailsPage.pageBody().then((body) => {
		//Verify element exists
		if (body.find(meetingDetailsPage.warningPopUpLocator).is(':visible')) {
			meetingDetailsPage.warningPopUp().within(() => {
				meetingDetailsPage.genericCheckbox().should('not.be.visible').check({ force: true });
			});
			meetingDetailsPage.proceedButton().click();
		}
	});
	toastContains('success');
});

Then('I should get a popup window with a warning and OK and Cancel buttons', () => {
	meetingDetailsPage.confirmPopUp().should('be.visible');
	meetingDetailsPage.confirmPopUpContent().should('contain.text', 'your vote decisions will not be saved');
	meetingDetailsPage.popUpOkButton().should('be.visible');
	meetingDetailsPage.popUpCancelButton().should('be.visible');
});

When('I click on the OK button', () => {
	meetingDetailsPage.popUpOkButton().click();
});

When('I click on the Cancel button', () => {
	meetingDetailsPage.popUpCancelButton().click();
});

When('I click on the Cancel button on the vote popup', () => {
	meetingDetailsPage.cancelPopUpButton().click();
});

Then('I click on the Vote button', () => {
	meetingDetailsPage.voteNowButton().click();
});

Then('I click on the Proceed button', () => {
	meetingDetailsPage.getLoadingSpinner().should('not.exist');
	cy.clickIfExist(meetingDetailsPage.proceedButtonLocator);
});

Then('I click the Company link', () => {
	meetingDetailsPage.companyNameLink().click();
});

Then('I save the company name', () => {
	meetingDetailsPage.companyNameLink().should(($div) => {
		let companyName = $div.text();
		Cypress.env('companyName', companyName);
	});
});

Then('I handle the override pop-up if it exists', () => {
	cy.wait('@VOTE_REQUEST_VALIDATION', {
		requestTimeout: 45000,
		responseTimeout: 75000,
	});
	meetingDetailsPage.getLoadingSpinner().should('not.exist');
	meetingDetailsPage.pageBody().then((body) => {
		//Verify element exists
		if (body.find(meetingDetailsPage.warningPopUpLocator).is(':visible')) {
			meetingDetailsPage.warningPopUp().within(() => {
				meetingDetailsPage.genericCheckbox().should('not.be.visible').check({ force: true });
			});
			meetingDetailsPage.proceedButton().click({ force: true });
		}
	});
});

Then('I select the checkbox and click Proceed', () => {
	meetingDetailsPage.checkboxOverride().should('be.visible').click();
	meetingDetailsPage.proceedButton().click();
});

Then('The Proceed button should be enabled', () => {
	meetingDetailsPage.proceedButton().should('be.visible');
});

Then('I can see a Vote success message', () => {
	toastContains('success');
});

Then('I verify the vote tally section by checking the total votes and hyperlinks', () => {
	meetingDetailsPage.totalVotedLink().should('be.visible').click();
	meetingDetailsPage.closeVoteTallyPopup().should('be.visible').click();
	meetingDetailsPage.totalNotVotedLink().should('be.visible').click();
	meetingDetailsPage.closeVoteTallyPopup().should('be.visible').click();
});

Then('I verify that the Voted section shows all votes and nothing is displayed under Total Not Voted', () => {
	let value1, value2;
	meetingDetailsPage.totalVotedLink().should(($el) => {
		value1 = $el.text();
		expect(value1).to.not.equal('0');
	});
	meetingDetailsPage.totalVotedLabel().should(($el) => {
		value2 = $el.text();
		expect(value1).to.equal(value2);
	});
});

When('I click on the Glass Lewis logo on the top left', () => {
	meetingDetailsPage.glassLewisLogoLink().click();
});

When('I click on the home button', () => {
	meetingDetailsPage.homeButton().click();
});

Then('I click on the share meeting option', () => {
	meetingDetailsPage.shareMeetingButton().click();
	meetingDetailsPage.shareMeetingPopUpHeading().should('be.visible');
	cy.wait('@SHARE_MEETING_LISTS');
});

Then('I vote for an item which had no previous vote with Glass Lewis Recommendations', () => {
	meetingDetailsPage.voteCardRow().then(($rows) => {
		$rows.each((index, value) => {
			const rec = Cypress.$(value).find('td.vote-card-policy-rec').text();
			const glRec = Cypress.$(value).find('td:nth-of-type(4)').text();
			if (rec.includes('Manual')) {
				cy.get(`#md-votecard-grid-results > tr:nth-child(${index + 1}) > td.vote-card-vote-dec > select`).select(
					glRec,
					{ force: true }
				);
			}
		});
	});
});

Then('I add a controversy alert file for the meeting', () => {
	cy.addControversyAlertFile();
});

Then('The {string} functionality is {string}', (permission_name, isAvailable) => {
	cy.clickIfExist(meetingDetailsPage.unlockButtonLocator);

	switch (permission_name) {
		case 'Vote':
			isAvailable = isAvailable.includes('not') ? 'not.be.visible' : 'be.visible';
			meetingDetailsPage.voteNowButton().should(isAvailable);
			break;
		case 'Instruct':
			isAvailable = isAvailable.includes('not') ? 'not.exist' : 'exist';
			meetingDetailsPage.instructButton().should(isAvailable);
			break;
		case 'Take No Action':
			isAvailable = isAvailable.includes('not') ? 'not.exist' : 'exist';
			meetingDetailsPage.takeNoActionButton().should(isAvailable);
			break;
		default:
			break;
	}
});

Then('I export the ballot status report', () => {
	meetingDetailsPage.exportButtonDropdown().click();
	meetingDetailsPage.exportBallotStatusReportButton().click();
	meetingDetailsPage.xlsRadio().check({ force: true });
	meetingDetailsPage.exportButton().click();
});

Then('A toast message appears for {string}', (value) => {
	meetingDetailsPage.toastMessage().should('contain.text', constants.messages.toast[value]);
	meetingDetailsPage.toastMessage().should('not.exist');
});

Then('I verify the vote tally section displays counts of total voted and total not voted items', () => {
	meetingDetailsPage
		.totalVotedLink()
		.should('be.visible')
		.then(($el) => {
			preTotalVoted = Number($el.text());
		});
	meetingDetailsPage
		.totalNotVotedLink()
		.should('be.visible')
		.then(($el) => {
			preTotalNotVoted = Number($el.text());
		});
});

Then('I verify that the total voted number has changed to the previous total not voted number', () => {
	meetingDetailsPage
		.totalVotedLink()
		.should('be.visible')
		.then(($el) => {
			postTotalVoted = Number($el.text());
			expect(postTotalVoted).to.equal(preTotalNotVoted);
		});
	meetingDetailsPage
		.totalNotVotedLink()
		.should('be.visible')
		.then(($el) => {
			postTotalNotVoted = Number($el.text());
			expect(postTotalNotVoted).to.equal(preTotalVoted);
		});
});

Then('I verify the vote tally modal is displayed when user clicks on the total voted hyperlink', () => {
	meetingDetailsPage.totalVotedLink().should('be.visible').click();
	meetingDetailsPage.closeVoteTallyPopup().should('be.visible');
});

Then('I verify that the vote tally modal contains all the expected headers', () => {
	meetingDetailsPage.voteTallyPopupDiv().within(() => {
		meetingDetailsPage
			.containsText(
				'Selecting the number of ballots voted or not voted for a policy will apply the appropriate filter in the vote card'
			)
			.should('be.visible');
		meetingDetailsPage.containsText('Policy ID').should('be.visible');
		meetingDetailsPage.containsText('Ballots Voted').should('be.visible');
		meetingDetailsPage.containsText('Ballots Not Voted').should('be.visible');
		meetingDetailsPage.containsText('Shares').should('be.visible');
		meetingDetailsPage.containsText('Shares on Loan').should('be.visible');
		meetingDetailsPage.containsText('Shares Held').should('be.visible');
	});
});

Then('I verify that the vote tally with count of 0 is not hyperlinked', () => {
	meetingDetailsPage.voteTallyPopupDiv().within(() => {
		meetingDetailsPage.voteTallyTableBallotsNotVotedValue().should('contain.text', '0');
	});
});

Then('I verify that the vote tally modal displays a value for each table column', () => {
	meetingDetailsPage.voteTallyPopupDiv().within(() => {
		for (let i = 1; i < 7; i++) {
			cy.get(`table tbody tr td:nth-child(${i})`).should('not.have.text', '');
		}
	});
});

Then('I close the vote tally popup', () => {
	meetingDetailsPage.closeVoteTallyPopup().should('be.visible').click();
});

Then('I can verify that all policy recommendations are matching {string} recommendations', (institute) => {
	meetingDetailsPage.voteCardRow().then(($rows) => {
		$rows.each((index, value) => {
			const rec = Cypress.$(value).find('td.vote-card-policy-rec').text();
			if (rec.includes('Manual') || rec.includes('Not')) {
				// Do Nothing
			} else {
				if (institute === 'GL') {
					let glValue = Cypress.$(value).find('td:nth-of-type(4)').text();
					expect(glValue).to.equal(rec);
				} else if (institute === 'MGMT') {
					let mgmtValue = Cypress.$(value).find('td:nth-of-type(3)').text();
					expect(mgmtValue).to.equal(rec);
				}
			}
		});
	});
});

Then('I can verify that at least one policy recommendations is against {string} recommendations', (institute) => {
	meetingDetailsPage.voteCardRow().then(($rows) => {
		let count = 0;
		$rows.each((index, value) => {
			const rec = Cypress.$(value).find('td.vote-card-policy-rec').text();
			if (rec.includes('Manual') || rec.includes('Not')) {
				// Do Nothing
			} else {
				if (institute === 'GL') {
					let glValue = Cypress.$(value).find('td:nth-of-type(4)').text();
					if (glValue !== rec) {
						count = count + 1;
					}
				} else if (institute === 'MGMT') {
					let mgmtValue = Cypress.$(value).find('td:nth-of-type(3)').text();
					if (mgmtValue !== rec) {
						count = count + 1;
					}
				}
			}
		});
		expect(count).to.be.greaterThan(0);
	});
});

Then('I should see a message that contains the text {string}', (message) => {
	meetingDetailsPage.pageBody().contains(message);
});

Then('I should be able to verify the UI shows filename with "..." and its extension is .pdf', () => {
	meetingDetailsPage.controversyAlertLink().should('contain.text', '...');
	//due to the page load issue when downloading a file, below code will click on download link
	//and then refresh page after 5 seconds so that the script does not fail
	cy.window()
		.document()
		.then(function (doc) {
			doc.addEventListener('click', () => {
				setTimeout(function () {
					doc.location.reload();
				}, 5000);
			});
			meetingDetailsPage.controversyAlertLink().invoke('removeAttr', 'target').click();
		});
	cy.readFile(`${Cypress.config('downloadsFolder')}/AutomationTest12345.pdf`).should((fileContent) => {
		expect(fileContent.length).to.be.gt(100);
	});
});

Then('I clear the rationales for VAM entries and VAP entries and add rationales for remaining proposals', () => {
	meetingDetailsPage.voteCardRow().then(($rows) => {
		$rows.each((index, value) => {
			const vamrec = Cypress.$(value).find('td:nth-child(3)').text();
			const vaprec = Cypress.$(value).find('td.vote-card-policy-rec').text();
			var selected = Cypress.$(value).find(':selected').text();
			if (!vaprec.includes('Non Voting')) {
				if (vaprec.toLowerCase() !== selected.toLowerCase() || vamrec.toLowerCase() !== selected.toLowerCase()) {
					cy.get(`#md-votecard-grid-results > tr:nth-child(${index + 1}) > td.cell-with-rationale > div > div > span`)
						.scrollIntoView()
						.click({ force: true });
					cy.get(
						`#md-votecard-grid-results > tr:nth-child(${
							index + 1
						}) > td.cell-with-rationale > div > div > div > div.editable-input > textarea`
					).clear({ force: true });
					cy.get(
						`#md-votecard-grid-results > tr:nth-child(${
							index + 1
						}) > td.cell-with-rationale > div > div > div > div.editable-input > div.editable-buttons > button.js-editable-submit.secondary.blue.btn-update`
					).click({ force: true });
				} else {
					cy.get(`tr:nth-child(${index + 1}) > td.cell-with-rationale > div > div > span`)
						.scrollIntoView()
						.click({ force: true });
					cy.get(
						`#md-votecard-grid-results > tr:nth-child(${
							index + 1
						}) > td.cell-with-rationale > div > div > div > div.editable-input > textarea`
					).clear({ force: true });
					cy.get(
						`#md-votecard-grid-results > tr:nth-child(${
							index + 1
						}) > td.cell-with-rationale > div > div > div > div.editable-input > textarea`
					).type('test', { force: true });
					cy.get(
						`#md-votecard-grid-results > tr:nth-child(${
							index + 1
						}) > td.cell-with-rationale > div > div > div > div.editable-input > div.editable-buttons > button.js-editable-submit.secondary.blue.btn-update`
					).click({ force: true });
				}
			}
		});
	});
});

Then('I clear the rationales for VAM entries and add rationales for other proposals', () => {
	meetingDetailsPage.voteCardRow().then(($rows) => {
		$rows.each((index, value) => {
			const rec = Cypress.$(value).find('td:nth-child(3)').text();
			var selected = Cypress.$(value).find(':selected').text();
			if (!rec.includes('Non Voting')) {
				if (rec.toLowerCase() !== selected.toLowerCase()) {
					cy.get(`#md-votecard-grid-results > tr:nth-child(${index + 1}) > td.cell-with-rationale > div > div > span`)
						.scrollIntoView()
						.click({ force: true });
					cy.get(
						`#md-votecard-grid-results > tr:nth-child(${
							index + 1
						}) > td.cell-with-rationale > div > div > div > div.editable-input > textarea`
					).clear({ force: true });
					cy.get(
						`#md-votecard-grid-results > tr:nth-child(${
							index + 1
						}) > td.cell-with-rationale > div > div > div > div.editable-input > div.editable-buttons > button.js-editable-submit.secondary.blue.btn-update`
					).click({ force: true });
				} else {
					cy.get(`tr:nth-child(${index + 1}) > td.cell-with-rationale > div > div > span`)
						.scrollIntoView()
						.click({ force: true });
					cy.get(
						`#md-votecard-grid-results > tr:nth-child(${
							index + 1
						}) > td.cell-with-rationale > div > div > div > div.editable-input > textarea`
					).clear({ force: true });
					cy.get(
						`#md-votecard-grid-results > tr:nth-child(${
							index + 1
						}) > td.cell-with-rationale > div > div > div > div.editable-input > textarea`
					).type('test', { force: true });
					cy.get(
						`#md-votecard-grid-results > tr:nth-child(${
							index + 1
						}) > td.cell-with-rationale > div > div > div > div.editable-input > div.editable-buttons > button.js-editable-submit.secondary.blue.btn-update`
					).click({ force: true });
				}
			}
		});
	});
});

Then('I clear the rationales for VAP entries and add rationales for other proposals', () => {
	meetingDetailsPage.voteCardRow().then(($rows) => {
		$rows.each((index, value) => {
			const rec = Cypress.$(value).find('td.vote-card-policy-rec').text();
			var selected = Cypress.$(value).find(':selected').text();
			if (!rec.includes('Non Voting')) {
				if (rec.toLowerCase() !== selected.toLowerCase()) {
					cy.get(`#md-votecard-grid-results > tr:nth-child(${index + 1}) > td.cell-with-rationale > div > div > span`)
						.scrollIntoView()
						.click({ force: true });
					cy.get(
						`#md-votecard-grid-results > tr:nth-child(${
							index + 1
						}) > td.cell-with-rationale > div > div > div > div.editable-input > textarea`
					).clear({ force: true });
					cy.get(
						`#md-votecard-grid-results > tr:nth-child(${
							index + 1
						}) > td.cell-with-rationale > div > div > div > div.editable-input > div.editable-buttons > button.js-editable-submit.secondary.blue.btn-update`
					).click({ force: true });
				} else {
					cy.get(`tr:nth-child(${index + 1}) > td.cell-with-rationale > div > div > span`)
						.scrollIntoView()
						.click({ force: true });
					cy.get(
						`#md-votecard-grid-results > tr:nth-child(${
							index + 1
						}) > td.cell-with-rationale > div > div > div > div.editable-input > textarea`
					).clear({ force: true });
					cy.get(
						`#md-votecard-grid-results > tr:nth-child(${
							index + 1
						}) > td.cell-with-rationale > div > div > div > div.editable-input > textarea`
					).type('test', { force: true });
					cy.get(
						`#md-votecard-grid-results > tr:nth-child(${
							index + 1
						}) > td.cell-with-rationale > div > div > div > div.editable-input > div.editable-buttons > button.js-editable-submit.secondary.blue.btn-update`
					).click({ force: true });
				}
			}
		});
	});
});

Then('I enter rationales for all proposals in the meeting', () => {
	meetingDetailsPage.voteCardRow().then(($rows) => {
		$rows.each((index, value) => {
			const rec = Cypress.$(value).find('td.vote-card-policy-rec').text();
			if (!rec.includes('Non Voting')) {
				cy.get(`tr:nth-child(${index + 1}) > td.cell-with-rationale > div > div > span`)
					.scrollIntoView()
					.click({ force: true });
				cy.get(
					`#md-votecard-grid-results > tr:nth-child(${
						index + 1
					}) > td.cell-with-rationale > div > div > div > div.editable-input > textarea`
				).clear({ force: true });
				cy.get(
					`#md-votecard-grid-results > tr:nth-child(${
						index + 1
					}) > td.cell-with-rationale > div > div > div > div.editable-input > textarea`
				).type('test rationale', { force: true });
				cy.get(
					`#md-votecard-grid-results > tr:nth-child(${
						index + 1
					}) > td.cell-with-rationale > div > div > div > div.editable-input > div.editable-buttons > button.js-editable-submit.secondary.blue.btn-update`
				).click({ force: true });
			}
		});
	});
});

Then('the following alert is displayed in Vote Tally section {string}', (message) => {
	meetingDetailsPage.validationMessage().contains(message);
});

Then('I check the Job Number hyperlink with job number {string}', (jobNumber) => {
	meetingDetailsPage.jobNumberLink(jobNumber).should('be.visible');
});

Then('the given agendas appears on the page', () => {
	var voteCard = ['Accounts and Reports', 'Appointment of Auditor', 'Adoption of New Articles'];

	voteCard.forEach(function (proposals) {
		cy.contains(proposals);
	});
});

Then('I can verify that the Account filter has the value {string}', (value) => {
	meetingDetailsPage.accountButton().click();
	meetingDetailsPage.accountDiv().should('contain.text', value);
	meetingDetailsPage.cancelAccountButton().click({ scrollBehavior: false });
});

Then('I can verify that the Account Group filter has the value {string}', (value) => {
	meetingDetailsPage.accountGroupButton().click();
	meetingDetailsPage.accountGroupDiv().should('contain.text', value);
	meetingDetailsPage.cancelAccountGroupButton().click({ scrollBehavior: false });
});

Then('I filter for {string} account', (filterValue) => {
	meetingDetailsPage.accountButton().click();
	meetingDetailsPage
		.accountButton()
		.invoke('text')
		.then(() => {
			if (filterValue.includes('all but top two')) {
				meetingDetailsPage.selectAllAccountCheckbox().check({ force: true });
				meetingDetailsPage.selectAllAccountCheckbox().uncheck({ force: true });
				meetingDetailsPage.individualAccountCheckbox().then(($rows) => {
					for (let i = 2; i < $rows.length; i++) {
						meetingDetailsPage.individualAccountCheckbox().eq(i).check({ force: true });
					}
				});
			} else if (filterValue.includes('all')) {
				meetingDetailsPage.selectAllAccountCheckbox().check({ force: true });
			} else {
				meetingDetailsPage.selectAllAccountCheckbox().check({ force: true });
				meetingDetailsPage.selectAllAccountCheckbox().uncheck({ force: true });
				const j = filterValue.includes('first') ? '0' : '1';
				meetingDetailsPage.individualAccountCheckbox().eq(j).check({ force: true });
			}
		});
	meetingDetailsPage.updateAccountButton().click({ scrollBehavior: false });
	meetingDetailsPage.getLoadingSpinner().should('not.exist');
});

Then(
	'I can verify that the vote card summary remains unchanged when user changes the filters on {string}',
	(filterValue) => {
		meetingDetailsPage.totalVotedLink().should(($el) => {
			return (preTotalVoted = $el.text());
		});
		meetingDetailsPage.totalNotVotedLink().should(($el) => {
			return (preTotalNotVoted = $el.text());
		});
		//Change Filter Value based on Account / Account Group / Policy
		if (filterValue.includes('account group')) {
			meetingDetailsPage.accountGroupButton().click();
			meetingDetailsPage
				.accountGroupButton()
				.invoke('text')
				.then((text) => {
					if (text.includes('(1)')) {
						meetingDetailsPage.selectAllAccountGroupCheckbox().check({ force: true });
					} else {
						meetingDetailsPage.selectAllAccountGroupCheckbox().uncheck({ force: true });
						meetingDetailsPage.individualAccountGroupCheckbox().eq(0).check({ force: true });
					}
				});
			meetingDetailsPage.updateAccountGroupButton().click({ scrollBehavior: false });
		} else if (filterValue.includes('policy')) {
			meetingDetailsPage.policyButton().click();
			meetingDetailsPage
				.policyButton()
				.invoke('text')
				.then((text) => {
					if (text.includes('(1)')) {
						meetingDetailsPage.selectAllPolicyCheckbox().check({ force: true });
					} else {
						meetingDetailsPage.selectAllPolicyCheckbox().uncheck({ force: true });
						meetingDetailsPage.individualPolicyCheckbox().eq(0).check({ force: true });
					}
				});
			meetingDetailsPage.updatePolicyButton().click({ scrollBehavior: false });
		} else {
			meetingDetailsPage.accountButton().click();
			meetingDetailsPage
				.accountButton()
				.invoke('text')
				.then((text) => {
					if (text.includes('(1)')) {
						meetingDetailsPage.selectAllAccountCheckbox().check({ force: true });
					} else {
						meetingDetailsPage.selectAllAccountCheckbox().uncheck({ force: true });
						meetingDetailsPage.individualAccountCheckbox().eq(0).check({ force: true });
					}
				});
			meetingDetailsPage.updateAccountButton().click({ scrollBehavior: false });
		}
		//Wait for page to load and then compare values
		meetingDetailsPage.getLoadingSpinner().should('not.be.visible');
		meetingDetailsPage.totalVotedLink().should(($el) => {
			postTotalVoted = $el.text();
			expect(postTotalVoted).to.equal(preTotalVoted);
		});
		meetingDetailsPage.totalNotVotedLink().should(($el) => {
			postTotalNotVoted = $el.text();
			expect(postTotalNotVoted).to.equal(preTotalNotVoted);
		});
	}
);

Then('I can use the Filter on unvoted ballots functionality', () => {
	meetingDetailsPage.filterUnvotedBallotsButton().click();
	cy.verifyMeetingOptionButtons();
	meetingDetailsPage.filterUnvotedBallotsButton().should('not.be.visible');
});

When('I click on the Ballots Voted Link', () => {
	meetingDetailsPage.voteTallyBallotsVotedLink().click();
	meetingDetailsPage.getLoadingSpinner().should('not.exist');
});

When('I click on the Ballots Not Voted Link', () => {
	meetingDetailsPage.voteTallyBallotsNotVotedLink().click();
	meetingDetailsPage.getLoadingSpinner().should('not.exist');
});

When('I click on the Ballots filter', () => {
	meetingDetailsPage.ballotsButton().click();
});

Then('I select control number {int} from the top', (rowNo) => {
	cy.clickIfExist(meetingDetailsPage.ballotsSearchClearInputLocator);
	meetingDetailsPage.ballotsSearchInput().click({ force: true, scrollBehavior: false });
	for (let i = 2; i <= rowNo; i++) {
		meetingDetailsPage.ballotsSearchInput().type('{downarrow}');
	}
	meetingDetailsPage.ballotsSearchInput().type('{enter}');
});

Then('I click on the update button for Ballots filter', () => {
	meetingDetailsPage.ballotsSearchUpdateButton().click();
});

Then('I should be able to see the results for the Ballots filter', () => {
	meetingDetailsPage.policyButton().should('contain.text', '(1)');
	meetingDetailsPage.accountButton().should('contain.text', '(1)');
	meetingDetailsPage.ballotsButton().should('contain.text', '(1)');
});

Then('I verify that all the relevant API calls for meeting details page are made for {string} user', (userType) => {
	//35 API Calls
	cy.statusCode200('@CURRENT_USER');
	cy.statusCode200('@SETTINGS_READ');
	cy.statusCode200('@GET_CUSTOMER_SETTINGS');
	cy.statusCode200('@RATIONALE_LIBRARY');
	cy.statusCode200('@VOTE_CARD');
	cy.statusCode200('@VOTE_CARD_GRID_STATE');
	cy.statusCode200('@GET_MEETING_ID');
	cy.statusCode200('@VOTE_RESULTS');
	cy.statusCode200('@COMMENTS_IDENTITY_SEARCH');
	cy.statusCode200('@WORKFLOW_RESEARCH_INFO');
	cy.statusCode200('@RELATED_MEETINGS');
	cy.statusCode200('@MEETING_SECURITY_WATCHLIST');
	cy.statusCode200('@META_BALLOTS_GRID');
	cy.statusCode200('@BALLOTS_GRID_STATE');
	cy.statusCode200('@VOTE_AGAINST_POLICY_WL');
	cy.statusCode200('@MEETING_DETAILS_ACTIVITY');
	cy.statusCode200('@GET_FILINGS');
	cy.statusCode200('@VOTE_TALLY');
	cy.statusCode200('@VOTE_TALLY_OWNERSHIP');
	cy.statusCode200('@SEARCH_BALLOTS_WITH_SIMILAR_AGENDAS');
	cy.statusCode200('@COMMENTS');
	cy.statusCode200('@SHARE_MEETING_MODAL');

	if (userType.includes('external')) {
		cy.statusCode200('@ASSIGNED_MEETING_ID');
	}
});

Then('I click on the control number for {string}', (controlNumber) => {
	meetingDetailsPage.controlNumberLink().contains(constants.MEETINGID[controlNumber]).click();
});

Then('I should be able to verify the pagination works as expected on the ballot section page', () => {
	//Step 3 - verify the pagination default is set to '10'.
	meetingDetailsPage.ballotsPerPageDropdown().invoke('attr', 'style', 'display: block');
	meetingDetailsPage.ballotsPerPageDropdown().select('10');
	meetingDetailsPage.ballotsPerPageDropdownText().then(function (val) {
		const numBallots = val.text();
		expect(numBallots).to.equal('10');
	});

	meetingDetailsPage.ballotsPerPageDropdown().find(':selected').should('have.text', '10');

	//Step 3 -Now click the pagination dropdown and change the pagination to
	cy.SetPaginationAndVerify('50', 50);

	//Step 5 - Now click the pagination dropdown and change the pagination to 20 and log out of the application.
	cy.SetPaginationAndVerify('20', 20);
});

Then('I should be able to verify the pagination is displayed on the ballot section page', () => {
	const custColumns = [
		'Custodian Account Number',
		'Custodian Id',
		'Custodian Name',
		'Customer Account Name',
		'Customer Account Number',
	];
	const columnLabels = ['BallotsGrid3', 'BallotsGrid17', 'BallotsGrid18', 'BallotsGrid2', 'BallotsGrid11'];
	//Step 3 - User Clicks on 'Columns' button
	meetingDetailsPage.ballotsColumnsDropdown().click();
	meetingDetailsPage.ballotsColumnsModal().invoke('attr', 'style', 'display: block');

	//Step 4 - Verify that the user enter a character(Eg : Say 'Cus') in the responsive search of the "Columns" Modal
	meetingDetailsPage.ballotsColumnsInput().type('Cus');

	columnLabels.forEach((column) => {
		meetingDetailsPage.ballotsColumnsLabelFor(column).should('be.visible');
	});

	cy.get('#currently-selected-criteria > ul > li').first().invoke('attr', 'style', 'display: block');
	custColumns.forEach((col) => {
		meetingDetailsPage.ballotsColumnsLabelValue(col).check({ force: true }).should('be.checked');
	});

	meetingDetailsPage.ballotsColumnsApplyButton().click();

	//Step 5 - Navigate to the ballot section & click on the Columns button
	meetingDetailsPage.ballotsColumnsDropdown().click();
	meetingDetailsPage.ballotsColumnsModal().invoke('attr', 'style', 'display: block');
	custColumns.forEach((col) => {
		meetingDetailsPage.ballotsColumnsLabelValue(col).should('be.checked');
	});

	//Step 6 - Verify that the Default Field 'Control Number' is not available in the 'Columns' modal
	meetingDetailsPage.ballotsColumnsList().then(($rows) => {
		$rows.each((index, value) => {
			const mname = Cypress.$(value).find(`label`).text();
			expect(mname).to.not.equal('Control Number');
		});
	});
});

Then('I should be able to verify the chosen pagination is autosaved on the ballot section page', () => {
	meetingDetailsPage.ballotsPerPageDropdownText().then(function (val) {
		const numBallots = val.text();
		expect(numBallots).to.equal('10');
	});

	//Step7 - Set pagination to 50 and verify ballot displayed row count
	cy.SetPaginationAndVerify('50', 50);

	//Step 8 - Now change pagination  to "10"
	cy.SetPaginationAndVerify('10', 10);
});

Then(
	'I should be able to toggle between "Management" Multiple Agendas in the Vote card page for specific meeting type',
	() => {
		//Step 4 - Click on the 'Management' vote card dropdown
		meetingDetailsPage.managementDropdown().invoke('attr', 'class', 'dropdown related-meetings-list open');

		//Step 5 - Verify 'Ballots' section will only display specific 'Management' agenda type ballot details [Eg : Management - 934050888]
		meetingDetailsPage.ballotSectionSpan().then(function (val) {
			const agenda = val.text();
			expect(agenda).to.include(constants.MEETINGID.NBCOMMO_AGENDA1);
		});
		meetingDetailsPage.ballotSectionLinks().then(function (ctrlnum) {
			const displayedCtrlNum = ctrlnum.text();
			expect(displayedCtrlNum).to.include(constants.MEETINGID.NBCOMMO_CTRLNUM1);
		});

		//Step 6 - Select another 'Management' Vote card in the dropdown list[Eg: Management -934050915]
		//Expected - Vote Card page gets refreshed and 'Ballots' section gets updated with the 'Agenda Type' as 'Management' and 'Ballot Control Number' as different to that of previous 'Management' number
		meetingDetailsPage.ballotSectionThirdLink().click();
		cy.wait('@GET_AGENDA');

		meetingDetailsPage.ballotSectionSpan().then(function (val) {
			const agenda = val.text();
			expect(agenda).to.include(constants.MEETINGID.NBCOMMO_AGENDA2);
		});

		//verify all agendas can can be listed
		meetingDetailsPage.managementDropdown().invoke('attr', 'class', 'dropdown related-meetings-list open');
		meetingDetailsPage.ballotSectionFourthLink().click();
		cy.wait('@GET_AGENDA');

		meetingDetailsPage.ballotSectionSpan().then(function (val) {
			const agenda = val.text();
			expect(agenda).to.include(constants.MEETINGID.NBCOMMO_AGENDA3);
		});
	}
);

Then('the meeting id should match the expected current meeting id and previous meeting id', () => {
	var idMeeting = [1101707, 1129790];
	meetingDetailsPage.nextMeetingLink().click({ force: true });
	/* Click Previous button, get Meeting ID for that meeting and verify it is same meeting id as stored in a variable as 
    first meeting id*/
	meetingDetailsPage.previousMeetingLink().click({ force: true });
	cy.location('href').should('include', idMeeting[0]);
	cy.statusCode204('@LOGGER');
});

Then('the company id should match the expected company id', () => {
	var idCompany = [38673];
	// Navigate to Company Page, get company id and verify it is same company id as stored in a variable as first company id
	meetingDetailsPage.companyNameLink().click({ force: true });
	cy.location('href').should('include', idCompany[0]);
});

Then('I verify all listed items Meetings dropdown check for each in list includes the text "20"', () => {
	/* Click into Meetings dropdown on Company page and verify all listed items Meetings dropdown check for each in list
    includes the text '20' */
	meetingDetailsPage.meetingsDateDropdown().should('be.visible').click();
	meetingDetailsPage.meetingsDateDropdownModal().then(($rows) => {
		for (let i = 1; i < $rows.length - 1; i++) {
			cy.get(`#related-meetings > li > ul > li:nth-child(${i + 1}) > a > span:nth-child(1)`).then((fn) => {
				const fntxt = fn.text();
				expect(fntxt).to.include('20');
			});
		}
	});
});

Then('the filtered results should display the data only for vote against Glass Lewis', () => {
	//arrays to store GL recommendations and vote decisons
	let GLvals = [];
	let Selected = [];

	meetingDetailsPage.voteCardRow().then(($rows) => {
		$rows.each((index, value) => {
			const rec = Cypress.$(value).find(`td:nth-child(4)`).text();
			if (rec.includes('Non Voting') || rec.includes('N/A')) {
				//skip
			} else {
				GLvals.push(rec);
				var selected = Cypress.$(value).find(':selected').text();
				Selected.push(selected);
			}
		});
		var diff = arraysEqual(GLvals, Selected);
		expect(diff).to.be.false;
	});
});

Then('the filtered results should display the data only for vote against Management', () => {
	//arrays to store Management recommendations and vote decisons
	let Mgmtvals = [];
	let Selected = [];

	meetingDetailsPage.voteCardRow().then(($rows) => {
		$rows.each((index, value) => {
			const rec = Cypress.$(value).find(`td:nth-child(3)`).text();
			if (rec.includes('Non Voting') || rec.includes('N/A')) {
				//skip
			} else {
				Mgmtvals.push(rec);
				var selected = Cypress.$(value).find(':selected').text();
				Selected.push(selected);
			}
		});

		if (Mgmtvals == null || Selected == null) {
			cy.log('nulls');
		} else {
			cy.log(Mgmtvals);
			cy.log(Selected);
			var diff = arraysEqual(Mgmtvals, Selected);
			expect(diff).to.be.false;
		}
	});
});

Then('I provide the details like the username to share with and submitted', () => {
	//Step 6 - Select 'Calpers External Admin' from Users list
	meetingDetailsPage.shareMeetingUsernameInput().type('Calpers', { delay: 50 });
	cy.wait('@IDENTITY_SEARCH');
	meetingDetailsPage.shareMeetingUsernameResults().eq(0).should('be.visible').click({ force: true });
	//Step 8 - Click Add button
	meetingDetailsPage.shareMeetingAddButton().click();
	//Step 9 - Add Comment "This is a test comment"
	meetingDetailsPage.shareMeetingCommentInput().type('This is a test comment');
	//Step 10 - Click Share button
	meetingDetailsPage.shareMeetingConfirmButton().click();
});

Then('I verify that the request to share meeting was saved in the database', () => {
	cy.getAutomationUserIDFromDB(constants.USER.CALPERS).as('userid');
	//Step 11 - Connect to Aqua GLP Database and verify new row has been added to PX_ShareMeeting table
	cy.executeQuery('SELECT TOP 1 * FROM PX_ShareMeeting ORDER BY ShareMeetingID DESC').then((result) => {
		//Step 12 - Verify PX_ShareMeeting table Column data for correct data
		cy.get('@userid').then((uidResult) => {
			expect(result[0].SharerID).to.equal(uidResult[0].UserID); //verify Auatomation QaUat User id
		});
		cy.compare2Dates(result[0].CreationDate, dateUtils.getCurrentTime()); //Verify Created date
		expect(result[0].Comments).to.equal('This is a test comment'); //verify Comment
	});
});

Then('the vote tally should be updated', () => {
	cy.contains('Instructed successfully');
	// Step 11 - Verify Vote Tally gets updated
	cy.get('@totalNotVoted').then((vote) => {
		cy.contains('Review Required');
		meetingDetailsPage.totalNotVotedLink().should('have.text', vote);
		meetingDetailsPage.totalVotedLink().should('have.text', 0);
	});
});

Then('the activity should match against the ballot activity log', () => {
	// Step 12 - Verify the activity section and match the activity against the Ballot activity log by clicking on the control number hyperlink
	let arrMeetingActivity = [];
	let arrMeetingUser = [];
	let arrMeetingDate = [];
	let arrMeetingFinal = [];

	// tr:nth-child(n+2) => this block of code is to ignore the first line, which is "First Ballot Received"
	meetingDetailsPage.ballotRowTwo().then(($rows) => {
		$rows.each((index, value) => {
			const action = Cypress.$(value).find(`td:nth-child(1)`).text();
			// The string, for the same status, is different in each list. So I'm manually altering to "Instructed"
			if (action.includes('Edited(Fully)')) {
				arrMeetingActivity.push('Instructed');
			} else {
				arrMeetingActivity.push(action);
			}

			const user = Cypress.$(value).find(`td:nth-child(2)`).text();
			// substring is to remove the text "Ballot(s) intructed by" from the string. Replace All is to remove the single quotes
			const newUser = user.substring(user.indexOf("'")).replaceAll("'", '');
			arrMeetingUser.push(newUser);

			const date = Cypress.$(value).find(`td:nth-child(3)`).text();
			arrMeetingDate.push(date);

			// Concat all the arrays into a single one
			arrMeetingFinal = arrMeetingActivity.concat(arrMeetingUser, arrMeetingDate);
			cy.wrap(arrMeetingFinal).as('objMeetingFinal');
		});
	});

	meetingDetailsPage.ballotGridControlNumberLink().eq(0).scrollIntoView().click({ force: true });
	cy.wait('@BALLOT_ACTIVITY_LOG');
	meetingDetailsPage.ballotActivityModal().should('be.visible');

	let arrBallotActivity = [];
	let arrBallotUser = [];
	let arrBallotDate = [];
	let arrBallotFinal = [];

	// tr:not(:last-child) => this block of code is to ignore the last line, which is "Created"
	meetingDetailsPage.ballotRowSecondLast().then(($rows) => {
		$rows.each((index, value) => {
			const action = Cypress.$(value).find(`td:nth-child(1)`).text();
			if (action.includes('Edited(Fully)')) {
				arrBallotActivity.push('Instructed');
			} else {
				arrBallotActivity.push(action);
			}

			const user = Cypress.$(value).find(`td:nth-child(2)`).text();
			const newUser = user.substring(user.indexOf("'")).replaceAll("'", '');
			arrBallotUser.push(newUser);

			const date = Cypress.$(value).find(`td:nth-child(3)`).text();
			arrBallotDate.push(date);

			/* The Ballot activity log popup displays the list ordered by desc, whereas the activity table displays ordered by asc.
            The block below is triggered when the array has found the last position. It then reverses the list so its
            'ordered' by asc, which can be use used to compare with the activity list
            */
			if (index == $rows.length - 1) {
				arrBallotActivity.reverse();
				arrBallotUser.reverse();
				arrBallotDate.reverse();
			}

			arrBallotFinal = arrBallotActivity.concat(arrBallotUser, arrBallotDate);
			cy.wrap(arrBallotFinal).as('objBallotFinal');
		});
	});

	// Access both lists and then compare one with the other. The resul must be "true"
	cy.get('@objBallotFinal').then((ballotFinal) => {
		cy.get('@objMeetingFinal').then((meetingFinal) => {
			var isArrEqual = JSON.stringify(ballotFinal) == JSON.stringify(meetingFinal);
			expect(isArrEqual).to.be.true;
		});
	});
});

Then('I am able to iterate through rationales, add text entry, save and verify toast message for each entry', () => {
	meetingDetailsPage.voteCardRow().each(($ele, $idx) => {
		cy.get(`#md-votecard-grid-results > tr:nth-child(${$idx + 1}) > td:nth-child(3)`);

		const voting = $ele.text();
		if (!voting.includes('Non Voting')) {
			cy.get(`tr:nth-child(${$idx + 1}) > td.cell-with-rationale > div > div > span`)
				.scrollIntoView()
				.click({ force: true });
			cy.get(
				`tr:nth-child(${$idx + 1}) > td.cell-with-rationale > div > div > div > div.editable-input > textarea`
			).clear({ force: true });
			cy.get(
				`tr:nth-child(${$idx + 1}) > td.cell-with-rationale > div > div > div > div.editable-input > textarea`
			).type('test', { force: true });
			cy.get(
				`tr:nth-child(${
					$idx + 1
				}) > td.cell-with-rationale > div > div > div > div.editable-input > div.editable-buttons > button.js-editable-submit.secondary.blue.btn-update`
			).click({ force: true });
			meetingDetailsPage.toastMessage().should('contain.text', 'Rationale saved');
		}
		if ($idx > 4) {
			return false;
		}
	});
});

Then('I am able to add meeting note and post private comment', () => {
	//Test Meeting note entry
	meetingDetailsPage.meetingNoteSpan().should('be.visible').click({ force: true });
	meetingDetailsPage.meetingNoteInput().should('be.visible').clear({ force: true });
	meetingDetailsPage.meetingNoteInput().type('The quick brown fox jumps over a lazy dog - ~!@#$%^&*-_=+[]|,./<>? +');
	meetingDetailsPage.meetingNoteSubmitButton().click();
	meetingDetailsPage.toastMessage().should('contain.text', 'Meeting note saved');

	//Post Private Comment
	meetingDetailsPage.sharedWithDropdown().each(($el, index) => {
		cy.wrap($el);
		$el.get(`.k-button > :nth-child(${index}) > span`);
		meetingDetailsPage.deleteButton().click({ force: true });
	});
	meetingDetailsPage.commentTextArea().type('hello CalPERS | ExtAdmin Sagar Maheshwari');
	meetingDetailsPage.shareVisibilityDropdown().select('Private');
	meetingDetailsPage.postCommentButton().click();
	meetingDetailsPage.toastMessage().should('contain.text', 'Comment saved');
});

Then('I can see the Ballot section under the comments section', () => {
	// Step 5 - Verify User can see Ballot Section under the Comments section
	meetingDetailsPage.ballotSectionDiv().should('be.visible');
	meetingDetailsPage.ballotsColumnsDropdown().click();
	meetingDetailsPage.ballotsColumnsModal().invoke('attr', 'style', 'display: block');
	// Step 6 - Displays the modal with the list of fields , Apply & Cancel buttons
	meetingDetailsPage.ballotApplyButton().eq(1).should('be.visible');
	meetingDetailsPage.ballotCancelButton().eq(1).should('be.visible');
});

Then('I can verify that the default field "Control Number" is not available in the "Columns" modal', () => {
	// Step 7 - Verify that the Default Field 'Control Number' is not available in the 'Columns' modal
	meetingDetailsPage
		.ballotSectionData()
		.find('#mytable > ul > li')
		.each(($column) => {
			expect($column.text().trim()).to.not.equal('Control Number');
		});
});

Then(
	'I can verify that the user gets the appropriate results for "Custodian" in the responsive search of the "Columns" Modal',
	() => {
		// Step 8 - Verify that the user enter a character (e.g.: 'Custodian') in the responsive search of the "Columns" Modal
		meetingDetailsPage.ballotSectionCompanyNameInput().last().type('Custodian');

		meetingDetailsPage
			.ballotSectionData()
			.find('#mytable > ul > li')
			.each(($column) => {
				expect($column.text().trim()).to.have.string('Custodian');
			});

		meetingDetailsPage.ballotCancelButton().eq(1).click();
	}
);

Then('I can verify that the ballot section displays just the results based on the policy filtered', () => {
	// Check which position the column "Policy ID" is and wrapped into the object index
	meetingDetailsPage
		.ballotTableHeadings()
		.should('be.visible')
		.each(($headers, index) => {
			if ($headers.text().trim() == 'Policy ID') {
				cy.wrap(index).as('index');
				// Check that the "Policy ID" column will display the expected value
				cy.get('@index').then((pos) => {
					cy.get(`#md-ballots-grid-results > tr > td:nth-child(${pos + 1})`).each(($ballot) => {
						expect(workflowPage.workflowFilterData.policy).to.eq($ballot.text().trim());
					});
				});
				// Ends the loop when the column is found
				return false;
			}
		});
});

Then('I save the meeting url', () => {
	cy.url().then((url) => {
		meetingId = url;
	});
});

Then('I clear the list of watchlists', () => {
	//save meeting url
	cy.url().then((url) => {
		meetingId = url;
	});
	meetingDetailsPage
		.getLoadingSpinner()
		.should('not.exist')
		.then(() => {
			meetingDetailsPage.watchListsDropdown().click({ force: true });
			meetingDetailsPage.getLoadingSpinner().should('not.exist');
			meetingDetailsPage.systemWatchListsDiv().each((el) => {
				cy.wrap(el).find(':checkbox').uncheck({ force: true });
			});
			meetingDetailsPage
				.systemWatchListCheckBox()
				.eq(0)
				.invoke('attr', 'id')
				.then((id) => {
					Cypress.env('sytemWatchListId', id);
				});
			meetingDetailsPage
				.systemWatchListCheckboxLabel()
				.eq(0)
				.then((watchListName) => {
					Cypress.env('systemWatchListApplied', watchListName.text());
				});
			meetingDetailsPage.systemWatchListCheckBox().eq(0).click({ force: true });
			meetingDetailsPage.systemWatchListUpdateButton().click({ force: true });
			meetingDetailsPage.watchListsDropdownLabelNumber().eq(1).should('have.text', '1');
		});
});

Then('I can verify that {string} is displayed in the {string} field in the ballot section', (value) => {
	meetingDetailsPage.containsText(value).should('be.visible');
});

Then('I remove all existing comments', () => {
	meetingDetailsPage
		.pageBody()
		.wait(2000)
		.then(($body) => {
			if ($body.find('a[id="comment-delete"]').length > 0) {
				const len = $body.find('a[id="comment-delete"]').length;
				for (let i = len; i > 0; i--) {
					cy.get('a[id="comment-delete"]')
						.eq(i - 1)
						.scrollIntoView()
						.click();
					meetingDetailsPage.popUpOkButton().click();
					meetingDetailsPage.toastMessage().should('contain.text', constants.messages.toast.COMMENT_DELETED);
					meetingDetailsPage.toastMessage().should('not.exist');
				}
			}
		});
});

Then('I delete the existing comment', () => {
	meetingDetailsPage.deleteCommentButton().click();
	meetingDetailsPage.popUpOkButton().click();
	cy.wait('@COMMENTS');
});

When('I set the privacy dropdown to {string}', (value) => {
	meetingDetailsPage.shareVisibilityDropdown().select(value);
});

Then('I amend the privacy dropdown to {string}', (value) => {
	meetingDetailsPage.editCommentShareDropdown().select(value);
});

Then('the search text for comments section should be disabled', () => {
	meetingDetailsPage.shareUserInput().should('be.disabled');
});

When('I attach a file to the comment', () => {
	meetingDetailsPage.attachFileButton().click();
	meetingDetailsPage.addAttachmentFileInput().selectFile('cypress/fixtures/testImage.jpg', { action: 'drag-drop' });
	meetingDetailsPage.addAttachmentUploadButton().should('be.enabled').click();
	meetingDetailsPage.containsText('testImage.jpg').should('be.visible');
});

Then('I add an attachment to the comment and rename the file with a string of {int} characters', (noOfCharacters) => {
	meetingDetailsPage.attachFileButton().click();
	meetingDetailsPage.addAttachmentFileInput().selectFile('cypress/fixtures/testImage.jpg', { action: 'drag-drop' });
	cy.randomString(noOfCharacters).then((data) => {
		meetingDetailsPage.addAttachmentFileInput().clear().type(data);
		meetingDetailsPage.addAttachmentUploadButton().should('be.enabled').click();
		const result = data.substring(1, 255);
		meetingDetailsPage.attachmentName().should('contain.text', result);
	});
});

Then('I add a comment and submit', () => {
	meetingDetailsPage.commentTextArea().type('hello CalPERS | ExtAdmin Sagar Maheshwari');
	meetingDetailsPage.postCommentButton().should('be.visible').should('be.enabled').click();
});

Then('I add a random comment {int} times', (times) => {
	for (let i = 1; i <= times; i++) {
		cy.randomString(times).then((data) => {
			meetingDetailsPage.commentTextArea().type(data);
			meetingDetailsPage.postCommentButton().should('be.visible').should('be.enabled').click();
		});
	}
});

When('I submit the comment', () => {
	meetingDetailsPage.postCommentButton().should('be.visible').should('be.enabled').click();
});

When('I edit the comment', () => {
	meetingDetailsPage.editCommentButton().should('be.visible').scrollIntoView().click();
});

Then('I amend the name of the attachment', () => {
	meetingDetailsPage.editAttachmentButton().should('be.visible').click();
	meetingDetailsPage.attachmentsDiv().within(() => {
		cy.get('input').clear().type('amendedImage.jpg');
	});
	meetingDetailsPage.meetingNoteSubmitButton().click();
});

Then('I amend the contents of the comment', () => {
	meetingDetailsPage.editCommentTextArea().clear().type('Comment Amended!!');
});

Then('I save the changes to the comment', () => {
	meetingDetailsPage.saveUpdateAttachmentButton().click();
});

When('I click on the View All button', () => {
	meetingDetailsPage.viewAllCommentsLink().click();
});

Then('I verify the cancel functionality when trying to delete a comment', () => {
	meetingDetailsPage.deleteCommentButton().click();
	meetingDetailsPage.popUpCancelButton().click();
	meetingDetailsPage.deleteCommentButton().should('be.visible');
});

Then('I delete the attachment from the comment', () => {
	meetingDetailsPage.commentsDiv().scrollIntoView();
	meetingDetailsPage.deleteAttachmentButton().click();
	meetingDetailsPage.popUpOkButton().click();
});

Then('I cannot see an existing comment on the meeting', () => {
	meetingDetailsPage.existingCommentDiv().should('not.exist');
});

Then('I add a comment by mentioning user {string}', (username) => {
	meetingDetailsPage
		.commentTextArea()
		.type('@' + username)
		.wait(1000)
		.type('{enter}');
});

Then('I should see {string} comments on the UI', (noOfComments) => {
	meetingDetailsPage.existingCommentDiv().should('have.length', Number(noOfComments));
});

Then('I amend the shared with field to {string}', (sharedWith) => {
	meetingDetailsPage.editShareUserInput().type('{backspace}{backspace}{backspace}');
	if (!sharedWith.includes('nothing')) {
		meetingDetailsPage.floatingContainer().then(($el) => $el.remove());
		meetingDetailsPage.editShareUserInput().type(sharedWith).wait(1000).type('{enter}');
	}
});

Then('I add the user {string} to shared with field', (sharedWith) => {
	meetingDetailsPage.editShareUserInput().type(sharedWith).wait(1000).type('{enter}');
});

Then(
	'I should be able to view the default placeholder, shared with dropdown and attachment button in comments section',
	() => {
		meetingDetailsPage
			.commentTextArea()
			.invoke('attr', 'placeholder')
			.should('eq', 'Post a comment, mention a @user...');
		meetingDetailsPage.shareVisibilityDropdown().should('contain.text', 'Shared With');
		meetingDetailsPage.sharedWithDropdown().should('contain.text', 'Everyone');
		meetingDetailsPage.attachFileButton().should('be.visible');
	}
);

When('I add a comment with {int} characters', (noOfCharacters) => {
	cy.randomString(noOfCharacters).then((data) => {
		meetingDetailsPage.commentTextArea().clear().type(data);
	});
});

Then('I can see the Set Partial Vote button', () => {
	meetingDetailsPage.setPartialVoteButton().should('be.visible');
	meetingDetailsPage.setPartialVoteButton().should('have.css', 'background-color', 'rgb(31, 151, 209)');
});

When('I click on the Set Partial Vote button', () => {
	meetingDetailsPage.setPartialVoteButton().click();
});

When('I click on the Partial Vote Applied button', () => {
	meetingDetailsPage.setPartialVoteButton().click();
});

Then('I can see the Partial Vote modal', () => {
	meetingDetailsPage.partialVoteModalDiv().should('be.visible');
	meetingDetailsPage.getLoadingSpinner().should('not.exist');
	meetingDetailsPage.applyPercentToAllButton().should('be.visible');
	meetingDetailsPage.toastMessage().should('not.exist');
});

Then('I can verify that the Apply percent buttons are enabled in the Partial Vote modal', () => {
	meetingDetailsPage.applyPercentToAllButton().should('be.enabled');
	meetingDetailsPage.applyPercentToUnappliedButton().should('be.enabled');
});

Then('I can verify that the radio buttons are displayed for NOMINAL & PERCENT fields', () => {
	meetingDetailsPage.nominalRadio().should('be.visible');
	meetingDetailsPage.percentRadio().should('be.visible');
	meetingDetailsPage.percentRadio().should('be.checked');
});

Then('I can verify that all partial vote percent on the page is {int}', (value) => {
	meetingDetailsPage.partialVotePercentAllInput().then(($rows) => {
		$rows.each((index) => {
			meetingDetailsPage
				.partialVotePercentAllInput()
				.eq(index)
				.invoke('attr', 'aria-valuenow')
				.should('eq', String(value));
		});
	});
});

Then('I can see zero values in the partial vote amount applied textbox', () => {
	meetingDetailsPage.partialVoteNominalInput().invoke('attr', 'aria-valuenow').should('eq', '0');
	meetingDetailsPage.partialVotePercentInput().invoke('attr', 'aria-valuenow').should('eq', '0');
});

Then('I can increase and decrease % by selecting the up and down arrows', () => {
	meetingDetailsPage.increaseValuePercentButton().click();
	meetingDetailsPage.partialVotePercentInput().invoke('attr', 'aria-valuenow').should('eq', '1');
	meetingDetailsPage.decreaseValuePercentButton().click();
	meetingDetailsPage.partialVotePercentInput().invoke('attr', 'aria-valuenow').should('eq', '0');
});

When('I set the partial vote for the first row to {int} percent', (value) => {
	meetingDetailsPage.increaseValuePercentButton().click();
	meetingDetailsPage.partialVotePercentInput().clear().type(value);
	meetingDetailsPage.partialVoteNominalInput().click({ force: true });
	meetingDetailsPage
		.partialVoteNominalInput()
		.invoke('attr', 'aria-valuenow')
		.then((value) => {
			Cypress.env('partialVoteNominalAmount', value);
		});
});

Then('I set the partial vote for the first row to {int} shares', (value) => {
	meetingDetailsPage.increaseValueNominalButton().click();
	meetingDetailsPage.partialVoteNominalInput().clear().type(value);
	meetingDetailsPage.partialVotePercentInput().click({ force: true });
	meetingDetailsPage
		.partialVoteNominalInput()
		.invoke('attr', 'aria-valuenow')
		.then((value) => {
			Cypress.env('partialVoteNominalAmount', value);
		});
});

Then('I save the partial vote changes', () => {
	meetingDetailsPage.savePartialVoteButton().click();
});

Then('I close the partial vote modal', () => {
	meetingDetailsPage.closePartialVoteModalButton().click();
});

Then('I can see the Partial Vote Applied button', () => {
	meetingDetailsPage.setPartialVoteButton().should('be.visible');
	meetingDetailsPage.setPartialVoteButton().should('have.css', 'background-color', 'rgb(128, 0, 0)');
});

Then('I can see the Clear Partial Vote link', () => {
	meetingDetailsPage.clearPartialVoteButton().should('be.visible');
	meetingDetailsPage.setPartialVoteButton().next().should('contain.text', 'Clear partial vote');
});

When('I click on the Clear Partial Vote link', () => {
	meetingDetailsPage.clearPartialVoteButton().click({ scrollBehavior: false });
	Cypress.env('partialVoteNominalAmount', 'null');
});

Then('I click on the Clear Partial Vote link if it exists', () => {
	cy.clickIfExist(meetingDetailsPage.clearPartialVoteButtonLocator);
	meetingDetailsPage.toastMessage().should('not.exist');
});

When('I select the nominal radio button', () => {
	meetingDetailsPage.nominalRadio().check().should('be.checked');
});

When('I can verify that the apply percent at customer level is {int}', (value) => {
	meetingDetailsPage.applyPercentInput().should('contain.value', value);
});

When('I click on the apply percent to all button', () => {
	meetingDetailsPage.applyPercentToAllButton().click();
});

When('I apply a {int} percent filter to {string} accounts', (value, typeOfFilter) => {
	meetingDetailsPage.applyPercentInput().clear().type(value);
	typeOfFilter.includes('unapplied')
		? meetingDetailsPage.applyPercentToUnappliedButton().click()
		: meetingDetailsPage.applyPercentToAllButton().click();
});

Then('I should be able to verify the Take No Action functionality for a partially voted meeting', () => {
	meetingDetailsPage.takeNoActionButton().click();
	meetingDetailsPage.containsText('You currently have partial share amounts selected, however').should('be.visible');
	meetingDetailsPage.popUpCancelButton().click();
	meetingDetailsPage.takeNoActionButton().click();
	meetingDetailsPage.popUpOkButton().click();
	meetingDetailsPage.getLoadingSpinner().should('not.exist');
	meetingDetailsPage.pageBody().then((body) => {
		//Verify element exists
		if (body.find(meetingDetailsPage.warningPopUpLocator).is(':visible')) {
			meetingDetailsPage.warningPopUp().within(() => {
				meetingDetailsPage.genericCheckbox().should('not.be.visible').check({ force: true });
			});
			meetingDetailsPage.proceedButton().click();
		}
	});
	toastContains('success');
});

Then('I can verify that I cannot enter alphanumeric values in percentage and nominal textboxes', () => {
	let alpNumStr = 'a1b0c',
		numStr = '10';
	meetingDetailsPage.increaseValuePercentButton().click();
	meetingDetailsPage.partialVotePercentInput().clear().type(alpNumStr);
	meetingDetailsPage.partialVoteNominalInput().click({ force: true });
	meetingDetailsPage.partialVotePercentInput().invoke('attr', 'aria-valuenow').should('eq', numStr);
	meetingDetailsPage.nominalRadio().check();
	meetingDetailsPage.increaseValueNominalButton().click();
	meetingDetailsPage.partialVoteNominalInput().clear().type(alpNumStr);
	meetingDetailsPage.partialVotePercentInput().click({ force: true });
	meetingDetailsPage.partialVoteNominalInput().invoke('attr', 'aria-valuenow').should('eq', numStr);
});

Then('I enter a value equal to the number of shares', () => {
	meetingDetailsPage.noOfSharesLabel().then((noOfShares) => {
		meetingDetailsPage.increaseValueNominalButton().click();
		meetingDetailsPage.partialVoteNominalInput().clear().type(noOfShares.text());
		meetingDetailsPage.partialVotePercentInput().click({ force: true });
	});
});

Then('I enter a value greater than number of shares', () => {
	meetingDetailsPage.noOfSharesLabel().then((noOfShares) => {
		meetingDetailsPage.increaseValueNominalButton().click();
		meetingDetailsPage
			.partialVoteNominalInput()
			.clear()
			.type(noOfShares.text() + 1);
		meetingDetailsPage.partialVotePercentInput().click({ force: true });
	});
});

Then('I enter a percent greater than number of shares', () => {
	meetingDetailsPage.increaseValuePercentButton().click();
	meetingDetailsPage.partialVotePercentInput().clear().type('101');
	meetingDetailsPage.partialVoteNominalInput().click({ force: true });
});

Then('the partial vote amount is automatically corrected to total number of shares', () => {
	meetingDetailsPage.noOfSharesLabel().then((noOfShares) => {
		meetingDetailsPage.partialVoteNominalInput().invoke('attr', 'aria-valuenow').should('eq', noOfShares.text());
	});
});

Then('the partial vote percent is automatically corrected to 100%', () => {
	meetingDetailsPage.partialVotePercentInput().invoke('attr', 'aria-valuenow').should('eq', '100');
});

Then('I can verify that the set partial vote modal is read only for past meetings', () => {
	cy.SetMeetingDateXdaysFromToday(Cypress.env('meetingId'), -10);
	cy.visit('MeetingDetails/Index/' + Cypress.env('meetingId'));
	meetingDetailsPage.setPartialVoteButton().should('be.visible').click();
	meetingDetailsPage.partialVoteNominalInput().should('be.disabled');
	meetingDetailsPage.partialVotePercentInput().should('be.disabled');
	meetingDetailsPage.closePartialVoteModalButton().click();
	meetingDetailsPage.setPartialVoteButton().should('be.visible');
});

Then('I verify all the meeting sections have loaded', () => {
	meetingDetailsPage.infoSectionTitle().should('be.visible').and('have.text', 'Info');
	meetingDetailsPage.voteTallyTable().should('be.visible');
	meetingDetailsPage.commentSection().should('be.visible');
	meetingDetailsPage.ballotSectionDiv().should('be.visible');
	meetingDetailsPage.meetingMaterialsSection().should('be.visible');
	meetingDetailsPage.activitySection().should('be.visible');
	meetingDetailsPage.voteResultSection().should('be.visible');
});

/*Functions*/
//compare arrays
function arraysEqual(a1, a2) {
	return JSON.stringify(a1) == JSON.stringify(a2);
}

//verify toast message contents
function toastContains(msg) {
	meetingDetailsPage.toastMessageDiv().should('be.visible');
	meetingDetailsPage.toastMessageDiv().should('contain.text', msg);
	meetingDetailsPage.getLoadingSpinner().should('not.exist');
}
