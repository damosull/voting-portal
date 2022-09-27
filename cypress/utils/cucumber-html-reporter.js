const reportGenerate = function () {
    let reporter = require('cucumber-html-reporter')
    let configs = require('../../cypress.config.js')
    let endDateAndTime = new Date()
    let options = {
        name: 'Voting Portal Test Execution Report',
        brandTitle: 'Powered by Cypress',
        theme: 'bootstrap',
        jsonFile: './test-results/cucumber/cucumber-report.json',
        output: './test-results/cucumber/cucumber_report.html',
        reportSuiteAsScenarios: true,
        scenarioTimestamp: true,
        launchReport: false,
        ignoreBadJsonFile: true,
        metadata: {
            "Environment": configs.e2e.baseUrl,
            "Tests Completed At": endDateAndTime
        }
    }

    reporter.generate(options)
};

reportGenerate()
