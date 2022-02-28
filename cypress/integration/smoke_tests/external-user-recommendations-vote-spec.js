const { USER } = require("../../support/constants");

describe('Meeting Recommendation vote tests', function () {
  beforeEach(function () {
    cy.loginWithAdmin(USER.CALPERS);
    cy.visit('/Workflow');
    cy.wait('@WORKFLOW_EXPANSION');
    cy.wait('@WORKFLOW_SECURITIES_WATCHLIST');

    cy.removeAllExistingSelectedCriteria();
    cy.AddMultipleCriteria(['Decision Status']);
    cy.addCriteriaStatus(['Recommendations Available']);
  });

  it.skip(`Recommendations Available - Vote against each Policy Recommendation`, function () {
    cy.selectFirstMeeting();

    cy.verifyMeetingOptionButtons();

    cy.get('#md-votecard-grid-results > tr').then(($rows) => {
      $rows.each((index, value) => {
        const rec = Cypress.$(value).find('td.vote-card-policy-rec').text();
        if (rec.includes('Non Voting')) {
          //do nothing
        } else {
          var selected = Cypress.$(value).find(':selected').text();
          var option1 = Cypress.$(value).find('option').eq(1).text();
          var option2 = Cypress.$(value).find('option').eq(2).text();
          if (Cypress.$(value).find('option').eq(1).text() !== selected) {
            cy.get(`#md-votecard-grid-results > tr:nth-child(${index + 1}) > td.vote-card-vote-dec > select`).select(
              option1,
              { force: true }
            );
          } else {
            cy.get(`#md-votecard-grid-results > tr:nth-child(${index + 1}) > td.vote-card-vote-dec > select`).select(
              option2,
              { force: true }
            );
          }
        }
      });

      cy.get('#btn-vote-now').click({ force: true });

      cy.get('.floatright > .green').click({ force: true });
      cy.get('#btn-unlock').should('be.visible').should('have.text', 'Change Vote or Rationale');
      cy.get('#btn-unlock').click({ force: true });
      cy.verifyMeetingOptionButtons();

      cy.get('#quick-vote-container > span > span').click({ force: true });
      cy.get('#quickVoteSelect').select('Policy Rec', { force: true });

      cy.get('#md-votecard-grid-results > tr').then(($rows) => {
        $rows.each((index, value) => {
          const rec = Cypress.$(value).find('td.vote-card-policy-rec').text();
          var selected = Cypress.$(value).find(':selected').text();
          if (rec.includes('Non Voting') || rec.includes('N/A')) {
            //do nothing
          } else {
            expect(rec).to.equal(selected);
          }
        });
        cy.get('#btn-vote-now').click({ force: true });
        cy.get('.floatright > .gray').should('be.visible');
        cy.get('.floatright > .green').should('be.visible');
        cy.get('#override-voted').click({ force: true });
        cy.get('.floatright > .green').click({ force: true });
        cy.get('.toast-message').should('contain.text', 'Vote success');
        cy.get('#btn-unlock').should('be.visible').should('have.text', 'Change Vote or Rationale');
      });
    });
    cy.logout();
  });

  it.skip(`QuickVote on Recommendations Available - GL Recommendations`, function () {
    cy.selectFirstMeeting();

    cy.verifyMeetingOptionButtons();

    //Do a Quickvote For to move meeting status to Voted
    cy.get('#quick-vote-container > span > span').click({ force: true });
    cy.get('#quickVoteSelect').select('GL Rec', { force: true });
    cy.get('#btn-vote-now').click({ force: true });
    cy.handleErrorModal();

    cy.get('#btn-unlock').should('be.visible').should('have.text', 'Change Vote or Rationale');
  });
});
