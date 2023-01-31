import { When, Then } from "@badeball/cypress-cucumber-preprocessor"
import manageFiltersPage from '../page_objects/manageFilters.page'
const constants = require('../constants')

When('I navigate to the Manage Filters page', () => {
    cy.intercept('GET', constants.API.GET.SUBSCRIPTION_FILTER).as('SUBSCRIPTION_FILTER')
    cy.visit('/ManageFilters')
})

Then('I can see the Manage Filters page', () => {
    cy.url().should('include', '/ManageFilters')
    manageFiltersPage.filterNameInput().should('have.text', 'Upcoming Meetings')
    cy.wait('@SUBSCRIPTION_FILTER')
})

When('I {string} the subscription', (action) => {
    switch (action) {
        case 'add':
            //Step 4 - Click "Add Subscription" button
            manageFiltersPage.addSubscriptionButton().click()
            cy.wait('@SUBSCRIPTIONS')
            //Step 5 - Select 'Calpers External Admin' from Users list
            manageFiltersPage.addSubscriptionPopupTitle().should('be.visible')
            manageFiltersPage.addSubscriptionPopupUserInput().click().type('Charles')
            manageFiltersPage.addSubscriptionPopupUserList().focus().blur().click({ force: true })
            //Step 6 - Enter Schedule to run Subscription
            //Weekly, 8 AM every Monday
            manageFiltersPage.addSubscriptionPopupScheduleDropdown().select('1')
            manageFiltersPage.addSubscriptionPopupMondayCheckbox().check({ force: true })
            manageFiltersPage.addSubscriptionPopupCSVCheckbox().check({ force: true })
            //Step 7 - Click OK
            manageFiltersPage.addSubscriptionOkButton().click()
            cy.wait('@LOGGER')
            cy.wait('@DATA')
            break
        case 'remove':
            //Step 11 - Remove Subscription entry from Viewpoint
            manageFiltersPage.existingSubscriptionRemove().first().click({ force: true })
            manageFiltersPage.OkButton().click()
            break
    }
})

Then('I should be able to see a success message for the {string} subscription', (action) => {
    switch (action) {
        case 'added':
            manageFiltersPage.toastMessage().should('contain.text', constants.messages.toast.SUBSCRIPTION_ADDED)
            break
        case 'removed':
            manageFiltersPage.toastMessage().should('contain.text', constants.messages.toast.SUBSCRIPTION_DELETED)
            break
    }
})

Then('the subscription is available in the database', () => {
    const today = new Date().toISOString().slice(0, 10)
    cy.getAutomationUserIDFromDB(constants.USER.CHARLESSCHWAB).as('userid')
    //Step 9 - Connect to Aqua Database and verify new row has been added
    cy.executeQuery('SELECT TOP 1 * FROM FL_Subscription ORDER BY SubscriptionID DESC').then((result) => {
        var cols = []
        for (var j = 0; j < result.length; j++) {
            cols.push(result[j])
        }

        //Step 10 - Verify FL_Subscription table Column data correct data
        assert.equal(cols[2], 1) //verify Active
        cy.get('@userid').then(function (uid) {
            assert.equal(cols[3], uid) //SubscriberID
        })
        assert.equal(cols[4], 397) //Customer ID
        assert.equal(cols[7], 0) //Deliver to Everyone = false
        expect(cols[14]).to.include(today) //Created date
        expect(cols[16]).to.include(today) //Last Modified date
        cy.get('@userid').then(function (uid) {
            assert.equal(cols[13], uid) //Created By
        })

        expect(cols).to.have.length(19) //Total Fields
    })
})

Then('I remove all existing subscriptions', () => {
    manageFiltersPage.pageBody().then(($body) => {
        if ($body.find('[class="fa fa-times"]').length > 0) {
            const len = $body.find('[class="fa fa-times"]').length
            for (let i = len; i >= 0; i--) {
                if (i > 0) {
                    manageFiltersPage.existingSubscriptionRemoveButton().eq(i - 1).click({ force: true })
                    manageFiltersPage.OkButton().click()
                }
            }
            manageFiltersPage.existingSubscriptionRemoveButton().filter(':visible').should('have.length', 0)
        }
    })
})