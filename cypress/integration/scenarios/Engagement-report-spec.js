// Test scenario 37963 : https://dev.azure.com/glasslewis/Development/_testPlans/define?planId=37349&suiteId=37350

import { messages } from '../../support/constants';
const report = messages.reports;
const toast = messages.toast;

describe('Generate Engagement report,download and verify file headers', function () {
  beforeEach(function () {
    cy.intercept('GET', '**/Engagement/?PageInfo%5BIgnorePagesize%5D=true&ReportType=Engagement&_=**').as('engagement');
    cy.intercept('POST', '**/Api/WebUI//ReportsCriteria/ForCriterias?&objectType=Engagement').as('criteriaEngagement');

    cy.loginExtAdm('Calpers');
    cy.visit('/Reporting');
  });

  // Generate report
  it(`Generate Report`, function () {
    cy.selectReportType('Engagement');

    cy.wait('@engagement');
    cy.wait('@criteriaEngagement');

    cy.get('#report-criteria-controls >div > h4').first().click({ force: true });
    cy.get('[type="radio"]#rdo-date-range-discrete-InteractionDate').check({ force: true }).should('be.checked');
    cy.get('#discrete-date-start-InteractionDate').clear({ force: true }).fill('05/07/2021', { force: true });
    cy.get('#discrete-date-end-InteractionDate').clear({ force: true }).fill('05/28/2021', { force: true });
    cy.contains('Update').click({ force: true });
    cy.get('#rpt-columns > div > h3').click({ force: true });
    cy.get('div.btn-container.clearfix > button.blue.small').click({ force: true });
    cy.get('#rpt-selected-columns > div > table > tbody > tr').each((tr) => {
      cy.wrap(tr).find('input[type="checkbox"]').should('be.checked');
    });
    cy.get('#rpt-download-btn').click();
    cy.get('.toast-message').should('contain.text', toast.DOWNLOAD_STARTED);
    cy.get('.notify-count').click();

    //Engagement Report is queued
    cy.get('#inbox-container .msg-txt').should(($msg) => {
      expect($msg.first().text()).to.include(`New Configuration.csv ${report.READY}`);
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
          expect(resp.body).include(
            'Date of Engagement'
            //tempoarily removing this list while there is development work being carried out on this order  
            //  'Created Date,Date of Engagement,Decision Status,Other Participants,Themes,Type,Notes,Participant Name,Role,Title'
          );
        });
      });
  }); // end it
}); //end describe
