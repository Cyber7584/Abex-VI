"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		const tableCategoriaPermissao = {
			tableName: "categoria_permissao",
			schema: "heart",
		};

		const tablePermissao = {
			tableName: "permissao",
			schema: "heart",
		};

		await queryInterface.bulkInsert(tableCategoriaPermissao, [
			{
				id: "USUARIO",
				descricao: "Usuários",
				ordem: 10,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: "GRUPO_USUARIO",
				descricao: "Grupos de usuário",
				ordem: 20,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);

		// Permissões de usuário
		await queryInterface.bulkInsert(tablePermissao, [
			{
				id_categoria_permissao: "USUARIO",
				descricao: "Visualizar",
				codigo: "VISUALIZAR_USUARIO",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id_categoria_permissao: "USUARIO",
				descricao: "Criar",
				codigo: "CRIAR_USUARIO",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id_categoria_permissao: "USUARIO",
				descricao: "Excluir",
				codigo: "EXCLUIR_USUARIO",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);

		// Permissões de grupo de usuário
		await queryInterface.bulkInsert(tablePermissao, [
			{
				id_categoria_permissao: "GRUPO_USUARIO",
				descricao: "Visualizar",
				codigo: "VISUALIZAR_GRUPO_USUARIO",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id_categoria_permissao: "GRUPO_USUARIO",
				descricao: "Criar",
				codigo: "CRIAR_GRUPO_USUARIO",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id_categoria_permissao: "GRUPO_USUARIO",
				descricao: "Excluir",
				codigo: "EXCLUIR_GRUPO_USUARIO",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		const tableCategoriaPermissao = {
			tableName: "categoria_permissao",
			schema: "heart",
		};

		const tablePermissao = {
			tableName: "permissao",
			schema: "heart",
		};

		await queryInterface.bulkDelete(
			tablePermissao,
			{
				id_categoria_permissao: {
					[Sequelize.Op.in]: ["USUARIO", "GRUPO_USUARIO"],
				},
			},
			{},
		);

		await queryInterface.bulkDelete(
			tableCategoriaPermissao,
			{
				id: {
					[Sequelize.Op.in]: ["USUARIO", "GRUPO_USUARIO"],
				},
			},
			{},
		);
	},
};
