import { USER } from '../../../support/constants';
import  workflowPageItems from '../../../elements/pages/workflow/workflowPageItems'


const ESG_Risk_Rating_Assessment_filter = {
  criteria: 'ESG Risk Rating Assessment',
  editorButton: '#editorDiv1050',
  editorModal: '#sustainalytics-target-RiskCategory',
}
const ESG_Risk_Exposure_Assessment_filter = {
  criteria: 'ESG Risk Exposure Assessment',
  editorButton: '#editorDiv1051',
  editorModal: '#sustainalytics-target-OverallExposureCategory',
}

const ESG_Risk_Management_Assessment_filter = {
  criteria: 'ESG Risk Management Assessment',
  editorButton: '#editorDiv1052',
  editorModal: '#sustainalytics-target-OverallManagementCategory',
}

const ESG_Risk_Rating_Percentile_Global_filter = {
  criteria: 'ESG Risk Rating Percentile Global',
  editorButton: '#editorDiv1053',
  editorModal: '#sustainalytics-target-RiskPercentileUniverse',
}

const ESG_Risk_Rating_Percentile_Industry_filter = {
  criteria: 'ESG Risk Rating Percentile Industry',
  editorButton: '#editorDiv1054',
  editorModal: '#sustainalytics-target-RiskPercentileIndustry',
}

const ESG_Risk_Rating_Percentile_Sub_Industry_filter = {
  criteria: 'ESG Risk Rating Percentile Sub Industry',
  editorButton: '#editorDiv1055',
  editorModal: '#sustainalytics-target-RiskPercentileSubindustry',
}

const ESG_Risk_Rating_Highest_Controversy_filter = {
  criteria: 'ESG Risk Rating Highest Controversy',
  editorButton: '#editorDiv1056',
  editorModal: '#sustainalytics-target-HighestControversyCategory',
}

const workflowPage = new workflowPageItems();

describe('Add Filters', function () {
    
    beforeEach(() => {
      cy.viewport(1100, 2000);
      cy.loginWithAdmin(USER.CALPERS);
      cy.visit('/Workflow');
      cy.stausCode200('@INBOX') // Last loaded API-1 on tha page - ext
      cy.stausCode200('@GET_AVAILABLE_ASSIGNEES_CUSTOMER'); // Last loaded API on tha page - ext
    });

    it('ESG Risk Rating Assessment filter', function () {

      elementShouldNotExist(ESG_Risk_Rating_Assessment_filter.editorButton);
      elementShouldNotExist(ESG_Risk_Rating_Assessment_filter.editorModal);

      workflowPage.addCriteriaButton().click();
      workflowPage.criteriaInput().type(ESG_Risk_Rating_Assessment_filter.criteria);
      checkFilterCriteria(ESG_Risk_Rating_Assessment_filter.criteria);
      workflowPage.applyCriteriaButton().click();

      cy.stausCode200('@SUSTAIN_ANALYTICS');
      cy.stausCode204('@LOGGER')

      cy.get(ESG_Risk_Rating_Assessment_filter.editorButton).trigger("click");
      cy.get(ESG_Risk_Rating_Assessment_filter.editorModal).should('be.visible');
    });

    it('ESG Risk Exposure Assessment filter', function () {

      elementShouldNotExist(ESG_Risk_Exposure_Assessment_filter.editorButton);
      elementShouldNotExist(ESG_Risk_Exposure_Assessment_filter.editorModal);

      workflowPage.addCriteriaButton().click();
      workflowPage.criteriaInput().type(ESG_Risk_Exposure_Assessment_filter.criteria);
      checkFilterCriteria(ESG_Risk_Exposure_Assessment_filter.criteria);
      workflowPage.applyCriteriaButton().click();

      cy.stausCode200('@SUSTAIN_ANALYTICS');
      cy.stausCode204('@LOGGER')

      cy.get(ESG_Risk_Exposure_Assessment_filter.editorButton).trigger("click");
      cy.get(ESG_Risk_Exposure_Assessment_filter.editorModal).should('be.visible');
    });    
    
    it('ESG Risk Management Assessment filter', function () {

      elementShouldNotExist(ESG_Risk_Management_Assessment_filter.editorButton);
      elementShouldNotExist(ESG_Risk_Management_Assessment_filter.editorModal);

      workflowPage.addCriteriaButton().click();
      workflowPage.criteriaInput().type(ESG_Risk_Management_Assessment_filter.criteria);
      checkFilterCriteria(ESG_Risk_Management_Assessment_filter.criteria);
      workflowPage.applyCriteriaButton().click();

      cy.stausCode200('@SUSTAIN_ANALYTICS');
      cy.stausCode204('@LOGGER')

      cy.get(ESG_Risk_Management_Assessment_filter.editorButton).trigger("click");
      cy.get(ESG_Risk_Management_Assessment_filter.editorModal).should('be.visible');
    });
    
    it('ESG Risk Rating Percentile Global filter', function () {

      elementShouldNotExist(ESG_Risk_Rating_Percentile_Global_filter.editorButton);
      elementShouldNotExist(ESG_Risk_Rating_Percentile_Global_filter.editorModal);

      workflowPage.addCriteriaButton().click();
      workflowPage.criteriaInput().type(ESG_Risk_Rating_Percentile_Global_filter.criteria);
      checkFilterCriteria(ESG_Risk_Rating_Percentile_Global_filter.criteria);
      workflowPage.applyCriteriaButton().click();

      cy.stausCode200('@SUSTAIN_ANALYTICS');
      cy.stausCode204('@LOGGER')

      cy.get(ESG_Risk_Rating_Percentile_Global_filter.editorButton).trigger("click");
      cy.get(ESG_Risk_Rating_Percentile_Global_filter.editorModal).should('be.visible');
    });
    
    it('ESG Risk Rating Percentile Industry filter', function () {

      elementShouldNotExist(ESG_Risk_Rating_Percentile_Industry_filter.editorButton);
      elementShouldNotExist(ESG_Risk_Rating_Percentile_Industry_filter.editorModal);

      workflowPage.addCriteriaButton().click();
      workflowPage.criteriaInput().type(ESG_Risk_Rating_Percentile_Industry_filter.criteria);
      checkFilterCriteria(ESG_Risk_Rating_Percentile_Industry_filter.criteria);
      workflowPage.applyCriteriaButton().click();

      cy.stausCode200('@SUSTAIN_ANALYTICS');
      cy.stausCode204('@LOGGER')

      cy.get(ESG_Risk_Rating_Percentile_Industry_filter.editorButton).trigger("click");
      cy.get(ESG_Risk_Rating_Percentile_Industry_filter.editorModal).should('be.visible');
    }); 

    it('ESG Risk Rating Percentile Sub Industry filter', function () {

      elementShouldNotExist(ESG_Risk_Rating_Percentile_Sub_Industry_filter.editorButton);
      elementShouldNotExist(ESG_Risk_Rating_Percentile_Sub_Industry_filter.editorModal);

      workflowPage.addCriteriaButton().click();
      workflowPage.criteriaInput().type(ESG_Risk_Rating_Percentile_Sub_Industry_filter.criteria);
      checkFilterCriteria(ESG_Risk_Rating_Percentile_Sub_Industry_filter.criteria);
      workflowPage.applyCriteriaButton().click();

      cy.stausCode200('@SUSTAIN_ANALYTICS');
      cy.stausCode204('@LOGGER')

      cy.get(ESG_Risk_Rating_Percentile_Sub_Industry_filter.editorButton).trigger("click");
      cy.get(ESG_Risk_Rating_Percentile_Sub_Industry_filter.editorModal).should('be.visible');
    }); 

    it('ESG Risk Rating Highest Controversy filter', function () {

      elementShouldNotExist(ESG_Risk_Rating_Highest_Controversy_filter.editorButton);
      elementShouldNotExist(ESG_Risk_Rating_Highest_Controversy_filter.editorModal);

      workflowPage.addCriteriaButton().click();
      workflowPage.criteriaInput().type(ESG_Risk_Rating_Highest_Controversy_filter.criteria);
      checkFilterCriteria(ESG_Risk_Rating_Highest_Controversy_filter.criteria);
      workflowPage.applyCriteriaButton().click();

      cy.stausCode200('@SUSTAIN_ANALYTICS');
      cy.stausCode204('@LOGGER')

      cy.get(ESG_Risk_Rating_Highest_Controversy_filter.editorButton).trigger("click");
      cy.get(ESG_Risk_Rating_Highest_Controversy_filter.editorModal).should('be.visible');
    });
    
});

function elementShouldNotExist(element) {
  cy.get(element).should('not.exist');
}

function checkFilterCriteria(criteria) {
  cy.get(`input[value='${criteria}']`).check({ force: true });
}