import { When, And, Then } from "cypress-cucumber-preprocessor/steps"
import reportingPage from "../page_objects/reporting.page"

When('I navigate to the Reporting page', () => {
    cy.visit('/Reporting')
    cy.statusCode200('@REPORTS_CRITERIA') // last api call on the page
})

And('I select the {string} report', (reportType) => {
    cy.contains(reportType).click()
    reportingPage.getLoadingSpinner().should('not.exist')
})

Then('I can verify that the {string} column should {string}', (columnName, visibility) => {
    reportingPage.configureColumnsDropdown().should('be.visible').click()
    cy.log(typeof(visibility))
    cy.log(JSON.stringify(visibility))
    if (visibility === 'be visible') {
        visibility = 'contain'
    } else {
        visibility = 'not.contain'
    }
    cy.get('body').should(visibility, columnName)
})