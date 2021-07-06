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
  },
};

export const API = {
  POST: {
    WORKFLOW_EXPANSION: '**/Api/Data/WorkflowExpansion',
    WORKFLOW_SECURITIES_WATCHLIST: '**/Api/Data/WorkflowSecuritiesWatchlists',
    AVAILABLE_ASSIGNEES_CUSTOMER: '**/Api/Data/Assignee/GetAvailableAssigneesForCustomer',
    GET_STATUS: '**Api/Data//SubscribeToMeeting/GetStatus',
    GET_AGENDA: '**/Api/Data//MdData/GetAgenda',
    VOTE_TALLY: '**/Api/Data/VoteTally',
    MEETING_DETAILS: '**/Api/Data/MeetingDetailsActivity/',
  },
  GET: {
    BALLOT_RECONCILIATION: '**/Api/Data/BallotReconciliation/**',
    GET_USER_PERMISSIONS: '**/Api/Data//MdPermissions/GetUserPermissions?_=**',
    GET_FOR_USER: '**/Api/Data/Filters/GetForUser?_=**',
    WORKFLOW_CONFIGURE_COLUMNS: '**/Api/WebUI//Workflow/WorkflowConfigureColumns?_=**',
    FILTERS_DIRECTORY: '**/Api/Data/FiltersDirectories?_=**',
    GET_MARKUP: '**/Workflow/GetMarkup?_=**',
    WORKLOW_FILTER_CRITERIA_EDITORS:
      '**/Api/WebUI/WorkflowFilterCriteriaEditors?filterPreferenceID=1&objectType=WorkflowExpansion&customerId=0&_=**',
    GET_MEETING_ID:
      '**/Api/Data/MdData/GetAFD?MeetingId=**&AccountIds%5B%5D=-1&AgendaId=0&isContested=false&CustomerId=0&_=**',
    WORKFLOW_RESEARCH_INFO: '**/Api/Data/WorkflowResearchInfo/GetWFResearch?CustomerID=0&_=**',
    RELATED_MEETINGS: '**/Api/Data/RelatedMeetings/?QueryValue=**',
    PAGE_SECTION_ORDER: '**/Api/Data/PageSectionOrder?Page=1&_=**',
    MEETING_SECURITY_WATCHLIST: '**/Api/Data/MeetingSecurityWatchlists/?MeetingIDs%5B%5D=**',
    ASSIGNED_MEETING_ID: '**/Api/Data/Assignee/?MeetingIDs%5B%5D=**',
    GET_FILINGS: '**/Api/Data/MeetingMaterials/GetFilings?MeetingId=**',
    BALLOT_ACTIVITY_LOG: '**/Api/Data/BallotActivityLog/?BallotID=**',
  },
};
