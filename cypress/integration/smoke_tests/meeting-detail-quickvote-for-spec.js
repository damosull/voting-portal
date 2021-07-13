describe('Test QuickVote functionality in MeetingDetails page', function () {
  beforeEach(function () {
    cy.viewport(1100, 900);
    cy.intercept('POST', '**/Api/Data/WorkflowExpansion').as('WorkflowExpansion');
    cy.intercept('POST', '**/Api/Data/WorkflowSecuritiesWatchlists').as('WorkflowSecuritiesWatchlists');
    cy.intercept('POST', '**/Api/Data/Filters/CreateDraftFilter').as('filter');

    cy.loginExternal();
    cy.visit('/Workflow');
    cy.wait('@WorkflowExpansion');
    cy.wait('@WorkflowSecuritiesWatchlists');
  });

  it.skip(`vote on US meeting on Recommendations Pending meeting`, function () {
    cy.get(
      '#workflow-grid-kendo > div.k-pager-wrap.k-grid-pager.k-widget > span.k-pager-sizes.k-label > span > span > span.k-input'
    )
      .type('50')
      .click({ force: true });
    cy.get('table > tbody > tr').then(($rows) => {
      $rows.each((index, value) => {
        const agenda = Cypress.$(value).find(`#metaname-AgendaKey > div > span`).text();

        if (agenda.startsWith('9')) {
          cy.wrap(value).find('#metaname-CompanyName > div > span > a').click({ force: true });
          return false;
        }
      });
    });

    cy.verifyMeetingOptionButtons();

    cy.get('#quick-vote-container > span > span').click({ force: true });
    cy.get('#quickVoteSelect').select('For', { force: true });
    cy.get('#btn-vote-now').click({ force: true });
    cy.handleErrorModal();

    cy.get('#btn-unlock').should('be.visible').should('have.text', 'Change Vote or Rationale');
  });

  it(`Verify Instruct functionality on Recommendations Pending meeting`, function () {
    cy.removeAllExistingSelectedCriteria();

    cy.AddMultipleCriteria(['Decision Status']);
    cy.addCriteriaStatus(['Recommendations Pending']);

    cy.selectFirstMeeting();

    cy.verifyMeetingOptionButtons();

    cy.get('#btn-instruct').click({ force: true });
    cy.get('#-kendo-modal-123abc456xyz').then(($header) => {
      if ($header.is(':visible')) {
        cy.log('visible');
        cy.get(' button.btn.primary.gray').click({ force: true });
      } else {
        cy.log('not visible');
      }
    });
    cy.handleErrorModal();
    cy.verifyMeetingOptionButtons();
  });

  it(`vote on Global meeting on Recommendedations Pending meeting`, function () {
    cy.get('table > tbody > tr').then(($rows) => {
      $rows.each((index, value) => {
        const agenda = Cypress.$(value).find(`#metaname-AgendaKey > div > span`).text();

        if (agenda.startsWith('7')) {
          cy.wrap(value).find('#metaname-CompanyName > div > span > a').click({ force: true });
          return false;
        }
      });
    });

    cy.verifyMeetingOptionButtons();

    cy.get('#quick-vote-container > span > span').click({ force: true });
    cy.get('#quickVoteSelect').select('For', { force: true });
    cy.get('#btn-vote-now').click({ force: true });
    cy.handleErrorModal();

    cy.get('#btn-unlock').should('be.visible').should('have.text', 'Change Vote or Rationale');
  });

  it(`QuickVote on Recommendations Pending meeting`, function () {
    cy.get('table > tbody > tr')
      .eq(2)
      .within(() => {
        cy.get('[data-js="meeting-details-link"]').first().click({ force: true });
      });
    cy.verifyMeetingOptionButtons();

    //Do a Quickvote For to move meeting status to Voted
    cy.get('#quick-vote-container > span > span').click({ force: true });
    cy.get('#quickVoteSelect').select('For', { force: true });
    cy.get('#btn-vote-now').click({ force: true });
    cy.handleErrorModal();

    cy.get('#btn-unlock').should('be.visible').should('have.text', 'Change Vote or Rationale');
  });

  it(`Take No Action on first Recommendations Pending meeting`, function () {
    cy.get('table > tbody > tr')
      .eq(2)
      .within(() => {
        cy.get('[data-js="meeting-details-link"]').first().click({ force: true });
      });
    cy.wait('@filter');

    cy.verifyMeetingOptionButtons();

    cy.get('#btn-take-no-action').click({ force: true });
    cy.handleErrorModal();

    cy.get('#btn-unlock').should('be.visible').should('have.text', 'Change Vote or Rationale');
  });
}); // end describe