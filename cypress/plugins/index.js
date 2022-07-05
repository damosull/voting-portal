// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

const fs = require('fs-extra');
const path = require('path');
const xlsx = require('node-xlsx').default;
const _ = require('lodash');
const del = require('del');
const sqlServer = require('cypress-sql-server');
const dbConfig = require('../../cypress.json');
const cucumber = require('cypress-cucumber-preprocessor').default
const reportGenerator = require('../support/cucumber-html-reporter')

function getConfigurationByFile(file) {
  const pathToConfigFile = path.resolve('cypress', 'config', `${file}.json`);

  return fs.readJson(pathToConfigFile);
}

module.exports = (on, config) => {

  on('task', {
    parseXlsx({ filePath }) {
      return new Promise((resolve, reject) => {
        try {
          const jsonData = xlsx.parse(fs.readFileSync(filePath));
          resolve(jsonData);
        } catch (e) {
          reject(e);
        }
      });
    },
  });
  
  on('task', sqlServer.loadDBPlugin(dbConfig.db));

  on('file:preprocessor', cucumber());

  on('after:spec', (spec, results) => {
    if (results && results.video) {
      // Do we have failures for any retry attempts?
      const failures = _.some(results.tests, (test) => {
        return _.some(test.attempts, { state: 'failed' });
      });
      if (!failures) {
        // delete the video if the spec passed and no tests retried
        return del(results.video);
      }
    }
  });

  on('before:run', () => {
    del('./test-results/cucumber')
  })

  on('after:run', (results) => {
    console.log(results.totalPassed, 'out of', results.totalTests, 'passed. tests were run on ', results.config.baseUrl)
    reportGenerator.reportGenerate()
  })

  const file = config.env.configFile || 'development';
  return getConfigurationByFile(file);
};