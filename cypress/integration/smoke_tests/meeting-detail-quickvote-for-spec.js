describe('Test QuickVote functionality in MeetingDetails page', function () {

  
    beforeEach(function () {
    cy.server();
    cy.route('POST', "**/Api/Data/WorkflowExpansion").as('WorkflowExpansion');
    cy.route('POST', "**/Api/Data/WorkflowSecuritiesWatchlists").as('WorkflowSecuritiesWatchlists')

    cy.login();
    cy.visit("/Workflow");
    cy.wait('@WorkflowExpansion');
    cy.wait('@WorkflowSecuritiesWatchlists');
});

//
it(`QuickVote on first Recommended Pending meeting`, function () {


    //in the case where there may be no Recommendations Pending on the 
    //first page..filter Decisions for Recommendations Pending
    cy.get("body").then($body => {
        if ($body.find('#editorDiv10').length > 0) {   
           cy.get('#remove-editorDiv10').click(); 
        }
    });
    cy.get('#btn-add-criteria').click({waitForAnimations: false});
    cy.get('#txt-filter-criteria').type('decision');
    cy.get(`input[value='Decision Status']`).check({ force: true });
    cy.get('#btn-apply-criteria').click();
    cy.get('#editorDiv10').click()
    cy.get(`input[value='AwaitingResearch']`).check({ force: true });
    cy.get('#btn-update-DecisionStatus').click({force: true});
    //cy.get('#remove-editorDiv10').click();



    //select first Recommendations Pending meeting 
    cy.contains('td', 'Recommendations Pending').first()
    .siblings().find('[data-js="meeting-details-link"]').first().click({force: true});    
    cy.get('#btn-vote-now').should('be.visible');
    cy.get('#btn-take-no-action').should('be.visible');
    cy.get('#btn-instruct').should('be.visible');	

    //Do a Quickvote For to move meeting status to Voted
    cy.get('#quick-vote-container > span > span').click({force: true})
    cy.get('#quickVoteSelect').select('For',{force: true})
    cy.get('#btn-vote-now').click({force: true})
    cy.get('#btn-unlock').should('be.visible').should('have.text', 'Change Vote or Rationale');
    
});
});