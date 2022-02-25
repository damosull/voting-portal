describe('select a meeting and download a research link', function () {

    beforeEach(function () {
        sessionStorage.clear()
        cy.loginWithAdmin('CALPERS');
    });

    it.skip(`download research link on meeting detail page`, function () {
        cy.visit('/MeetingDetails/Index/980900');

        // changing the target attribute for the form which will be used in the next click
        cy.get('#formResearchApiDoc').invoke('attr', 'target', '').should('have.attr', 'target', '');

        cy.get('#research-html-doc').click();

        if (Cypress.env('configFile') == 'smoke-prod') {

            cy.url().should('include', 'api.glasslewis.net/vp/?method_name=getReport&reportId=324602');
            cy.get('.companyname').should('contain.text', 'SUN PHARMACEUTICALS INDUSTRIES LIMITED');
        }
        else {
            cy.url().should('include', 'api')
                .should('include', 'glasslewis.net/error/filenotfound.php');
        }
    });
});


