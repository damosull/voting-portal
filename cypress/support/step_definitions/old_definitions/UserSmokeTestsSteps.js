import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps'
const loginPage = require ("../../page_objects/login.page")
const workflowPage = require ("../../page_objects/workflow.page")
const usersPage = require("../../page_objects/users.page")
const watchlistPage = require('../../page_objects/watchlist.page')
const testWatchlistName = 'Watchlist_Assignment_tests'
const testAdministrationUser = "CalPERS | ExtAdmin Automation QaUat"
const constants = require("../../constants")


Given('I am on the login page', () => {
  sessionStorage.clear()
  cy.visit('/')
})

When('I provide my username and password and sign in', () => {
  loginPage.usernameInput().type(constants.USER.AUTOMATIONINTERNAL)
  loginPage.passwordInput().type(constants.USER.PASSWORD.TEST_PASSWORD)
  loginPage.signInButton().click()
})

Then('I should be able to see the workflow page', () => {
  workflowPage.workflowMenuButton().should('exist')
})

When('I navigate to the users page', () => {
  // Workflow page
  workflowPage.cogIcon().click();
  workflowPage.users().click();
  // Users page
  cy.stausCode204('@LOGGER'); // Last loaded API on that page
})

And('I fill the required details for a new user and submit', () => {
  usersPage.addNewUserButton().click()
  usersPage.userFirstName().type(constants.TESTUSER.FIRSNAME)
  usersPage.userLastName().type(constants.TESTUSER.LASTNAME)
  usersPage.contactEmail().type(constants.TESTUSER.CONTACTEMAIL)
  usersPage.userType().select(constants.TESTUSER.TYPE)
  usersPage.customerNameDropDown().select(constants.TESTUSER.CUSTOMERNAME)
  usersPage.userRole().select(constants.TESTUSER.ROLE)
  usersPage.doneButton().click()
})

Then('the new user should be created successfully', () => {
  usersPage.successMessage().should('contain.text', constants.messages.toast.USER_CREATED_SUCCESSFULLY)
})

And('I cleanup the newly created user from the database to reuse the test script', () => {
  cy.sqlServer(
    `
    DELETE FROM GLP.dbo.UM_UserPreferences
    WHERE userID IN (
      SELECT userID FROM GLP.dbo.UM_User
      WHERE LoginID = '`+ constants.TESTUSER.CONTACTEMAIL +`'
      )
    DELETE FROM GLP.dbo.UM_User
    WHERE LoginID = '`+ constants.TESTUSER.CONTACTEMAIL +`'
    `
  )
})

And('I delete the created test watchlist from database', () => {
  cy.sqlServer(
    `
    DELETE FROM [GLP].[dbo].[PX_WatchListSecurity]
    WHERE WatchListID IN (
      SELECT WatchListID FROM [GLP].[dbo].[PX_WatchList]
      WHERE WatchListName = '` + testWatchlistName + `'
    )
    
    DELETE FROM [GLP].[dbo].[PX_WatchListUser]
    WHERE WatchListID in (
      SELECT WatchListID FROM [GLP].[dbo].[PX_WatchList]
      WHERE WatchListName = '` + testWatchlistName + `'
    )
    
    DELETE FROM [GLP].[dbo].[PX_WatchList]
    WHERE WatchListName = '` + testWatchlistName + `'
    `
  )
})

When('I navigate to the watchlist page', () => {
    // Workflow page
    workflowPage.watchListDropDownButton().click()
    workflowPage.manageWatchListDropDownButton().click({ force: true })
    // Watchlist page
    cy.stausCode200('@WATCHLIST_SECURITIES') // Last loaded API on the page
})

And('I create a new watchlist', () => {
  watchlistPage.createNewWatchlistButton().click({ force: true })
  watchlistPage.popupTextContainer().type(testWatchlistName)
})

And('I submit the watchlist', () => {
  watchlistPage.saveButton().click()
})

Then('I should be able to search for the new watchlist', () => {
  watchlistPage.newWatchListName().should('include.text', testWatchlistName)
})

And('I should be able to assign the watchlist successfully', () => {
  watchlistPage.administrationUserTextField().type(testAdministrationUser);
  cy.stausCode200('@WATCHLIST_IDENTITY_SEARCH'); // Waiting for dropdown appers
  watchlistPage.addAdministrationUserButton().click({ force: true })
  watchlistPage.watchListFilterList().should('include.text', testWatchlistName)
  // Workflow page - Check assigned watchlist is in Assignees list
  cy.visit('/Workflow')
  cy.stausCode200('@GET_AVAILABLE_ASSIGNEES_CUSTOMER') // Last loaded API on the page
  workflowPage.watchListDropDownButton().click({ force: true })
  workflowPage.watchlistSearchInput().type(testWatchlistName, { force: true })
  workflowPage.watchlistScrollableContainer().should('include.text', testWatchlistName)
})