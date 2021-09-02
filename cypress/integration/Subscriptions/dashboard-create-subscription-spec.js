// Test scenario: 40490 https://dev.azure.com/glasslewis/Development/_workitems/edit/40490

import { messages } from '../../support/constants';
const toast = messages.toast;
let today = new Date().toISOString().slice(0, 10)

describe('Create Dashboard Subscription entry and validate in SB_Subscription Database table', function () {

    beforeEach(function () {
        cy.GetAutomationUserIDFromDB().as('userid')
        cy.intercept('GET', '**/Api/Data/Inbox/**').as('InboxReport');
        cy.intercept('GET', '**/Api/Data/IdentitySearch/**').as('IdentitySearch')
        cy.intercept('GET', '**/Api/WebUI/Subscriptions/**').as('Subscriptions')

        // Step 1 - Login to viewpoint as External user
        cy.loginExtAdm('Calpers');

        //Step 2 - Navigate to the Reporting tab 
        cy.visit("/Dashboard");
    })

    it(`Create Dashboard Subscription`, function () {

        //Step 3 - select Subscriptions link
        cy.get('#subscriptions-container > h3').should('include.text', 'Subscriptions').click()

        //Remove any existing subscriptions - in the case where the test would fail before completing
        //the subscription would not get to the point of being removed at the end.
        //this step will handle that case.
        cy.get('body').then(($body) => {
            if ($body.find('#current-subscribers-list > tbody > tr > td > i[class="fa fa-times"]').length > 0) {
                cy.get('#current-subscribers-list > tbody > tr > td > i[class="fa fa-times"]').eq(1).click()
                cy.get('#apprise-btn-confirm').click()
            }
        })

        //Step 4 - Click "Add Subscription" button
        cy.get('#subscriptions-container > div.collapse.expand-collapse > div > span > a').should('include.text', 'Add Subscription').click()
        cy.get('#subscriptions-container-modal-dyn_wnd_title').should('have.text', 'ADD SUBSCRIPTION')

        //Step 5 - Select 'Calpers External Admin' from Users list 
        cy.get('.k-multiselect-wrap.k-floatwrap').type('Cal{downarrow}{enter}')

        //Step 6 - Enter Filename (DashboardTest)
        cy.get('#subscribed-file-name').type('DashboardTest')

        //Step 7 - Enter Schedule to run Subscription
        //Daily,every 5 hours,9AM to 6PM
        cy.get('#schedule-type').select('0')
        cy.get('#schedule-type').find(':selected').should('have.text', 'Daily')
        cy.get('#daily-every-hours').select('5')
        cy.get('#daily-every-hours').find(':selected').should('have.text', '5 Hours')
        cy.get('#start-time-hour').select('9')
        cy.get('#start-time-hour').find(':selected').should('include.text', '9AM')
        cy.get('#end-time-hour').select('18')
        cy.get('#end-time-hour').find(':selected').should('include.text', '6PM')

        //Step 8 - Enter Subject,header & footer
        cy.get('#dashboard-scubscription-detail-subject').type('DashboardSubjectTest')
        cy.get('#dashboard-scubscription-detail-header').type('TestHeader')
        cy.get('#dashboard-scubscription-detail-footer').type('TestFooter')

        //Step 9 - Click OK
        cy.get('#ok').click()

        //Step 10 - Verify Toast message - Subscription added
        cy.get('.toast-message').should('contain.text', toast.SUBSCRIPTION_ADDED);

        //Step 11 - Connect to Aqua Database and verify new row has been added to SB_Subscription table 
        cy.executeQuery('SELECT TOP 1 * FROM SB_Subscription ORDER BY SubscriptionID DESC').then((result) => {
            var cols = [];
            for (var j = 0; j < result.length; j++) {
                cols.push(result[j])
            }

            //Step 12 - Verify SB_Subscription table Column data for correct data
            assert.equal(cols[2], 1);                //verify Active
            cy.get('@userid').then(function (uid) {
                assert.equal(cols[3], uid);          //SubscriberID
            })
            expect(cols[9]).to.include('<EveryHours>5</EveryHours>') //check Frequency xml for schedule 
            assert.equal(cols[17], 196);              //Customer ID
            assert.equal(cols[7], 0);                //Deliver to Everyone = false
            expect(cols[14]).to.include(today);     //Created date
            expect(cols[16]).to.include(today);     //Last Modified date
            cy.get('@userid').then(function (uid) {
                assert.equal(cols[13], uid);         //Created by  
            })
            assert.equal(cols[12], 'DashboardTest')   //verify Filename
            //check emailsettings table for Subject,header & footer 
            expect(cols[18]).to.include('{"Subject":"DashboardSubjectTest","Header":"TestHeader","Footer":"TestFooter"}')
            expect(cols).to.have.length(19)         //Total Fields

        })

        //Remove Subscription entry from Viewpoint
        cy.get('#current-subscribers-list > tbody > tr > td > i[class="fa fa-times"]').eq(1).click()
        cy.get('#apprise-btn-confirm').click()

    }); // end it

}); //end describe