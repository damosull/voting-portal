/// <reference types="Cypress" />

describe('Admin User funtionality tests',function(){

    beforeEach(function () {
        cy.server();
        cy.route('POST', "**/Api/Data/WorkflowExpansion").as('WorkflowExpansion');
        cy.route('POST', "**/Api/Data/WorkflowSecuritiesWatchlists").as('WorkflowSecuritiesWatchlists')
    
        cy.login();
        cy.visit("/Workflow");
        cy.wait('@WorkflowExpansion');
        cy.wait('@WorkflowSecuritiesWatchlists');
    })
    it('Create Calpers User',function(){
      
        cy.get('#admin-link-container > a > span').click({force: true})
        cy.get('#navlink--users').click({force: true})
        cy.get('.gl-btn').contains('Add New User').trigger('mouseover').click();
        cy.get('#btn-add-new-user',{ timeout: 40000 }).click({force: true})
        let randomString = generateString(6);
        cy.get('#UserFirstName').type(randomString)
        cy.get('#UserLastName').type(randomString)
        cy.get('#UserType').select('External',{force: true})
        cy.get('#ContactEmail').type(randomString + '@abc.com')
        cy.get('tbody > tr > td > select').eq(0).select('California Public Employee Retirement System (CalPERS)',{force: true})
        cy.get('tbody > tr > td > select').eq(1).select('User',{force: true})
        cy.get('.button-primary.blue').contains('Done').click();
        cy.get('.toast-message').should('contain.text', 'User created successfully');
        
    })
})

const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

function generateString(length) {
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
