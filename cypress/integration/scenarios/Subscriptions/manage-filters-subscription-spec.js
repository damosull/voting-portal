import { USER, messages } from '../../../support/constants';

const toast = messages.toast;
const today = new Date().toISOString().slice(0, 10);

describe('Create Manage Filters Subscription entry and validate in FL_Subscription Database table', function () {
  beforeEach(function () {
    // Step 1 - Login to viewpoint as External user
    cy.loginWithAdmin(USER.CALPERS);

    //Step 2 - Navigate to the Reporting tab
    cy.visit('/Workflow');
  });

  // Test scenario: 40482 https://dev.azure.com/glasslewis/Development/_workitems/edit/40482
  it(`Create Manage Filters Subscription`, function () {
    // Step 3 - Select Manage Filters link
    cy.get('#btn-manage-filters').click();
    cy.get('#filter-name-edit').should('have.text', 'Upcoming Meetings');
    cy.wait('@CURRENT_USER');
    cy.wait('@DIRECTORIES');
    cy.wait('@INBOX_REPORT');
    cy.wait('@DATA');

    cy.get('body').then(($body) => {
      /* if ($body.find('#current-subscribers-list > tbody > tr > td > i[class="fa fa-times"]').length > 0) {
        cy.get('#current-subscribers-list > tbody > tr > td > i[class="fa fa-times"]').click(); */
      if ($body.find('[class="fa fa-times"]').length > 0) {
        const len = $body.find('[class="fa fa-times"]').length;

        for (let i = len; i >= 0; i--) {
          if (i > 0) {
            cy.get('[class="fa fa-times"]')
              .eq(i - 1)
              .click({ force: true });
            cy.get('#apprise-btn-confirm').click();
          }
        }

        cy.get('[class="fa fa-times"]').should('have.length', 0);
      }
    });
    //Step 4 - Click "Add Subscription" button
    cy.get('#add-subscription').click();
    cy.wait('@SUBSCRIPTIONS');

    //Step 5 - Select 'Calpers External Admin' from Users list
    cy.get('#subscriptions-modal-content > h3');
    cy.get('#users').click().type('Cal');
    cy.get('#users_listbox > li').focus().blur().click({ force: true });

    //Step 6 - Enter Schedule to run Subscription
    //Weekly,8 AM every Saturday
    cy.get('#schedule-type').select('1');
    cy.get('#Mon').check({ force: true });
    cy.get('input#IncludeCSVResultset').invoke('attr', 'style', 'display: block');
    cy.get('#IncludeCSVResultset').check();

    //Step 7 - Click OK
    cy.get('#ok').click();
    cy.wait('@LOGGER');
    cy.wait('@DATA');

    //Step 8 - Verify Toast message - Subscription added
    cy.get('.toast-message').should('contain.text', toast.SUBSCRIPTION_ADDED);
    cy.getAutomationUserIDFromDB(USER.CALPERS).as('userid');

    //Step 9 - Connect to Aqua Database and verify new row has been added
    cy.executeQuery('SELECT TOP 1 * FROM FL_Subscription ORDER BY SubscriptionID DESC').then((result) => {
      var cols = [];
      for (var j = 0; j < result.length; j++) {
        cols.push(result[j]);
      }

      //Step 10 - Verify FL_Subscription table Column data for correct data
      assert.equal(cols[2], 1); //verify Active
      cy.get('@userid').then(function (uid) {
        assert.equal(cols[3], uid); //SubscriberID
      });
      assert.equal(cols[4], 196); //Customer ID
      assert.equal(cols[7], 0); //Deliver to Everyone = false
      expect(cols[14]).to.include(today); //Created date
      expect(cols[16]).to.include(today); //Last Modified date
      cy.get('@userid').then(function (uid) {
        assert.equal(cols[13], uid); //Created By
      });

      expect(cols).to.have.length(19); //Total Fields
    });

    //Step 11 - Remove Subscription entry from Viewpoint
    cy.get('#current-subscribers-list > tbody > tr > td > i[class="fa fa-times"]').first().click({ force: true });
    cy.get('#apprise-btn-confirm').click();
    cy.get('.toast-message').should('contain.text', toast.SUBSCRIPTION_DELETED);
  });
});