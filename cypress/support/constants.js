export const USER = {
  WELLINGTON: 'WellingtonAutomation@glasslewis.com',
  CALPERS: 'CalpersAutomation@glasslewis.com',
  RUSSELL: 'RussellAutomation@glasslewis.com',
  OPERS: 'OpersAutomation@glasslewis.com',
  ROBECO: 'RobecoAutomation@glasslewis.com',
  ROYALLONDON: 'RoyalLondonAutomation@glasslewis.com',
  CHARLESSCHWAB: 'CharlesSchwabAutomation@glasslewis.com',
  PUTNAM: 'PutnamAutomation@glasslewis.com',
  IMF: 'IFMAutomation@glasslewis.com',
  FEDERATED: 'FederatedAutomation@glasslewis.com',
  NEUBERGER: 'autoextadmin_neuberger@glasslewis.com',
  AUTOMATIONINTERNAL: 'automation@glasslewis.com',
  AUTOMATIONEXTERNAL: 'automation_calpers@glasslewis.com',
  PADDYINTERNAL: 'pcorcoran@glasslewis.com',
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
  },
};

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
  NBCOMMO_CTRLNUM2: '8193294880360709',
  NBCOMMO_CTRLNUM3: '8193294880595329',

  WLNCVTD: '1062764', // Charles Schwab - Non Contested - Voted
  WLNCVTD_CTRLNUM: '4000153399354', // Charles Schwab - Non Contested - Voted

  RLNCDRP: '1057618', //Russell - Non Contested -  Recommendations Pending

  RBNCRP: '1058810', //Robeco - Non Contested -  Recommendations Pending
  RBNCAG: '1061320',
  //Calpers
  CANCRA: '1066065',

  //Russell (at least one against policy past 30 days)
  RSNCVAP: '1061109',

  //Basic Recommendations pending meeting for Calpers
  CPRP1: '1066197',
  CPRP2: '1065713',
  CPRP3: '1063534',
  CPRP5: '1066044',

  //Calpers Recommendations Pending (US meeting)
  CPRP4: '1057963'
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
    FILTER_CRITERIA_FOR_FIELDS:
      '**/Api/WebUI//WorkflowFilterCriteriaEditors/ForField?fields=**&objectType=WorkflowExpansion&customerId=**&_=**',
    LIST_SERVICE: '**/Api/Data//ListService/PolicyID?CustomerID=**',
  },
  PUT: {
    BALLOT_GRID_STATE: '**/Api/Data/BallotsGridState',
  },
};
