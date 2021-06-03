describe('verify workflow page elements (TestCase - 28351)', function () {

    beforeEach(function () {
        sessionStorage.clear()
        cy.server();
        cy.route('POST', "**/Api/Data/WorkflowExpansion").as('WorkflowExpansion');
        cy.route('POST', "**/Api/Data/WorkflowSecuritiesWatchlists").as('WorkflowSecuritiesWatchlists')

        cy.login();
        cy.visit("/Workflow");
        cy.wait('@WorkflowExpansion');
        cy.wait('@WorkflowSecuritiesWatchlists');
    });
    it(`verify pre-set filters`, function () {

        cy.get('#btn-date-modal').contains('Next 30 Days').should('be.visible');
        cy.get('#editorDiv1000 > h4').contains('Number of Ballots > 0').should('be.visible');
        cy.get('#system-filters').contains('Upcoming Meeting').should('have.class', 'highlightedFilter');
        cy.get('#my-filters-and-directories > ul').should('be.empty');
        cy.get('#btn-manage-filters').click();
        cy.url().should('include', '/ManageFilters');
        cy.get('#my-filtersand-folders > ul').should('be.empty');
		
    });
    //skipping test while investigating failure
	it.skip(`verify filter columns are correctly displayed and in the correct order`, function () {


        const filterColumns = ['Company Name','Agenda Key','Policy ID','Control Number','Decision Status','Security Country of Trade','Deadline Date','Meeting Date','Record Date','Meeting Type','Shares','Ballot Blocking'];
        cy.visit('/Workflow');
        cy.wait('@WorkflowExpansion');
        cy.get('#btn-scroll-end').click({force:true});

        filterColumns.forEach((column) => { cy.get(`th[data-title='${column}']`).scrollIntoView().should('be.visible'); });
    });

});