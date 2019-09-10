/// <reference types="Cypress" />

describe('Login Page',function(){
    it('LogIn with a Internal Admin user',function(){
        cy.visit("/");

        var username = Cypress.env('Internal_Admin_Username');
        var userpwd = Cypress.env('Internal_Admin_Password');
        cy.get("input#username").type(username).should('have.value',username);

        cy.get("input#password").type(userpwd);
        cy.get("#btn-submit-login").click();

        //Assert:
        //1. Verify if it lands in the Workflow page
        cy.url().should('include','Workflow');
        //2. Verify if session exists
        cy.getCookie('DEV-session').should('exist');
    })
})