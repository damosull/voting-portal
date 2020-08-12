describe('select a meeting and open research pdf link', function () {

    beforeEach(function () {
        cy.login(Cypress.env('External_Username'));
    });

    it(`select meeting and open PDF`, function () {
        cy.visit('/MeetingDetails/Index/980900');


        cy.get('#research-pdf-doc').should('have.attr', 'href', `#PdfResearchReport`)
            .should('be.visible');

        // if (Cypress.env('configFile') == 'smoke-prod') {

        //          cy.get('#formResearchApiDoc')
        //              .then((downloadLink) => {
        //              cy.request('POST', downloadLink).then((resp) => {

        cy.get('#formResearchApiDoc').invoke('attr', 'target', '').should('have.attr', 'target', '');

        cy.get('#research-html-doc').click();

        if (Cypress.env('configFile') == 'smoke-prod') {

            // cy.get('#research-pdf-doc').invoke('attr', 'href')
            //     .then((downloadLink) => {
            //         cy.request('POST', downloadLink).then((resp) => {

            //             expect(resp.status).to.eq(200);
            //             //expect(resp.headers).to.have.property('content-disposition').eql('attachment; filename=BallotStatusReport.pdf');
            //             expect(resp.headers).to.have.property('content-type').eql('application/pdf');
            //             expect(resp.headers).to.have.property('content-length').greaterThan(1);
            //             expect(resp.body).include('%PDF');


            //         });
            //     });
        }
    });
});


