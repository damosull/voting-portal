describe('Add Filters', function () {

    beforeEach(function () {
        cy.server();
        cy.route('POST', "**/Api/Data/WorkflowExpansion").as('WorkflowExpansion');
        cy.route('GET', "**/Scripts/EditorControls/Sustainalytics/**").as('SustainalyticsFilter');

        cy.login();
        cy.visit("/Workflow");
        cy.wait('@WorkflowExpansion');
    });

    const esgFilters = [{ 'criteria': 'ESG Risk Rating Assessment', 'editorButton': '#editorDiv1050', 'editorModal': '#sustainalytics-target-RiskCategory' },
    { 'criteria': 'ESG Risk Exposure Assessment', 'editorButton': '#editorDiv1051', 'editorModal': '#sustainalytics-target-OverallExposureCategory' },
    { 'criteria': 'ESG Risk Management Assessment', 'editorButton': '#editorDiv1052', 'editorModal': '#sustainalytics-target-OverallManagementCategory' },
    { 'criteria': 'ESG Risk Rating Percentile Global', 'editorButton': '#editorDiv1053', 'editorModal': '#sustainalytics-target-RiskPercentileUniverse' },
    { 'criteria': 'ESG Risk Rating Percentile Industry', 'editorButton': '#editorDiv1054', 'editorModal': '#sustainalytics-target-RiskPercentileIndustry' },
    { 'criteria': 'ESG Risk Rating Percentile Sub Industry', 'editorButton': '#editorDiv1055', 'editorModal': '#sustainalytics-target-RiskPercentileSubindustry' },
    { 'criteria': 'ESG Risk Rating Highest Controversy', 'editorButton': '#editorDiv1056', 'editorModal': '#sustainalytics-target-HighestControversyCategory' }];

    esgFilters.forEach((filter) => {

        it(`adds Sustainalytics ${filter.criteria} filter`, function () {

            cy.get(filter.editorButton).should('not.exist');
            cy.get(filter.editorModal).should('not.exist');

            cy.get('#btn-add-criteria').click();
            cy.get('#txt-filter-criteria').type(filter.criteria);
            cy.get(`input[value='${filter.criteria}']`).check({ force: true });
            cy.get('#btn-apply-criteria').click();

            cy.wait('@SustainalyticsFilter');

            cy.get(filter.editorButton).click();
            cy.get(filter.editorModal).should('be.visible');
        });
    });
});
