import { messages } from '../../support/constants';

const deleteEngagementsButton = '#grid-results-body > tr > td:nth-child(10) > a.k-button.k-button-icontext.k-grid-confirm-delete';
const report = messages.reports;
const toast = messages.toast;
const testCompany = {
    name: 'Aurobindo Pharma Ltd.',
    meetingID: 1084246
    }
const engagementParticipant = {
    participant: 'CalPERS',
    title: 'Test',
    notes: 'Test'
}

// https://dev.azure.com/glasslewis/Development/_workitems/edit/43662
describe('Rename Interactions to Engagement',function (){

    beforeEach(function(){
        cy.loginExtAdm('External');
    });

    it('Scenario 2 - Engagement in Reporting',function(){
        
        // Tear up - Add engagement to the company
        visitTheTestCompany();
        clickOnTheCompanyName();
        engagementsButtonIsAvailable();
        clickOnAddEngagementButton();
        thereIsNoGivenReference(); // It covers the scenario 1
        addengagementParticipant(
            engagementParticipant.participant,
            engagementParticipant.title,
            engagementParticipant.notes
            );
        toastMessageAppears(toast.ENGAGEMENT_ADDED); 

        // Checking reports      
        cy.visit('/Reporting');
        addCustomColumnToReport('Creation Date');
        downloadReport();
        toastMessageAppears(toast.DOWNLOAD_STARTED); 
        clickOnNotificationWindow();
        waitingForReportCreation();
        checkReportHeaders();
        
        // Tear down - Delete Engagement
        visitTheTestCompany();
        clickOnTheCompanyName();
        deleteEngagement();
        toastMessageAppears(toast.ENGAGEMENT_DELETED);     

    });


    // Common functions

    function visitTheTestCompany(){
        cy.visit('MeetingDetails/Index/' + testCompany.meetingID);
    }  
    
    function clickOnTheCompanyName(){
        cy.get('#md-issuer-name').click();
    };

    function engagementsButtonIsAvailable(){
        cy.get('#anchor-interactions').click();
    }

    function thereIsNoGivenReference(){
        cy.get(deleteEngagementsButton).should('not.exist');
    }

    function clickOnAddEngagementButton(){
        cy.contains('Add Engagement').click();
    }

    function addengagementParticipant(participant,title,notes){
        cy.get('#participants-multi-select_taglist + input').type(participant);
        cy.get('#participants-multi-select_listbox > li').eq(0).click({ force: true });
        cy.get('[name=InteractionSubject]').type(title);
        cy.get('[name=InteractionDescription]').type(notes);
        cy.get('#modal-custom-fields-buttons > a.k-button.k-button-icontext.k-grid-update').click();
    }
    
    function toastMessageAppears(toastMessage) {
        cy.get('.toast-message').should('contain.text', toastMessage);    
    }

    function addCustomColumnToReport(columnName) {
        cy.contains('Engagement').click();
        cy.get('#rpt-columns > div > h3').click({ force: true });
        cy.get('#ava-config-columns-search').click().type('Creation Date');
        cy.get('#rpt-available-columns > div.scrollableContainer > table > tbody > tr > td.report-column-ccb > div > label').click({ force: true });
        cy.get('#rpt-columns > div > div > div > div.btn-container.clearfix > button.darkgrey.small').click();
    }

    function downloadReport() {
        cy.get('#rpt-download-btn').click();
    }

    function clickOnNotificationWindow() {
        cy.get('#notification-window').click();
    }

    function waitingForReportCreation(){
        cy.get('#inbox-container .msg-txt').should(($msg) => {
            expect($msg.first().text()).to.include(`New Configuration.csv ${report.READY}`);
        });
    }

    function checkReportHeaders(){
        cy.get('#inbox-container [data-pagelink1]')
            .first()
            .invoke('attr', 'data-pagelink1')
            .should('contain', '/Downloads/DownloadExportFromUrl/?requestID=')
            .then((downloadLink) => {
                cy.request(downloadLink).then((resp) => {
                    expect(resp.status).to.eq(200);
                    expect(resp.headers)
                        .to.have.property('content-disposition')
                        .contains(`attachment; filename=-New-Configuration.csv`);
                    expect(resp.headers).to.have.property('content-type').eql('text/csv');
                    expect(resp.body).include(
                        'Company Name,Created Date'
                );
            });
        });    
    }

    function deleteEngagement() {
        cy.get(deleteEngagementsButton).click();
        cy.get('#apprise-btn-confirm').click({force : true})
    }
})