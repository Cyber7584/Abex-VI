"use strict";
module.exports = {
	table: {
		schema: "heart",
		tableName: "grupo_usuario",
		plural: "grupos_usuario",
	},

	getTableData(Sequelize) {
		return {
			id: {
				nomeCampo: "ID",
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			descricao: {
				nomeCampo: "Descrição",
				type: Sequelize.STRING,
				allowNull: false,
			},
			createdAt: {
				nomeCampo: "Data de criação",
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				nomeCampo: "Data de atualização",
				allowNull: false,
				type: Sequelize.DATE,
			},
		};
	},

	async up(queryInterface, Sequelize) {
		await queryInterface.createTable(
			this.table,
			this.getTableData(Sequelize),
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable(this.table);
	},
};
