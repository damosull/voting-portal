const sql = require('mssql');

const queryTestDb = (query, config) => {
	const dbConfig = {
		user: config.env.sql_username || config.env[config.env.testEnv].sql_username,
		password: config.env.sql_password || config.env[config.env.testEnv].sql_password,
		server: config.env.sql_server || config.env[config.env.testEnv].sql_server,
		port: 1433,
		database: 'GLP',
		options: {
			encrypt: false,
			rowCollectionOnRequestCompletion: true,
			trustServerCertificate: true,
		},
	};
	return new Promise((resolve, reject) => {
		sql.connect(dbConfig).then((connection) => {
			connection.query(query, (error, results) => {
				if (error) reject(error);
				else {
					connection.close();
					return resolve(results);
				}
			});
		});
	});
};

module.exports.queryTestDb = queryTestDb;
