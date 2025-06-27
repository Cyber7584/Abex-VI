"use strict";
module.exports = {
	table: {
		schema: "heart",
		tableName: "grupo_usuario_permissao",
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
			id_grupo_usuario: {
				nomeCampo: "Grupo de usuário",
				allowNull: false,
				type: Sequelize.INTEGER,
				references: {
					key: "id",
					model: {
						schema: "heart",
						tableName: "grupo_usuario",
					},
				},
				pivotTo: "permissao",
			},
			id_permissao: {
				nomeCampo: "Permissão",
				allowNull: false,
				type: Sequelize.INTEGER,
				references: {
					key: "id",
					model: {
						schema: "heart",
						tableName: "permissao",
					},
				},
				pivotTo: "grupo_usuario",
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
