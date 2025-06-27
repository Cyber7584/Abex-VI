"use strict";
module.exports = {
	table: {
		schema: "heart",
		tableName: "usuario",
		plural: "usuarios",
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
			nome: {
				nomeCampo: "Nome",
				type: Sequelize.STRING,
				allowNull: false,
			},
			email: {
				nomeCampo: "E-mail",
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
			},
			senha: {
				nomeCampo: "Senha",
				type: Sequelize.STRING,
				allowNull: false,
			},
			id_grupo_usuario: {
				nomeCampo: "Grupo de usuário",
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: {
						schema: "heart",
						tableName: "grupo_usuario",
					},
					key: "id",
				},
			},
			otp_habilitado: {
				nomeCampo: "OTP habilitado",
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			},
			otp_secret: {
				nomeCampo: "OTP secret",
				type: Sequelize.STRING,
				allowNull: true,
			},
			otp_tipo: {
				nomeCampo: "OTP tipo",
				type: Sequelize.INTEGER,
				allowNull: true,
			},
			otp_login_code: {
				nomeCampo: "OTP login code",
				type: Sequelize.STRING,
				allowNull: true,
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
