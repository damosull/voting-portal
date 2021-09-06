// Test scenario: 40409 https://dev.azure.com/glasslewis/Development/_workitems/edit/40409
import { messages } from '../../support/constants';
const toast = messages.toast;

describe('Create Ballot Vote Subscription entry and validate in SB_Subscription Database table', function () {
    /*  const nextDays = 2;
     const pastDays = 2; */
    const unixTime = Math.floor(Date.now() / 1000);
    const configName = `BallotVoteData_${unixTime}`;



    beforeEach(function () {

        //since db refresh changes user id of automation user,need to grab the userid from the DB on the fly
        cy.GetAutomationUserIDFromDB().as('userid')

        cy.intercept('GET', '**/Api/Data/BallotReconciliation/**').as('BallotRecon');
        cy.intercept('PUT', '**/Api/Data/Inbox/**').as('InboxReport');
        cy.intercept('GET', '**/Api/Data/BallotVoteData/?PageInfo%5BIgnorePagesize%5D=true&ReportType=BallotVoteData&_=**').as('BallotVote');
        cy.intercept('POST', '**/Api/WebUI//ReportsCriteria/ForCriterias?&objectType=BallotVoteData').as('BallotCriteria');

        // Step 1 - Login to viewpoint as External user
        cy.loginExtAdm('Calpers');

        //Step 2 - Navigate to the Reporting tab 
        cy.visit("/Reporting");
    })

    it(`Save Configuration and create Subscription`, function () {

        cy.wait('@BallotRecon')
        cy.contains('Ballot Vote Data').click()
        cy.wait('@BallotVote');
        cy.wait('@BallotCriteria');

        // Step 3 save configuraiton 
        cy.contains('Save As').click();
        cy.get('#popupTextContainer').should('be.visible').type(configName);
        cy.get('#apprise-btn-undefined').should('be.visible');
        cy.get('#apprise-btn-confirm').click();
        cy.contains('My configurations').siblings().find('span').should('contain', configName);

        // Step 4 Add Subscription
        cy.get('#subscriptions-container > h3').click()
        cy.get('#subscriptions-container > div.collapse.expand-collapse > div > span > a').click()
        cy.get('#add-subscription-kendo-modal-123abc456xyz').should('be.visible')

        //Step 5 - Select 'Calpers External Admin' from Users list 
        cy.get('.k-multiselect-wrap > .k-input').click().wait(500).type('{downarrow}{downarrow}{downarrow}{enter}').blur();

        //Step 6 - Enter Filename for Subscription Report
        cy.get('#subscribed-file-name').type('SubscribeTest')

        //Step 7 - Enter Schedule to run Subscription (Weekly/8AM/Sunday)
        cy.get('#schedule-type').select('1')
        cy.get('#Sun').check({ force: true })

        //Step 8 - Click OK
        cy.get('#ok').click()
        cy.get('.toast-message').should('contain.text', toast.SUBSCRIPTION_ADDED);

        //Step 9 - Verify UI table entries for newly created Subscription
        cy.get('#current-subscribers-list > tbody > tr > td').eq(1).should('include.text', 'CalpersAutomation External Admin')
        cy.get('#current-subscribers-list > tbody > tr > td').eq(2).should('include.text', 'Weekly')
        cy.get('#current-subscribers-list > tbody > tr > td').eq(3).should('include.text', 'Run at: 8:00AM, on: Sun')
        cy.get('#current-subscribers-list > tbody > tr > td').eq(4).should('include.text', 'SubscribeTest')



        //Step 10 - Connect to Aqua Database and verify new row has been added 
        cy.executeQuery('SELECT TOP 1 * FROM SB_Subscription ORDER BY SubscriptionID DESC').then((result) => {
            var cols = [];
            for (var j = 0; j < result.length; j++) {
                cols.push(result[j])
            }

            //Step 11 - Verify Column data for UserIds and Filename 
            assert.equal(cols[2], 1);                //verify Active
            cy.get('@userid').then(function (uid) {
                assert.equal(cols[3], uid);          //SubscriberID
            })
            assert.equal(cols[7], 0);                //Deliver to Everyone = false
            assert.equal(cols[12], 'SubscribeTest'); //Filename
            cy.get('@userid').then(function (uid) {
                assert.equal(cols[13], uid);         //Created by  
            })
            assert.equal(cols[17], 196);             //Customer ID
            expect(cols).to.have.length(19)          //Total Fields

        })

        //Step 12 - Remove Subscription entry from Viewpoint
        cy.get('#current-subscribers-list > tbody > tr > td > i[class="fa fa-times"]').first().click({ force: true })
        cy.get('#apprise-btn-confirm').click()
        cy.get('.toast-message').should('contain.text', toast.SUBSCRIPTION_DELETED);

        cy.deleteMyConfiguration(configName);

    }); // end it

}); //end describe