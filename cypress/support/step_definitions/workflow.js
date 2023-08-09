import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import dayjs from 'dayjs';
import workflowPage from '../page_objects/workflow.page';
const constants = require('../constants');
let wfData = [],
	meetingName;

When('I navigate to the workflow page', () => {
	cy.visit('/Workflow');
	cy.wait('@WORKFLOW_EXPANSION', { responseTimeout: 120000 });
});

Then('I can view the workflow page', () => {
	workflowPage.controlNumberColumnHeader().should('be.visible');
	workflowPage.waitForWorkflowPageLoad();
	workflowPage.tableData().should('be.visible');
	workflowPage.highlightedFilter().should('be.visible');
	workflowPage.addCriteriaButton().should('be.visible').and('have.text', 'Add Criteria');
	workflowPage.workflowMenuButton().should('exist');
});

Then('I set the filter to Upcoming Meetings', () => {
	workflowPage.quickFiltersDiv().contains('Sustainalytics ESG').click();
	workflowPage.waitForWorkflowSpinner();
	workflowPage.waitForWorkflowPageLoad();
	workflowPage.quickFiltersDiv().contains('Upcoming Meetings').click();
});

When('I remove all existing selected criteria', () => {
	cy.removeAllExistingSelectedCriteria();
	workflowPage.waitForWorkflowPageLoad();
});

When('I search for the customer {string}', (customerName) => {
	workflowPage.selectCustomerShadowInput().click({ force: true }).type('{del}', { force: true });
	workflowPage.selectCustomerInput().clear({ force: true });
	if (customerName != '') {
		workflowPage.selectCustomerInput().type(customerName);
		workflowPage.selectCustomerDropdown().should('be.visible');
		workflowPage.selectCustomerInput().type('{downarrow}{enter}');
	} else {
		workflowPage.quickFiltersDiv().contains('Upcoming Meetings').click();
	}
});

Then('I arrange the table in {string} order for {string}', (order, column_name) => {
	workflowPage.workflowLink().scrollIntoView();
	switch (column_name) {
		case 'policy id':
			workflowPage.policyIdColumnHeader().should('be.visible').click({ force: true, scrollBehavior: false });
			workflowPage.waitForWorkflowPageLoad();
			if (order.includes('descending')) {
				workflowPage.policyIdColumnHeader().should('be.visible').click({ force: true, scrollBehavior: false });
				workflowPage.waitForWorkflowPageLoad();
			}
			break;
		case 'control number':
			workflowPage.controlNumberColumnHeader().should('be.visible').click({ force: true, scrollBehavior: false });
			workflowPage.waitForWorkflowPageLoad();
			if (order.includes('descending')) {
				workflowPage.controlNumberColumnHeader().should('be.visible').click({ force: true, scrollBehavior: false });
				workflowPage.waitForWorkflowPageLoad();
			}
			break;
	}
});

Then('I should be able to see and navigate to the company name saved previously', () => {
	workflowPage.tableRows().within(() => {
		workflowPage.containsText(Cypress.env('companyName')).should('be.visible').click();
	});
});

Then('I have added the filter criteria {string}', (criteria) => {
	cy.AddMultipleCriteria([criteria]);
});

Then('I have added the criteria for {string} {string}', (criteria, value) => {
	workflowPage.waitForWorkflowPageLoad();
	cy.AddMultipleCriteria([criteria]);
	workflowPage.criteriaHeadings().contains(criteria).click({ scrollBehavior: false });
	workflowPage
		.criteriaHeadings()
		.contains(criteria)
		.next()
		.invoke('attr', 'style', 'display: block;')
		.as('FILTER_CRITERIA');
	cy.get('@FILTER_CRITERIA')
		.should('be.visible')
		.within(() => {
			if (value.includes('from')) {
				cy.intercept('GET', '**/GetSecurityStartsWith/?QueryValue=**').as('COMPANY_FILTER_SEARCH_RESULTS');
				workflowPage.filterSearchInput().type(Cypress.env('companyName'));
				cy.wait('@COMPANY_FILTER_SEARCH_RESULTS');
			} else {
				workflowPage.filterSearchInput().type(value);
			}
			workflowPage.filterSearchInput().type('{enter}');
			workflowPage.updateComanyName().click({ scrollBehavior: false });
		});
	cy.wait('@WORKFLOW_EXPANSION', { responseTimeout: 150000 });
	workflowPage.waitForWorkflowPageLoad();
});

Then('I have added the criteria for {string} with status {string}', (criteria, status) => {
	cy.AddMultipleCriteria([criteria]);
	workflowPage.criteriaHeadings().contains(criteria).first().click({ scrollBehavior: false });
	workflowPage
		.criteriaHeadings()
		.contains(criteria)
		.first()
		.next()
		.invoke('attr', 'style', 'display: block;')
		.as('FILTER_CRITERIA');
	cy.get('@FILTER_CRITERIA')
		.should('be.visible')
		.within(() => {
			workflowPage.getInputBox().eq(0).should('be.visible').type(status, { scrollBehavior: false });
			workflowPage.containsText(status).click({ scrollBehavior: false });
			workflowPage.updateButtonForCheckbox().click({ scrollBehavior: false });
		});
	cy.wait('@WORKFLOW_EXPANSION', { responseTimeout: 150000 });
	workflowPage.waitForWorkflowPageLoad();
});

Then('I have added the criteria for {string} and checking the checkbox for {string}', (criteria, status) => {
	cy.AddMultipleCriteria([criteria]);
	workflowPage.criteriaHeadings().contains(criteria).click({ scrollBehavior: false });
	workflowPage
		.criteriaHeadings()
		.contains(criteria)
		.next()
		.invoke('attr', 'style', 'display: block;')
		.as('FILTER_CRITERIA');
	cy.get('@FILTER_CRITERIA')
		.should('be.visible')
		.within(() => {
			workflowPage.containsText(status).click({ scrollBehavior: false });
			workflowPage.updateButtonForCheckbox().click({ scrollBehavior: false });
		});
	cy.wait('@WORKFLOW_EXPANSION', { responseTimeout: 150000 });
	workflowPage.waitForWorkflowPageLoad();
});

Then('I have added the criteria for {string} and selecting the radio button for {string}', (criteria, status) => {
	cy.AddMultipleCriteria([criteria]);
	workflowPage.criteriaHeadings().contains(criteria).click({ scrollBehavior: false });
	workflowPage.criteriaHeadings().contains(criteria).next().invoke('attr', 'style', 'display: block;');
	workflowPage.criteriaOption().contains(status).next().check({ scrollBehavior: false });
	workflowPage.updateButton().click({ scrollBehavior: false });
	cy.wait('@WORKFLOW_EXPANSION', { responseTimeout: 150000 });
	workflowPage.waitForWorkflowPageLoad();
});

When('I click on the Meeting Date radio button', () => {
	workflowPage.meetingDateRadio().check();
});

When('I set the date filter as Next {int} days and Past {int} days', (nextDays, pastDays) => {
	workflowPage.dateFilterModal().invoke('attr', 'style', 'display: block;');
	workflowPage.nextDaysInput().prev().click();
	workflowPage.nextDaysInput().clear().type(nextDays);
	workflowPage.pastDaysInput().prev().click();
	workflowPage.pastDaysInput().clear().type(pastDays);
});

When('I set the date filter between {int} and {int} days from today', (pastDays, nextDays) => {
	let pastDate = dayjs().add(pastDays, 'days').format('MM/DD/YYYY');
	let nextDate = dayjs().add(nextDays, 'days').format('MM/DD/YYYY');
	workflowPage.dateFilterModal().invoke('attr', 'style', 'display: block;');
	workflowPage.dateBetweenRadio().check();
	workflowPage.dateStartInput().clear().type(pastDate);
	workflowPage.dateEndInput().clear().type(nextDate);
});

When('I update the date filter', () => {
	workflowPage.updateDateFilter().click();
});

When('I enable all columns', () => {
	workflowPage.waitForWorkflowPageLoad();
	workflowPage.columnsListButton().click();
	workflowPage.columnListCheckbox().check({ force: true }).should('be.checked');
	workflowPage.columnApplyButton().click({ force: true });
	workflowPage.waitForWorkflowSpinner();
	workflowPage.waitForWorkflowPageLoad();
	workflowPage.allColumnHeadingLabel().its('length').should('be.greaterThan', 40);
});

Then('I click on the Columns dropdown', () => {
	workflowPage.columnsListButton().click({ force: true });
});

Then('I have added the column {string}', (columnName) => {
	cy.checkColumnFieldApplyAndVerifyIsChecked(columnName);
});

When('I select the first available meeting', () => {
	workflowPage
		.tableRows()
		.eq(0)
		.within(() => {
			workflowPage.companyNameLink().click({ force: true });
		});
});

Then('I set the meetings per page value to {string}', (pages) => {
	workflowPage.meetingsPerPageDropdown().select(pages, { force: true }).invoke('val').should('eq', pages);
});

When('I select a random meeting', () => {
	workflowPage
		.tableRows()
		.its('length')
		.then((n) => {
			const meetingRows = n - 1;
			const randomRow = Math.floor(Math.random() * meetingRows);
			workflowPage
				.tableRows()
				.eq(randomRow)
				.within(() => {
					workflowPage.companyNameLink().click({ force: true });
					cy.log(`Selected row number ${randomRow + 1} from the top`);
				});
		});
});

Then('I navigate to the {int} meeting', (company_sequence) => {
	workflowPage
		.tableRows()
		.eq(company_sequence - 1)
		.within(() => {
			workflowPage.companyNameLink().click({ force: true });
		});
});

When('I navigate to a meeting with same deadline date and {int} meeting date ahead', (mdDays) => {
	workflowPage
		.tableRows()
		.eq(0)
		.within(() => {
			workflowPage
				.companyNameLink()
				.invoke('attr', 'href')
				.then((val) => {
					let meetingid = val.split('/Index/')[1];
					cy.executeQuery(
						`UPDATE PX_Meeting SET MeetingDate = DATEADD(DAY, ${mdDays}, getdatE()) WHERE MeetingID = '${meetingid}'`
					);
					cy.visit('MeetingDetails/Index/' + meetingid);
				});
		});
});

Then('I should be {string} to see the text {string} on the UI', (condition, text) => {
	if (condition.includes('unable')) {
		workflowPage.containsText(text).should('not.exist');
	} else {
		workflowPage.containsText(text).should('exist');
	}
});

Then(
	'I can verify that "Upcoming Meetings" displayed under the "Quick Filters" category on the left side of the screen',
	() => {
		workflowPage.quickFiltersDiv().contains('Upcoming Meetings').should('be.visible');
		workflowPage.selectedQuickFilterName().should('contain.text', 'Upcoming Meetings');
		workflowPage.selectedQuickFilterName().should('have.css', 'background-color', 'rgb(30, 64, 101)');
	}
);

When('I navigate to {string} meeting', (company_name) => {
	workflowPage.containsText(company_name).click();
});

Then('I filter for meetings without ballots', () => {
	workflowPage.ballotCriteriaFilter().click();
	workflowPage.meetingWithoutBallotsRadio().check();
	workflowPage.updateNumberOfBallotsButton().click();
	workflowPage.waitForWorkflowPageLoad();
});

When('I select {int} meetings from the top', (noOfMeetings) => {
	for (var i = 0; i < Number(noOfMeetings); i++) {
		workflowPage.meetingCheckbox().eq(i).should('not.be.visible').check({ force: true });
	}
});

Then('I scroll to the end of the meetings table', () => {
	for (let n = 0; n < 11; n++) {
		workflowPage.scrollEndButton().click({ waitForAnimations: false });
	}
});

Then('I select {string} from the Quick Pick dropdown', (value) => {
	workflowPage.quickPickDropdown().click();
	workflowPage.quickPickModal().contains(value).click({ force: true });
	workflowPage.quickPickModal().contains('Update').click({ force: true });
	workflowPage.proceedButton().click();
	workflowPage.waitForWorkflowPageLoad();
});

Then('I should be able to see {string} in the column {string}', (column_value, column_name) => {
	switch (column_name) {
		case 'Controversy Alert':
			column_value = new RegExp(column_value);
			workflowPage.controversyAlertTableData().each(($column) => {
				expect($column.text().trim()).to.match(column_value);
			});
			break;
		default:
			break;
	}
});

Then('I should be able to see a {string} named {string}', (fieldType, fieldName) => {
	workflowPage.containsText(fieldName).should('be.visible');
});

Then('I should be able to verify that the column {string} is {string}', (columnName, isChecked) => {
	workflowPage.columnsListButton().click();
	if (isChecked.includes('not')) {
		workflowPage.columnsListDiv().find(`input[value='${columnName}']`).should('not.be.checked');
	} else {
		workflowPage.columnsListDiv().find(`input[value='${columnName}']`).should('be.checked');
	}
});

Then('I generate a request for Workflow Export as {string} for {string} fields', (extension, fields) => {
	workflowPage.exportWorkflowDropdown().click();
	workflowPage.exportResultsLink().click();
	extension.includes('csv') ? cy.get('#csv').check({ force: true }) : cy.get('#html').check({ force: true });
	fields.includes('all') ? cy.get('#all').check({ force: true }) : cy.get('#displayed').check({ force: true });
	workflowPage.exportResultsButton().click();
});

Then('I verify that all the relevant API calls for workflow page are made for {string} user', (userType) => {
	cy.statusCode200('@CURRENT_USER');
	cy.statusCode200('@SPA');
	cy.statusCode200('@GET_MARKUP_WORKFLOW');
	cy.statusCode200('@DASHBOARD_MARKUP');
	cy.statusCode200('@WORKFLOW_CONFIGURE_COLUMNS');
	cy.statusCode200('@WORKFLOW_META_DATA_1');
	cy.statusCode200('@WORKFLOW_META_DATA_2');
	cy.statusCode200('@FILTERS_DIRECTORY');
	cy.statusCode200('@GET_FOR_USER');
	cy.statusCode200('@WORKFLOW_SECURITIES_WATCHLIST');
	cy.statusCode200('@GET_MARKUP_MEETING_DETAILS');
	cy.statusCode200('@GET_USER_PERMISSION');
	cy.statusCode200('@WORKFLOW_FILTER_CRITERIA_EDITORS');
	cy.statusCode200('@INBOX');
	cy.statusCode200('@DATE_RANGE_KNOCKOUT_BINDINGS');
	cy.statusCode200('@DATE_RANGE');

	if (userType.includes('external')) {
		cy.statusCode200('@GET_AVAILABLE_ASSIGNEES_CUSTOMER');
	}
});

Then('the filtered results should be displayed', () => {
	workflowPage.containsText('Decision Status (1)');
});

Then('I save the filter', () => {
	const unixTime = Math.floor(Date.now() / 1000);
	const filterName = `MyFilter_${unixTime}`;
	cy.saveFilter(filterName);
	workflowPage.toastMessage().should('contain.text', constants.messages.toast.FILTER_CREATED);
	workflowPage.containsText('My Filters').siblings().find('span').should('contain', filterName);
});

Then('I should be able to verify the different column actions on the workflow page', () => {
	const testCol = 'Last Voted By';
	const columns = [
		'Agenda Key',
		'Ballot Blocking',
		'Control Number',
		'Deadline Date',
		'Decision Status',
		'Meeting Type',
		'Policy ID',
		'Record Date',
		'Security Country of Trade',
		'Shares',
	];
	//Step 3
	workflowPage.columnsListButton().click();

	columns.forEach((column) => {
		workflowPage.columnNameInput().type(column);
		workflowPage.columnLabelValue(column).should('be.checked');
		workflowPage.columnNameInput().clear();
	});
	workflowPage.columnCancelButton().click();

	//Step 4 and step 5
	cy.checkColumnFieldApplyAndVerifyIsChecked(testCol);
	workflowPage.waitForWorkflowPageLoad();

	// add test col to stack
	columns.push(testCol);

	//sort columns in alphabetical order
	columns.sort();

	workflowPage.columnsListButton().click();

	//verify all checked after adding new column
	columns.forEach((column) => {
		workflowPage.columnNameInput().type(column);
		workflowPage.columnLabelValue(column).should('be.checked');
		workflowPage.columnNameInput().clear();
	});
	workflowPage.columnCancelButton().click();

	//uncheck the added column and remove from sorted array
	cy.uncheckColumnFieldApplyAndVerifyNotChecked(testCol);
	workflowPage.waitForWorkflowPageLoad();
	columns.splice(5, 1);

	//Step 6 - Verify User unchecks Multiple fields (Eg : Decision Status, Ballot Status etc.) from the top of the list by selecting the checkboxes & Clicks 'Apply' button.
	//uncheck multiple checkboxes and remove from array as unchecked
	cy.uncheckColumnFieldApplyAndVerifyNotChecked(columns[2]);
	workflowPage.waitForWorkflowPageLoad();
	columns.splice(2, 1);
	cy.uncheckColumnFieldApplyAndVerifyNotChecked(columns[3]);
	workflowPage.waitForWorkflowPageLoad();
	columns.splice(3, 1);
	cy.uncheckColumnFieldApplyAndVerifyNotChecked(columns[4]);
	workflowPage.waitForWorkflowPageLoad();
	columns.splice(4, 1);

	//resort array after removing items
	columns.sort();

	//Step 7 - Verify that the Removed fields (Eg : Decision Status, Ballot Status etc.) should be available in the rendered list in alphabetic order with unchecked in Configure 'Columns' modal
	workflowPage.columnsListButton().click();
	columns.forEach((column) => {
		workflowPage.columnNameInput().type(column);
		workflowPage.columnLabelValue(column).should('be.checked');
		workflowPage.columnNameInput().clear();
	});
	workflowPage.columnCancelButton().click();

	workflowPage.filterSectionDiv().should('be.visible');
	workflowPage.workflowLink().should('exist');

	cy.removeAllExistingSelectedCriteria();
	workflowPage.workflowMenuButton().scrollIntoView();
	cy.AddMultipleCriteria(['Decision Status']);
	cy.addCriteriaStatus(['Recommendations Available']);

	//Step 9 - Go Back to the Workflow Page, Verify Removed Columns are not displayed/Auto Saved [Eg : Decision Status, Ballot Status etc]
	workflowPage.columnsListButton().click();
	columns.forEach((column) => {
		workflowPage.columnNameInput().type(column);
		workflowPage.columnLabelValue(column).should('be.checked');
		workflowPage.columnNameInput().clear();
	});
	workflowPage.columnCancelButton().click();
});

Then('There is no reference to my picklist {string} on the workflow page', (lbl) => {
	workflowPage.containsText(lbl).should('not.exist');
});

Then('I should be able to see the results only for {string}', (filterName) => {
	workflowPage.workflowLink().scrollIntoView();
	workflowPage.criteriaHeadings().contains(filterName).click({ scrollBehavior: false });
	workflowPage
		.criteriaHeadings()
		.contains(filterName)
		.next()
		.invoke('attr', 'style', 'display: block;')
		.as('FILTER_CRITERIA');
	switch (filterName) {
		case 'ESG Risk Rating Assessment':
			cy.get(workflowPage.ESG_Risk_Rating_Assessment_filter.editorModal).should('be.visible');
			break;
		case 'ESG Risk Exposure Assessment':
			cy.get(workflowPage.ESG_Risk_Exposure_Assessment_filter.editorModal).should('be.visible');
			break;
		case 'ESG Risk Management Assessment':
			cy.get(workflowPage.ESG_Risk_Management_Assessment_filter.editorModal).should('be.visible');
			break;
		case 'ESG Risk Rating Percentile Global':
			cy.get(workflowPage.ESG_Risk_Rating_Percentile_Global_filter.editorModal).should('be.visible');
			break;
		case 'ESG Risk Rating Percentile Industry':
			cy.get(workflowPage.ESG_Risk_Rating_Percentile_Industry_filter.editorModal).should('be.visible');
			break;
		case 'ESG Risk Rating Percentile Sub Industry':
			cy.get(workflowPage.ESG_Risk_Rating_Percentile_Sub_Industry_filter.editorModal).should('be.visible');
			break;
		case 'ESG Risk Rating Highest Controversy':
			cy.get(workflowPage.ESG_Risk_Rating_Highest_Controversy_filter.editorModal).should('be.visible');
			break;
		default:
			cy.log('Filter not found!!');
	}
});

Then('I can see the filter columns are displayed in the correct order', () => {
	workflowPage.dateFilterLink().contains('Next 30 Days').should('be.visible');
	workflowPage.numberOfBallotsFilterLink().contains('Number of Ballots > 0').should('be.visible');
	workflowPage.quickFiltersDiv().contains('Upcoming Meeting').should('have.class', 'highlightedFilter');

	const filterColumns = [
		'Company Name',
		'Agenda Key',
		'Policy ID',
		'Control Number',
		'Decision Status',
		'Security Country of Trade',
		'Deadline Date',
		'Meeting Date',
		'Record Date',
		'Meeting Type',
		'Shares',
		'Ballot Blocking',
	];

	filterColumns.forEach((column) => {
		workflowPage.columnDataTitle(column);
		filterColumns.index == column;
	});
});

Then('all the meetings on the screen have a CalPERS customer id', () => {
	// check all meetings in response have CalPERS customer id
	cy.wait('@WORKFLOW_EXPANSION', { responseTimeout: 150000 }).then((xhr) => {
		//handle response. Cache service returns string, while DB returns object
		const data = typeof xhr.response.body == 'string' ? JSON.parse(xhr.response.body) : xhr.response.body;
		const items = data.items;

		items.forEach((item) => {
			const ballots = item.Agendas[0].Policies[0].Ballots;
			ballots.forEach((ballot) => {
				const value = ballot.Summaries.CustomerID.Value;
				expect(value).to.equal(196);
			});
		});
	});
});

When('I search for a company on the search bar and choose meetings', () => {
	workflowPage.searchResultsDiv().invoke('attr', 'style', 'display: block');
	// Search Customer ('Meetings'option is default) & verify user is navigated to correct Meeting Detail page
	workflowPage.mainSearchInput().type('International Breweries plc');
	cy.statusCode200('@TOOLBAR_SEARCH');
	workflowPage.containsText('International Breweries Plc | NG').click();
});

When('I search for a company on the search bar and choose companies', () => {
	workflowPage.searchResultsDiv().invoke('attr', 'style', 'display: block');
	// Search customer ('Companies' option) & verify user is navigated to correct Company page
	workflowPage.mainSearchInput().type('international business machines');
	workflowPage.companiesRadio().should('have.value', 'Companies').click();
	cy.statusCode200('@TOOLBAR_SEARCH');
	workflowPage.companiesResultsBlueIcon().should('be.visible');
	workflowPage.containsText('International Business Machines Corp. | US').click();
});

When('I try to add the first four available Sustainalytics ESG columns', () => {
	workflowPage.columnsListButton().click();
	workflowPage.fourEsgColumns.forEach((column) => {
		workflowPage.columnNameInput().type(column);
		workflowPage.columnLabelValue(column).check({ force: true });
		workflowPage.columnNameInput().clear();
	});
	workflowPage.columnApplyButton().click();
});

Then('I should be able to see these {string} columns on the workflow table', (noOfColumns) => {
	//Waiting for page load
	workflowPage.waitForWorkflowPageLoad();
	workflowPage.meetingsHorizontalScrollBar().should('be.visible');
	// Moves the horizontal sidebar to the far right
	for (let n = 0; n < 11; n++) {
		workflowPage.scrollEndButton().click();
	}

	switch (noOfColumns) {
		case 'four':
			workflowPage.fourEsgColumns.forEach((column) => {
				workflowPage.columnDataTitle(column).should('be.visible');
			});
			break;
		case 'three':
			workflowPage.threeEsgColumns.forEach((column) => {
				workflowPage.columnDataTitle(column).should('be.visible');
			});
			break;
	}
});

When('I try to add the remaining three Sustainalytics ESG columns', () => {
	workflowPage.columnsListButton().click();

	workflowPage.threeEsgColumns.forEach((column) => {
		workflowPage.columnNameInput().type(column);
		workflowPage.columnLabelValue(column).check({ force: true });
		workflowPage.columnNameInput().clear();
	});
	workflowPage.columnApplyButton().click();
});

When('I try to remove the first column on the workflow table', () => {
	let column = 'Agenda Key';
	workflowPage.columnDataTitle(column).should('be.visible');
	workflowPage.columnsListButton().click();
	workflowPage.columnLabelValue(column).first().uncheck({ force: true });
	workflowPage.columnApplyButton().click();
	cy.wait('@WORKFLOW_EXPANSION', { responseTimeout: 150000 });
});

Then('I should be unable to see the first column on the workflow table', () => {
	let column = 'Agenda Key';
	workflowPage.columnDataTitle(column).should('not.exist');
});

When('I apply the policy criteria for one of the policies', () => {
	cy.removeAllExistingSelectedCriteria();
	workflowPage.containsText('Upcoming Meetings').click({ force: true });
	// Step 2 - User clicks on Add Criteria & selects Policy ID
	cy.AddMultipleCriteria(['Policy ID']);
	cy.wait('@LIST_SERVICE');
	// Step 3 - User selects one policy from the list (e.g. TCW-TH) & clicks Update
	cy.addCriteriaStatus([`${workflowPage.workflowFilterData.policy}`]);
});

Then('I click on the control number link', () => {
	// Step 4 - User clicks on the Control Number hyperlink on the workflow page
	// Go through the list of meetings and click in the record that matches the name
	workflowPage.policyIdTableData().each(($list, index) => {
		if ($list.text() == workflowPage.workflowFilterData.policy) {
			workflowPage.controlNumberTableData().eq(index).find('a').click({ force: true });
			return false;
		}
	});
	cy.wait('@GET_MEETING_ID');
	cy.wait('@RELATED_MEETINGS');
	cy.wait('@GET_AGENDA');
	cy.wait('@PAGE_SECTION_ORDER');
	cy.wait('@MEETING_SECURITY_WATCHLIST');
	cy.wait('@ASSIGNED_MEETING_ID');
	cy.wait('@VOTE_TALLY');
});

When('I apply the System Watch list for {string}', (client) => {
	workflowPage.customerNameInput().type(client, { force: true });
	workflowPage.customerNameSearchResult().first().click({ force: true });
	workflowPage.columnsListButton().click();
	workflowPage.columnNameInput().type('System Watch List(s)');
	workflowPage.columnLabelValue('System Watch List(s)').check({ force: true });
	workflowPage.columnNameInput().clear();
	workflowPage.columnApplyButton().click();
	cy.wait('@WORKFLOW_EXPANSION', { responseTimeout: 150000 });
	cy.wait('@WORKFLOW_SECURITIES_WATCHLIST');
	workflowPage.scrollEndButton().click({ waitForAnimations: false });
});

Then('all the results on the table should belong to "Calpers"', () => {
	//loop through table and click on meeting that does not have system watch list
	function loopOverRows(page, rows) {
		const firstEmptyElementIdx = rows.findIndex((row) => row === '');
		if (firstEmptyElementIdx < 0) {
			workflowPage.nextPage().click();
			scanOverTableInPage(page + 1);
		} else {
			//store meeting name
			workflowPage
				.companyNameLinks()
				.eq(firstEmptyElementIdx)
				.then((meeting) => {
					meetingName = meeting.text();
				});
			workflowPage.companyNameLinks().eq(firstEmptyElementIdx).click({ force: true });
		}
	}

	//loop through table to get empty system watch list meeting
	function scanOverTableInPage(page) {
		if (page > 10) {
			throw new Error('No matching data was found. Please config data by manually before running the test');
		}
		let systemWatchList = [];
		workflowPage.waitForWorkflowPageLoad();
		workflowPage
			.systemWatchLists()
			.each((element) => {
				systemWatchList.push(element.text());
			})
			.then(() => {
				loopOverRows(page, systemWatchList);
			});
	}

	scanOverTableInPage(1);
});

When('I apply the System Watch list', () => {
	workflowPage.columnsListButton().click();
	workflowPage.columnNameInput().type('System Watch List(s)');
	workflowPage.columnLabelValue('System Watch List(s)').check({ force: true });
	workflowPage.columnNameInput().clear();
	workflowPage.columnApplyButton().click({ force: true });
	cy.wait('@WORKFLOW_EXPANSION', { responseTimeout: 150000 });
	workflowPage.scrollEndButton().click({ force: true }, { waitForAnimations: false });
	cy.RemoveCriteriaIfExists('#editorDiv10', '#remove-editorDiv10');
	cy.RemoveCriteriaIfExists('#editorDiv49', '#remove-editorDiv49');
	cy.RemoveCriteriaIfExists('#editorDiv51', '#remove-editorDiv51');
});

Then('all the results on the table should show relevant System Watch list and Meeting name', () => {
	function loopOverRows(page, rows) {
		const configedMeetingNameIndex = rows.findIndex((row) => row === meetingName);
		if (configedMeetingNameIndex < 0) {
			workflowPage.nextPage().click();
			scanOverTableInPage(page + 1);
		} else {
			workflowPage
				.systemWatchLists()
				.eq(configedMeetingNameIndex)
				.should('have.text', Cypress.env('systemWatchListApplied'));
			workflowPage.companyNameLinks().eq(configedMeetingNameIndex).click({ force: true });
			workflowPage.watchListDropDownButton().click({ force: true });
			workflowPage.watchListCheckbox(Cypress.env('sytemWatchListId')).should('be.checked');
			workflowPage.securityWatchListCount().eq(1).should('have.text', '1');
		}
	}

	//loop through table to get matching meeting
	function scanOverTableInPage(page) {
		if (page > 10) {
			throw new Error('No matching data was found. Please config data by manually before running the test');
		}
		let meetingNames = [];
		workflowPage.waitForWorkflowPageLoad();
		workflowPage
			.companyNameLinks()
			.each((element) => {
				meetingNames.push(element.text());
			})
			.then(() => {
				loopOverRows(page, meetingNames);
			});
	}
	scanOverTableInPage(1);
});

Then('I should be able to deselect the watch list from the previous scenario', () => {
	workflowPage.watchListButton().click({ force: true });
	workflowPage.watchListCheckbox(Cypress.env('sytemWatchListId')).uncheck({ force: true });
	workflowPage.watchListCheckbox(Cypress.env('sytemWatchListId')).should('not.be.checked');
	workflowPage.updateWatchListButton().click({ force: true });
	workflowPage.securityWatchListCount().should('have.text', '0');
});

Then('I should be able to deselect the system watch list from the workflow page', () => {
	workflowPage.waitForWorkflowPageLoad();

	function loopOverRows(page, rows) {
		const configedMeetingNameIndex = rows.findIndex((row) => row === meetingName);
		if (configedMeetingNameIndex < 0) {
			workflowPage.nextPage().click();
			scanOverTableInPage(page + 1);
		} else {
			workflowPage
				.systemWatchLists()
				.eq(configedMeetingNameIndex)
				.should('not.have.text', Cypress.env('systemWatchListApplied'));
		}
	}

	//loop through table to get matching meeting
	function scanOverTableInPage(page) {
		if (page > 10) {
			throw new Error('No matching data was found. Please config data by manually before running the test');
		}
		let meetingNames = [];
		workflowPage.waitForWorkflowPageLoad();
		workflowPage
			.companyNameLinks()
			.each((element) => {
				meetingNames.push(element.text());
			})
			.then(() => {
				loopOverRows(page, meetingNames);
			});
	}
	scanOverTableInPage(1);

	//deselect system watch list
	workflowPage.columnsListButton().click();
	workflowPage.columnNameInput().type('System Watch List(s)');
	workflowPage.columnLabelValue('System Watch List(s)').uncheck({ force: true });
	workflowPage.columnNameInput().clear();
	workflowPage.columnApplyButton().click();
});

Then('I can verify that the voted shares value matches the saved value', () => {
	workflowPage.votedSharesData().should('contain.text', Cypress.env('partialVoteNominalAmount'));
});

When('I save the data from row {int} on the workflow grid', (rowNo) => {
	workflowPage.rowData(rowNo).each((index, value) => {
		wfData[value] = Cypress.$(index).text().trim();
	});
});

Then('I verify the Workflow Export Report contains data seen on the UI', () => {
	workflowPage
		.inboxRows()
		.first()
		.invoke('attr', 'data-pagelink1')
		.should('contain', '/Downloads/')
		.then((downloadLink) => {
			cy.request(downloadLink).then((resp) => {
				wfData.forEach((value) => {
					expect(resp.body).include(value);
				});
			});
		});
});

Then('I can see data source title for {string} is visible', (title) => {
	workflowPage.dataSourceTitle().should('be.visible').and('have.text', constants.WORKFLOW_HEADINGS[title]);
});

When('I store data from UI {string} within the page', (table) => {
	workflowPage.waitForWorkflowPageLoad();
	//remove hidden data before store all the texts
	workflowPage.hiddenData().invoke('remove');
	workflowPage.tableRows().invoke('text').as(`${table}`);
	cy.get(`@${table}`).then((tableValue) => {
		Cypress.env(`${table}`, tableValue);
	});
});

Then('the data from {string} table and {string} table are equal', (table1, table2) => {
	expect(Cypress.env(`${table1}`)).to.deep.equal(Cypress.env(`${table2}`), 'Cache Data did not match DB Data!');
});

Then('the data from CacheAggregated API and DbAggregated API are equal', () => {
	//verify properties inside items of 2 apis
	let listDbItemsData = [];
	let listCacheItemsData = [];
	//make sure the items list in both APIs are the same before we start verify inside properties value
	expect(Cypress.env('DbAggregated').items.length).to.equal(Cypress.env('CacheAggregated').items.length);

	//start the loop and put all properties values into lists using db's properties as a reference
	for (let i = 0; i < Cypress.env('DbAggregated').items.length; i++) {
		const dbAggregatedItem = Cypress.env('DbAggregated').items[i];
		const cacheAggregatedItem = Cypress.env('CacheAggregated').items[i];

		const listDbProperties = Object.getOwnPropertyNames(dbAggregatedItem);

		for (const property of listDbProperties) {
			listDbItemsData.push(dbAggregatedItem[property]);
			listCacheItemsData.push(cacheAggregatedItem[property]);
		}
	}
	expect(listDbItemsData).to.deep.equal(listCacheItemsData);
	// verify the rest properties in 2 apis
	expect(Cypress.env('DbAggregated').Source).to.equal('DbAggregated');
	expect(Cypress.env('CacheAggregated').Source).to.equal('CacheAggregated');
	expect(Cypress.env('CacheAggregated').pages).to.equal(Cypress.env('DbAggregated').pages);
	expect(Cypress.env('CacheAggregated').totalCount).to.equal(Cypress.env('DbAggregated').totalCount);
	expect(Cypress.env('CacheAggregated').lookups).to.deep.equal(Cypress.env('DbAggregated').lookups);
});

Then('the data from DbNonAggregated API and CacheNonAggregated API are equal', () => {
	let listDbItemsData = [];
	let listCacheItemsData = [];

	expect(Cypress.env('DbNonAggregated').items.length).to.equal(Cypress.env('CacheNonAggregated').items.length);

	for (let i = 0; i < Cypress.env('DbNonAggregated').items.length; i++) {
		let dbNonAggregatedItem = Cypress.env('DbNonAggregated').items[i];
		let cacheNonAggregatedItem = Cypress.env('CacheNonAggregated').items[i];

		let listDbProperties = Object.getOwnPropertyNames(dbNonAggregatedItem);
		let listDbSummariesProperties = Object.getOwnPropertyNames(dbNonAggregatedItem.Summaries);

		for (const property of listDbProperties) {
			if (property !== 'Summaries' && property !== 'Agendas') {
				listCacheItemsData.push(cacheNonAggregatedItem[property]);
				listDbItemsData.push(dbNonAggregatedItem[property]);
			}
		}
		for (const summariesProperty of listDbSummariesProperties) {
			if (
				//ignore HasBallotData since it's not needed in the test
				//ignore some Date related properties since it contains not stable data
				summariesProperty !== 'HasBallotData' &&
				summariesProperty !== 'TargetPublicationDate' &&
				summariesProperty !== 'ResearchPublishDate' &&
				summariesProperty !== 'ResearchRePublishDate'
			) {
				listCacheItemsData.push(cacheNonAggregatedItem.Summaries[summariesProperty]);
				listDbItemsData.push(dbNonAggregatedItem.Summaries[summariesProperty]);
			}
		}
	}
	expect(listDbItemsData).to.deep.equal(listCacheItemsData);
	expect(Cypress.env('DbNonAggregated').Source).to.equal('DB');
	expect(Cypress.env('CacheNonAggregated').Source).to.equal('Cache');
	expect(Cypress.env('DbNonAggregated').pages).to.equal(Cypress.env('CacheNonAggregated').pages);
	expect(Cypress.env('DbNonAggregated').totalCount).to.equal(Cypress.env('CacheNonAggregated').totalCount);
});

Then('I store first Agenda Key number', () => {
	workflowPage
		.agendaKeyData()
		.first()
		.invoke('text')
		.as('FirstAgendaKeyData')
		.then((agendaKeyValue) => {
			Cypress.env('FirstAgendaKey', agendaKeyValue);
		});
});

Then('I get the response for {string} API', (api) => {
	//request API and store response as an env variable
	cy.get('#csrf-token')
		.should('exist')
		.invoke('attr', 'value')
		.then((csrf) => {
			cy.request({
				method: 'POST',
				url: `/Api/Data/${api}`,
				form: true,
				timeout: 60000,
				headers: {
					CSRFToken: csrf,
				},
				body: {
					PageInfo: {
						IgnorePagesize: 'false',
						Page: '1',
						PageSize: '20',
					},
					SortInfo: [
						{
							FieldName: 'BallotControlNumber',
							SortDirection: 'asc',
						},
					],
					FilterInfo: {
						0: {
							FieldName: 'DeadlineDate',
							CollectionMemberFieldname: '',
							ValueType: '0',
							Expressions: [
								{
									Operator: 'Between',
									Value: '0,30',
									ValueSemantics: '1',
									SiblingJoin: 'and',
								},
							],
							IsPreprocessorFilter: 'false',
						},
						1: {
							FieldName: 'BallotID',
							CollectionMemberFieldname: '',
							ValueType: '0',
							Expressions: [
								{
									Operator: 'IsGreaterThan',
									Value: '0',
									ValueSemantics: '0',
									SiblingJoin: 'and',
								},
							],
							IsPreprocessorFilter: 'false',
						},
						2: {
							FieldName: 'AgendaKey',
							CollectionMemberFieldname: '',
							ValueType: '0',
							Expressions: [
								{
									Operator: 'IN',
									Value: Cypress.env('FirstAgendaKey'),
									ValueSemantics: '0',
									SiblingJoin: 'and',
								},
							],
							IsPreprocessorFilter: 'false',
						},
					},
					SelectedFields: {
						Fields: {
							0: { ID: '1' },
							1: { ID: '2' },
							2: { ID: '15' },
							3: { ID: '39' },
							4: { ID: '17' },
							5: { ID: '10' },
							6: { ID: '8' },
							7: { ID: '3' },
							8: { ID: '7' },
							9: { ID: '4' },
							10: { ID: '5' },
							11: { ID: '6' },
							12: { ID: '11' },
						},
					},
				},
			}).then((response) => {
				const isAggregatedApi = api.includes('Aggregated');
				const isPerformanceApi = api.includes('Performance');

				const envKey = `${isPerformanceApi ? 'Cache' : 'Db'}${isAggregatedApi ? 'Aggregated' : 'NonAggregated'}`;
				const envValue = isPerformanceApi ? JSON.parse(response.body) : response.body;

				Cypress.env(envKey, envValue);
			});
		});
});

Then('{string} property from DbNonAggregated and CacheNonAggregated API are equal', (property) => {
	//Verify all inner properties except Summaries
	let listDbValue = [];
	let listCacheValue = [];

	switch (property) {
		case 'Agendas': {
			let dbNonAggregatedAgenda = Cypress.env('DbNonAggregated').items[0].Agendas[0];
			let cacheNonAggregatedAgenda = Cypress.env('CacheNonAggregated').items[0].Agendas[0];
			let listDbAgendaProperties = Object.getOwnPropertyNames(dbNonAggregatedAgenda);

			for (const property of listDbAgendaProperties) {
				if (property !== 'Summaries' && property !== 'Policies') {
					listDbValue.push(dbNonAggregatedAgenda[property]);
					listCacheValue.push(cacheNonAggregatedAgenda[property]);
				}
			}
			break;
		}
		case 'Agendas.Policies': {
			let dbNonAggregatedAgendaPolicies = Cypress.env('DbNonAggregated').items[0].Agendas[0].Policies[0];
			let cacheNonAggregatedAgendaPolicies = Cypress.env('CacheNonAggregated').items[0].Agendas[0].Policies[0];
			let listDbPoliciesProperties = Object.getOwnPropertyNames(dbNonAggregatedAgendaPolicies);

			for (const property of listDbPoliciesProperties) {
				if (property !== 'Summaries' && property !== 'Ballots') {
					listDbValue.push(dbNonAggregatedAgendaPolicies[property]);
					listCacheValue.push(cacheNonAggregatedAgendaPolicies[property]);
				}
			}
			break;
		}
		case 'Agendas.Policies.Ballots': {
			let dbNonAggregatedBallots = Cypress.env('DbNonAggregated').items[0].Agendas[0].Policies[0].Ballots[0];
			let cacheNonAggregatedBallots = Cypress.env('CacheNonAggregated').items[0].Agendas[0].Policies[0].Ballots[0];
			let listDbBallotsProperties = Object.getOwnPropertyNames(dbNonAggregatedBallots);

			for (const property of listDbBallotsProperties) {
				if (property !== 'Summaries') {
					listDbValue.push(dbNonAggregatedBallots[property]);
					listCacheValue.push(cacheNonAggregatedBallots[property]);
				}
			}
			break;
		}
		case 'lookups.MeetingIDs': {
			const meetingIdsFromCache = Cypress.env('CacheNonAggregated').lookups.MeetingIDs;
			const meetingIdsFromDb = Cypress.env('DbNonAggregated').lookups.MeetingIDs;
			expect(meetingIdsFromDb).to.deep.equal(meetingIdsFromCache);
			break;
		}
		default:
			throw new Error('undefined property given');
	}
	expect(listDbValue).to.deep.equal(listCacheValue);
});

Then('all Summaries property from DbNonAggregated and CacheNonAggregated API are equal', () => {
	//in here we will verify Agendas.Summaries/Agendas.Policies.Summaries/Agenda.Policies.Ballots.Summaries
	let listDbValue = [];
	let listCacheValue = [];

	let dbNonAggregatedAgenda = Cypress.env('DbNonAggregated').items[0].Agendas[0];
	let dbNonAggregatedPolicies = Cypress.env('DbNonAggregated').items[0].Agendas[0].Policies[0];
	let dbNonAggregatedBallots = Cypress.env('DbNonAggregated').items[0].Agendas[0].Policies[0].Ballots[0];

	let cacheNonAggregatedAgenda = Cypress.env('CacheNonAggregated').items[0].Agendas[0];
	let cacheNonAggregatedPolicies = Cypress.env('CacheNonAggregated').items[0].Agendas[0].Policies[0];
	let cacheNonAggregatedBallots = Cypress.env('CacheNonAggregated').items[0].Agendas[0].Policies[0].Ballots[0];

	let listDbSummaries = Object.getOwnPropertyNames(Cypress.env('DbNonAggregated').items[0].Summaries);

	for (const summariesProperty of listDbSummaries) {
		if (
			summariesProperty !== 'HasBallotData' &&
			summariesProperty !== 'TargetPublicationDate' &&
			summariesProperty !== 'ResearchPublishDate' &&
			summariesProperty !== 'ResearchRePublishDate'
		) {
			listDbValue.push(dbNonAggregatedAgenda.Summaries[summariesProperty]);
			listCacheValue.push(cacheNonAggregatedAgenda.Summaries[summariesProperty]);

			listDbValue.push(dbNonAggregatedPolicies.Summaries[summariesProperty]);
			listCacheValue.push(cacheNonAggregatedPolicies.Summaries[summariesProperty]);

			listDbValue.push(dbNonAggregatedBallots.Summaries[summariesProperty]);
			listCacheValue.push(cacheNonAggregatedBallots.Summaries[summariesProperty]);
		}
	}
	expect(listDbValue).to.deep.equal(listCacheValue);
});

Then('the Customer Name field is blank', () => {
	workflowPage.customerNameInput().should('have.value', '');
});

Then('I cannot click on any of the meetings', () => {
	workflowPage.meeting().should('not.exist');
});

When('I capture the data from API to compare with AVA report between {int} and {int}', (start_date, end_date) => {
	let dateStart = dayjs().add(start_date, 'days').format('YYYY|MM|DD');
	let dateEnd = dayjs().add(end_date, 'days').format('YYYY|MM|DD');
	cy.get('#csrf-token')
		.should('exist')
		.invoke('attr', 'value')
		.then((csrf) => {
			cy.request({
				method: 'POST',
				url: `/Api/Data/WorkflowExpansionDbAggregated`,
				form: true,
				timeout: 60000,
				headers: {
					CSRFToken: csrf,
				},
				body: {
					PageInfo: {
						IgnorePagesize: 'false',
						Page: '1',
						PageSize: '10',
					},
					SortInfo: [
						{
							FieldName: 'MeetingDate',
							SortDirection: 'asc',
						},
					],
					FilterInfo: {
						0: {
							FieldName: 'MeetingDate',
							CollectionMemberFieldname: '',
							ValueType: '0',
							Expressions: [
								{
									Operator: 'Between',
									Value: `${dateStart},${dateEnd}`,
									ValueSemantics: '0',
									SiblingJoin: 'and',
								},
							],
							IsPreprocessorFilter: 'false',
						},
						1: {
							FieldName: 'BallotID',
							CollectionMemberFieldname: '',
							ValueType: '0',
							Expressions: [
								{
									Operator: 'IsGreaterThan',
									Value: '0',
									ValueSemantics: '0',
									SiblingJoin: 'and',
								},
							],
							IsPreprocessorFilter: 'false',
						},
					},
					SelectedFields: {
						Fields: {
							0: { ID: '1' },
							1: { ID: '2' },
							2: { ID: '7' },
						},
					},
				},
			}).then((response) => {
				Cypress.env('noOfMeetingsInDB', response.body.totalCount);
				Cypress.env('companyName', response.body.items[0].CompanyName);
				Cypress.env('meetingId', response.body.items[1].MeetingID);
			});
		});
});
