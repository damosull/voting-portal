import { When, And, Then } from "cypress-cucumber-preprocessor/steps"
import workflowPage from "../page_objects/workflow.page"

Then('I can view the workflow page', ()=> {
    workflowPage.getPageHeading().contains('Upcoming Meetings')
    workflowPage.waitForWorkflowPageLoad()
    workflowPage.workflowMenuButton().should('exist')
})

And('I navigate back to the workflow page', ()=> {
    workflowPage.getWorkflowPage()
    workflowPage.getLoadingSpinner().should('exist')
    //Waiting for page load
    cy.statusCode200('@WORKFLOW_EXPANSION')
    workflowPage.waitForWorkflowPageLoad()
})

And('I remove all existing selected criteria', () => {
    cy.removeAllExistingSelectedCriteria()
    workflowPage.waitForWorkflowPageLoad()
})

And('I remove all existing selected criteria for the internal user', () => {
    cy.removeAllExistingSelectedCriteria(true)
    workflowPage.waitForWorkflowPageLoad()
})

When('I search for the customer {string}', (customerName) => {
    workflowPage.selectCustomerShadowInput().click({force: true}).type('{del}', {force: true})
    workflowPage.selectCustomerInput().clear({ force: true }).type(customerName)
    workflowPage.selectCustomerDropdown().should('be.visible')
    workflowPage.selectCustomerInput().type('{downarrow}{enter}')
    cy.wait('@WorkflowExpansion', {responseTimeout: 90000})
    workflowPage.waitForWorkflowPageLoad()
})

And('I have added the criteria for {string}', (criteria) => {
    cy.AddMultipleCriteria(criteria.split(','))
})

And('I have added the criteria for {string} with status {string}', (criteria,status) => {
    cy.AddMultipleCriteria([criteria])
    cy.addCriteriaStatus([status])
    workflowPage.waitForWorkflowPageLoad()
})

And('I have added the criteria for {string} and selecting {string}', (criteria,status) => {
    cy.AddMultipleCriteria([criteria])
    workflowPage.criteriaLabel().click()
    workflowPage.criteriaLabel().next().invoke('attr', 'style', 'display: block;')
    workflowPage.criteriaOption().contains(status).next().click()
    workflowPage.updateButton().click()
    workflowPage.waitForWorkflowPageLoad()
})

And('I have added the column {string}', (columnName) => {
    cy.checkColumnFieldApplyAndVerifyIsChecked(columnName)
})

When('I select the first available meeting', () => {
    workflowPage.tableRows().eq(0).within(() => {
        workflowPage.companyNameLink().click({ force: true });
    })
})

When('I select a random meeting', () => {
    workflowPage.tableRows().its('length').then( n => {
        const meetingRows = n - 1
        const randomRow = Math.floor(Math.random() * meetingRows)
        workflowPage.tableRows().eq(randomRow).within(() => {
            workflowPage.companyNameLink().click()
            cy.log(`Selected row number ${randomRow + 1} from the top`)
        })
    })
})

Then('I should be {string} to see the text {string} on the UI', (condition, text)=> {
    if (condition.includes('unable')) {
        workflowPage.getPageBody().should('not.contain',text)
    } else {
        workflowPage.getPageBody().should('contain',text)
    }
})