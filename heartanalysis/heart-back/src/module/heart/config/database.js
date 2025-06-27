const db = require("../../../../config/databases");

module.exports = {
	development: {
		...db.development,
		migrationStorageTableschema: "heart",
	},
	test: {
		...db.test,
		migrationStorageTableschema: "heart",
	},
	production: {
		...db.prod,
		migrationStorageTableschema: "heart",
	},
};
