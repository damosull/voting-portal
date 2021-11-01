//Test scenario 43748 - https://dev.azure.com/glasslewis/Development/_workitems/edit/43748
const { USER, MEETINGID } = require('../../support/constants');
import '../../support/commands.js';
const unixTime = Math.floor(Date.now() / 1000);
const configName = `?byCategory=true&userID=11335&_=${unixTime}`;
const settings = `?&pCustomerID=544&_=${unixTime}`;
const ballotConfigName = `BallotVoteData_${unixTime}`;
const nextDays = 2;
const pastDays = 2;

describe('US 43538 - Ballot Vote Data Report - Add ACSI Rec column - Customer permission Enabled,User Enabled', function () {
    beforeEach(function () {
        cy.intercept('POST', '**/Api/Data/WorkflowExpansion').as('WorkflowExpansion');
        cy.intercept('POST', '**/Api/Data/WorkflowSecuritiesWatchlists').as('WorkflowSecuritiesWatchlists');
        cy.intercept('POST', '**/Api/Data/Assignee/GetAvailableAssigneesForCustomer').as('AvailableAssigneesForCustomer');
        cy.intercept('GET', '/Api/Data/CustomerDynamic/**').as('CustomerDynamic')
        cy.intercept('POST', '/Api/Data/CustomerDynamic').as('PostCustomerDynamic')
        cy.intercept('GET', '/Api/Data//ListService/**').as('ListService')
        cy.intercept('GET', '/Api/Data/**').as('GetApiData')
        cy.intercept('GET', '**/Api/Data/BallotReconciliation/**').as('BallotRecon');
        cy.intercept(
            'GET',
            '**/Api/Data/BallotVoteData/?PageInfo%5BIgnorePagesize%5D=true&ReportType=BallotVoteData&_=**'
        ).as('BallotVote');
        cy.intercept('POST', '**/Api/WebUI//ReportsCriteria/ForCriterias?&objectType=BallotVoteData').as('BallotCriteria');
    });

    it('Internal User - Update Customer and User permissions to add ACSI to Ballot Vote Data Report', function () {
        //Step 1 - Login as Internal user
        cy.loginInternalAdm('AutomationInternal');
        cy.visit('/Workflow');

        //Alias csrf token
        cy.wait('@WorkflowExpansion').then((resp) => {
            var csrftoken = resp.request.headers.csrftoken;
            cy.wrap(csrftoken).as('csrftoken');
        });
        cy.wait('@WorkflowSecuritiesWatchlists');

        //Step 2 - From Settings,open Customer from dropdown menu
        cy.get('#admin-link-container > a > span').click({ force: true })
        cy.get('#navlink--customers').click()
        cy.wait('@CustomerDynamic')
        cy.get('#company-name-target-CustomerName').invoke('attr', 'style', 'display: block');

        //Step 3 - Enter Russell Investments in the Customer search field
        cy.get('#company-name-target-CustomerName > div.k-widget.k-multiselect.k-header > div > input').type('Russell Investments')
        cy.wait('@ListService')
        cy.wait('@PostCustomerDynamic')
        cy.get('select#txt-company-name-CustomerName').invoke('attr', 'style', 'display: block');
        cy.get('#txt-company-name-CustomerName > option').first().click({ force: true })
        cy.get('#company-name-target-CustomerName > div.k-widget.k-multiselect.k-header > div > input').type('{ENTER}')

        //Step 4 - Click Update button 
        cy.get('#btn-update-CustomerName').click()

        //Step 5 - Click the Russell Investments link under Customer Name
        cy.get('#customer-grid-kendo > div.k-grid-content > table > tbody > tr > td:nth-child(2) > a').click()
        cy.get('input#ckb-view-acsi.vgcheckbox').invoke('attr', 'style', 'display: block');
        cy.wait('@GetApiData')

        //Step 6 - turn on ACSI checkbox via API
        cy.get('@csrftoken').then((token) => {
            cy.request({
                method: 'GET',
                url: `https://viewpoint.aqua.glasslewis.com/Api/Data/CustomerDetails//GetByID${settings}`,
                headers: {
                    CSRFToken: token,
                },
            }).then((resp) => {
                expect(resp.status).to.eq(200);
                const custPermissions = resp.body;

                custPermissions.SettingsViewModel.ViewACSI = true;

                const newBody = custPermissions;
                cy.request({
                    method: 'PUT',
                    url: 'https://viewpoint.aqua.glasslewis.com/Api/Data/CustomerDetailsUpdate/',
                    //url: 'https://viewpoint.aqua.glasslewis.com/Api/Data/CustomerDetails/544',
                    headers: {
                        CSRFToken: token,
                        'Content-Type': 'application/json; charset=utf-8',
                    },
                    body: newBody,
                }).then((resp) => {
                    expect(resp.status).to.eq(200);
                });

            });
        });

        //Step 8 - From Settings,Open User Permissions and enter RussellAutomation@glasslewis.com
        cy.get('#admin-link-container > a > span').click({ force: true })
        cy.get('#navlink--user-permissions').click()
        cy.get('#userName').type('RussellAutomation@glasslewis.com')
        cy.get('#userName_listbox > li').first().click()

        // Step 9 - Read User Permissions 
        cy.get('body').then(($body) => {
            const $html = Cypress.$($body);
            const csrf = $html.find('input[name=csrf-token]').val();
            cy.log(csrf)
            cy.request({
                method: 'GET',
                url: `https://viewpoint.aqua.glasslewis.com/Api/Data/Permissions/GetUserPermissions${configName}`,
                headers: {
                    CSRFToken: csrf,
                },

            }).then((resp) => {
                expect(resp.status).to.eq(200);

                cy.log(resp.body.User.UserID)
                cy.log(resp.body.Categories[32].Permissions[7].Allowed)
            });
        });

        cy.getAutomationUserIDFromDB(USER.RUSSELL).as('userid');
        //Step 10 - Update RussellAutomation External Admin permissions from Denied 
        //to Explicitally Allowed for Permission.Workflow.Meeting.VoteCard.ViewAcsiRecs 
        cy.get('@userid').then((uid) => {
            cy.get('body').then(($body) => {
                // we can use Cypress.$ to parse the string body
                // thus enabling us to query into it easily
                const $html = Cypress.$($body);
                const csrf = $html.find('input[name=csrf-token]').val();
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
                                ID: 322,
                                Name: "Permission.Workflow.Meeting.VoteCard.ViewAcsiRecs",
                                Access: "Allow"
                            }]
                    },
                }).then((resp) => {
                    expect(resp.status).to.eq(200);
                });
            });
        });
        //Step 11 - Log out Internal User
        cy.logout()

        //step 12 - Log in as "Russell" Investments user
        cy.loginExtAdm('Russell');
        cy.visit('/Workflow');
        cy.wait('@WorkflowSecuritiesWatchlists');

        //Step 13 - Click Reporting tab
        cy.visit('/Reporting');
        cy.wait('@BallotRecon');

        //Step 14 - Select Ballot Vote Data report 
        cy.contains('Ballot Vote Data').click();
        cy.wait('@BallotVote');
        cy.wait('@BallotCriteria');

        //limit report size to 4 days
        cy.get('#date-range-target-MeetingDate').invoke('attr', 'style', 'display: block');
        cy.get('.k-formatted-value').invoke('attr', 'style', 'display: block').clear();
        cy.get(':nth-child(1) > .k-widget > .k-numeric-wrap > .k-formatted-value').type(nextDays);
        cy.get(':nth-child(2) > .k-widget > .k-numeric-wrap > .k-formatted-value').type(pastDays);
        cy.contains('Update').click();


        //Step 15 - Select ACSI checkbox from Configure Columns 
        cy.get('#rpt-columns > div > h3').click({ force: true });
        cy.contains('ACSI').should('be.visible').click()
        cy.get('button.darkgrey.small').click()
        cy.get(`#rpt-selected-columns > div > table > tbody:nth-child(2) > tr`).last().should('contain', 'ACSI')


        //Step 16 - Save the configuration and download the report
        cy.contains('Save As').click();
        cy.get('#popupTextContainer').should('be.visible').type(ballotConfigName);
        cy.get('#apprise-btn-undefined').should('be.visible');
        cy.get('#apprise-btn-confirm').click();
        cy.contains('My configurations').siblings().find('span').should('contain', ballotConfigName);


        cy.get('#rpt-download-btn').click();
        cy.get('.toast-message').should(
            'contain.text',
            'Your download was initiated. It will appear in the toolbar shortly.'
        );
        cy.get('.notify-count').click();

        cy.get('#inbox-container .msg-txt', { timeout: 120000 }).should(($msg) => {
            expect($msg.first().text()).to.include(`${ballotConfigName}.csv report is ready for download`);
        });

        //step 17 - Verify correct headers
        cy.get('#inbox-container [data-pagelink1]')
            .first()
            .invoke('attr', 'data-pagelink1')
            .should('contain', '/Downloads/DownloadExportFromUrl/?requestID=')
            .then((downloadLink) => {
                cy.request(downloadLink).then((resp) => {
                    expect(resp.status).to.eq(200);
                    expect(resp.headers)
                        .to.have.property('content-disposition')
                        .contains(`attachment; filename=${ballotConfigName}.csv`);
                    expect(resp.headers).to.have.property('content-type').eql('text/csv');
                    expect(resp.body).include(
                        'Customer Account Name,Customer Account ID,Company,CUSIP,CINS,Country of Trade,Meeting Type,Meeting Date,Record Date,Proposal Order By,Proposal Label,Proposal Text,Proponent,Mgmt,GL Reco,Custom Policy,ACSI,Vote Decision,For Or Against Mgmt,Rationale,Meeting Note,Issue Code,Issue Code Category,Shares Listed,Control Number Key,Ballot Status,Ballot Blocking,Agenda Key'
                    );
                });
            });

        cy.deleteMyConfiguration(ballotConfigName);
    })
})