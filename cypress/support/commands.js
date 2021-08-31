// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... }
/* eslint-disable */
import { messages } from '../support/constants';

const toast = messages.toast;

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
        cy.get('#btn-take-no-action').click({ force: true });
      }
    });
  });
});

Cypress.Commands.add('selectValueFromCriteriaOption', (id, inputVal, object, updatebtn) => {
  cy.get(`${id}`).click();
  cy.get(`input[${inputVal}='${object}']`).check({ force: true });
  cy.get(`${updatebtn}`).click({ force: true });
});

Cypress.Commands.add('AddCriteriaOption', (searchText, inputValue) => {
  cy.get('#btn-add-criteria').click({ force: true });
  cy.get('#txt-filter-criteria').type(searchText, { force: true });
  cy.get(`input[value='${inputValue}']`).check({ force: true });
  cy.contains('Apply').click({ force: true });
});

// Verify header buttons [Vote], [Take no Action] and [Instruct]
Cypress.Commands.add('verifyMeetingOptionButtons', () => {
  cy.get('#btn-vote-now').should('be.visible');
  cy.get('#btn-take-no-action').should('be.visible');
  cy.get('#btn-instruct').should('be.visible');
});

Cypress.Commands.add(
  'login',
  (username = Cypress.env('Internal_Admin_Username'), password = Cypress.env('Internal_Admin_Password')) => {
    cy.request('/')
      .its('body')
      .then((body) => {
        // we can use Cypress.$ to parse the string body
        // thus enabling us to query into it easily
        const $html = Cypress.$(body);
        const csrf = $html.find('input[name=csrf-token]').val();

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
            console.log('Check console for details => ' + JSON.stringify(resp.body));
          }
          expect(success).to.be.true;
        });
      });
  }
);

Cypress.Commands.add(
  'loginExternal',
  (username = Cypress.env('External_Username'), password = Cypress.env('Internal_Admin_Password')) => {
    cy.request('/')
      .its('body')
      .then((body) => {
        // we can use Cypress.$ to parse the string body
        // thus enabling us to query into it easily
        const $html = Cypress.$(body);
        const csrf = $html.find('input[name=csrf-token]').val();

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
            console.log('Check console for details => ' + JSON.stringify(resp.body));
          }
          expect(success).to.be.true;
        });
      });
  }
);



Cypress.Commands.add('checkIfExists', (ele) => {
  return new Promise((resolve, reject) => {
    /// here if  ele exists or not
    cy.get('body')
      .find(ele)
      .its('length')
      .then((res) => {
        if (res > 0) {
          //// do task that you want to perform
          cy.get(ele).check();
          resolve();
        } else {
          reject();
        }
      });
  });
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
          cy.get('.toast-message').should('contain.text', toast.REPORT_DELETED);
        }
      });
    });
});

Cypress.Commands.add('GetAutomationUserIDFromDB', () => {
  cy.executeQuery(`SELECT[UserID] FROM[GLP].[dbo].[UM_User] where LoginID = 'automation_calpers@glasslewis.com'`).then((result) => {
    const usrid = cy.wrap(result)
    return usrid
  })
})


Cypress.Commands.add('logout', () => {
  cy.intercept('DELETE', '**/Home/RemoveDraftFilter/').as('RemoveDraft');
  cy.intercept('GET', '**/Home/Logout?type=UserLoggedOutButton&_=**').as('LoggedOut');

  cy.get('#logged-in-user').click();
  cy.contains('Log out').should('have.attr', 'href', '#Logout').click();

  cy.wait('@RemoveDraft');
  cy.wait('@LoggedOut');
});

Cypress.Commands.add('removeDraft', () => {
  cy.request({
    method: 'DELETE',
    url: '/Home/RemoveDraftFilter/',
  }).then((resp) => {
    console.log('resp => ' + JSON.stringify(resp.body));
  });
});

Cypress.Commands.add('saveFilter', (filterName) => {
  cy.contains('Save As').click();
  cy.get('#popupTextContainer').should('be.visible').type(filterName);
  cy.get('#apprise-btn-undefined').should('be.visible'); //the ID of this button should be fixed
  cy.get('#apprise-btn-confirm').click();
});

Cypress.Commands.add('removeAllExistingSelectedCriteria', (isInternal) => {
  cy.get('body').then(($body) => {
    if ($body.find('[class="remove"]').length > 0) {
      const len = $body.find('[class="remove"]').length;
      if (!isInternal) {
        for (let i = len; i >= 0; i--) {
          if (i > 2) {
            cy.get('[class="remove"]')
              .eq(i - 1)
              .click({ force: true });
          }
        }
      } else {
        for (let i = len - 1; i >= 0; i--) {
          if (i > 2) {
            cy.get('[class="remove"]').eq(i).click({ force: true });
          }
        }
      }
      cy.get('[class="remove"]').should('have.length', 2);
    }
  });
});

Cypress.Commands.add('AddMultipleCriteria', (searchText, isReporting) => {
  cy.get('#btn-add-criteria').click({ force: true });
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

  cy.contains('Apply').click();

  if (!isReporting) {
    cy.get('#filterPreferenceControl > div > #controls > div > div > h4:nth-child(n+2)').each((h4) => {
      expect(h4.text()).to.be.oneOf(searchText);
    });
  } else {
    cy.get('#report-criteria-controls > div > div > h4').each((h4) => {
      expect(h4.text()).to.be.oneOf(searchText);
    });
  }
});

Cypress.Commands.add('selectFirstMeeting', () => {
  cy.get('table > tbody > tr')
    .eq(2)
    .within(() => {
      cy.get('[data-js="meeting-details-link"]').first().click({ force: true });
    });
});

Cypress.Commands.add('deleteMyFilter', (filterToDelete) => {
  cy.intercept('GET', '**/ManageFilters').as('manageFilters');
  cy.intercept('GET', '**/Api/Data/Subscription/?FilterId=**').as('subscriptionFilter');
  cy.intercept('GET', '**/Api/Data/FilterPreference/SharedUsers/?FilterToShareID=**').as('filterToShare');
  cy.intercept('GET', '**/Api/Data/Filters/GetByID?Id=**').as('getByID');
  cy.intercept('DELETE', '**/Api/Data/WorkflowFilters/**?isConfirmed=false').as('filterDeleted');

  cy.get('#btn-manage-filters').click();

  cy.wait('@manageFilters');
  cy.wait('@subscriptionFilter');
  cy.wait('@filterToShare');

  cy.contains('My Filters')
    .siblings()
    .find('li')
    .then((myFilter) => {
      cy.wrap(myFilter).each((value, index) => {
        const found = value.text().trim();
        // It compares the existing filter name with the ones available under My Filters.
        if (found == filterToDelete) {
          cy.wait('@getByID');
          cy.wrap(myFilter).eq(index).click();
          cy.contains('Delete Filter').click();
          cy.wait('@filterDeleted');
          cy.get('.toast-message').should('contain.text', toast.FILTER_DELETED);
        } else {
          if (index == myFilter.length - 1) {
            cy.log('No filter was found');
            return false;
          }
        }
      });
    });
});

Cypress.Commands.add('addCriteriaStatus', (statusToSearch, isReporting) => {
  cy.get('.editor-modal').invoke('attr', 'style', 'display: block');

  if (!isReporting) {
    cy.get('#filterPreferenceControl > div > #controls > div > div > h4:nth-child(n+2)').click({ force: true });
  } else {
    cy.get('#report-criteria-controls > div > div > h4').click({ force: true });
  }

  statusToSearch.forEach((value) => {
    cy.get('.editor-modal > input').clear({ force: true }).type(value);
    cy.get('.editor-modal > div > div > label').contains(value).click({ force: true });
  });
  cy.get('.editor-modal > div > button').eq(0).click();
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

Cypress.Commands.add('donwloadFileLocal', (report) => {
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

Cypress.Commands.add('selectReportExtension', (extension) => {
  cy.get('#rpt-report').children().find('select').select(extension.toUpperCase());
});

Cypress.Commands.add('checkColumnFieldApplyAndVerifyIsChecked', (value) => {
  cy.get('#btn-workflow-config-columns').click();
  cy.get('#txt-filter-col-name').type(value);
  cy.get(`input[value='${value}']`).check({ force: true });
  cy.get(`input[value='${value}']`).should('be.checked')
  cy.get('#txt-filter-col-name').clear();
  cy.get('#btn-apply-configure-columns').click();
});

Cypress.Commands.add('uncheckColumnFieldApplyAndVerifyNotChecked', (value) => {
  cy.get('#btn-workflow-config-columns').click();
  cy.get('#txt-filter-col-name').type(value);
  cy.get(`input[value='${value}']`).uncheck({ force: true });
  cy.get(`input[value='${value}']`).should('not.be.checked')
  cy.get('#txt-filter-col-name').clear();
  cy.get('#btn-apply-configure-columns').click();
});