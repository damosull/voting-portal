# Introduction
In this repo will be developed cypress tests for Voting Portal.

# Config
The cypress configuration is split up in 3 files:
- `cypress.json` - Global configuration. All configs shared by all environments goes here
- `cypress\config\development.json` - Configuration loaded by default. Add configuration specific for development
- `cypress\config\qa.json` - Configuration to QA environment. To load it, add `--env configFile=qa`. This config will be used in the CI
- `cypress\config\smoke-qa.json` - Configuration to run only specs in `integration\smoke_tests` against QA environment. To load it, add `--env configFile=smoke-qa`. This config will be used in the CI
- `cypress\config\smoke-ultra.json` - Configuration to run only specs in `integration\smoke_tests` against ULTRA environment. To load it, add `--env configFile=smoke-ultra`. This config will be used in the CI
- `cypress\config\smoke-prod.json` - Configuration to run only specs in `integration\smoke_tests` against production environment. To load it, add `--env configFile=smoke-prod`. This config will be used in the CI

# Development
Before starting the development of test cases, make sure to:
* Has a `cypress.env.json` file in the root folder (same level as `cypress.json`). You can create one based on `cypress.env.example.json`.
* Fill the empty variables inside of `cypress.env.json`.

# Build and Test
To run cypress, just execute the following command:
- `npx cypress open` or `npm run cy:open` - Opens the Cypress Test Runner in interactive mode.
- `npx cypress run` or `npm run cy:run` - Runs Cypress tests to completion. By default will run all tests headlessly in the Electron browser
- `npx cypress run --spec "cypress/integration/my-spec.js"` - Runs a specific spec file

# CI
To run the tests in the CI, you need to:
- Set the environment variables, `cypress_Internal_Admin_Username`, and `cypress_Internal_Admin_Password`
- Run using `qa` environment. You do that using `npx cypress run --env configFile=qa` or `.\node_modules\.bin\cypress run --env configFile=qa`
- Run smoke tests against `qa` environment. You do that using `npx cypress run --env configFile=smoke-qa` or `.\node_modules\.bin\cypress run --env configFile=smoke-qa`
- Run smoke tests against `ultra` environment. You do that using `npx cypress run --env configFile=smoke-ultra` or `.\node_modules\.bin\cypress run --env configFile=smoke-ultra`
- Run smoke tests against `production` environment. You do that using `npx cypress run --env configFile=smoke-prod` or `.\node_modules\.bin\cypress run --env configFile=smoke-prod`