//Test scenario 37939 - https://dev.azure.com/glasslewis/Development/_workitems/edit/37939

import { messages } from '../../support/constants';
const report = messages.reports;
const toast = messages.toast;

describe('Report - Voting Activity', () => {
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
    'Test - Header',
    'Test - Footer',
  ];

  beforeEach(() => {
    cy.intercept('GET', '**/Api/Data/BallotReconciliation/**').as('BallotRecon');
    cy.intercept('GET', '**/Api/Data/AVA/?PageInfo%5BIgnorePagesize%5D=true&ReportType=AVA&_=**').as('AVAReport');
    cy.intercept('POST', '**/Api/WebUI//ReportsCriteria/ForCriterias?&objectType=AVAReport').as('AVACriteria');

    cy.loginExternal();
    cy.visit('/Reporting').url().should('include', 'Reporting');
  });

  it(`Create, download and verify ${upperFileExt} Voting Activity report`, () => {
    cy.log('Test scenario 37939 - https://dev.azure.com/glasslewis/Development/_workitems/edit/37939');

    // I added this block of code to get the current CSRF token and wrap into the variable csrftoken so it can be re-used across the script
    cy.wait('@BallotRecon').then((resp) => {
      var csrftoken = resp.request.headers.csrftoken;
      cy.wrap(csrftoken).as('csrftoken');
    });

    // Access the token and send as a header in the request
    cy.get('@csrftoken').then((token) => {
      // The total number of votes in the report should match the number shown in the workflow, when using the same filters. The reason of the request
      // is to obtain that total number and store into a variable so then the number of votes can be checked in the report
      cy.request({
        method: 'POST',
        url: '/Api/Data/WorkflowExpansion',
        headers: {
          CSRFToken: token,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: {
          'PageInfo[IgnorePagesize]': 'false',
          'PageInfo[Page]': '1',
          'PageInfo[PageSize]': '20',
          'SortInfo[0][FieldName]': 'DeadlineDate',
          'SortInfo[0][SortDirection]': 'asc',
          'FilterInfo[0][FieldName]': 'DeadlineDate',
          'FilterInfo[0][ValueType]': '0',
          'FilterInfo[0][Expressions][0][Operator]': 'Between',
          'FilterInfo[0][Expressions][0][Value]': `-${pastDays},0`,
          'FilterInfo[0][Expressions][0][ValueSemantics]': '1',
          'FilterInfo[0][Expressions][0][SiblingJoin]': 'and',
          'FilterInfo[0][IsPreprocessorFilter]': 'false',
          'FilterInfo[1][FieldName]': 'BallotID',
          'FilterInfo[1][ValueType]': '0',
          'FilterInfo[1][Expressions][0][Operator]': 'IsGreaterThan',
          'FilterInfo[1][Expressions][0][Value]': '0',
          'FilterInfo[1][Expressions][0][ValueSemantics]': '0',
          'FilterInfo[1][Expressions][0][SiblingJoin]': 'and',
          'FilterInfo[1][IsPreprocessorFilter]': 'false',
          'FilterInfo[2][FieldName]': 'DecisionStatus',
          'FilterInfo[2][ValueType]': '0',
          'FilterInfo[2][Expressions][0][Operator]': 'IN',
          'FilterInfo[2][Expressions][0][Value]': 'Approved',
          'FilterInfo[2][Expressions][0][ValueSemantics]': '0',
          'FilterInfo[2][Expressions][0][SiblingJoin]': 'and',
          'FilterInfo[2][IsPreprocessorFilter]': 'false',
          'SelectedFields[Fields][0][ID]': '1',
          'SelectedFields[Fields][1][ID]': '2',
          'SelectedFields[Fields][2][ID]': '15',
          'SelectedFields[Fields][3][ID]': '39',
          'SelectedFields[Fields][4][ID]': '17',
          'SelectedFields[Fields][5][ID]': '10',
          'SelectedFields[Fields][6][ID]': '8',
          'SelectedFields[Fields][7][ID]': '3',
          'SelectedFields[Fields][8][ID]': '7',
          'SelectedFields[Fields][9][ID]': '4',
          'SelectedFields[Fields][10][ID]': '5',
          'SelectedFields[Fields][11][ID]': '6',
          'SelectedFields[Fields][12][ID]': '11',
        },
      }).then((resp) => {
        expect(resp.status).to.eq(200);
        // Parsing and storing the total number into a variable
        const body = JSON.parse(resp.body);
        const totalCount = body.totalCount;
        cy.wrap(totalCount).as('totalCount');
      });
    });

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
    cy.contains('Decision Status (1)');

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

    cy.contains('Save As').click();
    cy.get('#popupTextContainer').should('be.visible').type(configName);
    cy.get('#apprise-btn-undefined').should('be.visible'); //the ID of this button should be fixed
    cy.get('#apprise-btn-confirm').click();
    cy.get('.toast-message').should('contain.text', toast.REPORT_SAVED);
    cy.contains('My configurations').siblings().find('span').should('contain', configName);

    // Download and verify
    cy.contains('Download').click();
    cy.get('.toast-message').should('contain.text', toast.DOWNLOAD_STARTED);
    cy.get('.notify-count').click();
    cy.get('#inbox-container .msg-txt', { timeout: 120000 }).should(($msg) => {
      expect($msg.first().text()).to.include(configName + `.${fileExtension} ${report.READY}`);
    });

    if (fileExtension == 'xlsx') {
      cy.get('#inbox-container .msg-txt').first().click();
      cy.get('.notify-count').click().should('be.visible');
    }

    cy.get('#inbox-container [data-pagelink1]')
      .first()
      .invoke('attr', 'data-pagelink1')
      .should('contain', '/Downloads/DownloadExportFromUrl/?requestID=')

      .then((downloadLink) => {
        cy.request(downloadLink).then((resp) => {
          expect(resp.status).to.eq(200);
          expect(resp.headers)
            .to.have.property('content-disposition')
            .contains(`attachment; filename=${configName}.${fileExtension}`);
          if (fileExtension == 'pdf') {
            expect(resp.headers).to.have.property('content-type').eql('application/pdf');
          } else if (fileExtension == 'xls') {
            expect(resp.headers).to.have.property('content-type').eql('application/vnd.ms-excel');
          } else {
            expect(resp.headers)
              .to.have.property('content-type')
              .eql('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
          }
        });
      });

    // Delete the report. Moved this block to occur before the XLSX parsing since the download of the file already happened
    cy.deleteMyConfiguration(configName);

    // Parsing happens only if it's xlsx. It's using a custom library called node-xlsx
    if (fileExtension == 'xlsx') {
      cy.parseXlsx(`cypress/downloads/${configName}.xlsx`).then((xlxsData) => {
        reportColumns.forEach((fields) => {
          expect(JSON.stringify(xlxsData)).to.include(fields);
        });

        // Its checking the total number of records, obtained from the Workflow API, is present in the file
        cy.get('@totalCount').then((count) => {
          expect(JSON.stringify(xlxsData)).include(count);
        });
      });
    } else {
      cy.log('Please select a .xlsx file type to verify the content.');
    }
  });
});
