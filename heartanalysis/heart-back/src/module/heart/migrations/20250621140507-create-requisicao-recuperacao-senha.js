"use strict";
module.exports = {
	table: {
		schema: "heart",
		tableName: "requisicao_recuperacao_senha",
		plural: "requisicoes_recuperacao_senha",
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
			id_usuario: {
				nomeCampo: "Usuário",
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: {
						schema: "heart",
						tableName: "usuario",
					},
					key: "id",
				},
			},
			data_expiracao: {
				nomeCampo: "Data de expiração",
				type: Sequelize.DATE,
				allowNull: false,
			},
			codigo_verificacao: {
				nomeCampo: "Código de verificação",
				type: Sequelize.STRING(6),
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
