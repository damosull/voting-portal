class workflowPageItems{
    
    launchBallotsButtonID = "#launch-ballots-voted-modal";
    voteNowbuttonID = '#btn-vote-now';
    takeNoActionButtonID = '#btn-take-no-action';
    instructButtonID = '#btn-instruct';
    unlockButtonID = '#btn-unlock';
    votedBallotsSelector = '[data-bind="visible: override.votedBallotsBoxVisible"] > .ccb';
    takeNoActionBallotsSelector = '[data-bind="visible: override.tnaBallotsBoxVisible"] > .ccb';
    proceedButtonSelector = '.floatright > .green';
    quickVoteDropdownSelector = '#quick-vote-container > span > span';
    quickVoteSelectID = '#quickVoteSelect';
    workflowMenuButtonID = '#workflow-link';

    constructor() {
    }

    launchBallotsButton() {
        return cy.get(this.launchBallotsButtonID).should('be.visible');
    }
    voteNowButton() {
        return cy.get(this.voteNowbuttonID).should('be.visible');
    }
    takeNoActionButton() {
        return cy.get(this.takeNoActionButtonID).should('be.visible');
    }
    instructButton() {
        return cy.get(this.instructButtonID).should('be.visible');
    }
    unlockButton() {
        return cy.get(this.unlockButtonID).should('be.visible');
    }
    votedBallots() {
        return cy.get(this.votedBallotsSelector).should('be.visible');
    }
    proceedButton() {
        return cy.get(this.proceedButtonSelector).should('be.visible');
    }
    quickVoteDropdown() {
        return cy.get(this.quickVoteDropdownSelector);
    }
    quickVoteSelect() {
        return cy.get(this.quickVoteSelectID);
    }
    takeNoActionBallots() {
        return cy.get(this.takeNoActionBallotsSelector).should('be.visible');
    }
    workflowMenuButton() {
        return cy.get(this.workflowMenuButtonID).should('be.visible');
    }
}

export default workflowPageItems;