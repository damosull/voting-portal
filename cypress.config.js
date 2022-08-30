const { defineConfig } = require('cypress')
const fs = require('fs-extra')
const xlsx = require('node-xlsx').default
const sqlServer = require('cypress-sql-server')
const cucumber = require('cypress-cucumber-preprocessor').default
const reportGenerator = require('./cypress/support/cucumber-html-reporter')

module.exports = defineConfig({
  defaultCommandTimeout: 30000,
  requestTimeout: 30000,
  responseTimeout: 60000,
  pageLoadTimeout: 90000,
  numTestsKeptInMemory: 1,
  chromeWebSecurity: false,
  screenshotsFolder: 'test-results/screenshots',
  videosFolder: 'test-results/videos',
  viewportWidth: 1920,
  viewportHeight: 1200,
  watchForFileChanges: false,
  screenshotOnRunFailure: true,
  video: false,
  reporter: 'spec',
  reporterOptions: {
    mochaFile: 'test-results/tests-output/result-[hash].xml',
    toConsole: true,
  },
  retries: {
    runMode: 2,
    openMode: 0,
  },
  e2e: {
    baseUrl: 'https://viewpoint.aqua.glasslewis.com',
    specPattern: 'cypress/e2e/**/*.feature',

    //Plugin File Migrated Here
    setupNodeEvents(on, config) {
      on('before:run', () => {
        fs.emptyDirSync('./test-results/cucumber')
        fs.emptyDirSync('./test-results/tests-output')
      })
      
      on('file:preprocessor', cucumber())
      
      on('task', {
        parseXlsx({ filePath }) {
          return new Promise((resolve, reject) => {
            try {
              const jsonData = xlsx.parse(fs.readFileSync(filePath))
              resolve(jsonData)
            } catch (e) {
              reject(e)
            }
          })
        },
      })

      on('task', sqlServer.loadDBPlugin({
        userName: 'TestHarnessUser',
        password: 't3$t4@12ness#aQua#0932',
        server: '10.71.5.53',
        options: {
          database: 'GLP',
          encrypt: true,
          rowCollectionOnRequestCompletion: true,
          trustServerCertificate: true,
          validateBulkLoadParameters: true,
        },
      }))

      on('after:run', (results) => {
        console.log(results.totalPassed, 'out of', results.totalTests, 'passed. tests were run on', config.baseUrl)
        reportGenerator.reportGenerate()
      })
    },
  },
})
