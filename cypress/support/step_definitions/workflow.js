import { When, And, Then } from "cypress-cucumber-preprocessor/steps"
import workflowPage from "../page_objects/workflow.page"

Then('I can view the workflow page', ()=> {
    workflowPage.getPageHeading().contains('Upcoming Meetings')
    workflowPage.waitForWorkflowPageLoad()
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