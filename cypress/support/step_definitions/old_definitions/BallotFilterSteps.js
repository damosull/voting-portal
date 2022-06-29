import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps'
const constants = require("../../constants")
let arrAPIPolicy, arrUIPolicy = []


And('I click on upcoming meetings', () => {
  cy.contains('Upcoming Meetings').click()
})

And('I clear the existing filter criteria', () => {
  cy.removeAllExistingSelectedCriteria()
})

When('I go to a meeting with 2 or more values', () => {
  // Go through the list of meetings and click in the first occurrence of one with 2 or more values
  cy.get('table > tbody > tr > td:nth-child(4)').each(($list, index) => {
    const strValue = $list.text()
    if (strValue.includes('values')) {
      cy.get('table > tbody > tr > td:nth-child(2)').find('a').eq(index).click()
      return false
    }
  })

  cy.wait('@GET_MEETING_ID')
  cy.wait('@RELATED_MEETINGS')
})

Then('I verify that the ballots section are showing only the policies filtered by the user', () => {
  // Store the policies returned by the API
  cy.wait('@GET_AGENDA').then((xhr) => {
    arrAPIPolicy = xhr.response.body.AgendaVotes[0].PolicyIds
    arrAPIPolicy.sort()
    cy.wrap(arrAPIPolicy).as('arrAPIPolicy')
  })
  cy.wait('@PAGE_SECTION_ORDER')
  cy.wait('@VOTE_TALLY')

  // Click on Filters: Policy
  cy.get(':nth-child(2) > .darkgrey').click()
  cy.get('#add-policy-target').invoke('attr', 'style', 'display: block')

  // Traverse the Policy filter dropdownn and push the values available into an array
  cy.get('#meeting-detail-policy > li').each(($filter, index) => {
    arrUIPolicy.push($filter.text().trim())

    if ($filter.length == index) {
      cy.get('@arrAPIPolicy').then((arrAPIPolicy) => {
        arrUIPolicy.sort()
        // Compare the list of policies returned by the API with the list of policies available in the UI
        expect(arrAPIPolicy).to.deep.equal(arrUIPolicy)
      })
    }

    // Click on "Select all" when running for the first time to uncheck all the options
    if (index == 0) {
      cy.get($filter).should('have.class', 'checked')
      cy.get('[for="vc-filter-selectall-policy"]').click({ force: true })
      cy.get($filter).should('not.have.class', 'checked')
    }

    // Code to uncheck the last policy selected
    if (index >= 1) {
      cy.get(':nth-child(2) > .darkgrey').click()
      cy.get('#add-policy-target').invoke('attr', 'style', 'display: block')
      cy.get('#meeting-detail-policy > li > div > label')
        .eq(index - index)
        .click({ force: true })
    }

    // It selects one option at a time in the Policy filter dropdown
    cy.get('#meeting-detail-policy > li > div > label').eq(index).click({ force: true })
    cy.get('#add-policy-target > div button.btn-update').click({ force: true })

    cy.wait('@MEETING_DETAILS')
    cy.wait('@GET_AGENDA')
    cy.wait('@GET_FILINGS')
    cy.wait('@WORKFLOW_RESEARCH_INFO')
    cy.wait('@VOTE_TALLY')

    // It gets the size of the list
    cy.get('#ballots-grid > div > div > table > thead > tr > th > a').then((size) => {
      cy.wrap(size.length).as('len')
    })

    cy.get('@len').then((len) => {
      cy.get('#ballots-grid > div > div > table > thead > tr > th').each(($columns, index) => {
        // "Recursive" code to add the Policy ID to the list if it's not displayed by default
        if ($columns.text().trim() != 'Policy ID') {
          if (index + 1 == len) {
            cy.get('#btn-mdballots-details-config-columns').click()
            cy.get('#ballots-configure-columns-target').invoke('attr', 'style', 'display: block')

            cy.get('.company-name-search > input').last().type('Policy ID')
            cy.get('[data-js="md-ballots-section"]').find('#mytable > ul > li > div > input').check({ force: true })
            cy.get('#configure-columns-modal > button.secondary.blue').eq(1).click()
            cy.wait('@BALLOT_GRID_STATE')

            cy.get('#ballots-grid > div > div > table > thead > tr > th').each(($columns, index) => {
              if ($columns.text().trim() == 'Policy ID') {
                cy.wrap(index).as('position')
              }
            })
          }
        } else {
          cy.wrap(index).as('position')
        }
      })
    })

    cy.get('@position').then((position) => {
      //It checks that the Ballots section are showing only the policies filtered by the user
      cy.get(`#md-ballots-grid-results > tr > td:nth-child(${position + 1})`).each(($ballot) => {
        expect($filter.text().trim()).to.eq($ballot.text().trim())
      })
    })
  })
})
