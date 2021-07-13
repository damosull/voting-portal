/// <reference types="cypress" />

// tslint:disable-next-line no-namespace
declare namespace Cypress {
  // tslint:disable-next-line interface-name
  interface Chainable<Subject> {
    /**
     * * Add a new status for the recently added criteria. E.g: "Voted", for criteria Decision Status.
     * @param statusToSearch Status(es) to be selected. It needs to be an array of strings
     * @param isReporting Flag indicating that you are calling the method in the Reporting option. Default option is False
     * @example Workflow => addCriteriaStatus(['Decision Status', 'Agenda Key'])
     * Reporting => addCriteriaStatus(['Decision Status', 'Agenda Key']], true)
     */
    addCriteriaStatus(statusToSearch?: object, isReporting?: boolean): Chainable<Element>;

    /**
     * * Delete an existing workflow filter.
     *  @param filterToDelete Filter to be deleted
     *  @example deleteMyFilter('Test Filter')
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
     * @example Workflow => AddMultipleCriteria(['Voted', 'Recommendations Pending'])
     * Reporting => AddMultipleCriteria(['Voted', 'Recommendations Pending'], true)
     */
    AddMultipleCriteria(searchText?: object, isReporting?: boolean): Chainable<Element>;

    /**
     * * Used to remove all the existing criteria
     * @param isInternal Flag indicating whether its an internal or external user. Default is False (external)
     * @example External User => removeAllExistingSelectedCriteria()
     * Internal User => removeAllExistingSelectedCriteria(true)
     */
    removeAllExistingSelectedCriteria(isInternal?: boolean): Chainable<Element>;

    /**
     * * Method used to save a new filter
     * @param filterName Name to be used in the new filter
     * @example saveFilter('Test Filter')
     */
    saveFilter(filterName?: string): Chainable<Element>;

    /**
     * * Delete an existing report configuration
     *  @param reportToDelete Report to be deleted
     *  @example deleteMyConfiguration('Test Configuration')
     */
    deleteMyConfiguration(reportToDelete?: string): Chainable<Element>;

    /**
     * * Logout from the application
     */
    logout(): Chainable<Element>;

    /**
     * * Click on the report type
     * @param report Name of the report to be used
     * @example selectReportType('Proxy Voting Activity')
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
     * @example assertFileProperties('ProxyVoteReport', 'xlsx')
     */
    assertFileProperties(configName?: string, fileExtension?: string): Chainable<Element>;

    /**
     * * Method to download the file locally
     */
    donwloadFileLocal(): Chainable<Element>;

    /**
     * * Verify header buttons [Vote], [Take no Action] and [Instruct]
     */
    verifyMeetingOptionButtons(): Chainable<Element>;
  }
}
