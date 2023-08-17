# Introduction

This repo consists of the cypress end-to-end tests for Viewpoint application.

<br/>

# Running Tests for non-techs

If you want to run automated tests on Viewpoint, but have little or no idea on how to run specific test scripts, then follow below steps. This will help you run specific automated test scripts from the Viewpoint Regression Test Suite, Automation Backlog Test Suite or the Automated Smoke Tests.

To run tests on Azure Pipelines, go to [`this link`](https://dev.azure.com/glasslewis/Development/_build?definitionId=430), click on `Run pipeline`, put the command suggested below under `Build Parameters`. Choose the test environment as required and make sure you change the number of parallel instances to 1. Then, Click `Run`.

## Running any test case from Azure DevOps

- To run specific tests where you know the test ID(can be seen in the test URL), mention the Azure test IDs in this command. For example, if I want to run test case ID 28722, the command to use in the `Build Parameters` field would be `npx cypress run --env tags=@28722`
- To run multiple tests, just add those test IDs in the tags section of the above command, eg: `tags='@xyz or @abc or @lmn or @pqr or @fgh'`

<br/>

# Development

Before starting the development of test cases, make sure:

- You have nodejs installed (latest version of Node 18). Can be downloaded from here - https://nodejs.org/en/
- Once installed, open/reopen your cli tool, eg: powershell / git bash / cmd, and run the command `npm install -g yarn`
- Clone the repository in your machine. One way to do that is by navigating to the directory where you want the repository on your cli tool, and then running the command `git clone https://glasslewis@dev.azure.com/glasslewis/Development/_git/votingportal-automation-tests`
- Then, navigate to the project root directory by running `cd votingportal-automation-tests`, and run the command `npm install`
- Make a copy of the `cypress.env.example.json` file and rename it as `cypress.env.json`
- In the `cypress.env.json` file, fill the correct DB credentials so that the relevant tests can connect to the test DB instances. Reach out to an existing Test Automation engineer to get the password.
- Now run `git checkout -b <your_branch_name>` to create your own working branch.

<br/>

# Build and Test

To run cypress, just execute the following command:

**NOTE:** If you want to run the tests on Ultra(UAT), just add this to the end of the command `--env testEnv=ultra`

- `npx cypress open` or `yarn open` - Opens the Cypress Test Runner in interactive mode.
- `npx cypress run` or `yarn test` - Runs Cypress tests to completion. By default will run all tests headlessly in the Electron browser
- `npm run smoke` or `yarn smoke` - Runs All Smoke Tests
- `npm run regression` or `yarn regression` - Runs All Regression Tests
- `npx cypress run --spec "cypress/e2e/SmokeTests/09-filters-tests.feature"` - Runs a specific spec file
- `npx cypress run --config specPattern="cypress/e2e/RegressionSuite/02-MeetingDetails/*.feature"` - Runs all tests in a specific folder

**NOTE:** To run tests on Azure Pipelines, go to [`this link`](https://dev.azure.com/glasslewis/Development/_build?definitionId=430), click on `Run pipeline` and put the command under `Build Parameters`. Choose the test environment as required and make sure you change the number of parallel instances to 1. Then, Click `Run`.

<br/>

# Test Folders

This is what the different test folders mean and their location on Azure DevOps is mentioned below:

- `SmokeTests` - These are the basic smoke tests for Voting Portal application which ensures all important pages and functionalities are working as expected. The test cases for these are located [`here`](https://dev.azure.com/glasslewis/Development/_testPlans/execute?planId=56788&suiteId=56790).
- `RegressionSuite` - These are the tests which have been automated from the 2800+ tests in the old regression suite. The test cases for these are located [`here`](https://dev.azure.com/glasslewis/Development/_testPlans/execute?planId=9215&suiteId=9216).
- `Reports` - These are the tests which have been automated to improve automation coverage for reports. The test cases for these are located [`here`](https://glasslewis-my.sharepoint.com/:x:/p/smaheshwari/EYlZL1aLmUlJj8nVuU4DXOYBsgTD0bSTr1WncQaeRMcYCQ).
- `AutomationScenarios` - These are the tests which were designed to be automated and also the tests which were designed for features from 2021. The test cases for these are located either in [`Automation Backlog`](https://dev.azure.com/glasslewis/Development/_testPlans/execute?planId=48536&suiteId=48537) or [`Automation Scenarios`](https://dev.azure.com/glasslewis/Development/_testPlans/execute?planId=37349&suiteId=37350).

<br/>

# Running With Tags

Using Cucumber tags gives great advantage to run the test cases of your choice. All the tests in this repo have been tagged, either as a set OR as the ID of invidiual test case. You can use the command as seen in below examples.

- Run specific test from entire test suite - `npx cypress run --env tags='@40729'`
- Run multiple tests from entire test suite - `npx cypress run --env tags='@40729 or @3331 or @28433 or @28474'`
- Run specific test from specific file - `npx cypress run --spec 'cypress/e2e/AutomationScenarios/Compare Recommendations.feature' --env tags='@48678'`
- Run multiple tests from specific folder - `npx cypress run --config specPattern="cypress/e2e/RegressionSuite/02-MeetingDetails/*.feature" --env tags='@40724 or @40734'`

<br/>

# Running Viewpoint Regression Tests

**NOTE:** To run tests on Azure Pipelines, go to [`this link`](https://dev.azure.com/glasslewis/Development/_build?definitionId=430), click on `Run pipeline` and put the command under `Build Parameters`. Choose the test environment as required and make sure you change the number of parallel instances to 1. Then, Click `Run`.

- **Run specific tests from regression suite if you don't know the folders - `npx cypress run --config specPattern='cypress/e2e/RegressionSuite/**/*.feature' --env tags='@28722 or @40724'`**
- Run specific test from specific folder - `npx cypress run --config specPattern='cypress/e2e/RegressionSuite/02-MeetingDetails/Vote Button - MD6.feature' --env tags='@3289'`
- Run all tests from specific folder - `npx cypress run --spec 'cypress/e2e/RegressionSuite/02-MeetingDetails/Vote Card.feature'`
- Run all meeting details regression tests - `npx cypress run --config specPattern='cypress/e2e/RegressionSuite/02-MeetingDetails/*.feature'`
- Run entire regression suite - `npm run regression`

<br/>

# CI

All CI Pipelines are available in the `pipelines` folder. Currently we have 3:

- [`nightlyBuild`](https://dev.azure.com/glasslewis/Development/_build?definitionId=98) - This pipeline runs all the smoke tests on qa environment. It runs for every PR merge to master & once daily at a specific time.
- [`runAdhocTests`](https://dev.azure.com/glasslewis/Development/_build?definitionId=430) - This pipeline can be used to run any specific tests. The parameter accepts different configs which can be amended as needed.
- [`loadTestDocker`](https://dev.azure.com/glasslewis/Development/_build?definitionId=407) - This pipeline is being used to run load tests on qa environment. It takes the number of parallel instances as input and then runs a test which logs in with a random user, chooses a random meeting and votes.

<br/>

# Running With Docker

To run the tests within a docker container, you need the below:

- Ensure you have the latest version of Docker Desktop Installed and running
- Run `docker build -t votingportal-cypress .` . This will build the image
- Now run `docker run votingportal-cypress --config specPattern=cypress/e2e/SmokeTests/*.feature`. You can replace the specPattern with your choice of test suite.
- You can also use docker-compose to run a loadtest. A loadtest readme is available in the `readmes` folder

<br/>

# Sorry Cypress Integration

We have integrated sorry cypress with some of our pipelines. This helps with parallel execution of tests.

A summary of the changes made to this repository for sorry cypress integration is referenced from [here](https://docs.sorry-cypress.dev/guide/get-started).

Sample run command - `npx cypress-cloud run --parallel --record --key xxx --ci-build-id 123 --config specPattern=cypress/e2e/SmokeTests/*.feature`

How to use this locally:

1. Open different shell / git bash windows (if you want to run 3 parallel sessions, open 3 different windows)
2. Copy the above run command. Make sure the build-id is not the same as any previous run.
3. Run the command in all the open shell windows. Ensure the command is exactly the same, as the director service checks the build-id and runs tests in parallel when build-id is the same.

Sorry Cypress Host URLs:

- [Dashboard](https://sorrycypress-dashboard-devops.glasslewis.net/projects)
- [Director Service](https://sorrycypress-director-pipeline.devops.glasslewis.net)
