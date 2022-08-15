# Introduction

This repo consists of the cypress end-to-end tests for Viewpoint application.

# Config

The cypress configuration is split up in different types of files based on requirement:

- `cypress.json` - Global configuration. All configs shared by all environments goes here
- `cypress\config\development.json` - Configuration loaded by default. Add configuration specific for development
- `cypress\config\qa.json` - Configuration to QA environment. To load it, add `--env configFile=qa`

# Development

Before starting the development of test cases, make sure:

- You have nodejs installed. Can be downloaded from here - https://nodejs.org/en/
- Once installed, open/reopen your cli tool, eg: powershell / git bash, and run the command `npm install -g yarn`
- Then, navigate to the project root directory, and run the command `npm install`

# Build and Test

To run cypress, just execute the following command:

- `npx cypress open` or `yarn open` - Opens the Cypress Test Runner in interactive mode.
- `npx cypress run` or `yarn test` - Runs Cypress tests to completion. By default will run all tests headlessly in the Electron browser
- `npx cypress run --spec "cypress/integration/SmokeTests/dashboard-tests.feature"` - Runs a specific spec file
- `npx cypress run --config integrationFolder="cypress/integration/ViewpointTestSuite/02-MeetingDetails"` - Runs all tests in a specific folder

# Running With Tags

Using Cucumber tags gives great advantage to run the test cases of your choice. All the tests in this repo have been tagged, either as a set of as the ID of invidiual test case. You can use the command as seen in below examples. Please note that narrowing the integration folder will help speed up the test you are running.
**NOTE:** With the current version of cucumber preprocessor, the cucumber report will mark the unexecuted tests as `Skipped`, and will mark the executed tests as `Passed` or `Failed`. The `Skipped` tests can be ignored.

- Run specific test from entire test suite - `npx cypress run --env TAGS='@40729'`
- Run multiple tests from entire test suite - `npx cypress run --env TAGS='@40729 or @3331 or @28433 or @28474'`
- Run specific test from specific file - `npx cypress run --spec 'cypress/integration/AutomationBacklog/Compare Recommendations.feature'  --env TAGS='@48678'`
- Run multiple tests from specific folder - `npx cypress run --config integrationFolder='cypress/integration/ViewpointTestSuite/02-MeetingDetails/'  --env TAGS='@40724 or @40734'`

# CI

To run the tests in the CI, you need to:

- Run all tests against `qa` environment. You do that using `npx cypress run --env configFile=qa` or `yarn test --env configFile=qa`
- Run smoke tests against `qa` environment. You do that using `npx cypress run --env configFile=smoke-qa` or `yarn test --env configFile=smoke-qa`
- Run smoke tests against `ultra` environment. You do that using `npx cypress run --env configFile=smoke-ultra` or `yarn test --env configFile=smoke-ultra`
- Run smoke tests against `production` environment. You do that using `npx cypress run --env configFile=smoke-prod` or `yarn test --env configFile=smoke-prod`

# Running With Docker

To run the tests within a docker container, you need the below:

- Ensure you have the latest version of Docker Desktop Installed and running
- Run `docker build -t votingportal-cypress .` . This will build the image
- Now run `docker run votingportal-cypress --env configFile=smoke-qa` . You can replace the configFile with your choice of test suite.
- You can also use docker-compose to run the tests. Make required amendments to the `command` parameter on the docker-compose file, and then run `docker compose up --build --scale cypress=1` . You can amend the number of parallel instances you want to run.