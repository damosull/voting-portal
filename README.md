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
- In the project root directory, run the command `npm install` on powershell / git bash.

# Build and Test

To run cypress, just execute the following command:

- `npx cypress open` or `npm run open` - Opens the Cypress Test Runner in interactive mode.
- `npx cypress run` or `npm run test` - Runs Cypress tests to completion. By default will run all tests headlessly in the Electron browser
- `npx cypress run --spec "cypress/integration/Smoke Tests/dashboard-tests.feature"` - Runs a specific spec file
- `npx cypress run --config integrationFolder="cypress/integration/Viewpoint Test Suite/02 - Meeting Details"` - Runs all tests in a specific folder

# CI

To run the tests in the CI, you need to:

- Run all tests against `qa` environment. You do that using `npx cypress run --env configFile=qa` or `.\node_modules\.bin\cypress run --env configFile=qa`
- Run smoke tests against `qa` environment. You do that using `npx cypress run --env configFile=smoke-qa` or `.\node_modules\.bin\cypress run --env configFile=smoke-qa`
- Run smoke tests against `ultra` environment. You do that using `npx cypress run --env configFile=smoke-ultra` or `.\node_modules\.bin\cypress run --env configFile=smoke-ultra`
- Run smoke tests against `production` environment. You do that using `npx cypress run --env configFile=smoke-prod` or `.\node_modules\.bin\cypress run --env configFile=smoke-prod`

# Running With Docker

To run the tests within a docker container, you need the below:

- Ensure you have the latest version of Docker Desktop Installed and running
- Run `docker build -t votingportal-cypress .` . This will build the image
- Now run `docker run votingportal-cypress --env configFile=smoke-qa` . You can replace the configFile with your choice of test suite.
- You can also use docker-compose to run the tests. Make required amendments to the `command` parameter on the docker-compose file, and then run `docker compose up --build --scale cypress=1` . You can amend the number of parallel instances you want to run.