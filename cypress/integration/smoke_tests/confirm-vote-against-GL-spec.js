/* eslint-disable cypress/no-unnecessary-waiting */
describe('Confirm votes against Recommendations captured in filter criteria', function () {

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
   

    cy.RemoveCriteriaIfExists('#editorDiv10','#remove-editorDiv10')
    cy.RemoveCriteriaIfExists('#editorDiv49','#remove-editorDiv49')
    cy.RemoveCriteriaIfExists('#editorDiv51','#remove-editorDiv51')
 
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

    }); 
       
    }); //end it

it('Confirm votes against Management captured in filter criteria',function(){
    cy.RemoveCriteriaIfExists('#editorDiv10','#remove-editorDiv10')
    cy.RemoveCriteriaIfExists('#editorDiv49','#remove-editorDiv49')

    cy.selectAddCriteriaOption('decision','value','Approved','Decision Status','#btn-apply-criteria');
    cy.selectAddCriteriaOption('With','value','With/Against Management','With/Against Management','#btn-apply-criteria');

    //arrays to store Management recommendations and vote decisons
    let Mgmtvals = []
    let Selected = []

    cy.get('table > tbody > tr').eq(2).within(() => {
        cy.get('[data-js="meeting-details-link"]').first().click({force: true});
        })
   
        cy.get('#md-votecard-grid-results > tr').then(($rows) => {
            $rows.each((index, value) => {
            const rec = Cypress.$(value).find(`td:nth-child(3)`).text()
            if(rec.includes('Non Voting') || rec.includes('N/A'))
            {
              //skip
            } else {
            Mgmtvals.push(rec) 
            var selected = Cypress.$(value).find(':selected').text(); 
            Selected.push(selected)
            }     
        })

           var diff = arraysEqual(Mgmtvals,Selected);
           expect(diff).to.be.false
    
           //teardown 
           cy.visit("/Workflow");
           cy.wait('@WorkflowExpansion');
           cy.wait('@WorkflowSecuritiesWatchlists');
           cy.wait(3000)
           cy.RemoveCriteriaIfExists('#editorDiv10','#remove-editorDiv10')
           cy.RemoveCriteriaIfExists('#editorDiv49','#remove-editorDiv49')

    }); //end it

}); // end describe

//compare arrays
function arraysEqual(a1,a2) {
    return JSON.stringify(a1)==JSON.stringify(a2);
}
});