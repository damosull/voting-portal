import './commands';
import sqlServer from 'cypress-sql-server';
sqlServer.loadDBCommands();

// Hide fetch/XHR requests
const app = window.top;
if (!app.document.head.querySelector('[data-hide-command-log-request]')) {
  const style = app.document.createElement('style');
  style.innerHTML =
    '.command-name-request, .command-name-xhr { display: none }';
  style.setAttribute('data-hide-command-log-request', '');
  app.document.head.appendChild(style);
}

/* eslint-disable no-unused-vars */
Cypress.on('uncaught:exception', (err, runnable) => {
  //returning false here prevents Cypress from failing the test
  return false;
});

afterEach(() => {
  //attach screenshot to the cucumber report for failed test
  const screenshotsFolder = Cypress.config("screenshotsFolder");
  try {
    if (window.cucumberJson?.generate) {
      const testState = window.testState;
      const stepResult =
          testState.runTests[testState.currentScenario.name][testState.currentStep];
      if (stepResult?.status === "failed") {
          const screenshotFileName = `${testState.feature.name} -- ${testState.currentScenario.name} (failed).png`;
          cy.readFile(
              `${screenshotsFolder}/${Cypress.spec.name}/${screenshotFileName}`,
              "base64"
          ).then((imgData) => {
              stepResult.attachment = {
                  data: imgData,
                  media: { type: "image/png" },
                  index: testState.currentStep,
                  testCase: testState.formatTestCase(testState.currentScenario),
              };
          });
      }
    }
  } catch (e) {
    cy.log('Attaching Screenshot failed! Proceeding with tests!!')
  }
});
