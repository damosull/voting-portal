import { When, And, Then } from "cypress-cucumber-preprocessor/steps"
import reportingPage from "../page_objects/reporting.page"
const constants = require('../constants')
const unixTime = Math.floor(Date.now() / 1000)
const configName_ProxyVotingReport = `ProxyVotingReport_${unixTime}`
const configName_VotingActivityReport = `VotingActivityReport_${unixTime}`
const fileExtension = 'xlsx' /* Options: pdf, xls, xlsx */
const votes = ['Proxy Voting Report', 'Vote Against Management (VAM) Summary', 'Votes Against Policy (VAP) Summary',
    'Number of Meetings', 'Number of Meetings With VAM', 'Number of Proposals With VAM',
    'Number of Meetings With Votes For Mgmt', 'Number of Proposals With Votes For Mgmt', 'Number of No Votes Cast']
const proposalSummary = ['Proposal Summary', 'Mgmt Proposals Voted FOR', 'Mgmt Proposals Voted Against/Withhold',
    'Mgmt Proposals Voted Abstain', 'Mgmt Proposals With No Votes Cast', 'Mgmt Proposals Voted 1 Year',
    'Mgmt Proposals Voted 2 Years', 'Mgmt Proposals Voted 3 Years', 'ShrHldr Proposal Voted FOR',
    'ShrHldr Proposals Voted Against/Withhold', 'ShrHldr Proposals Voted Abstain', 'ShrHldr Proposals With No Votes Cast']
const percentages = ['Number of Proposals', 'Number of Countries (Country of Trade)', '% of All Meetings Voted',
    '% of All Proposals Voted', '% of All Mgmt Proposals', '% of All ShrHldr Proposals']
const reportColumns = ['Meeting Statistics Report', 'Ballot Statistics Report', 'Proposal Statistics Report',
    'Proposal Category Report', 'Proposal Type Report', 'Test - Header']
let filename, rnd


When('I navigate to the Reporting page', () => {
    cy.visit('/Reporting')
})

And('I select the {string} report', (reportType) => {
    reportingPage.containsText(reportType).click()
    reportingPage.getLoadingSpinner().should('not.exist')
})

Then('I can verify that the {string} column should {string}', (columnName, visibility) => {
    reportingPage.configureColumnsDropdown().should('be.visible').click()
    cy.log(typeof (visibility))
    cy.log(JSON.stringify(visibility))
    if (visibility === 'be visible') {
        visibility = 'contain'
    } else {
        visibility = 'not.contain'
    }
    reportingPage.pageBody().should(visibility, columnName)
})

Then('I verify that all the relevant API calls for reporting page are made', () => {
    //6 API Calls Made
    cy.statusCode200('@CURRENT_USER')
    cy.statusCode200('@REPORTS_DEFAULT_DATA')
    cy.statusCode200('@BALLOT_RECONCILIATION')
    cy.statusCode200('@REPORTS_CRITERIA')
    cy.statusCode200('@DATE_RANGE_KNOCKOUT_BINDINGS')
    cy.statusCode200('@DATE_RANGE')
})

And('I click on the notification dropdown', () => {
    reportingPage.notificationLink().click()
})

Then('Ballot Status Report is queued', () => {
    reportingPage.inboxContainer().should(($msg) => {
        expect($msg.first().text()).to.equal("'Ballot Status Report' export is ready to download")
    })
})

Then('I download the PDF and verify it', () => {

    reportingPage.inboxRows().first().invoke('attr', 'data-pagelink1')
        .should('contain', '/Downloads/DownloadExportFromUrl/?requestID=').then((downloadLink) => {
            cy.request(downloadLink).then((resp) => {
                expect(resp.status).to.eq(200)
                expect(resp.headers)
                    .to.have.property('content-disposition')
                    .contains('filename=BallotStatusReport.pdf')
                expect(resp.headers).to.have.property('content-type').eql('application/pdf')
                expect(resp.body).to.have.length.greaterThan(1)
                expect(resp.body).include('%PDF')
            })
        })
})

And('I click on the {string} filter', (filter) => {
    reportingPage.containsText(filter).click()
    cy.wait('@BALLOT_VOTE')
    cy.wait('@BALLOT_CRITERIA')
})

And('I set the meeting date to next date {int} and past date {int} days', (nextDays, pastDays) => {
    reportingPage.dateRangeModal().invoke('attr', 'style', 'display: block')
    reportingPage.dateRangeDaysInput().invoke('attr', 'style', 'display: block').clear()
    reportingPage.dateRangeNextDaysInput().type(nextDays)
    reportingPage.dateRangePastDaysInput().type(pastDays)
    reportingPage.containsText('Update').click()
})

And('I select {string} column', (column) => {
    reportingPage.configureColumnsDropdown().click()
    reportingPage.columnsSeventhCheckbox().click({ force: true })
    reportingPage.applyButton().click({ force: true })
    reportingPage.selectedCheckbox().should('contain.text', column)
})

And('I save the configuration with the name of {string}', (configName) => {
    reportingPage.containsText('Save As').click()
    reportingPage.saveNameInput().should('be.visible').type(configName)
    reportingPage.cancelButton().should('be.visible')
    reportingPage.saveButton().click()
    cy.wait('@ADD')
    reportingPage.containsText('My configurations').siblings().find('span').should('contain', configName)
})

And('I click on the download the report button', () => {
    reportingPage.downloadButton().click()
})

Then('Download initiated toast message appears', () => {
    reportingPage.toastMessage().should('contain.text', constants.messages.toast.DOWNLOAD_STARTED)
})

Then('Report is ready to download message appears in the notifications with the name of {string}', (configName) => {
    reportingPage.inboxContainer().should(($msg) => {
        expect($msg.first().text()).to.include(`${configName}.csv report is ready for download`)
    })
})

Then('I verify the report headers with the name of {string}', (configName) => {
    reportingPage.inboxRows().first().invoke('attr', 'data-pagelink1')
        .should('contain', '/Downloads/DownloadExportFromUrl/?requestID=').then((downloadLink) => {
            cy.request(downloadLink).then((resp) => {
                expect(resp.status).to.eq(200)
                expect(resp.headers)
                    .to.have.property('content-disposition')
                    .contains(`filename=${configName}.csv`)
                expect(resp.headers).to.have.property('content-type').eql('text/csv')
                expect(resp.body).include(
                    'Customer Account Name,Customer Account ID,Company,CUSIP,CINS,Country of Trade,Meeting Type,Meeting Date,Record Date,Proposal Order By,Proposal Label,Proposal Text,Proponent,Mgmt,GL Reco,Custom Policy,Vote Decision,For Or Against Mgmt,Rationale,Meeting Note,Ballot Voted Date,Issue Code,Issue Code Category,Shares Listed,Control Number Key,Ballot Status,Ballot Blocking,Agenda Key'
                )
            })
        })
})

And('I delete the given {string} configuration', (configuration_file_name) => {
    cy.deleteMyConfiguration(configuration_file_name)
})

And('I Add Subscription', () => {
    reportingPage.subscriptionHeading().click()
    reportingPage.containsText('Add Subscription').click()
})

And('I select Calpers External Admin from Users list', () => {
    reportingPage.usersListDropdown().click().type('{downarrow}{downarrow}{downarrow}{enter}').blur()
})

And('I enter Filename for Subscription Report', () => {
    reportingPage.subscriptionFilenameInput().type('SubscribeTest')
})

And('I enter Schedule to run Subscription', () => {
    // (Weekly/8AM/Sunday)
    reportingPage.scheduleDropdown().select('1')
    reportingPage.scheduleSunday().check({ force: true })
})

And('I click on the Ok button', () => {
    reportingPage.okButton().click()
})

Then('Subscription added toast message appears', () => {
    reportingPage.toastMessage().should('contain.text', constants.messages.toast.SUBSCRIPTION_ADDED)
})

And('Verify UI table entries for newly created Subscription', () => {
    reportingPage.subscriptionTableData().eq(1).should('include.text', 'CalpersAutomation External Admin')
    reportingPage.subscriptionTableData().eq(2).should('include.text', 'Daily')
    reportingPage.subscriptionTableData().eq(3).should('include.text', 'Run at: 9:00AM')
    reportingPage.subscriptionTableData().eq(4).should('include.text', 'SubscribeTest')
})

Then('I verify Column data for UserIds and Filename', () => {
    cy.getAutomationUserIDFromDB(constants.USER.CALPERS).as('userid')
    // Connect to Aqua Database and verify new row has been added
    cy.executeQuery('SELECT TOP 1 * FROM SB_Subscription ORDER BY SubscriptionID DESC').then((result) => {
        var cols = []
        for (var j = 0; j < result.length; j++) {
            cols.push(result[j])
        }
        // Verify Column data for UserIds and Filename
        assert.equal(cols[2], 1) // Verify Active
        cy.get('@userid').then(function (uid) {
            assert.equal(cols[3], uid) // SubscriberID
        })
        assert.equal(cols[7], 1) // Deliver to Everyone = false
        assert.equal(cols[12], 'SubscribeTest') // Filename
        cy.get('@userid').then(function (uid) {
            assert.equal(cols[13], uid) // Created by
        })
        assert.equal(cols[17], 196) // Customer ID
        expect(cols).to.have.length(19) // Total Fields
    })
})

And('I remove Subscription entry from Viewpoint', () => {
    reportingPage.deleteSubscriptionLink().first().click({ force: true })
    reportingPage.saveButton().click()
})

And('I select {string} Report Type', (report_type) => {
    cy.selectReportType(report_type)
})

And('I select Interaction Date between {string} and {string}', (start_date, end_date) => {
    cy.wait('@CUSTOMER_NAME_SPECIAL')
    reportingPage.dateCriteriaDropdown().first().should('be.visible').click()
    reportingPage.dateCriteriaBetweenRadio().check()
    reportingPage.dateCriteriaStartDate().clear({ force: true }).type(start_date, { force: true })
    reportingPage.dateCriteriaEndDate().clear({ force: true }).type(end_date, { force: true })
})

And('I click on the Update button', () => {
    reportingPage.containsText('Update').click({ force: true })
})

And('I add all the columns', () => {
    reportingPage.configureColumnsDropdown().click({ force: true })
    reportingPage.includeAllButton().click({ force: true })
    reportingPage.selectedColumns().each((tr) => {
        cy.wrap(tr).find('input[type="checkbox"]').should('be.checked')
    })
})

Then('Engagement Report is queued', () => {
    reportingPage.inboxContainer().should(($msg) => {
        expect($msg.first().text()).to.include(`New Configuration.csv ${constants.messages.reports.READY}`)
    })
})

Then('I validate the Engagement Report', () => {
    reportingPage.inboxRows().first().invoke('attr', 'data-pagelink1')
        .should('contain', '/Downloads/DownloadExportFromUrl/?requestID=').then((downloadLink) => {
            cy.request(downloadLink).then((resp) => {
                expect(resp.status).to.eq(200)
                expect(resp.headers)
                    .to.have.property('content-disposition')
                    .contains('filename=-New-Configuration.csv')
                expect(resp.headers).to.have.property('content-type').eql('text/csv')
                expect(resp.body).to.have.length.greaterThan(1)
                cy.log(resp.body)
                expect(resp.body).include(
                    'Company Name,Created Date,Date of Engagement,Other Participants,Themes,Type,Notes,Participant Name,Role,Title'
                )
            })
        })
})

And('I add {string} reporting criteria', (criteria) => {
    cy.AddMultipleCriteria([criteria], true)
    // Click on configure colum drop down and checking that is opened
    reportingPage.configureColumnsDropdown().click()
    reportingPage.availableColumnsHeader().should('be.visible')
})

And('I add the first 4 column option into the header list', () => {
    reportingPage.availableColumns().each((el, index) => {
        cy.wrap(el).find(':checkbox').check({ force: true })
        // Only select first 4 items
        if (index > 3) {
            return false
        }
    })
})

And('I click on the Apply button', () => {
    reportingPage.applyButton().click()
})

Then('Status Report is queued', () => {
    reportingPage.inboxContainer().should(($msg) => {
        expect($msg.first().text()).to.include('New Configuration.csv report is ready for download')
    })
})

Then('I validate the Ballot Status Report headers', () => {

    reportingPage.inboxRows().first().invoke('attr', 'data-pagelink1')
        .should('contain', '/Downloads/DownloadExportFromUrl/?requestID=').then((downloadLink) => {
            cy.request(downloadLink).then((resp) => {
                expect(resp.status).to.eq(200)
                expect(resp.headers)
                    .to.have.property('content-disposition')
                    .contains('filename=-New-Configuration.csv')
                expect(resp.headers).to.have.property('content-type').eql('text/csv')

                expect(resp.body).to.have.length.greaterThan(1)
                cy.log(resp.body)
                expect(resp.body).include(
                    'Customer Account Name,Customer Account Number,Custodian Name,Company Name,Meeting Date,Agenda Key,Country of Incorporation,Custodian Account Number,Customer Name,Deadline Date,Most Recent Note'
                )
            })
        })
})

And('I remove any existing report criteria', () => {
    reportingPage.pageBody().then(($body) => {
        if ($body.find('#workflow-filter-list > div > div > ul > li').eq(0).length > 0) {
            reportingPage.existingConfigurations().each(() => {
                reportingPage.existingConfigurationsLink().click()
                cy.wait('@GET_POLICY')
                reportingPage.deleteConfigurationsLink().click()
                cy.wait('@REMOVE')
            })
        }
    })
})

Then('I verify the filters', () => {
    cy.wait('@REPORT_TYPE')
    reportingPage.reportExtensionSelect().select('Excel (.xls)').find(':selected').contains('Excel (.xls)')
    reportingPage.reportExtensionSelect().select('Excel (.xlsx)').find(':selected').contains('Excel (.xlsx)')
    reportingPage.policyIdEditor().click({ force: true })
    reportingPage.policyIdCheckbox().check({ force: true })
    reportingPage.policyIdUpdate().click({ force: true })
})

And('I save the new filter with random name', () => {
    // I click on the save buton
    reportingPage.saveAsButton().click({ force: true })

    // I name the file
    cy.randomString(3).then((data) => {
        reportingPage.reportNameInput().type('Test' + data)
        filename = 'Test' + data
        rnd = data.trim() + '.xlsx'
    })

    reportingPage.saveButton().click({ force: true })
    cy.wait('@GET_POLICY')
    cy.wait('@FILE_ADD')
})

Then('Report is ready for download message appears', () => {
    reportingPage.inboxContainer().should(($msg) => {
        expect($msg.first().text()).to.include(filename + '.xlsx report is ready for download')
    })

})

Then('I validate and verify the report', () => {
    reportingPage.inboxRows().first().invoke('attr', 'data-pagelink1')
        .should('contain', '/Downloads/DownloadExportFromUrl/?requestID=').then((downloadLink) => {
            cy.request(downloadLink).then((resp) => {
                expect(resp.status).to.eq(200)
                expect(resp.headers).to.have.property('content-disposition').contains(rnd)
                expect(resp.headers)
                    .to.have.property('content-type')
                    .contains('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
                expect(resp.body).to.have.length.greaterThan(1)
            })
        })
})

And('I select Report Extension XLS', () => {
    reportingPage.reportId().children().find('select').select('xls'.toUpperCase())
})

And('I select the past {int} days', (pastDays) => {

    // The reason I have two actions for the same input is because for some reason it takes roughly 5 seconds to type the past days, whereas with two actions is straight away
    // step 5 - Select past days
    reportingPage.meetingDateModal().invoke('attr', 'style', 'display: block')
    reportingPage.dateRangeDaysInput().invoke('attr', 'style', 'display: block').clear()
    reportingPage.dateRangeDaysInput().invoke('attr', 'style', 'display: block').type(pastDays)
    reportingPage.containsText('Update').click()
    reportingPage.meetingDateDropdown().contains(`Past ${pastDays} Days`)
})

And('I expand Vote Comparison and select GL Recs Against Mgmt', () => {
    reportingPage.voteComparisonModal().invoke('attr', 'style', 'display: block')
    reportingPage.voteComparisonCheckboxes().contains('GL Recs Against Mgmt').siblings().check({ force: true }).should('be.checked')
    reportingPage.voteComparisonUpdateButton().click()
    reportingPage.containsText('All meeting agenda items (1)').should('be.visible')

    cy.saveFilter(configName_ProxyVotingReport)

    reportingPage.toastMessage().should('contain.text', constants.messages.toast.REPORT_SAVED)
    reportingPage.containsText('My configurations').siblings().find('span').should('contain', configName_ProxyVotingReport)
})

Then('I download the proxy voting report', () => {
    reportingPage.containsText('Download').click()
    reportingPage.toastMessage().should('contain.text', constants.messages.toast.DOWNLOAD_STARTED)
    cy.deleteMyConfiguration('ProxyVoting')
})

Then('I verify the proxy voting report', () => {
    reportingPage.notificationLink().click()
    reportingPage.inboxContainer().should(($msg) => {
        expect($msg.first().text()).to.include(configName_ProxyVotingReport + `.xls ${constants.messages.reports.READY}`)
    })

    reportingPage.inboxContainer().contains(configName_ProxyVotingReport).click()
    // The following two waits are for the API's triggered by the download
    cy.intercept('PUT', '**/Api/Data/Inbox/**').as('InboxReport')
    cy.wait('@InboxReport')

    cy.parseXlsx(`cypress/downloads/${configName_ProxyVotingReport}.xls`).then((xlxsData) => {
        votes.forEach((fields) => {
            expect(JSON.stringify(xlxsData)).to.include(fields)
        })
        proposalSummary.forEach((fields) => {
            expect(JSON.stringify(xlxsData)).to.include(fields)
        })
        percentages.forEach((fields) => {
            expect(JSON.stringify(xlxsData)).to.include(fields)
        })
    })
})

And('I filter the report type', () => {
    reportingPage.reportId().children().find('select').select(fileExtension.toUpperCase())
    reportingPage.meetingDateRange().invoke('attr', 'style', 'display: block')
})

And('I set the date range to the last {int} days', (pastDays) => {
    reportingPage.dateRangeDaysInput().invoke('attr', 'style', 'display: block').clear()
    reportingPage.dateRangeDaysInput().invoke('attr', 'style', 'display: block').type(pastDays)
    reportingPage.containsText('Update').click()
    reportingPage.meetingDateRangeEditor().contains(`Past ${pastDays} Days`)
})

And('I select Decision Status Criteria', () => {
    cy.AddMultipleCriteria(['Decision Status'], true)
})

And('I select Voted criteria', () => {
    cy.addCriteriaStatus(['Voted'], true)
    reportingPage.containsText(`${['Decision Status'].toString()} (1)`)
})

And('I add columns to the report', () => {
    reportingPage.reportColumns().then((columns) => {
        cy.wrap(columns).find('h3').invoke('attr', 'class', 'toggle')
        cy.wrap(columns).find('div').invoke('attr', 'style', 'display: block')

        reportingPage.ballotStatsCheckbox().should('be.checked')
        reportingPage.meetingStatsCheckbox().should('be.checked')
        reportingPage.proposalCatCheckbox().should('be.checked')
        reportingPage.proposalStatsCheckbox().should('be.checked')
        reportingPage.proposalTextCheckbox().should('be.checked')

        // I'm using if statements to check the file extension so the test case can be "generic" enough to be re-used with scenarios in the future
        if (fileExtension == 'pdf') {
            reportingPage.proposalReasonCheckbox().should('not.be.checked')
            reportingPage.proposalRawDataCheckbox().should('not.be.checked')
        } else {
            reportingPage.proposalReasonCheckbox().should('be.checked').uncheck({ force: true })
            reportingPage.proposalRawDataCheckbox().should('be.checked').uncheck({ force: true })
            reportingPage.saveButton().click()
        }
    })
})

And('I set the Footer under the Grouping & Presentation', () => {
    reportingPage.reportPresentation().then((presentation) => {
        cy.wrap(presentation).find('h3').invoke('attr', 'class', 'toggle')
        cy.wrap(presentation).find('div').invoke('attr', 'style', 'display: block')

        reportingPage.reportPresentationInputFooter().should('have.attr', 'disabled')
        reportingPage.reportPresentationFooter().then((footer) => {
            cy.wrap(footer).should('not.be.checked')
            cy.wrap(footer).parent().invoke('attr', 'style', 'display: block')
            cy.wrap(footer).check({ force: true })
        })
        reportingPage.containsText('The presentation footer must be completed or unselected.')
    })
})

And('I set the Header under the Grouping & Presentation', () => {
    reportingPage.reportPresentationInputHeader().should('have.attr', 'disabled')
    reportingPage.reportPresentationHeader().then((header) => {
        cy.wrap(header).should('not.be.checked')
        cy.wrap(header).parent().invoke('attr', 'style', 'display: block')
        cy.wrap(header).check({ force: true })
    })
    reportingPage.containsText('The presentation header must be completed or unselected.')
})

And('I add subscription to the report', () => {
    reportingPage.reportSubscriptions().then((subscriptions) => {
        cy.wrap(subscriptions).find('h3').invoke('attr', 'class', 'toggle')
        cy.wrap(subscriptions).find('div').invoke('attr', 'style', 'display: block')
        reportingPage.containsText('Add Subscription').click()

        reportingPage.toastMessage().should('contain.text', constants.messages.toast.REVIEW_FIELDS)
        reportingPage.reportPresentationInputHeader().type('Test - Header').should('have.value', 'Test - Header')
        reportingPage.reportPresentationInputFooter().type('Test - Footer').should('have.value', 'Test - Footer')

        reportingPage.containsText('Add Subscription').click()
        reportingPage.saveNameInput().should('be.visible')
        reportingPage.saveButton().should('be.visible')
        reportingPage.cancelButton().click()
    })
})

And('I save the Voting Activity configuration', () => {
    cy.saveFilter(configName_VotingActivityReport)
})

Then('Report saved message appears', () => {
    reportingPage.toastMessage().should('contain.text', constants.messages.toast.REPORT_SAVED)
})

Then('Saved config name appears under My configuration section', () => {
    reportingPage.containsText('My configurations').siblings().find('span').should('contain', configName_VotingActivityReport)
})

Then('Voting Activity report is queued', () => {
    reportingPage.inboxContainer().should(($msg) => {
        expect($msg.first().text()).to.include(configName_VotingActivityReport + `.${fileExtension} ${constants.messages.reports.READY}`)
    })
})

Then('Report is downloaded', () => {
    cy.downloadFileLocal('Voting Activity')
    cy.assertFileProperties(configName_VotingActivityReport, fileExtension)
})

Then('I am checking the report format', () => {
    // Parsing happens only if it's xlsx. It's using a custom library called node-xlsx
    if (fileExtension == 'xlsx') {
        cy.parseXlsx(`cypress/downloads/${configName_VotingActivityReport}.xlsx`).then((xlxsData) => {
            reportColumns.forEach((fields) => {
                expect(JSON.stringify(xlxsData)).to.include(fields)
            })
        })
    } else {
        cy.log('Please select a .xlsx file type to verify the content.')
    }

})