// Test scenario: 40545 https://dev.azure.com/glasslewis/Development/_workitems/edit/40545
import { USER, messages } from '../../support/constants';
const toast = messages.toast;
let today = new Date().toISOString().slice(0, 10);

describe('Share meeting with User - Comment', function () {
  //let meetingid
  beforeEach(function () {
    sessionStorage.clear();
    cy.GetAutomationUserIDFromDB(USER.CALPERS).as('userid');
    cy.viewport(1100, 900);
    cy.intercept('POST', '**/Api/Data/WorkflowExpansion').as('WorkflowExpansion');
    cy.intercept('POST', '**/Api/Data/WorkflowSecuritiesWatchlists').as('WorkflowSecuritiesWatchlists');
    cy.intercept('POST', '**/Api/Data/Filters/CreateDraftFilter').as('filter');
    cy.intercept('GET', '**/Api/Data/ShareMeetingIdentitySearch/**').as('IdentitySearch');
    cy.intercept('GET', '**/Api/Data//ShareMeetingLists/**').as('ShareMeetingLists');
    cy.intercept('POST', 'https://viewpoint.aqua.glasslewis.com/Api/Data//SubscribeToMeeting/GetStatus').as(
      'GetStatus'
    );

    //step 1 - Login to viewpoint as External user
    cy.loginExtAdm('Calpers');

    //Step 2 - Navigate to the Workflow tab
    cy.visit('/Workflow');
    cy.wait('@WorkflowExpansion');
    cy.wait('@WorkflowSecuritiesWatchlists');
  });

  it(`Verify User can share meeting with another user`, function () {
    //Step 3 - Add Decision Status Criteria and filter meetings by Recommendations Pending

    cy.removeAllExistingSelectedCriteria();
    cy.AddMultipleCriteria(['Decision Status']);
    cy.addCriteriaStatus(['Recommendations Pending']);
    cy.wait('@GetStatus').then((interception) => {
      const meeting = JSON.stringify(interception.response.body[2].MeetingId);
      cy.wrap(meeting).as('meetingid');
    });

    //Step 4 - Select meeting from list and save meetingID from Getstatus API call
    cy.get('table > tbody > tr')
      .eq(2)
      .within(() => {
        cy.get('[data-js="meeting-details-link"]').first().click({ force: true });
      });
    cy.verifyMeetingOptionButtons();

    //Step 5 - Click "Share meeting" button
    cy.get('#btn-share-meeting').click();
    cy.get('#sharemeeting-modal_wnd_title').should('be.visible');
    cy.wait('@ShareMeetingLists');

    //Step 6 - Select 'Calpers External Admin' from Users list
    cy.get('#in-share-meeting-user-name').type('cal');
    cy.wait('@IdentitySearch');
    cy.get('#in-share-meeting-user-name').type('{downarrow}');
    cy.get('#in-share-meeting-user-name').type('{enter}');

    //Step 8 - Click Add button
    cy.get('#btn-share-meeting-add').click();

    //Step 9 - Add Comment "This is a test comment"
    cy.get('#txt-share-meeting-comment').type('This is a test comment');

    //Step 10 - Click Share button
    cy.get('#btn-share-meeting-confirm').click();
    cy.get('.toast-message').should('contain.text', toast.SHARE_MEETING_REQUEST_SAVED);

    //Step 11 - Connect to Aqua GLP Database and verify new row has been added to PX_ShareMeeting table
    cy.executeQuery('SELECT TOP 1 * FROM PX_ShareMeeting ORDER BY ShareMeetingID DESC').then((result) => {
      var cols = [];
      for (var j = 0; j < result.length; j++) {
        cols.push(result[j]);
      }

      //Step 12 - Verify PX_ShareMeeting table Column data for correct data
      cy.get('@userid').then(function (uid) {
        assert.equal(cols[1], uid); //verify Auatomation QaUat User id
      });
      cy.get('@meetingid').then(function (meetid) {
        assert.equal(cols[2], meetid); //Verify Meeting ID correct
      });
      expect(cols[3]).to.include(today); //Created date
      assert.equal(cols[4], 'This is a test comment'); //verify Comment
    });
  });
});
