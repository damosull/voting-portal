// Test scenario: 40482 https://dev.azure.com/glasslewis/Development/_workitems/edit/40482
import { messages } from '../../support/constants';
const toast = messages.toast;
let today = new Date().toISOString().slice(0, 10)

describe('Create Manage Filters Subscription entry and validate in FL_Subscription Database table', function () {
   
    beforeEach(function () {
        cy.intercept('GET', '**/Api/Data/Inbox/**').as('InboxReport');
        cy.intercept('GET','**/Api/Data/IdentitySearch/**').as('IdentitySearch')
        cy.intercept('GET','**/Api/WebUI/Subscriptions/**').as('Subscriptions')

        // Step 1 - Login to viewpoint as External user
        cy.loginExternal();

        //Step 2 - Navigate to the Reporting tab 
        cy.visit("/Workflow");
    })

    it(`Create Manage Filters Subscription`, function () {

       // Step 3 - Select Manage Filters link 
       cy.get('#btn-manage-filters').click()
       cy.get('#filter-name-edit').should('have.text','Upcoming Meetings')
       cy.get('body').then(($body) => {
        if ($body.find('#current-subscribers-list > tbody > tr > td > i[class="fa fa-times"]').length > 0) {
            cy.get('#current-subscribers-list > tbody > tr > td > i[class="fa fa-times"]').click()
            cy.get('#apprise-btn-confirm').click()
        }
        })
       //Step 4 - Click "Add Subscription" button
       cy.get('#add-subscription').click()
       cy.wait('@Subscriptions')

       //Step 5 - Select 'Calpers External Admin' from Users list 
       cy.get('#subscriptions-modal-content > h3')
       cy.get('#users').click().type('Cal')
       cy.get('#users_listbox > li').focus().blur().click({force:true})
       

       //Step 6 - Enter Schedule to run Subscription
       //Weekly,8 AM every Saturday
       cy.get('#schedule-type').select('1')
        cy.get('#Sat').check({ force: true })
        cy.get('input#IncludeCSVResultset').invoke('attr', 'style', 'display: block');
        cy.get('#IncludeCSVResultset').check()

        //Step 7 - Click OK
        cy.get('#ok').click()

        //Step 8 - Verify Toast message - Subscription added 
        cy.get('.toast-message').should('contain.text', toast.SUBSCRIPTION_ADDED);

        //Step 9 - Connect to Aqua Database and verify new row has been added 
        cy.executeQuery('SELECT TOP 1 * FROM FL_Subscription ORDER BY SubscriptionID DESC').then((result) => {
            var cols = [];
            for (var j = 0; j < result.length; j++) {
                cols.push(result[j])
            }

            //Step 10 - Verify FL_Subscription table Column data for correct data 
            assert.equal(cols[2], 1);                //verify Active
            assert.equal(cols[3], 10916);            //SubscriberID
            assert.equal(cols[4], 196);              //Customer ID
            assert.equal(cols[7], 0);                //Deliver to Everyone = false
            expect(cols[14]).to.include(today);     //Created date
            expect(cols[16]).to.include(today);     //Last Modified date
            assert.equal(cols[13], 10916);           //Created by
            
            expect(cols).to.have.length(19)         //Total Fields

        })

        //Step 11 - Remove Subscription entry from Viewpoint
        cy.get('#current-subscribers-list > tbody > tr > td > i[class="fa fa-times"]').first().click({ force: true })
        cy.get('#apprise-btn-confirm').click()
        cy.get('.toast-message').should('contain.text', toast.SUBSCRIPTION_DELETED);

    }); // end it

}); //end describe