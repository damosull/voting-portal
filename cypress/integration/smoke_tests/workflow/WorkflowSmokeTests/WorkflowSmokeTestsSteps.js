import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps'
import  workflowPageItems from '../../../../elements/pages/workflow/workflowPageItems'
const workflowPage = new workflowPageItems()
const constants = require ('../../../../support/constants')

//migrated over the filter objects from the old mocha test
export const ESG_Risk_Rating_Assessment_filter = {
  criteria: 'ESG Risk Rating Assessment',
  editorButton: '#editorDiv1050',
  editorModal: '#sustainalytics-target-RiskCategory',
}

const ESG_Risk_Exposure_Assessment_filter = {
  criteria: 'ESG Risk Exposure Assessment',
  editorButton: '#editorDiv1051',
  editorModal: '#sustainalytics-target-OverallExposureCategory',
}

const ESG_Risk_Management_Assessment_filter = {
  criteria: 'ESG Risk Management Assessment',
  editorButton: '#editorDiv1052',
  editorModal: '#sustainalytics-target-OverallManagementCategory',
}

const ESG_Risk_Rating_Percentile_Global_filter = {
  criteria: 'ESG Risk Rating Percentile Global',
  editorButton: '#editorDiv1053',
  editorModal: '#sustainalytics-target-RiskPercentileUniverse',
}

const ESG_Risk_Rating_Percentile_Industry_filter = {
  criteria: 'ESG Risk Rating Percentile Industry',
  editorButton: '#editorDiv1054',
  editorModal: '#sustainalytics-target-RiskPercentileIndustry',
}

const ESG_Risk_Rating_Percentile_Sub_Industry_filter = {
  criteria: 'ESG Risk Rating Percentile Sub Industry',
  editorButton: '#editorDiv1055',
  editorModal: '#sustainalytics-target-RiskPercentileSubindustry',
}

const ESG_Risk_Rating_Highest_Controversy_filter = {
  criteria: 'ESG Risk Rating Highest Controversy',
  editorButton: '#editorDiv1056',
  editorModal: '#sustainalytics-target-HighestControversyCategory',
}

const fourEsgColumns = [
  'ESG Risk Rating Percentile Global',
  'ESG Risk Rating Percentile Industry',
  'ESG Risk Rating Percentile Sub Industry',
  'ESG Risk Rating Highest Controversy',
]

const threeEsgColumns = ['ESG Risk Rating Assessment', 'ESG Risk Exposure Assessment', 'ESG Risk Management Assessment']

const workflowFilterData = {
  company: 'SK Innovation',
  policy: 'Wellington',
}

Given('I am logged in as the {string} User', (username) => {
  sessionStorage.clear()
  cy.loginWithAdmin(constants.USER[username])
  cy.visit('/Workflow')
  cy.stausCode200('@WORKFLOW_SECURITIES_WATCHLIST') // Last loaded API on that page
})

When('I apply the {string}', (filterName) => {
  switch (filterName) {
    case 'ESG Risk Rating Assessment filter':
      elementShouldNotExist(ESG_Risk_Rating_Assessment_filter.editorButton)
      elementShouldNotExist(ESG_Risk_Rating_Assessment_filter.editorModal)
      workflowPage.addCriteriaButton().click()
      workflowPage.criteriaInput().type(ESG_Risk_Rating_Assessment_filter.criteria)
      checkFilterCriteria(ESG_Risk_Rating_Assessment_filter.criteria)
      break
    case 'ESG Risk Exposure Assessment filter':
      elementShouldNotExist(ESG_Risk_Exposure_Assessment_filter.editorButton)
      elementShouldNotExist(ESG_Risk_Exposure_Assessment_filter.editorModal)
      workflowPage.addCriteriaButton().click()
      workflowPage.criteriaInput().type(ESG_Risk_Exposure_Assessment_filter.criteria)
      checkFilterCriteria(ESG_Risk_Exposure_Assessment_filter.criteria)
      break
    case 'ESG Risk Management Assessment filter':
      elementShouldNotExist(ESG_Risk_Management_Assessment_filter.editorButton)
      elementShouldNotExist(ESG_Risk_Management_Assessment_filter.editorModal)
      workflowPage.addCriteriaButton().click()
      workflowPage.criteriaInput().type(ESG_Risk_Management_Assessment_filter.criteria)
      checkFilterCriteria(ESG_Risk_Management_Assessment_filter.criteria)
      break
    case 'ESG Risk Rating Percentile Global filter':
      elementShouldNotExist(ESG_Risk_Rating_Percentile_Global_filter.editorButton)
      elementShouldNotExist(ESG_Risk_Rating_Percentile_Global_filter.editorModal)
      workflowPage.addCriteriaButton().click()
      workflowPage.criteriaInput().type(ESG_Risk_Rating_Percentile_Global_filter.criteria)
      checkFilterCriteria(ESG_Risk_Rating_Percentile_Global_filter.criteria)
      break
    case 'ESG Risk Rating Percentile Industry filter':
      elementShouldNotExist(ESG_Risk_Rating_Percentile_Industry_filter.editorButton)
      elementShouldNotExist(ESG_Risk_Rating_Percentile_Industry_filter.editorModal)
      workflowPage.addCriteriaButton().click()
      workflowPage.criteriaInput().type(ESG_Risk_Rating_Percentile_Industry_filter.criteria)
      checkFilterCriteria(ESG_Risk_Rating_Percentile_Industry_filter.criteria)
      break
    case 'ESG Risk Rating Percentile Sub Industry filter':
      elementShouldNotExist(ESG_Risk_Rating_Percentile_Sub_Industry_filter.editorButton)
      elementShouldNotExist(ESG_Risk_Rating_Percentile_Sub_Industry_filter.editorModal)
      workflowPage.addCriteriaButton().click()
      workflowPage.criteriaInput().type(ESG_Risk_Rating_Percentile_Sub_Industry_filter.criteria)
      checkFilterCriteria(ESG_Risk_Rating_Percentile_Sub_Industry_filter.criteria)
      break
    case 'ESG Risk Rating Highest Controversy filter':
      elementShouldNotExist(ESG_Risk_Rating_Highest_Controversy_filter.editorButton)
      elementShouldNotExist(ESG_Risk_Rating_Highest_Controversy_filter.editorModal)
      workflowPage.addCriteriaButton().click()
      workflowPage.criteriaInput().type(ESG_Risk_Rating_Highest_Controversy_filter.criteria)
      checkFilterCriteria(ESG_Risk_Rating_Highest_Controversy_filter.criteria)
      break                          
    default:
      cy.log('Filter not found!!')
  }
  workflowPage.applyCriteriaButton().click()
  cy.stausCode200('@SUSTAIN_ANALYTICS')
  cy.stausCode200('@RANGE_SLIDER')
})

Then('I should be able to see the results only for {string}', (filterName) => {
  switch (filterName) {
    case 'ESG Risk Rating Assessment filter':
      cy.get(ESG_Risk_Rating_Assessment_filter.editorButton).trigger("click")
      cy.get(ESG_Risk_Rating_Assessment_filter.editorModal).should('be.visible')
      break
    case 'ESG Risk Exposure Assessment filter':
      cy.get(ESG_Risk_Exposure_Assessment_filter.editorButton).trigger("click")
      cy.get(ESG_Risk_Exposure_Assessment_filter.editorModal).should('be.visible')
      break
    case 'ESG Risk Management Assessment filter':
      cy.get(ESG_Risk_Management_Assessment_filter.editorButton).trigger("click")
      cy.get(ESG_Risk_Management_Assessment_filter.editorModal).should('be.visible')
      break
    case 'ESG Risk Rating Percentile Global filter':
      cy.get(ESG_Risk_Rating_Percentile_Global_filter.editorButton).trigger("click")
      cy.get(ESG_Risk_Rating_Percentile_Global_filter.editorModal).should('be.visible')
      break
    case 'ESG Risk Rating Percentile Industry filter':
      cy.get(ESG_Risk_Rating_Percentile_Industry_filter.editorButton).trigger("click")
      cy.get(ESG_Risk_Rating_Percentile_Industry_filter.editorModal).should('be.visible')
      break
    case 'ESG Risk Rating Percentile Sub Industry filter':
      cy.get(ESG_Risk_Rating_Percentile_Sub_Industry_filter.editorButton).trigger("click")
      cy.get(ESG_Risk_Rating_Percentile_Sub_Industry_filter.editorModal).should('be.visible')
      break
    case 'ESG Risk Rating Highest Controversy filter':
      cy.get(ESG_Risk_Rating_Highest_Controversy_filter.editorButton).trigger("click")
      cy.get(ESG_Risk_Rating_Highest_Controversy_filter.editorModal).should('be.visible')
      break                                 
    default:
      cy.log('Filter not found!!')
  }
})

And('I should logout from the application', () => {
  cy.logout()
})

When('I click on the Manage Filters button', () => {
  cy.get('#btn-manage-filters').click()
})

Then('I can see the Manage Filters page', () => {
  cy.url().should('include', '/ManageFilters')
})

And('I am on the Workflow page', () => {
  workflowPage.workflowMenuButton().should('exist')
})

And('I can see the filter columns are displayed in the correct order', () => {
  cy.get('#btn-date-modal').contains('Next 30 Days').should('be.visible')
  cy.get('#editorDiv1000 > h4').contains('Number of Ballots > 0').should('be.visible')
  cy.get('#system-filters').contains('Upcoming Meeting').should('have.class', 'highlightedFilter')

  const filterColumns = [
    'Company Name',
    'Agenda Key',
    'Policy ID',
    'Control Number',
    'Decision Status',
    'Security Country of Trade',
    'Deadline Date',
    'Meeting Date',
    'Record Date',
    'Meeting Type',
    'Shares',
    'Ballot Blocking',
  ]

  filterColumns.forEach((column) => {
    cy.get(`th[data-title='${column}']`)
    filterColumns.index == column
  })
})

When('I search for California Public Employee Retirement System', () => {
  // Search customer
  //'California Public Employee Retirement System (CalPERS)'
  cy.get('.customerName-Search .k-input').type('CAL', { force: true })
  cy.get('#kendoCustomers-list .k-item').first().click({ force: true })
})

Then('all the meetings on the screen have a CalPERS customer id', () => {
  // check all meetings in response have CalPERS customer id
  cy.wait('@WORKFLOW_EXPANSION').then((xhr) => {
    const data = JSON.parse(xhr.response.body) 
    const items = data.items

    items.forEach((item) => {
      const ballots = item.Agendas[0].Policies[0].Ballots
      ballots.forEach((ballot) => {
        const value = ballot.Summaries.CustomerID.Value
        expect(value).to.equal(196)
      })
    })
  })
})

When('I search for a company on the search bar and choose meetings', () => {
  // Search Customer ('Meetings'option is default) & verify user is navigated to correct Meeting Detail page
  cy.get('#toolbarSearchFieldInput').type('International Breweries plc')
  cy.contains('International Breweries Plc | NG').click()
})

Then('I should be navigated to the Meeting Details page', () => {
  cy.url().should('include', '/MeetingDetails/Index/')
  cy.get('#company-navigate').should('have.text', 'International Breweries Plc')
})

When('I search for a company on the search bar and choose companies', () => {
  // Search customer ('Companies' option) & verify user is navigated to correct Company page
  cy.get('#toolbarSearchFieldInput').type('international business machines')
  cy.get('#toolbar-options--companies').should('have.value', 'Companies').click()
  cy.contains('International Business Machines Corp. | US').click()
})

Then('I should be navigated to the Company page', () => {
  cy.url().should('include', '/Company/Index/23600')
  cy.get('#md-issuer-name').should('contain', 'International Business Machines Corp.')
})

When('I navigate to Manage Filters page', () => {
  // Step 3 - Select Manage Filters link
  cy.get('#btn-manage-filters').click()
  cy.get('#filter-name-edit').should('have.text', 'Upcoming Meetings')
  cy.wait('@CURRENT_USER')
  cy.wait('@FILTERS_DIRECTORY')
  cy.wait('@INBOX')
  cy.wait('@DATA')
  cy.get('body').then(($body) => {
    if ($body.find('[class="fa fa-times"]').length > 0) {
      const len = $body.find('[class="fa fa-times"]').length
      for (let i = len; i >= 0; i--) {
        if (i > 0) {
          cy.get('[class="fa fa-times"]')
            .eq(i - 1)
            .click({ force: true })
          cy.get('#apprise-btn-confirm').click()
        }
      }
      cy.get('[class="fa fa-times"]').should('have.length', 0)
    }
  })
})

When('I {string} the subscription', (action) => {
  switch (action) {
    case 'add':
      //Step 4 - Click "Add Subscription" button
      cy.get('#add-subscription').click()
      cy.wait('@SUBSCRIPTIONS')
      //Step 5 - Select 'Calpers External Admin' from Users list
      cy.get('#subscriptions-modal-content > h3')
      cy.get('#users').click().type('Cal')
      cy.get('#users_listbox > li').focus().blur().click({ force: true })
      //Step 6 - Enter Schedule to run Subscription
      //Weekly,8 AM every Saturday
      cy.get('#schedule-type').select('1')
      cy.get('#Mon').check({ force: true })
      cy.get('input#IncludeCSVResultset').invoke('attr', 'style', 'display: block')
      cy.get('#IncludeCSVResultset').check()
      //Step 7 - Click OK
      cy.get('#ok').click()
      cy.wait('@LOGGER')
      cy.wait('@DATA')
      break                             
    case 'remove':
      //Step 11 - Remove Subscription entry from Viewpoint
      cy.get('#current-subscribers-list > tbody > tr > td > i[class="fa fa-times"]').first().click({ force: true })
      cy.get('#apprise-btn-confirm').click()
      break
  }
})

Then('I should be able to see a success message for the {string} subscription', (action) => {
  switch (action) {
    case 'added':
      cy.get('.toast-message').should('contain.text', constants.messages.toast.SUBSCRIPTION_ADDED)
      cy.getAutomationUserIDFromDB(constants.USER.CALPERS).as('userid')
      break                             
    case 'removed':
      cy.get('.toast-message').should('contain.text', constants.messages.toast.SUBSCRIPTION_DELETED)
      break
  }
})

And('the subscription is available in the database', () => {
  const today = new Date().toISOString().slice(0, 10)
  //Step 9 - Connect to Aqua Database and verify new row has been added
  cy.executeQuery('SELECT TOP 1 * FROM FL_Subscription ORDER BY SubscriptionID DESC').then((result) => {
    var cols = []
    for (var j = 0; j < result.length; j++) {
      cols.push(result[j])
    }

    //Step 10 - Verify FL_Subscription table Column data correct data
    assert.equal(cols[2], 1) //verify Active
    cy.get('@userid').then(function (uid) {
      assert.equal(cols[3], uid) //SubscriberID
    })
    assert.equal(cols[4], 196) //Customer ID
    assert.equal(cols[7], 0) //Deliver to Everyone = false
    expect(cols[14]).to.include(today) //Created date
    expect(cols[16]).to.include(today) //Last Modified date
    cy.get('@userid').then(function (uid) {
      assert.equal(cols[13], uid) //Created By
    })

    expect(cols).to.have.length(19) //Total Fields
  })
})

When('I select the first available meeting', () => {
  cy.removeAllExistingSelectedCriteria()
  cy.AddMultipleCriteria(['Decision Status'])
  cy.addCriteriaStatus(['Recommendations Pending'])
  cy.selectFirstMeeting()
  cy.wait('@CREATE_DRAFT_FILTER')
  cy.verifyMeetingOptionButtons()
})

Then('I am able to iterate through rationales, add text entry, save and verify toast message for each entry', () => {
  cy.get('#md-votecard-grid-results > tr').each(($ele, $idx) => {
    cy.get(`#md-votecard-grid-results > tr:nth-child(${$idx + 1}) > td:nth-child(3)`)

    const voting = $ele.text()
    if (!voting.includes('Non Voting')) {
      cy.get(`tr:nth-child(${$idx + 1}) > td.cell-with-rationale > div > div > span`)
        .scrollIntoView()
        .click({ force: true })
      cy.get(
        `tr:nth-child(${$idx + 1}) > td.cell-with-rationale > div > div > div > div.editable-input > textarea`
      ).clear({ force: true })
      cy.get(
        `tr:nth-child(${$idx + 1}) > td.cell-with-rationale > div > div > div > div.editable-input > textarea`
      ).type('test', { force: true })
      cy.get(
        `tr:nth-child(${
          $idx + 1
        }) > td.cell-with-rationale > div > div > div > div.editable-input > div.editable-buttons > button.js-editable-submit.secondary.blue.btn-update`
      ).click({ force: true })
    }
    if ($idx > 4) {
      return false
    }
  })
})

Then('I am able to add meeting note and post private comment', () => {
  //Test Meeting note entry
  cy.get('#meeting-note').click()
  cy.get('#meeting-notes-input').clear()
  cy.get('#meeting-notes-input').type('The quick brown fox jumps over a lazy dog - ~!@#$%^&*-_=+[]|,./<>? +')
  cy.get(`button[type='submit'`).click()
  cy.get('.toast-message').should('contain.text', 'Meeting note saved')

  //Post Private Comment
  cy.get('#adhoc-users-search-reply-comment_taglist > li').each(($el, index) => {
    cy.wrap($el)
    $el.get(`.k-button > :nth-child(${index}) > span`)
    cy.get(`#adhoc-users-search-reply-comment_taglist > li > span.k-icon.k-delete`).click({ force: true })
  })
  cy.get(`textarea[name='Comment'`).type('hello CalPERS | ExtUser Patrick Corcoran')
  cy.get('#comment-viewable-type').select('Private')
  cy.get('#btn-post-comment').click({ force: true })
  cy.get('.toast-message').should('contain.text', 'Comment saved') 
})

When('I try to add the first four available Sustainalytics ESG columns', () => {
  cy.get('#btn-workflow-config-columns').click()
  fourEsgColumns.forEach((column) => {
    cy.get('#txt-filter-col-name').fill(column)
    cy.get(`input[value='${column}']`).check({ force: true })
    cy.get('#txt-filter-col-name').clear()
  })
  cy.get('#btn-apply-configure-columns').click()
})

Then('I should be able to see these {string} columns on the workflow table', (noOfColumns) => {
  //Waiting for page load
  cy.stausCode200('@WORKFLOW_EXPANSION')
  cy.stausCode200('@WORKFLOW_SECURITIES_WATCHLIST')
  cy.get('.k-loading-text', { timeout: 90000 }).should('not.exist')
  cy.get('.mCSB_dragger_bar', { timeout: 90000 }).should('be.visible')
  // Moves the horizontal sidebar to the far right
  // cy.get('.k-grid-header-wrap').invoke('attr', 'style', 'overflow: visible margin-left: -1100px')
  for(let n = 0; n < 11; n ++){
    cy.get('#btn-scroll-end').click()
  }

  switch (noOfColumns) {
    case 'four':
      fourEsgColumns.forEach((column) => {
        cy.get(`th[data-title='${column}']`).should('be.visible')
      })
      break
    case 'three':
      threeEsgColumns.forEach((column) => {
        cy.get(`th[data-title='${column}']`).should('be.visible')
      })
      break
  }
})

When('I try to add the remaining three Sustainalytics ESG columns', () => {
  cy.get('#btn-workflow-config-columns').click()

  threeEsgColumns.forEach((column) => {
      cy.get('#txt-filter-col-name').fill(column)
      cy.get(`input[value='${column}']`).check({ force: true })
      cy.get('#txt-filter-col-name').clear()
    })
    cy.get('#btn-apply-configure-columns').click()
})

When('I try to remove the first column on the workflow table', () => {
  let column = 'Agenda Key'
  cy.get(`th[data-title='${column}']`).should('be.visible')
  cy.get('#btn-workflow-config-columns').click()
  cy.get(`input[value='${column}']`).first().uncheck({ force: true })
  cy.get('#btn-apply-configure-columns').click()
  cy.stausCode200('@WORKFLOW_EXPANSION')
})

Then('I should be unable to see the first column on the workflow table', () => {
  let column = 'Agenda Key'
  cy.get(`th[data-title='${column}']`).should('not.exist')
})

When('I apply the policy criteria for one of the policies', () => {
  cy.contains('Upcoming Meetings').click()
  cy.wait('@WORKFLOW_EXPANSION')
  cy.removeAllExistingSelectedCriteria()
  // Step 2 - User clicks on Add Criteria & selects Policy ID
  cy.AddMultipleCriteria(['Policy ID'])
  cy.wait('@LIST_SERVICE')
  // Step 3 - User selects one policy from the list (e.g. TCW-TH) & clicks Update
  cy.addCriteriaStatus([`${workflowFilterData.policy}`])
  cy.wait('@WORKFLOW_EXPANSION')
  cy.wait('@WORKFLOW_SECURITIES_WATCHLIST')
  cy.wait('@GET_AVAILABLE_ASSIGNEES_CUSTOMER')
})

And('I click on the control number link', () => {
  // Step 4 - User clicks on the Control Number hyperlink on the workflow page
  // Go through the list of meetings and click in the record that matches the name
  cy.get('table > tbody > tr > td:nth-child(4)').each(($list, index) => {
    if ($list.text() == workflowFilterData.policy) {
      cy.get('table > tbody > tr > td:nth-child(5)').eq(index).find('a').click({ force: true })

      return false
    }
  })
  cy.wait('@GET_MEETING_ID')
  cy.wait('@RELATED_MEETINGS')
  cy.wait('@GET_AGENDA')
  cy.wait('@PAGE_SECTION_ORDER')
  cy.wait('@MEETING_SECURITY_WATCHLIST')
  cy.wait('@ASSIGNED_MEETING_ID')
  cy.wait('@VOTE_TALLY')
})

Then('I can see the Ballot section under the comments section', () => {
  // Step 5 - Verify User can see Ballot Section under the Comments section
  cy.get('div #ballots-section').should('be.visible')
  cy.get('#btn-mdballots-details-config-columns').click()
  cy.get('#ballots-configure-columns-target').invoke('attr', 'style', 'display: block')
  // Step 6 - Displays the modal with the list of fields , Apply & Cancel buttons
  cy.get('#configure-columns-modal > button.secondary.blue').eq(1).should('be.visible')
  cy.get('#configure-columns-modal > button.secondary.gray').eq(1).should('be.visible')
})

And('I can verify that the default field "Control Number" is not available in the "Columns" modal', () => {
  // Step 7 - Verify that the Default Field 'Control Number' is not available in the 'Columns' modal
  cy.get('[data-js="md-ballots-section"]')
    .find('#mytable > ul > li')
    .each(($column) => {
      expect($column.text().trim()).to.not.equal('Control Number')
    })  
})

And('I can verify that the user gets the appropriate results for "Custodian" in the responsive search of the "Columns" Modal', () => {
  // Step 8 - Verify that the user enter a character (e.g.: 'Custodian') in the responsive search of the "Columns" Modal
  cy.get('.company-name-search > input').last().type('Custodian')

  cy.get('[data-js="md-ballots-section"]')
    .find('#mytable > ul > li')
    .each(($column) => {
      expect($column.text().trim()).to.have.string('Custodian')
    })

  cy.get('#configure-columns-modal > button.secondary.gray').eq(1).click() 
})

And('I can verify that the ballot section displays just the results based on the policy filtered', () => {
  // Check which position the column "Policy ID" is and wrapped into the object index
  cy.get('#ballots-grid > div > div > table > thead > tr > th').should('be.visible').each(($headers, index) => {
    if ($headers.text().trim() == 'Policy ID') {
      cy.wrap(index).as('index')
      // Check that the "Policy ID" column will display the expected value
      cy.get('@index').then((pos) => {
        cy.get(`#md-ballots-grid-results > tr > td:nth-child(${pos + 1})`).each(($ballot) => {
          expect(workflowFilterData.policy).to.eq($ballot.text().trim())
        })
      })
      // Ends the loop when the column is found
      return false
    }
  })
})


function elementShouldNotExist(element) {
  cy.get(element).should('not.exist')
}

function checkFilterCriteria(criteria) {
  cy.get(`input[value='${criteria}']`).check({ force: true })
}
