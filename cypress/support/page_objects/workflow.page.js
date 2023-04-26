class workflowPage {
	getPageHeading() {
		return cy.get('h1');
	}
	getPageBody() {
		return cy.get('body');
	}
	getLoadingSpinner() {
		return cy.get('.k-loading-text', { timeout: 90000 });
	}
	getInputBox() {
		return cy.get('input');
	}
	inboxRows() {
		return cy.get('#inbox-container [data-pagelink1]');
	}
	containsText(text) {
		return cy.contains(text);
	}
	toastMessage() {
		return cy.get('.toast-message');
	}
	workflowLink() {
		return cy.get('#workflow-link.active');
	}
	mainSearchInput() {
		return cy.get('#toolbarSearchFieldInput');
	}
	companiesRadio() {
		return cy.get('#toolbar-options--companies');
	}
	companiesResultsBlueIcon() {
		return cy.get('.toolbar-icon-companies-blue');
	}
	searchResultsDiv() {
		return cy.get('#toolbarSearchResultWindow');
	}
	exportWorkflowDropdown() {
		return cy.get('#exportWorkflow');
	}
	exportResultsLink() {
		return cy.get('#exportFilterResults');
	}
	exportResultsButton() {
		return cy.get('#btn-export');
	}

	// Meeting section
	meeting() {
		return cy.get('#metaname-CompanyName > div > span > a');
	}
	tableRows() {
		return cy.get('table > tbody > tr');
	}
	companyNameLink() {
		return cy.get('[data-js="meeting-details-link"]').first();
	}
	scrollEndButton() {
		return cy.get('#btn-scroll-end');
	}
	meetingCheckbox() {
		return cy.get('input[name^="ckbSelMeeting"]');
	}
	quickPickDropdown() {
		return cy.get('.cf-quickpick-label');
	}
	quickPickModal() {
		return cy.get('#js-cf-modal-content');
	}
	proceedButton() {
		return cy.get('#apprise-btn-confirm');
	}
	controversyAlertTableData() {
		return cy.get('tbody tr td:last-child');
	}
	columnsListButton() {
		return cy.get('#btn-workflow-config-columns');
	}
	columnsListDiv() {
		return cy.get('#wf-configure-columns-target');
	}
	columnNameInput() {
		return cy.get('#txt-filter-col-name');
	}
	columnLabelValue(value) {
		return cy.get(`input[value='${value}']`);
	}
	columnDataTitle(column) {
		return cy.get(`th[data-title='${column}']`);
	}
	columnApplyButton() {
		return cy.get('#btn-apply-configure-columns');
	}
	columnCancelButton() {
		return cy.get('#btn-cancel-configure-columns');
	}
	meetingsPerPageDropdown() {
		return cy.get("select[data-role='dropdownlist']");
	}
	meetingsHorizontalScrollBar() {
		return cy.get('.mCSB_dragger_bar');
	}
	policyIdTableData() {
		return cy.get('table > tbody > tr > td:nth-child(4)');
	}
	controlNumberTableData() {
		return cy.get('table > tbody > tr > td:nth-child(5)');
	}
	rowData(rowNo) {
		return cy.get(`table > tbody > tr:nth-child(${rowNo}) > td`);
	}
	policyIdColumnHeader() {
		return cy.get("th[data-field='PolicyTag'] a[class='k-link']");
	}
	controlNumberColumnHeader() {
		return cy.get("th[data-field='BallotControlNumber'] a[class='k-link']");
	}
	votedSharesData() {
		return cy.get('#metaname-VotedShares');
	}

	// Watchlist section
	watchListDropDownButton() {
		return cy.get('#btn-watchlists');
	}
	manageWatchListDropDownButton() {
		return cy.get('#btn-manage-watchlists');
	}
	watchlistSearchInput() {
		return cy.get('.watchlist-search-input');
	}
	watchlistScrollableContainer() {
		return cy.get('.floatleft > .scrollableContainer');
	}
	watchListButton() {
		return cy.get('#md-btn-watchlists');
	}
	updateWatchListButton() {
		return cy.get('#md-btn-update-security-watchlists');
	}
	watchListCheckbox() {
		return cy.get('#md-watchlistsEditorItem2783');
	}
	securityWatchListCount() {
		return cy.get('span[data-bind="text: SecurityWatchlistsCount"]');
	}

	// Cog icon dropdown section
	workflowMenuButton() {
		return cy.get('#workflow-link');
	}
	adminLink() {
		return cy.get('#admin-link-container > a > span');
	}
	cogIcon() {
		return cy.get('#admin-link-container');
	}
	usersLink() {
		return cy.get('#navlink--users');
	}
	customersLink() {
		return cy.get('#navlink--customers');
	}

	// Filter section
	filterSectionDiv() {
		return cy.get('div#controls');
	}
	dateFilterLink() {
		return cy.get('#btn-date-modal');
	}
	dateFilterModal() {
		return cy.get('#date-range-target-meeting-deadline');
	}
	nextDaysInput() {
		return cy.get('#relative-next-days');
	}
	pastDaysInput() {
		return cy.get('#relative-past-days');
	}
	dateBetweenRadio() {
		return cy.get('#rdo-date-range-discrete');
	}
	dateStartInput() {
		return cy.get('#discrete-date-start');
	}
	dateEndInput() {
		return cy.get('#discrete-date-end');
	}
	updateDateFilter() {
		return cy.get('#btn-meeting-deadline-date-update');
	}
	meetingDateRadio() {
		return cy.get('#rdo-meeting-date');
	}
	numberOfBallotsFilterLink() {
		return cy.get('#editorDiv1000 > h4');
	}
	addCriteriaButton() {
		return cy.get('#btn-add-criteria');
	}
	criteriaInput() {
		return cy.get('#txt-filter-criteria');
	}
	applyCriteriaButton() {
		return cy.get('#btn-apply-criteria');
	}
	criteriaLabel() {
		return cy.get('#filterPreferenceControl > div > #controls > div > div > h4:nth-child(n+2)').should('be.visible');
	}
	criteriaOption() {
		return cy.get('input[type="radio"]').filter(':visible').prev();
	}
	updateButton() {
		return cy.get("button[id^='btn-update']").filter(':visible');
	}
	updateButtonForCheckbox() {
		return cy.get('div > button').eq(0);
	}
	selectCustomerInput() {
		return cy.get("input[placeholder='Select Customer...']");
	}
	selectCustomerShadowInput() {
		return cy.get('#txt-ui-CustomerID');
	}
	selectCustomerDropdown() {
		return cy.get('#kendoCustomers_listbox');
	}
	ballotCriteriaFilter() {
		return cy.get('.BallotIDEditor');
	}
	meetingWithoutBallotsRadio() {
		return cy.get('#rdo-equal-to');
	}
	updateNumberOfBallotsButton() {
		return cy.get('.blue.secondary.btn-update-BallotID');
	}
	criteriaHeadings() {
		return cy.get('h4').filter(':visible');
	}
	quickFiltersDiv() {
		return cy.get('#system-filters');
	}
	selectedQuickFilterName() {
		return cy.get("a[class='highlightedFilter'] span[data-bind=' text: FilterName']");
	}
	customerNameInput() {
		return cy.get('.customerName-Search .k-input');
	}
	customerNameSearchResult() {
		return cy.get('#kendoCustomers-list .k-item');
	}
	filterSearchInput() {
		return cy.get("input[role='listbox']");
	}
	updateComanyName() {
		return cy.get('#btn-update-CompanyName');
	}

	tableData() {
		return cy.get("tbody[role='rowgroup']");
	}

	highlightedFilter() {
		return cy.get("a[class='highlightedFilter']");
	}

	//Data Source
	dataSourceTitle() {
		return cy.get("[class='span11']>h2");
	}

	//Common Functions
	waitForWorkflowPageLoad() {
		this.getLoadingSpinner({ timeout: 120000 }).should('not.exist');
	}

	checkFilterCriteria(criteria) {
		this.columnLabelValue(criteria).check({ force: true });
	}

	//Constants pertaining to workflow page
	ESG_Risk_Rating_Assessment_filter = {
		criteria: 'ESG Risk Rating Assessment',
		editorButton: '#editorDiv1050',
		editorModal: '#sustainalytics-target-RiskCategory',
	};

	ESG_Risk_Exposure_Assessment_filter = {
		criteria: 'ESG Risk Exposure Assessment',
		editorButton: '#editorDiv1051',
		editorModal: '#sustainalytics-target-OverallExposureCategory',
	};

	ESG_Risk_Management_Assessment_filter = {
		criteria: 'ESG Risk Management Assessment',
		editorButton: '#editorDiv1052',
		editorModal: '#sustainalytics-target-OverallManagementCategory',
	};

	ESG_Risk_Rating_Percentile_Global_filter = {
		criteria: 'ESG Risk Rating Percentile Global',
		editorButton: '#editorDiv1053',
		editorModal: '#sustainalytics-target-RiskPercentileUniverse',
	};

	ESG_Risk_Rating_Percentile_Industry_filter = {
		criteria: 'ESG Risk Rating Percentile Industry',
		editorButton: '#editorDiv1054',
		editorModal: '#sustainalytics-target-RiskPercentileIndustry',
	};

	ESG_Risk_Rating_Percentile_Sub_Industry_filter = {
		criteria: 'ESG Risk Rating Percentile Sub Industry',
		editorButton: '#editorDiv1055',
		editorModal: '#sustainalytics-target-RiskPercentileSubindustry',
	};

	ESG_Risk_Rating_Highest_Controversy_filter = {
		criteria: 'ESG Risk Rating Highest Controversy',
		editorButton: '#editorDiv1056',
		editorModal: '#sustainalytics-target-HighestControversyCategory',
	};

	fourEsgColumns = [
		'ESG Risk Rating Percentile Global',
		'ESG Risk Rating Percentile Industry',
		'ESG Risk Rating Percentile Sub Industry',
		'ESG Risk Rating Highest Controversy',
	];

	threeEsgColumns = ['ESG Risk Rating Assessment', 'ESG Risk Exposure Assessment', 'ESG Risk Management Assessment'];

	workflowFilterData = {
		company: 'SK Innovation',
		policy: 'Wellington',
	};
}

module.exports = new workflowPage();
