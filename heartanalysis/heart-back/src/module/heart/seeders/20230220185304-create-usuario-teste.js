"use strict";
const bcrypt = require("bcrypt");

module.exports = {
	async up(queryInterface, Sequelize) {
		const tableUsuario = {
			tableName: "usuario",
			schema: "heart",
		};

		const tableGrupoUsuarioPermissao = {
			tableName: "grupo_usuario_permissao",
			schema: "heart",
		};

		await queryInterface.bulkInsert(tableUsuario, [
			{
				id: 1,
				nome: "Administrador",
				email: "admin@heart.com.br",
				senha: bcrypt.hashSync("heart2025", 10),
				id_grupo_usuario: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		
		]);

		for (let i = 1; i <= 6; i++) {
			await queryInterface.bulkInsert(tableGrupoUsuarioPermissao, [
				{
					id_grupo_usuario: 1,
					id_permissao: i,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			]);
		}
	},

	async down(queryInterface, Sequelize) {
		const table = {
			tableName: "usuario",
			schema: "heart",
		};

		await queryInterface.bulkDelete(
			table,
			{
				id: {
					[Sequelize.Op.in]: [1],
				},
			},
			{},
		);
	},
};
