const { USER } = require("../../support/constants");

describe('Verify elements on Dashboard page', function () {

    beforeEach(function () {

        // step 1 - Log in External
        cy.loginWithAdmin(USER.CALPERS);

        //step 2 - select Dashboard link
        cy.visit("/Dashboard");
    })

    // Test scenario:39541 https://dev.azure.com/glasslewis/Development/_workitems/edit/39541
    it(`Dashboard check`, function () {

        //step 3 verify sidebar links
        cy.get('#workflow-filter-list > div > h5').eq(0).should('include.text', 'My dashboards')
        cy.get('#workflow-filter-list > div > h5').eq(1).should('include.text', 'Default dashboard')
        cy.get('#workflow-filter-list > div > h5').eq(2).should('include.text', 'Shared dashboards')

        cy.get('#dashboard-name').should('have.text', 'Upcoming Meetings').should('be.visible')
        //step 4 - verify Upcoming Meetings highlighted
        cy.get('.highlightedFilter').should('include.text', 'Upcoming Meetings')

        //step 5 - verify heading buttons and links
        cy.get('#btn-report-save-as').should('be.visible').should('have.text', 'Save As')
        cy.get('#btn-dashboard-config-widgets').should('be.visible')
        cy.get('#btn-dashboard-config-widgets').should('include.text', 'Add Widget')
        cy.get('#btn-report-export').should('be.visible').should('include.text', 'Export')
        cy.get('#anchor-nav > li:nth-child(4) > a').should('be.visible').should('include.text', 'Widgets')
        cy.get('#anchor-nav > li:nth-child(5) > a').should('be.visible').should('include.text', 'Sharing')
        cy.get('#anchor-nav > li:nth-child(6) > a').should('be.visible').should('include.text', 'Subscriptions')
        cy.get('#k10000').should('be.visible')

        //step 6 - verify Widget headers
        cy.get('div.row.handler.widget-header').eq(0).find('.floatleft').should('include.text', 'Workflow: Upcoming Meetings')
        cy.get('div.row.handler.widget-header').eq(1).find('.floatleft').should('include.text', 'Workflow: Upcoming Meetings')
        cy.get('div.row.handler.widget-header').eq(2).find('.floatleft').should('include.text', 'Workflow: Upcoming Meetings')
        cy.get('div.row.handler.widget-header').eq(3).find('.floatleft').should('include.text', 'Glass Lewis Blog')

        //step 7 - verify each widget has edit and remove buttons
        cy.get('div.row.handler.widget-header').each((widget) => {

            cy.wrap(widget).find('div > a[title="Settings"]').should('be.visible')
            cy.wrap(widget).find('div > a[title="Remove"]').should('be.visible')

        })
        // step 8 verify Subscriptions 
        cy.get('#subscriptions-container > h3').should('include.text', 'Subscriptions').click()
        cy.get('#subscriptions-container > div.collapse.expand-collapse > div > span > a').should('include.text', 'Add Subscription')

        //step 9 - add a widget
        cy.get('#btn-dashboard-config-widgets').click({ force: true })
        cy.get('#results-list > li > div > input[value="Previews"]').check({ force: true })
        cy.get('#btn-apply-configure-columns').click()
        cy.get('div.clearfix.widget-settings-data > div.checkbox > label').should('be.visible')

        //step 10 check dropdown values selectable
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

        //step 11 - select certain values
        cy.get('div.row.center > button.secondary.blue').eq(4).click({ force: true })
        cy.wait('@DOCUMENTS_DATA')

        //step 12 - check returned table headers
        cy.get('.dashboard-documents-content > table >thead >tr').within(() => {

            cy.get('td').eq(0).contains('COUNTRY/MARKET')
            cy.get('td').eq(1).contains('SEASON')
            cy.get('td').eq(2).contains('FILE')
        })

        //step 13 - remove widget
        cy.get('div.row.handler.widget-header').eq(4).then((wdgt) => {

            cy.wrap(wdgt).find('div > a[title="Settings"]').should('be.visible')
            cy.wrap(wdgt).find('div > a[title="Remove"]').should('be.visible').click()
        })
    })

})