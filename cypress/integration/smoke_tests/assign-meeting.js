/// <reference types="Cypress" />
import "../../support/commands.js";


describe('Watchlist Assignment tests',function(){

    beforeEach(function () {
        cy.server();
        cy.route('POST', "**/Api/Data/WorkflowExpansion").as('WorkflowExpansion');
        cy.route('POST', "**/Api/Data/WorkflowSecuritiesWatchlists").as('WorkflowSecuritiesWatchlists')
        cy.route('POST',"**/Api/Data/Assignee/GetAvailableAssigneesForCustomer").as('AvailableAssigneesForCustomer')
        cy.loginExternal();
        cy.visit("/Workflow");
        cy.wait('@WorkflowExpansion');
        cy.wait('@WorkflowSecuritiesWatchlists');
    })

    it('Create watchlist and assign',function(){
       cy.get('#btn-watchlists').click()
       cy.get('#btn-manage-watchlists').click({force: true})
       cy.get('#content-wrapper > div.topbar.clearfix > div.floatleft > h1').should('be.visible')
       cy.get('#btn-create-new > a').click({force: true})
       cy.randomString(6).then(data => {
       cy.get('#popupTextContainer > input[type=text]').type('Test Watchlist' + data)
       })
       cy.get('#apprise-btn-confirm').click();
       cy.get('#wlName').should('include.text','Test Watchlist')
       cy.get('#txtAddUser').type('CalPERS | ExtAdmin Automation QaUat')
       cy.get('#WLMain > div:nth-child(2) > div:nth-child(2) > button').click({force: true});
       cy.get('#workflow-filter-list > div > div').should('include.text','Test Watchlist')
    
    });  //end it

    it('Check assigned watchlist is in Assignees list',function(){
    
        cy.get('#btn-watchlists').click({force: true})
        cy.get('.watchlist-search-input').type('Test Watchlist',{force:true});
        cy.wait('@AvailableAssigneesForCustomer')
        cy.get('.floatleft > .scrollableContainer').should('include.text','Test Watchlist')
    });
    
    it('cleanup',function(){
             
        //cleanup remove the watchlist
        cy.get('#btn-watchlists').click()
        cy.get('#btn-manage-watchlists').click({force: true})
        cy.get('.favourite-filters')
        .find('li > a')
        .find('span').contains('Test Watchlist').click();
        cy.get(':nth-child(1) > :nth-child(3) > .dark-red').click();

    })   // end cleanup it
    });  //end describe 