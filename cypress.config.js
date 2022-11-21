const { defineConfig } = require('cypress')
const fs = require('fs-extra')
const xlsx = require('node-xlsx').default
const sqlServer = require('cypress-sql-server')
const Formatter = require('cucumber-json-report-formatter').Formatter
const generateHTMLReport = require('./cypress/utils/cucumber-html-reporter')
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor")
const preprocessor = require("@badeball/cypress-cucumber-preprocessor")
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild")
const stdLibBrowser = require('node-stdlib-browser')
const plugin = require('node-stdlib-browser/helpers/esbuild/plugin')

async function setupNodeEvents(on, config) {

  await preprocessor.addCucumberPreprocessorPlugin(on, config, {
    omitBeforeRunHandler: true,
    omitAfterRunHandler: true
  })

  on('before:run', () => {
    fs.emptyDirSync('./test-results')
    console.log(`INITIATING TESTS ON: ${config.baseUrl} at ${new Date().toISOString().split('T')[1].split('.')[0]} GMT`)
    preprocessor.beforeRunHandler(config)
  })

  on(
    "file:preprocessor",
    createBundler({
      inject: [require.resolve('node-stdlib-browser/helpers/esbuild/shim')],
      define: {
        global: 'global',
        process: 'process',
        Buffer: 'Buffer'
      },
      plugins: [plugin(stdLibBrowser), createEsbuildPlugin.default(config)],
    })
  )

  on('task', {
    log(message) {
      console.log(message)
      return null
    },
  })

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

  on('after:run', async (results) => {
    if (results) {
      console.log(`FINISHING TESTS ON: ${config.baseUrl} at ${new Date().toISOString().split('T')[1].split('.')[0]} GMT`)
      const formatter = new Formatter()
      const sourceFile = './test-results/cucumber/cucumber-messages.ndjson'
      const outputFile = './test-results/cucumber/cucumber-report.json'
      await formatter.parseCucumberJson(sourceFile, outputFile)
      generateHTMLReport.reportGenerate()
      await preprocessor.afterRunHandler(config)
    }
  })

  return config
}

module.exports = defineConfig({
  defaultCommandTimeout: 20000,
  requestTimeout: 15000,
  responseTimeout: 45000,
  pageLoadTimeout: 60000,
  numTestsKeptInMemory: 2,
  chromeWebSecurity: false,
  experimentalWebKitSupport: false,
  screenshotsFolder: 'test-results/screenshots',
  videosFolder: 'test-results/videos',
  viewportWidth: 1920,
  viewportHeight: 1200,
  watchForFileChanges: false,
  screenshotOnRunFailure: true,
  video: false,
  videoCompression: 8,
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    reporterEnabled: 'spec, mocha-junit-reporter',
    mochaJunitReporterReporterOptions: {
      mochaFile: 'test-results/tests-output/result-[hash].xml'
    }
  },
  retries: {
    runMode: 2,
    openMode: 0,
  },
  env: {
    startTime: new Date()
  },
  e2e: {
    setupNodeEvents,
    baseUrl: 'https://viewpoint.aqua.glasslewis.com',
    specPattern: '**/*.feature',
  }
})