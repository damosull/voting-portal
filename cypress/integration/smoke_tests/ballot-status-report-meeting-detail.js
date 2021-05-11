describe('ballot status report meeting detail page ', function () {

    beforeEach(function () {
        sessionStorage.clear()
    cy.server();
    cy.route('POST', "**/Api/Data/WorkflowExpansion").as('WorkflowExpansion');
    cy.route('POST', "**/Api/Data/WorkflowSecuritiesWatchlists").as('WorkflowSecuritiesWatchlists')
    cy.route('POST', "**/Api/Data/Filters/CreateDraftFilter").as('filter')

    cy.loginExternal();
    cy.visit("/Workflow");
    cy.wait('@WorkflowExpansion');
    cy.wait('@WorkflowSecuritiesWatchlists');
    });

    it(`ballot status export PDF report`, function () {

    //in the case where there may be no Recommendations Pending on the 
    //first page..filter Decisions for Recommendations Pending
    cy.get("body").then($body => {
        if ($body.find('#editorDiv10').length > 0) {   
           cy.get('#remove-editorDiv10').click(); 
        }
    });
    cy.get('#btn-add-criteria').click({waitForAnimations: false});
    cy.get('#txt-filter-criteria').type('decision');
    cy.get(`input[value='Decision Status']`).check({ force: true });
    cy.get('#btn-apply-criteria').click();
    cy.get('#editorDiv10').click()
    cy.get(`input[value='AwaitingResearch']`).check({ force: true });
    cy.get('#btn-update-DecisionStatus').click({force: true});
    


    cy.get('table > tbody > tr').eq(2).within(() => {
    cy.get('[data-js="meeting-details-link"]').first().click({force: true});
    })
    cy.wait('@filter')

        // export the ballot status report
        cy.get('#exportMeetingDetails > .nav > .dropdown > .dropdown-toggle').click();
        cy.get('#exportBallotStatusReport').click();
        cy.get('#pdf').click();
        cy.get('#btn-export').click();

        cy.get('.toast-message').should('contain.text', 'Your export was initiated. It will appear in the toolbar shortly.');

        cy.get('.notify-count').click();

        //Ballot Status Report is queued
        cy.get('#inbox-container .msg-txt', { timeout: 120000 })
            .should(($msg) => {
                expect($msg.first().text()).to.equal("'Ballot Status Report' export is ready to download");
            });

        // download PDF & verify
        cy.get('#inbox-container [data-pagelink1]').first().invoke('attr', 'data-pagelink1').should('contain', '/Downloads/DownloadExportFromUrl/?requestID=')
            .then((downloadLink) => {
                cy.request(downloadLink).then((resp) => {

                    expect(resp.status).to.eq(200);
                    expect(resp.headers).to.have.property('content-disposition').eql('attachment; filename=BallotStatusReport.pdf');
                    expect(resp.headers).to.have.property('content-type').eql('application/pdf');
                    
                    expect(resp.body).to.have.length.greaterThan(1);
                    expect(resp.body).include('%PDF');
                });
            });
    });
});