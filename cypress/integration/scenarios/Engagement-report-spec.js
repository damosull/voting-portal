// Test scenario 37963 : https://dev.azure.com/glasslewis/Development/_testPlans/define?planId=37349&suiteId=37350
describe('Generate Engagement report,download and verify file headers', function () {
  beforeEach(function () {
    cy.intercept('GET', '**/Api/Data/Inbox/?Top=0&IsNew=true&IsQueryOnly=true&**').as('engagement');

    cy.loginExternal();
    cy.visit('/Reporting');
  });

  //generate report
  it(`Generate Report`, function () {
    cy.selectReportType('Engagement');

    cy.wait('@engagement');
    cy.get('#report-criteria-controls >div > h4').first().click({ force: true });
    cy.get('[type="radio"]#rdo-date-range-discrete-InteractionDate').check({ force: true }).should('be.checked');
    cy.get('#discrete-date-start-InteractionDate').clear({ force: true }).type('05/07/2021', { force: true });
    cy.get('#discrete-date-end-InteractionDate').clear({ force: true }).type('05/28/2021', { force: true });
    cy.contains('Update').click();
    cy.get('#rpt-columns > div > h3').click({ force: true });
    cy.get('div.btn-container.clearfix > button.blue.small').click({ force: true });
    cy.get('#rpt-selected-columns > div > table > tbody > tr').each((tr) => {
      cy.wrap(tr).find('input[type="checkbox"]').should('be.checked');
    });
    cy.get('#rpt-download-btn').click();
    cy.get('.toast-message').should(
      'contain.text',
      'Your download was initiated. It will appear in the toolbar shortly.'
    );
    cy.get('.notify-count').click();

    //Engagement Report is queued
    cy.get('#inbox-container .msg-txt').should(($msg) => {
      expect($msg.first().text()).to.include('New Configuration.csv report is ready for download');
    });
    cy.get('#inbox-container [data-pagelink1]')
      .first()
      .invoke('attr', 'data-pagelink1')
      .should('contain', '/Downloads/DownloadExportFromUrl/?requestID=')
      .then((downloadLink) => {
        cy.request(downloadLink).then((resp) => {
          expect(resp.status).to.eq(200);
          expect(resp.headers)
            .to.have.property('content-disposition')
            .eql('attachment; filename=-New-Configuration.csv');
          expect(resp.headers).to.have.property('content-type').eql('text/csv');

          expect(resp.body).to.have.length.greaterThan(1);
          cy.log(resp.body);
          expect(resp.body).include('Company Name,Interaction Date,Description,Participant Name,Role,Subject');
        });
      });
  }); // end it
}); //end describe
