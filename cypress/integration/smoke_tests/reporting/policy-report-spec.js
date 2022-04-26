const { USER } = require("../../../support/constants");

describe('Generate Policy report,download and verify file headers', function () {
  let filename;
  let rnd;

  beforeEach(function () {
    cy.loginWithAdmin(USER.CALPERS);
    cy.visit('/Reporting');
  });

  // Test scenario 37988 Policy report : https://dev.azure.com/glasslewis/Development/_testPlans/define?planId=37349&suiteId=37350
  it.skip(`Generate Policy Report`, function () {
    //select Policy report
    cy.selectReportType('Policy');

    //remove any existing filters
    cy.wait('@BALLOT_RECONCILIATION');
    cy.wait('@REPORT_TYPE');
    cy.wait('@POLICY');
    cy.get('body').then(($body) => {
      if ($body.find('#workflow-filter-list > div > div > ul > li').eq(0).length > 0) {
        cy.get('#workflow-filter-list > div > div > ul > li').each(() => {
          cy.get('#workflow-filter-list > div > div > ul > li:nth-child(1) > a').first().click({ force: true });
          cy.wait('@GET_POLICY');
          cy.get('.dark-red.small.delete-btn').click({ force: true });
          cy.wait('@REMOVE');
        });
      }
    });

    //verify filters and save new filter
    cy.wait('@REPORT_TYPE');
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
    cy.wait('@GET_POLICY');
    cy.wait('@FILE_ADD');
    cy.get('.scrollableContainer > ul  >li')
      .first()
      .find('span[data-bind="text: Name"]')
      .then(($name) => {
        const fname = $name.text();
        cy.log(fname);
        cy.log(filename);
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
  });
});
