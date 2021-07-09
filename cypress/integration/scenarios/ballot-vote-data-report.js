// Test scenario: 37962 https://dev.azure.com/glasslewis/Development/_workitems/edit/37962
describe('Generate ballot vote data report, download and verify file', function () {
    const nextDays = 2;
    const pastDays = 2;
    const unixTime = Math.floor(Date.now() / 1000);
    const configName = `BallotVoteData_${unixTime}`;



    beforeEach(function () {
        cy.intercept('GET', '**/Api/Data/BallotReconciliation/**').as('BallotRecon');
        cy.intercept('PUT', '**/Api/Data/Inbox/**').as('InboxReport');
        cy.intercept('GET', '**/Api/Data/BallotVoteData/?PageInfo%5BIgnorePagesize%5D=true&ReportType=BallotVoteData&_=**').as('BallotVote');
        cy.intercept('POST', '**/Api/WebUI//ReportsCriteria/ForCriterias?&objectType=BallotVoteData').as('BallotCriteria');

        cy.loginExternal();
        cy.visit("/Reporting");
    })

    it(`Generate Report`, function () {

        cy.wait('@BallotRecon')
        cy.contains('Ballot Vote Data').click()
        cy.wait('@BallotVote');
        cy.wait('@BallotCriteria');

        // Step 4 meeting date next 2/past 2 days
        cy.get('#date-range-target-MeetingDate').invoke('attr', 'style', 'display: block');
        cy.get('.k-formatted-value').invoke('attr', 'style', 'display: block').clear();
        cy.get(':nth-child(1) > .k-widget > .k-numeric-wrap > .k-formatted-value').type(nextDays);
        cy.get(':nth-child(2) > .k-widget > .k-numeric-wrap > .k-formatted-value').type(pastDays);
        cy.contains('Update').click();

        // Step 5 select Ballot Voted Date column
        cy.get('#rpt-columns > div > h3').click({ force: true })
        cy.get(':nth-child(7) > .report-column-ccb > .checkbox > .ccb').click({ force: true })
        cy.get('.btn-container > .darkgrey').click({ force: true })
        cy.get('[data-bind="foreach: Columns.SelectedFixed"] > :nth-child(28) > td > .checkbox > .ccb').should('contain.text', 'Ballot Voted Date')

        // Step 6 save configuraiton 
        cy.contains('Save As').click();
        cy.get('#popupTextContainer').should('be.visible').type(configName);
        cy.get('#apprise-btn-undefined').should('be.visible');
        cy.get('#apprise-btn-confirm').click();
        cy.contains('My configurations').siblings().find('span').should('contain', configName);

        // Step 7 download report 
        cy.get('#rpt-download-btn').click()
        cy.get('.toast-message').should('contain.text', 'Your download was initiated. It will appear in the toolbar shortly.');
        cy.get('.notify-count').click();

        cy.get('#inbox-container .msg-txt', { timeout: 120000 })
            .should(($msg) => {
                expect($msg.first().text()).to.include(`${configName}.csv report is ready for download`);
            });
        cy.get('#inbox-container .msg-txt').first().click();
        cy.wait('@InboxReport');
        cy.get('.notify-count').click().should('be.visible');

        cy.get('#inbox-container [data-pagelink1]')
            .first()
            .invoke('attr', 'data-pagelink1')
            .should('contain', '/Downloads/DownloadExportFromUrl/?requestID=')
            .then((downloadLink) => {
                cy.request(downloadLink).then((resp) => {
                    expect(resp.status).to.eq(200);
                    expect(resp.headers)
                        .to.have.property('content-disposition')
                        .contains(`attachment; filename=${configName}.csv`);
                    expect(resp.headers).to.have.property('content-type').eql('text/csv');
                    expect(resp.body).include(
                        'Customer Account Name,Customer Account ID,Company,CUSIP,CINS,Country of Trade,Meeting Type,Meeting Date,Record Date,Proposal Order By,Proposal Label,Proposal Text,Proponent,Mgmt,GL Reco,Custom Policy,Vote Decision,For Or Against Mgmt,Rationale,Meeting Note,Ballot Voted Date,Issue Code,Issue Code Category,Shares Listed,Control Number Key,Ballot Status,Ballot Blocking,Agenda Key'
                    );

                });
            });

        cy.deleteMyConfiguration(configName);

    }); // end it

}); //end describe