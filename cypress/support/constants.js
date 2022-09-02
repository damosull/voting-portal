export const USER = {
  AUTOMATIONINTERNAL: 'automation@glasslewis.com',
  AUTOMATIONEXTERNAL: 'automation_calpers@glasslewis.com',
  CALPERS_SAGAR: 'smaheshwari_calpers@glasslewis.com',
  CALPERS: 'CalpersAutomation@glasslewis.com',
  CHARLESSCHWAB: 'CharlesSchwabAutomation@glasslewis.com',
  FEDERATED: 'FederatedAutomation@glasslewis.com',
  IMF: 'IFMAutomation@glasslewis.com',
  NEUBERGER: 'neuberger@glasslewis.com',
  OPERS: 'OpersAutomation@glasslewis.com',
  PUTNAM: 'PutnamAutomation@glasslewis.com',
  ROBECO: 'RobecoAutomation@glasslewis.com',
  ROYALLONDON: 'RoyalLondonAutomation@glasslewis.com',
  RUSSELL: 'RussellAutomation@glasslewis.com',
  WELLINGTON: 'WellingtonAutomation@glasslewis.com',
};

export const PASSWORD = 'Test12345%'

export const TESTUSER = {
  FIRSNAME: "Test",
  LASTNAME: "User",
  CONTACTEMAIL: "testuserforusercreation@test.com",
  TYPE: "External",
  CUSTOMERNAME: "California Public Employee Retirement System (CalPERS)",
  ROLE: "User"
};

export const messages = {
  reports: {
    READY: 'report is ready for download',
  },
  toast: {
    DOWNLOAD_STARTED: 'Your download was initiated. It will appear in the toolbar shortly.',
    REVIEW_FIELDS: 'Please review the fields selection, there are invalid fields',
    REPORT_SAVED: 'Report Saved',
    REPORT_DELETED: 'Report configuration deleted.',
    FILTER_CREATED: 'Filter created successfully',
    FILTER_DELETED: 'Filter deleted',
    EXPORT_INITIATED: 'Your export was initiated. It will appear in the toolbar shortly.',
    SUBSCRIPTION_ADDED: 'Subscription added',
    SUBSCRIPTION_DELETED: 'Subscription deleted',
    SHARE_MEETING_REQUEST_SAVED: 'Share meeting request saved',
    ENGAGEMENT_ADDED: 'Engagement added',
    ENGAGEMENT_DELETED: 'Engagement Deleted',
    USER_CREATED_SUCCESSFULLY: 'User created successfully',
    CUSTOMER_SETTINGS_UPDATED: 'Customer settings updated',
    COMMENT_WITH_ATTACHMENT_SAVED: 'Comment saved with attachment',
    COMMENT_SAVED: 'Comment saved',
    COMMENT_WITH_ATTACHMENT_UPDATED: 'Attachment updated',
    COMMENT_UPDATED: 'Comment updated!',
    COMMENT_WITH_ATTACHMENT_DELETED: 'Attachment deleted.',
    COMMENT_DELETED: 'Comment deleted!',
    COMMENT_SELECT_ATLEAST_ONE_USER: 'You must selet at least one user.',
    COMMENT_SUBMIT_WITHOUT_DATA: 'Please enter a comment, mention a @user..',
    COMMENT_TOO_LONG: 'Comment is too long.'
  },
};

export const glassAPI = 'https://aqua-issuer-vote-confirmation-api.azurewebsites.net/api/Ballot'

export const MEETINGID = {
  // first 2 chars = company (NB = Neuberger)
  // second 2 chars = meeting type - Contested = CO,RA = Recommendations Available,RP Recommendations Pending
  // additional chars  = Agenda (M = Management,O = Opposition) MMO = 2 management agendas,one Opposition
  // AG has Account Group associated

  NBCOMMO: '982955',
  NBCOMMO_AGENDA1: '935288666',
  NBCOMMO_AGENDA2: '935279833',
  NBCOMMO_AGENDA3: '935281206',
  NBCOMMO_CTRLNUM1: '8193294880136089',

  WLNCVTD: '1062764', // Charles Schwab - Non Contested - Voted
  WLNCVTD_CTRLNUM: '4000153399354', // Charles Schwab - Non Contested - Voted

  RLNCDRP: '1057618', //Russell - Non Contested -  Recommendations Pending
  RBNCRP: '1058810', //Robeco - Non Contested -  Recommendations Pending
  RBVOAC: '1134546', //Robeco Voted with 2 values for Decision Status
  RBVOAG: '1135872', //Robeco Voted with >1 Account Groups

  //Calpers
  CANCRA: '1066065',
  CAVOAS: '1129879', //Calpers Voted
  CAVOCA: '1120004', //Calpers Meeting with Controversy Alert File
  CAIO: '1135360', //Calpers Meeting with Decision Status as Info Only

  //Russell (at least one against management & policy past 30 days)
  RSNCVAMAP: '1016711',

  //Russell (at least one against policy past 30 days)
  RSNCVAP: '1061109',
  RSNCVAP2: '981568',

  //Russell (at least one against management past 30 days)
  RSNCVAM1: '1068747',
  RSNCVAM2: '1070063',

  //Basic Recommendations pending meeting for Calpers
  CPRP1: '1066197',
  CPRP2: '1065713',
  CPRP3: '1063534',
  CPRP5: '1066044',
  CPRP6: '1066180',

  //Calpers Recommendations Pending (US meeting)
  CPRP4: '1057963',
};

export const testWatchlistName = 'Watchlist_Assignment_tests'

export const API = {
  POST: {
    ACCOUNTS_NEW: '**/Api/Data/AccountsNew/**',
    ADD: '**/Api/Data/BallotVoteData/Add',
    AVA_CRITERIA: '**/Api/WebUI//ReportsCriteria/ForCriterias?&objectType=AVAReport',
    BALLOT_CRITERIA: '**/Api/WebUI//ReportsCriteria/ForCriterias?&objectType=BallotVoteData',
    CREATE_DRAFT_FILTER: '**/Api/Data/Filters/CreateDraftFilter',
    CRITERIA_ENGAGEMENT: '**/Api/WebUI//ReportsCriteria/ForCriterias?&objectType=Engagement',
    DOCUMENTS_DATA: '/Api/Data/DocumentsData',
    FILE_ADD: '**/Api/Data/Policy/Add',
    GET_AVAILABLE_ASSIGNEES_CUSTOMER: '**/Api/Data/Assignee/GetAvailableAssigneesForCustomer',
    GET_STATUS: '**Api/Data//SubscribeToMeeting/GetStatus',
    GET_AGENDA: '**/Api/Data//MdData/GetAgenda',
    LOGGER: '/api/Logger/**',
    MEETING_DETAILS: '**/Api/Data/MeetingDetailsActivity/',
    MEETING_DETAILS_ACTIVITY: '**/Api/Data/MeetingDetailsActivity/**',
    VOTE_TALLY: '**/Api/Data/VoteTally',
    VOTE_TALLY_OWNERSHIP: '**/Api/Data/VoteTallyOwnership**',
    VOTE_RESULTS: '**/Api/Data/MdVoteResults',
    SHARE_MEETING_MODAL: '**/ShareMeeting/AddShareMeetingModal/',
    POST_CUSTOMER_DYNAMIC: '/Api/Data/CustomerDynamic',
    PROXY_VOTING: '**/Api/WebUI//ReportsCriteria/ForCriterias?&objectType=ProxyVoting',
    REPORTS_CRITERIA: '**/Api/WebUI//ReportsCriteria/ForCriterias?&objectType=BallotReconciliation',
    VOTE_REQUEST_VALIDATION: '**/Api/Data/VoteRequestValidation',
    WORKFLOW_EXPANSION: '**/Api/Data/WorkflowExpansion',
    WORKFLOW_SECURITIES_WATCHLIST: '**/Api/Data/WorkflowSecuritiesWatchlists',
    POST_USER_LISTS: '**/Api/Data/UsersLists/**',
    POST_CUSTODIAN_LIST: '**/Api/Data/CustodianList/**',
    SEARCH_BALLOTS_WITH_SIMILAR_AGENDAS: '**/Api/Data/SearchBallotsWithSimilarAgendas**'
  },
  GET: {
    ACCOUNTS_GRID_STATE: '**/Api/Data/AccountsGridState/**',
    ACTIVE_FLAG: '**/Api/Data/CustomFieldCRUDWithFilterCheck/SetFieldActiveFlag**',
    AVA_REPORT: '**/Api/Data/AVA/?PageInfo%5BIgnorePagesize%5D=true&ReportType=AVA&_=**',
    ASSIGNED_MEETING_ID: '**/Api/Data/Assignee/?MeetingIDs%5B%5D=**',
    BALLOT_ACTIVITY_LOG: '**/Api/Data/BallotActivityLog/?BallotID=**',
    BALLOT_RECONCILIATION: '**/Api/Data/BallotReconciliation/**',
    BALLOT_VOTE: '**/Api/Data/BallotVoteData/?PageInfo%5BIgnorePagesize%5D=true&ReportType=BallotVoteData&_=**',
    BALLOTS_GRID_STATE: '**/Api/Data/BallotsGridState/?_=**',
    COMMENTS: '**/Api/Data/Comments/**',
    COMMENTS_IDENTITY_SEARCH: '**/Api/Data/CommentsIdentitySearch/**',
    CUSTODIAN_GRID_STATE: '**/Api/Data/CustodianGridState//?_=**',
    CURRENT_USER: '**/Api/Data/CurrentUser/**',
    CUSTOM_FIELDS: '**/Api/Data/CustomFields/?customerId=0&_=**',
    CUSTOM_FIELDS_2: '**/Api/Data/CustomFields/GetDetails?fieldId=**',
    CUSTOMER_DETAILS: '**/Api/Data/CustomerDetails/**',
    CUSTOMER_NAME_SPECIAL: '**/CompanyNameSpecial/**',
    CUSTOMER_SEARCH: '**/Api/Data/CustomerSearch/**',
    DATA: '**/Api/Data/**',
    DATE_RANGE: '**/Api/WebUIRes/?path=/Scripts/EditorControls/DateRange/DateRange**',
    DATE_RANGE_KNOCKOUT_BINDINGS: '**/Api/WebUIRes/?path=/Scripts/EditorControls/DateRange/dateRangeKnockoutBindings**',
    DASHBOARD: '**/Api/Data/Dashboard/**',
    DASHBOARD_DETAILS: '**/Api/Data/DashboardDetails/**',
    DASHBOARD_FILTER_DETAILS: '**/Api/Data/DashboardFilterDetails**',
    DASHBOARD_FILTERS: '**/Api/Data/DashboardFilters**',
    DASHBOARD_MARKUP: '**/Dashboard/GetMarkup**',
    DASHBOARD_SETTINGS: '**/Api/Data/DashboardSettings/**',
    DASHBOARD_SUBSCRIPTION: '**/Api/Data/DashboardSubscription/**',
    DASHBOARD_PERMISSIONS: '**/Api/Data/DashboardPermissions/?_=**',
    ENGAGEMENT: '**/Engagement/?PageInfo%5BIgnorePagesize%5D=true&ReportType=Engagement&_=**',
    ESG_RANKINGS_FIELDS: '**/Api/Data/EsgRankingsFields**',
    FILTER_CRITERIA_EDITORS: '**/Api/WebUI/FilterCriteriaEditors**',
    FILTER_PREFERENCE: '**/Api/Data/FilterPreference/**',
    FILTER_TO_SHARE: '**/Api/Data/FilterPreference/SharedUsers/?FilterToShareID=**',
    FILTERS: '**/Api/Data/Filters/**',
    FILTERS_DIRECTORY: '**/Api/Data/FiltersDirectories**',
    GET_ACCOUNT_FILTERS_BY_SCREEN_ID: '**/Api/Data/Accounts//GetAccountFiltersByScreenID**',
    GET_AUTHENTICATED_USER: '**/Api/WebUI/Users/GetAuthenticatedUser**',
    GET_BY_ID: '**/Api/Data/Filters/GetByID?Id=**',
    GET_CURRENT_USER_COLLEAGUES: '**/Api/Data/UsersForCustomer/GetCurrentUsercolleagues**',
    GET_CUSTODIAN_SCREEN_FILTERS: '**/Api/Data/CustodianList//**',
    GET_CUSTOMER_DYNAMIC: '/Api/Data/CustomerDynamic/**',
    GET_CUSTOMER_SCREEN_FILTERS: '**/Api/Data/CustomerDynamic//GetCustomerScreenFilters?&ScreenID=2&_=**',
    GET_CUSTOMER_SETTINGS: '**/Api/Data/MdPermissions/GetCustomerSettings?CustomerID=**',
    GET_FILINGS: '**/Api/Data/MeetingMaterials/GetFilings?MeetingId=**',
    GET_FOR_USER: '**/Api/Data/Filters/GetForUser?_=**',
    GET_MARKUP: '**/Workflow/GetMarkup?_=**',
    GET_MARKUP_MEETING_DETAILS: '**/MeetingDetails/GetMarkup/**',
    GET_MEETING_ID: '**/Api/Data/MdData/GetAFD?MeetingId=**',
    GET_MARKUP_WORKFLOW: '**/Workflow/GetMarkup**',
    GET_USER_LIST: '**/Api/WebUI/Users/GetUsersList?_=**',
    GET_USER_PERMISSION: '**/Api/Data//MdPermissions/GetUserPermissions**',
    GET_POLICY: '**/Api/Data/Policy/GetById/**',
    GL_BLOG_DATA: '**/Api/Data/GLBlogData**',
    IDENTITY_SEARCH: '**/Api/Data/ShareMeetingIdentitySearch/**',
    INBOX: '**/Api/Data/Inbox/**',
    LIST_SERVICE: '/Api/Data//ListService/**',
    LIST_SERVICE_ACCOUNT_STATUS_CODE: '**/Api/Data//ListService/AccountStatusCode?CustomerID=**',
    LIST_SERVICE_POLICY_ID: '**/Api/Data/ListService/PolicyId**',
    LIST_SERVICE_STATUS_CODE: '**/Api/Data//ListService/StatusCode?CustomerID=**',
    LIST_SERVICE_VP_ONLY_WATCHLIST: '**/Api/Data/ListService/VpOnlyWatchlists?_=**',
    LOAD_INBOX: '**/Api/Data/Inbox/?Top=10&IsQueryOnly=false&_=**',
    MANAGE_FILTERS: '**/ManageFilters',
    MEETING_MATERIALS: '**/Api/Data/MeetingMaterials/**',
    MEETING_SECURITY_WATCHLIST: '**/Api/Data/MeetingSecurityWatchlists/**',
    META_BALLOTS_GRID: '**/Api/Data/MetaData/?typeName=BallotsGrid&customerId=**',
    PAGE_SECTION_ORDER: '**/Api/Data/PageSectionOrder?Page=1&_=**',
    PASSWORD_VALIDATOR_SETUP: '**/Api/Data//PasswordValidatorSetup/**',
    PERMISSIONS: '**/Api/Data/Permissions/**',
    POLICY: '**/Api/Data/Policy/**',
    POSHYTIP: '**/Scripts/jquery.poshytip.js?_=**',
    POSHYTIP_EDITABLE: '**/Scripts/jquery-editable-poshytip.min.js?_=**',
    RANGE_SLIDER: '**/Scripts/EditorControls/Common/RangeSlider**',
    RATIONALE_LIBRARY: '**/Api/Data/RationaleLibrary/**',
    RELATED_MEETINGS: '**/Api/Data/RelatedMeetings/?QueryValue=**',
    REPORT_TYPE: '**/Api/Data/Inbox/?Top=0&IsNew=true&IsQueryOnly=true&**',
    REPORTS_DEFAULT_DATA: '**/Api/Data/ReportsDefaultData/**',
    SEARCH_TOOLBAR: '**/Api/WebUI//Securities/SearchToolbar?_=**',
    SETTINGS_READ: '**/Api/Data/SettingsRead/?name=MdBallotsGrid&_=**',
    SHARE_MEETING_LISTS: '**/Api/Data//ShareMeetingLists/**',
    SUBSCRIPTIONS: '**/Api/WebUI/Subscriptions/**',
    SUBSCRIPTION_FILTER: '**/Api/Data/Subscription/?FilterId=**',
    SUSTAIN_ANALYTICS: '**/Scripts/EditorControls/Sustainalytics/**',
    SPA: '**/Api/Data//Spa**',
    TOOLBAR_SEARCH: '**/Api/Data/ToolbarSearch/**',
    USER_CREATOR_PERMISSIONS: '**/Api/Data/UserCreatorPermissions/**',
    USER_PROFILE_HTML: '**/Api/WebUI/Users/UserProfileHtml?_=**',
    USER_SCREEN_FILTERS: '**/Api/Data/UserScreenFilters/**',
    USER_VIEW_MODEL_VALIDATION_RULES: '**/Api/Data/UserViewModelValidationRules/?_=**',
    VOTE_AGAINST_POLICY_WL: '**/Api/Data/VoteAgainstPolicyWL/Get?customerId=0&_=**',
    VOTE_CARD: '**/Api/Data/MetaData/?typeName=VoteCard&customerId=0&_=**',
    VOTE_CARD_GRID_STATE: '**/Api/Data/VoteCardGridState/?_=**',
    WATCHLIST: '**/Api/Data/Watchlist/**',
    WATCHLIST_SECURITIES: '**/Api/Data/WatchlistSecurities/**',
    WATCHLIST_IDENTITY_SEARCH: '**/Api/Data/WatchlistIdentitySearch/**',
    WEBUIRES_COMPANY_NAME_SPECIAL: '**/Api/WebUIRes/?path=/Scripts/EditorControls/CompanyNameSpecial/CustomerSpecial.js&_=**',
    WEBUIRES_MULTI_SELECT_STATIC: '**/Api/WebUIRes/?path=/Scripts/EditorControls/MultiSelectStatic/MultiSelectStatic.js&_=**',
    WEBUIRES_USER_SPECIAL: '**/Api/WebUIRes/?path=/Scripts/EditorControls//UserSpecial/UserSpecial.js&_=**',
    WIDGET_META: '**/Api/Data/WidgetMeta/**',
    WORKFLOW_CONFIGURE_COLUMNS: '**/Api/WebUI//Workflow/WorkflowConfigureColumns**',
    WORKFLOW_CONFIGURE_COLUMNS_WITH_NO_SEARCH: '**/Api/WebUI//Workflow/WorkflowConfigureColumnsWithNoSearch**',
    WORKFLOW_FILTER_CRITERIA_EDITORS: '**/Api/WebUI/WorkflowFilterCriteriaEditors**',
    WORKFLOW_META_DATA: '**/Api/Data/WorkflowMetaData/**',
    WORKFLOW_META_DATA_1: '**/Api/Data/WorkflowMetaData/?typeName=WorkflowExpansion&customerId**',
    WORKFLOW_META_DATA_2: '**/Api/Data/WorkflowMetaData/?typeName=WorkflowExpansion&showDenied=true&customerId**',
    WORKFLOW_WIDGET_DATA: '**/Api/Data/WorkflowWidgetData**',
    WORKFLOW_RESEARCH_INFO: '**/Api/Data/WorkflowResearchInfo/GetWFResearch?CustomerID=0&_=**',
  },
  PUT: {
    BALLOT_GRID_STATE: '**/Api/Data/BallotsGridState',
    CUSTOMER_FORMATS: '**/Api/Data/CustomerFormats',
    PUT_BALLOTS_GRID_STATE: '**/Api/Data/BallotsGridState/**',
  },
  DELETE: {
    REMOVE: '**/Api/Data/Policy/**',
    FILTER_DELETED: '**/Api/Data/WorkflowFilters/**?isConfirmed=false'
  },
  SCRIPT: {
    POSHYTIP: '**/Scripts/jquery.poshytip.js?_=**',
    EDITABLE_POSHYTIP: '**/Scripts/jquery-editable-poshytip.min.js?_=**'
  }
};