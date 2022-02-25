describe('Generate basic excel report,download and verify file headers', function () {
  beforeEach(function () {
    cy.intercept('GET', '**/Api/Data/BallotReconciliation/**').as('BallotRecon');

    cy.loginWithAdmin('CALPERS');
    cy.visit('/Reporting');
  });

  //Gererate report additional
  it(`Generate Report`, function () {
    cy.wait('@BallotRecon');
    cy.AddMultipleCriteria(['Policy ID'], true);

    cy.get('#rpt-columns > .section > .toggle').click({ force: true });
    cy.get('#rpt-available-columns-header').should('be.visible');

    //of available list,check first 4
    cy.get('#rpt-available-columns > div > table > tbody > tr ').each((el, index) => {
      cy.wrap(el).find(':checkbox').check({ force: true });
      //only select first 4 items
      if (index > 3) {
        return false;
      }
    }); //end each

    cy.get('.btn-container.clearfix').contains('Apply').click();
    cy.get('#rpt-download-btn').click();
    cy.get('.toast-message').should(
      'contain.text',
      'Your download was initiated. It will appear in the toolbar shortly.'
    );
    cy.get('.notify-count').click();

    //Ballot Status Report is queued
    cy.get('#inbox-container .msg-txt', { timeout: 120000 }).should(($msg) => {
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
          expect(resp.body).include(
            'Customer Account Name,Customer Account Number,Custodian Name,Company Name,Meeting Date,Agenda Key,Country of Incorporation,Custodian Account Number,Customer Name,Deadline Date,Most Recent Note'
          );
        });
      });
  }); // end it
}); //end describe
