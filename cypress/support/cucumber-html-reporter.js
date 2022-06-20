const reportGenerate = function () {
    let reporter = require('cucumber-html-reporter')
    let endDateAndTime = new Date()
    let testEnv = require('../config/qa.json').baseUrl
    let options = {
        name: 'Voting Portal Test Execution Report',
        brandTitle: 'Powered by Cypress',
        theme: 'bootstrap',
        jsonDir: './test-results/cucumber/cucumber-json',
        output: './test-results/cucumber/cucumber_report.html',
        reportSuiteAsScenarios: true,
        scenarioTimestamp: true,
        launchReport: false,
        ignoreBadJsonFile: true,
        metadata: {
            "Environment": testEnv,
            "Tests Executed At": endDateAndTime
        }
    }

    reporter.generate(options);
};

module.exports.reportGenerate = reportGenerate;
