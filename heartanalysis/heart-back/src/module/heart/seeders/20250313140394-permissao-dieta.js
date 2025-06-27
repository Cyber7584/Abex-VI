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
                id: "DIETA",
                descricao: "Dietas",
                ordem: 30,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);

        // Permissões de Dieta
        await queryInterface.bulkInsert(tablePermissao, [
            {
                id_categoria_permissao: "DIETA",
                descricao: "Visualizar",
                codigo: "VISUALIZAR_DIETA",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id_categoria_permissao: "DIETA",
                descricao: "Criar",
                codigo: "CRIAR_DIETA",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id_categoria_permissao: "DIETA",
                descricao: "Excluir",
                codigo: "EXCLUIR_DIETA",
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
                    [Sequelize.Op.in]: ["DIETA"],
                },
            },
            {},
        );

        await queryInterface.bulkDelete(
            tableCategoriaPermissao,
            {
                id: {
                    [Sequelize.Op.in]: ["DIETA"],
                },
            },
            {},
        );
    },
};