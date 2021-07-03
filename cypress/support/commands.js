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
  cy.contains('Apply').click();
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

Cypress.Commands.add('AddMultipleCriteria', (searchText) => {
  cy.get('#btn-add-criteria').click({ force: true });
  searchText.forEach((value) => {
    cy.then(() => {
      cy.get('#txt-filter-criteria')
        .clear()
        .type(value)
        .parent()
        .siblings()
        .children()
        .find('input[type="checkbox"]')
        .check({ force: true });
    });
  });

  cy.contains('Apply').click();
  cy.get('#report-criteria-controls > div > div > h4').each((h4) => {
    expect(h4.text()).to.be.oneOf(searchText);
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
    .then((myconfig) => {
      cy.wrap(myconfig).each((value, index) => {
        const found = value.text();
        // It compares the existing file name with the ones available under My Configurations.
        if (found == reportToDelete) {
          cy.wrap(myconfig).eq(index).click();
          cy.contains('Delete').click();
          cy.get('.toast-message').should('contain.text', toast.REPORT_DELETED);
        }
      });
    });
});

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
