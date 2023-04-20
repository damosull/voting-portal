module.exports = {
	projectId: 'voting-portal', // the projectId, can be any values for sorry-cypress users
	recordKey: 'xxx', // the record key, can be any value for sorry-cypress users
	cloudServiceUrl: 'http://localhost:1234', // Sorry Cypress users - set the director service URL
};

//run command - npx cypress-cloud run --parallel --record --key XXX --config specPattern=cypress/e2e/SmokeTests/*.feature --ci-build-id 123
