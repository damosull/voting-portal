import '../../../support/commands.js';
import  workflowPageItems from '../../../elements/pages/workflow/workflowPageItems'
import  watchlistPageItems from '../../../elements/pages/watchlist/watchlistPageItems'

const { USER } = require("../../../support/constants");
const workflowPage = new workflowPageItems();
const watchlistPage = new watchlistPageItems();
const testWatchlistName = 'Watchlist_Assignment_tests';
const testAdministrationUser = "CalPERS | ExtAdmin Automation QaUat"

describe('Watchlist Assignment tests', function () {
  before(function () {
    cy.loginWithAdmin(USER.CALPERS);
    cy.visit('/Workflow');
    cy.stausCode200('@INBOX');
    cy.stausCode200('@GET_AVAILABLE_ASSIGNEES_CUSTOMER'); // Last loaded API on tha page - ext
    
    // Delete created watchlist from the DB in the case of failed test
    deleteCreatedTestWatchlist();
  });

  after(() => {
    // Delete created watchlist from the DB
    deleteCreatedTestWatchlist();
    cy.logout();
  });

  it.only('Create watchlist and assign', function () {
    
    // Workflow page
    workflowPage.watchListDropDownButton().click();
    workflowPage.manageWatchListDropDownButton().click({ force: true });

    // Watchlist page
    cy.stausCode200('@WATCHLIST_SECURITIES'); // Last loaded API on tha page
  
    watchlistPage.createNewWatchlistButton().click({ force: true });
    watchlistPage.popupTextContainer().type(testWatchlistName);
    watchlistPage.saveButton().click()
    watchlistPage.newWatchListName().should('include.text', testWatchlistName);
    watchlistPage.administrationUserTextField().type(testAdministrationUser);

    cy.stausCode200('@WATCHLIST_IDENTITY_SEARCH'); // Waiting for dropdown appers

    watchlistPage.addAdministrationUserButton().click({ force: true });
    watchlistPage.watchListFilterList().should('include.text', testWatchlistName);

    // Workflow page - Check assigned watchlist is in Assignees list
    cy.visit('/Workflow');
    cy.stausCode200('@GET_AVAILABLE_ASSIGNEES_CUSTOMER'); // Last loaded API on tha page

    workflowPage.watchListDropDownButton().click({ force: true });
    workflowPage.watchlistSearchInput().type(testWatchlistName, { force: true });
    workflowPage.watchlistScrollableContainer().should('include.text', testWatchlistName);

  });

  function deleteCreatedTestWatchlist(){
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
      );
  };

});
