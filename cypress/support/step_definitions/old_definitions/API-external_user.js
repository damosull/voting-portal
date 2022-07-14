/*
Story:
The voting portal is heavily depends on the API calls

Criteria:
- Two tests for internal and external users
- No modifications on the page just check
- Primary function: Check if the page and given APIs loaded
    - Assumption: The page is loaded when all the API is loaded
- Later: Check the incoming API data and compare it what is on the page

Advantages:
- Quite fast feedback (5-10 min depends on failed tests)
- We can use the APIs calls later as an explicit waits
*/

import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

const { USER } = require("../../constants");

Given('I login as External User', () => {

    cy.clearCookies();
    cy.loginWithAdmin(USER.AUTOMATIONEXTERNAL);

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

When('I arrive on the MeetingDetails page', () => {

    cy.visit('https://viewpoint.aqua.glasslewis.com/MeetingDetails/Index/1100577');

});

When('I arrive on the Password change page', () => {

    cy.visit('/SetPsw/Change');

});

When('I arrive on the User Profile page', () => {

    cy.visit('/Users/UserProfile');

});

When('I arrive on the Customer profile / Accounts page', () => {

    cy.visit('/Accounts/Index/');

});

When('I arrive on the Customer profile / CustomFields page', () => {

    cy.visit('/CustomerDetails/CustomFields/');

});

When('I arrive on the Customer profile / Rationale library page', () => {

    cy.visit('/CustomerDetails/Rationale/');

});

When('I arrive on the Customer profile page', () => {

    cy.visit('/CustomerDetails/');

});

When('I arrive on the Customer profile / UsersProfiles page', () => {

    cy.visit('/Users/UsersProfiles/');

});

When('I arrive on the Watch list page', () => {

    cy.visit('/ManageWatchlists?ref=settings#watchlist2663');

});

Then('I check the API calls status on the Workflow page for external user', () => {

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
    cy.statusCode200('@GET_AVAILABLE_ASSIGNEES_CUSTOMER')       
    cy.statusCode200('@GET_MARKUP_MEETING_DETAILS')
    cy.statusCode200('@GET_USER_PERMISSION')
    cy.statusCode200('@WORKFLOW_FILTER_CRITERIA_EDITORS')
    cy.statusCode200('@DATE_RANGE_KNOCKOUT_BINDINGS')
    cy.statusCode200('@DATE_RANGE')
    cy.statusCode200('@WORKFLOW_EXPANSION')
    cy.statusCode200('@GET_AVAILABLE_ASSIGNEES_CUSTOMER')
    cy.statusCode200('@INBOX')

});

Then('I check the API calls status on the Dashboard page for external user', () => {

     //23
     cy.statusCode200('@CURRENT_USER');
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

Then('I check the API calls status on the Reporting page for external user', () => {
        
    // 6
    cy.statusCode200('@CURRENT_USER')
    cy.statusCode200('@REPORTS_DEFAULT_DATA')
    cy.statusCode200('@BALLOT_RECONCILIATION')
    cy.statusCode200('@DATE_RANGE_KNOCKOUT_BINDINGS')
    cy.statusCode200('@DATE_RANGE')
    cy.statusCode200('@REPORTS_CRITERIA')

});

Then('I check the API calls status on the MeetingDetails page for external user', () => {
        
    // 35
    cy.statusCode200('@CURRENT_USER');
    cy.statusCode200('@SETTINGS_READ');
    cy.statusCode200('@GET_CUSTOMER_SETTINGS');
    cy.statusCode200('@RATIONALE_LIBRARY');
    cy.statusCode200('@VOTE_CARD');
    cy.statusCode200('@VOTE_CARD_GRID_STATE');
    cy.statusCode200('@GET_MEETING_ID');
    cy.statusCode200('@VOTE_RESULTS');
    cy.statusCode200('@COMMENTS_IDENTITY_SEARCH');
    cy.statusCode200('@WORKFLOW_RESEARCH_INFO');
    cy.statusCode200('@RELATED_MEETINGS');
    cy.statusCode200('@MEETING_SECURITY_WATCHLIST');
    cy.statusCode200('@META_BALLOTS_GRID');
    cy.statusCode200('@BALLOTS_GRID_STATE');
    cy.statusCode200('@ASSIGNED_MEETING_ID');
    cy.statusCode200('@VOTE_AGAINST_POLICY_WL');
    cy.statusCode200('@MEETING_DETAILS_ACTIVITY');
    cy.statusCode200('@GET_FILINGS');
    cy.statusCode200('@VOTE_TALLY');
    cy.statusCode200('@VOTE_TALLY_OWNERSHIP');
    cy.statusCode200('@SEARCH_BALLOTS_WITH_SIMILAR_AGENDAS');
    cy.statusCode200('@COMMENTS');
    cy.statusCode200('@SHARE_MEETING_MODAL');

});

Then('I check the API calls status on the Password change page for external user', () => {
        
    // 2
    cy.statusCode200('@CURRENT_USER');
    cy.statusCode200('@PASSWORD_VALIDATOR_SETUP');

});

Then('I check the API calls status on the User Profile page for external user', () => {

    // 4
    cy.statusCode200('@CURRENT_USER');
    cy.statusCode200('@CURRENT_USER');   
    cy.statusCode200('@GET_AUTHENTICATED_USER');
    
});

Then('I check the API calls status on the Customer profile / Accounts page for external user', () => {

    // 14
    cy.statusCode200('@CURRENT_USER');
    cy.statusCode200('@CUSTOMER_DETAILS')
    cy.statusCode200('@ACCOUNTS_GRID_STATE')
    cy.statusCode200('@GET_ACCOUNT_FILTERS_BY_SCREEN_ID');
    cy.statusCode200('@FILTER_CRITERIA_EDITORS');
    cy.statusCode200('@WEBUIRES_MULTI_SELECT_STATIC')
    cy.statusCode200('@ACCOUNTS_NEW')
    cy.statusCode200('@LIST_SERVICE_ACCOUNT_STATUS_CODE')
    
});

Then('I check the API calls status on the Customer profile / CustomFields page for external user', () => {

    // 3
    cy.statusCode200('@CURRENT_USER');
    cy.statusCode200('@CUSTOM_FIELDS')
    cy.statusCode200('@CUSTOM_FIELDS_2')    
    
});


Then('I check the API calls status on the Customer profile / Rationale library page for external user', () => {

    // 7
    cy.statusCode200('@CURRENT_USER');
    cy.statusCode200('@POSHYTIP');
    cy.statusCode200('@POSHYTIP_EDITABLE');
    cy.statusCode200('@CUSTOMER_DETAILS')
    cy.statusCode200('@RATIONALE_LIBRARY')
    cy.statusCode200('@POSHYTIP')
    cy.statusCode200('@POSHYTIP_EDITABLE')

});

Then('I check the API calls status on the Customer profile page for external user', () => {

    // 7
    cy.statusCode200('@CURRENT_USER');
    cy.statusCode200('@CUSTOMER_DETAILS')
    cy.statusCode200('@FILTER_PREFERENCE')
    cy.statusCode200('@LIST_SERVICE_VP_ONLY_WATCHLIST')
    cy.statusCode200('@LIST_SERVICE_POLICY_ID')
    cy.statusCode200('@GET_CURRENT_USER_COLLEAGUES')
    cy.statusCode200('@CUSTOMER_FORMATS');

});

Then('I check the API calls status on the Customer profile / UsersProfiles page for external user', () => {

    // 3
    cy.statusCode200('@CURRENT_USER');
    cy.statusCode200('@GET_USER_LIST')
    cy.statusCode200('@USER_PROFILE_HTML')

});

Then('I check the API calls status on the Watch list page for external user', () => {

    // 4
    cy.statusCode200('@CURRENT_USER')
    cy.statusCode200('@SEARCH_TOOLBAR')
    cy.statusCode200('@WATCHLIST')
    cy.statusCode200('@WATCHLIST_SECURITIES');

});