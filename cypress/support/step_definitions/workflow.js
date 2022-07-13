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
    cy.stausCode200('@WORKFLOW_EXPANSION')
    workflowPage.waitForWorkflowPageLoad()
})

And('I remove all existing selected criteria', () => {
    cy.removeAllExistingSelectedCriteria();
})

And('I have added the criteria for {string} with status {string}', (criteria,status) => {
    cy.AddMultipleCriteria([criteria])
    cy.addCriteriaStatus([status])
    workflowPage.waitForWorkflowPageLoad()
})

And('I have added the criteria for {string} and selecting {string}', (criteria,status) => {
    cy.AddMultipleCriteria([criteria])
    cy.chooseCriteriaStatus([status])
    workflowPage.waitForWorkflowPageLoad()
})

When('I select the first available meeting', () => {
    cy.get('table > tbody > tr').eq(0).within(() => {
      cy.get('[data-js="meeting-details-link"]').first().click({ force: true });
    })
})

When('I select a random meeting', () => {
    workflowPage.tableRows().eq(Math.floor(Math.random() * 19)).within(() => {
      cy.get('[data-js="meeting-details-link"]').first().click()
    })
})

When('I navigate to {string} meeting', (company_name) => {
    
    cy.contains(company_name).click();

})