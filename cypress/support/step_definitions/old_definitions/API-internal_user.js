import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

const { USER } = require("../../constants");

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

Then('I check the API calls status on the Workflow page for internal user', () => {

    cy.statusCode200('@CURRENT_USER');
    cy.statusCode200('@SPA');
    cy.statusCode200('@GET_MARKUP_WORKFLOW')
    cy.statusCode200('@DASHBOARD_MARKUP')
    cy.statusCode200('@WORKFLOW_CONFIGURE_COLUMNS')
    cy.statusCode200('@WORKFLOW_META_DATA_1')
    cy.statusCode200('@WORKFLOW_META_DATA_2')
    cy.statusCode200('@FILTERS_DIRECTORY')
    cy.statusCode200('@GET_FOR_USER')
    cy.statusCode200('@WORKFLOW_SECURITIES_WATCHLIST')
    cy.statusCode200('@GET_MARKUP_MEETING_DETAILS')
    cy.statusCode200('@GET_USER_PERMISSION')
    cy.statusCode200('@WORKFLOW_FILTER_CRITERIA_EDITORS')
    cy.statusCode200('@INBOX')
    cy.statusCode200('@DATE_RANGE_KNOCKOUT_BINDINGS')
    cy.statusCode200('@DATE_RANGE')
    cy.statusCode200('@WORKFLOW_EXPANSION')


});

Then('I check the API calls status on the Dashboard page for internal user', () => {

        // 23
    cy.statusCode200('@CURRENT_USER')
    cy.statusCode200('@SPA')
    cy.statusCode200('@GET_MARKUP_WORKFLOW')
    cy.statusCode200('@DASHBOARD_MARKUP')
    cy.statusCode200('@DASHBOARD')
    cy.statusCode200('@WIDGET_META')
    cy.statusCode200('@DASHBOARD_PERMISSIONS')
    cy.statusCode200('@DASHBOARD_SETTINGS')
    cy.statusCode200('@GET_MARKUP_MEETING_DETAILS')
    cy.statusCode200('@GET_USER_PERMISSION')
    cy.statusCode200('@WORKFLOW_CONFIGURE_COLUMNS_WITH_NO_SEARCH')
    cy.statusCode200('@DASHBOARD_FILTERS')
    cy.statusCode200('@WORKFLOW_META_DATA')
    cy.statusCode200('@ESG_RANKINGS_FIELDS')
    cy.statusCode200('@DASHBOARD_DETAILS')
    cy.statusCode200('@WORKFLOW_WIDGET_DATA')
    cy.statusCode200('@DASHBOARD_FILTER_DETAILS')
    cy.statusCode200('@WORKFLOW_WIDGET_DATA')
    cy.statusCode200('@DASHBOARD_FILTER_DETAILS')
    cy.statusCode200('@WORKFLOW_WIDGET_DATA')
    cy.statusCode200('@DASHBOARD_FILTER_DETAILS')
    cy.statusCode200('@GL_BLOG_DATA')
    cy.statusCode200('@DASHBOARD_SUBSCRIPTION')

});

Then('I check the API calls status on the Reporting page for internal user', () => {
        
    // 6
    cy.statusCode200('@CURRENT_USER')
    cy.statusCode200('@REPORTS_DEFAULT_DATA')
    cy.statusCode200('@BALLOT_RECONCILIATION')
    cy.statusCode200('@REPORTS_CRITERIA')
    cy.statusCode200('@DATE_RANGE_KNOCKOUT_BINDINGS')
    cy.statusCode200('@DATE_RANGE')

});

Then('I check the API calls status on the Password change page for internal user', () => {
        
        // 2
        cy.statusCode200('@CURRENT_USER');
        cy.statusCode200('@PASSWORD_VALIDATOR_SETUP');

});

Then('I check the API calls status on the User Profile page for internal user', () => {

    // 4
    cy.statusCode200('@CURRENT_USER');
    cy.statusCode200('@CURRENT_USER');
    cy.statusCode200('@GET_AUTHENTICATED_USER');
    
});

Then('I check the API calls status on the Customer user page for internal user', () => {

    // 18
    cy.statusCode200('@CURRENT_USER');
    cy.statusCode200('@GET_CUSTOMER_SCREEN_FILTERS');
    cy.statusCode200('@FILTER_CRITERIA_EDITORS');
    cy.statusCode200('@WEBUIRES_MULTI_SELECT_STATIC');
    cy.statusCode200('@WEBUIRES_COMPANY_NAME_SPECIAL');
    cy.statusCode200('@POST_CUSTOMER_DYNAMIC');
    cy.statusCode200('@LIST_SERVICE_STATUS_CODE');
    
});

Then('I check the API calls status on the Users page for internal user', () => {

    // 11
    cy.statusCode200('@CURRENT_USER');
    cy.statusCode200('@USER_CREATOR_PERMISSIONS')
    cy.statusCode200('@USER_VIEW_MODEL_VALIDATION_RULES')
    cy.statusCode200('@CUSTOMER_SEARCH')
    cy.statusCode200('@USER_SCREEN_FILTERS')
    cy.statusCode200('@FILTER_CRITERIA_EDITORS')
    cy.statusCode200('@WEBUIRES_MULTI_SELECT_STATIC')
    cy.statusCode200('@WEBUIRES_USER_SPECIAL')
    cy.statusCode200('@POST_USER_LISTS')
    cy.statusCode200('@LIST_SERVICE_STATUS_CODE')

});

Then('I check the API calls status on the Internal Users Profiles page for internal user', () => {

    // 5
    cy.statusCode200('@CURRENT_USER');
    cy.statusCode200('@GET_USER_LIST')
    cy.statusCode200('@USER_PROFILE_HTML')
    cy.statusCode200('@USER_CREATOR_PERMISSIONS');
    cy.statusCode200('@USER_VIEW_MODEL_VALIDATION_RULES');

});

Then('I check the API calls status on the Custodians page for internal user', () => {

    // 7
    cy.statusCode200('@CURRENT_USER');
    cy.statusCode200('@CUSTODIAN_GRID_STATE');
    cy.statusCode200('@GET_CUSTODIAN_SCREEN_FILTERS');
    cy.statusCode200('@FILTER_CRITERIA_EDITORS');
    cy.statusCode200('@WEBUIRES_MULTI_SELECT_STATIC');
    cy.statusCode200('@POST_CUSTODIAN_LIST');
    cy.statusCode200('@LIST_SERVICE_STATUS_CODE');

});

Then('I check the API calls status on the System Permissions page for internal user', () => {

    // 2
    cy.statusCode200('@CURRENT_USER');
    cy.statusCode200('@PERMISSIONS');

});

Then('I check the API calls status on the User Permissions page for internal user', () => {

    // 1
    cy.statusCode200('@CURRENT_USER');

});

Then('I check the API calls status on the Watch list page for internal user', () => {

    // 4 
    cy.statusCode200('@CURRENT_USER');
    cy.statusCode200('@SEARCH_TOOLBAR')
    cy.statusCode200('@WATCHLIST')
    cy.statusCode200('@WATCHLIST_SECURITIES');

});