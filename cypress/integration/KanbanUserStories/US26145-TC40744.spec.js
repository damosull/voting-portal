//Test scenario 40744 - https://dev.azure.com/glasslewis/Development/_workitems/edit/40744

const moment = require('moment');
import { MEETINGID, API, USER } from '../../support/constants';
const selector = '#ballotActivityLogGrid > div > table > tbody > tr:nth-child(1) > td';
const statusToChange = 'Received';
const glassAPI = 'https://aqua-issuer-vote-confirmation-api.azurewebsites.net/api/Ballot/';
let userDetails, jwtToken;

describe('US26145', () => {
  beforeEach(() => {
    cy.intercept('POST', API.POST.WORKFLOW_EXPANSION).as('WorkflowExpansion');
    cy.intercept('POST', API.POST.WORKFLOW_SECURITIES_WATCHLIST).as('WorkflowSecuritiesWatchlists');
    cy.intercept('POST', API.POST.AVAILABLE_ASSIGNEES_CUSTOMER).as('AvailableAssigneesForCustomer');
    cy.intercept('POST', API.POST.GET_AGENDA).as('GetAgenda');
    cy.intercept('POST', API.POST.VOTE_TALLY).as('VoteTally');
    cy.intercept('POST', API.POST.MEETING_DETAILS).as('MeetingDetails');
    cy.intercept('GET', API.GET.GET_MEETING_ID).as('GetMeetingID');
    cy.intercept('GET', API.GET.RELATED_MEETINGS).as('RelatedMeetings');
    cy.intercept('GET', API.GET.PAGE_SECTION_ORDER).as('PageSectionOrder');
    cy.intercept('GET', API.GET.MEETING_SECURITY_WATCHLIST).as('MeetingSecurityWatchlist');
    cy.intercept('GET', API.GET.ASSIGNED_MEETING_ID).as('AssignedMeetingID');
    cy.intercept('GET', API.GET.BALLOT_ACTIVITY_LOG).as('BallotActivity');
    cy.loginExtAdm('Wellington');
    cy.visit('/').url().should('include', '/Workflow');
  });

  it('TC40744 - Vote on GLASS', () => {
    cy.wait('@WorkflowExpansion');
    cy.wait('@WorkflowSecuritiesWatchlists');
    cy.wait('@AvailableAssigneesForCustomer');

    cy.contains('Upcoming Meetings').click();

    cy.removeAllExistingSelectedCriteria();

    cy.GetAutomationUserIDFromDB(USER.WELLINGTON).as('userid');
    cy.GetAutomationUsernameFromDB(USER.WELLINGTON).as('fullname');

    // Mimic the API calls done on GLASS to change the meeting to the correct status
    cy.get('@userid').then((uid) => {
      cy.request({
        method: 'POST',
        url: `${glassAPI}/GetByControllerNumbers`,
        body: [MEETINGID.WLNCVTD_CTRLNUM],
      }).then((resp) => {
        expect(resp.status).to.eq(200);
        const lastModDate = resp.body[0].lastModifiedDate;
        const custName = resp.body[0].customerName;
        const compName = resp.body[0].companyName;

        cy.request({
          method: 'PATCH',
          url: `${glassAPI}/StatusReason`,
          body: [
            {
              controlNumber: MEETINGID.WLNCVTD_CTRLNUM,
              status: statusToChange,
              lastModifiedBy: uid,
              lastModifiedDate: lastModDate,
              reason: '',
              customerName: custName,
              companyName: compName,
              found: true,
              canCurrentStatusBeChanged: true,
            },
          ],
        }).then((resp) => {
          expect(resp.status).to.eq(204);
        });
      });
    });

    cy.visit(`/MeetingDetails/Index/${MEETINGID.WLNCVTD}`);

    cy.wait('@GetMeetingID');
    cy.wait('@RelatedMeetings');
    cy.wait('@GetAgenda');
    cy.wait('@PageSectionOrder');
    cy.wait('@MeetingSecurityWatchlist');
    cy.wait('@AssignedMeetingID');
    cy.wait('@VoteTally');

    cy.get('#ballots-grid div:nth-child(2) td:nth-child(1)').contains(MEETINGID.WLNCVTD_CTRLNUM).click();

    cy.wait('@BallotActivity').then(() => {
      cy.request({
        method: 'POST',
        url: `${glassAPI}/GetByControllerNumbers`,
        body: [MEETINGID.WLNCVTD_CTRLNUM],
      }).then((resp) => {
        expect(resp.status).to.eq(200);
        const originalDate = resp.body[0].lastModifiedDate;
        // Convert the date to the offset and format that Viewpoint shows in the UI
        const formattedDate = moment(originalDate).utcOffset('+0700').format('MM/DD/YYYY HH:mm:ss');

        cy.wrap(formattedDate).as('lastModifiedDate');
      });
    });
    cy.get('#ballot-activitylog-modal').should('be.visible');

    // It checks that the status shown is correcct
    cy.get(selector)
      .eq(0)
      .then((actionUI) => {
        expect(statusToChange).to.include(actionUI.text());
      });

    // It checks that the username shown is correcct
    cy.get('@fullname').then((fullname) => {
      cy.get(selector)
        .eq(1)
        .then((userUI) => {
          expect(fullname).to.include(userUI.text());
        });
    });

    // It checks that the date shown is correcct
    cy.get('@lastModifiedDate').then((glassDate) => {
      cy.get(selector)
        .eq(2)
        .then((dateUI) => {
          expect(glassDate).to.include(dateUI.text());
        });
    });
  });
});
