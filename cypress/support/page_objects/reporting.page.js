class reportingPage {
	//Headings
	pageBody() {
		return cy.get('body');
	}
	getLoadingSpinner() {
		return cy.get('.k-loading-text');
	}
	toastMessage() {
		return cy.get('.toast-message');
	}
	notificationLink() {
		return cy.get('.notify-count');
	}
	inboxContainer() {
		return cy.get('#inbox-results').parent();
	}
	inboxContainerDiv() {
		return cy.get('#inbox-container');
	}
	inboxContainerMessages(timeout) {
		return cy.get('#inbox-container .msg-txt', { timeout: timeout });
	}
	inboxRows() {
		return cy.get('#inbox-container [data-pagelink1]');
	}
	containsText(text) {
		return cy.contains(text);
	}
	downloadButton() {
		return cy.get('#rpt-download-btn');
	}
	saveAsButton() {
		return cy.get('#btn-report-save-as');
	}
	reportNameInput() {
		return cy.get('#popupTextContainer > input[type=text]');
	}

	//Common For Report Types
	configureColumnsDropdown() {
		return cy.get('#rpt-columns > div > h3');
	}
	includeAllButton() {
		return cy.get('div.btn-container.clearfix > button.blue.small');
	}
	availableColumnsHeader() {
		return cy.get('#rpt-available-columns-header');
	}
	availableColumns() {
		return cy.get('#rpt-available-columns > div > table > tbody > tr ');
	}
	selectedColumns() {
		return cy.get('#rpt-selected-columns > div > table > tbody > tr');
	}
	dateRangeModal() {
		return cy.get('.date-range-target');
	}
	dateRangeDaysInput() {
		return cy.get('.k-formatted-value');
	}
	dateRangeNextDaysInput() {
		return cy.get(':nth-child(1) > .k-widget > .k-numeric-wrap > .k-formatted-value');
	}
	dateRangeNextDaysHiddenInput() {
		return cy.get("input[id^='relative-next-days']").invoke('attr', 'style', 'display: block');
	}
	dateRangePastDaysInput() {
		return cy.get(':nth-child(2) > .k-widget > .k-numeric-wrap > .k-formatted-value');
	}
	dateRangePastDaysHiddenInput() {
		return cy.get("input[id^='relative-past-days']").invoke('attr', 'style', 'display: block');
	}
	columnCheckbox(label) {
		return cy.get('label[class*="report-column-label"]').contains(label);
	}
	reportColumns() {
		return cy.get('#rpt-columns');
	}
	applyButton() {
		return cy.get('.btn-container.clearfix').contains('Apply');
	}
	currentSelectionColumnsDiv() {
		return cy.get('#rpt-selected-columns');
	}
	saveNameInput() {
		return cy.get('#popupTextContainer');
	}
	cancelButton() {
		return cy.get('#apprise-btn-undefined');
	}
	saveButton() {
		return cy.get('#apprise-btn-confirm');
	}
	subscriptionHeading() {
		return cy.get('#subscriptions-container > h3');
	}
	subscriptionFilenameInput() {
		return cy.get('#subscribed-file-name');
	}
	usersListDropdown() {
		return cy.get('.k-multiselect-wrap > .k-input');
	}
	scheduleDropdown() {
		return cy.get('#schedule-type');
	}
	scheduleSunday() {
		return cy.get('#Sun');
	}
	okButton() {
		return cy.get('#ok');
	}
	subscriptionTableData() {
		return cy.get('#current-subscribers-list > tbody > tr > td');
	}
	deleteSubscriptionLink() {
		return cy.get('#current-subscribers-list > tbody > tr > td > i[class="fa fa-times"]');
	}
	meetingDateDropdown() {
		return cy.get('.MeetingDateEditor');
	}
	meetingDateRange() {
		return cy.get("div[id^='date-range-target-']");
	}
	dateCriteriaDropdown() {
		return cy.get('#report-criteria-controls >div > h4');
	}
	meetingDateModal() {
		return cy.get('#date-range-target-MeetingDate');
	}
	dateCriteriaBetweenRadio() {
		return cy.get("input[id^='rdo-date-range-discrete']");
	}
	dateCriteriaStartDate() {
		return cy.get("input[id^='discrete-date-start']");
	}
	dateCriteriaEndDate() {
		return cy.get("input[id^='discrete-date-end']");
	}
	existingConfigurations() {
		return cy.get('#workflow-filter-list > div > div > ul > li');
	}
	existingConfigurationsLink() {
		return cy.get('#workflow-filter-list > div > div > ul > li:nth-child(1) > a').first();
	}
	deleteConfigurationsLink() {
		return cy.get('.dark-red.small.delete-btn');
	}
	reportExtensionSelect() {
		return cy.get('#report-adhoc-commands-container > div > select');
	}
	policyIdEditorModal() {
		return cy.get('#single-select-target-PolicyId');
	}
	policyIdRadio() {
		return cy.get('input[name="opt-PolicyId"]');
	}
	policyIdUpdate() {
		return cy.get('#btn-update-PolicyId');
	}
	reportId() {
		return cy.get('#rpt-report');
	}
	reportCriteriaSection() {
		return cy.get('#rpt-criteria');
	}
	reportSubscriptions() {
		return cy.get('#rpt-subscriptions');
	}
	voteComparisonModal() {
		return cy.get('#vote-comparsion-target');
	}
	voteComparisonCheckboxes() {
		return cy.get('#vote-comparison-checkbox-group > div');
	}
	voteComparisonUpdateButton() {
		return cy.get('#btn-VoteComparsion-update');
	}
	ballotStatsCheckbox() {
		return cy.get('#ava-stats-ballotstats');
	}
	meetingStatsCheckbox() {
		return cy.get('#ava-stats-meetingstats');
	}
	proposalCatCheckbox() {
		return cy.get('#ava-stats-proposalcat');
	}
	proposalStatsCheckbox() {
		return cy.get('#ava-stats-proposalstats');
	}
	proposalTextCheckbox() {
		return cy.get('#ava-stats-proposaltext');
	}
	proposalReasonCheckbox() {
		return cy.get('#ava-stats-proposalreason');
	}
	proposalRawDataCheckbox() {
		return cy.get('#ava-stats-rawdata');
	}
	reportPresentation() {
		return cy.get('#rpt-presentation');
	}
	reportPresentationInputHeader() {
		return cy.get('#ava-presentation-input-header');
	}
	reportPresentationInputFooter() {
		return cy.get('#ava-presentation-input-footer');
	}
	reportPresentationHeader() {
		return cy.get('#ava-presentation-header');
	}
	reportPresentationFooter() {
		return cy.get('#ava-presentation-footer');
	}
	reportTypes() {
		return cy.get("ul[data-bind='foreach: ReportsTypes']");
	}
	columnCheckboxByLabel(label) {
		return cy
			.get('.report-column-label')
			.contains(new RegExp('^' + label + '$'))
			.scrollIntoView()
			.prev();
	}
	currentSelectionColumnCheckboxByLabel(label) {
		return cy
			.get('#rpt-selected-columns')
			.find('.report-column-label')
			.contains(new RegExp('^' + label + '$'))
			.scrollIntoView()
			.prev();
	}
	availableSelectionColumnCheckboxByLabel(label) {
		return cy
			.get('#rpt-available-columns')
			.find('.report-column-label')
			.contains(new RegExp('^' + label + '$'))
			.scrollIntoView()
			.prev();
	}
}

module.exports = new reportingPage();
