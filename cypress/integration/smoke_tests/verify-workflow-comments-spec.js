
describe('Verify comments on the Workflow page', function () {

    beforeEach(function () {
    cy.server();
    cy.route('POST', "**/Api/Data/WorkflowExpansion").as('WorkflowExpansion');
    cy.route('POST', "**/Api/Data/WorkflowSecuritiesWatchlists").as('WorkflowSecuritiesWatchlists')

    cy.loginExternal();
    cy.visit("/Workflow");
    cy.wait('@WorkflowExpansion');
    cy.wait('@WorkflowSecuritiesWatchlists');

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

    //then select first Recommendations Pending Meeting
    cy.contains('td', 'Recommendations Pending').first()
    .siblings().find('[data-js="meeting-details-link"]').first().click({force: true});    
    
});
  it(`Add Comment to each Rationale,Save and verify toast message`, function () {
    
    cy.get('#btn-vote-now').should('be.visible');
    cy.get('#btn-take-no-action').should('be.visible');
    cy.get('#btn-instruct').should('be.visible');	

    //Iterate through Rationales,add text entry,Save and verify Toast message after each entry 
    cy.get('#md-votecard-grid-results > tr')
    .find('td.cell-with-rationale')
    .each(($el, $index) => {
       cy.wrap($el)
       .get(`tr:nth-child(${$index + 1}) > td.cell-with-rationale > div > div > span`).scrollIntoView().click({force: true})
       .get(`tr:nth-child(${$index + 1}) > td.cell-with-rationale > div > div > div > div.editable-input > textarea`).clear({force: true})
       .get(`tr:nth-child(${$index + 1}) > td.cell-with-rationale > div > div > div > div.editable-input > textarea`).type('test',{force: true})
       .get(`tr:nth-child(${$index + 1}) > td.cell-with-rationale > div > div > div > div.editable-input > div.editable-buttons > button.js-editable-submit.secondary.blue.btn-update`).click({force: true})
       cy.get('.toast-message',{timeout: 4000}).should('contain.text', 'Rationale saved');
       if ($index > 2)
       {
           return false
       }
       
    })
       cy.get('#meeting-note')
});
 
it(`Add Meeting Note and Post Private Comment`, function () {


  
    cy.get('#btn-vote-now').should('be.visible');
    cy.get('#btn-take-no-action').should('be.visible');
    cy.get('#btn-instruct').should('be.visible');	
    
    //Test Meeting note entry
    cy.get('#meeting-note').click();
    cy.get('#meeting-notes-input').clear();
    cy.get('#meeting-notes-input').type('The quick brown fox jumps over a lazy dog - ~!@#$%^&*-_=+[]|;,./<>? +')
    cy.get(`button[type='submit'`).click();
    cy.get('.toast-message').should('contain.text', 'Meeting note saved');

    //Post Private Comment
    cy.get('#adhoc-users-search-reply-comment_taglist > li').each(($el,index) => {
        cy.wrap($el)
        $el.get(`.k-button > :nth-child(${index}) > span`)
        cy.get(`#adhoc-users-search-reply-comment_taglist > li > span.k-icon.k-delete`).click({force: true});
        })

    cy.get(`textarea[name='Comment'`).type('hello CalPERS | ExtUser Patrick Corcoran')
    cy.get('#comment-viewable-type').select('Private')
    cy.get('#btn-post-comment').click({force: true});
    cy.get('.toast-message').should('contain.text', 'Comment saved');
});
}); 