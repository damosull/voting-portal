const { defineConfig } = require('cypress')
const fs = require('fs-extra')
const xlsx = require('node-xlsx').default
const sqlServer = require('cypress-sql-server')
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor")
const preprocessor = require("@badeball/cypress-cucumber-preprocessor")
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild")
const stdLibBrowser = require('node-stdlib-browser')
const plugin = require('node-stdlib-browser/helpers/esbuild/plugin')

async function setupNodeEvents(on, config) {

  await preprocessor.addCucumberPreprocessorPlugin(on, config, {
    omitBeforeRunHandler: true
  })

  on('before:run', () => {
    fs.emptyDirSync('./test-results')
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

  return config
}

module.exports = defineConfig({
  defaultCommandTimeout: 30000,
  requestTimeout: 30000,
  responseTimeout: 60000,
  pageLoadTimeout: 90000,
  numTestsKeptInMemory: 1,
  chromeWebSecurity: false,
  experimentalWebKitSupport: true,
  screenshotsFolder: 'test-results/screenshots',
  videosFolder: 'test-results/videos',
  viewportWidth: 1920,
  viewportHeight: 1200,
  watchForFileChanges: false,
  screenshotOnRunFailure: true,
  video: false,
  videoCompression: 8,
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
    setupNodeEvents,
    baseUrl: 'https://viewpoint.aqua.glasslewis.com',
    specPattern: 'cypress/e2e/**/*.feature',
  }
})