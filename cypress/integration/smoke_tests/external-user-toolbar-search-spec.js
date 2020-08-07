/// <reference types="Cypress" />


describe('External user', function () {
  beforeEach(function () {
    cy.server();
    cy.route('POST', "**/Api/Data/WorkflowExpansion").as('WorkflowExpansion');
    cy.login(Cypress.env('External_Admin_Username'));
    cy.visit("/Workflow");
    cy.wait('@WorkflowExpansion');
  })

  it('Toolbar seach', function () {
    cy.visit("/");
   
    //Assert:
    //1. Verify if it lands in the Workflow page
    cy.get('#workflow-link.active', { timeout: 10000 }).should('exist');
    //2. Verify if session exists
    cy.getCookie('DEV-session').should('exist');
    // Search for customer
    //'California Public Employee Retirement System (CalPERS)'
   cy.get('#toolbarSearchFieldInput').type("Int");    
    
    // check all meetings in response have CalPERS customer id
    cy.wait('@post').its('response.body.items').each((item) => {
      expect(item.Summaries.CustomerID.Value).to.equal(196);
    });
  });
});


      //cy.server();
      //cy.route('GET', '/Api/Data/ToolbarSearch/').as('get');
        // Search for customer
        //'California Public Employee Retirement System (CalPERS)'
    //    cy.get('#toolbarSearchFieldInput').type("Int");
        //cy.get('#kendoCustomers-list .k-item').first().click();
    //cy.route('GET', '/Api/Data/ToolbarSearch/?QueryValue=in&SearchType=0&_=1596799387414/').as('querysearch')
      //  cy.get('.searchResultContent clearfix toolbar-icon-meetings-blue').first().click();

        // check all meetings in response have CalPERS customer id
      //  cy.wait('@WorkflowExpansion').its('response.body.items').each((item) => {
        //    expect(item.Summaries.CustomerID.Value).to.equal(196);
  //      });
//    });
//});

//cy.get('#toolbarSearchFieldInput').type("CAL");
//'California Public Employee Retirement System (CalPERS)'


//cy.wait('@post').then((xhr) => {
  //  assert.isNotNull(xhr.response.body)
//})
//cy.get('@post').its('response.body.items').each((item) => {
  //  assert.equal(item.Summaries.CustomerID.Value, 196)

//})
