//Test Case 40724 - https://dev.azure.com/glasslewis/Development/_workitems/edit/40724
const { MEETINGID } = require("../../support/constants");

describe('US39255 tests', function () {
    beforeEach(function () {
        cy.viewport(1100, 900);
        cy.intercept('POST', '**/Api/Data/WorkflowExpansion').as('WorkflowExpansion');
        cy.intercept('POST', '**/Api/Data/WorkflowSecuritiesWatchlists').as('WorkflowSecuritiesWatchlists');
        cy.intercept('POST', '**/Api/Data/Filters/CreateDraftFilter').as('filter');
        cy.intercept('POST', '**/Api/Data//MdData/GetAgenda').as('getagenda')
        cy.intercept('GET', '**/Api/Data/WorkflowResearchInfo/**').as('info')
        cy.intercept('GET', '**/Api/Data/MeetingDetails/GetFilters**').as('getfilters')
        cy.intercept('POST', '**/Api/Data/MeetingDetailsActivity/').as('activity')
        cy.intercept('POST', '**/Api/Data/VoteTally').as('votetally')
        cy.intercept('GET', '**/Api/Data/MeetingMaterials/**').as('materials')
        cy

        cy.loginExtAdm('Russell');
        cy.visit('/Workflow');

        cy.removeAllExistingSelectedCriteria();
    });

    it(`Verify Ballot section Pagination`, function () {

        //make sure all dates are current with this meeting id 
        cy.AddTenDaysToMeetingDates(MEETINGID.RLNCDRP)

        //Step 4 - User Clicks on the valid company in the Workflow page
        cy.visit('MeetingDetails/Index/' + MEETINGID.RLNCDRP)
        cy.wait('@getagenda', { timeout: 50000 })
        //cy.wait('@WorkflowSecuritiesWatchlists');
        cy.wait('@votetally')
        cy.wait('@materials')

        //Step 3 - verify the pagination default is set to '10'.
        cy.get('#ballots-grid > div.k-pager-wrap.k-grid-pager.k-widget > span.k-pager-sizes.k-label > span > select').invoke('attr', 'style', 'display: block');
        cy.get('#ballots-grid > div.k-pager-wrap.k-grid-pager.k-widget > span.k-pager-sizes.k-label > span > select').select('10', { timeout: 50000 })
        cy.get('#ballots-grid > div.k-pager-wrap.k-grid-pager.k-widget > span.k-pager-sizes.k-label > span > span > span.k-input').then(function (val) {
            const numBallots = val.text()
            expect(numBallots).to.equal('10')
        })

        cy.get('#ballots-grid > div.k-pager-wrap.k-grid-pager.k-widget > span.k-pager-sizes.k-label > span > select').find(':selected').should('have.text', '10')

        //Step 3 -Now click the pagination dropdown and change the pagination to 
        //cy.get('#ballots-grid > div.k-pager-wrap.k-grid-pager.k-widget > span.k-pager-sizes.k-label > span').invoke('attr', 'style', 'display: block');
        cy.SetPaginationAndVerify('50', 50);

        //Step 5 - Now click the pagination dropdown and change the pagination to 20 and log out of the application.
        cy.SetPaginationAndVerify('20', 20);

        cy.get('#logged-in-user').click()
        cy.get('#navlink--logout').click()


    })
    it(`Verify Ballot section Pagination after `, function () {

        //Step 6 - Log back into the voting portal and on Selecting the meeting verify the pagination in the ballot section should be saved as "20".
        cy.visit('MeetingDetails/Index/' + MEETINGID.RLNCDRP)
        cy.wait('@getagenda')

        cy.get('#ballots-grid > div.k-pager-wrap.k-grid-pager.k-widget > span.k-pager-sizes.k-label > span > span > span.k-input').then(function (val) {
            const numBallots = val.text()
            expect(numBallots).to.equal('10')
        })


        //Step7 - Set pagination to 50 and verify ballot displayed row count
        cy.SetPaginationAndVerify('50', 50);

        //Step 8 - Now change pagination  to "10" 
        cy.SetPaginationAndVerify('10', 10);

        cy.get('#logged-in-user').click()
        cy.get('#navlink--logout').click()


    })

})