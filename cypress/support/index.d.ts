/// <reference types="cypress" />

// tslint:disable-next-line no-namespace
declare namespace Cypress {
  // tslint:disable-next-line interface-name
  interface Chainable<Subject> {
    /**
     * * Add a new status for the recently added criteria. E.g: "Voted", for criteria Decision Status.
     * @param statusToSearch Status(es) to be selected. It needs to be an array of strings
     * @param isReporting Flag indicating that you are calling the method in the Reporting option. Default option is False
     * @example Workflow => cy.addCriteriaStatus(['Decision Status', 'Agenda Key'])
     * Reporting => cy.addCriteriaStatus(['Decision Status', 'Agenda Key']], true)
     */
    addCriteriaStatus(statusToSearch?: object, isReporting?: boolean): Chainable<Element>;

    /**
     * * Delete an existing workflow filter.
     *  @param filterToDelete Filter to be deleted
     *  @example cy.deleteMyFilter('Test Filter')
     */
    deleteMyFilter(filterToDelete?: string): Chainable<Element>;

    /**
     * * Click on the first meeting available in the workflow list
     */
    selectFirstMeeting(): Chainable<Element>;

    /**
     * * Add new criteria(s) to the search
     * @param searchText Criteria(s) to be selected. It needs to be an array of strings
     * @param isReporting Flag indicating that you are calling the method in the Reporting option. Default option is False (workflow)
     * @example Workflow => cy.AddMultipleCriteria(['Voted', 'Recommendations Pending'])
     * Reporting => cy.AddMultipleCriteria(['Voted', 'Recommendations Pending'], true)
     */
    AddMultipleCriteria(searchText?: object, isReporting?: boolean): Chainable<Element>;

    /**
     * * Used to remove all the existing criteria
     * @param isInternal Flag indicating whether its an internal or external user. Default is False (external)
     * @example External User => cy.removeAllExistingSelectedCriteria()
     * Internal User => cy.removeAllExistingSelectedCriteria(true)
     */
    removeAllExistingSelectedCriteria(isInternal?: boolean): Chainable<Element>;

    /**
     * * Method used to save a new filter
     * @param filterName Name to be used in the new filter
     * @example cy.saveFilter('Test Filter')
     */
    saveFilter(filterName?: string): Chainable<Element>;

    /**
     * * Delete an existing report configuration
     *  @param reportToDelete Report to be deleted
     *  @example cy.deleteMyConfiguration('Test Configuration')
     */
    deleteMyConfiguration(reportToDelete?: string): Chainable<Element>;

    /**
     * * Logout from the application
     */
    logout(): Chainable<Element>;

    /**
     * * Click on the report type
     * @param report Name of the report to be used
     * @example cy.selectReportType('Proxy Voting Activity')
     */
    selectReportType(report?: string): Chainable<Element>;

    /**
     * * Internal login
     * @param username
     * @param password
     */
    login(username?: string, password?: string): Chainable<Element>;

    /**
     * * External login
     * @param username
     * @param password
     */
    loginExternal(username?: string, password?: string): Chainable<Element>;

    /**
     * * Method to parse an excel file
     * @param filePath Path and name of the .xlxs file
     * @example cy.parseXlsx('cypress/downloads/File.xlsx').then((xlxsData) => {})
     */
    parseXlsx(filePath?: string): Chainable<Element>;

    /**
     * * Method to verify the headers of the API request to start the download of a file
     * @param configName Name of the report
     * @param fileExtension Extension of the report
     * @example cy.assertFileProperties('ProxyVoteReport', 'xlsx')
     */
    assertFileProperties(configName?: string, fileExtension?: string): Chainable<Element>;

    /**
     * * Method to download the file locally
     */
    donwloadFileLocal(): Chainable<Element>;

    /**
     * * Verify header buttons [Vote], [Take no Action] and [Instruct]
     * @param none
     */
    verifyMeetingOptionButtons(): Chainable<Element>;

    /**
     * * Database script to add 10 days to all date entries in the meeting ID passed in
     * @param none
     */
    AddTenDaysToMeetingDates(query?: string): Chainable<Element>;

    /**
     * * Execute a query against the "GLP" database
     * @param query Query to be exeucted. You use a then() to wrap up the result and use in the tests.
     * @example cy.executeQuery('SELECT * FROM AA_Account WHERE AccountID = 1').then((result) => {console.log(result)})
     */
    executeQuery(query?: string): Chainable<Element>;

    /**
     * * It selects a file type/extension for the Reports
     * @param extension "PDF", "CSV", "XLS", "XLSX", "DOC"
     * @example cy.selectReportExtension('xls')
     */
    selectReportExtension(extension?: string): Chainable<Element>;

    /**
     * * Log in the application using cy.session (stores the cookie for subsequent executions)
     * @param username Username to log in the application
     * @example cy.loginSession(USER.CALPERS)
     */
    loginSession(user?: string): Chainable<Element>;

    /**
     * * Basic method to ensure a meeting has loaded (not applicable in all cases).
     * * It could fail depending on the data the meeting loaded, hence, two lines commented out
     * @param none
     */
    waitForMeetingToLoad(): Chainable<Element>;
  }
}
