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
                id: "PERMISSAO",
                descricao: "Permissões",
                ordem: 30,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);

        // Permissões de Permissao
        await queryInterface.bulkInsert(tablePermissao, [
            {
                id_categoria_permissao: "PERMISSAO",
                descricao: "Visualizar",
                codigo: "VISUALIZAR_PERMISSAO",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id_categoria_permissao: "PERMISSAO",
                descricao: "Criar",
                codigo: "CRIAR_PERMISSAO",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id_categoria_permissao: "PERMISSAO",
                descricao: "Excluir",
                codigo: "EXCLUIR_PERMISSAO",
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
                    [Sequelize.Op.in]: ["PERMISSAO"],
                },
            },
            {},
        );

        await queryInterface.bulkDelete(
            tableCategoriaPermissao,
            {
                id: {
                    [Sequelize.Op.in]: ["PERMISSAO"],
                },
            },
            {},
        );
    },
};