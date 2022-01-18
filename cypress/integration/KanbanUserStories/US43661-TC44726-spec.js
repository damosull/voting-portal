// Test Case 44726 : https://dev.azure.com/glasslewis/Development/_workitems/edit/44726
import { MEETINGID } from "../../support/constants";
import '../../support/commands.js';
const unixTime = Math.floor(Date.now() / 1000);
//var settings //= `?&pCustomerID=544&_=${unixTime}`;

describe('User Story US43661 tests', function () {
    beforeEach(function () {
        cy.viewport(1100, 900);
        cy.intercept('POST', '**/Api/Data/WorkflowExpansion').as('WorkflowExpansion');
        cy.intercept('POST', '**/Api/Data/WorkflowSecuritiesWatchlists').as('WorkflowSecuritiesWatchlists');
        cy.intercept('GET', '**/Api/Data/MeetingSecurityWatchlists/**').as('MeetingSecurityWatchlists')
        cy.intercept('POST', '**/Api/Data//MdData/GetAgenda').as('getagenda')
        cy.intercept('POST', '**/Api/Data/VoteRequestValidation').as('validation')


    });
    it.skip(`Live ballots with meeting date for past ballots whose meeting date has passed/Revote and no rationale entered for vote against policy`, function () {

        cy.loginInternalAdm('AutomationInternal');
        cy.visit('/Workflow');

        //Alias csrf token
        cy.wait('@WorkflowExpansion').then((resp) => {
            var csrftoken = resp.request.headers.csrftoken;
            cy.wrap(csrftoken).as('csrftoken');
        });
        cy.wait('@WorkflowSecuritiesWatchlists');

        //get customer ID
        cy.getCustomerIDFromDB('Russell Investments').as('custid')

        //verify CanModifyVotesRationaleAfterMeetingDate = true
        //& RequireRationaleVap = true for Customer
        cy.get('@custid').then(function (cid) {
            const settings = `?&pCustomerID=${cid}&_=${unixTime}`;
            cy.TurnOnCustomerSetting(settings, 'CanModifyVotesRationaleAfterMeetingDate')
            cy.TurnOnCustomerSetting(settings, 'RequireRationaleVap')
        });
        cy.logout()

        //Step 2 Login as Russell Ext Admin User
        cy.loginExtAdm('Russell');
        cy.visit('/Workflow');
        cy.wait('@WorkflowSecuritiesWatchlists');
        cy.removeAllExistingSelectedCriteria();

        //Step 3 - Open VAP meeting and change meeting date to today -10 days
        cy.SetMeetingDateXdaysFromCurrent(MEETINGID.RSNCVAP2, -10)

        cy.visit('MeetingDetails/Index/' + MEETINGID.RSNCVAP2)
        cy.wait('@getagenda')
        cy.wait('@MeetingSecurityWatchlists');

        cy.get('#btn-unlock').should('be.visible').should('have.text', 'Change Vote or Rationale').click({ force: true });
        cy.verifyMeetingOptionButtons();

        //Step 4 -
        //For any proposals that the vote option is against policy,clear the rational field and enter rationales for all
        //other votes - Note : Always ignore Non-Voting proposals
        cy.ClearRationaleForVAPEntriesAndAddRationaleVotingWithPolicy()

        //Step 5 - user clicks on vote/revote button
        cy.get('#btn-vote-now').click()
        //cy.wait('@validation')
        //check override checkbox 
        cy.get('[data-bind="visible: override.votedBallotsBoxVisible"] > .ccb').click()

        // Step 6 - Proceed button should be disabled
        cy.get('.floatright > .green').should('be.not.visible')

        //Then there should be a warning message that states "You are voting against policy for proposal X"
        cy.get('[data-bind="visible: requireNoteOnVam|| requireNoteOnVap"] > :nth-child(1)').should('include.text', 'Please enter a rationale for all mentioned items and for all selected ballots in order to vote this meeting:')
        cy.get('[data-bind="visible: requireNoteOnVap"]').should('include.text', 'Vote(s) against policy without a rationale for proposal')
        cy.get('.floatright > .gray').should('be.visible').click()


    })
})