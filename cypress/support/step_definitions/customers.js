import { And } from "cypress-cucumber-preprocessor/steps"
import customersPage from "../page_objects/customers.page"
import customerDetailsPage from "../page_objects/customerDetails.page"

And('I search for customer with name {string}', (customerName)=> {
    customersPage.addCriteria().should('be.visible')
    customersPage.customerNamePopUp().invoke('attr', 'style', 'display: block')
    customersPage.customerNameInput().type(customerName)
    cy.wait('@POST_CUSTOMER_DYNAMIC')
    customersPage.customerNameSearchResultsSelectedOption().should('be.visible').click()
    customersPage.customerNameInput().type('{ENTER}')
    //Click Update button
    customersPage.customerNameSearchUpdateButton().click()
    //Click the customer name to go into the customer settings
    customersPage.customerNameLinks().eq(0).click()
    customerDetailsPage.customerNameLabel().should('be.visible')
})