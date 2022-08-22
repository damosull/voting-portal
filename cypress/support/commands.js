import { USER, API, messages } from '../support/constants';
import controversyAlertJsonBody from "../fixtures/controversyAlertBody"

Cypress.Commands.add('SetPaginationAndVerify', (numItemsPerPage, num) => {
  cy.get('#ballots-grid > div.k-pager-wrap.k-grid-pager.k-widget > span.k-pager-sizes.k-label > span > select').invoke(
    'attr',
    'style',
    'display: block'
  );
  cy.get('#ballots-grid > div.k-pager-wrap.k-grid-pager.k-widget > span.k-pager-sizes.k-label > span > select').select(
    numItemsPerPage,
    { timeout: 50000 }
  );
  cy.get('#md-ballots-grid-results').find('tr').its('length').should('eq', num);
  cy.get('#ballots-grid > div.k-pager-wrap.k-grid-pager.k-widget > span.k-pager-sizes.k-label > span > select')
    .find(':selected')
    .should('have.text', numItemsPerPage);
});

//make sure all dates are current with this meeting id
Cypress.Commands.add('AddTenDaysToMeetingDates', (meetingId) => {
  cy.executeUpdateQuery(
    `UPDATE PX_Meeting SET
        MeetingDate = DATEADD(DAY, 10, getdatE()),
        FileProcessingDate = DATEADD(DAY, -1, getdatE()),
        HoldReconciliationDate = DATEADD(DAY, 10, getdatE()),
        LastModifiedDate = DATEADD(DAY, 10, getdatE()),
        RecordDate = DATEADD(DAY, 10, getdatE()),
        SharesDependentChangeDate = DATEADD(DAY, 10, getdatE()),
        VoteDeadlineDate = DATEADD(DAY, 10, getdatE())
        WHERE MeetingID IN (` +
    meetingId +
    `)`
  );
});

Cypress.Commands.add('SetMeetingDateXdaysFromCurrent', (meetingId, days) => {
  cy.executeUpdateQuery(
    `UPDATE PX_Meeting SET
        MeetingDate = DATEADD(DAY, ${days}, getdatE()),
        FileProcessingDate = DATEADD(DAY, -1, getdatE()),
        HoldReconciliationDate = DATEADD(DAY, 10, getdatE()),
        LastModifiedDate = DATEADD(DAY, 10, getdatE()),
        RecordDate = DATEADD(DAY, 10, getdatE()),
        SharesDependentChangeDate = DATEADD(DAY, 10, getdatE()),
        VoteDeadlineDate = DATEADD(DAY, 10, getdatE())
        WHERE MeetingID IN (` +
    meetingId +
    `)`
  );
});

Cypress.Commands.add('executeUpdateQuery', (query) => {
  // Execute the query only if a SELECT is sent as a parameter
  if (query.includes('UPDATE')) {
    cy.sqlServer(query);
  } else {
    cy.log('Enter a valid query');
  }
});

Cypress.Commands.add('TurnOnCustomerSetting', (settings, parameter) => {
  cy.get('@csrftoken').then((token) => {
    cy.request({
      method: 'GET',
      url: `https://viewpoint.aqua.glasslewis.com/Api/Data/CustomerDetails//GetByID${settings}`,
      headers: {
        CSRFToken: token,
      },
    }).then((resp) => {
      expect(resp.status).to.eq(200);
      const custPermissions = resp.body;
      custPermissions.SettingsViewModel[parameter] = true;

      const newBody = custPermissions;
      cy.request({
        method: 'PUT',
        url: 'https://viewpoint.aqua.glasslewis.com/Api/Data/CustomerDetailsUpdate/',
        headers: {
          CSRFToken: token,
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: newBody,
      }).then((resp) => {
        expect(resp.status).to.eq(200);
      });

    });
  });
});

// Verify header buttons [Vote], [Take no Action] and [Instruct]
Cypress.Commands.add('verifyMeetingOptionButtons', () => {
  cy.get('#btn-vote-now').should('be.visible');
  cy.get('#btn-take-no-action').should('be.visible');
  cy.get('#btn-instruct').should('be.visible');
});

Cypress.Commands.add('loginWithAdmin', (user) => {

  // POST
  cy.intercept('POST', API.POST.ADD).as('ADD');
  cy.intercept('POST', API.POST.AVA_CRITERIA).as('AVA_CRITERIA');
  cy.intercept('POST', API.POST.BALLOT_CRITERIA).as('BALLOT_CRITERIA');
  cy.intercept('POST', API.POST.CREATE_DRAFT_FILTER).as('CREATE_DRAFT_FILTER');
  cy.intercept('POST', API.POST.CRITERIA_ENGAGEMENT).as('CRITERIA_ENGAGEMENT');
  cy.intercept('POST', API.POST.DOCUMENTS_DATA).as('DOCUMENTS_DATA');
  cy.intercept('POST', API.POST.FILE_ADD).as('FILE_ADD');
  cy.intercept('POST', API.POST.GET_AVAILABLE_ASSIGNEES_CUSTOMER).as('GET_AVAILABLE_ASSIGNEES_CUSTOMER');
  cy.intercept('POST', API.POST.GET_AGENDA).as('GET_AGENDA');
  cy.intercept('POST', API.POST.MEETING_DETAILS).as('MEETING_DETAILS');
  cy.intercept('POST', API.POST.MEETING_DETAILS_ACTIVITY).as('MEETING_DETAILS_ACTIVITY');
  cy.intercept('POST', API.POST.LOGGER).as('LOGGER');
  cy.intercept('POST', API.POST.POST_CUSTOMER_DYNAMIC).as('POST_CUSTOMER_DYNAMIC')
  cy.intercept('POST', API.POST.PROXY_VOTING).as('PROXY_VOTING');
  cy.intercept('POST', API.POST.REPORTS_CRITERIA).as('REPORTS_CRITERIA');
  cy.intercept('POST', API.POST.SEARCH_BALLOTS_WITH_SIMILAR_AGENDAS).as('SEARCH_BALLOTS_WITH_SIMILAR_AGENDAS');
  cy.intercept('POST', API.POST.SHARE_MEETING_MODAL).as('SHARE_MEETING_MODAL');
  cy.intercept('POST', API.POST.VOTE_TALLY).as('VOTE_TALLY');
  cy.intercept('POST', API.POST.VOTE_TALLY_OWNERSHIP).as('VOTE_TALLY_OWNERSHIP');
  cy.intercept('POST', API.POST.VOTE_RESULTS).as('VOTE_RESULTS');
  cy.intercept('POST', API.POST.VOTE_TALLY_OWNERSHIP).as('VOTE_TALLY_OWNERSHIP');
  cy.intercept('POST', API.POST.VOTE_REQUEST_VALIDATION).as('VOTE_REQUEST_VALIDATION');
  cy.intercept('POST', API.POST.WORKFLOW_EXPANSION).as('WORKFLOW_EXPANSION');
  cy.intercept('POST', API.POST.WORKFLOW_SECURITIES_WATCHLIST).as('WORKFLOW_SECURITIES_WATCHLIST');
  cy.intercept('POST', API.POST.POST_USER_LISTS).as('POST_USER_LISTS');
  cy.intercept('POST', API.POST.POST_CUSTODIAN_LIST).as('POST_CUSTODIAN_LIST');
  cy.intercept('POST', API.POST.ACCOUNTS_NEW).as('ACCOUNTS_NEW');

  // GET
  cy.intercept('GET', API.GET.ACCOUNTS_GRID_STATE).as('ACCOUNTS_GRID_STATE');
  cy.intercept('GET', API.GET.ACTIVE_FLAG).as('ACTIVE_FLAG')
  cy.intercept('GET', API.GET.AVA_REPORT).as('AVA_REPORT');
  cy.intercept('GET', API.GET.ASSIGNED_MEETING_ID).as('ASSIGNED_MEETING_ID');
  cy.intercept('GET', API.GET.BALLOT_ACTIVITY_LOG).as('BALLOT_ACTIVITY_LOG');
  cy.intercept('GET', API.GET.BALLOT_RECONCILIATION).as('BALLOT_RECONCILIATION');
  cy.intercept('GET', API.GET.BALLOT_VOTE).as('BALLOT_VOTE');
  cy.intercept('GET', API.GET.BALLOTS_GRID_STATE).as('BALLOTS_GRID_STATE');
  cy.intercept('GET', API.GET.CURRENT_USER).as('CURRENT_USER');
  cy.intercept('GET', API.GET.CUSTODIAN_GRID_STATE).as('CUSTODIAN_GRID_STATE');
  cy.intercept('GET', API.GET.CUSTOM_FIELDS).as('CUSTOM_FIELDS');
  cy.intercept('GET', API.GET.CUSTOM_FIELDS_2).as('CUSTOM_FIELDS_2');
  cy.intercept('GET', API.GET.CUSTOMER_DETAILS).as('CUSTOMER_DETAILS');
  cy.intercept('GET', API.GET.CUSTOMER_NAME_SPECIAL).as('CUSTOMER_NAME_SPECIAL');
  cy.intercept('GET', API.GET.CUSTOMER_SEARCH).as('CUSTOMER_SEARCH');
  cy.intercept('GET', API.GET.COMMENTS).as('COMMENTS');
  cy.intercept('GET', API.GET.COMMENTS_IDENTITY_SEARCH).as('COMMENTS_IDENTITY_SEARCH');
  cy.intercept('GET', API.GET.DATA).as('DATA');
  cy.intercept('GET', API.GET.DATE_RANGE).as('DATE_RANGE');
  cy.intercept('GET', API.GET.DATE_RANGE_KNOCKOUT_BINDINGS).as('DATE_RANGE_KNOCKOUT_BINDINGS');
  cy.intercept('GET', API.GET.DASHBOARD).as('DASHBOARD');
  cy.intercept('GET', API.GET.DASHBOARD_DETAILS).as('DASHBOARD_DETAILS');
  cy.intercept('GET', API.GET.DASHBOARD_FILTER_DETAILS).as('DASHBOARD_FILTER_DETAILS');
  cy.intercept('GET', API.GET.DASHBOARD_FILTERS).as('DASHBOARD_FILTERS');
  cy.intercept('GET', API.GET.DASHBOARD_MARKUP).as('DASHBOARD_MARKUP');
  cy.intercept('GET', API.GET.DASHBOARD_PERMISSIONS).as('DASHBOARD_PERMISSIONS');
  cy.intercept('GET', API.GET.DASHBOARD_SUBSCRIPTION).as('DASHBOARD_SUBSCRIPTION');
  cy.intercept('GET', API.GET.DASHBOARD_SETTINGS).as('DASHBOARD_SETTINGS');
  cy.intercept('GET', API.GET.ENGAGEMENT).as('ENGAGEMENT');
  cy.intercept('GET', API.GET.ESG_RANKINGS_FIELDS).as('ESG_RANKINGS_FIELDS');
  cy.intercept('GET', API.GET.FILTER_CRITERIA_EDITORS).as('FILTER_CRITERIA_EDITORS');
  cy.intercept('GET', API.GET.FILTER_PREFERENCE).as('FILTER_PREFERENCE');
  cy.intercept('GET', API.GET.FILTERS_DIRECTORY).as('FILTERS_DIRECTORY');
  cy.intercept('GET', API.GET.FILTERS).as('FILTERS')
  cy.intercept('GET', API.GET.GET_ACCOUNT_FILTERS_BY_SCREEN_ID).as('GET_ACCOUNT_FILTERS_BY_SCREEN_ID');
  cy.intercept('GET', API.GET.GET_AUTHENTICATED_USER).as('GET_AUTHENTICATED_USER');
  cy.intercept('GET', API.GET.GET_CURRENT_USER_COLLEAGUES).as('GET_CURRENT_USER_COLLEAGUES');
  cy.intercept('GET', API.GET.GET_CUSTODIAN_SCREEN_FILTERS).as('GET_CUSTODIAN_SCREEN_FILTERS');
  cy.intercept('GET', API.GET.GET_CUSTOMER_SETTINGS).as('GET_CUSTOMER_SETTINGS');
  cy.intercept('GET', API.GET.GET_MARKUP_MEETING_DETAILS).as('GET_MARKUP_MEETING_DETAILS');
  cy.intercept('GET', API.GET.GET_MARKUP_WORKFLOW).as('GET_MARKUP_WORKFLOW');
  cy.intercept('GET', API.GET.GET_MEETING_ID).as('GET_MEETING_ID');
  cy.intercept('GET', API.GET.GET_CUSTOMER_DYNAMIC).as('GET_CUSTOMER_DYNAMIC')
  cy.intercept('GET', API.GET.GET_CUSTOMER_SCREEN_FILTERS).as('GET_CUSTOMER_SCREEN_FILTERS');
  cy.intercept('GET', API.GET.GET_FILINGS).as('GET_FILINGS');
  cy.intercept('GET', API.GET.GET_FOR_USER).as('GET_FOR_USER');
  cy.intercept('GET', API.GET.GET_USER_LIST).as('GET_USER_LIST');
  cy.intercept('GET', API.GET.GET_POLICY).as('GET_POLICY');
  cy.intercept('GET', API.GET.GET_USER_PERMISSION).as('GET_USER_PERMISSION');
  cy.intercept('GET', API.GET.GL_BLOG_DATA).as('GL_BLOG_DATA');
  cy.intercept('GET', API.GET.IDENTITY_SEARCH).as('IDENTITY_SEARCH');
  cy.intercept('GET', API.GET.INBOX).as('INBOX');
  cy.intercept('GET', API.GET.LIST_SERVICE).as('LIST_SERVICE');
  cy.intercept('GET', API.GET.LIST_SERVICE_ACCOUNT_STATUS_CODE).as('LIST_SERVICE_ACCOUNT_STATUS_CODE');
  cy.intercept('GET', API.GET.LIST_SERVICE_POLICY_ID).as('LIST_SERVICE_POLICY_ID');
  cy.intercept('GET', API.GET.LIST_SERVICE_STATUS_CODE).as('LIST_SERVICE_STATUS_CODE');
  cy.intercept('GET', API.GET.LIST_SERVICE_VP_ONLY_WATCHLIST).as('LIST_SERVICE_VP_ONLY_WATCHLIST');
  cy.intercept('GET', API.GET.LOAD_INBOX).as('LOAD_INBOX');
  cy.intercept('GET', API.GET.MEETING_SECURITY_WATCHLIST).as('MEETING_SECURITY_WATCHLIST');
  cy.intercept('GET', API.GET.MEETING_MATERIALS).as('MEETING_MATERIALS');
  cy.intercept('GET', API.GET.META_BALLOTS_GRID).as('META_BALLOTS_GRID');
  cy.intercept('GET', API.GET.PAGE_SECTION_ORDER).as('PAGE_SECTION_ORDER');
  cy.intercept('GET', API.GET.PASSWORD_VALIDATOR_SETUP).as('PASSWORD_VALIDATOR_SETUP');
  cy.intercept('GET', API.GET.PERMISSIONS).as('PERMISSIONS');
  cy.intercept('GET', API.GET.POLICY).as('POLICY');
  cy.intercept('GET', API.GET.POSHYTIP).as('POSHYTIP');
  cy.intercept('GET', API.GET.POSHYTIP_EDITABLE).as('POSHYTIP_EDITABLE');
  cy.intercept('GET', API.GET.RANGE_SLIDER).as('RANGE_SLIDER');
  cy.intercept('GET', API.GET.RATIONALE_LIBRARY).as('RATIONALE_LIBRARY');
  cy.intercept('GET', API.GET.RELATED_MEETINGS).as('RELATED_MEETINGS');
  cy.intercept('GET', API.GET.REPORT_TYPE).as('REPORT_TYPE');
  cy.intercept('GET', API.GET.REPORTS_DEFAULT_DATA).as('REPORTS_DEFAULT_DATA');
  cy.intercept('GET', API.GET.SEARCH_TOOLBAR).as('SEARCH_TOOLBAR');
  cy.intercept('GET', API.GET.SETTINGS_READ).as('SETTINGS_READ');
  cy.intercept('GET', API.GET.SHARE_MEETING_LISTS).as('SHARE_MEETING_LISTS');
  cy.intercept('GET', API.GET.SUBSCRIPTIONS).as('SUBSCRIPTIONS');
  cy.intercept('GET', API.GET.SUSTAIN_ANALYTICS).as('SUSTAIN_ANALYTICS');
  cy.intercept('GET', API.GET.SPA).as('SPA');
  cy.intercept('GET', API.GET.TOOLBAR_SEARCH).as('TOOLBAR_SEARCH');
  cy.intercept('GET', API.GET.USER_CREATOR_PERMISSIONS).as('USER_CREATOR_PERMISSIONS');
  cy.intercept('GET', API.GET.USER_PROFILE_HTML).as('USER_PROFILE_HTML');
  cy.intercept('GET', API.GET.USER_SCREEN_FILTERS).as('USER_SCREEN_FILTERS');
  cy.intercept('GET', API.GET.USER_VIEW_MODEL_VALIDATION_RULES).as('USER_VIEW_MODEL_VALIDATION_RULES');
  cy.intercept('GET', API.GET.VOTE_AGAINST_POLICY_WL).as('VOTE_AGAINST_POLICY_WL');
  cy.intercept('GET', API.GET.VOTE_CARD).as('VOTE_CARD');
  cy.intercept('GET', API.GET.VOTE_CARD_GRID_STATE).as('VOTE_CARD_GRID_STATE');
  cy.intercept('GET', API.GET.WATCHLIST).as('WATCHLIST');
  cy.intercept('GET', API.GET.WATCHLIST_SECURITIES).as('WATCHLIST_SECURITIES');
  cy.intercept('GET', API.GET.WATCHLIST_IDENTITY_SEARCH).as('WATCHLIST_IDENTITY_SEARCH');
  cy.intercept('GET', API.GET.WEBUIRES_COMPANY_NAME_SPECIAL).as('WEBUIRES_COMPANY_NAME_SPECIAL');
  cy.intercept('GET', API.GET.WEBUIRES_MULTI_SELECT_STATIC).as('WEBUIRES_MULTI_SELECT_STATIC');
  cy.intercept('GET', API.GET.WEBUIRES_USER_SPECIAL).as('WEBUIRES_USER_SPECIAL');
  cy.intercept('GET', API.GET.WIDGET_META).as('WIDGET_META');
  cy.intercept('GET', API.GET.WORKFLOW_CONFIGURE_COLUMNS).as('WORKFLOW_CONFIGURE_COLUMNS');
  cy.intercept('GET', API.GET.WORKFLOW_CONFIGURE_COLUMNS_WITH_NO_SEARCH).as('WORKFLOW_CONFIGURE_COLUMNS_WITH_NO_SEARCH');
  cy.intercept('GET', API.GET.WORKFLOW_FILTER_CRITERIA_EDITORS).as('WORKFLOW_FILTER_CRITERIA_EDITORS');
  cy.intercept('GET', API.GET.WORKFLOW_META_DATA).as('WORKFLOW_META_DATA');
  cy.intercept('GET', API.GET.WORKFLOW_META_DATA_1).as('WORKFLOW_META_DATA_1');
  cy.intercept('GET', API.GET.WORKFLOW_META_DATA_2).as('WORKFLOW_META_DATA_2');
  cy.intercept('GET', API.GET.WORKFLOW_RESEARCH_INFO).as('WORKFLOW_RESEARCH_INFO');
  cy.intercept('GET', API.GET.WORKFLOW_WIDGET_DATA).as('WORKFLOW_WIDGET_DATA');

  // PUT
  cy.intercept('PUT', API.PUT.BALLOT_GRID_STATE).as('BALLOT_GRID_STATE');
  cy.intercept('PUT', API.PUT.CUSTOMER_FORMATS).as('CUSTOMER_FORMATS');
  cy.intercept('PUT', API.PUT.PUT_BALLOTS_GRID_STATE).as('PUT_BALLOTS_GRID_STATE');

  // DELETE
  cy.intercept('DELETE', API.DELETE.REMOVE).as('REMOVE');

  let username;
  let password;

  const PASSWORD = 'Test12345%';
  switch (user) {
    case USER.AUTOMATIONINTERNAL:
      username = USER.AUTOMATIONINTERNAL;
      break;
    case USER.AUTOMATIONEXTERNAL:
      username = USER.AUTOMATIONEXTERNAL;
      break;
    case USER.WELLINGTON:
      username = USER.WELLINGTON;
      break;
    case USER.CALPERS:
      username = USER.CALPERS;
      break;
    case USER.RUSSELL:
      username = USER.RUSSELL;
      break;
    case USER.OPERS:
      username = USER.OPERS;
      break;
    case USER.ROBECO:
      username = USER.ROBECO;
      break;
    case USER.ROYALLONDON:
      username = USER.ROYALLONDON;
      break;
    case USER.CHARLESSCHWAB:
      username = USER.CHARLESSCHWAB;
      break;
    case USER.PUTNAM:
      username = USER.PUTNAM;
      break;
    case USER.IMF:
      username = USER.IMF;
      break;
    case USER.FEDERATED:
      username = USER.FEDERATED;
      break;
    case USER.NEUBERGER:
      username = USER.NEUBERGER;
      break;
    default:
      cy.log('User not found');
  }
  password = PASSWORD;

  cy.request('/')
    .its('body')
    .then((body) => {
      // we can use Cypress.$ to parse the string body
      // thus enabling us to query into it easily
      const $html = Cypress.$(body);
      const csrf = $html.find('input[name=csrf-token]').val();
      Cypress.env('csrfToken', csrf)

      cy.request({
        method: 'POST',
        url: '/Home/Authenticate/',

        headers: {
          CSRFToken: csrf,
        },

        body: {
          Username: username,
          Password: password,
        },
      }).then((resp) => {
        expect(resp.status).to.eq(200);
        const success = resp.body.Succeded;
        if (!success) {
          console.log(`Check console for details => User: ${username} ${JSON.stringify(resp.body)}`);
        }
        expect(success).to.be.true;
      });
    });
});

Cypress.Commands.add('deleteMyConfiguration', (reportToDelete) => {
  cy.contains('My configurations')
    .siblings()
    .find('span')
    .then((myConfig) => {
      cy.wrap(myConfig).each((value, index) => {
        const found = value.text();
        // It compares the existing file name with the ones available under My Configurations.
        if (found == reportToDelete) {
          cy.wrap(myConfig).eq(index).click();
          cy.contains('Delete').click();
          cy.get('.toast-message').should('contain.text', messages.toast.REPORT_DELETED);
        }
      });
    });
});

Cypress.Commands.add('getAutomationUserIDFromDB', (user) => {
  cy.executeQuery(`SELECT TOP 1 [UserID] FROM [GLP].[dbo].[UM_User] WHERE LoginID = '${user}'`).then((result) => {
    return result;
  });
});

Cypress.Commands.add('getAutomationUsernameFromDB', (user) => {
  cy.executeQuery(`SELECT UserFirstName + ' ' + UserLastName FROM[GLP].[dbo].[UM_User] where LoginID = '${user}'`).then(
    (result) => {
      return result;
    }
  );
});

Cypress.Commands.add('getCustomerIDFromDB', (user) => {
  cy.executeQuery(`SELECT CustomerID FROM [GLP].[dbo].[AA_Customer] where CustomerName = '${user}'`).then(
    (result) => {
      return result;
    }
  );
});

Cypress.Commands.add('logout', () => {
  cy.intercept('DELETE', '**/Home/RemoveDraftFilter/').as('RemoveDraft');
  cy.intercept('GET', '**/Home/Logout?type=UserLoggedOutButton&_=**').as('LoggedOut');

  cy.get('#logged-in-user').click();
  cy.contains('Log out').should('have.attr', 'href', '#Logout').click();

  cy.wait('@RemoveDraft');
  cy.wait('@LoggedOut');
});

Cypress.Commands.add('removeAllExistingSelectedCriteria', (isInternal) => {
  cy.intercept('POST', '**/Api/Data/WorkflowExpansion').as('WorkflowExpansion');
  cy.intercept('POST', '**/Api/Data/WorkflowSecuritiesWatchlists/').as('WorkflowSecuritiesWatchlists');
  cy.intercept('POST', '**/Api/Data/Assignee/GetAvailableAssigneesForCustomer').as('GetAvailableAssigneesForCustomer');

  cy.get('body').then(($body) => {
    if ($body.find('[class="remove"]').length > 0) {
      const len = $body.find('[class="remove"]').length;
      if (!isInternal) {
        for (let i = len; i >= 0; i--) {
          if (i > 2) {
            cy.get('[class="remove"]')
              .eq(i - 1)
              .click({ force: true });
            cy.wait('@WorkflowExpansion', {responseTimeout: 90000});
            cy.wait('@WorkflowSecuritiesWatchlists');
            cy.wait('@GetAvailableAssigneesForCustomer');
          }
        }
        cy.get('[class="remove"]').should('have.length', 2);
      } else {
        for (let i = len; i >= 0; i--) {
          if (i > 3) {
            cy.get('[class="remove"]').eq(i - 1).click({ force: true });
            cy.wait('@WorkflowExpansion', {responseTimeout: 90000});
            cy.wait('@WorkflowSecuritiesWatchlists');
          }
        }
        cy.get('[class="remove"]').should('have.length', 3);
      }
    }
  });
});

Cypress.Commands.add('AddMultipleCriteria', (searchText, isReporting) => {
  cy.intercept(
    'GET',
    '**/Api/WebUI//WorkflowFilterCriteriaEditors/ForField?fields=**&objectType=WorkflowExpansion&customerId=0&_=**'
  ).as('WorkflowFilter');
  cy.intercept('GET', '**//Api/WebUI/FilterCriteriaEditors/ForField?fields=**&objectType=**&customerId=0&_=**').as(
    'ReportFilter'
  );
  cy.intercept('GET', '**/Api/Data//ListService/**?CustomerID=0').as('ListService');

  cy.get('#btn-add-criteria').click({ scrollBehavior: false });
  searchText.forEach((value) => {
    cy.then(() => {
      cy.get('#txt-filter-criteria')
        .clear({ force: true })
        .type(value)
        .parent()
        .siblings()
        .children()
        .find('input[type="checkbox"]')
        .check({ force: true });
    });
  });

  cy.contains('Apply').click({ scrollBehavior: false });

  if (!isReporting) {
    cy.get('#filterPreferenceControl > div > #controls > div > div > h4:nth-child(n+2)').should('contain.text',searchText);
  } else {
    cy.wait('@ReportFilter');
    cy.get('#report-criteria-controls > div > div > h4').each((h4) => {
      expect(h4.text().trim()).to.be.oneOf(searchText);
    });
  }
});

Cypress.Commands.add('addCriteriaStatus', (statusToSearch, isReporting) => {
  cy.intercept('POST', '**/Api/Data/WorkflowExpansion').as('WorkflowExpansion');
  cy.intercept('POST', '**/Api/Data/WorkflowSecuritiesWatchlists/').as('WorkflowSecuritiesWatchlists');
  cy.intercept('POST', '**/Api/Data/Assignee/GetAvailableAssigneesForCustomer').as('GetAvailableAssigneesForCustomer');

  if (!isReporting) {
    cy.get('#filterPreferenceControl > div > #controls > div > div > h4:nth-child(n+2)').click({ force: true });
  } else {
    cy.get('#report-criteria-controls > div > div > h4').click({ force: true });
  }

  cy.get('.editor-modal').invoke('attr', 'style', 'display: block', { timeout: 1000 });

  statusToSearch.forEach((value) => {
    cy.get('.editor-modal > input').clear({ force: true }).type(value);
    cy.get('.editor-modal > div > div > label').contains(value).click({ force: true });
  });
  cy.get('.editor-modal > div > button').eq(0).click();

  if (!isReporting) {
    cy.wait('@WorkflowExpansion');
    cy.wait('@WorkflowSecuritiesWatchlists');
    cy.wait('@GetAvailableAssigneesForCustomer');
  }
});

Cypress.Commands.add('checkColumnFieldApplyAndVerifyIsChecked', (value) => {
  cy.get('#btn-workflow-config-columns').click();
  cy.get('#txt-filter-col-name').type(value);
  cy.get(`input[value='${value}']`).check({ force: true });
  cy.get(`input[value='${value}']`).should('be.checked');
  cy.get('#txt-filter-col-name').clear();
  cy.get('#btn-apply-configure-columns').click();
});

Cypress.Commands.add('uncheckColumnFieldApplyAndVerifyNotChecked', (value) => {
  cy.get('#btn-workflow-config-columns').click();
  cy.get('#txt-filter-col-name').type(value);
  cy.get(`input[value='${value}']`).uncheck({ force: true });
  cy.get(`input[value='${value}']`).should('not.be.checked');
  cy.get('#txt-filter-col-name').clear();
  cy.get('#btn-apply-configure-columns').click();
});

Cypress.Commands.add('RemoveCriteriaIfExists', (id, removeId) => {
  cy.get('body').then(($body) => {
    if ($body.find(id).length > 0) {
      cy.get(removeId).click();
    }
  });
});

Cypress.Commands.add('randomString', (length) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let result = ' ';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return cy.wrap(result);
});

Cypress.Commands.add('handleErrorModal', () => {
  cy.get('.app-wrapper').then(() => {
    cy.get('#vote-warnings-and-errors-modal').then(($header) => {
      if ($header.is(':visible')) {
        cy.get('div.row.clearfix.floatright > button.btn.primary.gray').click({ force: true });
      }
    });
  });
});

Cypress.Commands.add('selectValueFromCriteriaOption', (id, inputVal, object, updatebtn) => {
  cy.get(`${id}`).click({ scrollBehavior: false, force: true });
  cy.get(`input[${inputVal}='${object}']`).check({ scrollBehavior: false, force: true });
  cy.get(`${updatebtn}`).click({ scrollBehavior: false, force: true });
});

Cypress.Commands.add('AddCriteriaOption', (searchText, inputValue) => {
  cy.get('#btn-add-criteria').click({ scrollBehavior: false, force: true });
  cy.get('#txt-filter-criteria').type(searchText, { scrollBehavior: false });
  cy.get(`input[value='${inputValue}']`).check({ scrollBehavior: false, force: true });
  cy.contains('Apply').click({ scrollBehavior: false, force: true });
});

Cypress.Commands.add('parseXlsx', (inputFile) => {
  return cy.task('parseXlsx', { filePath: inputFile });
});

Cypress.Commands.add('selectReportType', (report) => {
  cy.get('#workflow-filter-list > div > ul > li').then(($rows) => {
    $rows.each((index, value) => {
      const input = report;
      const reportType = Cypress.$(value).find(`a > span`).text();
      if (reportType === input) {
        cy.log(reportType);
        cy.get(`#workflow-filter-list > div > ul > li:nth-child(${index + 1}) > a > span`).click();
        return false;
      }
    });
  });
});

Cypress.Commands.add('saveFilter', (filterName) => {
  cy.contains('Save As').click();
  cy.get('#popupTextContainer').should('be.visible').type(filterName);
  cy.get('#apprise-btn-undefined').should('be.visible'); //the ID of this button should be fixed
  cy.get('#apprise-btn-confirm').click();
});

Cypress.Commands.add('assertFileProperties', (configName, fileExtension) => {
  cy.get('#inbox-container [data-pagelink1]')
    .first()
    .invoke('attr', 'data-pagelink1')
    .should('contain', '/Downloads/DownloadExportFromUrl/?requestID=')
    .then((downloadLink) => {
      cy.request(downloadLink).then((resp) => {
        expect(resp.status).to.eq(200);
        expect(resp.headers)
          .to.have.property('content-disposition')
          .contains(`attachment; filename=${configName}.${fileExtension}`);
        if (fileExtension == 'pdf') {
          expect(resp.headers).to.have.property('content-type').eql('application/pdf');
        } else if (fileExtension == 'xls') {
          expect(resp.headers).to.have.property('content-type').eql('application/vnd.ms-excel');
        } else if (fileExtension == 'xlsx') {
          expect(resp.headers)
            .to.have.property('content-type')
            .eql('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        } else {
          expect(resp.headers).to.have.property('content-type').eql('text/csv');
        }
      });
    });
});

Cypress.Commands.add('downloadFileLocal', (report) => {
  cy.intercept('PUT', '**/Api/Data/Inbox/**').as('InboxReport');
  cy.intercept('GET', '**/Downloads/DownloadExportFromUrl/?requestID=**').as('DownloadReport');
  cy.intercept('GET', '**/Api/Data/Inbox/?Top=10&IsQueryOnly=false&_=**').as('LoadInbox');

  cy.get('#inbox-container .msg-txt').first().click();
  // The following two waits are for the API's triggered by the donwload
  cy.wait('@InboxReport');
  cy.wait('@DownloadReport');

  /* In some cases the notify-count click fails in the pipeline. I'm adding this click to ensure the modal is closed before opening again
   The only "common" option I found between all the reports is the report name. So if the parameter is sent then it will click in the 
   appropriate report. If not sent it will carry on with the normal flow
  */
  if (report) {
    cy.selectReportType(report);
  }

  cy.get('.notify-count').click();
  cy.wait('@LoadInbox');
});

Cypress.Commands.add('executeQuery', (query) => {
  // Execute the query only if a SELECT is sent as a parameter
  if (query.includes('SELECT')) {
    cy.sqlServer(query);
  } else {
    cy.log('Enter a valid query');
  }
});

Cypress.Commands.add('statusCode200', (param) => {
  cy.wait(param).its('response.statusCode').should('eq', 200);
});

Cypress.Commands.add('statusCode204', (param) => {
  cy.wait(param).its('response.statusCode').should('eq', 204);
});

Cypress.Commands.add('elementShouldNotExist', (element) => {
  cy.get(element).should('not.exist');
});

Cypress.Commands.add('clickIfExist', (element) => {
  cy.get('body').then((body) => {
    //Verify element exists
    if (body.find(element).length > 0) {
      cy.get(element).then($header => {
        //Verify element is visible
        if ($header.is(':visible')){
          cy.get(element).click();
        }
      })
    }
  })
});

Cypress.Commands.add('addControversyAlertFile', () => {
  cy.request({
    method: 'POST',
    url: 'https://microservices.aqua.dev.glasslewis.net/controversyalertsmanagement/api/v1/Controversy',
    body: controversyAlertJsonBody,
    failOnStatusCode: false
  }).then((response) => {
    (response.status === 200) ? cy.log('File Added!') : cy.log('File Exists!')
  });
});

//This will override the type command to have no delay, improving execution time
Cypress.Commands.overwrite('type', (originalFn, subject, text, options = {}) => {
  options.delay = options.delay || 0
  return originalFn(subject, text, options)
})