/// <reference types="Cypress" />
import '../../support/commands.js';

describe('Watchlist Assignment tests', function () {
  beforeEach(function () {
    sessionStorage.clear();
    cy.intercept('POST', '**/Api/Data/WorkflowExpansion').as('WorkflowExpansion');
    cy.intercept('POST', '**/Api/Data/WorkflowSecuritiesWatchlists').as('WorkflowSecuritiesWatchlists');
    cy.intercept('POST', '**/Api/Data/Assignee/GetAvailableAssigneesForCustomer').as('AvailableAssigneesForCustomer');
    cy.loginExtAdm('Calpers');
    cy.visit('/Workflow');
    cy.wait('@WorkflowExpansion');
    cy.wait('@WorkflowSecuritiesWatchlists');
  });

  it('Create watchlist and assign', function () {
    cy.get('#btn-watchlists').click();
    cy.get('#btn-manage-watchlists').click({ force: true });
    cy.get('#content-wrapper > div.topbar.clearfix > div.floatleft > h1').should('be.visible');
    cy.get('#btn-create-new > a').click({ force: true });
    cy.randomString(6).then((data) => {
      cy.get('#popupTextContainer > input[type=text]').fill('Test Watchlist' + data);
    });
    cy.get('#apprise-btn-confirm').click();
    cy.get('#wlName').should('include.text', 'Test Watchlist');
    cy.get('#txtAddUser').fill('CalPERS | ExtAdmin Automation QaUat');
    cy.get('#WLMain > div:nth-child(2) > div:nth-child(2) > button').click({ force: true });
    cy.get('#workflow-filter-list > div > div').should('include.text', 'Test Watchlist');
  }); //end it

  it('Check assigned watchlist is in Assignees list', function () {
    cy.get('#btn-watchlists').click({ force: true });
    cy.get('.watchlist-search-input').fill('Test Watchlist', { force: true });
    cy.wait('@AvailableAssigneesForCustomer');
    cy.get('.floatleft > .scrollableContainer').should('include.text', 'Test Watchlist');
  });

  it('cleanup', function () {
    //cleanup remove the watchlist
    cy.get('#btn-watchlists').click();
    cy.get('#btn-manage-watchlists').click({ force: true });
    cy.get('.favourite-filters').find('li > a').find('span').contains('Test Watchlist').click();
    cy.get(':nth-child(1) > :nth-child(3) > .dark-red').click();
  }); // end cleanup it
}); //end describe
