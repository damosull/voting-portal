describe('Generate Engagement report,download and verify file headers', function () {

    beforeEach(function () {
    sessionStorage.clear()
    cy.intercept('POST', "**/Api/Data/WorkflowExpansion").as('WorkflowExpansion');
    cy.intercept('POST', "**/Api/Data/WorkflowSecuritiesWatchlists").as('WorkflowSecuritiesWatchlists')
    cy.intercept('POST', "**/Api/Data/Filters/CreateDraftFilter").as('filter')
    cy.intercept('GET',"**/Api/Data/Inbox/?Top=0&IsNew=true&IsQueryOnly=true&**").as('Engagement')

    cy.loginExternal();
    cy.visit("/Reporting");
    })

    it(`Generate Report`, function () {

        cy.get('#workflow-filter-list > div > ul > li').then(($rows) => {
            $rows.each((index, value) => {
            const input = 'Engagement'
            const reportType = Cypress.$(value).find(`a > span`).text()
            if(reportType === input){
                cy.log(reportType)
                cy.get(`#workflow-filter-list > div > ul > li:nth-child(${index + 1}) > a > span`).click()
                return false
                }
            });
            })
        cy.wait('@Engagement',{requestTimeout: 10000})
        cy.get('#report-criteria-controls >div > h4').first().click({force:true})
        cy.get('[type="radio"]#rdo-date-range-discrete-InteractionDate').check({force:true})
        cy.get('#discrete-date-start-InteractionDate').clear()
        cy.get('#discrete-date-start-InteractionDate').type('05/07/2021')
        cy.get('#discrete-date-end-InteractionDate').clear({force:true})
        cy.get('#discrete-date-end-InteractionDate').type('05/28/2021')
        cy.get('#btn-InteractionDate-update').click({force:true})
        cy.get('#rpt-columns > div > h3').click({force:true})
        cy.get('div.btn-container.clearfix > button.blue.small').click({force:true})
        cy.get('#rpt-selected-columns > div > table > tbody > tr').each((tr) => {
            cy.wrap(tr)
            .find('input[type="checkbox"]').should('be.checked')
          });
        cy.get('#rpt-download-btn').click()
        cy.get('.toast-message').should('contain.text', 'Your download was initiated. It will appear in the toolbar shortly.');
        cy.get('.notify-count').click();
  
          //Engagement Report is queued
        cy.get('#inbox-container .msg-txt', { timeout: 120000 })
              .should(($msg) => {
                  expect($msg.first().text()).to.include('New Configuration.csv report is ready for download');
        });
              cy.get('#inbox-container [data-pagelink1]').first().invoke('attr', 'data-pagelink1').should('contain', '/Downloads/DownloadExportFromUrl/?requestID=')
              .then((downloadLink) => {
                  cy.request(downloadLink).then((resp) => {
                      expect(resp.status).to.eq(200);
                      expect(resp.headers).to.have.property('content-disposition').eql('attachment; filename=-New-Configuration.csv');
                      expect(resp.headers).to.have.property('content-type').eql('text/csv');
                      
                      expect(resp.body).to.have.length.greaterThan(1);
                      cy.log(resp.body)
                      expect(resp.body).include('Company Name,Interaction Date,Description,Participant Name,Role,Subject');
                  });
              });

    }); // end it

}); //end describe