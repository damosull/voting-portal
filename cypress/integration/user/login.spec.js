/// <reference types="Cypress" />

// describe('Login Page',function(){
//     it('LogIn with a Internal Admin user',function(){
//         cy.visit("/");

//         var username = Cypress.env('Internal_Admin_Username');
//         var userpwd = Cypress.env('Internal_Admin_Password');
//         cy.get("input#username").type(username).should('have.value',username);

//         cy.get("input#password").type(userpwd);
//         cy.get("#btn-submit-login").click();

//         //Assert:
//         //1. Verify if session exists
//         cy.getCookie('DEV-session').should('exist');
//         //2. Verify if it lands in the Workflow page
//         cy.url().should('include','Workflow');
//     })
// })

describe('Login Page',function(){
    it('Logs in with a test user',function(){
        cy.visit("/");

        var username = Cypress.env('test_user_name');
        var userpwd = Cypress.env('test_user_password');
        cy.get("input#LOGIN_USERNAME").type(username).should('have.value',username);

        cy.get("#LOGIN_PASSWORD").type(userpwd);
        cy.get("#signin-button").click();

        cy.url().should('include','app.cfm');

    })
})