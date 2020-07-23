describe('Configure columns', function () {

    beforeEach(function () {
        cy.server();
        cy.route('POST', "**/Api/Data/WorkflowExpansion").as('WorkflowExpansion');

        cy.login();
        cy.visit("/Workflow");
        cy.wait('@WorkflowExpansion');
    });

    const esgColumns = ['ESG Risk Rating Assessment', 'ESG Risk Exposure Assessment', 'ESG Risk Management Assessment',
        'ESG Risk Rating Percentile Global', 'ESG Risk Rating Percentile Industry', 'ESG Risk Rating Percentile Sub Industry',
        'ESG Risk Rating Highest Controversy'];

    it(`adds Sustainalytics ESG columns`, function () {

        cy.get('#btn-workflow-config-columns').click();

        esgColumns.forEach((column) => {
            cy.get('#txt-filter-col-name').type(column);
            cy.get(`input[value='${column}']`).check({ force: true });
            cy.get('#txt-filter-col-name').clear();
        });
        cy.get('#btn-apply-configure-columns').click();

        cy.wait('@WorkflowExpansion');
        cy.get('#btn-scroll-end').click();

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