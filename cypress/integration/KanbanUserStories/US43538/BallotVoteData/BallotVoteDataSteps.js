import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps'
const constants = require ('../../../../support/constants')
const unixTime = Math.floor(Date.now() / 1000)
const configName = `?byCategory=true&userID=`
const settings = `?&pCustomerID=544&_=${unixTime}`
const ballotConfigName = `BallotVoteData_${unixTime}`


Given('I am logged in as the {string} User', (username) => {
  sessionStorage.clear()
  cy.loginWithAdmin(constants.USER[username])
  cy.visit('/Workflow')
})

And('I should logout from the application', () => {
  cy.logout()
})

And('I capture the csrf token from the session', () => {
  //Alias csrf token
  cy.wait('@WORKFLOW_EXPANSION').then((resp) => {
    var csrftoken = resp.request.headers.csrftoken
    cy.wrap(csrftoken).as('csrftoken')
    })
  cy.getAutomationUserIDFromDB(constants.USER.RUSSELL).as('userid')
})

When('I navigate to Customer search page', () => {
  //Step 2 - From Settings,open Customer from dropdown menu
  cy.get('#admin-link-container > a > span').click({ force: true })
  cy.get('#navlink--customers').click()
  cy.wait('@GET_CUSTOMER_DYNAMIC')
  cy.get('#company-name-target-CustomerName').invoke('attr', 'style', 'display: block')
})

And('I search for Russell Investments', () => {
  //Step 3 - Enter Russell Investments in the Customer search field
  cy.get('#company-name-target-CustomerName > div.k-widget.k-multiselect.k-header > div > input').type('Russell Investments')
  cy.wait('@LIST_SERVICE')
  cy.wait('@POST_CUSTOMER_DYNAMIC')
  cy.get('select#txt-company-name-CustomerName').invoke('attr', 'style', 'display: block')
  cy.get('#txt-company-name-CustomerName > option').first().click({ force: true })
  cy.get('#company-name-target-CustomerName > div.k-widget.k-multiselect.k-header > div > input').type('{ENTER}')
  //Step 4 - Click Update button
  cy.get('#btn-update-CustomerName').click()
  //Step 5 - Click the Russell Investments link under Customer Name
  cy.get('#customer-grid-kendo > div.k-grid-content > table > tbody > tr > td:nth-child(2) > a').click()
  cy.get('input#ckb-view-acsi.vgcheckbox').invoke('attr', 'style', 'display: block')
})

And('I update the ASCI setting to {string}', (param) => {
  //Step 6 - turn on ACSI checkbox via API
  cy.get('@csrftoken').then((token) => {
    cy.request({
        method: 'GET',
        url: `https://viewpoint.aqua.glasslewis.com/Api/Data/CustomerDetails/GetByID${settings}`,
        headers: {
            CSRFToken: token,
        },
    }).then((resp) => {
        expect(resp.status).to.eq(200)
        var custPermissions = resp.body

        custPermissions.SettingsViewModel.ViewACSI = param

        var newBody = custPermissions
        cy.request({
            method: 'PUT',
            url: 'https://viewpoint.aqua.glasslewis.com/Api/Data/CustomerDetailsUpdate/',
            headers: {
                CSRFToken: token,
                'Content-Type': 'application/json charset=utf-8',
            },
            body: newBody,
        }).then((resp) => {
            expect(resp.status).to.eq(200)
        })
    })
})
})

And('I update the external admin permissions to {string}', (param) => {
  //Step 8 - From Settings,Open User Permissions and enter RussellAutomation@glasslewis.com
  cy.get('#admin-link-container > a > span').click({ force: true })
  cy.get('#navlink--user-permissions').click()
  cy.get('#userName').type(constants.USER.RUSSELL)
  cy.get('#userName_listbox > li').first().click()
  // Step 9 - Read User Permissions
  cy.get('@userid').then((uid) => {
      cy.get('body').then(($body) => {
          var $html = Cypress.$($body)
          var csrf = $html.find('input[name=csrf-token]').val()
          cy.log(csrf)
          cy.request({
              method: 'GET',
              url: 'https://viewpoint.aqua.glasslewis.com/Api/Data/Permissions/GetUserPermissions' + configName + uid + '&_=' + unixTime,
              headers: {
                  CSRFToken: csrf,
              },

          }).then((resp) => {
              expect(resp.status).to.eq(200)

              cy.log(resp.body.User.UserID)
              cy.log(resp.body.Categories[32].Permissions[7].Allowed)
          })
      })
  })
  //Step 10 - Update RussellAutomation External Admin permissions from Denied 
  //to Explicitally Allowed for Permission.Workflow.Meeting.VoteCard.ViewAcsiRecs
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
                        ID: 322,
                        Name: "Permission.Workflow.Meeting.VoteCard.ViewAcsiRecs",
                        Access: param
                    }]
            },

        }).then((resp) => {
            expect(resp.status).to.eq(200)
        })
    })
  })
})

And('I navigate to the reporting tab', () => {
  cy.visit('/Reporting')
})

And('I select Ballot Vote Data report', () => {
  //Step 14 - Select Ballot Vote Data report
  cy.contains('Ballot Vote Data').click()
  cy.wait('@BALLOT_VOTE')
  cy.wait('@BALLOT_CRITERIA')
})

And('I limit report size to 2 days', () => {
  cy.get('#date-range-target-MeetingDate').invoke('attr', 'style', 'display: block')
  cy.get('.k-formatted-value').invoke('attr', 'style', 'display: block').clear()
  cy.get(':nth-child(1) > .k-widget > .k-numeric-wrap > .k-formatted-value').type('1')
  cy.get(':nth-child(2) > .k-widget > .k-numeric-wrap > .k-formatted-value').type('1')
  cy.contains('Update').click()
})

Then('I can verify that the ACSI checkbox from Configure Columns is visible', () => {
  //Step 15 B -  Select ACSI checkbox from Configure Columns 
  cy.get('#rpt-columns > div > h3').click({ force: true })
  cy.contains('ACSI').should('be.visible').click()
  cy.get('button.darkgrey.small').click()
  cy.get(`#rpt-selected-columns > div > table > tbody:nth-child(2) > tr`).last().should('contain', 'ACSI')
})

Then('I can verify that the ACSI checkbox from Configure Columns is not visible', () => {
  //Step 15 A - Verify ACSI checkbox not visible Configure Columns
  cy.get('#rpt-columns > div > h3').click({ force: true })
  cy.get(`#rpt-selected-columns > div > table > tbody:nth-child(2) > tr`).last().should('not.contain', 'ACSI')
})

When('I save the configuration and download the report', () => {
  //Step 16 - Save the configuration and download the report
  cy.contains('Save As').click()
  cy.get('#popupTextContainer').should('be.visible').type(ballotConfigName)
  cy.get('#apprise-btn-undefined').should('be.visible')
  cy.get('#apprise-btn-confirm').click()
  cy.contains('My configurations').siblings().find('span').should('contain', ballotConfigName)


  cy.get('#rpt-download-btn').click()
  cy.get('.toast-message').should(
      'contain.text',
      'Your download was initiated. It will appear in the toolbar shortly.'
  )
  cy.get('.notify-count').click()

  cy.get('#inbox-container .msg-txt', { timeout: 120000 }).should(($msg) => {
      expect($msg.first().text()).to.include(`${ballotConfigName}.csv report is ready for download`)
  })
})

Then('the {string} header should be included in the report', (asci) => {
  //Step 17 - Verify correct headers
  if(asci === 'ASCI'){
    cy.get('#inbox-container [data-pagelink1]')
        .first()
        .invoke('attr', 'data-pagelink1')
        .should('contain', '/Downloads/DownloadExportFromUrl/?requestID=')
        .then((downloadLink) => {
            cy.request(downloadLink).then((resp) => {
                expect(resp.status).to.eq(200)
                expect(resp.headers)
                    .to.have.property('content-disposition')
                    .contains(`attachment filename=${ballotConfigName}.csv`)
                expect(resp.headers).to.have.property('content-type').eql('text/csv')
                expect(resp.body).include(
                    'Customer Account Name,Customer Account ID,Company,CUSIP,CINS,Country of Trade,Meeting Type,Meeting Date,Record Date,Proposal Order By,Proposal Label,Proposal Text,Proponent,Mgmt,GL Reco,Custom Policy,ACSI,Vote Decision,For Or Against Mgmt,Rationale,Meeting Note,Issue Code,Issue Code Category,Shares Listed,Control Number Key,Ballot Status,Ballot Blocking,Agenda Key'
                )
            })
        })
  } else {
    cy.get('#inbox-container [data-pagelink1]')
        .first()
        .invoke('attr', 'data-pagelink1')
        .should('contain', '/Downloads/DownloadExportFromUrl/?requestID=')
        .then((downloadLink) => {
            cy.request(downloadLink).then((resp) => {
                expect(resp.status).to.eq(200)
                expect(resp.headers)
                    .to.have.property('content-disposition')
                    .contains(`attachment filename=${ballotConfigName}.csv`)
                expect(resp.headers).to.have.property('content-type').eql('text/csv')
                expect(resp.body).include(
                    'Customer Account Name,Customer Account ID,Company,CUSIP,CINS,Country of Trade,Meeting Type,Meeting Date,Record Date,Proposal Order By,Proposal Label,Proposal Text,Proponent,Mgmt,GL Reco,Custom Policy,Vote Decision,For Or Against Mgmt,Rationale,Meeting Note,Issue Code,Issue Code Category,Shares Listed,Control Number Key,Ballot Status,Ballot Blocking,Agenda Key'
            )
        })
    })    
  }
})

And('I delete the ballot configuration', () => {
  cy.deleteMyConfiguration(ballotConfigName)
})

