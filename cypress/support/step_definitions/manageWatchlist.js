import { When, Then, And } from "cypress-cucumber-preprocessor/steps"
import watchlistPage from "../page_objects/watchlist.page"
import workflowPage from "../page_objects/workflow.page"
const constants = require('../constants')

When('I navigate to the manage watchlist page', () => {
    cy.visit('/ManageWatchlists')
})

Then('I verify that all the relevant API calls for manage watchlist page are made', () => {
    //4 API Calls
    cy.statusCode200('@CURRENT_USER')
    cy.statusCode200('@SEARCH_TOOLBAR')
    cy.statusCode200('@WATCHLIST')
    cy.statusCode200('@WATCHLIST_SECURITIES')
})

And('I create a new watchlist', () => {
    watchlistPage.createNewWatchlistButton().click({ force: true })
    watchlistPage.popupTextContainer().type(constants.testWatchlistName)
})

And('I submit the watchlist', () => {
    watchlistPage.saveButton().click()
})

Then('I should be able to search for the new watchlist', () => {
    watchlistPage.newWatchListName().should('include.text', constants.testWatchlistName)
})

And('I should be able to assign the watchlist successfully', () => {
    const testAdministrationUser = "CalPERS | ExtAdmin Automation QaUat"
    watchlistPage.administrationUserTextField().type(testAdministrationUser);
    cy.statusCode200('@WATCHLIST_IDENTITY_SEARCH'); // Waiting for dropdown appers
    watchlistPage.addAdministrationUserButton().click({ force: true })
    watchlistPage.watchListFilterList().should('include.text', constants.testWatchlistName)
    // Workflow page - Check assigned watchlist is in Assignees list
    cy.visit('/Workflow')
    cy.statusCode200('@GET_AVAILABLE_ASSIGNEES_CUSTOMER') // Last loaded API on the page
    workflowPage.watchListDropDownButton().click({ force: true })
    workflowPage.watchlistSearchInput().type(constants.testWatchlistName, { force: true })
    workflowPage.watchlistScrollableContainer().should('include.text', constants.testWatchlistName)
})