//TC 40734 - https://dev.azure.com/glasslewis/Development/_workitems/edit/40734

const { MEETINGID } = require('../../support/constants');

describe('US39255 tests', function () {
  beforeEach(function () {
    cy.viewport(1100, 900);
    cy.intercept('POST', '**/Api/Data/WorkflowExpansion').as('WorkflowExpansion');
    cy.intercept('POST', '**/Api/Data/WorkflowSecuritiesWatchlists').as('WorkflowSecuritiesWatchlists');
    cy.intercept('POST', '**/Api/Data//MdData/GetAgenda').as('getagenda');
    cy.intercept('GET', '**/Api/Data/**').as('GetData');
    cy.intercept('POST', '**/Api/Data/**').as('PostData');

    cy.loginExtAdm('Neuberger');
    cy.visit('/Workflow');
    cy.wait('@WorkflowExpansion');
    //cy.wait('@WorkflowSecuritiesWatchlists');

    cy.removeAllExistingSelectedCriteria();
  });

  it(`Verify User can Toggle between 'Management' Multiple Agendas in the Vote card page for specific meeting type`, function () {
    //make sure all dates are current with this meeting id
    cy.AddTenDaysToMeetingDates(MEETINGID.NBCOMMO);

    //Step 3 - User Clicks on the valid company in the Workflow page
    cy.visit('MeetingDetails/Index/' + MEETINGID.NBCOMMO);
    cy.wait('@getagenda');

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
    cy.wait('@getagenda');
    cy.wait('@GetData');
    cy.wait('@PostData');

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
    cy.wait('@getagenda');
    cy.wait('@GetData');
    cy.wait('@PostData');

    cy.get('#agendas-list > ul > li > ul > li > div > span').then(function (val) {
      const agenda = val.text();
      expect(agenda).to.include(MEETINGID.NBCOMMO_AGENDA3);
    });
    cy.get('#md-ballots-grid-results > tr > td > a').then(function (ctrlnum3) {
      const displayedCtrlNum1 = ctrlnum3.text();
      expect(displayedCtrlNum1).to.include(MEETINGID.NBCOMMO_CTRLNUM3);
    });
  });
});
