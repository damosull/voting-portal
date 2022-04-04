import { USER } from '../../../support/constants';

const esgFilters = [
  {
    criteria: 'ESG Risk Rating Assessment',
    editorButton: '#editorDiv1050',
    editorModal: '#sustainalytics-target-RiskCategory',
  },
  {
    criteria: 'ESG Risk Exposure Assessment',
    editorButton: '#editorDiv1051',
    editorModal: '#sustainalytics-target-OverallExposureCategory',
  },
  {
    criteria: 'ESG Risk Management Assessment',
    editorButton: '#editorDiv1052',
    editorModal: '#sustainalytics-target-OverallManagementCategory',
  },
  {
    criteria: 'ESG Risk Rating Percentile Global',
    editorButton: '#editorDiv1053',
    editorModal: '#sustainalytics-target-RiskPercentileUniverse',
  },
  {
    criteria: 'ESG Risk Rating Percentile Industry',
    editorButton: '#editorDiv1054',
    editorModal: '#sustainalytics-target-RiskPercentileIndustry',
  },
  {
    criteria: 'ESG Risk Rating Percentile Sub Industry',
    editorButton: '#editorDiv1055',
    editorModal: '#sustainalytics-target-RiskPercentileSubindustry',
  },
  {
    criteria: 'ESG Risk Rating Highest Controversy',
    editorButton: '#editorDiv1056',
    editorModal: '#sustainalytics-target-HighestControversyCategory',
  },
];

describe('Add Filters', function () {
  esgFilters.forEach((filter) => {
    it(`sustainalytics "${filter.criteria}"`, function () {
      cy.viewport(1100, 900);
      cy.loginWithAdmin(USER.CALPERS);
      cy.visit('/Workflow');
      cy.stausCode200('@GET_AVAILABLE_ASSIGNEES_CUSTOMER'); // Last loaded API on tha page - ext
      

      cy.get(filter.editorButton).should('not.exist');
      cy.get(filter.editorModal).should('not.exist');

      cy.get('#btn-add-criteria').click({ waitForAnimations: false });
      cy.get('#txt-filter-criteria').fill(filter.criteria);
      cy.get(`input[value='${filter.criteria}']`).check({ force: true });
      cy.get('#btn-apply-criteria').click();

      cy.wait('@SUSTAIN_ANALYTICS');

      cy.get(filter.editorButton).click();
      cy.get(filter.editorModal).should('be.visible');
    });
  });
});
