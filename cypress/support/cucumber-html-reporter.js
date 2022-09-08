const reportGenerate = function () {
    let reporter = require('cucumber-html-reporter')
    let configs = require('../../cypress.config.js')
    let endDateAndTime = new Date()
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
            "Tests Started At": configs.env.startTime,
            "Environment": configs.e2e.baseUrl,
            "Tests Completed At": endDateAndTime,
            "Total Run Time": ((endDateAndTime - configs.env.startTime)/(1000*60)).toFixed(1) + ' minutes',
        }
    }

    reporter.generate(options);
};

module.exports.reportGenerate = reportGenerate;
