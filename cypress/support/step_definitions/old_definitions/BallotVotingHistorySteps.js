import { When, Then, And } from 'cypress-cucumber-preprocessor/steps'
const constants = require("../../constants")
//TC1 40606 & TC 40739
const testCol = 'Last Voted By'
const columns = ['Agenda Key','Ballot Blocking','Control Number','Deadline Date','Decision Status','Meeting Type','Policy ID','Record Date',
  'Security Country of Trade','Shares']
//TC2 - 40606
const selector = '#ballots-grid > div.k-pager-wrap.k-grid-pager.k-widget > span.k-pager-sizes.k-label > span'
//TC - 40724
const custColumns = ['Custodian Account Number','Custodian Id','Custodian Name','Customer Account Name','Customer Account Number',]
const columnLabels = ['BallotsGrid3', 'BallotsGrid17', 'BallotsGrid18', 'BallotsGrid2', 'BallotsGrid11']


And('I clear the existing filter criteria', () => {
  cy.removeAllExistingSelectedCriteria()
})

When('I add the criteria for "Decision Status" with status "Recommendations Available"', () => {
  cy.AddMultipleCriteria(['Decision Status'])
  cy.addCriteriaStatus(['Recommendations Available'])
})

Then('I should be able to verify the different column actions on the workflow page', () => {
  //Step 3
  cy.get('#btn-workflow-config-columns').click()

  columns.forEach((column) => {
    cy.get('#txt-filter-col-name').type(column)
    cy.get(`input[value='${column}']`).should('be.checked')
    cy.get('#txt-filter-col-name').clear()
  })
  cy.get('#btn-cancel-configure-columns').click()

  //Step 4 and step 5
  cy.checkColumnFieldApplyAndVerifyIsChecked(testCol)

  // add test col to stack
  columns.push(testCol)

  //sort columns in alphabetical order
  columns.sort()

  cy.get('#btn-workflow-config-columns').click()

  //verify all checked after adding new column
  columns.forEach((column) => {
    cy.get('#txt-filter-col-name').type(column)
    cy.get(`input[value='${column}']`).should('be.checked')
    cy.get('#txt-filter-col-name').clear()
  })
  cy.get('#btn-cancel-configure-columns').click()

  //uncheck the added column and remove from sorted array
  cy.uncheckColumnFieldApplyAndVerifyNotChecked(testCol)
  columns.splice(5, 1)

  //Step 6 - Verify User unchecks Multiple fields (Eg : Decision Status, Ballot Status etc.) from the top of the list by selecting the checkboxes & Clicks 'Apply' button.
  //uncheck multiple checkboxes and remove from array as unchecked
  cy.uncheckColumnFieldApplyAndVerifyNotChecked(columns[2])
  columns.splice(2, 1)
  cy.uncheckColumnFieldApplyAndVerifyNotChecked(columns[3])
  columns.splice(3, 1)
  cy.uncheckColumnFieldApplyAndVerifyNotChecked(columns[4])
  columns.splice(4, 1)

  //resort array after removing items
  columns.sort()

  //Step 7 - Verify that the Removed fields (Eg : Decision Status, Ballot Status etc.) should be available in the rendered list in alphabetic order with unchecked in Configure 'Columns' modal
  cy.get('#btn-workflow-config-columns').click()
  columns.forEach((column) => {
    cy.get('#txt-filter-col-name').type(column)
    cy.get(`input[value='${column}']`).should('be.checked')
    cy.get('#txt-filter-col-name').clear()
  })
  cy.get('#btn-cancel-configure-columns').click()

  cy.get('div#controls').should('be.visible')
  cy.get('#workflow-link.active').should('exist')

  cy.removeAllExistingSelectedCriteria()
  cy.AddMultipleCriteria(['Decision Status'])
  cy.addCriteriaStatus(['Recommendations Available'])

  //Step 9 - Go Back to the Workflow Page, Verify Removed Columns are not displayed/Auto Saved [Eg : Decision Status, Ballot Status etc]
  cy.get('#btn-workflow-config-columns').click({ timeout: 10000 })
  columns.forEach((column) => {
    cy.get('#txt-filter-col-name').type(column)
    cy.get(`input[value='${column}']`).should('be.checked')
    cy.get('#txt-filter-col-name').clear()
  })
  cy.get('#btn-cancel-configure-columns').click()
})

Then('I should be able to verify the pagination works as expected on the ballot section page', () => {
  //Step 3 - verify the pagination default is set to '10'.
  cy.get(`${selector} > select`).invoke('attr', 'style', 'display: block')
  cy.get(`${selector} > select`).select('10', { timeout: 50000 })
  cy.get(`${selector} > span > span.k-input`).then(function (val) {
    const numBallots = val.text()
    expect(numBallots).to.equal('10')
  })

  cy.get(`${selector} > select`).find(':selected').should('have.text', '10')

  //Step 3 -Now click the pagination dropdown and change the pagination to
  cy.SetPaginationAndVerify('50', 50)

  //Step 5 - Now click the pagination dropdown and change the pagination to 20 and log out of the application.
  cy.SetPaginationAndVerify('20', 20)
})

Then('I should be able to verify the pagination is displayed on the ballot section page', () => {
  //Step 3 - User Clicks on 'Columns' button
  cy.get('#btn-mdballots-details-config-columns').click()
  cy.get('#ballots-configure-columns-target').invoke('attr', 'style', 'display: block')

  //Step 4 - Verify that the user enter a character(Eg : Say 'Cus') in the responsive search of the "Columns" Modal
  cy.get(
    '#ballots-configure-columns-target-dynamic > .clearfix > #configure-columns-modal > .input > #txt-filter-col-name'
  ).type('Cus')

  columnLabels.forEach((column) => {
    cy.get(`label[for='${column}']`).should('be.visible')
  })

  cy.get('#currently-selected-criteria > ul > li').first().invoke('attr', 'style', 'display: block')
  custColumns.forEach((col) => {
    cy.get(`input[value='${col}']`).check({ force: true }).should('be.checked')
  })

  cy.get('#ballots-configure-columns-target-dynamic > .clearfix > #configure-columns-modal > .blue').click()

  //Step 5 - Navigate to the ballot section & click on the Columns button
  cy.get('#btn-mdballots-details-config-columns').click()
  cy.get('#ballots-configure-columns-target').invoke('attr', 'style', 'display: block')
  custColumns.forEach((col) => {
    cy.get(`input[value='${col}']`).should('be.checked')
  })

  //Step 6 - Verify that the Default Field 'Control Number' is not available in the 'Columns' modal
  cy.get('#ballots-section #results-list li').then(($rows) => {
    $rows.each((index, value) => {
      const mname = Cypress.$(value).find(`label`).text()
      expect(mname).to.not.equal('Control Number')
    })
  })
})

Then('I should be able to verify the chosen pagination is autosaved on the ballot section page', () => {
  cy.get(`${selector} > span > span.k-input`).then(function (val) {
    const numBallots = val.text()
    expect(numBallots).to.equal('10')
  })

  //Step7 - Set pagination to 50 and verify ballot displayed row count
  cy.SetPaginationAndVerify('50', 50)

  //Step 8 - Now change pagination  to "10"
  cy.SetPaginationAndVerify('10', 10) 
})

Then('I should be able to toggle between "Management" Multiple Agendas in the Vote card page for specific meeting type', () => {
  //Step 4 - Click on the 'Management' vote card dropdown
  cy.get('#agendas-list > ul > li').invoke('attr', 'class', 'dropdown related-meetings-list open')

  //Step 5 - Verify 'Ballots' section will only display specific 'Management' agenda type ballot details [Eg : Management - 934050888]
  cy.get('#agendas-list > ul > li > ul > li > div > span').then(function (val) {
    const agenda = val.text()
    expect(agenda).to.include(constants.MEETINGID.NBCOMMO_AGENDA1)
  })
  cy.get('#md-ballots-grid-results > tr > td > a').then(function (ctrlnum) {
    const displayedCtrlNum = ctrlnum.text()
    expect(displayedCtrlNum).to.include(constants.MEETINGID.NBCOMMO_CTRLNUM1)
  })

  //Step 6 - Select another 'Management' Vote card in the dropdown list[Eg: Management -934050915]
  //Expected - Vote Card page gets refreshed and 'Ballots' section gets updated with the 'Agenda Type' as 'Management' and 'Ballot Control Number' as different to that of previous 'Management' number
  cy.get('#agendas-list > ul > li > ul > li:nth-child(3) > a > span').click()
  cy.wait('@GET_AGENDA')

  cy.get('#agendas-list > ul > li > ul > li > div > span').then(function (val) {
    const agenda = val.text()
    expect(agenda).to.include(constants.MEETINGID.NBCOMMO_AGENDA2)
  })
  cy.get('#md-ballots-grid-results > tr > td > a').then(function (ctrlnum2) {
    const displayedCtrlNum = ctrlnum2.text()
    expect(displayedCtrlNum).to.include(constants.MEETINGID.NBCOMMO_CTRLNUM2)
  })

  //verify all agendas can can be listed
  cy.get('#agendas-list > ul > li').invoke('attr', 'class', 'dropdown related-meetings-list open')
  cy.get('#agendas-list > ul > li > ul > li:nth-child(4) > a > span').click()
  cy.wait('@GET_AGENDA')

  cy.get('#agendas-list > ul > li > ul > li > div > span').then(function (val) {
    const agenda = val.text()
    expect(agenda).to.include(constants.MEETINGID.NBCOMMO_AGENDA3)
  })
  cy.get('#md-ballots-grid-results > tr > td > a').then(function (ctrlnum3) {
    const displayedCtrlNum1 = ctrlnum3.text()
    expect(displayedCtrlNum1).to.include(constants.MEETINGID.NBCOMMO_CTRLNUM3)
  })
})

