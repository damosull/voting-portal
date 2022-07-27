import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps'
import { USER } from '../../constants.js'


// TODO: Unnecesary step
Given('I login as Internal User and retrieve Customer ID for {string}', (customer) => {

    cy.loginWithAdmin(USER.AUTOMATIONINTERNAL)
    cy.visit('/Workflow')
/*
    //Alias csrf token
    cy.wait('@WORKFLOW_EXPANSION').then((resp) => {
        var csrftoken = resp.request.headers.csrftoken
        cy.wrap(csrftoken).as('csrftoken')
    })
    */
    cy.wait('@WORKFLOW_SECURITIES_WATCHLIST')

    //get customer ID
    cy.getCustomerIDFromDB(customer).as('custid')

})

When('I set View Interactions permissions to {string} for RobecoAutomation External Admin', (access) => {
    cy.getAutomationUserIDFromDB(USER.ROBECO).as('userid')
    cy.get('@userid').then((uid) => {
        cy.get('body').then(($body) => {
            // we can use Cypress.$ to parse the string body
            // thus enabling us to query into it easily
            const $html = Cypress.$($body)
            const csrf = $html.find('input[name=csrf-token]').val()
            cy.log(csrf)
            cy.request({
                method: 'POST',
                url: `https://viewpoint.aqua.glasslewis.com/Api/Data/Permissions/UpdateUserPermissions`,
                headers: {
                    CSRFToken: csrf,
                },
                body:
                {
                    UserID: uid,
                    Changes:
                        [{
                            ID: 335,
                            Name: "Permission.CompanyPage.ViewInteraction",
                            Access: access
                        }]
                },

            }).then((resp) => {
                expect(resp.status).to.eq(200)
            })
        })
    })
    cy.logout()

})

And('I login as External User {string}', () => {
    cy.loginWithAdmin(USER.ROBECO)
    cy.visit('/Workflow')
    cy.wait('@WORKFLOW_SECURITIES_WATCHLIST')
    cy.removeAllExistingSelectedCriteria()
})

And('I navigate to the {int}. meeting', (company_sequence) => {
    cy.get('table > tbody > tr')
        .eq(company_sequence - 1)
        .within(() => {
            cy.get('[data-js="meeting-details-link"]').first().click({ force: true })
        })

})

And('I click the Company link on the Mettings detail page', () => {
    cy.get('#company-navigate').click()
})

Then('The anchor bar should not contain a link to Engagements', () => {
    cy.get('#anchor-nav-container').should('not.contain', 'Engagements')
})

And('There is no Engagements section on the Company page', () => {
    cy.get('#content-wrapper').should('not.contain', 'Engagements')
})

And('I select Customer Profile from the Admin dropdown', () => {
    cy.get('#admin-link-container > a > span').click({ force: true })
    cy.get('#navlink--customer-profile').click()
})

And('I select Custom Fields from The Customer Settings panel', () => {
    cy.wait('@FILTERS')
    cy.get('#leftcol > nav > ul:nth-child(6) > li:nth-child(1) > a').click()
})

And('I click Add Custom Field', () => {
    cy.get('#workflow-filter-list > div:nth-child(1) > div > a.gl-btn').click()
})

And('I select {string} from the dropdown list', (option) => {

    cy.get('#select-field-type').select(option)
    cy.get('#select-field-type').should('include.text', option)

})

And('the Page View field displays {string}', (pageview) => {
    cy.get('#select-screen').should('include.text', pageview)
})

Then('the Active checkbox should be checked', () => {
    cy.get('#check-active').should('be.checked')
})

And('the Filter Under Add Criteria checkbox should not be checked', () => {
    cy.get('#check-filter').should('not.be.checked')
})

And('I uncheck the Active checkbox', () => {
    cy.get('#check-active').uncheck({ force: true })
})

And('I check the Filter Under Add Criteria checkbox', () => {
    cy.get('#check-filter').check({ force: true })
})

When('I enter a Description {string} into the Description Field and click OK button', (desc) => {
    cy.get('#text-description').click()
    cy.get('div.editable-input > input[type=text]').type(desc)
    cy.get('div.editable-buttons > button.editable-submit').click()
})

And('I enter a first picklist value of {string} and click OK button', (arg) => {
    cy.get('#option-name-edit-1').click()
    cy.get('div.editable-input > input[type=text]').type(arg)
    cy.get('div.editable-buttons > button.editable-submit').click()
})

And('I enter a second picklist value of {string} and click OK button', (arg2) => {
    cy.get('#option-name-edit-2').click()
    cy.get('div.editable-input > input[type=text]').type(arg2)
    cy.get('div.editable-buttons > button.editable-submit').click()
})

And('I enter a third picklist value of {string} and click OK button', (argx) => {
    cy.get('#picklist-section > div.row.row-spaced.clearfix > a:nth-child(1)').click()
    cy.get('#option-name-edit-3').click()
    cy.get('div.editable-input > input[type=text]').type(argx)
    cy.get('div.editable-buttons > button.editable-submit').click()
})

When('I click the Sort Alphabatically button', () => {
    cy.get('#picklist-section > div.row.row-spaced.clearfix > a.gl-btn.green').click()
})

Then('Picklist option 1 should contain {string}', (txt) => {
    cy.get('#picklist-section > div >div > div >span')
        .first().should('include.text', txt)
})

When('I enter a label value {string} and click OK button', (arg3) => {
    cy.get('#text-label-name').click()
    cy.get('div.editable-input > input[type=text]').type(arg3)
    cy.get('div.editable-buttons > button.editable-submit').click()
})

And('I save the picklist', () => {
    cy.get('#cf-btn-save').click()
})

And('I navigate to the Workflow page', () => {
    cy.visit('/Workflow')
    cy.statusCode200('@GET_AVAILABLE_ASSIGNEES_CUSTOMER') // Last loaded API on tha page - ext
})


Then('There is no reference to my picklist {string} on the workflow page', (lbl) => {
    cy.contains(lbl).should('not.exist')
})

Then('I delete the {string} picklist', (pl) => {
    cy.visit('https://viewpoint.aqua.glasslewis.com/CustomerDetails/CustomFields/')
    cy.contains(pl).click({ force: true })
    cy.get('#cf-btn-delete').should('have.text', 'Delete')
    cy.get("#cf-btn-delete").click({ force: true })
    cy.contains(pl).should('not.exist')
})

And('I open the Columns dropdown', () => {
    cy.get('#btn-workflow-config-columns').click({ force: true })
})

Then('The picklist created {string} should be present in the column list unchecked', (name) => {
    cy.get('#txt-filter-col-name').type(name)
    cy.get(`input[value='${name}']`).should('not.be.checked')
    cy.get('#txt-filter-col-name').clear()
})

Then('I delete the active {string} picklist', (plst) => {
    cy.visit('https://viewpoint.aqua.glasslewis.com/CustomerDetails/CustomFields/')
    cy.contains(plst).click({ force: true })
    cy.get('#check-active').uncheck({ force: true })
    cy.wait('@ACTIVE_FLAG')
    cy.get('#cf-btn-delete').click({ force: true })
    cy.contains(plst).should('not.exist')
})

Then('the third picklist value should have an arrow up icon visible', () => {
    cy.get('#option-container-edit-3 > span > i.sort-up').should('be.visible')
})

Then('The picklist created {string} should be orange in colour', (name) => {
    cy.get('#txt-filter-col-name').type(name)
    cy.get(`#results-list > li:nth-child(1) > div > label`).should('have.css', 'color', 'rgb(122, 134, 138)')
    cy.get(`#results-list > li:nth-child(29) > div > label`).should('have.css', 'color', 'rgb(255, 83, 13)')
    cy.get('#txt-filter-col-name').clear()
})