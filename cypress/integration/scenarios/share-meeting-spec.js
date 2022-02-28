import { USER, messages } from '../../support/constants';

const toast = messages.toast;
const { MEETINGID } = require("../../support/constants");

let today = new Date().toISOString().slice(0, 10);

describe('Share meeting with User - Comment', function () {
  beforeEach(function () {
    sessionStorage.clear();
    cy.getAutomationUserIDFromDB(USER.CALPERS).as('userid');    
    
    //step 1 - Login to viewpoint as External user
    cy.loginWithAdmin(USER.CALPERS);

    //Step 2 - Navigate to the Workflow tab
    cy.visit('/Workflow');
    cy.wait('@WORKFLOW_EXPANSION');
    cy.wait('@WORKFLOW_SECURITIES_WATCHLIST');
    cy.removeAllExistingSelectedCriteria();
  });

  it(`Verify User can share meeting with another user`, function () {
    //make sure all dates are current with this meeting id 
    cy.AddTenDaysToMeetingDates(MEETINGID.CPRP6)

    //Step 4 - navigate to Calpers meeting ID 
    cy.visit('MeetingDetails/Index/' + MEETINGID.CPRP6)

    cy.wait('@DATA')
    cy.wait('@LOGGER')
    cy.get('#btn-unlock').should('be.visible').should('have.text', 'Change Vote or Rationale').click({ force: true });
    cy.verifyMeetingOptionButtons();

    //Step 5 - Click "Share meeting" button
    cy.get('#btn-share-meeting').click();
    cy.get('#sharemeeting-modal_wnd_title').should('be.visible');
    cy.wait('@SHARE_MEETING_LISTS');


    //Step 6 - Select 'Calpers External Admin' from Users list
    cy.get('#in-share-meeting-user-name').type('cal');
    cy.wait('@IDENTITY_SEARCH');
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
      expect(cols[3]).to.include(today); //Created date
      assert.equal(cols[4], 'This is a test comment'); //verify Comment
    });
  });
});
