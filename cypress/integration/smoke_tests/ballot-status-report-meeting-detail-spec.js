import { messages } from '../../support/constants';
const toast = messages.toast;

describe('ballot status report meeting detail page ', function () {
  beforeEach(function () {
    cy.viewport(1110, 900);
    cy.intercept('POST', '**/Api/Data/WorkflowExpansion').as('WorkflowExpansion');
    cy.intercept('POST', '**/Api/Data/WorkflowSecuritiesWatchlists').as('WorkflowSecuritiesWatchlists');
    cy.intercept('POST', '**/Api/Data/Filters/CreateDraftFilter').as('filter');

    cy.loginExtAdm('Calpers');
    cy.visit('/');
    cy.wait('@WorkflowExpansion');
    cy.wait('@WorkflowSecuritiesWatchlists');
  });

  it(`ballot status export PDF report`, function () {
    cy.removeAllExistingSelectedCriteria();

    cy.AddMultipleCriteria(['Decision Status']);
    cy.addCriteriaStatus(['Recommendations Pending']);

    cy.selectFirstMeeting();

    cy.wait('@filter');

    // export the ballot status report
    cy.get('#exportMeetingDetails > .nav > .dropdown > .dropdown-toggle').click();
    cy.get('#exportBallotStatusReport').click();
    cy.get('#pdf').click();
    cy.get('#btn-export').click();

    cy.get('.toast-message').should('contain.text', toast.EXPORT_INITIATED);

    cy.get('.notify-count').click();

    //Ballot Status Report is queued
    cy.get('#inbox-container .msg-txt', { timeout: 120000 }).should(($msg) => {
      expect($msg.first().text()).to.equal("'Ballot Status Report' export is ready to download");
    });

    // download PDF & verify
    cy.get('#inbox-container [data-pagelink1]')
      .first()
      .invoke('attr', 'data-pagelink1')
      .should('contain', '/Downloads/DownloadExportFromUrl/?requestID=')
      .then((downloadLink) => {
        cy.request(downloadLink).then((resp) => {
          expect(resp.status).to.eq(200);
          expect(resp.headers)
            .to.have.property('content-disposition')
            .eql('attachment; filename=BallotStatusReport.pdf');
          expect(resp.headers).to.have.property('content-type').eql('application/pdf');

          expect(resp.body).to.have.length.greaterThan(1);
          expect(resp.body).include('%PDF');
        });
      });
  });
});