// Test scenario 37988 Policy report : https://dev.azure.com/glasslewis/Development/_testPlans/define?planId=37349&suiteId=37350
describe('Generate Policy report,download and verify file headers', function () {
  let filename;
  let rnd;

  beforeEach(function () {
    cy.intercept('GET', '**/Api/Data/Inbox/?Top=0&IsNew=true&IsQueryOnly=true&**').as('ReportType');
    cy.intercept('GET', '**/Api/Data/Policy/GetById/**').as('FileUpdate');
    cy.intercept('GET', '**/Api/Data/BallotReconciliation/**').as('BallotRecon');
    cy.intercept('GET', '**/Api/Data/Policy/**').as('policy');
    cy.intercept('GET', '**/Api/Data/Policy/GetById/**').as('getPolicy');
    cy.intercept('DELETE', '**/Api/Data/Policy/**').as('remove');
    cy.loginExtAdm('Calpers');
    cy.visit('/Reporting');
  });

  it(`Generate Policy Report`, function () {
    //select Policy report
    cy.selectReportType('Policy');

    //remove any existing filters
    cy.wait('@BallotRecon');
    cy.wait('@ReportType');
    cy.wait('@policy');
    cy.get('body').then(($body) => {
      if ($body.find('#workflow-filter-list > div > div > ul > li').length > 0) {
        cy.get('#workflow-filter-list > div > div > ul > li').each(() => {
          cy.get('#workflow-filter-list > div > div > ul > li:nth-child(1) > a').click({ force: true });
          cy.wait('@getPolicy');
          cy.get('.dark-red.small.delete-btn').click({ force: true });
          cy.wait('@remove');
        });
      }
    });

    //verify filters and save new filter
    cy.wait('@ReportType');
    cy.get('#report-adhoc-commands-container > div > select')
      .select('Excel (.xls)')
      .find(':selected')
      .contains('Excel (.xls)');
    cy.get('#report-adhoc-commands-container > div > select')
      .select('Excel (.xlsx)')
      .find(':selected')
      .contains('Excel (.xlsx)');
    cy.get('.PolicyIdEditor').click({ force: true });
    cy.get('input[name="opt-PolicyId"]').check({ force: true });
    cy.get('#btn-update-PolicyId').click({ force: true });
    cy.get('#btn-report-save-as').click({ force: true });
    cy.randomString(3).then((data) => {
      cy.get('#popupTextContainer > input[type=text]').type('Test' + data);
      filename = 'Test' + data;
      rnd = data.trim() + '.xlsx';
    });
    cy.get('#apprise-btn-confirm').click({ force: true });
    cy.wait('@FileUpdate');
    cy.get('.scrollableContainer > ul  >li')
      .find('span[data-bind="text: Name"]')
      .then(($name) => {
        const fname = $name.text();
        expect(fname.includes(filename)).to.be.true;
      });

    //download and verify
    cy.get('#rpt-download-btn').click();
    cy.get('.toast-message').should(
      'contain.text',
      'Your download was initiated. It will appear in the toolbar shortly.'
    );
    cy.get('.notify-count').click();
    cy.get('#inbox-container .msg-txt', { timeout: 120000 }).should(($msg) => {
      expect($msg.first().text()).to.include(filename + '.xlsx report is ready for download');
    });
    cy.get('#inbox-container [data-pagelink1]')
      .first()
      .invoke('attr', 'data-pagelink1')
      .should('contain', '/Downloads/DownloadExportFromUrl/?requestID=')

      .then((downloadLink) => {
        cy.request(downloadLink).then((resp) => {
          expect(resp.status).to.eq(200);
          expect(resp.headers).to.have.property('content-disposition').contains(rnd);
          expect(resp.headers)
            .to.have.property('content-type')
            .eql('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
          expect(resp.body).to.have.length.greaterThan(1);
        });
      });
  }); // end it
}); //end describe
