"use strict";

module.exports = (sequelize, DataTypes) => {
	const CategoriaPermissao = sequelize.define(
		"CategoriaPermissao",
		{
			descricao: DataTypes.STRING,
			ordem: DataTypes.INTEGER,
			createdAt: DataTypes.DATE,
			updatedAt: DataTypes.DATE,
		},
		{
			sequelize,
			modelName: "CategoriaPermissao",
			schema: "heart",
			tableName: "categoria_permissao",
		},
	);

	CategoriaPermissao.associate = function (model) {
		model.CategoriaPermissao.hasMany(model.Permissao, {
			foreignKey: "id_categoria_permissao",
			as: "permissoes",
		});
	};

	return CategoriaPermissao;
};
