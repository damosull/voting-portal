import '../../../support/commands.js';
const { USER } = require("../../../support/constants");
const unixTime = Math.floor(Date.now() / 1000);
var baseUrl;

//Go through the pages to check if the proper API loading without interaction.
describe('Smoke test - Internal user', function () {
    beforeEach(function () {
        cy.loginWithAdmin(USER.AUTOMATIONINTERNAL);
        baseUrl = Cypress.config().baseUrl;

        cy.intercept('GET', '**/Api/Data/Dashboard/**').as('DASHBOARD');
        cy.intercept('GET', '**/Api/Data/WidgetMeta/**').as('WIDGET_META');
        cy.intercept('GET', '**/Api/Data/DashboardSettings/**').as('DASHBOARD_SETTINGS');
        cy.intercept('GET', '**/MeetingDetails/GetMarkup/**').as('GET_MARKUP');
        cy.intercept('GET', '**/Api/Data//MdPermissions/GetUserPermissions**').as('GET_USER_PERMISSION');
        cy.intercept('GET', '**/Api/WebUI//Workflow/WorkflowConfigureColumnsWithNoSearch**').as('WORKFLOW_CONFIGURE_COLUMNS_WITH_NO_SEARCH');
        cy.intercept('GET', '**/Api/Data/DashboardFilters**').as('DASHBOARD_FILTERS');
        cy.intercept('GET', '**/Api/Data/WorkflowMetaData/**').as('WORKFLOW_META_DATA');
        cy.intercept('GET', '**/Api/Data/EsgRankingsFields**').as('ESG_RANKINGS_FIELDS');
        cy.intercept('GET', '**/Api/Data/DashboardDetails/**').as('DASHBOARD_DETAILS');
        cy.intercept('GET', '**/Api/Data/WorkflowWidgetData**').as('WORKFLOW_WIDGET_DATA');
        cy.intercept('GET', '**/Api/Data/DashboardFilterDetails**').as('DASHBOARD_FILTER_DETAILS');
        cy.intercept('GET', '**/Api/Data/GLBlogData**').as('GL_BLOG_DATA');
        cy.intercept('GET', '**/Api/Data/DashboardSubscription/**').as('DASHBOARD_SUBSCRIPTION');
        cy.intercept('GET', '**/Api/Data/DashboardPermissions/?_=**').as('DASHBOARD_PERMISSIONS');

        cy.intercept('GET', '**/Api/Data/BallotReconciliation/**').as('BALLOT_RECONCILIATION');
        cy.intercept('GET', '**/Api/WebUIRes/?path=/Scripts/EditorControls/DateRange/dateRangeKnockoutBindings.js**').as('DATE_RANGE_KNCOCKOUT_BINDINGS');
        cy.intercept('GET', '**/Api/WebUIRes/?path=/Scripts/EditorControls/DateRange/DateRange.js**').as('DATE_RANGE');
        cy.intercept('POST', '**/Api/WebUI//ReportsCriteria/ForCriterias?&objectType=BallotReconciliation').as('REPORTS_CRITERIA');

        cy.intercept('GET', '**/Api/Data/BallotReconciliation/**').as('BALLOT_RECONCILIATION');
        cy.intercept('GET', '**/Api/Data/CustomerDynamic//GetCustomerScreenFilters?&ScreenID=2&_=**').as('GetCustomerScreenFilters');
        cy.intercept('GET', '**/Api/WebUI/FilterCriteriaEditors?filterPreferenceID=6&objectType=Customer&customerId=0&_=**').as('FilterCriteriaEditors');
        cy.intercept('POST', '**/Api/Data/CustomerDynamic/').as('CustomerDynamic');
        cy.intercept('GET', '**/Api/Data//ListService/StatusCode?CustomerID=0**').as('ListService');
        cy.intercept('GET', '/Api/WebUIRes/?path=/Scripts/EditorControls/MultiSelectStatic/MultiSelectStatic.js&_=**').as('MultiSelectStatic');
        cy.intercept('GET', '/Api/WebUIRes/?path=/Scripts/EditorControls/CompanyNameSpecial/CustomerSpecial.js&_=**').as('CompanyNameSpecial');

        cy.intercept('GET', '**/Api/Data/UserCreatorPermissions/**').as('UserCreatorPermissions');
        cy.intercept('GET', '**/Api/Data/UserViewModelValidationRules/?_=**').as('UserViewModelValidationRules');
        cy.intercept('GET', '**/Api/Data/CustomerSearch/**').as('CustomerSearch');
        cy.intercept('GET', '**/Api/Data/UserScreenFilters/**').as('UserScreenFilters');
        cy.intercept('GET', '**/Api/WebUI/FilterCriteriaEditors?filterPreferenceID=707&objectType=User&customerId=0&_=**').as('FilterCriteriaEditors');
        cy.intercept('GET', '**/Api/WebUIRes/?path=/Scripts/EditorControls/MultiSelectStatic/MultiSelectStatic.js&_=**').as('MultiSelectStatic');
        cy.intercept('GET', '**/Api/WebUIRes/?path=/Scripts/EditorControls//UserSpecial/UserSpecial.js&_=**').as('UserSpecial');
        cy.intercept('POST', '**/Api/Data/UsersLists/**').as('UsersLists');
        cy.intercept('GET', '**/Api/Data//ListService/StatusCode?CustomerID=**').as('ListService');

        cy.intercept('GET', '**/Api/WebUI/Users/GetUsersList?_=**').as('GetUsersList');
        cy.intercept('GET', '**/Api/WebUI/Users/UserProfileHtml?_=**').as('UserProfileHtml');
        cy.intercept('GET', '**/Api/Data/UserCreatorPermissions/?_=**').as('UserCreatorPermissions');
        cy.intercept('GET', '**/Api/Data/UserViewModelValidationRules/?_=**').as('UserViewModelValidationRules');

        cy.intercept('GET', '**/Api/Data/CustodianGridState//?_=**').as('CustodianGridState');
        cy.intercept('GET', '**/Api/Data/CustodianList//**').as('GetCustodianScreenFilters');
        cy.intercept('GET', '**/Api/WebUI/FilterCriteriaEditors?filterPreferenceID=1503&objectType=Custodian&customerId=0&_=**').as('FilterCriteriaEditors');
        cy.intercept('GET', '**/Api/WebUIRes/?path=/Scripts/EditorControls/MultiSelectStatic/MultiSelectStatic.js&_=**').as('MultiSelectStatic');
        cy.intercept('POST', '**/Api/Data/CustodianList/**').as('CustodianList');
        cy.intercept('GET', '**/Api/Data//ListService/StatusCode?CustomerID=0**').as('ListService');

        cy.intercept('GET', '**/Api/WebUI//Securities/SearchToolbar?_=').as('SEARCH_TOOLBAR');
        cy.intercept('GET', '**/Api/Data/Watchlist/**').as('WATCHLIST');
        cy.intercept('GET', '**/Api/Data/WatchlistSecurities/**').as('WATCHLIST_SECURITIES');

        cy.intercept('GET', '**/Api/Data/Permissions/**').as('Permissions');

        
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
        cy.stausCode200('@GET_MARKUP_DASHBOARD')
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

    it('Ongoing - Dashboard page API loaded', function () {

        cy.visit('/Dashboard');

        // 23
        cy.stausCode200('@CURRENT_USER')
        cy.stausCode200('@SPA')
        cy.stausCode200('@GET_MARKUP_WORKFLOW')
        cy.stausCode200('@GET_MARKUP_DASHBOARD')
        cy.stausCode200('@DASHBOARD')
        cy.stausCode200('@WIDGET_META')
        cy.stausCode200('@DASHBOARD_PERMISSIONS')
        cy.stausCode200('@DASHBOARD_SETTINGS')
        cy.stausCode200('@GET_MARKUP')
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
        cy.stausCode200('@DATE_RANGE_KNCOCKOUT_BINDINGS')
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
        //cy.stausCode200('@GetCustomerScreenFilters');
        cy.stausCode200('@FilterCriteriaEditors');
        cy.stausCode204('@LOGGER');
        cy.stausCode204('@LOGGER');
        cy.stausCode200('@MultiSelectStatic');
        cy.stausCode204('@LOGGER');
        cy.stausCode204('@LOGGER');
        cy.stausCode200('@CompanyNameSpecial');
        cy.stausCode204('@LOGGER');
        cy.stausCode204('@LOGGER');
        cy.stausCode204('@LOGGER');
        cy.stausCode204('@LOGGER');
        cy.stausCode204('@LOGGER');
        cy.stausCode200('@CustomerDynamic');
        cy.stausCode200('@ListService');
    });

    it('Done - Users page API loaded', function () {

        cy.visit('/Users/Index');

        // 11
        cy.stausCode200('@CURRENT_USER');
        //cy.stausCode200('@UserCreatorPermissions')
        //cy.stausCode200('@UserViewModelValidationRules')
        //cy.stausCode200('@CustomerSearch')
        //cy.stausCode200('@UserScreenFilters')
        cy.stausCode200('@FilterCriteriaEditors')
        cy.stausCode200('@MultiSelectStatic')
        cy.stausCode200('@UserSpecial')
        cy.stausCode200('@UsersLists')
        cy.stausCode204('@LOGGER')
        cy.stausCode200('@ListService')

    });

    it('Done - Internal Users / Users/UsersProfiles/ page API loaded', function () {

        cy.visit('/Users/UsersProfiles/');

        // 5
        cy.stausCode200('@CURRENT_USER');
        //cy.stausCode200('@GetUsersList')
        //cy.stausCode200('@UserProfileHtml')
        cy.stausCode200('@UserCreatorPermissions');
        cy.stausCode200('@UserViewModelValidationRules');
    });

    it('Done - Custodians page API loaded', function () {

        cy.visit('/Custodians/Index');
    


        // 7
        cy.stausCode200('@CURRENT_USER');
        //cy.stausCode200('@CustodianGridState');
        cy.stausCode200('@GetCustodianScreenFilters');
        cy.stausCode200('@FilterCriteriaEditors');
        cy.stausCode200('@MultiSelectStatic');
        cy.stausCode200('@CustodianList');
        cy.stausCode200('@ListService');
    });

    it('Done - System Permissions page API loaded', function () {

        cy.visit('/systempermissions');

        // 2
        cy.stausCode200('@CURRENT_USER');
        //cy.stausCode200('@Permissions');

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
        //cy.stausCode200('@SEARCH_TOOLBAR')
        //cy.stausCode200('@WATCHLIST')
        cy.stausCode200('@WATCHLIST_SECURITIES');

    });

});