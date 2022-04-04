import '../../../support/commands.js';
const { USER } = require("../../../support/constants");
const unixTime = Math.floor(Date.now() / 1000);
var baseUrl;

//Go through the pages to check if the proper API loading without interaction.
describe('Smoke test', function () {
    beforeEach(function () {
        cy.loginWithAdmin(USER.AUTOMATIONEXTERNAL);
        baseUrl = Cypress.config().baseUrl;
    });
   
    it.only('Done - Workflow page API loaded', function () {
        cy.visit('/Workflow');
        cy.getAutomationUserIDFromDB(USER.AUTOMATIONEXTERNAL).as('userid');

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

        cy.wait('@GET_MARKUP_WORKFLOW').its('response.statusCode').should('eq', 200);
        cy.wait('@GET_MARKUP_DASHBOARD').its('response.statusCode').should('eq', 200);
        cy.wait('@WORKFLOW_CONFIGURE_COLUMNS').its('response.statusCode').should('eq', 200);
        cy.wait('@WORKFLOW_META_DATA_1').its('response.statusCode').should('eq', 200);
        cy.wait('@WORKFLOW_META_DATA_2').its('response.statusCode').should('eq', 200);
        cy.wait('@FILTERS_DIRECTORY').its('response.statusCode').should('eq', 200);
        cy.wait('@GET_FOR_USER').its('response.statusCode').should('eq', 200);
        cy.wait('@WORKFLOW_SECURITIES_WATCHLIST').its('response.statusCode').should('eq', 200);
        cy.wait('@GET_AVAILABLE_ASSIGNEES_CUSTOMER').its('response.statusCode').should('eq', 200);        
        cy.wait('@GET_MARKUP_MEETING_DETAILS').its('response.statusCode').should('eq', 200);
        cy.wait('@GET_USER_PERMISSION').its('response.statusCode').should('eq', 200);
        cy.wait('@WORKFLOW_FILTER_CRITERIA_EDITORS').its('response.statusCode').should('eq', 200);
        cy.wait('@DATE_RANGE_KNOCKOUT_BINDINGS').its('response.statusCode').should('eq', 200);
        cy.wait('@DATE_RANGE').its('response.statusCode').should('eq', 200);
        cy.wait('@LOGGER').its('response.statusCode').should('eq', 204);
        cy.wait('@WORKFLOW_EXPANSION').its('response.statusCode').should('eq', 200);
        cy.wait('@WORKFLOW_SECURITIES_WATCHLIST').its('response.statusCode').should('eq', 200);
        cy.wait('@GET_AVAILABLE_ASSIGNEES_CUSTOMER').its('response.statusCode').should('eq', 200);
        cy.wait('@INBOX').its('response.statusCode').should('eq', 200);
        //cy.wait('@WORKFLOW_SECURITIES_WATCHLIST').its('response.statusCode').should('eq', 200);
        // Ask it: Sometimes it loads 2 sometimes it loads 3 security watchlists
        cy.wait('@GET_AVAILABLE_ASSIGNEES_CUSTOMER').its('response.statusCode').should('eq', 200);

    });

    it('Done - Dashboard page API loaded', function () {

        cy.visit('/Dashboard');

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
        //cy.intercept('GET', '**/Api/Data/WorkflowWidgetData**').as('');
        //cy.intercept('GET', '**/Api/Data/DashboardFilterDetails**').as('');
        //cy.intercept('GET', '**/Api/Data/WorkflowWidgetData**').as('');
        //cy.intercept('GET', '**/Api/Data/DashboardFilterDetails**').as('');
        cy.intercept('GET', '**/Api/Data/GLBlogData**').as('GL_BLOG_DATA');
        cy.intercept('GET', '**/Api/Data/DashboardSubscription/**').as('DASHBOARD_SUBSCRIPTION');

        cy.wait('@CURRENT_USER').its('response.statusCode').should('eq', 200);
        cy.wait('@SPA').its('response.statusCode').should('eq', 200);
        cy.wait('@GET_MARKUP_WORKFLOW').its('response.statusCode').should('eq', 200);
        cy.wait('@GET_MARKUP_DASHBOARD').its('response.statusCode').should('eq', 200);
        cy.wait('@DASHBOARD').its('response.statusCode').should('eq', 200);
        cy.wait('@WIDGET_META').its('response.statusCode').should('eq', 200);
        cy.wait('@DASHBOARD_SETTINGS').its('response.statusCode').should('eq', 200);
        cy.wait('@GET_MARKUP').its('response.statusCode').should('eq', 200);
        cy.wait('@GET_USER_PERMISSION').its('response.statusCode').should('eq', 200);
        cy.wait('@WORKFLOW_CONFIGURE_COLUMNS_WITH_NO_SEARCH').its('response.statusCode').should('eq', 200);
        cy.wait('@DASHBOARD_FILTERS').its('response.statusCode').should('eq', 200);
        cy.wait('@WORKFLOW_META_DATA').its('response.statusCode').should('eq', 200);
        cy.wait('@ESG_RANKINGS_FIELDS').its('response.statusCode').should('eq', 200);
        cy.wait('@DASHBOARD_DETAILS').its('response.statusCode').should('eq', 200);
        cy.wait('@WORKFLOW_WIDGET_DATA').its('response.statusCode').should('eq', 200);
        cy.wait('@DASHBOARD_FILTER_DETAILS').its('response.statusCode').should('eq', 200);
        cy.wait('@WORKFLOW_WIDGET_DATA').its('response.statusCode').should('eq', 200);
        cy.wait('@DASHBOARD_FILTER_DETAILS').its('response.statusCode').should('eq', 200);
        cy.wait('@WORKFLOW_WIDGET_DATA').its('response.statusCode').should('eq', 200);
        cy.wait('@DASHBOARD_FILTER_DETAILS').its('response.statusCode').should('eq', 200);
        cy.wait('@GL_BLOG_DATA').its('response.statusCode').should('eq', 200);
        cy.wait('@DASHBOARD_SUBSCRIPTION').its('response.statusCode').should('eq', 200);
        
    });
    

    it('Done - Reporting page API loaded', function () {

        cy.visit('/Reporting');

        cy.intercept('GET', '**/Api/Data/BallotReconciliation/**').as('BALLOT_RECONCILIATION');
        cy.intercept('GET', '**/Api/WebUIRes/?path=/Scripts/EditorControls/DateRange/dateRangeKnockoutBindings.js**').as('DATE_RANGE_KNCOCKOUT_BINDINGS');
        cy.intercept('GET', '**/Api/WebUIRes/?path=/Scripts/EditorControls/DateRange/DateRange.js**').as('DATE_RANGE');
        cy.intercept('POST', '**/Api/WebUI//ReportsCriteria/ForCriterias?&objectType=BallotReconciliation').as('REPORTS_CRITERIA');
        
        cy.wait('@CURRENT_USER').its('response.statusCode').should('eq', 200);
        cy.wait('@REPORTS_DEFAULT_DATA').its('response.statusCode').should('eq', 200);
        cy.wait('@BALLOT_RECONCILIATION').its('response.statusCode').should('eq', 200);
        cy.wait('@DATE_RANGE_KNCOCKOUT_BINDINGS').its('response.statusCode').should('eq', 200);
        cy.wait('@DATE_RANGE').its('response.statusCode').should('eq', 200);
        cy.wait('@REPORTS_CRITERIA').its('response.statusCode').should('eq', 200);
    });

    it('Working on it - MeetingDetails page API loaded', function () {
        
        cy.visit('/Workflow');
        
        // Click on first meeting in order to arrive to the Meeting page
        cy.get('#metaname-CompanyName > div > span > a').eq(1).click();


        cy.wait('@CURRENT_USER').its('response.statusCode').should('eq', 200);
        cy.wait('@SPA').its('response.statusCode').should('eq', 200);
        cy.wait('@GET_MARKUP_WORKFLOW').its('response.statusCode').should('eq', 200);
        cy.wait('@GET_MARKUP_DASHBOARD').its('response.statusCode').should('eq', 200);
        cy.wait('@WORKFLOW_CONFIGURE_COLUMNS').its('response.statusCode').should('eq', 200);

    });

    it('Done - Change password page API loaded', function () {

        cy.visit('/SetPsw/Change');

        stausCode200('@CURRENT_USER');
        stausCode204('@PASSWORD_VALIDATOR_SETUP');
        
    });

    it('Done - User profile page API loaded', function () {

        cy.visit('/Users/UserProfile');

        stausCode200('@CURRENT_USER');
        stausCode204('@LOGGER');
        stausCode200('@GET_AUTHENTICATED_USER');
        
    });

    it('Ongoing - Customer profile / Accounts page API loaded', function () {

        cy.visit('/Accounts/Index/');

        //cy.intercept('GET', '**/Api/Data/CustomerDetails/GetByID?pCustomerID=0&_=**').as('CustomerDetails');
        cy.intercept('GET', '**/Api/Data/AccountsGridState/**').as('AccountsGridState');
        cy.intercept('GET', '**/Api/Data/Accounts//GetAccountFiltersByScreenID**').as('GetAccountFiltersByScreenID');
        cy.intercept('GET', '**/Api/WebUI/FilterCriteriaEditors?filterPreferenceID=193&objectType=AccountsNew&customerId=0&_=**').as('WebUI');
        cy.intercept('GET', '**/Api/WebUIRes/?path=/Scripts/EditorControls/MultiSelectStatic/MultiSelectStatic.js&_=**').as('WebUIRes');
        cy.intercept('POST', '**/Api/Data/AccountsNew/').as('AccountsNew');
        cy.intercept('GET', '**/Api/Data//ListService/AccountStatusCode?CustomerID=0**').as('ListService');

        stausCode200('@CURRENT_USER');
        stausCode204('@LOGGER');
        stausCode204('@LOGGER');
        stausCode204('@LOGGER');
        //cy.wait('@CustomerDetails').its('response.statusCode').should('eq', 200);
        //cy.wait('@AccountsGridState').its('response.statusCode').should('eq', 200);
        stausCode204('@LOGGER');
        
        cy.wait('@GetAccountFiltersByScreenID').its('response.statusCode').should('eq', 200);
        cy.wait('@WebUI').its('response.statusCode').should('eq', 200);
        cy.wait('@WebUIRes').its('response.statusCode').should('eq', 200);
        stausCode204('@LOGGER');
        stausCode204('@LOGGER');
        cy.wait('@AccountsNew').its('response.statusCode').should('eq', 200);
        cy.wait('@ListService').its('response.statusCode').should('eq', 200);

    });

    it('Ongoing - Customer profile / CustomFields page API loaded', function () {

        cy.visit('/CustomerDetails/CustomFields/');
        
        cy.intercept('GET', '**/Api/Data/CustomFields/?customerId=0&_=**').as('CustomFields');
        cy.intercept('GET', '**/Api/Data/CustomFields/GetDetails?fieldId=**').as('CustomFields_2');

        stausCode200('@CURRENT_USER');
        //cy.wait('@CustomFields').its('response.statusCode').should('eq', 200);
        //cy.wait('@CustomFields_2').its('response.statusCode').should('eq', 200);
        
    });

    it('Ongoing - Customer profile / Rationale library page API loaded', function () {

        cy.visit('/CustomerDetails/Rationale/');

        cy.intercept('GET', '**/Scripts/jquery.poshytip.js?_=**').as('poshytip');
        cy.intercept('GET', '**/Scripts/jquery-editable-poshytip.min.js?_=**').as('editable-poshytip');
        cy.intercept('GET', '**/Api/Data/CustomerDetails//GetByID?&pCustomerID=0&_=**').as('CustomerDetails');
        cy.intercept('GET', '**/Api/Data/RationaleLibrary/**').as('RationaleLibrary');
        //cy.intercept('GET', '**/Scripts/jquery.poshytip.js?_=**').as('poshytip');
        //cy.intercept('GET', '**/Scripts/jquery-editable-poshytip.min.js?_=**').as('editable-poshytip');

        stausCode200('@CURRENT_USER');
        stausCode200('@poshytip');
        stausCode200('@editable-poshytip');
        //cy.wait('@CustomerDetails').its('response.statusCode').should('eq', 200);
        //cy.wait('@RationaleLibrary').its('response.statusCode').should('eq', 200);
        //cy.wait('@poshytip').its('response.statusCode').should('eq', 200);
        //cy.wait('@editable-poshytip').its('response.statusCode').should('eq', 200);
    });

    it('Ongoing - Customer profile page API loaded', function () {
        cy.visit('/CustomerDetails/');

        cy.intercept('GET', '**/Api/Data/CustomerDetails/**').as('CUSTOMER_DETAILS');
        cy.intercept('GET', '**/Api/Data/FilterPreference/**').as('FILTER_PREFERENCE');
        cy.intercept('GET', '**/Api/Data/ListService/VpOnlyWatchlists?_=**').as('VP_ONLY_WATCHLIST');
        cy.intercept('GET', '**/Api/Data/ListService/PolicyId**').as('POLICY_ID');
        cy.intercept('GET', '**/Api/Data/UsersForCustomer/GetCurrentUsercolleagues**').as('GET_CURRENT_USER_COLLEAGUES');
        cy.intercept('PUT', '**/Api/Data/CustomerFormats').as('CUSTOMER_FORMATS');
        
        
        stausCode200('@CURRENT_USER');

        //cy.wait('@CUSTOMER_DETAILS').its('response.statusCode').should('eq', 200);
        //cy.wait('@FILTER_PREFERENCE').its('response.statusCode').should('eq', 200);
        //cy.wait('@VP_ONLY_WATCHLIST').its('response.statusCode').should('eq', 200);
        //cy.wait('@POLICY_ID').its('response.statusCode').should('eq', 200);

        //cy.wait('@GET_CURRENT_USER_COLLEAGUES').its('response.statusCode').should('eq', 200);
        stausCode200('@CUSTOMER_FORMATS');
        
    });

    it('Ongoing - Customer profile / Users/UsersProfiles/ page API loaded', function () {

        cy.visit('/Users/UsersProfiles/');

        cy.intercept('GET', '**/Api/WebUI/Users/GetUsersList?_=**').as('GetUsersList');
        cy.intercept('GET', '**/Api/WebUI/Users/UserProfileHtml?_=**').as('UserProfileHtml');

        stausCode200('@CURRENT_USER');
        //cy.wait('@GetUsersList').its('response.statusCode').should('eq', 200);
        //cy.wait('@UserProfileHtml').its('response.statusCode').should('eq', 200);
        
    });

    it('Ongoing - Watch list(s) page API loaded', function () {

        cy.visit('/ManageWatchlists?ref=settings#watchlist2663');
        
        cy.intercept('GET', '**/Api/WebUI//Securities/SearchToolbar?_=').as('SEARCH_TOOLBAR');
        cy.intercept('GET', '**/Api/Data/Watchlist/**').as('WATCHLIST');
        cy.intercept('GET', '**/Api/Data/WatchlistSecurities/**').as('WATCHLIST_SECURITIES');

        stausCode200('@CURRENT_USER');
        //cy.wait('@CURRENT_USER').its('response.statusCode').should('eq', 200);
        //cy.wait('@SEARCH_TOOLBAR').its('response.statusCode').should('eq', 200);
        //cy.wait('@WATCHLIST').its('response.statusCode').should('eq', 200);
        stausCode200('@WATCHLIST_SECURITIES');

    });

    function stausCode200(param) {
        cy.wait(param).its('response.statusCode').should('eq', 200);
    }

    function stausCode204(param) {
        cy.wait(param).its('response.statusCode').should('eq', 204);
    }

});