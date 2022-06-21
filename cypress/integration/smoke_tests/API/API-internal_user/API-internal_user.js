import '../../../../support/commands.js';
import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

const { USER } = require("../../../../support/constants");

Given('I login as Internal User', () => {

    cy.clearCookies();
    cy.loginWithAdmin(USER.AUTOMATIONINTERNAL);

});

When('I arrive on the Workflow page', () => {

    cy.visit('/Workflow');

});

When('I arrive on the Dashboard page', () => {

    cy.visit('/Dashboard');

});

When('I arrive on the Reporting page', () => {

    cy.visit('/Reporting');

});

When('I arrive on the Password change page', () => {

    cy.visit('/SetPsw/Change');

});

When('I arrive on the User Profile page', () => {

    cy.visit('/Users/UserProfile');

});

When('I arrive on the Customer user page', () => {

    cy.visit('/Customers');

});

When('I arrive on the Users page', () => {

    cy.visit('/Users/Index');

});

When('I arrive on the Internal Users Profiles page', () => {

    cy.visit('/Users/UsersProfiles/');

});

When('I arrive on the Custodians page', () => {

    cy.visit('/Custodians/Index');

});

When('I arrive on the System Permissions page', () => {

    cy.visit('/systempermissions');

});

When('I arrive on the User Permissions page', () => {

    cy.visit('/userpermissions');

});

When('I arrive on the Watch list page', () => {

    cy.visit('/ManageWatchlists?ref=settings#watchlist2663');

});

Then('I check the API calls status on the Workflow page', () => {

    cy.stausCode200('@CURRENT_USER');
    cy.stausCode200('@SPA');
    cy.stausCode200('@GET_MARKUP_WORKFLOW')
    cy.stausCode200('@DASHBOARD_MARKUP')
    cy.stausCode200('@WORKFLOW_CONFIGURE_COLUMNS')
    cy.stausCode200('@WORKFLOW_META_DATA_1')
    cy.stausCode200('@WORKFLOW_META_DATA_2')
    cy.stausCode200('@FILTERS_DIRECTORY')
    cy.stausCode200('@GET_FOR_USER')
    cy.stausCode200('@WORKFLOW_SECURITIES_WATCHLIST')
    cy.stausCode200('@GET_MARKUP_MEETING_DETAILS')
    cy.stausCode200('@GET_USER_PERMISSION')
    cy.stausCode200('@WORKFLOW_FILTER_CRITERIA_EDITORS')
    cy.stausCode200('@INBOX')
    cy.stausCode200('@DATE_RANGE_KNOCKOUT_BINDINGS')
    cy.stausCode200('@DATE_RANGE')
    cy.stausCode200('@WORKFLOW_EXPANSION')
    cy.stausCode200('@WORKFLOW_SECURITIES_WATCHLIST')
    cy.stausCode200('@INBOX')
    cy.stausCode200('@INBOX')

});

Then('I check the API calls status on the Dashboard page', () => {

        // 23
    cy.stausCode200('@CURRENT_USER')
    cy.stausCode200('@SPA')
    cy.stausCode200('@GET_MARKUP_WORKFLOW')
    cy.stausCode200('@DASHBOARD_MARKUP')
    cy.stausCode200('@DASHBOARD')
    cy.stausCode200('@WIDGET_META')
    cy.stausCode200('@DASHBOARD_PERMISSIONS')
    cy.stausCode200('@DASHBOARD_SETTINGS')
    cy.stausCode200('@GET_MARKUP_MEETING_DETAILS')
    cy.stausCode200('@GET_USER_PERMISSION')
    cy.stausCode200('@WORKFLOW_CONFIGURE_COLUMNS_WITH_NO_SEARCH')
    cy.stausCode200('@DASHBOARD_FILTERS')
    cy.stausCode200('@WORKFLOW_META_DATA')
    cy.stausCode200('@ESG_RANKINGS_FIELDS')
    cy.stausCode200('@DASHBOARD_DETAILS')
    cy.stausCode200('@WORKFLOW_WIDGET_DATA')
    cy.stausCode200('@DASHBOARD_FILTER_DETAILS')
    cy.stausCode200('@WORKFLOW_WIDGET_DATA')
    cy.stausCode200('@DASHBOARD_FILTER_DETAILS')
    cy.stausCode200('@WORKFLOW_WIDGET_DATA')
    cy.stausCode200('@DASHBOARD_FILTER_DETAILS')
    cy.stausCode200('@GL_BLOG_DATA')
    cy.stausCode200('@DASHBOARD_SUBSCRIPTION')

});

Then('I check the API calls status on the Reporting page', () => {
        
    // 6
    cy.stausCode200('@CURRENT_USER')
    cy.stausCode200('@REPORTS_DEFAULT_DATA')
    cy.stausCode200('@BALLOT_RECONCILIATION')
    cy.stausCode200('@REPORTS_CRITERIA')
    cy.stausCode200('@DATE_RANGE_KNOCKOUT_BINDINGS')
    cy.stausCode200('@DATE_RANGE')

});

Then('I check the API calls status on the Password change page', () => {
        
        // 2
        cy.stausCode200('@CURRENT_USER');
        cy.stausCode200('@PASSWORD_VALIDATOR_SETUP');

});

Then('I check the API calls status on the User Profile page', () => {

    // 4
    cy.stausCode200('@CURRENT_USER');
    cy.stausCode200('@CURRENT_USER');
    cy.stausCode200('@GET_AUTHENTICATED_USER');
    
});

Then('I check the API calls status on the Customer user page', () => {

    // 18
    cy.stausCode200('@CURRENT_USER');
    cy.stausCode200('@GET_CUSTOMER_SCREEN_FILTERS');
    cy.stausCode200('@FILTER_CRITERIA_EDITORS');
    cy.stausCode200('@WEBUIRES_MULTI_SELECT_STATIC');
    cy.stausCode200('@WEBUIRES_COMPANY_NAME_SPECIAL');
    cy.stausCode200('@POST_CUSTOMER_DYNAMIC');
    cy.stausCode200('@LIST_SERVICE_STATUS_CODE');
    
});

Then('I check the API calls status on the Users page', () => {

    // 11
    cy.stausCode200('@CURRENT_USER');
    cy.stausCode200('@USER_CREATOR_PERMISSIONS')
    cy.stausCode200('@USER_VIEW_MODEL_VALIDATION_RULES')
    cy.stausCode200('@CUSTOMER_SEARCH')
    cy.stausCode200('@USER_SCREEN_FILTERS')
    cy.stausCode200('@FILTER_CRITERIA_EDITORS')
    cy.stausCode200('@WEBUIRES_MULTI_SELECT_STATIC')
    cy.stausCode200('@WEBUIRES_USER_SPECIAL')
    cy.stausCode200('@POST_USER_LISTS')
    cy.stausCode200('@LIST_SERVICE_STATUS_CODE')

});

Then('I check the API calls status on the Internal Users Profiles page', () => {

    // 5
    cy.stausCode200('@CURRENT_USER');
    cy.stausCode200('@GET_USER_LIST')
    cy.stausCode200('@USER_PROFILE_HTML')
    cy.stausCode200('@USER_CREATOR_PERMISSIONS');
    cy.stausCode200('@USER_VIEW_MODEL_VALIDATION_RULES');

});

Then('I check the API calls status on the Custodians page', () => {

    // 7
    cy.stausCode200('@CURRENT_USER');
    cy.stausCode200('@CUSTODIAN_GRID_STATE');
    cy.stausCode200('@GET_CUSTODIAN_SCREEN_FILTERS');
    cy.stausCode200('@FILTER_CRITERIA_EDITORS');
    cy.stausCode200('@WEBUIRES_MULTI_SELECT_STATIC');
    cy.stausCode200('@POST_CUSTODIAN_LIST');
    cy.stausCode200('@LIST_SERVICE_STATUS_CODE');

});

Then('I check the API calls status on the System Permissions page', () => {

    // 2
    cy.stausCode200('@CURRENT_USER');
    cy.stausCode200('@PERMISSIONS');

});

Then('I check the API calls status on the User Permissions page', () => {

    // 1
    cy.stausCode200('@CURRENT_USER');

});

Then('I check the API calls status on the Watch list page', () => {

    // 4 
    cy.stausCode200('@CURRENT_USER');
    cy.stausCode200('@SEARCH_TOOLBAR')
    cy.stausCode200('@WATCHLIST')
    cy.stausCode200('@WATCHLIST_SECURITIES');

});