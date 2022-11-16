import { When, Then } from "@badeball/cypress-cucumber-preprocessor"
import reportingPage from "../page_objects/reporting.page"
const constants = require('../constants')
const unixTime = Math.floor(Date.now() / 1000)
const configName_BallotVoteDataReport = `BallotVoteData_${unixTime}`
const configName_ProxyVotingReport = `ProxyVotingReport_${unixTime}`
const configName_VotingActivityReport = `VotingActivityReport_${unixTime}`
const configName_PolicyReport = `PolicyReport_${unixTime}`
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

Then('I select the {string} report', (reportType) => {
    reportingPage.containsText(reportType).click()
    reportingPage.getLoadingSpinner().should('not.exist')
})

Then('I can verify that the {string} column should {string}', (columnName, visibility) => {
    reportingPage.configureColumnsDropdown().should('be.visible').click()
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

Then('I click on the notification dropdown', () => {
    reportingPage.notificationLink().click()
})

Then('I click on the {string} filter', (filter) => {
    reportingPage.containsText(filter).click()
    cy.wait('@BALLOT_VOTE')
    cy.wait('@BALLOT_CRITERIA')
})

Then('I set the meeting date to next date {int} and past date {int} days', (nextDays, pastDays) => {
    reportingPage.dateRangeModal().invoke('attr', 'style', 'display: block')
    reportingPage.dateRangeDaysInput().invoke('attr', 'style', 'display: block').clear()
    reportingPage.dateRangeNextDaysInput().type(nextDays)
    reportingPage.dateRangePastDaysInput().type(pastDays)
    reportingPage.containsText('Update').click()
})

Then('I select {string} column', (column) => {
    reportingPage.configureColumnsDropdown().click()
    reportingPage.columnsSeventhCheckbox().click({ force: true })
    reportingPage.applyButton().click({ force: true })
    reportingPage.selectedCheckbox().should('contain.text', column)
})

Then('I {string} the report for {string}', (action, reportName) => {
    let reportConfigName
    switch (reportName) {
        case "Ballot Vote Data":
            reportConfigName = configName_BallotVoteDataReport
            break
        case "Proxy Voting":
            reportConfigName = configName_ProxyVotingReport
            break
        case "Voting Activity":
            reportConfigName = configName_VotingActivityReport
            break
        case "Ballot Status Report":
            reportConfigName = 'Ballot Status Report'
            break
        case "Engagement":
            reportConfigName = 'New Configuration'
            break
        case "Ballot Reconciliation":
            reportConfigName = 'New Configuration'
            break
        case "Policy":
            reportConfigName = configName_PolicyReport
            break
        case "Workflow Export Report":
            reportConfigName = 'Upcoming Meetings'
            break
    }

    if (action == 'save') {
        cy.saveFilter(reportConfigName)
        if (reportName.includes('Policy') || reportName.includes('Voting Activity') || reportName.includes('Proxy Voting')) {
            cy.log('These reports do not trigger the ADD api call')
        } else {
            cy.wait('@ADD')
        }
        reportingPage.containsText('My configurations').siblings().find('span').should('contain', reportConfigName)
    } else if (action == 'delete') {
        cy.deleteMyConfiguration(reportConfigName)
    } else if (action.includes('verify ready for download')) {
        reportingPage.inboxContainerDiv().should('be.visible')
        reportingPage.inboxContainerMessages().should(($msg) => {
            expect($msg.first().text()).to.not.include(`fail`)
        })
        reportingPage.inboxContainer().should(($msg) => {
            expect($msg.first().text()).to.include(`${reportConfigName}`)
            expect($msg.first().text()).to.include(`${constants.messages.reports.READY}`)
        })
    } else if (action.includes('verify ready to download')) {
        reportingPage.inboxContainer().should(($msg) => {
            expect($msg.first().text()).to.include(`${reportConfigName}`)
            expect($msg.first().text()).to.include(`is ready to download`)
        })
    }
})

Then('I verify the contents for {string} report', (reportName) => {
    if (reportName == 'Ballot Vote Data') {
        reportingPage.inboxRows().first().invoke('attr', 'data-pagelink1')
            .should('contain', '/Downloads/DownloadExportFromUrl/?requestID=').then((downloadLink) => {
                cy.request(downloadLink).then((resp) => {
                    expect(resp.status).to.eq(200)
                    expect(resp.headers)
                        .to.have.property('content-disposition')
                        .contains(`filename=${configName_BallotVoteDataReport}.csv`)
                    expect(resp.headers).to.have.property('content-type').eql('text/csv')
                    expect(resp.body).include(
                        'Customer Account Name,Customer Account ID,Company,CUSIP,CINS,Country of Trade,Meeting Type,Meeting Date,Record Date,Proposal Order By,Proposal Label,Proposal Text,Proponent,Mgmt,GL Reco,Custom Policy,Vote Decision,For Or Against Mgmt,Rationale,Meeting Note,Ballot Voted Date,Issue Code,Issue Code Category,Shares Listed,Control Number Key,Ballot Status,Ballot Blocking,Agenda Key'
                    )
                })
            })
    } else if (reportName == 'Ballot Status') {
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
    } else if (reportName == 'Engagement') {
        reportingPage.inboxRows().first().invoke('attr', 'data-pagelink1')
            .should('contain', '/Downloads/DownloadExportFromUrl/?requestID=').then((downloadLink) => {
                cy.request(downloadLink).then((resp) => {
                    expect(resp.status).to.eq(200)
                    expect(resp.headers)
                        .to.have.property('content-disposition')
                        .contains('filename=-New-Configuration.csv')
                    expect(resp.headers).to.have.property('content-type').eql('text/csv')
                    expect(resp.body).to.have.length.greaterThan(1)
                    expect(resp.body).include(
                        'Company Name,Created Date,Date of Engagement,Other Participants,Themes,Type,Notes,Participant Name,Role,Title'
                    )
                })
            })
    } else if (reportName == 'Ballot Reconciliation') {
        reportingPage.inboxRows().first().invoke('attr', 'data-pagelink1')
            .should('contain', '/Downloads/DownloadExportFromUrl/?requestID=').then((downloadLink) => {
                cy.request(downloadLink).then((resp) => {
                    expect(resp.status).to.eq(200)
                    expect(resp.headers)
                        .to.have.property('content-disposition')
                        .contains('filename=-New-Configuration.csv')
                    expect(resp.headers).to.have.property('content-type').eql('text/csv')

                    expect(resp.body).to.have.length.greaterThan(1)
                    expect(resp.body).include(
                        'Customer Account Name,Customer Account Number,Custodian Name,Company Name,Meeting Date,Agenda Key,Country of Incorporation,Custodian Account Number,Customer Name,Deadline Date,Most Recent Note'
                    )
                })
            })
    } else if (reportName == 'Policy') {
        reportingPage.inboxRows().first().invoke('attr', 'data-pagelink1')
            .should('contain', '/Downloads/DownloadExportFromUrl/?requestID=').then((downloadLink) => {
                cy.request(downloadLink).then((resp) => {
                    expect(resp.status).to.eq(200)
                    expect(resp.headers).to.have.property('content-disposition').contains(configName_PolicyReport)
                    expect(resp.headers)
                        .to.have.property('content-type')
                        .contains('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
                    expect(resp.body).to.have.length.greaterThan(1)
                })
            })
    } else if (reportName == 'Voting Activity') {
        cy.parseXlsx(`cypress/downloads/${configName_VotingActivityReport}.xlsx`).then((xlxsData) => {
            reportColumns.forEach((fields) => {
                expect(JSON.stringify(xlxsData)).to.include(fields)
            })
        })
    } else if (reportName == 'Proxy Voting') {
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
    } else if (reportName == 'Workflow Export') {
        reportingPage.inboxRows().first().invoke('attr', 'data-pagelink1')
            .should('contain', '/Downloads/DownloadExportFromUrl/?requestID=').then((downloadLink) => {
                cy.request(downloadLink).then((resp) => {
                    expect(resp.status).to.eq(200)
                    expect(resp.headers)
                        .to.have.property('content-disposition')
                        .contains(`filename=Upcoming-Meetings.csv`)
                    expect(resp.headers).to.have.property('content-type').eql('text/csv')
                    expect(resp.body).include('Company Name,Agenda Key,Policy ID,Control Number,Decision Status,Security Country of Trade,Deadline Date,Meeting Date,Record Date,Meeting Type,Shares,Ballot Blocking')
                })
            })
    }
})

Then('I click on the download the report button', () => {
    reportingPage.downloadButton().click()
})

Then('the download initiated toast message appears', () => {
    reportingPage.toastMessage().should('contain.text', constants.messages.toast.DOWNLOAD_STARTED)
})

Then('I Add Subscription', () => {
    reportingPage.subscriptionHeading().click()
    reportingPage.containsText('Add Subscription').click()
})

Then('I select Calpers External Admin from Users list on reporting page', () => {
    reportingPage.usersListDropdown().click().type('{downarrow}{downarrow}{downarrow}{enter}').blur()
})

Then('I enter Filename for Subscription Report', () => {
    reportingPage.subscriptionFilenameInput().type('SubscribeTest')
})

Then('I enter Schedule to run Subscription on reporting page', () => {
    // (Weekly/8AM/Sunday)
    reportingPage.scheduleDropdown().select('1')
    reportingPage.scheduleSunday().check({ force: true })
})

Then('I click on the Ok button', () => {
    reportingPage.okButton().click()
})

Then('Subscription added toast message appears', () => {
    reportingPage.toastMessage().should('contain.text', constants.messages.toast.SUBSCRIPTION_ADDED)
})

Then('Verify UI table entries for newly created Subscription', () => {
    reportingPage.subscriptionTableData().eq(1).should('include.text', 'CalpersAutomation External Admin')
    reportingPage.subscriptionTableData().eq(2).should('include.text', 'Weekly')
    reportingPage.subscriptionTableData().eq(3).should('include.text', 'Run at: ')
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
        assert.equal(cols[7], 0) // Deliver to Everyone = false
        assert.equal(cols[12], 'SubscribeTest') // Filename
        cy.get('@userid').then(function (uid) {
            assert.equal(cols[13], uid) // Created by
        })
        assert.equal(cols[17], 196) // Customer ID
        expect(cols).to.have.length(19) // Total Fields
    })
})

Then('I remove Subscription entry from Viewpoint on reporting page', () => {
    reportingPage.deleteSubscriptionLink().first().click({ force: true })
    reportingPage.saveButton().click()
})

Then('I select {string} Report Type', (report_type) => {
    cy.selectReportType(report_type)
})

Then('I select Interaction Date between {string} and {string}', (start_date, end_date) => {
    cy.wait('@CUSTOMER_NAME_SPECIAL')
    reportingPage.dateCriteriaDropdown().first().should('be.visible').click()
    reportingPage.dateCriteriaBetweenRadio().check()
    reportingPage.dateCriteriaStartDate().clear({ force: true }).type(start_date, { force: true })
    reportingPage.dateCriteriaEndDate().clear({ force: true }).type(end_date, { force: true })
})

Then('I click on the Update button', () => {
    reportingPage.containsText('Update').click({ force: true })
})

Then('I add all the columns', () => {
    reportingPage.configureColumnsDropdown().click({ force: true })
    reportingPage.includeAllButton().click({ force: true })
    reportingPage.selectedColumns().each((tr) => {
        cy.wrap(tr).find('input[type="checkbox"]').should('be.checked')
    })
})

Then('I add {string} reporting criteria', (criteria) => {
    cy.AddMultipleCriteria([criteria], true)
    // Click on configure colum drop down and checking that is opened
    reportingPage.configureColumnsDropdown().click()
    reportingPage.availableColumnsHeader().should('be.visible')
})

Then('I add the first 4 column option into the header list', () => {
    reportingPage.availableColumns().each((el, index) => {
        cy.wrap(el).find(':checkbox').check({ force: true })
        // Only select first 4 items
        if (index > 3) {
            return false
        }
    })
})

Then('I click on the Apply button', () => {
    reportingPage.applyButton().click()
})

Then('I remove any existing report criteria', () => {
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

Then('I select Report Extension XLS', () => {
    reportingPage.reportId().children().find('select').select('xls'.toUpperCase())
})

Then('I select the past {int} days', (pastDays) => {

    // The reason I have two actions for the same input is because for some reason it takes roughly 5 seconds to type the past days, whereas with two actions is straight away
    // step 5 - Select past days
    reportingPage.meetingDateModal().invoke('attr', 'style', 'display: block')
    reportingPage.dateRangeDaysInput().invoke('attr', 'style', 'display: block').clear()
    reportingPage.dateRangeDaysInput().invoke('attr', 'style', 'display: block').type(pastDays)
    reportingPage.containsText('Update').click()
    reportingPage.meetingDateDropdown().contains(`Past ${pastDays} Days`)
})

Then('I expand Vote Comparison and select GL Recs Against Mgmt', () => {
    reportingPage.voteComparisonModal().invoke('attr', 'style', 'display: block')
    reportingPage.voteComparisonCheckboxes().contains('GL Recs Against Mgmt').siblings().check({ force: true }).should('be.checked')
    reportingPage.voteComparisonUpdateButton().click()
    reportingPage.containsText('All meeting agenda items (1)').should('be.visible')
})

Then('I filter the report type', () => {
    reportingPage.reportId().children().find('select').select(fileExtension.toUpperCase())
    reportingPage.meetingDateRange().invoke('attr', 'style', 'display: block')
})

Then('I set the date range to the last {int} days', (pastDays) => {
    reportingPage.dateRangeDaysInput().invoke('attr', 'style', 'display: block').clear()
    reportingPage.dateRangeDaysInput().invoke('attr', 'style', 'display: block').type(pastDays)
    reportingPage.containsText('Update').click()
    reportingPage.meetingDateRangeEditor().contains(`Past ${pastDays} Days`)
})

When('I select Decision Status Criteria', () => {
    cy.AddMultipleCriteria(['Decision Status'], true)
})

When('I select Voted criteria', () => {
    cy.addCriteriaStatus(['Voted'], true)
    reportingPage.containsText(`${['Decision Status'].toString()} (1)`)
})

Then('I add columns to the report', () => {
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

Then('I set the Footer under the Grouping & Presentation', () => {
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

Then('I set the Header under the Grouping & Presentation', () => {
    reportingPage.reportPresentationInputHeader().should('have.attr', 'disabled')
    reportingPage.reportPresentationHeader().then((header) => {
        cy.wrap(header).should('not.be.checked')
        cy.wrap(header).parent().invoke('attr', 'style', 'display: block')
        cy.wrap(header).check({ force: true })
    })
    reportingPage.containsText('The presentation header must be completed or unselected.')
})

Then('I add subscription to the report', () => {
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

Then('the voting activity report saved message appears', () => {
    reportingPage.toastMessage().should('contain.text', constants.messages.toast.REPORT_SAVED)
})

Then('the saved config name appears under My configuration section', () => {
    reportingPage.containsText('My configurations').siblings().find('span').should('contain', configName_VotingActivityReport)
})

Then('the voting activity report is downloaded', () => {
    cy.downloadFileLocal('Voting Activity')
    cy.assertFileProperties(configName_VotingActivityReport, fileExtension)
})

Then('The notification dropdown {string} contain a notification mentioning {string}', (isVisible, content) => {
    isVisible = isVisible.includes('not') ? 'not.exist' : 'exist'
    reportingPage.notificationLink().click()
    reportingPage.inboxContainerDiv().contains(content).should(isVisible)
})