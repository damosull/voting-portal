const { defineConfig } = require('cypress');
const { cloudPlugin } = require('cypress-cloud/plugin');
const fs = require('fs-extra');
const xlsx = require('node-xlsx').default;
const sqlServer = require('cypress-sql-server');
const { readPdf } = require('./cypress/utils/read-pdf');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const preprocessor = require('@badeball/cypress-cucumber-preprocessor');
const createEsbuildPlugin = require('@badeball/cypress-cucumber-preprocessor/esbuild');
const stdLibBrowser = require('node-stdlib-browser');
const plugin = require('node-stdlib-browser/helpers/esbuild/plugin');

async function setupNodeEvents(on, config) {
	config.baseUrl = config.env.url || config.env[config.env.testEnv].url;

	await cloudPlugin(on, config);
	await preprocessor.addCucumberPreprocessorPlugin(on, config, {
		omitBeforeRunHandler: true,
		omitAfterRunHandler: true,
	});

	on('before:run', () => {
		fs.emptyDirSync('./test-results');
		console.log(`INITIATING TESTS ON: ${config.baseUrl} at ${new Date()}`);
		preprocessor.beforeRunHandler(config);
	});

	on(
		'file:preprocessor',
		createBundler({
			inject: [require.resolve('node-stdlib-browser/helpers/esbuild/shim')],
			define: {
				global: 'global',
				process: 'process',
				Buffer: 'Buffer',
			},
			plugins: [plugin(stdLibBrowser), createEsbuildPlugin.default(config)],
		})
	);

	on('task', {
		log(message) {
			console.log(message);
			return null;
		},
	});

	on('task', {
		readPdf: (pathToPdf) => readPdf(pathToPdf),
	});

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

	on(
		'task',
		sqlServer.loadDBPlugin({
			userName: config.env.sql_username || config.env[config.env.testEnv].sql_username,
			password: config.env.sql_password || config.env[config.env.testEnv].sql_password,
			server: config.env.sql_server || config.env[config.env.testEnv].sql_server,
			options: {
				database: 'GLP',
				encrypt: true,
				rowCollectionOnRequestCompletion: true,
				trustServerCertificate: true,
				validateBulkLoadParameters: true,
			},
		})
	);

	on('after:run', async (results) => {
		if (results) {
			try {
				await fs.copy('./test-results/screenshots', './test-screenshots');
				console.log('screenshots found! moving them to common directory...');
			} catch (e) {
				console.log('screenshots not found! moving on with the tests...');
			}
			console.log(`FINISHING TESTS ON: ${config.baseUrl} at ${new Date()}`);
			await preprocessor.afterRunHandler(config);
		}
	});

	return config;
}

module.exports = defineConfig({
	defaultCommandTimeout: 30000,
	requestTimeout: 15000,
	responseTimeout: 30000,
	pageLoadTimeout: 60000,
	numTestsKeptInMemory: 2,
	experimentalMemoryManagement: true,
	chromeWebSecurity: false,
	screenshotsFolder: 'test-results/screenshots',
	videosFolder: 'test-results/videos',
	viewportWidth: 1920,
	viewportHeight: 1200,
	watchForFileChanges: false,
	screenshotOnRunFailure: true,
	video: false,
	videoCompression: 8,
	reporter: 'spec',
	retries: {
		runMode: 1,
		openMode: 0,
	},
	env: {
		testEnv: 'aqua',
		startTime: new Date(),
	},
	e2e: {
		setupNodeEvents,
		baseUrl: 'https://viewpoint.aqua.glasslewis.com',
		specPattern: '**/*.feature',
	},
});
