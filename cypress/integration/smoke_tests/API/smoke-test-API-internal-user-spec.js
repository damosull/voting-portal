import '../../../support/commands.js';
const { USER } = require("../../../support/constants");
const unixTime = Math.floor(Date.now() / 1000);
var baseUrl;

//Go through the pages to check if the proper API loading without interaction.
describe('Smoke test - Internal user', function () {
    beforeEach(function () {
        cy.loginWithAdmin(USER.AUTOMATIONINTERNAL);
        baseUrl = Cypress.config().baseUrl;
    });
   
    it('Done - Workflow page API loaded', function () {
        cy.visit('/Workflow');
        cy.getAutomationUserIDFromDB(USER.AUTOMATIONINTERNAL).as('userid');

        cy.wait('@CURRENT_USER').then((response) => {

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
                                expect(response.body.LoginId).to.eq(USER.AUTOMATIONINTERNAL);
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
        cy.stausCode200('@GET_MARKUP_MEETING_DETAILS')
        cy.stausCode200('@GET_USER_PERMISSION')
        cy.stausCode200('@WORKFLOW_FILTER_CRITERIA_EDITORS')
        cy.stausCode200('@INBOX')
        cy.stausCode200('@DATE_RANGE_KNOCKOUT_BINDINGS')
        cy.stausCode200('@DATE_RANGE')
        cy.stausCode204('@LOGGER')
        cy.stausCode200('@WORKFLOW_EXPANSION')
        cy.stausCode200('@WORKFLOW_SECURITIES_WATCHLIST')
        cy.stausCode200('@INBOX')
        cy.stausCode200('@INBOX')

    });

    it('Done - Dashboard page API loaded', function () {

        cy.visit('/Dashboard');

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
    

    it('Done - Reporting page API loaded', function () {

        cy.visit('/Reporting');

        // 6
        cy.stausCode200('@CURRENT_USER')
        cy.stausCode200('@REPORTS_DEFAULT_DATA')
        cy.stausCode200('@BALLOT_RECONCILIATION')
        cy.stausCode200('@REPORTS_CRITERIA')
        cy.stausCode200('@DATE_RANGE_KNOCKOUT_BINDINGS')
        cy.stausCode200('@DATE_RANGE')
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
        cy.stausCode200('@GET_AUTHENTICATED_USER');
        cy.stausCode204('@LOGGER');
        
    });

    it('Done - Customer user profile page API loaded', function () {

        cy.visit('/Customers');

        // 18
        cy.stausCode200('@CURRENT_USER');
        cy.stausCode204('@LOGGER');
        cy.stausCode204('@LOGGER');
        cy.stausCode200('@GET_CUSTOMER_SCREEN_FILTERS');
        cy.stausCode200('@FILTER_CRITERIA_EDITORS');
        cy.stausCode204('@LOGGER');
        cy.stausCode204('@LOGGER');
        cy.stausCode200('@WEBUIRES_MULTI_SELECT_STATIC');
        cy.stausCode204('@LOGGER');
        cy.stausCode204('@LOGGER');
        cy.stausCode200('@WEBUIRES_COMPANY_NAME_SPECIAL');
        cy.stausCode204('@LOGGER');
        cy.stausCode204('@LOGGER');
        cy.stausCode204('@LOGGER');
        cy.stausCode204('@LOGGER');
        cy.stausCode204('@LOGGER');
        cy.stausCode200('@POST_CUSTOMER_DYNAMIC');
        cy.stausCode200('@LIST_SERVICE_STATUS_CODE');
    });

    it('Done - Users page API loaded', function () {

        cy.visit('/Users/Index');

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
        cy.stausCode204('@LOGGER')
        cy.stausCode200('@LIST_SERVICE_STATUS_CODE')

    });

    it('Done - Internal Users / Users/UsersProfiles/ page API loaded', function () {

        cy.visit('/Users/UsersProfiles/');

        // 5
        cy.stausCode200('@CURRENT_USER');
        cy.stausCode200('@GET_USER_LIST')
        cy.stausCode200('@USER_PROFILE_HTML')
        cy.stausCode200('@USER_CREATOR_PERMISSIONS');
        cy.stausCode200('@USER_VIEW_MODEL_VALIDATION_RULES');
    });

    it('Done - Custodians page API loaded', function () {

        cy.visit('/Custodians/Index');

        // 7
        cy.stausCode200('@CURRENT_USER');
        cy.stausCode200('@CUSTODIAN_GRID_STATE');
        cy.stausCode200('@GET_CUSTODIAN_SCREEN_FILTERS');
        cy.stausCode200('@FILTER_CRITERIA_EDITORS');
        cy.stausCode200('@WEBUIRES_MULTI_SELECT_STATIC');
        cy.stausCode200('@POST_CUSTODIAN_LIST');
        cy.stausCode200('@LIST_SERVICE_STATUS_CODE');
    });

    it('Done - System Permissions page API loaded', function () {

        cy.visit('/systempermissions');

        // 2
        cy.stausCode200('@CURRENT_USER');
        cy.stausCode200('@PERMISSIONS');

    });

    it('Done - User Permission page API loaded', function () {

        cy.visit('/userpermissions');

        // 1
        cy.stausCode200('@CURRENT_USER');

    });

    it('Done - Watch list(s) page API loaded', function () {

        cy.visit('/ManageWatchlists?ref=settings#watchlist2663');

        // 4
        cy.stausCode200('@CURRENT_USER');
        cy.stausCode200('@SEARCH_TOOLBAR')
        cy.stausCode200('@WATCHLIST')
        cy.stausCode200('@WATCHLIST_SECURITIES');

    });

});