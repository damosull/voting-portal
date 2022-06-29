import {Given,When,And} from "cypress-cucumber-preprocessor/steps"
import workflowPage from "../page_objects/workflow.page"
const constants = require ('../constants')

Then('I can view the workflow page', ()=> {
    workflowPage.getPageHeading().contains('Upcoming Meetings')
})

And('I navigate back to the workflow page', ()=> {
    cy.visit('/Workflow')
    //Waiting for page load
    cy.stausCode200('@WORKFLOW_EXPANSION')
    cy.get('.k-loading-text', { timeout: 90000 }).should('not.exist')
})