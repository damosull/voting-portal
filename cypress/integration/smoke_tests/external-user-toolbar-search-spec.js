/// <reference types="Cypress" />
describe('External user', function () {
  // login       
  beforeEach(function () {
      cy.server();
      cy.route('POST', "**/Api/Data/WorkflowExpansion").as('WorkflowExpansion');
      cy.login(Cypress.env('External_Admin_Username'));
      cy.visit("/Workflow");
      cy.wait('@WorkflowExpansion');
  })
  it('Toolbar Search', function () {


      //Assert:
      //1. Verify if it lands in the Workflow page
      cy.get('#workflow-link.active', { timeout: 20000 }).should('exist');

      //2. Verify if session exists
      cy.getCookie('DEV-session').should('exist');

      cy.server();
      cy.route('GET', '/Api/Data/ToolbarSearch/').as('get');
        // Search for customer
        //'California Public Employee Retirement System (CalPERS)'
        cy.get('#toolbarSearchFieldInput').type("Int");
        //cy.get('#kendoCustomers-list .k-item').first().click();
        cy.get('#toolbarSearchResultWindow').first().click();


        // check all meetings in response have CalPERS customer id
        cy.wait('@WorkflowExpansion').its('response.body.items').each((item) => {
            expect(item.Summaries.CustomerID.Value).to.equal(196);
        });
    });
});

//cy.get('#toolbarSearchFieldInput').type("CAL");
//'California Public Employee Retirement System (CalPERS)'


//cy.wait('@post').then((xhr) => {
  //  assert.isNotNull(xhr.response.body)
//})
//cy.get('@post').its('response.body.items').each((item) => {
  //  assert.equal(item.Summaries.CustomerID.Value, 196)

//})
