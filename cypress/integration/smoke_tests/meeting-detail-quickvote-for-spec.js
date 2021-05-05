describe('Test QuickVote functionality in MeetingDetails page', function () {

  
    beforeEach(function () {
    sessionStorage.clear()
    cy.server();
    cy.route('POST', "**/Api/Data/WorkflowExpansion").as('WorkflowExpansion');
    cy.route('POST', "**/Api/Data/WorkflowSecuritiesWatchlists").as('WorkflowSecuritiesWatchlists')
    cy.route('POST', "**/Api/Data/Filters/CreateDraftFilter").as('filter')

    cy.loginExternal();
    cy.visit("/Workflow");
    cy.wait('@WorkflowExpansion');
    cy.wait('@WorkflowSecuritiesWatchlists');
});


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
    


    cy.get('table > tbody > tr').eq(2).within(() => {
    cy.get('[data-js="meeting-details-link"]').first().click({force: true});
    })
    cy.wait('@filter')

    cy.get('#btn-vote-now').should('be.visible');
    cy.get('#btn-take-no-action').should('be.visible');
    cy.get('#btn-instruct').should('be.visible');	
    

    
    //Do a Quickvote For to move meeting status to Voted
    cy.get('#quick-vote-container > span > span').click({force: true})
    cy.get('#quickVoteSelect').select('For',{force: true})
    cy.get('#btn-vote-now').click({force: true})
    cy.get('.app-wrapper').then(() => {
        
        cy.get('#vote-warnings-and-errors-modal',{timeout: 3000}).then($header => {
            if($header.is(':visible'))
            {
              cy.log('visible')
              cy.get('div.row.clearfix.floatright > button.btn.primary.gray').click({force: true},{timeout: 3000})
            cy.get('#btn-take-no-action').click({force: true})
            }
            else {
                cy.log('not visible')
            }
        })
       
    })
    cy.get('#btn-unlock').should('be.visible').should('have.text', 'Change Vote or Rationale');
    
});
});