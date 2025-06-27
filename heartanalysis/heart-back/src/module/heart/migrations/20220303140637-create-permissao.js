"use strict";
module.exports = {
	table: {
		schema: "heart",
		tableName: "permissao",
		plural: "permissoes",
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
			},
			codigo: {
				nomeCampo: "Código",
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
			},
			id_categoria_permissao: {
				nomeCampo: "Categoria de permissão",
				allowNull: false,
				type: Sequelize.STRING,
				references: {
					key: "id",
					model: {
						schema: "heart",
						tableName: "categoria_permissao",
					},
				},
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
