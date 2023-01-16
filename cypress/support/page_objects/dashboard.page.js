class dashboardPage {

    pageTitle() { return cy.get('#dashboard-name') }
    pageBody() { return cy.get('body') }
    getLoadingSpinner() { return cy.get('.k-loading-text') }
    subscriptionsContainerAtTheBottom() { return cy.get('#subscriptions-container > h3') }
    deleteSubscriptionLink() { return cy.get('#current-subscribers-list > tbody > tr > td > i[class="fa fa-times"]') }
    okButton() { return cy.get('#apprise-btn-confirm') }
    addSubscriptionButton() { return cy.get('#subscriptions-container > div.collapse.expand-collapse > div > span > a') }
    addSubscriptionPopupTitle() { return cy.get('#subscriptions-container-modal-dyn_wnd_title') }
    addSubscriptionPopupUserInput() { return cy.get("input[aria-owns^='subscription-users-select_taglist']") }
    addSubscriptionPopupUserDropdown() { return cy.get('#subscription-users-select_listbox') }
    addSubscriptionPopupFilenameInput() { return cy.get('#subscribed-file-name') }
    addSubscriptionPopupScheduleDropdown() { return cy.get('#schedule-type') }
    addSubscriptionPopupEveryHoursDropdown() { return cy.get('#daily-every-hours') }
    addSubscriptionPopupRunAtDropdown() { return cy.get('#start-time-hour') }
    addSubscriptionPopupEndTimeDropdown() { return cy.get('#end-time-hour') }
    addSubscriptionPopupSubjectInput() { return cy.get('#dashboard-scubscription-detail-subject') }
    addSubscriptionPopupHeaderInput() { return cy.get('#dashboard-scubscription-detail-header') }
    addSubscriptionPopupFooterInput() { return cy.get('#dashboard-scubscription-detail-footer') }
    addSubscriptionPopupOkButton() { return cy.get('#ok') }
    toastMessage() { return cy.get('.toast-message') }
    sidebarLinks() { return cy.get('#workflow-filter-list > div > h5') }
    highlightedFilter() { return cy.get('.highlightedFilter') }
    saveAsButton() { return cy.get('#btn-report-save-as') }
    addWidgetButton() { return cy.get('#btn-dashboard-config-widgets') }
    exportButton() { return cy.get('#btn-report-export') }
    widgetsButton() { return cy.get('#anchor-nav > li:nth-child(4) > a') }
    sharingButton() { return cy.get('#anchor-nav > li:nth-child(5) > a') }
    subscriptionsButton() { return cy.get('#anchor-nav > li:nth-child(6) > a') }
    widgetModal() { return cy.get('div.row.handler.widget-header') }
    addWidgetCheckbox(value) { return cy.get(`#results-list > li > div > input[value='${value}']`) }
    applyButton() { return cy.get('#btn-apply-configure-columns') }
    previewsModalLabel() { return cy.get('div.clearfix.widget-settings-data > div.checkbox > label') }
    previewsModalTableRows() { return cy.get('.dashboard-documents-content > table >thead >tr') }
    tableData() { return cy.get('td') }
    widgetCheckboxLabels() { return cy.get('.clearboth.widget-settings-layout > div > select') }
    updateButton() { return cy.get('div.row.center > button.secondary.blue') }

}

module.exports = new dashboardPage()