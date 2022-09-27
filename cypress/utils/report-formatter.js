const Formatter = require('cucumber-json-report-formatter').Formatter

const formatter = new Formatter()
const sourceFile = './test-results/cucumber/cucumber-messages.ndjson'
const outputFile = './test-results/cucumber/cucumber-report.json'

formatter.parseCucumberJson(sourceFile, outputFile)