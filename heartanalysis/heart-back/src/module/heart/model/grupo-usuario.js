"use strict";

module.exports = (sequelize, DataTypes) => {
	const GrupoUsuario = sequelize.define(
		"GrupoUsuario",
		{
			descricao: DataTypes.STRING,
			createdAt: DataTypes.DATE,
			updatedAt: DataTypes.DATE,
		},
		{
			sequelize,
			modelName: "GrupoUsuario",
			schema: "heart",
			tableName: "grupo_usuario",
		},
	);

	GrupoUsuario.associate = function (model) {
		model.GrupoUsuario.hasMany(model.Usuario, {
			foreignKey: "id_grupo_usuario",
			as: "usuarios",
		});

		model.GrupoUsuario.belongsToMany(model.Permissao, {
			foreignKey: "id_grupo_usuario",
			otherKey: "id_permissao",
			through: "grupo_usuario_permissao",
			as: "permissoes",
		});
	};

	return GrupoUsuario;
};
