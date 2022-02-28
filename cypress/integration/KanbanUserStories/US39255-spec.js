import { MEETINGID, USER } from '../../support/constants';

//TC 2642
var arrAPIPolicy = [];
var arrUIPolicy = [];

//TC1 40606 & TC 40739
const testCol = 'Last Voted By';
const columns = [
  'Agenda Key',
  'Ballot Blocking',
  'Control Number',
  'Deadline Date',
  'Decision Status',
  'Meeting Type',
  'Policy ID',
  'Record Date',
  'Security Country of Trade',
  'Shares'];

//TC2 - 40606
const selector = '#ballots-grid > div.k-pager-wrap.k-grid-pager.k-widget > span.k-pager-sizes.k-label > span';

//TC - 40724
const custColumns = ['Custodian Account Number','Custodian Id','Custodian Name','Customer Account Name','Customer Account Number',];
const columnLabels = ['BallotsGrid3', 'BallotsGrid17', 'BallotsGrid18', 'BallotsGrid2', 'BallotsGrid11'];

describe('US39255 tests - Test 1', function () {

  //Test case 40606 - https://dev.azure.com/glasslewis/Development/_workitems/edit/40606
  it(`TC1 40606 - Configure Column actions`, function () {
    
    cy.loginWithAdmin(USER.CALPERS);
    cy.visit('/Workflow');
    cy.wait('@WORKFLOW_EXPANSION');

    cy.removeAllExistingSelectedCriteria();
    cy.AddMultipleCriteria(['Decision Status']);
    cy.addCriteriaStatus(['Recommendations Available']);
    
    //Step 3
    cy.get('#btn-workflow-config-columns').click();

    columns.forEach((column) => {
      cy.get('#txt-filter-col-name').fill(column);
      cy.get(`input[value='${column}']`).should('be.checked');
      cy.get('#txt-filter-col-name').clear();
    });
    cy.get('#btn-cancel-configure-columns').click();

    //Step 4 and step 5
    cy.checkColumnFieldApplyAndVerifyIsChecked(testCol);

    // add test col to stack
    columns.push(testCol);

    //sort columns in alphabetical order
    columns.sort();

    cy.get('#btn-workflow-config-columns').click();

    //verify all checked after adding new column
    columns.forEach((column) => {
      cy.get('#txt-filter-col-name').fill(column);
      cy.get(`input[value='${column}']`).should('be.checked');
      cy.get('#txt-filter-col-name').clear();
    });
    cy.get('#btn-cancel-configure-columns').click();

    //uncheck the added column and remove from sorted array
    cy.uncheckColumnFieldApplyAndVerifyNotChecked(testCol);
    columns.splice(5, 1);

    //Step 6 - Verify User unchecks Multiple fields (Eg : Decision Status, Ballot Status etc.) from the top of the list by selecting the checkboxes & Clicks 'Apply' button.
    //uncheck multiple checkboxes and remove from array as unchecked
    cy.uncheckColumnFieldApplyAndVerifyNotChecked(columns[2]);
    columns.splice(2, 1);
    cy.uncheckColumnFieldApplyAndVerifyNotChecked(columns[3]);
    columns.splice(3, 1);
    cy.uncheckColumnFieldApplyAndVerifyNotChecked(columns[4]);
    columns.splice(4, 1);

    //resort array after removing items
    columns.sort();

    //Step 7 - Verify that the Removed fields (Eg : Decision Status, Ballot Status etc.) should be available in the rendered list in alphabetic order with unchecked in Configure 'Columns' modal
    cy.get('#btn-workflow-config-columns').click();
    columns.forEach((column) => {
      cy.get('#txt-filter-col-name').fill(column);
      cy.get(`input[value='${column}']`).should('be.checked');
      cy.get('#txt-filter-col-name').clear();
    });
    cy.get('#btn-cancel-configure-columns').click();

    cy.get('div#controls').should('be.visible');
    cy.get('#workflow-link.active').should('exist');

    cy.removeAllExistingSelectedCriteria();
    cy.AddMultipleCriteria(['Decision Status']);
    cy.addCriteriaStatus(['Recommendations Available']);

    //Step 9 - Go Back to the Workflow Page, Verify Removed Columns are not displayed/Auto Saved [Eg : Decision Status, Ballot Status etc]
    cy.get('#btn-workflow-config-columns').click({ timeout: 10000 });
    columns.forEach((column) => {
      cy.get('#txt-filter-col-name').fill(column);
      cy.get(`input[value='${column}']`).should('be.checked');
      cy.get('#txt-filter-col-name').clear();
    });
    cy.get('#btn-cancel-configure-columns').click();
  });

  //Test case 40606 - https://dev.azure.com/glasslewis/Development/_workitems/edit/40606
  it(`TC2 - 40606 - Verify Ballot section Pagination`, function () {
    cy.loginWithAdmin(USER.RUSSELL);
    cy.visit('/Workflow');
    cy.wait('@WORKFLOW_EXPANSION');
    cy.wait('@WORKFLOW_SECURITIES_WATCHLIST');

    cy.removeAllExistingSelectedCriteria();

    //make sure all dates are current with this meeting id
    cy.AddTenDaysToMeetingDates(MEETINGID.RLNCDRP);

    //Step 4 - User Clicks on the valid company in the Workflow page
    cy.visit('MeetingDetails/Index/' + MEETINGID.RLNCDRP);
    cy.wait('@GET_AGENDA', { timeout: 50000 });
    cy.wait('@VOTE_TALLY');
    cy.wait('@MEETING_MATERIALS');

    //Step 3 - verify the pagination default is set to '10'.
    cy.get(`${selector} > select`).invoke('attr', 'style', 'display: block');
    cy.get(`${selector} > select`).select('10', { timeout: 50000 });
    cy.get(`${selector} > span > span.k-input`).then(function (val) {
      const numBallots = val.text();
      expect(numBallots).to.equal('10');
    });

    cy.get(`${selector} > select`).find(':selected').should('have.text', '10');

    //Step 3 -Now click the pagination dropdown and change the pagination to
    cy.SetPaginationAndVerify('50', 50);

    //Step 5 - Now click the pagination dropdown and change the pagination to 20 and log out of the application.
    cy.SetPaginationAndVerify('20', 20);

    cy.get('#logged-in-user').click();
    cy.get('#navlink--logout').click();
  });

  //Test Case 40724 - https://dev.azure.com/glasslewis/Development/_workitems/edit/40724
  it(`TC - 40724 - Verify Ballot section Pagination`, function () {

    cy.loginWithAdmin(USER.RUSSELL);
    cy.visit('/Workflow');
    cy.wait('@WORKFLOW_SECURITIES_WATCHLIST');
    cy.removeAllExistingSelectedCriteria();

    //make sure all dates are current with this meeting id
    cy.AddTenDaysToMeetingDates(MEETINGID.RBNCRP);

    //Step 4 - User Clicks on the valid company in the Workflow page
    cy.visit('MeetingDetails/Index/' + MEETINGID.RBNCRP);
    cy.wait('@GET_AGENDA');
    cy.wait('@MEETING_SECURITY_WATCHLIST');

    //Step 3 - User Clicks on 'Columns' button
    cy.get('#btn-mdballots-details-config-columns').click();
    cy.get('#ballots-configure-columns-target').invoke('attr', 'style', 'display: block');

    //Step 4 - Verify that the user enter a character(Eg : Say 'Cus') in the responsive search of the "Columns" Modal
    cy.get(
      '#ballots-configure-columns-target-dynamic > .clearfix > #configure-columns-modal > .input > #txt-filter-col-name'
    ).type('Cus');

    columnLabels.forEach((column) => {
      cy.get(`label[for='${column}']`).should('be.visible');
    });

    cy.get('#currently-selected-criteria > ul > li').first().invoke('attr', 'style', 'display: block');
    custColumns.forEach((col) => {
      cy.get(`input[value='${col}']`).check({ force: true }).should('be.checked');
    });

    cy.get('#ballots-configure-columns-target-dynamic > .clearfix > #configure-columns-modal > .blue').click();

    //Step 5 - Navigate to the ballot section & click on the Columns button
    cy.get('#btn-mdballots-details-config-columns').click();
    cy.get('#ballots-configure-columns-target').invoke('attr', 'style', 'display: block');
    custColumns.forEach((col) => {
      cy.get(`input[value='${col}']`).should('be.checked');
    });

    //Step 6 - Verify that the Default Field 'Control Number' is not available in the 'Columns' modal
    cy.get('#ballots-section #results-list li').then(($rows) => {
      $rows.each((index, value) => {
        const mname = Cypress.$(value).find(`label`).text();
        expect(mname).to.not.equal('Control Number');
      });
    });
  });

  //Test Case 40724 - https://dev.azure.com/glasslewis/Development/_workitems/edit/40724
  it(`TC 40724 - Verify Ballot section Pagination after`, function () {
    cy.loginWithAdmin(USER.RUSSELL);
    cy.visit('/Workflow');
    cy.wait('@WORKFLOW_EXPANSION');
    cy.wait('@WORKFLOW_SECURITIES_WATCHLIST');
    cy.removeAllExistingSelectedCriteria();

    //Step 6 - Log back into the voting portal and on Selecting the meeting verify the pagination in the ballot section should be saved as "20".
    cy.visit('MeetingDetails/Index/' + MEETINGID.RLNCDRP);
    cy.wait('@GET_AGENDA');
    cy.wait('@VOTE_TALLY');
    cy.wait('@MEETING_MATERIALS');

    cy.get(`${selector} > span > span.k-input`).then(function (val) {
      const numBallots = val.text();
      expect(numBallots).to.equal('10');
    });

    //Step7 - Set pagination to 50 and verify ballot displayed row count
    cy.SetPaginationAndVerify('50', 50);

    //Step 8 - Now change pagination  to "10"
    cy.SetPaginationAndVerify('10', 10);

    cy.get('#logged-in-user').click();
    cy.get('#navlink--logout').click();
  });

  //Test Case 2642 - https://dev.azure.com/glasslewis/Development/_workitems/edit/2642
  it('TC 2642 - Verify ballot section display the correct results when filter is applied', () => {
    cy.log('Test Case 2642 - https://dev.azure.com/glasslewis/Development/_workitems/edit/2642');

    cy.loginWithAdmin(USER.NEUBERGER);
    cy.visit('/Workflow');
    cy.wait('@WORKFLOW_EXPANSION');

    cy.contains('Upcoming Meetings').click();

    cy.removeAllExistingSelectedCriteria();

    // Go through the list of meetings and click in the first occurrence of one with 2 or more values
    cy.get('table > tbody > tr > td:nth-child(4)').each(($list, index) => {
      const strValue = $list.text();
      if (strValue.includes('values')) {
        cy.get('table > tbody > tr > td:nth-child(2)').find('a').eq(index).click();
        return false;
      }
    });

    cy.wait('@GET_MEETING_ID');
    cy.wait('@RELATED_MEETINGS');
    // Store the policies returned by the API
    cy.wait('@GET_AGENDA').then((xhr) => {
      arrAPIPolicy = xhr.response.body.AgendaVotes[0].PolicyIds;
      arrAPIPolicy.sort();
      cy.wrap(arrAPIPolicy).as('arrAPIPolicy');
    });

    cy.wait('@PAGE_SECTION_ORDER');
    cy.wait('@VOTE_TALLY');

    // Click on Filters: Policy
    cy.get(':nth-child(2) > .darkgrey').click();
    cy.get('#add-policy-target').invoke('attr', 'style', 'display: block');

    // Traverse the Policy filter dropdownn and push the values available into an array
    cy.get('#meeting-detail-policy > li').each(($filter, index) => {
      arrUIPolicy.push($filter.text().trim());

      if ($filter.length == index) {
        cy.get('@arrAPIPolicy').then((arrAPIPolicy) => {
          arrUIPolicy.sort();
          // Compare the list of policies returned by the API with the list of policies available in the UI
          expect(arrAPIPolicy).to.deep.equal(arrUIPolicy);
        });
      }

      // Click on "Select all" when running for the first time to uncheck all the options
      if (index == 0) {
        cy.get($filter).should('have.class', 'checked');
        cy.get('[for="vc-filter-selectall-policy"]').click({ force: true });
        cy.get($filter).should('not.have.class', 'checked');
      }

      // Code to uncheck the last policy selected
      if (index >= 1) {
        cy.get(':nth-child(2) > .darkgrey').click();
        cy.get('#add-policy-target').invoke('attr', 'style', 'display: block');
        cy.get('#meeting-detail-policy > li > div > label')
          .eq(index - index)
          .click({ force: true });
      }

      // It selects one option at a time in the Policy filter dropdown
      cy.get('#meeting-detail-policy > li > div > label').eq(index).click({ force: true });
      cy.get('#add-policy-target > div button.btn-update').click({ force: true });

      cy.wait('@MEETING_DETAILS');
      cy.wait('@GET_AGENDA');
      cy.wait('@GET_FILINGS');
      cy.wait('@WORKFLOW_RESEARCH_INFO');
      cy.wait('@VOTE_TALLY');

      // It gets the size of the list
      cy.get('#ballots-grid > div > div > table > thead > tr > th > a').then((size) => {
        cy.wrap(size.length).as('len');
      });

      cy.get('@len').then((len) => {
        cy.get('#ballots-grid > div > div > table > thead > tr > th').each(($columns, index) => {
          // "Recursive" code to add the Policy ID to the list if it's not displayed by default
          if ($columns.text().trim() != 'Policy ID') {
            if (index + 1 == len) {
              cy.get('#btn-mdballots-details-config-columns').click();
              cy.get('#ballots-configure-columns-target').invoke('attr', 'style', 'display: block');

              cy.get('.company-name-search > input').last().type('Policy ID');
              cy.get('[data-js="md-ballots-section"]').find('#mytable > ul > li > div > input').check({ force: true });
              cy.get('#configure-columns-modal > button.secondary.blue').eq(1).click();
              cy.wait('@BALLOT_GRID_STATE');

              cy.get('#ballots-grid > div > div > table > thead > tr > th').each(($columns, index) => {
                if ($columns.text().trim() == 'Policy ID') {
                  cy.wrap(index).as('position');
                }
              });
            }
          } else {
            cy.wrap(index).as('position');
          }
        });
      });

      cy.get('@position').then((position) => {
        //It checks that the Ballots section are showing only the policies filtered by the user
        cy.get(`#md-ballots-grid-results > tr > td:nth-child(${position + 1})`).each(($ballot) => {
          expect($filter.text().trim()).to.eq($ballot.text().trim());
        });
      });
    });
  });

  //TC 40734 - https://dev.azure.com/glasslewis/Development/_workitems/edit/40734
  it(`TC - 40734 - Verify User can Toggle between 'Management' Multiple Agendas in the Vote card page for specific meeting type`, function () {
    
    cy.loginWithAdmin(USER.NEUBERGER);
    cy.visit('/Workflow');
    cy.wait('@WORKFLOW_EXPANSION');

    cy.removeAllExistingSelectedCriteria();
    
    //make sure all dates are current with this meeting id
    cy.AddTenDaysToMeetingDates(MEETINGID.NBCOMMO);

    //Step 3 - User Clicks on the valid company in the Workflow page
    cy.visit('MeetingDetails/Index/' + MEETINGID.NBCOMMO);
    cy.wait('@GET_AGENDA');

    //Step 4 - Click on the 'Management' vote card dropdown
    cy.get('#agendas-list > ul > li').invoke('attr', 'class', 'dropdown related-meetings-list open');

    //Step 5 - Verify 'Ballots' section will only display specific 'Management' agenda type ballot details [Eg : Management - 934050888]
    cy.get('#agendas-list > ul > li > ul > li > div > span').then(function (val) {
      const agenda = val.text();
      expect(agenda).to.include(MEETINGID.NBCOMMO_AGENDA1);
    });
    cy.get('#md-ballots-grid-results > tr > td > a').then(function (ctrlnum) {
      const displayedCtrlNum = ctrlnum.text();
      expect(displayedCtrlNum).to.include(MEETINGID.NBCOMMO_CTRLNUM1);
    });

    //Step 6 - Select another 'Management' Vote card in the dropdown list[Eg: Management -934050915]
    //Expected - Vote Card page gets refreshed and 'Ballots' section gets updated with the 'Agenda Type' as 'Management' and 'Ballot Control Number' as different to that of previous 'Management' number
    cy.get('#agendas-list > ul > li > ul > li:nth-child(3) > a > span').click();
    //wait required - VP very slow to respond on this
    cy.wait(5000);
    cy.wait('@GET_AGENDA');

    cy.get('#agendas-list > ul > li > ul > li > div > span').then(function (val) {
      const agenda = val.text();
      expect(agenda).to.include(MEETINGID.NBCOMMO_AGENDA2);
    });
    cy.get('#md-ballots-grid-results > tr > td > a').then(function (ctrlnum2) {
      const displayedCtrlNum = ctrlnum2.text();
      expect(displayedCtrlNum).to.include(MEETINGID.NBCOMMO_CTRLNUM2);
    });

    //verify all agendas can can be listed
    cy.get('#agendas-list > ul > li').invoke('attr', 'class', 'dropdown related-meetings-list open');
    cy.get('#agendas-list > ul > li > ul > li:nth-child(4) > a > span').click();
    //wait required - VP very slow to respond on this
    cy.wait(5000);
    cy.wait('@GET_AGENDA');

    cy.get('#agendas-list > ul > li > ul > li > div > span').then(function (val) {
      const agenda = val.text();
      expect(agenda).to.include(MEETINGID.NBCOMMO_AGENDA3);
    });
    cy.get('#md-ballots-grid-results > tr > td > a').then(function (ctrlnum3) {
      const displayedCtrlNum1 = ctrlnum3.text();
      expect(displayedCtrlNum1).to.include(MEETINGID.NBCOMMO_CTRLNUM3);
    });
  });

  //Test case 40739 - https://dev.azure.com/glasslewis/Development/_workitems/edit/40739
  it(`TC 40739 - Configure Column actions`, function () {
    
    cy.loginWithAdmin(USER.CALPERS);
    cy.visit('/Workflow');
    cy.wait('@WORKFLOW_EXPANSION');
    cy.wait('@WORKFLOW_SECURITIES_WATCHLIST');

    cy.removeAllExistingSelectedCriteria();
    cy.AddMultipleCriteria(['Decision Status']);
    cy.addCriteriaStatus(['Recommendations Available']);

    //Step 3
    cy.get('#btn-workflow-config-columns').click();

    columns.forEach((column) => {
      cy.get('#txt-filter-col-name').fill(column);
      cy.get(`input[value='${column}']`).should('be.checked');
      cy.get('#txt-filter-col-name').clear();
    });
    cy.get('#btn-cancel-configure-columns').click();

    //Step 4 and step 5
    cy.checkColumnFieldApplyAndVerifyIsChecked(testCol);

    // add test col to stack
    columns.push(testCol);

    //sort columns in alphabetical order
    columns.sort();

    cy.get('#btn-workflow-config-columns').click();

    //verify all checked after adding new column
    columns.forEach((column) => {
      cy.get('#txt-filter-col-name').fill(column);
      cy.get(`input[value='${column}']`).should('be.checked');
      cy.get('#txt-filter-col-name').clear();
    });
    cy.get('#btn-cancel-configure-columns').click();

    //uncheck the added column and remove from sorted array
    cy.uncheckColumnFieldApplyAndVerifyNotChecked(testCol);
    columns.splice(5, 1);

    //Step 6 - Verify User unchecks Multiple fields (Eg : Decision Status, Ballot Status etc.) from the top of the list by selecting the checkboxes & Clicks 'Apply' button.

    //uncheck multiple checkboxes and remove from array as unchecked
    cy.uncheckColumnFieldApplyAndVerifyNotChecked(columns[2]);
    columns.splice(2, 1);
    cy.uncheckColumnFieldApplyAndVerifyNotChecked(columns[3]);
    columns.splice(3, 1);
    cy.uncheckColumnFieldApplyAndVerifyNotChecked(columns[4]);
    columns.splice(4, 1);

    //resort array after removing items
    columns.sort();

    //Step 7 - Verify that the Removed fields (Eg : Decision Status, Ballot Status etc.) should be available in the rendered list in alphabetic order with unchecked in Configure 'Columns' modal
    cy.get('#btn-workflow-config-columns').click();
    columns.forEach((column) => {
      cy.get('#txt-filter-col-name').fill(column);
      cy.get(`input[value='${column}']`).should('be.checked');
      cy.get('#txt-filter-col-name').clear();
    });
    cy.get('#btn-cancel-configure-columns').click();
    cy.get('div#controls').should('be.visible');
    cy.get('[data-js="meeting-details-link"]').should('be.visible');

    cy.removeAllExistingSelectedCriteria();
    cy.AddMultipleCriteria(['Decision Status']);
    cy.addCriteriaStatus(['Recommendations Available']);

    //Step 9 - Go Back to the Workflow Page, Verify Removed Columns are not displayed/Auto Saved [Eg : Decision Status, Ballot Status etc]
    cy.get('#btn-workflow-config-columns').click();
    columns.forEach((column) => {
      cy.get('#txt-filter-col-name').fill(column);
      cy.get(`input[value='${column}']`).should('be.checked');
      cy.get('#txt-filter-col-name').clear();
    });
    cy.get('#btn-cancel-configure-columns').click();
  });

});
