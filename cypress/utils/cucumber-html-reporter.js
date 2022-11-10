const reportGenerate = function () {
    let reporter = require('cucumber-html-reporter')
    let configs = require('../../cypress.config.js')
    let endDateAndTime = new Date()
    let seconds = Math.floor((endDateAndTime - (configs.env.startTime)) / 1000)
    let minutes = Math.floor(seconds / 60)
    let hours = Math.floor(minutes / 60)
    minutes = minutes - (hours * 60)
    seconds = seconds - (hours * 60 * 60) - (minutes * 60)
    let options = {
        name: 'Voting Portal Test Execution Report',
        brandTitle: 'Powered by Cypress',
        theme: 'bootstrap',
        jsonFile: './test-results/cucumber/cucumber-report.json',
        output: './test-results/cucumber/cucumber_report.html',
        metadata: {
            "Tests Started At": configs.env.startTime,
            "Environment": configs.e2e.baseUrl,
            "Tests Completed At": endDateAndTime,
            "Total Run Time": `${hours} hour(s), ${minutes} minute(s) and ${seconds} second(s)`,
        }
    }

    reporter.generate(options)
};

module.exports.reportGenerate = reportGenerate;
