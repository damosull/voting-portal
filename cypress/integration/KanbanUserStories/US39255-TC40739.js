//Test case 40739 - https://dev.azure.com/glasslewis/Development/_workitems/edit/40739
describe('US39255 tests', function () {
  beforeEach(function () {
    cy.viewport(1100, 900);
    cy.intercept('POST', '**/Api/Data/WorkflowExpansion').as('WorkflowExpansion');
    cy.intercept('POST', '**/Api/Data/WorkflowSecuritiesWatchlists').as('WorkflowSecuritiesWatchlists');
    cy.intercept('POST', '**/Api/Data/Filters/CreateDraftFilter').as('filter');
    cy.intercept('POST', '**/Api/Data/Assignee/GetAvailableAssigneesForCustomer').as('assignees');
    cy.intercept('POST', '**/Api/Data//SubscribeToMeeting/GetStatus').as('getstatus');

    cy.loginExtAdm('Calpers');
    cy.visit('/Workflow');
    cy.wait('@WorkflowExpansion');
    cy.wait('@WorkflowSecuritiesWatchlists');

    cy.removeAllExistingSelectedCriteria();
    cy.AddMultipleCriteria(['Decision Status']);
    cy.addCriteriaStatus(['Recommendations Available']);
  });

  it(`US39255 - Test 1 - Configure Column actions `, function () {
    //test data
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
      'Shares',
    ];

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

    cy.visit('/Workflow');
    cy.wait('@WorkflowExpansion');
    cy.wait('@WorkflowSecuritiesWatchlists');
    cy.wait('@assignees');
    cy.wait('@getstatus');

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
