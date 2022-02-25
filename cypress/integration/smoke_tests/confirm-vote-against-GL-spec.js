/* eslint-disable cypress/no-unnecessary-waiting */
describe('Confirm votes against Recommendations captured in filter criteria', function () {

    beforeEach(function () {
        sessionStorage.clear()
        cy.intercept('POST', "**/Api/Data/WorkflowExpansion").as('WorkflowExpansion');
        cy.intercept('POST', "**/Api/Data/WorkflowSecuritiesWatchlists").as('WorkflowSecuritiesWatchlists')
        cy.intercept('POST', "**/Api/Data/Filters/CreateDraftFilter").as('filter')
        cy.intercept('POST', "**/Api/Logger").as('controls')

        cy.loginWithAdmin('CALPERS');
        cy.visit("/Workflow");
        cy.wait('@WorkflowExpansion');
        cy.wait('@WorkflowSecuritiesWatchlists');
        cy.removeAllExistingSelectedCriteria()


    });

    it('Confirm votes against GL captured in filter criteria', function () {

        cy.AddCriteriaOption('decision', 'Decision Status')
        cy.selectValueFromCriteriaOption('.DecisionStatusEditor', 'value', 'Approved', '#btn-apply-criteria')
        cy.AddCriteriaOption('With', 'Votes With/Against Glass Lewis')
        cy.selectValueFromCriteriaOption('.WithAgainstGlassLewisEditor', 'name', 'opt-WithAgainstGlassLewis', '#btn-update-WithAgainstGlassLewis')

        //arrays to store GL recommendations and vote decisons
        let GLvals = []
        let Selected = []

        cy.get('table > tbody > tr').eq(0).within(() => {
            cy.get('[data-js="meeting-details-link"]').first().click({ force: true });
        })

        cy.get('#md-votecard-grid-results > tr').then(($rows) => {
            $rows.each((index, value) => {
                const rec = Cypress.$(value).find(`td:nth-child(4)`).text()
                if (rec.includes('Non Voting') || rec.includes('N/A')) {
                    //skip
                } else {
                    GLvals.push(rec)
                    var selected = Cypress.$(value).find(':selected').text();
                    Selected.push(selected)
                }

            })

            var diff = arraysEqual(GLvals, Selected);
            expect(diff).to.be.false


        });

    }); //end it


    it('Confirm votes against Management captured in filter criteria', function () {


        cy.AddCriteriaOption('decision', 'Decision Status')
        cy.selectValueFromCriteriaOption('.DecisionStatusEditor', 'value', 'Approved', '#btn-apply-criteria')
        cy.AddCriteriaOption('With', 'Votes With/Against Management')
        cy.selectValueFromCriteriaOption('.WithAgainstManagementEditor', 'name', 'opt-WithAgainstManagement', '#btn-update-WithAgainstManagement')


        //arrays to store Management recommendations and vote decisons
        let Mgmtvals = []
        let Selected = []

        cy.get('table > tbody > tr').eq(0).within(() => {
            cy.get('[data-js="meeting-details-link"]').first().click({ force: true });
        })

        cy.get('#md-votecard-grid-results > tr').then(($rows) => {
            $rows.each((index, value) => {
                const rec = Cypress.$(value).find(`td:nth-child(3)`).text()
                if (rec.includes('Non Voting') || rec.includes('N/A')) {
                    //skip
                } else {
                    Mgmtvals.push(rec)
                    var selected = Cypress.$(value).find(':selected').text();
                    Selected.push(selected)
                }
            })

            if (Mgmtvals == null || Selected == null) {
                cy.log('nulls')
            } else {
                cy.log(Mgmtvals)
                cy.log(Selected)
                var diff = arraysEqual(Mgmtvals, Selected);
                expect(diff).to.be.false
            }



        }); //end it


    }); // end describe */
    it('teardown', function () {

        //teardown 
        cy.loginWithAdmin('CALPERS');
        cy.visit("/Workflow");
        cy.wait('@WorkflowExpansion');
        cy.wait('@WorkflowSecuritiesWatchlists');
        cy.removeAllExistingSelectedCriteria()
    })

    //compare arrays
    function arraysEqual(a1, a2) {
        return JSON.stringify(a1) == JSON.stringify(a2);
    }
});