import { When, And, Then } from "cypress-cucumber-preprocessor/steps"
import workflowPage from "../page_objects/workflow.page"

Then('I can view the workflow page', ()=> {
    workflowPage.getPageHeading().contains('Upcoming Meetings')
    workflowPage.waitForWorkflowPageLoad()
    workflowPage.workflowMenuButton().should('exist')
})

And('I navigate to the workflow page', ()=> {
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
    cy.wait('@WORKFLOW_EXPANSION', {responseTimeout: 90000})
    workflowPage.waitForWorkflowPageLoad()
})

And('I have added the filter criteria {string}', (criteria) => {
    cy.AddMultipleCriteria([criteria])
})

And('I have added the criteria for {string} with status {string}', (criteria,status) => {
    cy.AddMultipleCriteria([criteria])
    workflowPage.criteriaHeadings().contains(criteria).click({ scrollBehavior: false })
    workflowPage.criteriaHeadings().contains(criteria).next().invoke('attr', 'style', 'display: block;').as('FILTER_CRITERIA')
    cy.get('@FILTER_CRITERIA').should('be.visible').within(() => {
        workflowPage.getInputBox().eq(0).should('be.visible').type(status, { scrollBehavior: false })
        workflowPage.criteriaOptionCheckbox().contains(status).click({ scrollBehavior: false })
        workflowPage.updateButtonForCheckbox().click({ scrollBehavior: false })
    })
    cy.wait('@WORKFLOW_EXPANSION', {responseTimeout: 90000})
    workflowPage.waitForWorkflowPageLoad()
})

And('I have added the criteria for {string} and checking the checkbox for {string}', (criteria,status) => {
    cy.AddMultipleCriteria([criteria])
    workflowPage.criteriaHeadings().contains(criteria).click({ scrollBehavior: false })
    workflowPage.criteriaHeadings().contains(criteria).next().invoke('attr', 'style', 'display: block;').as('FILTER_CRITERIA')
    cy.get('@FILTER_CRITERIA').should('be.visible').within(() => {
        workflowPage.criteriaOptionCheckbox().contains(status).click({ scrollBehavior: false })
        workflowPage.updateButtonForCheckbox().click({ scrollBehavior: false })
    })
    cy.wait('@WORKFLOW_EXPANSION', {responseTimeout: 90000})
    workflowPage.waitForWorkflowPageLoad()
})

And('I have added the criteria for {string} and selecting the radio button for {string}', (criteria,status) => {
    cy.AddMultipleCriteria([criteria])
    workflowPage.criteriaHeadings().contains(criteria).click({ scrollBehavior: false })
    workflowPage.criteriaHeadings().contains(criteria).next().invoke('attr', 'style', 'display: block;')
    workflowPage.criteriaOption().contains(status).next().check({ scrollBehavior: false })
    workflowPage.updateButton().click({ scrollBehavior: false })
    cy.wait('@WORKFLOW_EXPANSION', {responseTimeout: 90000})
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

And('I increase the meetings per page value to {string}', (pages) => {
    workflowPage.meetingsPerPageDropdown().select(pages, { force: true }).invoke('val').should('eq', pages)
})

When('I select a random meeting', () => {
    workflowPage.tableRows().its('length').then( n => {
        const meetingRows = n - 1
        const randomRow = Math.floor(Math.random() * meetingRows)
        workflowPage.tableRows().eq(randomRow).within(() => {
            workflowPage.companyNameLink().click({force: true})
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

When('I navigate to {string} meeting', (company_name) => {
    
    cy.contains(company_name).click();

})

When('I navigate to Customer search page', () => {
    workflowPage.adminLink().click()
    workflowPage.customersLink().click()
    cy.wait('@GET_CUSTOMER_DYNAMIC')
})

And('I filter for meetings without ballots', () => {
    workflowPage.ballotCriteriaFilter().click()
    workflowPage.meetingWithoutBallotsRadio().check()
    workflowPage.updateNumberOfBallotsButton().click()
    workflowPage.waitForWorkflowPageLoad()
})

When('I select {string} meetings from the top', (noOfMeetings) => {
    for (var i = 0; i < Number(noOfMeetings); i++) {
        workflowPage.meetingCheckbox().eq(i).should('not.be.visible').check({force: true})
    }
})

And('I scroll to the end of the meetings table', () => {
    for(let n = 0; n < 11; n ++){
        workflowPage.scrollEndButton().click({ waitForAnimations: false })
    }
})

And('I select {string} from the Quick Pick dropdown', (value) => {
    workflowPage.quickPickDropdown().click()
    workflowPage.quickPickModal().contains(value).click({force: true})
    workflowPage.quickPickModal().contains('Update').click({force: true})
    workflowPage.proceedButton().click()
    workflowPage.waitForWorkflowPageLoad()
})

Then('I should be able to see {string} in the column {string}', (column_value, column_name) => {
    switch (column_name) {
        case "Controversy Alert":
            column_value = new RegExp (column_value)
            workflowPage.controversyAlertTableData().each(($column) => {
                expect($column.text().trim()).to.match(column_value)
            })
            break
        default:
            break
    }
})

Then('I should be able to see a {string} named {string}', (fieldType, fieldName) => {
    cy.contains(fieldName).should('be.visible')
})

Then('I should be able to verify that the column {string} is {string}', (columnName, isChecked) => {
    workflowPage.columnsListButton().click()
    if (isChecked.includes('not')) {
        workflowPage.columnsListDiv().find(`input[value='${columnName}']`).should('not.be.checked')
    } else {
        workflowPage.columnsListDiv().find(`input[value='${columnName}']`).should('be.checked')
    }
})