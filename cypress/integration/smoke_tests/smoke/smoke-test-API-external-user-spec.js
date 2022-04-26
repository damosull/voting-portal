import '../../../support/commands.js';
const { USER } = require("../../../support/constants");
const unixTime = Math.floor(Date.now() / 1000);
var baseUrl;
var token;

//Go through the pages to check if the proper API loading without interaction.
describe('Smoke test - External user', function () {
    beforeEach(function () {
        cy.loginWithAdmin(USER.AUTOMATIONEXTERNAL);
        baseUrl = Cypress.config().baseUrl;
    });
   
    it.only('Done - Workflow page API loaded', function () {
        cy.visit('/Workflow');
        
        cy.request('/Workflow').its('body').then((body) => {
            const $html = Cypress.$(body);
            token = $html.find('input[name=csrf-token]').val();
            cy.log("1.token: " + token);
        });

        /*
        cy.get('#csrf-token').invoke('attr', 'value').then(csrftoken =>{
            cy.log(csrftoken);
            token = csrftoken;
        });
        */

        cy.log("2.token: " + token);

        cy.getAutomationUserIDFromDB(USER.AUTOMATIONEXTERNAL).as('userid');
        cy.stausCode200('@CURRENT_USER');

        cy.get("@CURRENT_USER").should(xhr => {
            cy.log(xhr.response.body.LoginId);
        });

        cy.get('@CURRENT_USER').then((response) => {

            var csrftoken = response.request.headers.csrftoken;
            cy.wrap(csrftoken).as('csrftoken');

            }).get('@csrftoken').then((token) => {
                cy.request({
                    method: 'GET',
                    url: baseUrl + '/Api/Data/CurrentUser/?_=' + unixTime,
                    headers: {
                        CSRFToken: token,
                        }
                            }).then((response) => {
                                expect(response.status).to.eq(200);
                                cy.get('#logged-in-user').should('have.text', response.body.FullName);
                                expect(response.body.LoginId).to.eq(USER.AUTOMATIONEXTERNAL);
                            })
                    })

        cy.get('@userid').then((uid) => {
            cy.get('@csrftoken').then((token) => {
            cy.request({
                method: 'GET',
                url: baseUrl + '/Api/Data//Spa?_=' + unixTime,
                headers: {
                    CSRFToken: token,
                }
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.PageToRender).to.eq(1);
                
                expect(response.body.UserId).to.eq(uid);
                        })
                })
        })

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
        
        cy.stausCode204('@LOGGER')
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

    it('Done - Dashboard page API loaded', function () {

        cy.visit('/Dashboard');
        
        //23
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
    

    it('Done - Reporting page API loaded', function () {

        cy.visit('/Reporting');
        
        // 6
        cy.stausCode200('@CURRENT_USER')
        cy.stausCode200('@REPORTS_DEFAULT_DATA')
        cy.stausCode200('@BALLOT_RECONCILIATION')
        cy.stausCode200('@DATE_RANGE_KNOCKOUT_BINDINGS')
        cy.stausCode200('@DATE_RANGE')
        cy.stausCode200('@REPORTS_CRITERIA')

    });

  it('Working on it - MeetingDetails page API loaded', function () {
      
        cy.visit('https://viewpoint.aqua.glasslewis.com/MeetingDetails/Index/1100577');
        
        // 35
        cy.stausCode200('@CURRENT_USER');
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
        cy.stausCode204('@LOGGER');
        cy.stausCode200('@MEETING_SECURITY_WATCHLIST');
        cy.stausCode200('@META_BALLOTS_GRID');
        cy.stausCode200('@BALLOTS_GRID_STATE');
        cy.stausCode200('@ASSIGNED_MEETING_ID');
        cy.stausCode200('@VOTE_AGAINST_POLICY_WL');
        cy.stausCode200('@MEETING_DETAILS_ACTIVITY');
        cy.stausCode204('@PUT_BALLOTS_GRID_STATE');
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

    it('Done - Change password page API loaded', function () {

        cy.visit('/SetPsw/Change');

        // 2
        cy.stausCode200('@CURRENT_USER');
        cy.stausCode200('@PASSWORD_VALIDATOR_SETUP');
        
    });

    it('Done - User profile page API loaded', function () {

        cy.visit('/Users/UserProfile');

        // 4
        cy.stausCode200('@CURRENT_USER');
        cy.stausCode200('@CURRENT_USER');
        cy.stausCode204('@LOGGER');
        cy.stausCode200('@GET_AUTHENTICATED_USER');
        
    });

    it('Done - Customer profile / Accounts page API loaded', function () {

        cy.visit('/Accounts/Index/');

        // 14
        cy.stausCode200('@CURRENT_USER');
        cy.stausCode204('@LOGGER');
        cy.stausCode204('@LOGGER');
        cy.stausCode204('@LOGGER');
        cy.stausCode200('@CUSTOMER_DETAILS')
        cy.stausCode200('@ACCOUNTS_GRID_STATE')
        cy.stausCode204('@LOGGER');
        cy.stausCode200('@GET_ACCOUNT_FILTERS_BY_SCREEN_ID');
        cy.stausCode200('@FILTER_CRITERIA_EDITORS');
        cy.stausCode200('@WEBUIRES_MULTI_SELECT_STATIC')
        cy.stausCode204('@LOGGER');
        cy.stausCode204('@LOGGER');
        cy.stausCode200('@ACCOUNTS_NEW')
        cy.stausCode200('@LIST_SERVICE_ACCOUNT_STATUS_CODE')

    });

    it('Done - Customer profile / CustomFields page API loaded', function () {

        cy.visit('/CustomerDetails/CustomFields/');

        // 3
        cy.stausCode200('@CURRENT_USER');
        cy.stausCode200('@CUSTOM_FIELDS')
        cy.stausCode200('@CUSTOM_FIELDS_2')
        
    });

    it('Done - Customer profile / Rationale library page API loaded', function () {

        cy.visit('/CustomerDetails/Rationale/');

        // 7
        cy.stausCode200('@CURRENT_USER');
        cy.stausCode200('@POSHYTIP');
        cy.stausCode200('@POSHYTIP_EDITABLE');
        cy.stausCode200('@CUSTOMER_DETAILS')
        cy.stausCode200('@RATIONALE_LIBRARY')
        cy.stausCode200('@POSHYTIP')
        cy.stausCode200('@POSHYTIP_EDITABLE')
    });

    it('Done - Customer profile page API loaded', function () {
        
        cy.visit('/CustomerDetails/');

        // 7
        cy.stausCode200('@CURRENT_USER');
        cy.stausCode200('@CUSTOMER_DETAILS')
        cy.stausCode200('@FILTER_PREFERENCE')
        cy.stausCode200('@LIST_SERVICE_VP_ONLY_WATCHLIST')
        cy.stausCode200('@LIST_SERVICE_POLICY_ID')
        cy.stausCode200('@GET_CURRENT_USER_COLLEAGUES')
        cy.stausCode200('@CUSTOMER_FORMATS');
        
    });

    it('Done - Customer profile / Users/UsersProfiles/ page API loaded', function () {

        cy.visit('/Users/UsersProfiles/');

        // 3
        cy.stausCode200('@CURRENT_USER');
        cy.stausCode200('@GET_USER_LIST')
        cy.stausCode200('@USER_PROFILE_HTML')
        
    });

    it('Done - Watch list(s) page API loaded', function () {

        cy.visit('/ManageWatchlists?ref=settings#watchlist2663');
    
        // 4
        cy.stausCode200('@CURRENT_USER')
        cy.stausCode200('@SEARCH_TOOLBAR')
        cy.stausCode200('@WATCHLIST')
        cy.stausCode200('@WATCHLIST_SECURITIES');

    });

});