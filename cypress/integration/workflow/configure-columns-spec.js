describe('Configure columns', function () {

    beforeEach(function () {
        cy.server();
        cy.route('POST', "**/Api/Data/WorkflowExpansion").as('WorkflowExpansion');

        cy.login();
        cy.visit("/Workflow");
        cy.wait('@WorkflowExpansion');
    });

    it(`adds and verifies the first four available Sustainalytics ESG columns`, function () {

        const esgColumns = ['ESG Risk Rating Percentile Global', 'ESG Risk Rating Percentile Industry', 'ESG Risk Rating Percentile Sub Industry',
            'ESG Risk Rating Highest Controversy'];

        cy.get('#btn-workflow-config-columns').click();

        esgColumns.forEach((column) => {
            cy.get('#txt-filter-col-name').type(column);
            cy.get(`input[value='${column}']`).check({ force: true });
            cy.get('#txt-filter-col-name').clear();
        });
        cy.get('#btn-apply-configure-columns').click();

        cy.wait('@WorkflowExpansion');
        cy.get('#btn-scroll-end').click({waitForAnimations: false});

        esgColumns.forEach((column) => { cy.get(`th[data-title='${column}']`).should('be.visible'); });
    });

    it(`adds and verifies the remaining three Sustainalytics ESG columns `, function () {

        const esgColumns = ['ESG Risk Rating Assessment', 'ESG Risk Exposure Assessment', 'ESG Risk Management Assessment'];

        cy.get('#btn-workflow-config-columns').click();

        esgColumns.forEach((column) => {
            cy.get('#txt-filter-col-name').type(column);
            cy.get(`input[value='${column}']`).check({ force: true });
            cy.get('#txt-filter-col-name').clear();
        });
        cy.get('#btn-apply-configure-columns').click();

        cy.wait('@WorkflowExpansion');
        cy.get('#btn-scroll-end').click({waitForAnimations: false});

        esgColumns.forEach((column) => { cy.get(`th[data-title='${column}']`).should('be.visible'); });
    });


    it('removes a column', function () {

        const column = 'Agenda Key';

        cy.get(`th[data-title='${column}']`).should('be.visible');

        cy.get('#btn-workflow-config-columns').click();
        cy.get(`input[value='${column}']`).first().uncheck({ force: true });
        cy.get('#btn-apply-configure-columns').click();
        cy.wait('@WorkflowExpansion');

        cy.get(`th[data-title='${column}']`).should('not.exist');
    });
});
