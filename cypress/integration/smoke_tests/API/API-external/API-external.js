import '../../../../support/commands.js';
const { USER } = require("../../../../support/constants");
import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

const testUser = {
    UserId: 12204,
    CustomerId: 196,
    LoginId: "automation_calpers@glasslewis.com",
    FullName: "CalPERS | ExtAdmin Automation QaUat"
}

Given('I login as External User', () => {

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

Then('I check the API calls status on the Workflow page', () => {

    cy.stausCode200('@CURRENT_USER');
        cy.get("@CURRENT_USER").should(xhr => {
            expect(xhr.response.body.LoginId).to.eq(testUser.LoginId);
        });

        cy.stausCode200('@SPA');
        cy.get("@SPA").should(xhr => {
            expect(xhr.response.body.UserId).to.eq(testUser.UserId);
            expect(xhr.response.body.CustomerId).to.eq(testUser.CustomerId);
        });

        cy.stausCode200('@GET_MARKUP_WORKFLOW')
        cy.stausCode200('@DASHBOARD_MARKUP')
        cy.stausCode200('@WORKFLOW_CONFIGURE_COLUMNS')
        cy.stausCode200('@WORKFLOW_META_DATA_1')
        cy.stausCode200('@WORKFLOW_META_DATA_2')
        cy.stausCode200('@FILTERS_DIRECTORY')
        cy.stausCode200('@GET_FOR_USER')
        cy.stausCode200('@WORKFLOW_SECURITIES_WATCHLIST')
        cy.stausCode200('@GET_AVAILABLE_ASSIGNEES_CUSTOMER')       
        cy.stausCode200('@GET_MARKUP_MEETING_DETAILS')
        cy.stausCode200('@GET_USER_PERMISSION')
        cy.stausCode200('@WORKFLOW_FILTER_CRITERIA_EDITORS')
        cy.stausCode200('@DATE_RANGE_KNOCKOUT_BINDINGS')
        cy.stausCode200('@DATE_RANGE')
        //cy.stausCode204('@LOGGER')

        cy.stausCode200('@WORKFLOW_EXPANSION')
        cy.get("@WORKFLOW_EXPANSION").should(xhr => {
            const parseObj = JSON.parse(xhr.response.body)
            cy.log("pages number: " + parseObj.pages);
            cy.log("MeetingIdD: " + parseObj.items[0].Agendas[0].Policies[0].Ballots[0].MeetingID);
            cy.log("CompanyName: " + parseObj.items[0].Agendas[0].Policies[0].Ballots[0].CompanyName);
        });

        cy.stausCode200('@WORKFLOW_SECURITIES_WATCHLIST')
        cy.stausCode200('@GET_AVAILABLE_ASSIGNEES_CUSTOMER')
        cy.stausCode200('@INBOX')
        cy.stausCode200('@GET_AVAILABLE_ASSIGNEES_CUSTOMER')

});

Then('I check the API calls status on the Dashboard page', () => {

     //23
     cy.stausCode200('@CURRENT_USER');
     cy.get("@CURRENT_USER").should(xhr => {
         expect(xhr.response.body.LoginId).to.eq(testUser.LoginId);
     });

     cy.stausCode200('@SPA')
     cy.get("@SPA").should(xhr => {
         expect(xhr.response.body.UserId).to.eq(testUser.UserId);
         expect(xhr.response.body.CustomerId).to.eq(testUser.CustomerId);
     });

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
    cy.get("@CURRENT_USER").should(xhr => {
        expect(xhr.response.body.LoginId).to.eq(testUser.LoginId);
    });

    cy.stausCode200('@REPORTS_DEFAULT_DATA')
    cy.stausCode200('@BALLOT_RECONCILIATION')
    cy.stausCode200('@DATE_RANGE_KNOCKOUT_BINDINGS')
    cy.stausCode200('@DATE_RANGE')
    cy.stausCode200('@REPORTS_CRITERIA')

});

Then('I check the API calls status on the MeetingDetails page', () => {
        
    // 35
    cy.stausCode200('@CURRENT_USER');
    cy.get("@CURRENT_USER").should(xhr => {
        expect(xhr.response.body.LoginId).to.eq(testUser.LoginId);
    });

    cy.stausCode200('@SETTINGS_READ');
    cy.stausCode200('@GET_CUSTOMER_SETTINGS');
    cy.stausCode200('@RATIONALE_LIBRARY');
    cy.stausCode200('@VOTE_CARD');
    cy.stausCode200('@VOTE_CARD_GRID_STATE');
    cy.stausCode200('@GET_MEETING_ID');
    cy.stausCode200('@WORKFLOW_RESEARCH_INFO');
    cy.stausCode200('@VOTE_RESULTS');
    cy.stausCode200('@COMMENTS_IDENTITY_SEARCH');
    cy.stausCode200('@COMMENTS_IDENTITY_SEARCH');
    cy.stausCode200('@MEETING_DETAILS_ACTIVITY');
    cy.stausCode200('@GET_AGENDA');
    cy.stausCode200('@WORKFLOW_RESEARCH_INFO');
    cy.stausCode200('@RELATED_MEETINGS');
    //cy.stausCode204('@LOGGER');
    cy.stausCode200('@MEETING_SECURITY_WATCHLIST');
    cy.stausCode200('@META_BALLOTS_GRID');
    cy.stausCode200('@BALLOTS_GRID_STATE');
    cy.stausCode200('@ASSIGNED_MEETING_ID');
    cy.stausCode200('@VOTE_AGAINST_POLICY_WL');
    cy.stausCode200('@MEETING_DETAILS_ACTIVITY');
    //cy.stausCode204('@PUT_BALLOTS_GRID_STATE');
    cy.stausCode200('@GET_FILINGS');
    cy.stausCode200('@VOTE_TALLY');
    cy.stausCode200('@VOTE_TALLY_OWNERSHIP');
    cy.stausCode200('@SEARCH_BALLOTS_WITH_SIMILAR_AGENDAS');
    cy.stausCode200('@COMMENTS');
    cy.stausCode200('@SHARE_MEETING_MODAL');
    cy.stausCode200('@GET_FILINGS');
    cy.stausCode200('@VOTE_TALLY');
    cy.stausCode200('@VOTE_TALLY_OWNERSHIP');
    cy.stausCode200('@SEARCH_BALLOTS_WITH_SIMILAR_AGENDAS');
    cy.stausCode200('@SHARE_MEETING_LISTS');
    cy.stausCode200('@COMMENTS');

});

Then('I check the API calls status on the Password change page', () => {
        
    // 2
    cy.stausCode200('@CURRENT_USER');
    cy.get("@CURRENT_USER").should(xhr => {
        expect(xhr.response.body.LoginId).to.eq(testUser.LoginId);
    });
    cy.stausCode200('@PASSWORD_VALIDATOR_SETUP');

});

Then('I check the API calls status on the User Profile page', () => {

    // 4
    cy.stausCode200('@CURRENT_USER');
    cy.stausCode200('@CURRENT_USER');
    cy.get("@CURRENT_USER").should(xhr => {
        expect(xhr.response.body.LoginId).to.eq(testUser.LoginId);
    });
    
    //cy.stausCode204('@LOGGER');
    cy.stausCode200('@GET_AUTHENTICATED_USER');
    
});

Then('I check the API calls status on the Customer profile / Accounts page', () => {

    // 14
    cy.stausCode200('@CURRENT_USER');
    cy.get("@CURRENT_USER").should(xhr => {
        expect(xhr.response.body.LoginId).to.eq(testUser.LoginId);
    });

    //cy.stausCode204('@LOGGER');
    //cy.stausCode204('@LOGGER');
    //cy.stausCode204('@LOGGER');
    cy.stausCode200('@CUSTOMER_DETAILS')
    cy.stausCode200('@ACCOUNTS_GRID_STATE')
    //cy.stausCode204('@LOGGER');
    cy.stausCode200('@GET_ACCOUNT_FILTERS_BY_SCREEN_ID');
    cy.stausCode200('@FILTER_CRITERIA_EDITORS');
    cy.stausCode200('@WEBUIRES_MULTI_SELECT_STATIC')
    //cy.stausCode204('@LOGGER');
    //cy.stausCode204('@LOGGER');
    cy.stausCode200('@ACCOUNTS_NEW')
    cy.stausCode200('@LIST_SERVICE_ACCOUNT_STATUS_CODE')
    
});

Then('I check the API calls status on the Customer profile / CustomFields page', () => {

    // 3
    cy.stausCode200('@CURRENT_USER');
    cy.get("@CURRENT_USER").should(xhr => {
        expect(xhr.response.body.LoginId).to.eq(testUser.LoginId);
    });

    cy.stausCode200('@CUSTOM_FIELDS')
    cy.stausCode200('@CUSTOM_FIELDS_2')    
    
});


Then('I check the API calls status on the Customer profile / Rationale library page', () => {

    // 7
    cy.stausCode200('@CURRENT_USER');
    cy.get("@CURRENT_USER").should(xhr => {
        expect(xhr.response.body.LoginId).to.eq(testUser.LoginId);
    });

    cy.stausCode200('@POSHYTIP');
    cy.stausCode200('@POSHYTIP_EDITABLE');
    cy.stausCode200('@CUSTOMER_DETAILS')
    cy.stausCode200('@RATIONALE_LIBRARY')
    cy.stausCode200('@POSHYTIP')
    cy.stausCode200('@POSHYTIP_EDITABLE')

});

Then('I check the API calls status on the Customer profile page', () => {

    // 7
    cy.stausCode200('@CURRENT_USER');
    cy.get("@CURRENT_USER").should(xhr => {
        expect(xhr.response.body.LoginId).to.eq(testUser.LoginId);
    });

        cy.stausCode200('@CUSTOMER_DETAILS')
        cy.stausCode200('@FILTER_PREFERENCE')
        cy.stausCode200('@LIST_SERVICE_VP_ONLY_WATCHLIST')
        cy.stausCode200('@LIST_SERVICE_POLICY_ID')
        cy.stausCode200('@GET_CURRENT_USER_COLLEAGUES')
        cy.stausCode200('@CUSTOMER_FORMATS');

});

Then('I check the API calls status on the Customer profile / UsersProfiles page', () => {

    // 3
    cy.stausCode200('@CURRENT_USER');
    cy.get("@CURRENT_USER").should(xhr => {
        expect(xhr.response.body.LoginId).to.eq(testUser.LoginId);
    });

    cy.stausCode200('@GET_USER_LIST')
    cy.stausCode200('@USER_PROFILE_HTML')

});

Then('I check the API calls status on the Watch list page', () => {

    // 4
    cy.stausCode200('@CURRENT_USER')
    cy.get("@CURRENT_USER").should(xhr => {
        expect(xhr.response.body.LoginId).to.eq(testUser.LoginId);
    });

    cy.stausCode200('@SEARCH_TOOLBAR')
    cy.stausCode200('@WATCHLIST')
    cy.stausCode200('@WATCHLIST_SECURITIES');

});