import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import dayjs from 'dayjs';
import reportingPage from '../page_objects/reporting.page';
const constants = require('../constants');
const unixTime = Math.floor(Date.now() / 1000);
let reportConfigName,
	fileExtension = 'xlsx';
const columns_BVDandPVreports = [
	'Proposal Summary',
	'Mgmt Proposals Voted FOR',
	'Mgmt Proposals Voted Against/Withhold',
	'Mgmt Proposals Voted Abstain',
	'Mgmt Proposals With No Votes Cast',
	'Mgmt Proposals Voted 1 Year',
	'Mgmt Proposals Voted 2 Years',
	'Mgmt Proposals Voted 3 Years',
	'ShrHldr Proposal Voted FOR',
	'ShrHldr Proposals Voted Against/Withhold',
	'ShrHldr Proposals Voted Abstain',
	'ShrHldr Proposals With No Votes Cast',
];
const columns_MeetingSummaryReport = [
	'Meeting Summary',
	'Report Date Range',
	'Report Parameters',
	'Market',
	'Issuer Name',
	'Meeting Type',
	'Voted Shares',
	'# of Props',
	'1 yr',
	'3 yr',
	'For',
	'No Action',
	'Unvoted',
	'Grand Totals',
];
const columns_PolicyReport = [
	'Policy Name',
	'Policy Tag',
	'Customer Name',
	'Issue Code',
	'Issue Code Description',
	'General Approach',
	'Rule Name',
	'Description',
	'Rule Parameter Value',
	'Display Prompt',
];
const columns_VotesPVreport = [
	'Proxy Voting Report',
	'Vote Against Management (VAM) Summary',
	'Votes Against Policy (VAP) Summary',
	'Number of Meetings',
	'Number of Meetings With VAM',
	'Number of Proposals With VAM',
	'Number of Meetings With Votes For Mgmt',
	'Number of Proposals With Votes For Mgmt',
	'Number of No Votes Cast',
];
const columns_PercentagesPVreport = [
	'Number of Proposals',
	'Number of Countries (Country of Trade)',
	'% of All Meetings Voted',
	'% of All Proposals Voted',
	'% of All Mgmt Proposals',
	'% of All ShrHldr Proposals',
];
const columns_ProxyVotingSummaryReport = [
	'Proxy Voting Summary',
	'Report Date Range',
	'Meeting Date',
	'Proposal',
	'Mgmt Rec',
	'ISIN',
	'Country',
	'Proponent',
];
const columns_VotingActivityReport = [
	'Meeting Statistics Report',
	'Ballot Statistics Report',
	'Proposal Statistics Report',
	'Proposal Category Report',
	'Proposal Type Report',
];
const columns_BallotStatusViaMDReport = [
	'Ballot Status Report',
	'Decision Status',
	'Vote Deadline Date',
	'Vote Cast',
	'Meeting Agenda',
];
const columns_BallotVoteDataMandatory = [
	'Company',
	'Meeting Date',
	'Proposal Label',
	'Agenda Key',
	'Country of Trade',
	'CUSIP',
	'Custom Policy',
	'Customer Account ID',
	'Meeting Type',
	'Mgmt',
	'Proponent',
	'Proposal Text',
	'Record Date',
	'Shares Listed',
	'Vote Decision',
	'Customer Account Name',
];
const columns_BallotVoteDataCurrentSelection = [
	'Company',
	'Meeting Date',
	'Proposal Label',
	'Agenda Key',
	'CINS',
	'Country of Trade',
	'CUSIP',
	'Custom Policy',
	'Customer Account ID',
	'For Or Against Mgmt',
	'GL Reco',
	'Ballot Blocking',
	'Ballot Status',
	'Control Number Key',
	'Issue Code',
	'Issue Code Category',
	'Meeting Note',
	'Meeting Type',
	'Mgmt',
	'Proponent',
	'Proposal Order By',
	'Proposal Text',
	'Rationale',
	'Record Date',
	'Shares Listed',
	'Vote Decision',
	'Customer Account Name',
];
const columns_BallotVoteDataAvailableSelection = [
	'Account Group',
	'Agenda ID',
	'Assignee',
	'Ballot Created Date',
	'Ballot Creation',
	'Ballot ID',
	'Ballot Voted Date',
	'Company ID',
	'Country of Origin',
	'Custodian Key',
	'Custodian Name',
	'Custodian Account Number',
	'Deadline Date',
	'Decision Status',
	'Director ID',
	'General Approach',
	'Industry',
	'ISIN',
	'Is Shareholder Proposal',
	'Issue Code Description',
	'Job Number',
	'Last Instructed By',
	'Last Instructed Date',
	'Last Voted By',
	'Meeting ID',
	'Ownership Date',
	'Ownership Percentage',
	'People ID',
	'Policy ID',
	'Policy Rec Change Date',
	'Proxy Contest',
	'Proxy ID',
	'Region',
	'Rejected Reason',
	'Reporting Group',
	'Republish Date',
	'Research Proposal ID',
	'Research Publish Date',
	'RFS',
	'Sector',
	'Shares Held',
	'Shares on Loan',
	'Target Publication Date',
	'Ticker',
	'Unique Proposal ID',
	'Vote Results Percentage',
	'Vote Results Share Breakdown',
	'Voted',
	'Watch Lists',
	'Winning Rule',
	'With or Against GlassLewis',
	'With or Against Policy',
	'Workflow Notes',
	'Voting Group',
];
const columns_VotingActivityCurrentSelection = [
	'Ballot Security ID',
	'Company Name',
	'Contested',
	'Country of Inc',
	'Deadline Date',
	'GL Recommendation',
	'Meeting Date',
	'Meeting Type',
	'MGMT Recommendation',
	'Policy Recommendation',
	'Proponent',
	'Proposal Description',
	'Proposal Number',
	'Rationale',
	'Record Date',
	'Region',
	'Security Country of Trade',
	'Security Type',
	'Share blocking',
	'Shares',
	'Shares Held',
	'Shares on Loan',
	'Vote Decision',
	'Vote Status',
];

When('I navigate to the Reporting page', () => {
	cy.visit('/Reporting');
	reportingPage.dateRangeDropdown().should('be.visible');
});

When('I choose the report type to be {string}', (reportType) => {
	reportingPage.containsText(reportType).click();
	reportingPage.getLoadingSpinner().should('not.exist');
	reportingPage.chosenReportLabel().should('contain.text', reportType);
});

Then('I filter the report type to {string}', (extension) => {
	reportingPage.reportId().should('be.visible');
	reportingPage.getLoadingSpinner().should('not.exist');
	reportingPage.reportId().children().find('select').select(extension.toUpperCase());
});

When('I expand the Configure Columns section', () => {
	reportingPage.configureColumnsDropdown().should('be.visible').click();
});

Then('I can verify that the {string} column should {string}', (columnName, visibility) => {
	if (visibility === 'be visible') {
		visibility = 'contain';
	} else {
		visibility = 'not.contain';
	}
	reportingPage.pageBody().should(visibility, columnName);
});

Then('I verify that all the relevant API calls for reporting page are made', () => {
	//6 API Calls Made
	cy.statusCode200('@CURRENT_USER');
	cy.statusCode200('@REPORTS_DEFAULT_DATA');
	cy.statusCode200('@BALLOT_RECONCILIATION');
	cy.statusCode200('@REPORTS_CRITERIA');
	cy.statusCode200('@DATE_RANGE_KNOCKOUT_BINDINGS');
	cy.statusCode200('@DATE_RANGE');
});

Then('I click on the notification toolbar', () => {
	reportingPage.notificationLink().click();
	reportingPage.getLoadingSpinner().should('exist');
	cy.wait('@INBOX');
	reportingPage.getLoadingSpinner().should('not.exist');
	reportingPage.inboxContainer().should('have.css', 'display', 'block');
});

Then('I set the meeting date to next date {int} and past date {int} days', (nextDays, pastDays) => {
	reportingPage.dateRangeModal().invoke('attr', 'style', 'display: block');
	reportingPage.dateRangeNextDaysInput().clear();
	reportingPage.dateRangeNextDaysHiddenInput().type(nextDays);
	reportingPage.dateRangePastDaysInput().clear();
	reportingPage.dateRangePastDaysHiddenInput().type(pastDays);
	reportingPage.containsText('Update').click();
});

Then('I set the date range to the next or last {int} days', (pastDays) => {
	reportingPage.meetingDateRange().invoke('attr', 'style', 'display: block');
	reportingPage.dateRangeDaysInput().invoke('attr', 'style', 'display: block').clear();
	reportingPage.dateRangeDaysInput().invoke('attr', 'style', 'display: block').type(pastDays);
	reportingPage.containsText('Update').click();
});

Then('I select the dates between {int} and {int} days from today', (start_date, end_date) => {
	let fromDate = dayjs().add(start_date, 'days').format('MM/DD/YYYY');
	let toDate = dayjs().add(end_date, 'days').format('MM/DD/YYYY');
	reportingPage.meetingDateRange().invoke('attr', 'style', 'display: block').wait(500);
	reportingPage.dateCriteriaBetweenRadio().check().should('be.checked');
	reportingPage.dateCriteriaStartDate().clear().type(fromDate);
	reportingPage.dateCriteriaEndDate().clear().type(toDate);
	reportingPage.containsText('Update').click();
});

Then('I select {string} column', (column) => {
	reportingPage.configureColumnsDropdown().click();
	reportingPage.columnCheckbox(column).click({ force: true });
	reportingPage.applyButton().click({ force: true });
	reportingPage.currentSelectionColumnsDiv().should('contain.text', column);
});

Then('I {string} the report for {string}', (action, reportName) => {
	//Generate Report Name by fetching name from step definition. Eg: BallotReconciliationReport_1669283634
	reportConfigName = `${reportName.replaceAll(' ', '')}Report_${unixTime}`;

	if (action == 'save') {
		cy.saveFilter(reportConfigName);
		reportingPage.containsText('My configurations').siblings().find('span').should('contain', reportConfigName);
	} else if (action == 'delete') {
		cy.deleteMyConfiguration(reportConfigName);
	} else if (action.includes('verify ready')) {
		reportingPage.inboxContainerDiv().should('be.visible');
		reportingPage.inboxContainerMessages(15000).should(($msg) => {
			expect($msg.first().text()).to.not.include(`fail`);
		});
		reportingPage.inboxContainerMessages(180000).should(($msg) => {
			expect($msg.first().text()).to.include(`${reportConfigName}`);
			expect($msg.first().text()).to.include(`is ready for download`);
		});
		reportingPage.inboxContainerDate().should(($msg) => {
			expect($msg.first().text(), 'looks like the timestamp is not visible on the UI').to.include('seconds ago');
		});
	} else if (action.includes('verify export ready')) {
		reportingPage.inboxContainerDiv().should('be.visible');
		reportingPage.inboxContainerMessages(15000).should(($msg) => {
			expect($msg.first().text()).to.not.include(`fail`);
		});
		reportingPage.inboxContainerMessages(180000).should(($msg) => {
			expect($msg.first().text()).to.include(`export is ready to download`);
		});
		reportingPage.inboxContainerDate().should(($msg) => {
			expect($msg.first().text(), 'looks like the timestamp is not visible on the UI').to.include('seconds ago');
		});
	}
});

Then('I verify the report name and headers for Ballot Reconciliation Report', () => {
	reportingPage
		.inboxRows()
		.first()
		.invoke('attr', 'data-pagelink1')
		.should('contain', '/DownloadExportFromUrl/?requestID=')
		.then((downloadLink) => {
			cy.request(downloadLink).then((resp) => {
				expect(resp.status).to.eq(200);
				expect(resp.headers).to.have.property('content-disposition').contains(`filename=BallotReconciliationReport`);
				expect(resp.headers).to.have.property('content-type').eql('text/csv');
				expect(resp.body).include(
					'Customer Account Name,Customer Account Number,Custodian Name,Company Name,Meeting Date,Agenda Key,Country of Incorporation,Custodian Account Number,Customer Name,Deadline Date,Most Recent Note'
				);
			});
		});
});

Then('I verify the report name and a few columns for Ballot Status Report', () => {
	reportingPage
		.inboxRows()
		.first()
		.invoke('attr', 'data-pagelink1')
		.should('contain', '/DownloadExportFromUrl/?requestID=')
		.then((downloadLink) => {
			cy.request(downloadLink).then((resp) => {
				expect(resp.status).to.eq(200);
				expect(resp.headers).to.have.property('content-disposition').contains(`filename=BallotStatusReport`);
				expect(resp.headers)
					.to.have.property('content-type')
					.eql('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
			});
		});
	cy.parseXlsx(`cypress/downloads/BallotStatusReport_${unixTime}.xlsx`).then((xlxsData) => {
		columns_BVDandPVreports.forEach((fields) => {
			expect(JSON.stringify(xlxsData)).to.include(fields);
		});
	});
});

Then('I verify the report name and headers for Ballot Vote Data Report', () => {
	reportingPage
		.inboxRows()
		.first()
		.invoke('attr', 'data-pagelink1')
		.should('contain', '/DownloadExportFromUrl/?requestID=')
		.then((downloadLink) => {
			cy.request(downloadLink).then((resp) => {
				expect(resp.status).to.eq(200);
				expect(resp.headers)
					.to.have.property('content-disposition')
					.contains(`filename=BallotVoteDataReport_${unixTime}.csv`);
				expect(resp.headers).to.have.property('content-type').eql('text/csv');
				expect(resp.body).include(
					'Customer Account Name,Customer Account ID,Company,CUSIP,CINS,Country of Trade,Meeting Type,Meeting Date,Record Date,Proposal Order By,Proposal Label,Proposal Text,Proponent,Mgmt,GL Reco,Custom Policy,Vote Decision,For Or Against Mgmt,Rationale,Meeting Note,Ballot Voted Date,Issue Code,Issue Code Category,Shares Listed,Control Number Key,Ballot Status,Ballot Blocking,Agenda Key'
				);
			});
		});
});

Then('I verify the report name and headers for Engagement Report', () => {
	reportingPage
		.inboxRows()
		.first()
		.invoke('attr', 'data-pagelink1')
		.should('contain', '/DownloadExportFromUrl/?requestID=')
		.then((downloadLink) => {
			cy.request(downloadLink).then((resp) => {
				expect(resp.status).to.eq(200);
				expect(resp.headers).to.have.property('content-disposition').contains('filename=EngagementReport');
				expect(resp.headers).to.have.property('content-type').eql('text/csv');
				expect(resp.body).to.have.length.greaterThan(1);
				expect(resp.body).include(
					'Company Name,Created Date,Date of Engagement,Other Participants,Themes,Type,Notes,Participant Name,Role,Title'
				);
			});
		});
});

Then('I verify the report name and a few columns for Meeting Summary Report', () => {
	reportingPage
		.inboxRows()
		.first()
		.invoke('attr', 'data-pagelink1')
		.should('contain', '/DownloadExportFromUrl/?requestID=')
		.then((downloadLink) => {
			cy.request(downloadLink).then((resp) => {
				expect(resp.status).to.eq(200);
				expect(resp.headers).to.have.property('content-disposition').contains(`filename=MeetingSummaryReport`);
				expect(resp.headers)
					.to.have.property('content-type')
					.eql('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
			});
		});
	cy.parseXlsx(`cypress/downloads/MeetingSummaryReport_${unixTime}.xlsx`).then((xlxsData) => {
		columns_MeetingSummaryReport.forEach((fields) => {
			expect(JSON.stringify(xlxsData)).to.include(fields);
		});
	});
});

Then('I verify the report name and a few columns for Policy Report', () => {
	reportingPage
		.inboxRows()
		.first()
		.invoke('attr', 'data-pagelink1')
		.should('contain', '/DownloadExportFromUrl/?requestID=')
		.then((downloadLink) => {
			cy.request(downloadLink).then((resp) => {
				expect(resp.status).to.eq(200);
				expect(resp.headers).to.have.property('content-disposition').contains(`filename=PolicyReport`);
				expect(resp.headers)
					.to.have.property('content-type')
					.eql('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
			});
		});
	cy.parseXlsx(`cypress/downloads/PolicyReport_${unixTime}.xlsx`).then((xlxsData) => {
		columns_PolicyReport.forEach((fields) => {
			expect(JSON.stringify(xlxsData)).to.include(fields);
		});
	});
});

Then('I verify the report name and a few columns for Proxy Voting Report', () => {
	reportingPage
		.inboxRows()
		.first()
		.invoke('attr', 'data-pagelink1')
		.should('contain', '/DownloadExportFromUrl/?requestID=')
		.then((downloadLink) => {
			cy.request(downloadLink).then((resp) => {
				expect(resp.status).to.eq(200);
				expect(resp.headers).to.have.property('content-disposition').contains(`filename=ProxyVotingReport`);
				expect(resp.headers)
					.to.have.property('content-type')
					.eql('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
			});
		});
	cy.parseXlsx(`cypress/downloads/ProxyVotingReport_${unixTime}.xlsx`).then((xlxsData) => {
		columns_VotesPVreport.forEach((fields) => {
			expect(JSON.stringify(xlxsData)).to.include(fields);
		});
		columns_BVDandPVreports.forEach((fields) => {
			expect(JSON.stringify(xlxsData)).to.include(fields);
		});
		columns_PercentagesPVreport.forEach((fields) => {
			expect(JSON.stringify(xlxsData)).to.include(fields);
		});
	});
});

Then('I verify the report name and a few columns for Proxy Voting Summary Report', () => {
	reportingPage
		.inboxRows()
		.first()
		.invoke('attr', 'data-pagelink1')
		.should('contain', '/DownloadExportFromUrl/?requestID=')
		.then((downloadLink) => {
			cy.request(downloadLink).then((resp) => {
				expect(resp.status).to.eq(200);
				expect(resp.headers).to.have.property('content-disposition').contains(`filename=ProxyVotingSummaryReport`);
				expect(resp.headers)
					.to.have.property('content-type')
					.eql('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
			});
		});
	cy.parseXlsx(`cypress/downloads/ProxyVotingSummaryReport_${unixTime}.xlsx`).then((xlxsData) => {
		columns_ProxyVotingSummaryReport.forEach((fields) => {
			expect(JSON.stringify(xlxsData)).to.include(fields);
		});
	});
});

Then('I verify the report name and headers for Vote Results Report', () => {
	reportingPage
		.inboxRows()
		.first()
		.invoke('attr', 'data-pagelink1')
		.should('contain', '/DownloadExportFromUrl/?requestID=')
		.then((downloadLink) => {
			cy.request(downloadLink).then((resp) => {
				expect(resp.status).to.eq(200);
				expect(resp.headers).to.have.property('content-disposition').contains(`filename=VoteResultsReport`);
				expect(resp.headers).to.have.property('content-type').eql('text/csv');
				expect(resp.body).include(
					'Company,JobNum,MeetingDate,MeetingType,CustomerAccountID,SharesListed,IssueCode,ProposalLabel,ProposalText,Mgmt,CusPolicy,VoteDecision,VotesForPercentage,VotesAgainstPercentage,VotesAbstainPercentage,VotesWithheldPercentage,Votes1YearPercentage,Votes2YearsPercentage,Votes3YearsPercentage'
				);
			});
		});
});

Then('I verify the report name and a few columns for Voting Activity Report', () => {
	reportingPage
		.inboxRows()
		.first()
		.invoke('attr', 'data-pagelink1')
		.should('contain', '/DownloadExportFromUrl/?requestID=')
		.then((downloadLink) => {
			cy.request(downloadLink).then((resp) => {
				expect(resp.status).to.eq(200);
				expect(resp.headers).to.have.property('content-disposition').contains(`filename=VotingActivityReport`);
				expect(resp.headers)
					.to.have.property('content-type')
					.eql('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
			});
		});
	cy.parseXlsx(`cypress/downloads/VotingActivityReport_${unixTime}.xlsx`).then((xlxsData) => {
		columns_VotingActivityReport.forEach((fields) => {
			expect(JSON.stringify(xlxsData)).to.include(fields);
		});
	});
});

Then('I verify the contents on the Voting Activity PDF Report', () => {
	cy.readFile(`cypress/downloads/${reportConfigName}.pdf`, 'utf8');
	columns_VotingActivityReport.forEach((fields) => {
		cy.task('readPdf', `cypress/downloads/${reportConfigName}.pdf`).should('contain', fields);
	});
});

Then('I verify the report name and headers for Workflow Export Report {string}', (extension) => {
	reportingPage
		.inboxRows()
		.first()
		.invoke('attr', 'data-pagelink1')
		.should('contain', '/Download')
		.then((downloadLink) => {
			cy.request(downloadLink).then((resp) => {
				expect(resp.status).to.eq(200);
				if (extension == 'csv') {
					expect(resp.headers).to.have.property('content-disposition').contains(`filename=Upcoming-Meetings.csv`);
					expect(resp.headers).to.have.property('content-type').eql('text/csv');
					expect(resp.body).include(
						'Company Name,Agenda Key,Policy ID,Control Number,Decision Status,Security Country of Trade,Deadline Date,Meeting Date,Record Date,Meeting Type,Shares,Ballot Blocking'
					);
				} else if (extension == 'html') {
					expect(resp.headers).to.have.property('content-type').contains('text/html');
					expect(resp.body).include('Company Name');
					expect(resp.body).include('Agenda Key');
					expect(resp.body).include('Decision Status');
					expect(resp.body).include('Deadline Date');
					expect(resp.body).include('Meeting Date');
					expect(resp.body).include('Meeting Type');
				}
			});
		});
});

Then('I verify the report name and a few columns for Ballot Status Report generated via Meeting Details page', () => {
	reportingPage
		.inboxRows()
		.first()
		.invoke('attr', 'data-pagelink1')
		.should('contain', '/DownloadExportFromUrl/?requestID=')
		.then((downloadLink) => {
			cy.request(downloadLink).then((resp) => {
				expect(resp.status).to.eq(200);
				expect(resp.headers).to.have.property('content-disposition').contains(`filename=BallotStatusReport`);
				expect(resp.headers).to.have.property('content-type').eql('application/vnd.ms-excel');
			});
		});
	cy.parseXlsx(`cypress/downloads/BallotStatusReport.xls`).then((xlxsData) => {
		columns_BallotStatusViaMDReport.forEach((fields) => {
			expect(JSON.stringify(xlxsData)).to.include(fields);
		});
	});
});

Then('I click on the Download button to download the report', () => {
	reportingPage.downloadButton().click();
});

Then('the download initiated toast message appears', () => {
	reportingPage.toastMessage().should('contain.text', constants.messages.toast.DOWNLOAD_STARTED);
});

Then('I Add Subscription', () => {
	reportingPage.subscriptionHeading().click();
	reportingPage.containsText('Add Subscription').click();
});

Then('I select Calpers External Admin from Users list on reporting page', () => {
	reportingPage.usersListDropdown().click().type('{downarrow}{downarrow}{downarrow}{enter}').blur();
});

Then('I enter Filename for Subscription Report', () => {
	reportingPage.subscriptionFilenameInput().type('SubscribeTest');
});

Then('I enter Schedule to run Subscription on reporting page', () => {
	// (Weekly/8AM/Sunday)
	reportingPage.scheduleDropdown().select('1');
	reportingPage.scheduleSunday().check({ force: true });
});

Then('I click on the Ok button', () => {
	reportingPage.okButton().click();
});

Then('Subscription added toast message appears', () => {
	reportingPage.toastMessage().should('contain.text', constants.messages.toast.SUBSCRIPTION_ADDED);
});

Then('Verify UI table entries for newly created Subscription', () => {
	reportingPage.subscriptionTableData().eq(1).should('include.text', 'CalpersAutomation External Admin');
	reportingPage.subscriptionTableData().eq(2).should('include.text', 'Weekly');
	reportingPage.subscriptionTableData().eq(3).should('include.text', 'Run at: ');
	reportingPage.subscriptionTableData().eq(4).should('include.text', 'SubscribeTest');
});

Then('I verify Column data for UserIds and Filename', () => {
	cy.getAutomationUserIDFromDB(constants.USER.CALPERS).as('userid');
	// Connect to Aqua Database and verify new row has been added
	cy.executeQuery('SELECT TOP 1 * FROM SB_Subscription ORDER BY SubscriptionID DESC').then((result) => {
		var cols = [];
		for (var j = 0; j < result.length; j++) {
			cols.push(result[j]);
		}
		// Verify Column data for UserIds and Filename
		assert.equal(cols[2], 1); // Verify Active
		cy.get('@userid').then(function (uid) {
			assert.equal(cols[3], uid); // SubscriberID
		});
		assert.equal(cols[7], 0); // Deliver to Everyone = false
		assert.equal(cols[12], 'SubscribeTest'); // Filename
		cy.get('@userid').then(function (uid) {
			assert.equal(cols[13], uid); // Created by
		});
		assert.equal(cols[17], 196); // Customer ID
		expect(cols).to.have.length(19); // Total Fields
	});
});

Then('I remove Subscription entry from Viewpoint on reporting page', () => {
	reportingPage.deleteSubscriptionLink().first().click({ force: true });
	reportingPage.saveButton().click();
});

Then('I click on the Update button', () => {
	reportingPage.containsText('Update').click({ force: true });
});

Then('I add all the columns', () => {
	reportingPage.configureColumnsDropdown().click({ force: true });
	reportingPage.includeAllButton().click({ force: true });
	reportingPage.selectedColumns().each((tr) => {
		cy.wrap(tr).find('input[type="checkbox"]').should('be.checked');
	});
});

Then('I add the first 4 column option into the header list', () => {
	reportingPage.configureColumnsDropdown().click();
	reportingPage.availableColumns().each((el, index) => {
		cy.wrap(el).find(':checkbox').check({ force: true });
		// Only select first 4 items
		if (index > 3) {
			return false;
		}
	});
});

Then('I click on the Apply button', () => {
	reportingPage.applyButton().click();
});

Then('I set the first available Policy ID as the filter for Policy report', () => {
	reportingPage.policyIdEditorModal().invoke('attr', 'style', 'display: block');
	reportingPage.policyIdRadio().eq(0).check();
	reportingPage.policyIdUpdate().click();
});

Then('I select the past {int} days', (pastDays) => {
	// The reason I have two actions for the same input is because for some reason it takes roughly 5 seconds to type the past days, whereas with two actions is straight away
	// step 5 - Select past days
	reportingPage.meetingDateModal().invoke('attr', 'style', 'display: block');
	reportingPage.dateRangeDaysInput().invoke('attr', 'style', 'display: block').clear();
	reportingPage.dateRangeDaysInput().invoke('attr', 'style', 'display: block').type(pastDays);
	reportingPage.containsText('Update').click();
	reportingPage.meetingDateDropdown().contains(`Past ${pastDays} Days`);
});

Then('I expand Vote Comparison and select GL Recs Against Mgmt', () => {
	reportingPage.voteComparisonModal().invoke('attr', 'style', 'display: block');
	reportingPage
		.voteComparisonCheckboxes()
		.contains('GL Recs Against Mgmt')
		.siblings()
		.check({ force: true })
		.should('be.checked');
	reportingPage.voteComparisonUpdateButton().click();
	reportingPage.containsText('All meeting agenda items (1)').should('be.visible');
});

When('I select Decision Status Criteria', () => {
	cy.AddMultipleCriteria(['Decision Status'], true);
});

When('I select Voted criteria', () => {
	cy.addCriteriaStatus(['Voted'], true);
	reportingPage.containsText(`${['Decision Status'].toString()} (1)`);
});

Then('I add columns to the report', () => {
	reportingPage.reportColumns().then((columns) => {
		cy.wrap(columns).find('h3').invoke('attr', 'class', 'toggle');
		cy.wrap(columns).find('div').invoke('attr', 'style', 'display: block');

		reportingPage.ballotStatsCheckbox().should('be.checked');
		reportingPage.meetingStatsCheckbox().should('be.checked');
		reportingPage.proposalCatCheckbox().should('be.checked');
		reportingPage.proposalStatsCheckbox().should('be.checked');
		reportingPage.proposalTextCheckbox().should('be.checked');

		// I'm using if statements to check the file extension so the test case can be "generic" enough to be re-used with scenarios in the future
		if (fileExtension == 'pdf') {
			reportingPage.proposalReasonCheckbox().should('not.be.checked');
			reportingPage.proposalRawDataCheckbox().should('not.be.checked');
		} else {
			reportingPage.proposalReasonCheckbox().should('be.checked').uncheck({ force: true });
			reportingPage.proposalRawDataCheckbox().should('be.checked').uncheck({ force: true });
			reportingPage.saveButton().click();
		}
	});
});

Then('I set the Footer under the Grouping & Presentation', () => {
	reportingPage.reportPresentation().then((presentation) => {
		cy.wrap(presentation).find('h3').invoke('attr', 'class', 'toggle');
		cy.wrap(presentation).find('div').invoke('attr', 'style', 'display: block');

		reportingPage.reportPresentationInputFooter().should('have.attr', 'disabled');
		reportingPage.reportPresentationFooter().then((footer) => {
			cy.wrap(footer).should('not.be.checked');
			cy.wrap(footer).parent().invoke('attr', 'style', 'display: block');
			cy.wrap(footer).check({ force: true });
		});
		reportingPage.containsText('The presentation footer must be completed or unselected.');
	});
});

Then('I set the Header under the Grouping & Presentation', () => {
	reportingPage.reportPresentationInputHeader().should('have.attr', 'disabled');
	reportingPage.reportPresentationHeader().then((header) => {
		cy.wrap(header).should('not.be.checked');
		cy.wrap(header).parent().invoke('attr', 'style', 'display: block');
		cy.wrap(header).check({ force: true });
	});
	reportingPage.containsText('The presentation header must be completed or unselected.');
});

Then('I add subscription to the report', () => {
	reportingPage.reportSubscriptions().then((subscriptions) => {
		cy.wrap(subscriptions).find('h3').invoke('attr', 'class', 'toggle');
		cy.wrap(subscriptions).find('div').invoke('attr', 'style', 'display: block');
		reportingPage.containsText('Add Subscription').click();

		reportingPage.toastMessage().should('contain.text', constants.messages.toast.REVIEW_FIELDS);
		reportingPage.reportPresentationInputHeader().type('Test - Header').should('have.value', 'Test - Header');
		reportingPage.reportPresentationInputFooter().type('Test - Footer').should('have.value', 'Test - Footer');

		reportingPage.containsText('Add Subscription').click();
		reportingPage.saveNameInput().should('be.visible');
		reportingPage.saveButton().should('be.visible');
		reportingPage.cancelButton().click();
	});
});

Then('the report saved message appears', () => {
	reportingPage.toastMessage().should('contain.text', constants.messages.toast.REPORT_SAVED);
});

Then('I download the first report from the notification toolbar', () => {
	reportingPage.inboxContainerMessages(15000).first().click();
	cy.wait('@INBOX');
	cy.wait('@DOWNLOAD_REPORT');
});

Then('The notification dropdown {string} contain a notification mentioning {string}', (isVisible, content) => {
	isVisible = isVisible.includes('not') ? 'not.exist' : 'exist';
	reportingPage.notificationLink().click();
	reportingPage.inboxContainerDiv().contains(content).should(isVisible);
});

Then('I verify that the mandatory fields cannot be removed from the configuration for Ballot Vote Data Report', () => {
	columns_BallotVoteDataMandatory.forEach((fields) => {
		reportingPage.columnCheckboxByLabel(fields).should('be.disabled');
	});
});

Then('I verify the default field list for current selection for Ballot Vote Data Report', () => {
	columns_BallotVoteDataCurrentSelection.forEach((fields) => {
		reportingPage.currentSelectionColumnCheckboxByLabel(fields).should('exist');
	});
});

Then('I verify the default field list for available selection for Ballot Vote Data Report', () => {
	columns_BallotVoteDataAvailableSelection.forEach((fields) => {
		reportingPage.availableSelectionColumnCheckboxByLabel(fields).should('exist');
	});
});

Then('I verify the default field list for current selection for Voting Activity Report', () => {
	columns_VotingActivityCurrentSelection.forEach((fields) => {
		reportingPage.currentSelectionColumnCheckboxByLabel(fields).should('exist');
	});
});

Then('I verify the default expanded and collapsed sections', () => {
	reportingPage.reportId().find('h3').should('have.class', 'toggle');
	reportingPage.reportCriteriaSection().find('h3').should('have.class', 'toggle');
	reportingPage.reportColumns().find('h3').should('have.class', 'toggle closed');
	reportingPage.reportPresentation().find('h3').should('have.class', 'toggle closed');
	reportingPage.reportSubscriptions().find('h3').should('have.class', 'toggle closed');
});

Then('I verify that the reporting page has loaded successfully', () => {
	reportingPage.reportTypes().contains('Ballot Reconciliation').should('be.visible');
	reportingPage.reportTypes().contains('Ballot Status').should('be.visible');
	reportingPage.reportTypes().contains('Ballot Vote Data').should('be.visible');
	reportingPage.reportTypes().contains('Engagement').should('be.visible');
	reportingPage.reportTypes().contains('Meeting Summary').should('be.visible');
	reportingPage.reportTypes().contains('Policy').should('be.visible');
	reportingPage.reportTypes().contains('Proxy Voting').should('be.visible');
	reportingPage.reportTypes().contains('Proxy Voting Summary').should('be.visible');
	reportingPage.reportTypes().contains('Vote Results').should('be.visible');
	reportingPage.reportTypes().contains('Voting Activity').should('be.visible');
	reportingPage.reportCriteriaSection().find('h3').should('be.visible').and('have.text', 'Filter Criteria');
	reportingPage.reportColumns().find('h3').should('be.visible').and('have.text', 'Configure Columns');
	reportingPage.reportPresentation().find('h3').should('be.visible').and('have.text', 'Grouping & Presentation');
	reportingPage.reportSubscriptions().find('h3').should('be.visible').and('have.text', 'Subscriptions');
});
