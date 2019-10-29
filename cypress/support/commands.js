// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add("login", (username = Cypress.env('Internal_Admin_Username'), password = Cypress.env('Internal_Admin_Password')) => {
    cy.request('/')
        .its('body')
        .then((body) => {
            // we can use Cypress.$ to parse the string body
            // thus enabling us to query into it easily
            const $html = Cypress.$(body);
            const csrf = $html.find("input[name=csrf-token]").val();

            cy.request({
                method: 'POST',
                url: '/Home/Authenticate/',
                headers: {
                    'CSRFToken': csrf
                },
                body: {
                    Username: username,
                    Password: password,
                }

            }).then((resp) => {
                expect(resp.status).to.eq(200);
                expect(resp.body.Succeded).to.be.true;
            });
        });
});
