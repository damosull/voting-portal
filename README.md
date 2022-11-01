# Introduction
This repo consists of the cypress end-to-end tests for Viewpoint application.

<br/><br/><br/>
# Running Tests for non-techs
If you want to run automated tests on Viewpoint, but have little or no idea on how to run specific test scripts, then follow below steps. This will help you run specific automated test scripts from the Viewpoint Regression Test Suite, Automation Backlog Test Suite or the Automated Smoke Tests.

To run tests on Azure Pipelines, go to [`this link`](https://dev.azure.com/glasslewis/Development/_build?definitionId=430), click on `Run pipeline`, put the command suggested below under `Build Parameters` and click `Run`

## Running tests from Viewpoint Regression Test Suite
- To run specific tests, mention the Azure test IDs in this command. For example, if I want to run test case ID 28722 and 40424, the command to use in the `Build Parameters` field would be `npx cypress run --config specPattern='cypress/e2e/ViewpointTestSuite/**/*.feature' --env tags='@28722 or @40724'`
- To run multiple tests, just add those test IDs in the tags section of the above command, eg: `tags='@xyz or @abc or @lmn or @pqr or @fgh'`

## Running tests from Automation Backlog Test Suite
- To run specific tests, mention the Azure test IDs in this command. For example, if I want to run test case ID 50530, the command to use in the `Build Parameters` field would be `npx cypress run --config specPattern='cypress/e2e/AutomationBacklog/*.feature' --env tags='@50530'`
- To run multiple tests, just add those test IDs in the tags section of the above command, eg: `tags='@xyz or @abc or @lmn or @pqr or @fgh'`

## Running tests from Viewpoint Automated Smoke Tests
- To run specific tests, mention the tag found on the feature file. For example, if I want to run test cases for meeting details page, the command to use in the `Build Parameters` field would be `npx cypress run --config specPattern='cypress/e2e/SmokeTests/*.feature' --env tags='@meeting-details'`
- To run all smoke tests, use the command: `npx cypress run --config specPattern='cypress/e2e/SmokeTests/*.feature'`

## Running tests from any folder
- To run specific tests without worrying about the test suite, mention the Azure test IDs in this command. For example, if I want to run test case ID 28722 and 50530, the command to use in the `Build Parameters` field would be `npx cypress run --config specPattern='**/*.feature' --env tags='@28722 or @50530'`
- To run multiple tests, just add those test IDs in the tags section of the above command, eg: `tags='@xyz or @abc or @lmn or @pqr or @fgh'`

<br/><br/><br/>
# Development

Before starting the development of test cases, make sure:

- You have nodejs installed. Can be downloaded from here - https://nodejs.org/en/
- Once installed, open/reopen your cli tool, eg: powershell / git bash, and run the command `npm install -g yarn`
- Then, navigate to the project root directory, and run the command `npm install`
<br/><br/><br/>
# Build and Test

To run cypress, just execute the following command:

- `npx cypress open` or `yarn open` - Opens the Cypress Test Runner in interactive mode.
- `npx cypress run` or `yarn test` - Runs Cypress tests to completion. By default will run all tests headlessly in the Electron browser
- `npm run smoke` or `yarn smoke` - Runs All Smoke Tests
- `npm run regression` or `yarn regression` - Runs All Regression Tests
- `npx cypress run --spec "cypress/e2e/SmokeTests/dashboard-tests.feature"` - Runs a specific spec file
- `npx cypress run --config specPattern="cypress/e2e/ViewpointTestSuite/02-MeetingDetails/*.feature"` - Runs all tests in a specific folder

**NOTE:** To run tests on Azure Pipelines, go to [`this link`](https://dev.azure.com/glasslewis/Development/_build?definitionId=430), click on `Run pipeline` and put the command under `Build Parameters` and click `Run`

<br/><br/><br/>
# Running With Tags

Using Cucumber tags gives great advantage to run the test cases of your choice. All the tests in this repo have been tagged, either as a set OR as the ID of invidiual test case. You can use the command as seen in below examples.

**NOTE:** With the current version of cucumber preprocessor, the cucumber report will mark the unexecuted tests as `Unknown/Skipped`, and will mark the executed tests as `Passed` or `Failed`. The `Unknown/Skipped` tests can be ignored.

- Run specific test from entire test suite - `npx cypress run --env tags='@40729'`
- Run multiple tests from entire test suite - `npx cypress run --env tags='@40729 or @3331 or @28433 or @28474'`
- Run specific test from specific file - `npx cypress run --spec 'cypress/e2e/AutomationBacklog/Compare Recommendations.feature' --env tags='@48678'`
- Run multiple tests from specific folder - `npx cypress run --config specPattern="cypress/e2e/ViewpointTestSuite/02-MeetingDetails/*.feature" --env tags='@40724 or @40734'`

<br/><br/><br/>
# Running Viewpoint Regression Tests

**NOTE:** To run tests on Azure Pipelines, go to [`this link`](https://dev.azure.com/glasslewis/Development/_build?definitionId=430), click on `Run pipeline` and put the command under `Build Parameters` and click `Run`

- **Run specific tests from regression suite if you don't know the folders - `npx cypress run --config specPattern='cypress/e2e/ViewpointTestSuite/**/*.feature' --env tags='@28722 or @40724'`**
- Run specific test from specific folder - `npx cypress run --config specPattern='cypress/e2e/ViewpointTestSuite/02-MeetingDetails/Vote Button - MD6.feature' --env tags='@3289'`
- Run all tests from specific folder - `npx cypress run --spec 'cypress/e2e/ViewpointTestSuite/02-MeetingDetails/Vote Card.feature'`
- Run all meeting details regression tests - `npx cypress run --config specPattern='cypress/e2e/ViewpointTestSuite/02-MeetingDetails/*.feature'`
- Run entire resgression suite - `npm run regression`

<br/><br/><br/>
# CI

All CI Pipelines are available in the `pipelines` folder. Currently we have 3:

- [`nightlyBuild`](https://dev.azure.com/glasslewis/Development/_build?definitionId=98) - This pipeline runs all the smoke tests on qa environment. It runs for every PR merge to master & once daily at a specific time.
- [`runAdhocTests`](https://dev.azure.com/glasslewis/Development/_build?definitionId=430) - This pipeline can be used to run any specific tests. The parameter accepts different configs which can be amended as needed.
- [`loadTestDocker`](https://dev.azure.com/glasslewis/Development/_build?definitionId=407) - This pipeline is being used to run load tests on qa environment. It takes the number of parallel instances as input and then runs a test which logs in with a random user, chooses a random meeting and votes.

<br/><br/><br/>
# Running With Docker

To run the tests within a docker container, you need the below:

- Ensure you have the latest version of Docker Desktop Installed and running
- Run `docker build -t votingportal-cypress .` . This will build the image
- Now run `docker run votingportal-cypress --config specPattern=cypress/e2e/SmokeTests/*.feature`. You can replace the specPattern with your choice of test suite.
- You can also use docker-compose to run a loadtest. Make required amendments to the `command` parameter on the docker-compose file, and then run `docker compose up --build --scale cypress=1`. You can amend the number of parallel instances you want to run.