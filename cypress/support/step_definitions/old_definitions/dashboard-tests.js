const { USER, messages } = require("../../constants")
import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';

const today = new Date().toISOString().slice(0, 10);

Given('I login as Calpers User', () => {

  cy.getAutomationUserIDFromDB(USER.CALPERS).as('userid');
  cy.loginWithAdmin(USER.CALPERS);

});

When('I navigate to the Dashboard page', () => {

  cy.visit('/Dashboard');

});

/* Create Dashboard Subscription - Test scenario:40490 https://dev.azure.com/glasslewis/Development/_workitems/edit/40490 */
Then('I select Subscriptions link', () => {

  cy.get('#subscriptions-container > h3').should('include.text', 'Subscriptions').click();
  cy.get('body').then(($body) => {
    if ($body.find('#current-subscribers-list > tbody > tr > td > i[class="fa fa-times"]').length > 0) {
      cy.get('#current-subscribers-list > tbody > tr > td > i[class="fa fa-times"]').eq(1).click();
      cy.get('#apprise-btn-confirm').click();
    }
  });

});

And('I click Add Subscription button', () => {

  cy.get('#subscriptions-container > div.collapse.expand-collapse > div > span > a')
    .should('include.text', 'Add Subscription')
    .click();
  cy.get('#subscriptions-container-modal-dyn_wnd_title').should('have.text', 'ADD SUBSCRIPTION');

});

And('I select Calpers External Admin from Users list', () => {

  cy.get('.k-multiselect-wrap.k-floatwrap').type('Cal{downarrow}{enter}');

});

And('I enter Filename DashboardTest', () => {

  cy.get('#subscribed-file-name').type('DashboardTest');

});

And('I enter Schedule to run Subscription', () => {

  // Daily, every 5 hours, 9AM to 6PM
  cy.get('#schedule-type').select('0');
  cy.get('#schedule-type').find(':selected').should('have.text', 'Daily');
  cy.get('#daily-every-hours').select('5');
  cy.get('#daily-every-hours').find(':selected').should('have.text', '5 Hours');
  cy.get('#start-time-hour').select('9');
  cy.get('#end-time-hour').select('18');
    
})

And('I enter Subject,header & footer', () => {

  cy.get('#dashboard-scubscription-detail-subject').type('DashboardSubjectTest');
  cy.get('#dashboard-scubscription-detail-header').type('TestHeader');
  cy.get('#dashboard-scubscription-detail-footer').type('TestFooter');

});

And('I click OK', () => {

  cy.get('#ok').click();

});

Then('I verify Toast message - Subscription added', () => {

  cy.get('.toast-message').should('contain.text', messages.toast.SUBSCRIPTION_ADDED);

});

And('I connect to Aqua Database and verify new row has been added to SB_Subscription table', () => {

  // Step 11 - Connect to Aqua Database and verify new row has been added to SB_Subscription table
  cy.executeQuery('SELECT TOP 1 * FROM SB_Subscription ORDER BY SubscriptionID DESC').then((result) => {
    
    var cols = [];
    
    for (var j = 0; j < result.length; j++) {
      cols.push(result[j]);
    }

    // Step 12 - Verify SB_Subscription table Column data for correct data
    
    //verify Active
    assert.equal(cols[2], 1); 

    // SubscriberID
    cy.get('@userid').then(function (user_id) {
      assert.equal(cols[3], user_id); 
    });
    
    // Check Frequency XML for schedule
    expect(cols[9]).to.include('<EveryHours>5</EveryHours>'); 
    
    // Customer ID
    assert.equal(cols[17], 196);
    // Deliver to Everyone = false
    assert.equal(cols[7], 0);

    // Created date
    expect(cols[14]).to.include(today);
    // Last Modified date
    expect(cols[16]).to.include(today); 
    
    // Created by
    cy.get('@userid').then(function (user_id) {
      assert.equal(cols[13], user_id);
    });
    
    // Verify Filename
    assert.equal(cols[12], 'DashboardTest'); 
    
    // Check emailsettings table for Subject,header & footer
    expect(cols[18]).to.include('{"Subject":"DashboardSubjectTest","Header":"TestHeader","Footer":"TestFooter"}');
    expect(cols).to.have.length(19); //Total Fields

  });

});

And('I remove Subscription entry from Viewpoint', () => {

  cy.get('#current-subscribers-list > tbody > tr > td > i[class="fa fa-times"]').eq(1).click();
  cy.get('#apprise-btn-confirm').click();

});

/* Validate Dashboard - Test scenario:39541 https://dev.azure.com/glasslewis/Development/_workitems/edit/39541 */

Then('I verify sidebar links', () => {

  cy.get('#workflow-filter-list > div > h5').eq(0).should('include.text', 'My dashboards')
  cy.get('#workflow-filter-list > div > h5').eq(1).should('include.text', 'Default dashboard')
  cy.get('#workflow-filter-list > div > h5').eq(2).should('include.text', 'Shared dashboards')
  cy.get('#dashboard-name').should('have.text', 'Upcoming Meetings').should('be.visible')

});

And('I verify Upcoming Meetings highlighted', () => {

  cy.get('.highlightedFilter').should('include.text', 'Upcoming Meetings')

});

And('I verify heading buttons and links', () => {
      
  cy.get('#btn-report-save-as').should('be.visible').should('have.text', 'Save As')
  cy.get('#btn-dashboard-config-widgets').should('be.visible')
  cy.get('#btn-dashboard-config-widgets').should('include.text', 'Add Widget')
  cy.get('#btn-report-export').should('be.visible').should('include.text', 'Export')
  cy.get('#anchor-nav > li:nth-child(4) > a').should('be.visible').should('include.text', 'Widgets')
  cy.get('#anchor-nav > li:nth-child(5) > a').should('be.visible').should('include.text', 'Sharing')
  cy.get('#anchor-nav > li:nth-child(6) > a').should('be.visible').should('include.text', 'Subscriptions')
  cy.get('#k10000').should('be.visible')
  
});

And('I verify Widget headers', () => {
        
  cy.get('div.row.handler.widget-header').eq(0).find('.floatleft').should('include.text', 'Workflow: Upcoming Meetings')
  cy.get('div.row.handler.widget-header').eq(1).find('.floatleft').should('include.text', 'Workflow: Upcoming Meetings')
  cy.get('div.row.handler.widget-header').eq(2).find('.floatleft').should('include.text', 'Workflow: Upcoming Meetings')
  cy.get('div.row.handler.widget-header').eq(3).find('.floatleft').should('include.text', 'Glass Lewis Blog')

});

And('I verify each widget has edit and remove buttons', () => {

  cy.get('div.row.handler.widget-header').each((widget) => {
    cy.wrap(widget).find('div > a[title="Settings"]').should('be.visible')
    cy.wrap(widget).find('div > a[title="Remove"]').should('be.visible')
      })

});

And('I verify Subscriptions', () => {

  cy.get('#subscriptions-container > h3').should('include.text', 'Subscriptions').click()
  cy.get('#subscriptions-container > div.collapse.expand-collapse > div > span > a').should('include.text', 'Add Subscription')

});

And('I add a widget', () => {

  cy.get('#btn-dashboard-config-widgets').click({ force: true })
  cy.get('#results-list > li > div > input[value="Previews"]').check({ force: true })
  cy.get('#btn-apply-configure-columns').click()
  cy.get('div.clearfix.widget-settings-data > div.checkbox > label').should('be.visible')

});

And('I check dropdown values selectable', () => {

  cy.get('.clearboth.widget-settings-layout > div > select').eq(8)
      .select('Single')
      .find(':selected')
      .contains('Single');

  cy.get('.clearboth.widget-settings-layout > div > select').eq(9)
      .select('Single')
      .find(':selected')
      .contains('Single');

  cy.get('.clearboth.widget-settings-layout > div > select').eq(8)
      .select('Double')
      .find(':selected')
      .contains('Double');

   cy.get('.clearboth.widget-settings-layout > div > select').eq(9)
      .select('Double')
      .find(':selected')
      .contains('Double');

});

And('I select certain values', () => {

  cy.get('div.row.center > button.secondary.blue').eq(4).click({ force: true })
  cy.wait('@DOCUMENTS_DATA')

});

And('I check returned table headers', () => {

  cy.get('.dashboard-documents-content > table >thead >tr').within(() => {
      cy.get('td').eq(0).contains('COUNTRY/MARKET')
      cy.get('td').eq(1).contains('SEASON')
      cy.get('td').eq(2).contains('FILE')
        })

});


And('I remove widget', () => {
  
  cy.get('div.row.handler.widget-header').eq(4).then((wdgt) => {
    cy.wrap(wdgt).find('div > a[title="Settings"]').should('be.visible')
    cy.wrap(wdgt).find('div > a[title="Remove"]').should('be.visible').click()
      })

});
