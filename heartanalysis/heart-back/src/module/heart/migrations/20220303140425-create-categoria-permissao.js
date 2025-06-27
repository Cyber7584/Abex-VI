"use strict";
module.exports = {
	table: {
		schema: "heart",
		tableName: "categoria_permissao",
		plural: "categorias_permissao",
	},

	getTableData(Sequelize) {
		return {
			id: {
				nomeCampo: "ID",
				allowNull: false,
				primaryKey: true,
				type: Sequelize.STRING,
			},
			descricao: {
				nomeCampo: "Descrição",
				type: Sequelize.STRING,
				allowNull: false,
			},
			ordem: {
				nomeCampo: "Ordem",
				type: Sequelize.INTEGER,
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
