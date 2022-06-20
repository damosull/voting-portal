import { MEETINGID, USER } from '../../support/constants';

const dayjs = require('dayjs');
var utc = require('dayjs/plugin/utc')
dayjs.extend(utc)
const selector = '#ballotActivityLogGrid > div > table > tbody > tr:nth-child(1) > td';
const statusToChange = 'Received';
const glassAPI = 'https://aqua-issuer-vote-confirmation-api.azurewebsites.net/api/Ballot/';

describe('US26145', () => {
  beforeEach(() => {
    cy.viewport(1100, 900);
    cy.loginWithAdmin(USER.WELLINGTON);
    cy.visit('/').url().should('include', '/Workflow');
  });

  //Test scenario 40744 - https://dev.azure.com/glasslewis/Development/_workitems/edit/40744
  it('TC40744 - Vote on GLASS', () => {
    //Wait initial page to load
    cy.stausCode200('@GET_AVAILABLE_ASSIGNEES_CUSTOMER'); // Last loaded API on tha page - ext

    // CLick on Upcoming meetings
    cy.contains('Upcoming Meetings').click();

    // Remove any pre-existing filter from the page
    cy.removeAllExistingSelectedCriteria();

    // Get the user's name and ID from the database
    cy.getAutomationUserIDFromDB(USER.WELLINGTON).as('userid');
    cy.getAutomationUsernameFromDB(USER.WELLINGTON).as('fullname');

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

    // Load the meeting in Viewpoint
    cy.visit(`/MeetingDetails/Index/${MEETINGID.WLNCVTD}`);

    cy.wait('@GET_MEETING_ID');
    cy.wait('@RELATED_MEETINGS');
    cy.wait('@GET_AGENDA');
    cy.wait('@PAGE_SECTION_ORDER');
    cy.wait('@MEETING_SECURITY_WATCHLIST');
    cy.wait('@ASSIGNED_MEETING_ID');
    cy.wait('@VOTE_TALLY');

    // Click on the Control Number link
    cy.get('#ballots-grid div:nth-child(2) td:nth-child(1)').contains(MEETINGID.WLNCVTD_CTRLNUM).click();

    cy.wait('@BALLOT_ACTIVITY_LOG').then(() => {
      cy.request({
        method: 'POST',
        url: `${glassAPI}/GetByControllerNumbers`,
        body: [MEETINGID.WLNCVTD_CTRLNUM],
      }).then((resp) => {
        expect(resp.status).to.eq(200);
        const originalDate = resp.body[0].lastModifiedDate;
        // Convert the date to the offset and format that Viewpoint shows in the UI
        const formattedDate = dayjs(originalDate).format('MM/DD/YYYY');
        const formattedTime = dayjs.utc(originalDate).utcOffset('+0800').format('HH:mm:ss');
        let leadingZeros = formattedDate.replace(/\b0/g, '');
        let finalDate = `${leadingZeros} ${formattedTime}`;

        cy.wrap(finalDate).as('lastModifiedDate');
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
