/// <reference path="../../support/index.d.ts" />

describe('Verify comments on the Workflow page', function () {
  beforeEach(function () {
    cy.viewport(1110, 900);
    cy.intercept('POST', '**/Api/Data/WorkflowExpansion').as('WorkflowExpansion');
    cy.intercept('POST', '**/Api/Data/WorkflowSecuritiesWatchlists').as('WorkflowSecuritiesWatchlists');
    cy.intercept('POST', '**/Api/Data/Filters/CreateDraftFilter').as('filter');

    cy.loginExternal();
    cy.visit('/Workflow');
    cy.wait('@WorkflowExpansion');
    cy.wait('@WorkflowSecuritiesWatchlists');

    cy.removeAllExistingSelectedCriteria();
    cy.AddMultipleCriteria(['Decision Status']);
    cy.addCriteriaStatus(['Recommendations Pending']);

    cy.selectFirstMeeting();

    cy.wait('@filter');
  });

  it(`Add Comment to each Rationale,Save and verify toast message`, function () {
    cy.verifyMeetingOptionButtons();

    //Iterate through Rationales,add text entry,Save and verify Toast message after each entry

    cy.get('#md-votecard-grid-results > tr').each(($ele, $idx) => {
      cy.get(`#md-votecard-grid-results > tr:nth-child(${$idx + 1}) > td:nth-child(3)`);

      const voting = $ele.text();
      if (!voting.includes('Non Voting')) {
        cy.get(`tr:nth-child(${$idx + 1}) > td.cell-with-rationale > div > div > span`)
          .scrollIntoView()
          .click({ force: true });
        cy.get(
          `tr:nth-child(${$idx + 1}) > td.cell-with-rationale > div > div > div > div.editable-input > textarea`
        ).clear({ force: true });
        cy.get(
          `tr:nth-child(${$idx + 1}) > td.cell-with-rationale > div > div > div > div.editable-input > textarea`
        ).type('test', { force: true });
        cy.get(
          `tr:nth-child(${
            $idx + 1
          }) > td.cell-with-rationale > div > div > div > div.editable-input > div.editable-buttons > button.js-editable-submit.secondary.blue.btn-update`
        ).click({ force: true });
      }
      if ($idx > 4) {
        return false;
      }
    });

    cy.logout();
  });

  it(`Add Meeting Note and Post Private Comment`, function () {
    cy.verifyMeetingOptionButtons();

    //Test Meeting note entry
    cy.get('#meeting-note').click();
    cy.get('#meeting-notes-input').clear();
    cy.get('#meeting-notes-input').type('The quick brown fox jumps over a lazy dog - ~!@#$%^&*-_=+[]|;,./<>? +');
    cy.get(`button[type='submit'`).click();
    cy.get('.toast-message').should('contain.text', 'Meeting note saved');

    //Post Private Comment
    cy.get('#adhoc-users-search-reply-comment_taglist > li').each(($el, index) => {
      cy.wrap($el);
      $el.get(`.k-button > :nth-child(${index}) > span`);
      cy.get(`#adhoc-users-search-reply-comment_taglist > li > span.k-icon.k-delete`).click({ force: true });
    });

    cy.get(`textarea[name='Comment'`).type('hello CalPERS | ExtUser Patrick Corcoran');
    cy.get('#comment-viewable-type').select('Private');
    cy.get('#btn-post-comment').click({ force: true });
    cy.get('.toast-message').should('contain.text', 'Comment saved');
  });
});
