describe('Meeting Recommendation vote tests', function () {


    beforeEach(function () {
        sessionStorage.clear()
        cy.intercept('POST', "**/Api/Data/WorkflowExpansion").as('WorkflowExpansion');
        cy.intercept('POST', "**/Api/Data/WorkflowSecuritiesWatchlists").as('WorkflowSecuritiesWatchlists')
        cy.intercept('POST', "**/Api/Data/Filters/CreateDraftFilter").as('filter')

        cy.loginExternal();
        cy.visit("/Workflow");
        cy.wait('@WorkflowExpansion');
        cy.wait('@WorkflowSecuritiesWatchlists');
        //in the case where there may be no Recommendations Pending on the 
        //first page..filter Decisions for Recommendations Pending
        cy.RemoveCriteriaIfExists('.DecisionStatusEditor', '#remove-editorDiv10')
        cy.RemoveCriteriaIfExists('.WithAgainstManagementEditor', '#remove-editorDiv49')
        cy.RemoveCriteriaIfExists('.WithAgainstGlassLewisEditor', '#remove-editorDiv51')
        cy.get('#btn-add-criteria').click({ waitForAnimations: false });
        cy.get('#txt-filter-criteria').type('decision');
        cy.get(`input[value='Decision Status']`).check({ force: true });
        cy.get('#btn-apply-criteria').click();
        cy.get('#editorDiv10').click()
        cy.get(`input[value='Instructed']`).check({ force: true });
        cy.get('#btn-update-DecisionStatus').click({ force: true });
    });

    it(`Recommendations Available - Vote against each Polcy Recommendation`, function () {

        cy.get('table > tbody > tr').eq(2).within(() => {
            cy.get('[data-js="meeting-details-link"]').first().click({ force: true });
        })
        cy.verifyMeetingOptionButtons();

        cy.get('#md-votecard-grid-results > tr', { timeout: 5000 }).then(($rows) => {
            $rows.each((index, value) => {
                const rec = Cypress.$(value).find('td.vote-card-policy-rec').text()
                if (rec.includes('Non Voting')) {
                    //do nothing
                } else {
                    var selected = Cypress.$(value).find(':selected').text();
                    var option1 = Cypress.$(value).find('option').eq(1).text()
                    var option2 = Cypress.$(value).find('option').eq(2).text()
                    if (Cypress.$(value).find('option').eq(1).text() !== selected) {
                        cy.get(`#md-votecard-grid-results > tr:nth-child(${index + 1}) > td.vote-card-vote-dec > select`).select(option1, { force: true })
                    }
                    else {
                        cy.get(`#md-votecard-grid-results > tr:nth-child(${index + 1}) > td.vote-card-vote-dec > select`).select(option2, { force: true })
                    }

                }
            })

            cy.get('#btn-vote-now').click({ force: true })

            cy.get('.floatright > .green').click({ force: true })
            cy.get('#btn-unlock').should('be.visible').should('have.text', 'Change Vote or Rationale', { timeout: 7000 });
            cy.get('#btn-unlock').click({ force: true });
            cy.verifyMeetingOptionButtons();

            cy.get('#quick-vote-container > span > span').click({ force: true })
            cy.get('#quickVoteSelect').select('Policy Rec', { force: true })

            cy.get('#md-votecard-grid-results > tr').then(($rows) => {
                $rows.each((index, value) => {
                    const rec = Cypress.$(value).find('td.vote-card-policy-rec').text()
                    var selected = Cypress.$(value).find(':selected').text();
                    if (rec.includes('Non Voting') || rec.includes('N/A')) {
                        //do nothing
                    } else {

                        expect(rec).to.equal(selected);
                    }
                })
                cy.get('#btn-vote-now').click({ force: true })
                cy.get('.floatright > .gray').should('be.visible')
                cy.get('.floatright > .green').should('be.visible')
                cy.get('#override-voted').click({ force: true })
                cy.get('.floatright > .green').click({ force: true })
                cy.get('.toast-message').should('contain.text', 'Vote success');
                cy.get('#btn-unlock').should('be.visible').should('have.text', 'Change Vote or Rationale', { timeout: 7000 });
            })

        })

    });

    it(`QuickVote on Recommendations Available - GL Recommendations`, function () {

        cy.get('table > tbody > tr').eq(2).within(() => {
            cy.get('[data-js="meeting-details-link"]').first().click({ force: true });
        })
        cy.verifyMeetingOptionButtons();

        //Do a Quickvote For to move meeting status to Voted
        cy.get('#quick-vote-container > span > span').click({ force: true })
        cy.get('#quickVoteSelect').select('GL Rec', { force: true })
        cy.get('#btn-vote-now').click({ force: true })
        cy.handleErrorModal()

        cy.get('#btn-unlock').should('be.visible').should('have.text', 'Change Vote or Rationale');

    });

});