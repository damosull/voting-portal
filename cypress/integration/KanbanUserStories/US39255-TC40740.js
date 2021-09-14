//Test Case 40724 - https://dev.azure.com/glasslewis/Development/_workitems/edit/40724
const { MEETINGID } = require("../../support/constants");

describe('US39255 tests', function () {
    beforeEach(function () {
        cy.viewport(1100, 900);
        cy.intercept('POST', '**/Api/Data/WorkflowExpansion').as('WorkflowExpansion');
        cy.intercept('POST', '**/Api/Data/WorkflowSecuritiesWatchlists').as('WorkflowSecuritiesWatchlists');
        cy.intercept('GET', '**/Api/Data/MeetingSecurityWatchlists/**').as('MeetingSecurityWatchlists')
        cy.intercept('POST', '**/Api/Data/Filters/CreateDraftFilter').as('filter');
        cy.intercept('POST', '**/Api/Data//MdData/GetAgenda').as('getagenda')
        cy.intercept('GET', '**/Api/Data/WorkflowResearchInfo/**').as('info')
        cy.intercept('GET', '**/Api/Data/MeetingDetails/GetFilters**').as('getfilters')
        cy.intercept('POST', '**/Api/Data/MeetingDetailsActivity/').as('activity')

        cy.loginExtAdm('Russell');
        cy.visit('/Workflow');
        cy.wait('@WorkflowSecuritiesWatchlists');
        cy.removeAllExistingSelectedCriteria();
    });

    it(`Verify Ballot section Pagination`, function () {

        //make sure all dates are current with this meeting id 
        cy.AddTenDaysToMeetingDates(MEETINGID.RBNCRP)


        //Step 4 - User Clicks on the valid company in the Workflow page
        cy.visit('MeetingDetails/Index/' + MEETINGID.RBNCRP)
        cy.wait('@getagenda')
        cy.wait('@MeetingSecurityWatchlists');

        const columns = [
            'Custodian Account Number',
            'Custodian Id',
            'Custodian Name',
            'Customer Account Name',
            'Customer Account Number'
        ];

        const columnLabels = [
            'BallotsGrid3',
            'BallotsGrid17',
            'BallotsGrid18',
            'BallotsGrid2',
            'BallotsGrid11'
        ];

        //Step 3 - User Clicks on 'Columns' button
        cy.get('#btn-mdballots-details-config-columns').click();
        cy.get('#ballots-configure-columns-target').invoke('attr', 'style', 'display: block');

        //Step 4 - Verify that the user enter a character(Eg : Say 'Cus') in the responsive search of the "Columns" Modal
        cy.get('#ballots-configure-columns-target-dynamic > .clearfix > #configure-columns-modal > .input > #txt-filter-col-name').type('Cus');


        columnLabels.forEach((column) => {
            cy.get(`label[for='${column}']`).should('be.visible')
        });

        cy.get('#currently-selected-criteria > ul > li').first().invoke('attr', 'style', 'display: block');
        columns.forEach((col) => {
            cy.get(`input[value='${col}']`).check({ force: true }).should('be.checked')
        });

        cy.get('#ballots-configure-columns-target-dynamic > .clearfix > #configure-columns-modal > .blue').click()

        //Step 5 - Navigate to the ballot section & click on the Columns button
        cy.get('#btn-mdballots-details-config-columns').click();
        cy.get('#ballots-configure-columns-target').invoke('attr', 'style', 'display: block');
        columns.forEach((col) => {
            cy.get(`input[value='${col}']`).should('be.checked')
        });

        //Step 6 - Verify that the Default Field 'Control Number' is not available in the 'Columns' modal 
        cy.get('#ballots-section #results-list li').then(($rows) => {
            $rows.each((index, value) => {
                const mname = Cypress.$(value).find(`label`).text();
                expect(mname).to.not.equal('Control Number')
            })
        })


    })

})