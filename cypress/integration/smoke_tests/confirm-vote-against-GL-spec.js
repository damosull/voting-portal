describe('Confirm votes against GL captured in filter criteria', function () {

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
   
    //remove filter criteria if existing
    cy.get("body").then($body => {
        if ($body.find('#editorDiv10').length > 0) {   
           cy.get('#remove-editorDiv10').click(); 
        }
    });
    cy.get("body").then($body => {
        if ($body.find('#editorDiv51').length > 0) {   
           cy.get('#remove-editorDiv51').click(); 
        }
    });
});

    it('Confirm votes against GL captured in filter criteria',function(){

    cy.selectAddCriteriaOption('decision','value','Approved','Decision Status','#btn-apply-criteria');
    cy.selectAddCriteriaOption('With','name','opt-WithAgainstGlassLewis','With/Against Glass Lewis','#btn-update-WithAgainstGlassLewis');

    //arrays to store GL recommendations and vote decisons
    let GLvals = []
    let Selected = []

    cy.get('table > tbody > tr').eq(2).within(() => {
        cy.get('[data-js="meeting-details-link"]').first().click({force: true});
        })
   
        cy.get('#md-votecard-grid-results > tr').then(($rows) => {
            $rows.each((index, value) => {
            const rec = Cypress.$(value).find(`td:nth-child(4)`).text()
            if(rec.includes('Non Voting') || rec.includes('N/A'))
            {
              //skip
            } else {
            GLvals.push(rec) 
            var selected = Cypress.$(value).find(':selected').text(); 
            Selected.push(selected)
            }     
        })
        
           var diff = arraysEqual(GLvals,Selected);
           expect(diff).to.be.false
        
           //teardown 
           cy.visit("/Workflow");
           cy.wait('@WorkflowExpansion');
           cy.wait('@WorkflowSecuritiesWatchlists');
           cy.wait(3000)
           cy.RemoveCriteriaIfExists('#editorDiv10','#remove-editorDiv10')
           cy.RemoveCriteriaIfExists('#editorDiv51','#remove-editorDiv51')

    }); //end it

        //compare arrays
        function arraysEqual(a1,a2) {
        return JSON.stringify(a1)==JSON.stringify(a2);
    }
}); //end fn

}); // end describe