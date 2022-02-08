/*
As a user I should be able to see a detailed engagement form to log my engagements
SCENARIO: Create an Engagement for non Australian Customer/GIB/RLAM
GIVEN user wants to log an engagement with the company
WHEN user clicks on Company Name in Meeting Details page
AND goes to Engagement Section
AND clicks Add Engagement
THEN the new form with fields Participants, Title, Notes, Themes, Date of Engagement, Type, Other Participants should display
  
SCENARIO: Add an Engagement for non Australian Customer/GIB/RLAM
GIVEN user wants to log an engagement with the company
WHEN user fills out the Engagement Form in Company Page
AND clicks on Add
THEN engagement should be created
And user should be able to see the engagement under Engagement Section
*/

import { messages } from '../../support/constants';

const deleteEngagementsButton = '#grid-results-body > tr > td:nth-child(10) > a.k-button.k-button-icontext.k-grid-confirm-delete';
const report = messages.reports;
const toast = messages.toast;
const testCompany = {
    name: '',
    meetingID: 1084246
    }
const engagementParticipant = {
    participant: '',
    title: '',
    notes: ''
}


// https://dev.azure.com/glasslewis/Development/_workitems/edit/43678
describe('',function(){

    beforeEach(function(){
        cy.loginExtAdm('External');
    })
    
    it('Create an Engagement for non Australian Customer/GIB/RLAM',function(){

    })

    it('Add an Engagement for non Australian Customer/GIB/RLAM',function(){

    })

// Common functions


})