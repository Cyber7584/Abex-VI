"use strict";
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.sequelize.query(
			`CREATE SCHEMA IF NOT EXISTS heart;`,
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.sequelize.query(
			`DROP SCHEMA IF EXISTS heart CASCADE;`,
		);
	},
};
