"use strict";

module.exports = (sequelize, DataTypes) => {
	const Permissao = sequelize.define(
		"Permissao",
		{
			descricao: DataTypes.STRING,
			codigo: DataTypes.STRING,
			createdAt: DataTypes.DATE,
			updatedAt: DataTypes.DATE,
		},
		{
			sequelize,
			modelName: "Permissao",
			schema: "heart",
			tableName: "permissao",
		},
	);

	Permissao.associate = function (model) {
		model.Permissao.belongsTo(model.CategoriaPermissao, {
			foreignKey: "id_categoria_permissao",
			as: "categoria_permissao",
		});

		model.Permissao.belongsToMany(model.GrupoUsuario, {
			foreignKey: "id_permissao",
			otherKey: "id_grupo_usuario",
			through: "grupo_usuario_permissao",
			as: "grupos_usuario",
		});
	};

	return Permissao;
};
