//Test scenario 37939 - https://dev.azure.com/glasslewis/Development/_workitems/edit/37939

import { messages } from '../../support/constants';
const report = messages.reports;
const toast = messages.toast;
const pastDays = 3;
const unixTime = Math.floor(Date.now() / 1000);
const configName = `ProxyVoting_${unixTime}`;

describe('Report', () => {
  const votes = [
    'Proxy Voting Report',
    'Vote Against Management (VAM) Summary',
    'Votes Against Policy (VAP) Summary',
    'Number of Meetings',
    'Number of Meetings With VAM',
    'Number of Proposals With VAM',
    'Number of Meetings With Votes For Mgmt',
    'Number of Proposals With Votes For Mgmt',
    'Number of No Votes Cast',
  ];

  const proposalSummary = [
    'Proposal Summary',
    'Mgmt Proposals Voted FOR',
    'Mgmt Proposals Voted Against/Withold',
    'Mgmt Proposals Voted Abstain',
    'Mgmt Proposals With No Votes Cast',
    'Mgmt Proposals Voted 1 Year',
    'Mgmt Proposals Voted 2 Years',
    'Mgmt Proposals Voted 3 Years',
    'ShrHldr Proposal Voted FOR',
    'ShrHldr Proposals Voted Against/Withold',
    'ShrHldr Proposals Voted Abstain',
    'ShrHldr Proposals With No Votes Cast',
  ];

  const percentages = [
    'Number of Proposals',
    'Number of Countries (Country of Trade)',
    '% of All Meetings Voted',
    '% of All Proposals Voted',
    '% of All Mgmt Proposals',
    '% of All ShrHldr Proposals',
  ];

  beforeEach(() => {
    cy.intercept('POST', '**/Api/WebUI//ReportsCriteria/ForCriterias?&objectType=BallotReconciliation').as(
      'BallotRecon'
    );
    cy.intercept('POST', '**/Api/WebUI//ReportsCriteria/ForCriterias?&objectType=ProxyVoting').as('ProxyVoting');

    cy.loginExtAdm('Calpers');
    cy.visit('/Reporting').url().should('include', 'Reporting');
  });

  it.skip('Proxy Voting', () => {
    cy.log('Test scenario 38014 - https://dev.azure.com/glasslewis/Development/_workitems/edit/38014');

    cy.wait('@BallotRecon');

    // Step 3 - Select report type = Proxy Voting
    cy.selectReportType('Proxy Voting');
    cy.wait('@ProxyVoting');

    // Step 4 - Select file type Excel (.xls)
    cy.selectReportExtension('xls');

    // The reason I have two actions for the same input is because for some reason it takes roughly 5 seconds to type the past days, whereas with two actions is straight away
    // step 5 - Select past days
    cy.get('#date-range-target-MeetingDate').invoke('attr', 'style', 'display: block');
    cy.get('.k-formatted-value').invoke('attr', 'style', 'display: block').clear();
    cy.get('.k-formatted-value').invoke('attr', 'style', 'display: block').type(pastDays);
    cy.contains('Update').click();
    cy.get('.MeetingDateEditor').contains(`Past ${pastDays} Days`);

    // step 6 - Expand Vote Comparison and select "GL Recs Against Mgmt"
    cy.get('#vote-comparsion-target').invoke('attr', 'style', 'display: block');
    cy.get('#vote-comparison-checkbox-group > div')
      .contains('GL Recs Against Mgmt')
      .siblings()
      .check({ force: true })
      .should('be.checked');

    cy.get('#btn-VoteComparsion-update').click();
    cy.contains('All meeting agenda items (1)');

    cy.saveFilter(configName);

    cy.get('.toast-message').should('contain.text', toast.REPORT_SAVED);
    cy.contains('My configurations').siblings().find('span').should('contain', configName);

    // // Download and verify
    cy.contains('Download').click();
    cy.get('.toast-message').should('contain.text', toast.DOWNLOAD_STARTED);
    cy.get('.notify-count').click();
    cy.get('#inbox-container .msg-txt', { timeout: 120000 }).should(($msg) => {
      expect($msg.first().text()).to.include(configName + `.xls ${report.READY}`);
    });

    cy.donwloadFileLocal();

    cy.assertFileProperties(configName, 'xls');

    // Delete the report. Moved this block to occur before the XLSX parsing since the download of the file already happened
    cy.deleteMyConfiguration(configName);

    cy.parseXlsx(`cypress/downloads/${configName}.xls`).then((xlxsData) => {
      votes.forEach((fields) => {
        expect(JSON.stringify(xlxsData)).to.include(fields);
      });

      proposalSummary.forEach((fields) => {
        expect(JSON.stringify(xlxsData)).to.include(fields);
      });

      percentages.forEach((fields) => {
        expect(JSON.stringify(xlxsData)).to.include(fields);
      });
    });

    // Run the task to delete the folder "Download"
    cy.exec('npm run cy:clean');
  });
});
