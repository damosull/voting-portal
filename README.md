# Introduction

This repo consists of the cypress end-to-end tests for Viewpoint application.

# Development

Before starting the development of test cases, make sure:

- You have nodejs installed. Can be downloaded from here - https://nodejs.org/en/
- Once installed, open/reopen your cli tool, eg: powershell / git bash, and run the command `npm install -g yarn`
- Then, navigate to the project root directory, and run the command `npm install`


# Build and Test

To run cypress, just execute the following command:

- `npx cypress open` or `yarn open` - Opens the Cypress Test Runner in interactive mode.
- `npx cypress run` or `yarn test` - Runs Cypress tests to completion. By default will run all tests headlessly in the Electron browser
- `npm run smoke` or `yarn smoke` - Runs All Smoke Tests
- `npm run regression` or `yarn regression` - Runs All Regression Tests
- `npx cypress run --spec "cypress/e2e/SmokeTests/dashboard-tests.feature"` - Runs a specific spec file
- `npx cypress run --config specPattern="cypress/e2e/ViewpointTestSuite/02-MeetingDetails/*.feature"` - Runs all tests in a specific folder


# Running With Tags

Using Cucumber tags gives great advantage to run the test cases of your choice. All the tests in this repo have been tagged, either as a set OR as the ID of invidiual test case. You can use the command as seen in below examples. Please note that narrowing the e2e folder will help speed up the test you are running.
**NOTE:** With the current version of cucumber preprocessor, the cucumber report will mark the unexecuted tests as `Skipped`, and will mark the executed tests as `Passed` or `Failed`. The `Skipped` tests can be ignored.

- Run specific test from entire test suite - `npx cypress run --env TAGS='@40729'`
- Run multiple tests from entire test suite - `npx cypress run --env TAGS='@40729 or @3331 or @28433 or @28474'`
- Run specific test from specific file - `npx cypress run --spec 'cypress/e2e/AutomationBacklog/Compare Recommendations.feature' --env TAGS='@48678'`
- Run multiple tests from specific folder - `npx cypress run --config specPattern="cypress/e2e/ViewpointTestSuite/02-MeetingDetails/*.feature" --env TAGS='@40724 or @40734'`


# Running Viewpoint Regression Tests

**NOTE:** Provide the browser details only if you are running tests locally and have that browser installed, else remove that parameter. Browsers are not supported when running on Azure pipelines.

- Run specific test from specific folder on safari - `npx cypress run --config specPattern='cypress/e2e/ViewpointTestSuite/02-MeetingDetails/Vote Button - MD6.feature' --env TAGS='@3289' --browser webkit`
- Run all tests from specific folder on chrome - `npx cypress run --spec 'cypress/e2e/ViewpointTestSuite/02-MeetingDetails/Vote Card.feature' --browser chrome`
- Run all meeting details regression tests - `npx cypress run --config specPattern='cypress/e2e/ViewpointTestSuite/02-MeetingDetails/*.feature'`
- Run entire resgression suite - `npm run regression`

# CI

All CI Pipelines are available in the `pipelines` folder. Currently we have 3:

- [`nightlyBuild`](https://dev.azure.com/glasslewis/Development/_build?definitionId=98) - This pipeline runs all the smoke tests on qa environment. It runs for every PR merge to master & once daily at a specific time.
- [`runAdhocTests`](https://dev.azure.com/glasslewis/Development/_build?definitionId=430) - This pipeline can be used to run any specific tests. The parameter accepts different configs which can be amended as needed.
- [`loadTestDocker`](https://dev.azure.com/glasslewis/Development/_build?definitionId=407) - This pipeline is being used to run load tests on qa environment. It takes the number of parallel instances as input and then runs a test which logs in with a random user, chooses a random meeting and votes.


# Running With Docker

To run the tests within a docker container, you need the below:

- Ensure you have the latest version of Docker Desktop Installed and running
- Run `docker build -t votingportal-cypress .` . This will build the image
- Now run `docker run votingportal-cypress --config specPattern=cypress/e2e/SmokeTests/*.feature`. You can replace the specPattern with your choice of test suite.
- You can also use docker-compose to run the tests. Make required amendments to the `command` parameter on the docker-compose file, and then run `docker compose up --build --scale cypress=1`. You can amend the number of parallel instances you want to run.