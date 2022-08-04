import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';

const { USER, messages } = require("../../constants")
const unixTime = Math.floor(Date.now() / 1000);
const configName_BallotVoteReport = `BallotVoteDataReport_${unixTime}`;
const configName_ProxyVotingReport = `ProxyVotingReport_${unixTime}`;
const configName_VotingActivityReport = `VotingActivityReport_${unixTime}`;
const fileExtension = 'xlsx'; /* Options: pdf, xls, xlsx */
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
  'Mgmt Proposals Voted Against/Withhold',
  'Mgmt Proposals Voted Abstain',
  'Mgmt Proposals With No Votes Cast',
  'Mgmt Proposals Voted 1 Year',
  'Mgmt Proposals Voted 2 Years',
  'Mgmt Proposals Voted 3 Years',
  'ShrHldr Proposal Voted FOR',
  'ShrHldr Proposals Voted Against/Withhold',
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
const reportColumns = [
  'Meeting Statistics Report',
  'Ballot Statistics Report',
  'Proposal Statistics Report',
  'Proposal Category Report',
  'Proposal Type Report',
  'Test - Header',
];
let filename;
let rnd;



And('I add {string} status and {string} critera', (status, criteria) => {
    
  cy.AddMultipleCriteria([status]);
  cy.addCriteriaStatus([criteria]);

});

And('I export the ballot status report', () => {
    
  cy.get('#exportMeetingDetails > .nav > .dropdown > .dropdown-toggle').click();
  cy.get('#exportBallotStatusReport').click();
  cy.get('#pdf').click();
  cy.get('#btn-export').click();

});

Then('A toast message appears', () => {
    
  cy.get('.toast-message').should('contain.text', messages.toast.EXPORT_INITIATED);

});

And('I click on the notification dropdown', () => {
    
  cy.get('.notify-count').click();

});

Then('Ballot Status Report is queued', () => {
    
  cy.get('#inbox-container .msg-txt', { timeout: 120000 }).should(($msg) => {
      expect($msg.first().text()).to.equal("'Ballot Status Report' export is ready to download");
    });    

});

Then('I download the PDF and verify it', () => {
    
  cy.get('#inbox-container [data-pagelink1]')
    .first()
    .invoke('attr', 'data-pagelink1')
    .should('contain', '/Downloads/DownloadExportFromUrl/?requestID=')
    .then((downloadLink) => {
      cy.request(downloadLink).then((resp) => {
        expect(resp.status).to.eq(200);
        expect(resp.headers)
          .to.have.property('content-disposition')
          .eql('attachment; filename=BallotStatusReport.pdf');
        expect(resp.headers).to.have.property('content-type').eql('application/pdf');
        expect(resp.body).to.have.length.greaterThan(1);
        expect(resp.body).include('%PDF');
      });
    });    

});

And('I click on the {string} filter', (filter) => {
    
  cy.contains(filter).click();
  cy.wait('@BALLOT_VOTE');
  cy.wait('@BALLOT_CRITERIA');

});

And('I set the meeting date to next date {int} and past date {int} days', (nextDays, pastDays) => {
    
  cy.get('.date-range-target').invoke('attr', 'style', 'display: block');
  cy.get('.k-formatted-value').invoke('attr', 'style', 'display: block').clear();
  cy.get(':nth-child(1) > .k-widget > .k-numeric-wrap > .k-formatted-value').type(nextDays);
  cy.get(':nth-child(2) > .k-widget > .k-numeric-wrap > .k-formatted-value').type(pastDays);
  cy.contains('Update').click();

});

And('I select {string} column', (column) => {
    
  cy.get('#rpt-columns > div > h3').click({ force: true });
  cy.get(':nth-child(7) > .report-column-ccb > .checkbox > .ccb').click({ force: true });
  cy.get('.btn-container > .darkgrey').click({ force: true });
  cy.get('[data-bind="foreach: Columns.SelectedFixed"] > :nth-child(28) > td > .checkbox > .ccb').should(
    'contain.text',
    column
  );

});

And('I save the configuration with the name of {string}', (configName) => {

  cy.contains('Save As').click();
  cy.get('#popupTextContainer').should('be.visible').type(configName);
  cy.get('#apprise-btn-undefined').should('be.visible');
  cy.get('#apprise-btn-confirm').click();
  cy.wait('@ADD');
  cy.contains('My configurations').siblings().find('span').should('contain', configName);

});

And('I click on the download the report button', () => {
    
  cy.get('#rpt-download-btn').click();

});

Then('Download initiated toast message appears', () => {
    
  cy.get('.toast-message').should(
      'contain.text',
       messages.toast.DOWNLOAD_STARTED
    );

});

Then('Report is ready to download message appears in the notifications with the name of {string}', (configName) => {
    
  cy.get('#inbox-container .msg-txt', { timeout: 120000 }).should(($msg) => {
      expect($msg.first().text()).to.include(`${configName}.csv report is ready for download`);
    });

});

Then('I verify the report headers with the name of {string}', (configName) => {

  cy.get('#inbox-container [data-pagelink1]')
    .first()
    .invoke('attr', 'data-pagelink1')
    .should('contain', '/Downloads/DownloadExportFromUrl/?requestID=')
    .then((downloadLink) => {
      cy.request(downloadLink).then((resp) => {
        expect(resp.status).to.eq(200);
        expect(resp.headers)
          .to.have.property('content-disposition')
          .contains(`attachment; filename=${configName}.csv`);
        expect(resp.headers).to.have.property('content-type').eql('text/csv');
        expect(resp.body).include(
          'Customer Account Name,Customer Account ID,Company,CUSIP,CINS,Country of Trade,Meeting Type,Meeting Date,Record Date,Proposal Order By,Proposal Label,Proposal Text,Proponent,Mgmt,GL Reco,Custom Policy,Vote Decision,For Or Against Mgmt,Rationale,Meeting Note,Ballot Voted Date,Issue Code,Issue Code Category,Shares Listed,Control Number Key,Ballot Status,Ballot Blocking,Agenda Key'
        );
      });
    });

});

And('I delete the given {string} configuration', (configuration_file_name) => {
    
  cy.deleteMyConfiguration(configuration_file_name);

});

And('I Add Subscription', () => {
    
  cy.get('#subscriptions-container > h3').click();
  cy.contains('Add Subscription').click();

});

And('I select Calpers External Admin from Users list', () => {
    
  cy.get('.k-multiselect-wrap > .k-input').click().type('{downarrow}{downarrow}{downarrow}{enter}').blur();

});

And('I enter Filename for Subscription Report', () => {
    
  cy.get('#subscribed-file-name').type('SubscribeTest');

});

And('I enter Schedule to run Subscription', () => {
    
  // (Weekly/8AM/Sunday)
  cy.get('#schedule-type').select('1');
  cy.get('#Sun').check({ force: true });

});

And('I click on the Ok button', () => {
    
  cy.get('#ok').click();

});

Then('Subscription added toast message appears', () => {
    
  cy.get('.toast-message').should('contain.text', messages.toast.SUBSCRIPTION_ADDED);

});

And('Verify UI table entries for newly created Subscription', () => {
    
  cy.get('#current-subscribers-list > tbody > tr > td')
    .eq(1)
    .should('include.text', 'CalpersAutomation External Admin');
  cy.get('#current-subscribers-list > tbody > tr > td').eq(2).should('include.text', 'Daily');
  cy.get('#current-subscribers-list > tbody > tr > td').eq(3).should('include.text', 'Run at: 9:00AM');
  cy.get('#current-subscribers-list > tbody > tr > td').eq(4).should('include.text', 'SubscribeTest');

});

Then('I verify Column data for UserIds and Filename', () => {
   
  // Connect to Aqua Database and verify new row has been added
  cy.executeQuery('SELECT TOP 1 * FROM SB_Subscription ORDER BY SubscriptionID DESC').then((result) => {
    var cols = [];
    for (var j = 0; j < result.length; j++) {
      cols.push(result[j]);
    }
  
    // Verify Column data for UserIds and Filename
    assert.equal(cols[2], 1); // Verify Active
    cy.get('@userid').then(function (uid) {
      assert.equal(cols[3], uid); // SubscriberID
    });
    assert.equal(cols[7], 1); // Deliver to Everyone = false
    assert.equal(cols[12], 'SubscribeTest'); // Filename
    cy.get('@userid').then(function (uid) {
      assert.equal(cols[13], uid); // Created by
    });
    assert.equal(cols[17], 196); // Customer ID
    expect(cols).to.have.length(19); // Total Fields
  });

});

And('I remove Subscription entry from Viewpoint', () => {

  cy.get('#current-subscribers-list > tbody > tr > td > i[class="fa fa-times"]').first().click({ force: true });
  cy.get('#apprise-btn-confirm').click();

});

And('I select {string} Report Type', (report_type) => {

  cy.selectReportType(report_type);

});

And('I select Interaction Date between {string} and {string}', (start_date, end_date) => {
  
  cy.wait('@CUSTOMER_NAME_SPECIAL')
  cy.get('#report-criteria-controls >div > h4').should('be.visible')
  cy.get('#report-criteria-controls >div > h4').first().click();
  cy.get('[type="radio"]#rdo-date-range-discrete-InteractionDate').check();
  cy.get('#discrete-date-start-InteractionDate').clear({ force: true }).type(start_date, { force: true });
  cy.get('#discrete-date-end-InteractionDate').clear({ force: true }).type(end_date, { force: true });

});

And('I click on the Update button', () => {

  cy.contains('Update').click({ force: true });

});

And('I add all the columns', () => {

  cy.get('#rpt-columns > div > h3').click({ force: true });
  cy.get('div.btn-container.clearfix > button.blue.small').click({ force: true });
  cy.get('#rpt-selected-columns > div > table > tbody > tr').each((tr) => {
    cy.wrap(tr).find('input[type="checkbox"]').should('be.checked');
  });

});

Then('Engagement Report is queued', () => {

  cy.get('#inbox-container .msg-txt', { timeout: 120000 }).should(($msg) => {
    expect($msg.first().text()).to.include(`New Configuration.csv ${messages.reports.READY}`);
  });  

});

Then('I validate the Engagement Report', () => {

  cy.get('#inbox-container [data-pagelink1]')
  .first()
  .invoke('attr', 'data-pagelink1')
  .should('contain', '/Downloads/DownloadExportFromUrl/?requestID=')
  .then((downloadLink) => {
    cy.request(downloadLink).then((resp) => {
      expect(resp.status).to.eq(200);
      expect(resp.headers)
        .to.have.property('content-disposition')
        .eql('attachment; filename=-New-Configuration.csv');
      expect(resp.headers).to.have.property('content-type').eql('text/csv');
      expect(resp.body).to.have.length.greaterThan(1);
      cy.log(resp.body);
      expect(resp.body).include(
        'Company Name,Created Date,Date of Engagement,Other Participants,Themes,Type,Notes,Participant Name,Role,Title'
      );
    });
  });

});

And('I add {string} reporting criteria', (criteria) => {

  cy.AddMultipleCriteria([criteria], true);

  // Click on configure colum drop down and checking that is opened
  cy.get('#rpt-columns > .section > .toggle').click({ force: true });
  cy.get('#rpt-available-columns-header').should('be.visible');

});

And('I add the first 4 column option into the header list', () => {

  cy.get('#rpt-available-columns > div > table > tbody > tr ').each((el, index) => {
    cy.wrap(el).find(':checkbox').check({ force: true });
    // Only select first 4 items
    if (index > 3) {
      return false;
    }});

});

And('I click on the Apply button', () => {

  cy.get('.btn-container.clearfix').contains('Apply').click();

});

Then('Status Report is queued', () => {

  cy.get('#inbox-container .msg-txt', { timeout: 120000 }).should(($msg) => {
    expect($msg.first().text()).to.include('New Configuration.csv report is ready for download');
  });

});

Then('I validate the Ballot Status Report headers', () => {

  cy.get('#inbox-container [data-pagelink1]')
  .first()
  .invoke('attr', 'data-pagelink1')
  .should('contain', '/Downloads/DownloadExportFromUrl/?requestID=')
  .then((downloadLink) => {
    cy.request(downloadLink).then((resp) => {
      expect(resp.status).to.eq(200);
      expect(resp.headers)
        .to.have.property('content-disposition')
        .eql('attachment; filename=-New-Configuration.csv');
      expect(resp.headers).to.have.property('content-type').eql('text/csv');
  
      expect(resp.body).to.have.length.greaterThan(1);
      cy.log(resp.body);
      expect(resp.body).include(
        'Customer Account Name,Customer Account Number,Custodian Name,Company Name,Meeting Date,Agenda Key,Country of Incorporation,Custodian Account Number,Customer Name,Deadline Date,Most Recent Note'
      );
    });
  });

});

And('I remove any existing report criteria', () => {

  cy.get('body').then(($body) => {
    if ($body.find('#workflow-filter-list > div > div > ul > li').eq(0).length > 0) {
      cy.get('#workflow-filter-list > div > div > ul > li').each(() => {
        cy.get('#workflow-filter-list > div > div > ul > li:nth-child(1) > a').first().click();
        cy.wait('@GET_POLICY');
        cy.get('.dark-red.small.delete-btn').click();
        cy.wait('@REMOVE');
      });
    }
  });

});

Then('I verify the filters', () => {

  cy.wait('@REPORT_TYPE');
  cy.get('#report-adhoc-commands-container > div > select')
    .select('Excel (.xls)')
    .find(':selected')
    .contains('Excel (.xls)');
  cy.get('#report-adhoc-commands-container > div > select')
    .select('Excel (.xlsx)')
    .find(':selected')
    .contains('Excel (.xlsx)');
  cy.get('.PolicyIdEditor').click({ force: true });
  cy.get('input[name="opt-PolicyId"]').check({ force: true });
  cy.get('#btn-update-PolicyId').click({ force: true });

});

And('I save the new filter with random name', () => {

  // I click on the save buton
  cy.get('#btn-report-save-as').click({ force: true });  

  // I name the file
  cy.randomString(3).then((data) => {
    cy.get('#popupTextContainer > input[type=text]').type('Test' + data);
    filename = 'Test' + data;
    rnd = data.trim() + '.xlsx';
  });

  cy.get('#apprise-btn-confirm').click({ force: true });
  cy.wait('@GET_POLICY');
  cy.wait('@FILE_ADD');

});

Then('Report is ready for download message appears', () => {

  cy.get('#inbox-container .msg-txt', { timeout: 120000 }).should(($msg) => {
    expect($msg.first().text()).to.include(filename + '.xlsx report is ready for download');
  });

});

Then('I validate and verify the report', () => {

  cy.get('#inbox-container [data-pagelink1]')
  .first()
  .invoke('attr', 'data-pagelink1')
  .should('contain', '/Downloads/DownloadExportFromUrl/?requestID=')
  
  .then((downloadLink) => {
    cy.request(downloadLink).then((resp) => {
      expect(resp.status).to.eq(200);
      expect(resp.headers).to.have.property('content-disposition').contains(rnd);
      expect(resp.headers)
        .to.have.property('content-type')
        .eql('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      expect(resp.body).to.have.length.greaterThan(1);
    });
  });

});

And('I select Report Extension XLS', () => {

  cy.get('#rpt-report').children().find('select').select('xls'.toUpperCase());

});

And('I select the past {int} days', (pastDays) => {

  // The reason I have two actions for the same input is because for some reason it takes roughly 5 seconds to type the past days, whereas with two actions is straight away
  // step 5 - Select past days
  cy.get('#date-range-target-MeetingDate').invoke('attr', 'style', 'display: block');
  cy.get('.k-formatted-value').invoke('attr', 'style', 'display: block').clear();
  cy.get('.k-formatted-value').invoke('attr', 'style', 'display: block').type(pastDays);
  cy.contains('Update').click();
  cy.get('.MeetingDateEditor').contains(`Past ${pastDays} Days`);

});

And('I expand Vote Comparison and select GL Recs Against Mgmt', () => {

  cy.get('#vote-comparsion-target').invoke('attr', 'style', 'display: block');
  cy.get('#vote-comparison-checkbox-group > div')
    .contains('GL Recs Against Mgmt')
    .siblings()
    .check({ force: true })
    .should('be.checked');

  cy.get('#btn-VoteComparsion-update').click();
  cy.contains('All meeting agenda items (1)');

  cy.saveFilter(configName_ProxyVotingReport);

  cy.get('.toast-message').should('contain.text', messages.toast.REPORT_SAVED);
  cy.contains('My configurations').siblings().find('span').should('contain', configName_ProxyVotingReport);

});

Then('I download the proxy voting report', () => {

  cy.contains('Download').click();
  cy.get('.toast-message').should('contain.text', messages.toast.DOWNLOAD_STARTED);
  cy.deleteMyConfiguration('ProxyVoting');

});

Then('I verify the proxy voting report', () => {
  
  cy.get('.notify-count').click();
  cy.get('#inbox-container .msg-txt', { timeout: 150000 }).should(($msg) => {
    expect($msg.first().text()).to.include(configName_ProxyVotingReport + `.xls ${messages.reports.READY}`);
  });

  cy.get('#inbox-container .msg-txt').contains(configName_ProxyVotingReport).click();
  // The following two waits are for the API's triggered by the download
  cy.intercept('PUT', '**/Api/Data/Inbox/**').as('InboxReport');
  cy.wait('@InboxReport');

  cy.parseXlsx(`cypress/downloads/${configName_ProxyVotingReport}.xls`).then((xlxsData) => {
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

});

And('I filter the report type', () => {

  cy.get('#rpt-report').children().find('select').select(fileExtension.toUpperCase());
  cy.get('#date-range-target-MeetingDateRange').invoke('attr', 'style', 'display: block');

});

And('I set the date range to the last {int} days', (pastDays) => {

  cy.get('.k-formatted-value').invoke('attr', 'style', 'display: block').clear();
  cy.get('.k-formatted-value').invoke('attr', 'style', 'display: block').type(pastDays);
  cy.contains('Update').click();
  cy.get('.MeetingDateRangeEditor').contains(`Past ${pastDays} Days`);

});

And('I select Decision Status Criteria', () => {

  cy.AddMultipleCriteria(['Decision Status'], true);
    
});

And('I select Voted criteria', () => {

  cy.addCriteriaStatus(['Voted'], true);
  cy.contains(`${['Decision Status'].toString()} (1)`);
    
});

And('I add columns to the report', () => {

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
    
});

And('I set the Footer under the Grouping & Presentation', () => {

  cy.get('#rpt-presentation').then((presentation) => {
    cy.wrap(presentation).find('h3').invoke('attr', 'class', 'toggle');
    cy.wrap(presentation).find('div').invoke('attr', 'style', 'display: block');

    cy.get('#ava-presentation-input-footer').should('have.attr', 'disabled');
    cy.get('#ava-presentation-footer').then((footer) => {
      cy.wrap(footer).should('not.be.checked');
      cy.wrap(footer).parent().invoke('attr', 'style', 'display: block');
      cy.wrap(footer).check({ force: true });
    });
    cy.contains('The presentation footer must be completed or unselected.');
  });
    
});

And('I set the Header under the Grouping & Presentation', () => {

  cy.get('#ava-presentation-input-header').should('have.attr', 'disabled');
  cy.get('#ava-presentation-header').then((header) => {
    cy.wrap(header).should('not.be.checked');
    cy.wrap(header).parent().invoke('attr', 'style', 'display: block');
    cy.wrap(header).check({ force: true });
  });
  cy.contains('The presentation header must be completed or unselected.');
    
});

And('I add subscription to the report', () => {

  cy.get('#rpt-subscriptions').then((subscriptions) => {
    cy.wrap(subscriptions).find('h3').invoke('attr', 'class', 'toggle');
    cy.wrap(subscriptions).find('div').invoke('attr', 'style', 'display: block');
    cy.contains('Add Subscription').click();

    cy.get('.toast-message').should('contain.text', messages.toast.REVIEW_FIELDS);
    cy.get('#ava-presentation-input-header').type('Test - Header').should('have.value', 'Test - Header');
    cy.get('#ava-presentation-input-footer').type('Test - Footer').should('have.value', 'Test - Footer');

    cy.contains('Add Subscription').click();
    cy.get('#popupTextContainer').should('be.visible');
    cy.get('#apprise-btn-confirm').should('be.visible');
    cy.get('#apprise-btn-undefined').click();
    });
    
});

And('I save the Voting Activity configuration', () => {

  cy.saveFilter(configName_VotingActivityReport);

});

Then('Report saved message appears', () => {

  cy.get('.toast-message').should('contain.text', messages.toast.REPORT_SAVED);

});

Then('Saved config name appears under My configuration section', () => {

  cy.contains('My configurations').siblings().find('span').should('contain', configName_VotingActivityReport);

});

Then('Voting Activity report is queued', () => {

  cy.get('#inbox-container .msg-txt', { timeout: 120000 }).should(($msg) => {
    expect($msg.first().text()).to.include(configName_VotingActivityReport + `.${fileExtension} ${messages.reports.READY}`);
  });

});

Then('Report is downloaded', () => {

  cy.downloadFileLocal('Voting Activity');
  cy.assertFileProperties(configName_VotingActivityReport, fileExtension);

});

Then('I am checking the report format', () => {

  // Parsing happens only if it's xlsx. It's using a custom library called node-xlsx
  if (fileExtension == 'xlsx') {
    cy.parseXlsx(`cypress/downloads/${configName_VotingActivityReport}.xlsx`).then((xlxsData) => {
      reportColumns.forEach((fields) => {
        expect(JSON.stringify(xlxsData)).to.include(fields);
      });
    });
  } else {
    cy.log('Please select a .xlsx file type to verify the content.');
  }

});