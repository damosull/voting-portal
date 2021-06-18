//Test scenario 37939 - https://dev.azure.com/glasslewis/Development/_workitems/edit/37939

describe('Regression Viewpoint', () => {
  var pastDays = 3;
  var arrCriteria = ['Decision Status'];
  const unixTime = Math.floor(Date.now() / 1000);
  var configname = `RegressionWorklow3_${unixTime}`;

  beforeEach(() => {
    cy.intercept('GET', '**/Api/Data/BallotReconciliation/**').as('BallotRecon');
    cy.intercept('GET', '**/Api/Data/AVA/?PageInfo%5BIgnorePagesize%5D=true&ReportType=AVA&_=**').as('AVAReport');
    cy.intercept('POST', '**/Api/WebUI//ReportsCriteria/ForCriterias?&objectType=AVAReport').as('AVACriteria');

    cy.loginExternal();
    cy.visit('/Reporting').url().should('include', 'Reporting');
  });

  context('Workflow 3', () => {
    it('Viewpoint Reporting - Create, download and verify voting-activity report', () => {
      cy.log('Test scenario 37939 - https://dev.azure.com/glasslewis/Development/_workitems/edit/37939');
      cy.wait('@BallotRecon');

      // step 2
      cy.contains('Voting Activity').click();
      cy.wait('@AVAReport');
      cy.wait('@AVACriteria');

      cy.get('#date-range-target-MeetingDateRange').invoke('attr', 'style', 'display: block');

      // The reason I have two actions for the same input is because for some reason it takes roughly 5 seconds to type '10', whereas with two actions is straight away
      // step 3
      cy.get('.k-formatted-value').invoke('attr', 'style', 'display: block').clear();
      cy.get('.k-formatted-value').invoke('attr', 'style', 'display: block').type(pastDays);
      cy.contains('Update').click();

      // step 4
      cy.get('.MeetingDateRangeEditor').contains(`Past ${pastDays} Days`);

      // step 5
      cy.AddMultipleCriteria(arrCriteria);

      // step 6 - Stats & Columns
      cy.get('#rpt-columns').then((columns) => {
        cy.wrap(columns).find('h3').invoke('attr', 'class', 'toggle');
        cy.wrap(columns).find('div').invoke('attr', 'style', 'display: block');

        cy.get('#ava-stats-ballotstats').should('be.checked');
        cy.get('#ava-stats-meetingstats').should('be.checked');
        cy.get('#ava-stats-proposalcat').should('be.checked');
        cy.get('#ava-stats-proposalstats').should('be.checked');
        cy.get('#ava-stats-proposaltext').should('be.checked');
        cy.get('#ava-stats-proposalreason').should('not.be.checked');
        cy.get('#ava-stats-rawdata').should('not.be.checked');
      });

      // step 7 - Grouping & Presentation
      cy.get('#rpt-presentation').then((presentation) => {
        cy.wrap(presentation).find('h3').invoke('attr', 'class', 'toggle');
        cy.wrap(presentation).find('div').invoke('attr', 'style', 'display: block');

        //Footer
        cy.get('#ava-presentation-input-footer').should('have.attr', 'disabled');
        cy.get('#ava-presentation-footer').then((footer) => {
          cy.wrap(footer).should('not.be.checked');
          cy.wrap(footer).parent().invoke('attr', 'style', 'display: block');
          cy.wrap(footer).check({ force: true });
        });
        cy.contains('The presentation footer must be completed or unselected.');
      });

      // Header
      cy.get('#ava-presentation-input-header').should('have.attr', 'disabled');
      cy.get('#ava-presentation-header').then((header) => {
        cy.wrap(header).should('not.be.checked');
        cy.wrap(header).parent().invoke('attr', 'style', 'display: block');
        cy.wrap(header).check({ force: true });
      });
      cy.contains('The presentation header must be completed or unselected.');

      //step 8
      cy.get('#rpt-subscriptions').then((subscriptions) => {
        cy.wrap(subscriptions).find('h3').invoke('attr', 'class', 'toggle');
        cy.wrap(subscriptions).find('div').invoke('attr', 'style', 'display: block');
        cy.contains('Add Subscription').click();

        cy.get('.toast-message').should(
          'contain.text',
          'Please review the fields selection, there are invalid fields.'
        );
        cy.get('#ava-presentation-input-header').type('Test - Header').should('have.value', 'Test - Header');
        cy.get('#ava-presentation-input-footer').type('Test - Footer').should('have.value', 'Test - Footer');

        cy.contains('Add Subscription').click();
        cy.get('#popupTextContainer').should('be.visible');
        cy.get('#apprise-btn-confirm').should('be.visible');
        cy.get('#apprise-btn-undefined').click(); //the ID of this button should be fixed
      });

      cy.contains('Save As').click();
      cy.get('#popupTextContainer').should('be.visible').type(configname);
      cy.get('#apprise-btn-undefined').should('be.visible'); //the ID of this button should be fixed
      cy.get('#apprise-btn-confirm').click();
      cy.get('.toast-message').should('contain.text', 'Report Saved');
      cy.contains('My configurations').siblings().find('span').should('contain', configname);

      //download and verify
      cy.contains('Download').click();
      cy.get('.toast-message').should(
        'contain.text',
        'Your download was initiated. It will appear in the toolbar shortly.'
      );
      cy.get('.notify-count').click();
      cy.get('#inbox-container .msg-txt', { timeout: 120000 }).should(($msg) => {
        expect($msg.first().text()).to.include(configname + '.pdf report is ready for download');
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
              .contains(`attachment; filename=${configname}.pdf`);
            expect(resp.headers).to.have.property('content-type').eql('application/pdf');
            // expect(resp.body).include(
            //   'Ballot Statistics Report, Meeting Statistics Report, Proposal Statistics Report, Proposal Category Report, Proposal Type Report'
            // );
          });
        });

      // Delete the report
      cy.contains('My configurations')
        .siblings()
        .find('span')
        .then((myconfig) => {
          cy.wrap(myconfig).each((value, index) => {
            const found = value.text();
            if (found == configname) {
              cy.wrap(myconfig).eq(index).click();
              cy.contains('Delete').click();
              cy.get('.toast-message').should('contain.text', 'Report configuration deleted.');
            }
          });
        });
    });
  });
});
