// Test Case 43760 - https://dev.azure.com/glasslewis/Development/_workitems/edit/43760

const { MEETINGID } = require('../../support/constants');
var idMeeting = [1085172,1082343];
var idCompany = [564097];
var issuerName = [];

describe('TC43760', () => {

    beforeEach(function () {
        cy.intercept('POST', '**/Api/Data/WorkflowExpansion').as('WorkflowExpansion');
        cy.intercept('POST', '**/Api/Data/WorkflowSecuritiesWatchlists').as('WorkflowSecuritiesWatchlists');
        cy.intercept('POST', '**/Api/Data/Assignee/GetAvailableAssigneesForCustomer').as('AvailableAssigneesForCustomer');
        cy.intercept('POST', '**/Api/Data/Filters/CreateDraftFilter').as('filter');
        cy.intercept('GET', '**/Api/Data/WorkflowResearchInfo/**').as('info');
        cy.intercept('GET', '**/Api/Data/MeetingDetails/GetFilters**').as('getfilters');
        cy.intercept('POST', '**/Api/Data/MeetingDetailsActivity/').as('activity');
        cy.intercept('POST', '**/Api/Data/VoteTally').as('votetally');
        cy.intercept('GET', '**/Api/Data/MeetingMaterials/**').as('materials');
        cy.intercept('GET', '**/Api/Data/Inbox/**').as('meetings');
        cy.intercept('GET', '**/Api/Data/RelatedMeetings/**').as('RelatedMeetings');
        cy.intercept('GET', '**/Api/Data/CompanyMeeting/**').as('CompanyMeeting');
        cy.intercept('POST', '**/Api/Data//MdData/GetAgenda').as('GetAgenda');

        cy.loginWithAdmin('CALPERS');
        cy.visit('/Workflow');
        cy.wait('@WorkflowExpansion');
        cy.wait('@WorkflowSecuritiesWatchlists');
        cy.removeAllExistingSelectedCriteria();
        cy.AddMultipleCriteria(['Decision Status']);
        cy.addCriteriaStatus(['Recommendations Pending']);
    }); // end BeforeEach


    it.skip('Verify user can navigate from meeting page to company page and the Meetings dropdown on the Company page associated Research links and Materials of the selected meeting are displayed.', () => {
        cy.log('Test Case 43760 - https://dev.azure.com/glasslewis/Development/_workitems/edit/43760');

        /* Click 'Next' button, get Meeting ID for that meeting and verify it is same meeting id as stored in a variable
         as second meeting id */
        cy.get('table > tbody > tr')
            .eq(4)
            .within(() => {
                cy.get('[data-js="meeting-details-link"]').first().click({ force: true });
            });
        cy.get('#link-next-meeting-id').click();
        cy.location('href').should('include', idMeeting[1]);

        /* Click Previous button, get Meeting ID for that meeting and verify it is same meeting id as stored in a variable as 
        first meeting id*/
        cy.get('#prev').click();
        cy.location('href').should('include', idMeeting[0]);

        // Navigate to Company Page, get company id and verify it is same company id as stored in a variable as first company id
        cy.wait(10000);
        cy.get('#company-navigate').click({ force: true });
        cy.wait(5000);
        cy.location('href').should('include', idCompany[0]);

        /* Click into Meetings dropdown on Company page and verify all listed items Meetings dropdown check for each in list
         includes the text '20' */
        cy.get('#btn-related-meetings-title-area > span').click();
        cy.get('.dropdown.related-meetings-list.open > ul > li').then(($rows) => {
            for (let i = 1; i < $rows.length - 1; i++) {
                const txt = '20';
                cy.get(`#related-meetings > li > ul > li:nth-child(${i + 1}) > a > span:nth-child(1)`).then(
                    (fn) => {
                        const fntxt = fn.text();
                        expect(fntxt).to.include('20')
                    });
            }
        });
    }); //end second it 
});  //end describe