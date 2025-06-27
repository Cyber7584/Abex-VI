"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		const table = {
			tableName: "grupo_usuario",
			schema: "heart",
		};

		await queryInterface.bulkInsert(table, [
			{
				id: 1,
				descricao: "Administrador",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 2,
				descricao: "Professor",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 3,
				descricao: "Aluno",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		const table = {
			tableName: "grupo_usuario",
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
