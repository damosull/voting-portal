import { When, And, Then } from "cypress-cucumber-preprocessor/steps"
import workflowPage from "../page_objects/workflow.page"

Then('I can view the workflow page', ()=> {
    workflowPage.getPageHeading().contains('Upcoming Meetings')
    workflowPage.waitForWorkflowPageLoad()
})

And('I navigate back to the workflow page', ()=> {
    workflowPage.getWorkflowPage()
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

When('I select the first available meeting', () => {
    cy.selectFirstMeeting()
})