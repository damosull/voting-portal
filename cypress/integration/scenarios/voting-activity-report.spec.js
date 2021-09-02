//Test scenario 37939 - https://dev.azure.com/glasslewis/Development/_workitems/edit/37939

import { messages } from '../../support/constants';
const report = messages.reports;
const toast = messages.toast;

describe('Report', () => {
  const pastDays = 1;
  const arrCriteria = ['Decision Status'];
  const unixTime = Math.floor(Date.now() / 1000);
  const configName = `RegressionWorklow3_${unixTime}`;
  const fileExtension = 'xlsx'; /* options: pdf, xls or xlsx */
  const upperFileExt = fileExtension.toUpperCase();
  const reportColumns = [
    'Meeting Statistics Report',
    'Ballot Statistics Report',
    'Proposal Statistics Report',
    'Proposal Category Report',
    'Proposal Type Report',
    'Test - Header'
  ];

  before(() => {
    cy.intercept('GET', '**/Api/Data/BallotReconciliation/**').as('BallotRecon');
    cy.intercept('GET', '**/Api/Data/AVA/?PageInfo%5BIgnorePagesize%5D=true&ReportType=AVA&_=**').as('AVAReport');
    cy.intercept('PUT', '**/Api/Data/Inbox/**').as('InboxReport');
    cy.intercept('GET', '**/Downloads/DownloadExportFromUrl/?requestID=**').as('DownloadReport');
    cy.intercept('GET', '**/Api/Data/Inbox/?Top=10&IsQueryOnly=false&_=**').as('LoadInbox');
    cy.intercept('POST', '**/Api/WebUI//ReportsCriteria/ForCriterias?&objectType=AVAReport').as('AVACriteria');

    cy.loginExtAdm('Calpers');
    cy.visit('/Reporting').url().should('include', 'Reporting');
  });

  it(`- Voting Activity ${upperFileExt}`, () => {
    cy.log('Test scenario 37939 - https://dev.azure.com/glasslewis/Development/_workitems/edit/37939');

    cy.wait('@BallotRecon')

    // step 2 (these are the steps referenced in the test case)
    cy.selectReportType('Voting Activity');

    cy.wait('@AVAReport');
    cy.wait('@AVACriteria');

    // Filter the report type
    cy.get('#rpt-report').children().find('select').select(upperFileExt);

    cy.get('#date-range-target-MeetingDateRange').invoke('attr', 'style', 'display: block');

    // The reason I have two actions for the same input is because for some reason it takes roughly 5 seconds to type the past days, whereas with two actions is straight away
    // step 3
    cy.get('.k-formatted-value').invoke('attr', 'style', 'display: block').clear();
    cy.get('.k-formatted-value').invoke('attr', 'style', 'display: block').type(pastDays);
    cy.contains('Update').click();

    // step 4
    cy.get('.MeetingDateRangeEditor').contains(`Past ${pastDays} Days`);

    // step 5 - Select Criteria
    cy.AddMultipleCriteria(arrCriteria, true);

    // Select option "Voted"
    cy.addCriteriaStatus(['Voted'], true);
    cy.contains(`${arrCriteria.toString()} (1)`);

    // step 6 - Stats & Columns
    cy.get('#rpt-columns').then((columns) => {
      cy.wrap(columns).find('h3').invoke('attr', 'class', 'toggle');
      cy.wrap(columns).find('div').invoke('attr', 'style', 'display: block');

      cy.get('#ava-stats-ballotstats').should('be.checked');
      cy.get('#ava-stats-meetingstats').should('be.checked');
      cy.get('#ava-stats-proposalcat').should('be.checked');
      cy.get('#ava-stats-proposalstats').should('be.checked');
      cy.get('#ava-stats-proposaltext').should('be.checked');

      // I'm using if statements to check the file extension so the test case can be "generic" enough to be re-used with scenarios in the future
      if (fileExtension == 'pdf') {
        cy.get('#ava-stats-proposalreason').should('not.be.checked');
        cy.get('#ava-stats-rawdata').should('not.be.checked');
      } else {
        cy.get('#ava-stats-proposalreason').should('be.checked').uncheck({ force: true });
        cy.get('#ava-stats-rawdata').should('be.checked').uncheck({ force: true });
        cy.get('#apprise-btn-confirm').click();
      }
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

      cy.get('.toast-message').should('contain.text', toast.REVIEW_FIELDS);
      cy.get('#ava-presentation-input-header').type('Test - Header').should('have.value', 'Test - Header');
      cy.get('#ava-presentation-input-footer').type('Test - Footer').should('have.value', 'Test - Footer');

      cy.contains('Add Subscription').click();
      cy.get('#popupTextContainer').should('be.visible');
      cy.get('#apprise-btn-confirm').should('be.visible');
      cy.get('#apprise-btn-undefined').click(); //the ID of this button should be fixed
    });

    cy.saveFilter(configName);

    cy.get('.toast-message').should('contain.text', toast.REPORT_SAVED);
    cy.contains('My configurations').siblings().find('span').should('contain', configName);

    // Download and verify
    cy.contains('Download').click();
    cy.get('.toast-message').should('contain.text', toast.DOWNLOAD_STARTED);
    cy.get('.notify-count').click();
    cy.wait('@LoadInbox');
    cy.get('#inbox-container .msg-txt', { timeout: 180000 }).should(($msg) => {
      expect($msg.first().text()).to.include(configName + `.${fileExtension} ${report.READY}`);
    });

    cy.donwloadFileLocal('Voting Activity');

    cy.assertFileProperties(configName, fileExtension);

    // Delete the report. Moved this block to occur before the XLSX parsing since the download of the file already happened
    cy.deleteMyConfiguration(configName);


    // Parsing happens only if it's xlsx. It's using a custom library called node-xlsx
    if (fileExtension == 'xlsx') {
      cy.parseXlsx(`cypress/downloads/${configName}.xlsx`).then((xlxsData) => {
        reportColumns.forEach((fields) => {
          expect(JSON.stringify(xlxsData)).to.include(fields);
        });

      });
    } else {
      cy.log('Please select a .xlsx file type to verify the content.');
    }

    // Run the task to delete the folder "Download"
    cy.exec('npm run cy:clean');
  });
});
